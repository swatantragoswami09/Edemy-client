import { Avatar, Comment, List } from "antd";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import axios from "axios";
import { dateFormater } from "../../utils/helpers";
import App from "./Action";

export default function UserComments({ course }) {
  const [newComment, setNewComment] = useState("");
  const [commentArray, setCommentArray] = useState([]);
  //   context
  const {
    state: { user },
  } = useContext(Context);

  const getCommenter = async (user, course) => {
    const reviews = await axios.get(`/api/get-all-review/${course._id}`);
    const comments = reviews.data.data.map(async (review) => {
      const user = await axios.get(`/api/get-user/${review?.user}`);
      return {
        image: "xyz",
        userName: user?.data[0]?.name,
        commentDate: new Date(review?.createdAt).toLocaleDateString(
          "en-IN",
          dateFormater
        ),
        comment: review?.comment,
      };
    });
    Promise.all(comments).then((commentData) => {
      setCommentArray(commentData);
    });
  };
  useEffect(() => {
    getCommenter(user?.user, course);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      dispalyName: "skg",
      photoUrl: "skh",
      content: " this is sample commments",
      createdAt: "xyz",
      id: "dksdjk",
    };
    console.log(commentToAdd);
  };
  return (
    <>
      {JSON.stringify(commentArray, null, 2)}
      <h2>Comments</h2>
    </>
  );
}
