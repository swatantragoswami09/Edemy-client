import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Progress, Tooltip } from "antd";

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
  progress,
  handleVideoRemove,
}) => {
  console.log("values=", values);
  return (
    <div className="container pt-3 ">
      <form onSubmit={handleAddLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder="title"
          autoFocus
          required
        />
        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder="Content"
        ></textarea>
        <div className="d-flex justify-content-center">
          <label
            className="btn btn-dark btn-block mt-3"
            style={{ width: "100%" }}
          >
            {uploadButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>
          {!uploading && values.video.Location && (
            <Tooltip title="Remove">
              <span
                onClick={handleVideoRemove}
                style={{ marginLeft: "10px" }}
                className="pt-1 pl-3"
              >
                <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
              </span>
            </Tooltip>
          )}
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}
        <Button
          onClick={handleAddLesson}
          className="col mt-3"
          size="large"
          type="primary"
          loading={uploading}
          shape="round"
          style={{ width: "100%" }}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddLessonForm;
