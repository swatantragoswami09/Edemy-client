import Image from "next/image";
// import google from "../../assets/google.png";
export const data = [
  {
    key: "1",
    label: (
      <b>
        I don't know anything about Coding, should I can start with SKG
        University?
      </b>
    ),
    children: (
      <p>
        Yes, SKG University is providing you a best IT professional faculties to
        teach you and grap a skills like IT professionals and get the
        certificates and placements.
      </p>
    ),
  },
  {
    key: "2",
    label: (
      <b>Can I get the collage courses & Placements form SKG Univesity ?</b>
    ),
    children: (
      <p>
        Yes, In SKG University, you will find the most of the courses is listed
        by the IT profesionals for the student of their collage placements.
      </p>
    ),
  },
  {
    key: "3",
    label: <b>Will there be a Certificate of completion ?</b>,
    children: (
      <p>Yes, you will get a certificate after finishing all the lectures.</p>
    ),
  },
  {
    key: "4",
    label: <b>Will there be question practice in the course ?</b>,
    children: <p>Yes, the course has many questions solved in class.</p>,
  },
  {
    key: "5",
    label: <b>Will there be LIVE classes ?</b>,
    children: (
      <p>
        No right now we are not providing the LIVE classed but soon we are
        focusing to provide LIVE classes as well..
      </p>
    ),
  },
  {
    key: "6",
    label: (
      <b>
        I just completed 12th and I want to start preparing for my
        internship/job as a Software Developer, can I take it?
      </b>
    ),
    children: (
      <p>
        Yes, you are eligible to enrol as we will cover everything from basics
        to advanced. It is always better to start as early as possible. It will
        give you a good head start and ample time to practice.
      </p>
    ),
  },
  {
    key: "7",
    label: (
      <b>
        I paid but still did not receive any welcome email/unable to access my
        batch. What to do?
      </b>
    ),
    children: (
      <p>
        In most of the cases this is because you filled a different email
        address or wrongly typed your email address while payment. In such a
        case please send us an email at alpha@apnacollege.in with the subject
        "ENROLMENT ISSUE ALPHA PLUS" along with your full name, phone number,
        payment id from Razorpay and a screenshot of your payment. (Support team
        (10am-6pm) may take 24-48 hours to address your issue due to heavy
        load.)
      </p>
    ),
  },
  {
    key: "8",
    label: <b>Library Feature will be for how many companies?</b>,
    children: (
      <p>
        Currently Library feature is available for the following companies :
        Google, Microsoft, Amazon, Atlassian, Adobe and Goldman Sachs. More
        companies will be added with time.
      </p>
    ),
  },
  {
    key: "9",
    label: <b>Is the classes in Hindi or English?</b>,
    children: (
      <p>The classes is taught in Hinglish (a mix of Hindi & English).</p>
    ),
  },
];

export const placedStudents = [
  {
    key: "1",
    student: "Aditi Gupta",
    image: (
      <img
        style={{ borderRadius: "8000px" }}
        src="https://visiontechindia.com/wp-content/uploads/2023/05/images-2023-05-27T110047.252.jpeg"
      />
    ),
    company: "Google",
    intro: (
      <>
        Hi i am Aditi and I joined SKG University as a student and I bought two
        ro three courses of React and AWS and the faculties of the SKG
        Univercity is very supportive and they are always ready to solve our
        problem with the instructors, you will also get real time pratice
        question of the top IT companies. i recommend you to please join SKG
        University to gain skills as well as knowledge to grow in personal as
        well as professional life.
      </>
    ),
    companyLogo: (
      <img
        style={{ height: "300px", borderRadius: "5000px" }}
        src="https://e1.pxfuel.com/desktop-wallpaper/873/365/desktop-wallpaper-google-logo-png-transparent-backgrounds-background-for-google.jpg"
      />
    ),
  },
  {
    key: "2",
    student: "Rohan Tiwari",
    image: (
      <img
        style={{ borderRadius: "8000px" }}
        src="https://visiontechindia.com/wp-content/uploads/2023/05/images-2023-05-27T110047.252.jpeg"
      />
    ),
    company: "Facebook",
    companyLogo: (
      <img
        style={{ height: "300px", borderRadius: "5000px" }}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdfcvwmSDQXruzgSuST3Vr55aGAwSbeHDh-Q&usqp=CAU"
      />
    ),
  },
  {
    key: "3",
    student: "Rishikesh Tiwari",
    image: (
      <img
        style={{ borderRadius: "8000px" }}
        src="https://visiontechindia.com/wp-content/uploads/2023/05/images-2023-05-27T110047.252.jpeg"
      />
    ),
    company: "Amazon",
    companyLogo: (
      <img
        style={{ height: "300px", borderRadius: "5000px" }}
        src="https://spng.pngfind.com/pngs/s/56-565024_amazon-logo-png-amazon-png-transparent-png.png"
      />
    ),
  },
];
