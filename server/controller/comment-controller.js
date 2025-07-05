import Comment from '../model/comment.js';

export const newComment = async (request, response) => {
    try {
        const comment = new Comment(request.body);
        await comment.save();
        response.status(200).json('Comment saved successfully');
    } catch (error) {
        console.error("Error saving comment:", error);
        response.status(500).json({ msg: 'Error saving comment', error });
    }
};

export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        response.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        response.status(500).json({ msg: 'Error fetching comments', error });
    }
};

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        if (!comment) {
            return response.status(404).json({ msg: 'Comment not found' });
        }
        await comment.delete();
        response.status(200).json('Comment deleted successfully');
    } catch (error) {
        console.error("Error deleting comment:", error);
        response.status(500).json({ msg: 'Error deleting comment', error });
    }
};
