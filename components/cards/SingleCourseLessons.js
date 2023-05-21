import { List, Avatar } from "antd";

const SingleCourseLessons = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
}) => {
  console.log("showModal=>", showModal);
  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col lesson-list">
          {lessons && <h4>{lessons.length} Lessons</h4>}
          <hr />
          <List
            itemLayout="horizontal"
            dataSource={lessons}
            renderItem={(item, index) => {
              console.log("item=>", item);
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
