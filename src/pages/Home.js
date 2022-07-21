import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Post";
import { postsActions } from "../redux/slices/posts";

const Home = () => {
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.user.user);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsActions.setHomePosts({ user: user }));
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    dispatch(
      postsActions.addPost({ user: user, text: text, imageUrl: "default" })
    );
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
        <button onClick={(e) => handleCreatePost(e)}>Post</button>
      </form>
      {posts.length &&
        posts.map((aPost) => {
          return <Post key={aPost._id} post={aPost} />;
        })}
    </>
  );
};

export default Home;
