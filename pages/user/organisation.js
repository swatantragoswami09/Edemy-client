import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/index";
import { DarkModeContext } from "../../context/DarkModeContext";
import { Tree, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Organisation = () => {
  const {
    state: { user },
  } = useContext(Context);
  const { isDarkMode } = useContext(DarkModeContext);

  const mainUser = user?.user;
  const mainUserId = mainUser?._id;

  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  // Recursive Tree Function
  const tree = async (user, userId) => {
    try {
      const res = await axios.post("/api/getReferralsById", {
        userId: userId,
      });

      // Check if data exists
      if (res?.data?.user?.length > 0) {
        const referrals = res.data.user[0]?.referrals || [];
        const children = [];

        for (const item of referrals) {
          const child = {
            title: (
              <>
                <UserOutlined
                  style={{
                    marginRight: "5px",
                    color: "#1890ff",
                  }}
                />
                {item.user?.name || "Anonymous"} (BV:78437843)
                {/* {item.user?.name || "Anonymous"} (BV:{item.user?._id}) */}
              </>
            ),

            key: item.user?._id,
            icon: (
              <UserOutlined
                style={{
                  color: "#1890ff",
                }}
              />
            ),
            children: [],
          };
          child.children = await tree(item.user, item.user?._id); // Call tree recursively for each referral's user
          children.push(child);
        }
        return children;
      }
    } catch (error) {
      console.error("Error fetching referrals:", error);
    }
  };

  useEffect(() => {
    const generateTreeData = async () => {
      if (mainUser) {
        const data = await tree(mainUser, mainUserId);
        setTreeData(data);
        // Get all the keys from the treeData and set them as expanded keys
        const allKeys = [];
        const extractKeys = (treeData) => {
          treeData.forEach((item) => {
            allKeys.push(item.key);
            if (item.children && item.children.length > 0) {
              extractKeys(item.children);
            }
          });
        };
        extractKeys(data);
        setExpandedKeys(allKeys);
      }
    };
    generateTreeData();
  }, [mainUser, mainUserId]);

  return (
    <>
      <div>
        <div className="row pt-2">
          <div
            className={`col-md-8 offset-md-2 p-5 ${
              isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
            }`}
          >
            <Card title="Referrals Structure">
              <Tree
                showLine
                expandedKeys={expandedKeys}
                onExpand={setExpandedKeys}
                treeData={treeData}
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organisation;
