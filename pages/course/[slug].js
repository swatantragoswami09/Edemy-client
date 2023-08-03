import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PreviewModal from "../../components/modal/PreviewModal";
import { Context } from "../../context/";
import { toast } from "react-toastify";
import SingleCourseJombotron from "../../components/cards/SingleCourseJumbotron";
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";
import { loadStripe } from "@stripe/stripe-js";
import useNode from "../../hooks/useNode";
import Comment from "../../components/comments/comment";

const comments = {
  id: 1,
  items: [],
};
const SingleCourse = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});
  const [commentsData, setCommentsData] = useState(comments);

  const router = useRouter();
  const { slug } = router.query;

  //   context
  const {
    state: { user },
  } = useContext(Context);
  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  useEffect(() => {
    if (user && course) {
      checkEnrollment();
    }
  }, [user, course]);

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    console.log("data of enrollement=>", data);
    setEnrolled(data);
  };

  const handlePaidEnrollment = async () => {
    try {
      setLoading(true);
      // check if user is logged in
      if (!user) router.push("/login");

      // check if already enrolled
      if (enrolled.status) {
        return router.push(`/user/course/${enrolled.course.slug}`);
      }

      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      stripe.redirectToCheckout({ sessionId: data });
    } catch (error) {
      console.log(error);
      toast("Enrollment failed, Try again.");
      setLoading(false);
    }
  };
  const handleFreeEnrollment = async (e) => {
    console.log("hi there");
    e.preventDefault();
    try {
      // check if user is logged in
      if (!user) router.push("/login");
      // check if already enrolled
      if (enrolled.status) {
        return router.push(`/user/course/${enrolled.course.slug}`);
      }
      setLoading(true);
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
      toast(data.message);
      setLoading(false);
      router.push(`/user/course/${data.course.slug}`);
    } catch (error) {
      console.log(error);
      toast("Enrollment failed. Try again");
      setLoading(false);
    }
  };

  return (
    <>
      <SingleCourseJombotron
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        course={course}
        user={user}
        loading={loading}
        handlePaidEnrollment={handlePaidEnrollment}
        handleFreeEnrollment={handleFreeEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
      />
      {/* preview popup */}
      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />
      {course.lessons && (
        <SingleCourseLessons
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
      />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
    },
  };
}
export default SingleCourse;
