//hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//components
import Post from "../components/Post";

//actions
import { postsActions } from "../redux/slices/posts";
import { getOne } from "../services/user";

const Profile = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [profile, setProfile] = useState();
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = async () => {
      //Fetch profile infos
      const response = await getOne(user, id);
      if (response._id) {
        //Set profile infos
        setProfile(response);

        dispatch(postsActions.setProfilePosts({ user, id }));
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
        posts.length &&
          posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })
      }
    </>
  );
};

export default Profile;
