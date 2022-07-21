import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/slices/user";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setContirm] = useState("");
  const [userName, setUserName] = useState("");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userActions.register({ userName, email, password }));
  };

  return (
    <>
      {user.error && <p>Error: {user.error}</p>}
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
