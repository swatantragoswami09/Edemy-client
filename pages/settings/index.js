import {
  SyncOutlined,
  SettingOutlined,
  EditOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import React, { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { Context } from "../../context";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import copy from "copy-to-clipboard";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const [name, setName] = useState("swatantra");
  const [email, setEmail] = useState("");
  const [referrals, setReferrals] = useState();
  const [loading, setLoading] = useState(true);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    state: { user },
  } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/");
    axios
      .post(`/api/getReferralsById`, {
        userId: user?.user?._id,
      })
      .then((response) => {
        setReferrals(
          response.data.user[0] && response?.data?.user[0]?.referralLink
        );
      });
    setLoading((prev) => !prev);
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleUpdateUserNameSubmit = (event) => {
    event.preventDefault();
    console.log("name=>", name);
    console.log("hi there");
    //  need to call the update API
  };
  const modalPreview = (isModalOpen) => {
    return (
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <form onSubmit={handleUpdateUserNameSubmit}>
          {/* username */}
          <h4>UserName</h4>
          <input
            type="text"
            className={`form-control mb-4 p-4 pt-4 ${
              isDarkMode ? "bg-dark text-light" : ""
            }`}
            value={user && user.user.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          {/* email */}
          <h4>Email</h4>
          <input
            type="text"
            className={`form-control mb-4 p-4 pt-4 ${
              isDarkMode ? "bg-dark text-light" : ""
            }`}
            value={user && user.user.email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter name"
          />
          {/* password */}
          <h4>Password</h4>
          <input
            type="text"
            className={`form-control mb-4 p-4 pt-4 ${
              isDarkMode ? "bg-dark text-light" : ""
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />

          <button
            type="submit"
            className="btn btn-block btn-primary form-control mb-4 p-2"
            disabled={!name}
          >
            {loading ? <SyncOutlined spin /> : "Update"}
          </button>
        </form>
      </Modal>
    );
  };
  const copyToClipboard = (copyText) => {
    copy(copyText);
    toast(`You have copied "${copyText}"`);
  };
  return (
    <>
      {modalPreview(isModalOpen)}
      {loading ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-danger p-5"
        />
      ) : (
        <>
          {/* modal preview */}
          <div>
            <div className="row pt-2">
              <div
                style={{
                  marginTop: "25px",
                  borderRadius: "50px",
                  backgroundImage:
                    "linear-gradient(to right,  #0652C5, #000000)",
                }}
                className={`col-md-8 offset-md-2 bg-light p-5   ${
                  isDarkMode ? "bg-dark" : "bg-light"
                }   ${isDarkMode ? "text-light" : "text-light"}`}
              >
                {/* Setting heading and icon */}
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Setting
                  <div>
                    <SettingOutlined className={` float-right `} />
                    <EditOutlined onClick={showModal} />
                  </div>
                </h2>

                {/* referral Id */}
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Referral Id
                  <div>
                    <Button
                      type="primary"
                      style={{ background: "lightgreen", color: "black" }}
                      onClick={() => copyToClipboard(referrals)}
                      icon={<CopyOutlined />}
                    >
                      copy
                    </Button>
                    {"  "}
                    {referrals}
                  </div>
                </h2>
                <hr />

                {/* Username */}
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  UserName
                  <div>{user?.user?.name} </div>
                </h2>
                <hr />

                {/* email */}
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Email
                  <div>{user?.user?.email} </div>
                </h2>
                <hr />

                {/* Password */}
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Password
                  <div>Swatantra@123</div>
                </h2>
                <hr style={{ color: "white" }} />

                {/* Total Team members */}
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Total Team Size
                  <div>500 </div>
                </h2>
                <hr style={{ color: "white" }} />

                {/* Total BV */}
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Total BV
                  <div>3500 BV </div>
                </h2>
                <hr style={{ color: "white" }} />

                {/* Stripe account */}
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Stripe Account Id
                  <div>{user && user.user.stripe_account_id} </div>
                </h2>
                <hr />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Settings;
