import {
  FacebookOutlined,
  InstagramFilled,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";

export const Footer = () => {
  return (
    <h2 className="jumbotronFooter bg-primary ">
      Get in touch with our team <br />
      <div style={{ cursor: "pointer" }}>
        <FacebookOutlined /> <LinkedinOutlined /> <InstagramFilled />{" "}
        <TwitterOutlined /> <YoutubeFilled />{" "}
      </div>
    </h2>
  );
};
