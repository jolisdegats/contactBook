import React from "react";
import { useHistory } from "react-router-dom";
import profilePicUser from "../img/profilePicUser.jpg";

const LeftColumn = () => {
  const history = useHistory();
  return (
    <div className="leftColumn">
      <div>
        <div
          onClick={() => history.push("/")}
          style={{
            backgroundImage: `url(${profilePicUser})`,
            cursor: "pointer",
          }}
          className="profilePicUser"
        />
        <div className="leftColumnText">
          <h2>Hey John!</h2>
          <p>
            Welcome to your contact list. Feel free to click on the cards to get
            more info.
          </p>
        </div>
      </div>
      <div className="madeWith">
        <span>Made with ♥ by </span>&nbsp;
        <span
          className="githubLink"
          onClick={() =>
            (window.location.href = "https://github.com/jolisdegats")
          }
        >
          @Jolisdegats
        </span>
      </div>
    </div>
  );
};

export default LeftColumn;
