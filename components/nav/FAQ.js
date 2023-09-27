import Link from "next/link";
import { useEffect, useState } from "react";

const FAQ = () => {
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
      <Link href="/faq">
        <a className={`nav-link ${current === "/faq" && "active"}`}>FAQ</a>
      </Link>
      <Link href="/FAQ/">
        <a className={`nav-link ${current === "/FAQ/" && "active"}`}>Page 1</a>
      </Link>
    </div>
  );
};

export default FAQ;
