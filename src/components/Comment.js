import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../redux/slices/posts";

const Comment = ({ comment }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(postsActions.likeComment({ user, id: comment._id }));
  };

  const handleUnlike = () => {
    dispatch(postsActions.unlikeComment({ user, id: comment._id }));
  };

  const handleDelete = () => {
    dispatch(postsActions.removeComment({ user, id: comment._id }));
  };

  return (
    <div>
      <h3>{comment.author?.userName}</h3>
      {comment.author._id === user.id && (
        <button onClick={() => handleDelete()}>Delete</button>
      )}
      <p>{comment.text}</p>
      {comment.likes?.includes(user.id) ? (
        <button onClick={() => handleUnlike()}>
          Unlike
          {comment.likes.length}
        </button>
      ) : (
        <button onClick={() => handleLike()}>
          Like
          {comment.likes.length}
        </button>
      )}
    </div>
  );
};

export default Comment;
