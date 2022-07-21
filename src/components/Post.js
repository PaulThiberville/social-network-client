import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../redux/slices/posts";

const Post = ({ post }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(postsActions.likePost({ user, id: post._id }));
  };

  const handleUnlike = () => {
    dispatch(postsActions.unlikePost({ user, id: post._id }));
  };

  const handleDelete = () => {
    dispatch(postsActions.removePost({ user, id: post._id }));
  };

  return (
    <article>
      <Link to={`/profile/` + post.author._id}>
        <h2>{post.author.userName}</h2>
      </Link>
      {post.author._id === user.id && (
        <button onClick={() => handleDelete()}>Delete</button>
      )}
      <Link to={`/fullpost/${post._id}`}>
        <p>{post.text}</p>
        {post.imageUrl === "default" ? null : (
          <img src={post.imageUrl} alt={post._id} />
        )}
      </Link>
      {post.likes.includes(user.id) ? (
        <button
          onClick={() => handleUnlike()}
        >{`Unlike(${post.likes.length})`}</button>
      ) : (
        <button
          onClick={() => handleLike()}
        >{`Like(${post.likes.length})`}</button>
      )}
      <p>{`Comments(${post.comments.length})`}</p>
    </article>
  );
};

export default Post;
