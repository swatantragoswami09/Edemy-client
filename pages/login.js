import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../context";
import { DarkModeContext } from "../context/DarkModeContext";
import { useRouter } from "next/router";
import { loginUserApi } from "../components/api";
// import { Footer } from "../components/footer/Footer";
import { toast } from "react-toastify";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const { isDarkMode } = useContext(DarkModeContext);

  // router
  const router = useRouter();

  if (user !== null) {
    router.push("/");
    return null;
  }

  const validateEmail = (input) => {
    // Standard email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const validatePassword = (input) => {
    const conditions = [
      { regex: /(?=.*[A-Z])/, message: "at least one uppercase letter" },
      { regex: /(?=.*[a-z])/, message: "at least one lowercase letter" },
      { regex: /(?=.*\d)/, message: "at least one digit" },
      {
        regex: /(?=.*\W)/,
        message: "at least one non-alphanumeric character",
      },
      {
        regex: /(?=.*[A-Z][a-z])/,
        message: "at least one alphabet in uppercase",
      },
    ];

    for (const condition of conditions) {
      if (!condition.regex.test(input)) {
        toast.error(`Password must contain ${condition.message}`);
        return false;
      }
    }

    // Password must be at least 6 characters long (update this message)
    if (input.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    // All conditions met
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address,Email not found");
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      // Password validation error will be handled by validatePassword function
      return;
    }
    setLoading(true);
    const data = await loginUserApi(email, password);

    if (!data) {
      setLoading(false);
    } else {
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));

      // redirect
      router.push("/user");
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
            <Input
              type="email"
              className={` mb-4 p-4 pt-4 ${
                isDarkMode ? "bg-dark text-light" : ""
              }`}
              style={{
                border: isDarkMode ? "1px solid #ffffff" : "1px solid #000000",
              }}
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input.Password
              type="password"
              className={` mb-4 p-4 ${isDarkMode ? "bg-dark text-light" : ""}`}
              style={{
                border: isDarkMode ? "1px solid #ffffff" : "1px solid #000000",
              }}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
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

        {/* footer */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Login;
