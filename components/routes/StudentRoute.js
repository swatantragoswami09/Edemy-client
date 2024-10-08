import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { currentUserApi } from "../api/";



const StudentRoute = ({ children, showNav = true }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const data = await currentUserApi();
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
        <div className="container-fluid">{children}</div>
      )}
    </>
  );
};

export default StudentRoute;
