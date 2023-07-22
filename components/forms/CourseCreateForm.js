import { Select, Button, Avatar, Badge } from "antd";
const { Option } = Select;
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  uploadButtionText,
  handleImageRemove = (f) => f,
  editPage = false,
}) => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const children = []; // 9.99
  for (let i = 9.99; i < 99.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }
  console.log("values=>", values);
  return (
    <>
      {values && (
        <form
          className={`form-group ${isDarkMode ? "bg-dark" : "bg-light"}`}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group pt-3">
            <textarea
              name="description"
              cols="7"
              rows="7"
              value={values.description}
              className="form-control"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-row pt-3">
            <div className="col">
              <div className="form-group">
                <Select
                  onChange={(v) => setValues({ ...values, paid: v, price: 0 })}
                  value={values.paid}
                  style={{ width: "100%" }}
                  size="large"
                >
                  <Option value={true}>Paid</Option>
                  <Option value={false}>Free</Option>
                </Select>
              </div>
            </div>

            {values.paid && (
              <div className="form-group pt-3">
                <Select
                  defaultValue="$9.99"
                  style={{ width: "100%" }}
                  onChange={(v) => setValues({ ...values, price: v })}
                  tokenSeparators={[,]}
                  size="large"
                >
                  {children}
                </Select>
              </div>
            )}
          </div>
          <div className="form-group pt-3">
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Category"
              value={values.category}
              onChange={handleChange}
            />
          </div>
          <div className="form-row pt-3"></div>
          <div className="col">
            <div className="form-group">
              <label
                className="btn btn-outline-secondary btn-block text-left"
                style={{ width: "100%" }}
              >
                {uploadButtionText}
                <input
                  type="file"
                  name="image"
                  onChange={handleImage}
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          {preview && (
            <Badge
              count="X"
              onClick={handleImageRemove}
              style={{ cursor: "pointer" }}
            >
              {" "}
              <Avatar width={200} src={preview} />
            </Badge>
          )}
          {editPage && values.image && (
            <Avatar width={200} src={values.image.Location} />
          )}
          <div className="row">
            <div className="col">
              <Button
                onClick={handleSubmit}
                disabled={values.loading || values.uploading}
                className="btn btn-primary mt-3"
                // icon={<SaveOutlined />}
                loading={values.loading}
                type="primary"
                size="large"
                shape="round"
              >
                {values.loading ? "Saving..." : "Save & continue"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default CourseCreateForm;
