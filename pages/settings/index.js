import { SyncOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <>
      <SyncOutlined
        spin
        className="d-flex justify-content-center display-1 text-danger p-5"
      />
      <div>
        <div className="row pt-2">
          <div
            className={`col-md-8 offset-md-2 bg-light p-5   ${
              isDarkMode ? "bg-dark" : "bg-light"
            }   ${isDarkMode ? "text-light" : "text-dark"}`}
          >
            <h1>Settings</h1>
            <h2 style={{ display: "flex", justifyContent: "space-between" }}>
              Complete your KYC{" "}
            </h2>
            <small>
              You get paid directly from stripe to your bank account every 48
              hours
            </small>
            <hr />

            <h4 style={{ display: "flex", justifyContent: "space-between" }}>
              Pending balance{" "}
            </h4>
            <small>For 48 hours</small>
            <hr />
            <h4 style={{ display: "flex", justifyContent: "space-between" }}>
              Payouts{" "}
            </h4>
            <small>
              Update your stripe account details or view preview payout
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
