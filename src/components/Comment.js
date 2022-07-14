import { useSelector, useDispatch } from "react-redux";
import { likeComment, unlikeComment, deleteComment } from "../services/comment";
import { updateCommentLikes, removeComment } from "../redux/slices/posts";

const Comment = ({ comment }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLike = async () => {
    const response = await likeComment(user, comment._id);
    console.log("resppp :", response);
    if (response._id) {
      console.log("Try to like : ", response);
      dispatch(updateCommentLikes(response));
    }
  };

  const handleUnlike = async () => {
    const response = await unlikeComment(user, comment._id);
    if (response._id) {
      dispatch(updateCommentLikes(response));
    }
  };

  const handleDelete = async () => {
    const response = await deleteComment(user, comment._id);
    console.log(response);
    if (response._id) {
      dispatch(removeComment(response));
    }
  };

  return (
    <div>
      <h3>{comment.author?.userName}</h3>
      {comment.author._id === user.id && (
        <button onClick={async () => await handleDelete()}>Delete</button>
      )}
      <p>{comment.text}</p>
      {comment.likes?.includes(user.id) ? (
        <button onClick={async () => await handleUnlike()}>
          Unlike
          {comment.likes.length}
        </button>
      ) : (
        <button onClick={async () => await handleLike()}>
          Like
          {comment.likes.length}
        </button>
      )}
    </div>
  );
};

export default Comment;
