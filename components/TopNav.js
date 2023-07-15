import { Menu, Switch } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { DarkModeContext } from "../context/DarkModeContext";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = ({}) => {
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  console.log("TopNav.js", isDarkMode);
  // to control the body background color's toggle
  useEffect(() => {
    document.body.style.setProperty(
      "--body-background-color",
      isDarkMode ? "#222529" : "#F8F9FA"
    );
  }, [isDarkMode]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[current]}
      className={`${isDarkMode ? "bg-dark" : "bg-light"}   ${
        isDarkMode ? "text-light" : "text-dark"
      }`}
    >
      <Item key="/" onClick={(e) => setCurrent(e.key)}>
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>

      {/* Become Instructor */}
      {!user && (
        <Item key="/user/become-instructor" onClick={(e) => setCurrent(e.key)}>
          <Link href="/user/become-instructor">
            <a>Become Instructor</a>
          </Link>
        </Item>
      )}

      {/* Dark mode toggle */}
      <Item key="darkModeToggle" className="dark-mode-toggle">
        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
        />
      </Item>

      {/* Login */}
      {!user && (
        <Item key="/login" onClick={(e) => setCurrent(e.key)}>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </Item>
      )}

      {/* Register */}
      {!user && (
        <Item key="/register" onClick={(e) => setCurrent(e.key)}>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </Item>
      )}

      {/* User menu */}
      {user && (
        <SubMenu title={user.name} className="float-right">
          <ItemGroup>
            <Item key="/user">
              <Link href="/user">
                <a>Dashboard</a>
              </Link>
            </Item>
            <Item onClick={logout}>Logout</Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
