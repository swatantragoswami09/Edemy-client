import Link from "next/link";
import { useEffect, useState } from "react";

const UserNav = () => {
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
      <Link href="/user">
        <a className={`nav-link ${current === "/user" && "active"}`}>
          Dashboad
        </a>
      </Link>
      <Link href="/user/organisation">
        <a
          className={`nav-link ${current === "/user/organisation" && "active"}`}
        >
          Oraganisation
        </a>
      </Link>
      <Link href="/user/transactions">
        <a
          className={`nav-link ${current === "/user/transactions" && "active"}`}
        >
          Transactions
        </a>
      </Link>
    </div>
  );
};

export default UserNav;
