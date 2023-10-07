import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import { DarkModeContext } from "../context/DarkModeContext";
import { registerUserApi } from "./API";
import { Footer } from "../components/footer/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  // router
  const router = useRouter();
  // DarkModeContext
  const { isDarkMode } = useContext(DarkModeContext);

  if (user !== null) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await registerUserApi(name, email, password);
      toast.success("Registration Successful. Please login.");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      router.push("/login");
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
        <h1 className="jumbotron text-center bg-primary square">Register</h1>
        <div className="container col-md-4 offset-md-4 pb-5">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className={`form-control mb-4 p-4 pt-4 ${
                isDarkMode ? "bg-dark text-light" : ""
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
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
              className={`form-control mb-4 p-4 pt-4 ${
                isDarkMode ? "bg-dark text-light" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
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
        <Footer />
      </div>
    </>
  );
};

export default Register;
