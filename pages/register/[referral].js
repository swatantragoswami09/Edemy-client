import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../../context";
import { useRouter } from "next/router";
import { DarkModeContext } from "../../context/DarkModeContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralId, setReferralId] = useState("");
  const [loading, setLoading] = useState(false);

  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  // router
  const router = useRouter();
  // DarkModeContext
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const referralIdFromURL = window.location.pathname.replace(
      "/register/",
      ""
    );
    setReferralId(referralIdFromURL);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table({ name, email, password, referralId });

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register/${referralId}`, {
        name,
        email,
        password,
      });

      toast.success("Registration Successful. Please login.");

      router.push("/");
      setLoading(false);
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
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
            {referralId && (
              <input
                type="text"
                className={`form-control mb-4 p-4 pt-4 ${
                  isDarkMode ? "bg-dark text-light" : ""
                }`}
                value={referralId}
                placeholder={referralId}
                onChange={(e) => setReferralId(e.target.value)}
                disabled="disabled"
              />
            )}
            <button
              type="submit"
              className="btn btn-block btn-primary form-control mb-4 p-2"
              disabled={!name || !email || !password || !referralId || loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </form>
          <p className={`text-center pt-3 ${isDarkMode ? "text-light" : ""}`}>
            Already registered ? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
