import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import { DarkModeContext } from "../context/DarkModeContext";

const ForgetPassword = () => {
  // state
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // context
  const {
    state: { user },
  } = useContext(Context);

  const { isDarkMode } = useContext(DarkModeContext);

  // router
  const router = useRouter();

  // redirect if user is logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forget-password", { email });
      setSuccess(true);
      toast("Check your email for the secret code");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.response.data);
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log("email, code,", email, code, newPassword);
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading(false);
      toast("Great! Now you can loging with your new password");
    } catch (error) {
      setLoading(false);
      toast(error.response.data);
    }
  };
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">
        Forget Password
      </h1>

      <div className="container col-md-4 offset-md-4 pb-5 ">
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input
            type="email"
            className={`form-control mb-4 p-4 ${
              isDarkMode ? "bg-dark text-light" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          {success && (
            <>
              <input
                type="text"
                className={`form-control mb-4 p-4 ${
                  isDarkMode ? "bg-dark text-light" : ""
                }`}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter secret code"
                required
              />
              <input
                type="password"
                className={`form-control mb-4 p-4 ${
                  isDarkMode ? "bg-dark text-light" : ""
                }`}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            className={`btn btn-block btn-primary form-control mb-4 p-2 ${
              isDarkMode ? "btn-primary" : "btn-primary"
            }`}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
