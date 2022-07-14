import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost, getAllPosts } from "../services/post";
import { setPosts } from "../redux/slices/posts";
import Post from "../components/Post";

const Home = () => {
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      const result = await getAllPosts(user);
      if (result.error) {
        console.log("Error on Home GetPosts", result.error);
      } else {
        console.log("Home have these posts : ", result);
        dispatch(setPosts(result));
      }
    };
    getPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const result = await createPost(user, text, "default");
    dispatch(setPosts([...posts.all, result]));
  };

  return (
    <>
      <h1>Home</h1>
      <form>
        <h2>Text</h2>
        <input
          type={"text"}
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder={"Yo ! Wassup ?"}
        />
        <button onClick={async (e) => await handleCreatePost(e)}>Post</button>
      </form>
      {posts.all?.map((aPost) => {
        return <Post key={aPost._id} post={aPost} />;
      })}
    </>
  );
};

export default Home;
