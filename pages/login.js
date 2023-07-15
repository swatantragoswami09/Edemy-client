import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../context";
import { DarkModeContext } from "../context/DarkModeContext";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("swatantragoswami09@gmail.com");
  const [password, setPassword] = useState("Swatantra@123");
  const [loading, setLoading] = useState(false);

  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const { isDarkMode } = useContext(DarkModeContext);

  console.log("login.js", isDarkMode);

  console.log("state=>", state);

  // router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table({ name, email, password });

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));

      // redirect
      router.push("/user");

      // setLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className={`container-fluid ${isDarkMode ? "bg-dark" : "bg-light"} `}
      >
        <h1
          className={`jumbotron text-center ${
            isDarkMode ? "bg-dark" : "bg-primary"
          } square`}
        >
          Login
        </h1>
        <div
          className={`container-fluid col-md-4 offset-md-4 pb-5 ${
            isDarkMode ? "text-light" : ""
          }  ${isDarkMode ? "bg-dark" : "bg-light"}`}
        >
          <form onSubmit={handleSubmit} className="pt-4">
            <input
              type="email"
              className={`form-control mb-4 p-4 pt-4 ${
                isDarkMode ? "bg-dark text-light" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <input
              type="password"
              className={`form-control mb-4 p-4 ${
                isDarkMode ? "bg-dark text-light" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />

            <button
              type="submit"
              className={`btn btn-block  form-control mb-4 p-2 ${
                isDarkMode ? "btn-primary" : "btn-primary"
              }`}
              disabled={!email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </form>
          <p className={`text-center pt-3 ${isDarkMode ? "text-light" : ""}`}>
            Not yet registered ? <Link href="/register">Register</Link>
          </p>
          <p
            className={`text-center text-danger ${
              isDarkMode ? "text-light" : ""
            }`}
          >
            Forget password ?{" "}
            <Link href="/forget-password">Forget password</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
