import Link from "next/link";
import { useEffect, useState } from "react";

const AboutNav = () => {
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
      <Link href="/about">
        <a className={`nav-link ${current === "/about" && "active"}`}>About</a>
      </Link>
      <Link href="/about/content/page1">
        <a
          className={`nav-link ${
            current === "/about/content/page1" && "active"
          }`}
        >
          Page 1
        </a>
      </Link>
    </div>
  );
};

export default AboutNav;
