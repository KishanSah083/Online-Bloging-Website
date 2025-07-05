import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js'
import User from '../model/user.js';

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        // Check if the username already exists
        let user = await User.findOne({ username: request.body.username });
        if (user) {
            return response.status(400).json({ msg: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        // Create the new user
        const newUser = new User({
           
            name: request.body.name,
            username: request.body.username,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        return response.status(200).json({ msg: 'Signup successful' });
    } catch (error) {
        console.error('Error while signing up user', error);
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
}


export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, username: user.username });
        
        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}

export const logoutUser = async (request, response) => {
    const token = request.body.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: 'logout successfull' });
}

// Example controller function for following a user
export const followUser = (req, res) => {
    const { username } = req.body; // Assuming username is sent in the request body

    // Perform follow logic here, e.g., update database, etc.
    console.log(`Following user: ${username}`);
    // Return a response indicating success
    res.json({ isSuccess: true, message: `Successfully followed ${username}` });
};
// unfollow a user
const unfollowUser = async (req, res) => {
    try {
        // Assuming you have a User model and some logic to handle unfollowing
        const { username } = req.body; // Assuming username is sent in request body
        
        // Example: Find the user in your database and update their followers list
        // Replace this with your actual database logic
        const user = await User.findOneAndUpdate(
            { username: username },
            { $pull: { followers: req.user._id } }, // Assuming followers are stored as IDs
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Optionally, you might want to update other data or return a success message
        res.status(200).json({ message: "Successfully unfollowed user" });
    } catch (error) {
        console.error("Error unfollowing user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { unfollowUser };
