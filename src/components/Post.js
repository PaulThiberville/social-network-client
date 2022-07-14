import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, likePost, unlikePost } from "../services/post";
import { updatePostLikes, removePost } from "../redux/slices/posts";

const Post = ({ post }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLike = async () => {
    const response = await likePost(user, post._id);
    if (response._id) {
      dispatch(updatePostLikes(response));
    }
  };

  const handleUnlike = async () => {
    const response = await unlikePost(user, post._id);
    if (response._id) {
      dispatch(updatePostLikes(response));
    }
  };

  const handleDelete = async () => {
    const response = await deletePost(user, post._id);
    if (response._id) {
      dispatch(removePost(response._id));
      if (location.pathname === "/fullpost/" + post._id) {
        navigate(-1);
      }
    }
  };

  return (
    <article>
      <Link to={`/profile/` + post.author._id}>
        <h2>{post.author.userName}</h2>
      </Link>
      {post.author._id === user.id && (
        <button onClick={async () => await handleDelete()}>Delete</button>
      )}
      <Link to={`/fullpost/${post._id}`}>
        <p>{post.text}</p>
        {post.imageUrl === "default" ? null : (
          <img src={post.imageUrl} alt={post._id} />
        )}
      </Link>
      {post.likes.includes(user.id) ? (
        <button
          onClick={async () => await handleUnlike()}
        >{`Unlike(${post.likes.length})`}</button>
      ) : (
        <button
          onClick={async () => await handleLike()}
        >{`Like(${post.likes.length})`}</button>
      )}
      <p>{`Comments(${post.comments.length})`}</p>
    </article>
  );
};

export default Post;
