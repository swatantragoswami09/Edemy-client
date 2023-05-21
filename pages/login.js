import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("swatantragoswami09@gmail.com");
  const [password, setPassword] = useState("Swatantra@123");
  const [loading, setLoading] = useState(false);

  // state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

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
      <h1 className="jumbotron text-center bg-primary square">Login</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          <button
            type="submit"
            className="btn btn-block btn-primary form-control mb-4 p-2"
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <p className="text-center pt-3">
          Not yet registered ? <Link href="/register">Register</Link>
        </p>
        <p className="text-center text-danger">
          Forget password ? <Link href="/forget-password">Forget password</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
