import { SyncOutlined } from "@ant-design/icons";
import AboutNav from "../nav/AboutNav";
import { useState } from "react";
// import { Footer } from "../footer/Footer";


const AboutRoute = ({ children }) => {
  const [ok, setOk] = useState(true);

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
            <div className="col-md-2">
              <AboutNav />
            </div>

            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
      {/* footer */}
      {/* <Footer /> */}
    </>
  );
};

export default AboutRoute;
