import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled, Button, CircularProgress } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [loading, setLoading] = useState(false); // Loading state

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                    let followResponse = await API.checkIfFollowing({ username: response.data.username });
                    if (followResponse.isSuccess) {
                        setIsFollowing(followResponse.data.isFollowing);
                    }
                    let followerResponse = await API.getFollowerCount({ username: response.data.username });
                    if (followerResponse.isSuccess) {
                        setFollowerCount(followerResponse.data.count);
                    }
                } else {
                    // Handle error or redirect if post not found
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching post details:', error);
                // Handle error, e.g., show error message or redirect
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const deleteBlog = async () => {  
        try {
            await API.deletePost(post._id);
            navigate('/');
        } catch (error) {
            console.error('Error deleting post:', error);
            // Handle error, e.g., show error message
        }
    };

    const handleFollow = async () => {
        try {
            let response = await API.followUser({ username: post.username });
            console.log('Follow User Response:', response); // Log the response for debugging
            if (response.isSuccess) {
                setIsFollowing(true);
                setFollowerCount(followerCount + 1);
            } else {
                // Handle follow error if needed
                console.error('Error following user:', response);
            }
        } catch (error) {
            console.error('Error following user:', error);
            // Handle other potential errors, e.g., network issues
        }
    };
    

    const handleUnfollow = async () => {
        try {
            let response = await API.unfollowUser({ username: post.username });
            if (response.isSuccess) {
                setIsFollowing(false);
                setFollowerCount(followerCount - 1);
            } else {
                // Handle unfollow error, if needed
                console.error('Error unfollowing user:', response);
            }
        } catch (error) {
            console.error('Error unfollowing user:', error);
            // Handle error, e.g., show error message
        }
    };

    if (loading) {
        return (
            <Container>
                <CircularProgress /> {/* Show loading spinner or skeleton screen */}
            </Container>
        );
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {   
                    account.username === post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={deleteBlog} color="error" />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                </Link>
                {account.username !== post.username && (
                    <Box display="flex" alignItems="center" ml={2}>
                        <Button 
                            variant="contained" 
                            color={isFollowing ? "secondary" : "primary"} 
                            onClick={isFollowing ? handleUnfollow : handleFollow}
                        >
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Button>
                        <Typography variant="body2" color="textSecondary" ml={1}>
                            {followerCount} followers
                        </Typography>
                    </Box>
                )}
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Typography>{post.description}</Typography>
            <Comments post={post} />
        </Container>
    );
}

export default DetailView;
