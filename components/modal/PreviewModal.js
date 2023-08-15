import { Modal } from "antd";
import { useState, useEffect, useRef } from "react";

const PreviewModal = ({ showModal, setShowModal, preview }) => {
  const [visible, setVisible] = useState(showModal);
  const videoRef = useRef(null);

  useEffect(() => {
    setVisible(showModal);
  }, [showModal]);

  const handleCloseModal = () => {
    if (!videoRef.current.paused) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setVisible(false);
    setShowModal(false);
  };

  const handleVideoClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the modal
  };

  return (
    <Modal
      title="Course Preview"
      visible={visible}
      onCancel={handleCloseModal}
      width={720}
      footer={null}
    >
      <div className="wrapper" onClick={handleVideoClick}>
        <video
          ref={videoRef}
          src={preview}
          controls
          width="100%"
          height="100%"
        ></video>
      </div>
    </Modal>
  );
};

export default PreviewModal;
