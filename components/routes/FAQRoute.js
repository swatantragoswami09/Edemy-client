import { SyncOutlined } from "@ant-design/icons";
import AboutNav from "../nav/AboutNav";
import { useState } from "react";
import FAQ from "../nav/FAQ";

// E-> Education
// E-> Examination
// E-> Experience
// E-> Ethics
// yeh mat bhoolna tony stark ne bhi iron man patharo ke beech banaya tha

const FAQRoute = ({ children }) => {
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
              <FAQ />
            </div>

            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQRoute;
