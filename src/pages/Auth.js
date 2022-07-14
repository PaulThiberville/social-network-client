import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [registerIsOpen, setRegisterIsOpen] = useState(false);

  function openLogin() {
    setLoginIsOpen(true);
  }

  function closeLogin() {
    setLoginIsOpen(false);
  }

  function openRegister() {
    setRegisterIsOpen(true);
  }

  function closeRegister() {
    setRegisterIsOpen(false);
  }

  return (
    <>
      <h1>Authentication</h1>
      <button onClick={() => openLogin()}>Login</button>
      <Modal
        isOpen={loginIsOpen}
        onRequestClose={closeLogin}
        contentLabel="Login"
      >
        <Login />
      </Modal>
      <button onClick={() => openRegister()}>Register</button>
      <Modal
        isOpen={registerIsOpen}
        onRequestClose={closeRegister}
        contentLabel="Register"
      >
        <Register />
      </Modal>
    </>
  );
};

export default Auth;
