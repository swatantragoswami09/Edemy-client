import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PreviewModal from "../../components/modal/PreviewModal";
import { Context } from "../../context/";
import { toast } from "react-toastify";
import SingleCourseJombotron from "../../components/cards/SingleCourseJumbotron";
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";
import { loadStripe } from "@stripe/stripe-js";
import SingleComment from "../../components/comments/SingleComment";
import {
  getCourseBySlug,
  phonepayRedirectApi,
  stripeRedirectApi,
} from "../../components/api";
// import { Footer } from "../../components/footer/Footer";
const SingleCourse = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});

  const router = useRouter();
  const { slug } = router.query;

  //   context
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user && course) {
      checkEnrollment();
    }
  }, [user, course]);

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    setEnrolled(data);
  };

  const handlePaidEnrollment = async () => {
    try {
      setLoading(true);

      // check if already enrolled
      if (enrolled.status) {
        return router.push(`/user/course/${enrolled.course.slug}`);
      }
      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      stripe.redirectToCheckout({ sessionId: data });

      // check if user is logged in
      if (!user) router.push("/login");
    } catch (error) {
      console.log(error);
      toast("Enrollment failed, Try again.");
      setLoading(false);
    }
  };
  const handleFreeEnrollment = async (e) => {
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
      toast.error("Enrollment failed. Try again");
      setLoading(false);
    }
  };

  const handleStripeRedirect = async () => {
    const data = await stripeRedirectApi(course);
    console.log("data: ", data);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    stripe.redirectToCheckout({ sessionId: data });
  };

  // transfer it into api/indexed.js
  const handlePhonepayRedirect = async () => {
    const requestBody = {
      merchantId: "LUCK24SEVENPGONLINE",
      merchantTransactionId: Math.random().toString(),
      merchantUserId: "MUID123",
      amount: 100, //paisa
      redirectUrl: process.env.NEXT_PUBLIC_PHONEPAY_CALLBACK_URL,
      redirectMode: "REDIRECT",
      callbackUrl: process.env.NEXT_PUBLIC_PHONEPAY_CALLBACK_URL,
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
        // "type": "UPI"
      },
    };

    try {
      console.log("handlePhonepayRedirect: ");
      // const phonepayUrl = await phonepayRedirectApi(requestBody);
      // router.push(phonepayUrl);
    } catch (error) {
      console.error("Error:", error);
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
        handleStripeRedirect={handleStripeRedirect}
        handlePhonepayRedirect={handlePhonepayRedirect}
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
      <div
        style={{
          padding: "0px 120px",
          marginTop: "80px",
        }}
      >
        <SingleComment />
      </div>

      {/* <Footer /> */}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const data = await getCourseBySlug(query);
  return {
    props: {
      course: data.course,
    },
  };
}
export default SingleCourse;
