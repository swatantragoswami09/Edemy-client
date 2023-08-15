import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";

// E-> Education
// E-> Examination
// E-> Experience
// E-> Ethics
// yeh mat bhoolna tony stark ne bhi iron man patharo ke beech banaya tha

const UserRoute = ({ children, showNav = true }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      console.log("data=>", data);
      if (data.ok) setOk(true);
    } catch (error) {
      console.log(error);
      setOk(false);
      router.push("/login");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content display-1 text-primary p-5"
        />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">{showNav && <UserNav />}</div>

            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRoute;
