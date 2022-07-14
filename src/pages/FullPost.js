import { useSelector, useDispatch } from "react-redux";
import { setPosts, addComment } from "../redux/slices/posts";
import { useEffect, useState } from "react";
import { createComment, likeComment, unlikeComment } from "../services/comment";
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { getOnePost } from "../services/post";

const FullPost = () => {
  const user = useSelector((state) => state.user);
  const [text, setText] = useState("");
  const params = useParams();
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPost = async () => {
      const response = await getOnePost(user, params.id);
      console.log("Get one post result :", response);
      if (response._id) {
        dispatch(setPosts([response]));
      }
    };
    getPost();
  }, []);

  const handleCreateComment = async (e) => {
    e.preventDefault();
    const response = await createComment(user, text, posts.all[0]._id);
    if (response._id) {
      dispatch(addComment(response));
    }
  };

  if (!posts.all[0]) return null;
  return (
    <>
      <h1>Full post</h1>
      <Post post={posts.all[0]}></Post>
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
      {posts.all[0].comments?.map((comment) => {
        return <Comment key={comment._id} comment={comment} />;
      })}
    </>
  );
};

export default FullPost;
