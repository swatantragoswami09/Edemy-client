import { useEffect, useContext, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { Context } from "../../context/index";
import { DarkModeContext } from "../../context/DarkModeContext";

const Organisation = () => {
  const {
    state: { user },
  } = useContext(Context);
  // const { user } = state;
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [referrals, setReferrals] = useState({});
  const [count, setCount] = useState(0);
  console.log("user=>", user);

  useEffect(async () => {
    const res = await axios.post("/api/getReferralsById", {
      userId: user.user._id,
    });
    console.log("res=>", res);
    // tree(user?.user, user?.user?._id);
  }, [user]);

  const userReferrels = useMemo(() => {
    return referrals.user && referrals.user[0]
      ? referrals.user[0].referrals.map((ref) => {
          console.log("ref=>", ref);
          return ref.user;
        })
      : null;
  }, [referrals, count]);
  // console.log("referrals.user=>", referrals.user);

  console.log("userReferrels", userReferrels);
  return (
    <>
      <div>
        <div className="row pt-2">
          <div
            className={`col-md-8 offset-md-2 bg-light p-5   ${
              isDarkMode ? "bg-dark" : "bg-light"
            }   ${isDarkMode ? "text-light" : "text-dark"}`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Organisation;
