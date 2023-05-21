import Link from "next/link";
import { useEffect, useState } from "react";

const InstructorNav = () => {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    } else {
      process.browser && setCurrent(window.location.pathname);
    }
  }, [process.browser && window.location.pathname]);
  return (
    <div className="nav flex-column nav-pills ">
      <Link href="/instructor">
        <a className={`nav-link ${current === "/instructor" && "active"}`}>
          Dashboad
        </a>
      </Link>
      <Link href="/instructor/course/create">
        <a
          className={`nav-link ${
            current === "/instructor/course/create" && "active"
          }`}
        >
          Course Create
        </a>
      </Link>
      <Link href="/instructor/revenue">
        <a
          className={`nav-link ${
            current === "/instructor/revenue" && "active"
          }`}
        >
          Revenue
        </a>
      </Link>
    </div>
  );
};

export default InstructorNav;
