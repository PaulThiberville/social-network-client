import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../redux/slices/user";
import { useEffect } from "react";
import Auth from "../pages/Auth";

const Layout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      dispatch(setUser(localUser));
    }
  }, []);

  if (user.id === "" || user.token === "") return <Auth />;
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to={"/profile/" + user.id}>Profile</Link>
        <Link to="/" onClick={() => dispatch(clearUser())}>
          Logout
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
