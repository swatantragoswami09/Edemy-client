import React, { useState, useEffect, useContext } from "react";
import { Menu, Switch, Input, AutoComplete } from "antd";
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
  AlignRightOutlined,
} from "@ant-design/icons";
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

  const [searchValue, setSearchValue] = useState("");
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const router = useRouter();

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

  const handleSearchSuggestions = async (value) => {
    if (value) {
      try {
        const { data } = await axios.get(`/api/courses/search/${value}`);
        if (data.length === 0) {
          setSuggestedCourses([
            <div key="noResults" style={{ padding: "8px" }}>
              No search results
            </div>,
          ]);
        } else {
          setSuggestedCourses(
            data.map((course) => (
              <div
                key={course._id}
                onClick={() => router.push(`/course/${course.slug}`)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "8px",
                }}
              >
                <img
                  src={course.image?.Location}
                  alt={course.name}
                  style={{ width: "40px", marginRight: "10px" }}
                />
                <div>
                  <strong>{course.name}</strong>
                  <br />
                  {course.instructor.name}
                </div>
              </div>
            ))
          );
        }
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    } else {
      setSuggestedCourses([]);
    }
  };

  const handleSearch = () => {
    if (searchValue) {
      const selectedCourseName = searchValue.split("<br/>")[0].trim();
      router.push(`/course/search/${selectedCourseName}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleSearch();
    }
  };
  return (
    <Menu
      mode="horizontal"
      selectedKeys={[current]}
      className={`${isDarkMode ? "bg-dark" : "bg-light"} ${
        isDarkMode ? "text-light" : "text-dark"
      }`}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Item key="/" onClick={() => setCurrent("/")}>
          <Link href="/">
            <a>
              <AppstoreOutlined /> App
            </a>
          </Link>
        </Item>
        {user &&
        user.user &&
        user.user.role &&
        user.user.role.includes("Instructor") ? (
          <Item
            key="/instructor/course/create"
            onClick={() => setCurrent("/instructor/course/create")}
          >
            <Link href="/instructor/course/create">
              <a>
                <CarryOutOutlined /> Create Course
              </a>
            </Link>
          </Item>
        ) : (
          <Item
            key="/user/become-instructor"
            onClick={() => setCurrent("/user/become-instructor")}
          >
            <Link href="/user/become-instructor">
              <a>
                <TeamOutlined /> Become Instructor
              </a>
            </Link>
          </Item>
        )}
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
        <Item
          key="/about"
          onClick={(e) => console.log("about")}
          icon={<AlignRightOutlined />}
        >
          <Link href="/about">
            <a>About</a>
          </Link>
        </Item>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: 300 }}
          options={suggestedCourses.map((course) => ({ value: course }))}
          onSearch={handleSearchSuggestions}
          value={searchValue}
        >
          <Input.Search
            size="medium"
            placeholder="Search for a course"
            enterButton
            onSearch={handleSearch}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </AutoComplete>
        {user === null ? (
          <>
            <Item key="/login" onClick={() => setCurrent("/login")}>
              <Link href="/login">
                <a>
                  <LoginOutlined /> Login
                </a>
              </Link>
            </Item>
            <Item key="/register" onClick={() => setCurrent("/register")}>
              <Link href="/register">
                <a>
                  <UserAddOutlined /> Register
                </a>
              </Link>
            </Item>
          </>
        ) : (
          <>
            {user?.user?.role && user?.user?.role.includes("Instructor") && (
              <Item
                key="/instructor"
                onClick={(e) => setCurrent(e.key)}
                icon={<TeamOutlined />}
              ></Item>
            )}
            {user.user.role && user.user.role.includes("Instructor") && (
              <Item key="/instructor" onClick={() => setCurrent("/instructor")}>
                <Link href="/instructor">
                  <a>
                    <TeamOutlined /> Instructor
                  </a>
                </Link>
              </Item>
            )}
            <SubMenu
              icon={<CoffeeOutlined />}
              title={user?.user && user?.user?.name}
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
                <Item onClick={logout}>
                  <LogoutOutlined /> Logout
                </Item>
              </ItemGroup>
            </SubMenu>
          </>
        )}
      </div>
    </Menu>
  );
};

export default TopNav;
