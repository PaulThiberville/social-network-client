import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { postsActions } from "../redux/slices/posts";

const FullPost = () => {
  const user = useSelector((state) => state.user.user);
  const [text, setText] = useState("");
  const { id } = useParams();
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsActions.setFullPost({ user, id }));
  }, []);

  const handleCreateComment = async (e) => {
    e.preventDefault();
    dispatch(postsActions.addComment({ user, text, id }));
  };

  if (!posts.length) return null;
  return (
    <>
      <h1>Full post</h1>
      <Post post={posts[0]}></Post>
      <form>
        <input
          type={"text"}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button onClick={async (e) => await handleCreateComment(e)}>
          Comment
        </button>
      </form>
      {posts[0].comments?.map((comment) => {
        return <Comment key={comment._id} comment={comment} />;
      })}
    </>
  );
};

export default FullPost;
