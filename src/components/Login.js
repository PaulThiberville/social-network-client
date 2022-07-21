import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { userActions } from "../redux/slices/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(userActions.login({ email, password }));
  };

  return (
    <>
      {user.error && <p>Error : {user.error}</p>}
      <h1>Login</h1>
      <form>
        <h2>Email</h2>
        <input
          type={"email"}
          placeholder={"example : user1234@something.com"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <h2>Password</h2>
        <input
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={async (e) => await handleLogin(e)}>Login</button>
      </form>
    </>
  );
};

export default Login;
