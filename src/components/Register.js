import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user";
import { register, login } from "../services/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setContirm] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registered = await register(userName, email, password);
    if (registered.error) {
      return console.log("Error on registered :", registered.error);
    }
    console.log("Registered :", registered);

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
      <h1>Register</h1>
      <form>
        <h2>User Name</h2>
        <input
          type={"text"}
          placeholder={"example : Denis"}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
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
        <h2>Confirm</h2>
        <input
          type={"password"}
          onChange={(e) => setContirm(e.target.value)}
          value={confirm}
        />
        <button onClick={async (e) => await handleSubmit(e)}>Register</button>
      </form>
    </>
  );
};

export default Register;
