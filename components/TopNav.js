import { Menu, Switch } from "antd";
import Link from "next/link";
import {
  BulbOutlined,
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useContext } from "react";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { DarkModeContext } from "../context/DarkModeContext";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  console.log("state=>", state);

  const router = useRouter();

  // to control the body background color's toggle
  useEffect(() => {
    document.body.style.setProperty(
      "--body-background-color",
      isDarkMode ? "#222529" : "#F8F9FA"
    );
  }, [isDarkMode]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    } else {
      process.browser && setCurrent(window.location.pathname);
    }
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({
      type: "LOGOUT",
    });
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <Item
          key="/"
          onClick={(e) => setCurrent(e.key)}
          icon={<AppstoreOutlined />}
        >
          <Link href="/">
            <a>App</a>
          </Link>
        </Item>
        {user &&
        user.user &&
        user.user.role &&
        user.user.role.includes("Instructor") ? (
          <Item
            key="/instructor/course/create"
            onClick={(e) => setCurrent(e.key)}
            icon={<CarryOutOutlined />}
          >
            <Link href="/instructor/course/create">
              <a>Create Course</a>
            </Link>
          </Item>
        ) : (
          <Item
            key="/user/become-instructor"
            onClick={(e) => setCurrent(e.key)}
            icon={<TeamOutlined />}
          >
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
      </div>

      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
      >
        {user === null ? (
          <>
            <Item
              key="/login"
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
            >
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Item>
            <Item
              key="/register"
              onClick={(e) => setCurrent(e.key)}
              icon={<UserAddOutlined />}
            >
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Item>
          </>
        ) : (
          <>
            {user.user.role && user.user.role.includes("Instructor") && (
              <Item
                key="/instructor"
                onClick={(e) => setCurrent(e.key)}
                icon={<TeamOutlined />}
              >
                <Link href="/instructor">
                  <a>Instructor</a>
                </Link>
              </Item>
            )}
            <SubMenu
              icon={<CoffeeOutlined />}
              title={user.user && user.user.name}
              className="float-right"
            >
              <ItemGroup>
                <Item key="/user">
                  <Link href="/user">
                    <a>Dashboard</a>
                  </Link>
                </Item>
                <Item key="/settings">
                  <Link href="/settings">
                    <a>Settings</a>
                  </Link>
                </Item>
                <Item onClick={logout}>Logout</Item>
              </ItemGroup>
            </SubMenu>
          </>
        )}
      </div>
    </Menu>
  );
};

export default TopNav;
