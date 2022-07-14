//hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//components
import Post from "../components/Post";

//services
import { getAllPostsByUser } from "../services/post";
import { getOne } from "../services/user";

//actions
import { setPosts } from "../redux/slices/posts";

const Profile = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState();
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = async () => {
      //Fetch profile infos
      const response = await getOne(user, id);
      console.log(response);
      if (response._id) {
        //Set profile infos
        setProfile(response);
        const allPosts = await getAllPostsByUser(user, id);
        dispatch(setPosts(allPosts));
      } else {
        console.log("error");
      }
    };
    getProfile();
  }, []);

  if (!profile) return null;

  return (
    <>
      <h1>Profile</h1>
      {
        //display profile infos
        profile._id !== "" && (
          <>
            <h2>{profile.userName}</h2>
            <p>{profile.bio}</p>
          </>
        )
      }
      {
        //map posts
        posts.all !== [] &&
          posts.all.map((post) => {
            return <Post key={post._id} post={post} />;
          })
      }
    </>
  );
};

export default Profile;
