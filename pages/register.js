import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import { DarkModeContext } from "../context/DarkModeContext";
import { loginUserApi, registerUserApi } from "../components/api";
// import { Footer } from "../components/footer/Footer";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const validateName = (input) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(input);
};

const validateEmail = (input) => {
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

  // Password must be at least 8 characters long
  if (input.length < 8) {
    toast.error("Password must be at least 8 characters long");
    return false;
  }

  return true;
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();
  const { isDarkMode } = useContext(DarkModeContext);

  if (user !== null) {
    router.push("/");
    return null;
  }

  const handleLogin = async (email, password) => {
    setLoading(true);
    const data = await loginUserApi(email, password);

    if (!data) {
      setLoading(false);
    } else {
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      window.localStorage.setItem("user", JSON.stringify(data));

      router.push("/user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(name)) {
      toast.error("Please enter a valid name");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    setLoading(true);
    const data = await registerUserApi(name, email, password);

    if (!data) {
      setLoading(false);
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);

      handleLogin(email, password);
      toast.success(`${name} Registration Successful. Redirecting`);
    }
  };

  return (
    <>
      <div
        className={`container-fluid ${isDarkMode ? "bg-dark" : "bg-light"} `}
      >
        <h1 className="jumbotron text-center bg-primary square">Register</h1>
        <div className="container col-md-4 offset-md-4 pb-5">
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              className={` mb-4 p-4 pt-4 ${
                isDarkMode ? "bg-dark text-light" : ""
              }`}
              style={{
                border: isDarkMode ? "1px solid #ffffff" : "1px solid #000000",
              }}
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="email"
              className={` mb-4 p-4 pt-4 border ${
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
              className={` mb-4 p-4 pt-4 ${
                isDarkMode ? "bg-dark text-light" : ""
              }`}
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
              className="btn btn-block btn-primary form-control mb-4 p-2"
              disabled={!name || !email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </form>
          <p className={`text-center pt-3 ${isDarkMode ? "text-light" : ""}`}>
            Already registered ? <Link href="/login">Login</Link>
          </p>
        </div>

        {/* footer */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Register;
