import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user";
import { register, login } from "../services/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logged = await login(email, password);
    if (logged.error) {
      return console.log("Error on logged :", logged.error);
    }
    if (logged.userId && logged.token) {
      console.log("Logged : ", logged);
      dispatch(
        setUser({
          id: logged.userId,
          token: logged.token,
        })
      );
    }
    navigate("/");
  };

  return (
    <>
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
        <button onClick={async (e) => await handleSubmit(e)}>Login</button>
      </form>
    </>
  );
};

export default Login;
