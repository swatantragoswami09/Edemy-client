import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";

const SingleComment = () => {
  const [backendComments, setBackendComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("/api/get-all-comments");
        setBackendComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`/api/get-user/${userId}`);
      return response.data[0].name;
    } catch (error) {
      console.error("Error fetching user name:", error);
      return "Unknown User";
    }
  };

  const Reply = ({ reply, depth }) => {
    const [userName, setUserName] = useState("Loading...");

    useEffect(() => {
      fetchUserName(reply.userId)
        .then((name) => setUserName(name))
        .catch((error) => {
          console.error("Error fetching user name:", error);
          setUserName("Unknown User");
        });
    }, [reply.userId]);

    const marginLeft = `${depth * 20}px`; // Increment by 20px for each nesting level

    return (
      <div style={{ marginBottom: "10px", marginLeft: marginLeft }}>
        <div style={{ display: "flex", alignItems: "start", gap: "24px" }}>
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="User Avatar"
            style={{ width: "50px", height: "50px" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "0px !important",
              marginLeft: "10px",
            }}
          >
            <h5
              style={{
                fontSize: "16px",
                color: "grey",
                textTransform: "capitalize",
              }}
            >
              {userName}
            </h5>
            <h6>{moment(reply.createdAt).fromNow()}</h6>
            <p>{reply.comment}</p>
          </div>
        </div>

        <div style={{ marginLeft: `${depth * 20 + 20}px` }}>
          {reply.replies.map((nestedReply) => (
            <Reply
              key={nestedReply._id}
              reply={nestedReply}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {backendComments.map((comment) => (
        <div key={comment._id}>
          <Reply reply={comment} depth={0} />
        </div>
      ))}
    </div>
  );
};

export default SingleComment;
