import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Auth from "../pages/Auth";
import { userActions } from "../redux/slices/user";

const Layout = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      dispatch(userActions.setUser(localUser));
    }
  }, []);

  if (!user.token)
    return (
      <>
        <Auth />
      </>
    );
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to={"/profile/" + user.id}>Profile</Link>
        <Link to="/" onClick={() => dispatch(userActions.clearUser())}>
          Logout
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
