import { List, Avatar } from "antd";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
const SingleCourseLessons = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
}) => {
  const { isDarkMode } = useContext(DarkModeContext);

  console.log("showModal=>", showModal);
  return (
    <div
      className={`container-fluid   pt-5  ${
        isDarkMode ? "bg-dark" : "bg-light"
      }   ${isDarkMode ? "text-light" : "text-dark"}`}
      style={{ padding: "0px 120px" }}
    >
      <div className="row">
        <div className="col lesson-list">
          {lessons && <h4>{lessons.length} Lessons</h4>}
          <hr />
          <List
            itemLayout="horizontal"
            dataSource={lessons}
            renderItem={(item, index) => {
              // console.log("item=>", item);
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>{index + 1}</Avatar>}
                    title={item.title}
                  ></List.Item.Meta>
                  {item.video && item.video !== null && item.free_preview && (
                    <span
                      style={{ cursor: "pointer" }}
                      className="text-primary"
                      onClick={() => {
                        setPreview(item.video.Location);
                        setShowModal(!showModal);
                      }}
                    >
                      Preview
                    </span>
                  )}
                </List.Item>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCourseLessons;
