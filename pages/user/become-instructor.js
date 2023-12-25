import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";
import { DarkModeContext } from "../../context/DarkModeContext";

const BecomeInstructor = () => {
  // state
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  // on clicking payout setup button
  const becomeInstructor = () => {
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((error) => {
        toast("Please login First.");
        console.log(error.response.status);
        toast("Stripe onboarding failed. Try again.");
        setLoading(false);
      });
  };
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">
        Become Instructor
      </h1>
      <div className="container">
        <div className="row">
          <div
            className={` col-md-6 offset-md-3 text-center ${isDarkMode ? "bg-dark" : "bg-light"
              }   ${isDarkMode ? "text-light" : "text-dark"}`}
          >
            <UserSwitchOutlined className="display-1 pb-3" />
            <br />
            <h2>Setup payout to publish courses on SKGUniversity</h2>
            <p className="text-warning">
              SKG parterns with stripe to transfer earning to bank account
            </p>
            {/* show button */}
            <Button
              className="mb-3"
              type="primary"
              block
              shape="round"
              icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
              size="large"
              onClick={becomeInstructor}
              disabled={
                (user && user.role && user.role.includes("Instructor")) ||
                loading
              }
            >
              {loading ? "Processing" : user ? "Payout Setup" : "Please Login"}
            </Button>
            <p className="lead">
              You will be redirected to stripe to complete onboarding precess
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
