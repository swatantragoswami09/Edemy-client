import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Progress, Switch } from "antd";
import ReactPlayer from "react-player";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

const UpdateLessonForm = ({
  current,
  setCurrent,
  handleUpdateLesson,
  uploading,
  uploadVideoButtonText,
  handleVideo,
  progress,
}) => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="container pt-3 ">
      {/* {JSON.stringify(current)} */}
      <form onSubmit={handleUpdateLesson}>
        <input
          type="text"
          className={`form-control square ${
            isDarkMode ? "bg-dark" : "bg-light"
          }   ${isDarkMode ? "text-light" : "text-dark"}`}
          onChange={(e) => setCurrent({ ...current, title: e.target.value })}
          value={current.title}
          autoFocus
          required
        />
        <textarea
          // className="form-control mt-3"
          className={`form-control mt-3 ${
            isDarkMode ? "bg-dark" : "bg-light"
          }   ${isDarkMode ? "text-light" : "text-dark"}`}
          cols="7"
          rows="7"
          onChange={(e) => setCurrent({ ...current, content: e.target.value })}
          value={current.content}
        ></textarea>
        <div>
          {!uploading && current.video && current.video.Location && (
            <div className="pt-2 d-flex justify-content-center">
              <ReactPlayer
                url={current.video.Location}
                width="410px"
                height="240px"
                controls
              />
            </div>
          )}

          <label
            className="btn btn-dark btn-block mt-3"
            style={{ width: "100%" }}
          >
            {uploadVideoButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}
        {current.free_preview ? "ya" : "na"}
        <div className="d-flex justify-content-between">
          <span className="pt-3 badge">Preview</span>
          <Switch
            className="float-right mt-2"
            disabled={uploading}
            checked={current.free_preview}
            name="free_preview"
            onChange={(v) => setCurrent({ ...current, free_preview: v })}
          />
        </div>
        <Button
          onClick={handleUpdateLesson}
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

export default UpdateLessonForm;
