import { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import InstructorRoute from "../../components/routes/InstructorRoute";
import axios from "axios";
import {
  DollarOutlined,
  SettingOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { DarkModeContext } from "../../context/DarkModeContext";

import { currency, currencyFormatter } from "../../utils/helpers";

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] });
  const [loading, setLoading] = useState(false);

  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    sendBalanceRequest();
  }, []);
  const sendBalanceRequest = async () => {
    const { data } = await axios.get("/api/instructor/balance");
    setBalance(data);
  };
  const handlePayoutSettings = async () => {
    try {
      console.log("hi there");
      //   setLoading(true);
      //   const { data } = await axios.get("/api/instructor/payout-settings");
      //   window.location.href = data;
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Unable to access payout settings. Try later.");
    }
  };
  return (
    <InstructorRoute>
      <div>
        <div className="row pt-2">
          <div
            style={{
              marginTop: "25px",
              borderRadius: "50px",
              backgroundImage:
                "linear-gradient(to right, #0652C5, #BFDFD4,  #FF0000)",
            }}
            className={`col-md-8 offset-md-2 bg-light p-5   ${
              isDarkMode ? "bg-dark" : "bg-light"
            }   ${isDarkMode ? "text-light" : "text-dark"}`}
          >
            <h2 style={{ display: "flex", justifyContent: "space-between" }}>
              Revenue report
              <DollarOutlined
                className={` float-right  ${
                  isDarkMode ? "text-light" : "text-dark"
                }`}
              />
            </h2>
            <small>
              You get paid directly from stripe to your bank account every 48
              hours
            </small>
            <hr />
            {/* {JSON.stringify(balance, null, 4)} */}
            <h4 style={{ display: "flex", justifyContent: "space-between" }}>
              Pending balance{" "}
              {balance.pending &&
                balance.pending.map((bp, i) => {
                  return (
                    <span key={i} className="float-right">
                      {currencyFormatter(bp)}
                    </span>
                  );
                })}
            </h4>
            <small>For 48 hours</small>
            <hr />
            <h4 style={{ display: "flex", justifyContent: "space-between" }}>
              Payouts{" "}
              {!loading ? (
                <SettingOutlined
                  className="float-right pointer"
                  onClick={handlePayoutSettings}
                />
              ) : (
                <SyncOutlined spin className="float-right pointer" />
              )}
            </h4>
            <small>
              Update your stripe account details or view preview payout
            </small>
          </div>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default InstructorRevenue;
