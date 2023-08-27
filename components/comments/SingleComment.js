import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";

const SingleComment = () => {
  const [backendComments, setBackendComments] = useState([]);
  const [commentData, setCommentData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const updatedCommentData = await Promise.all(
        backendComments.map(async (comment) => {
          const userName = await fetchUserName(comment.userId);
          const updatedReplies = await Promise.all(
            comment.replies.map(async (reply, index) => {
              const replyUserName = await fetchUserName(reply.userId);
              return {
                ...reply,
                user: { name: replyUserName },
                paddingLeft: `${(index + 1) * 20}px`, // Set left padding based on index
              };
            })
          );
          return {
            ...comment,
            user: { name: userName },
            replies: updatedReplies,
          };
        })
      );
      setCommentData(updatedCommentData);
    };

    fetchData();
  }, [backendComments]);

  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`/api/get-user/${userId}`);
      return response.data[0].name;
    } catch (error) {
      console.error("Error fetching user name:", error);
      return "Unknown User";
    }
  };

  return (
    <div>
      {/* Render comments here */}
      {commentData.length > 0 &&
        commentData.map((comment) => (
          <div key={comment._id} style={{ marginBottom: " 80px" }}>
            <div style={{ display: "flex", alignItems: "start", gap: " 24px" }}>
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
                style={{ width: "50px", height: "50px" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: " 0px !important",
                }}
              >
                <h5
                  style={{
                    fontSize: "16px",
                    color: "grey",
                    textTransform: "capitalize",
                  }}
                >
                  {comment.user.name}
                </h5>
                <h6>{moment(comment.createdAt).fromNow()}</h6>
                <p>{comment.comment}</p>
              </div>
            </div>

            {/* Render replies here */}
            {comment.replies.map((reply, index) => (
              <div
                key={reply._id}
                style={{
                  paddingLeft: reply.paddingLeft,
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "start", gap: " 24px" }}
                >
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <h5
                      style={{
                        fontSize: "16px",
                        color: "grey",
                        textTransform: "capitalize",
                      }}
                    >
                      {reply.user.name}
                    </h5>
                    <h6>{moment(reply.createdAt).fromNow()}</h6>
                    <h6>{reply.comment}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default SingleComment;
