import { useContext } from "react";
import AboutRoute from "../../components/routes/AboutRoute";
import { DarkModeContext } from "../../context/DarkModeContext";
import { data } from "./content/contents";

const About = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <AboutRoute>
      <h1 className="jumbotron text-center bg-primary square">
        📙 About SKG University
      </h1>

      {/* about SKG University */}
      {data.map((item) => {
        return (
          <>
            <h4
              key={item.id}
              className={`${isDarkMode ? "bg-dark" : "bg-light"} ${
                isDarkMode ? "text-light" : "text-dark"
              }`}
            >
              {" "}
              {item.title}
            </h4>
            <h7
              className={`${isDarkMode ? "bg-dark" : "bg-light"} ${
                isDarkMode ? "text-light" : "text-dark"
              }`}
            >
              {item.body}
            </h7>
            <hr />
          </>
        );
      })}
      <h4
        className={`${isDarkMode ? "bg-dark" : "bg-light"} ${
          isDarkMode ? "text-light" : "text-dark"
        }`}
      >
        Are you ready to dive in? 🥊 <br />
        <br />
        Let's embark on this educational voyage together. Join me in exploring
        the realms of knowledge, curiosity, and growth.
        <br />
        <hr />
        Enroll today, and let's make learning an enriching and empowering
        experience! To your success, 😄😄😄
      </h4>
      <br />
    </AboutRoute>
  );
};

export default About;
