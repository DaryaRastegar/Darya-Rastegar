import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../services/mutations";
import { setCookie } from "../utils/cookie";
import { Link } from "react-router-dom";

import styles from "./LoginPage.module.css"

function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { mutate } = useLogin();

  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const loginHandler = async(event) => {
    event.preventDefault();

    const { username, password } = form;

    if (!username || !password)
      return alert("User Name and Password is Necessary");

    mutate(form, {
      onSuccess: (data) => {
        console.log(data.data);
        setCookie("token", data.data?.token);
        navigate("/");
      },
      onError: (error) => console.log(error.response.data.message),
    });
  };

  return (
    <form onSubmit={loginHandler} className={styles.logIn}>
      <div>
        <img src="Union.svg" alt="" />
        <h3>Log-In Form</h3>
      </div>
      <input
        type="text"
        name="username"
        placeholder="username"
        autoComplete="username"
        value={form.username}
        onChange={changeHandler}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        autoComplete="current-password"
        value={form.password}
        onChange={changeHandler}
      />
      <button type="submit">log-in</button>
      <Link to="/registration">Have you been Registered?</Link>
    </form>
  );
}

export default LoginPage;
