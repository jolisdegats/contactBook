import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { GET_UNIQUE_USER_REQUESTED } from "../redux/actions/users-action";
import Loader from "./Loader";
import addressIcon from "../img/address.svg";
import companyIcon from "../img/company.svg";
import emailIcon from "../img/email.svg";
import leftArrow from "../img/leftArrow.svg";
import phoneIcon from "../img/phone.svg";
import websiteIcon from "../img/website.svg";

const UniqueUser = ({
  usersReducer: { loading, users, uniqueUser },
  getUniqueUser,
}) => {
  const history = useHistory();

  const {
    name,
    username,
    profilePic,
    website,
    phone,
    email,
    company: { name: companyName = "", bs = "", catchPhrase = "" } = {},
    address: { city = "", suite = "", street = "", zipcode = "" } = {},
  } = uniqueUser;

  useEffect(() => {
    users.length === 0 && getUniqueUser();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="uniqueUserMain">
      {loading ? (
        <Loader></Loader>
      ) : (
        uniqueUser && (
          <>
            <p
              onClick={() => history.push("/")}
              className="backButton hoveredButton"
            >
              <img src={leftArrow} alt="left arrow" /> Back to the list
            </p>
            <div className="profile">
              <img src={profilePic} alt="" />

              <div className="profileText">
                <h2 className="profileName">
                  {name} (AKA {username})
                </h2>
                <div className="profileInfos">
                  <div>
                    <div>
                      <p>
                        <img src={emailIcon} alt="email icon" />
                      </p>
                      <p>{email}</p>
                    </div>
                    <div>
                      <p>
                        <img src={phoneIcon} alt="phone icon" />
                      </p>
                      <p>{phone}</p>
                    </div>
                    <div>
                      <p>
                        <img src={websiteIcon} alt="website icon" />
                      </p>
                      <p>{website}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>
                        <img src={addressIcon} alt="address icon" />
                      </p>
                      <p>
                        <span>
                          {street}, {suite}
                        </span>
                        <span>
                          {city} {zipcode}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <img src={companyIcon} alt="company icon" />
                      </p>
                      <p>
                        <span className="companyName">{companyName}</span>
                        <span className="baseline">{bs}</span>
                        <span>{catchPhrase}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

UniqueUser.propTypes = {
  loading: PropTypes.bool,
  uniqueUser: PropTypes.object,
  getUniqueUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usersReducer: state.usersReducer,
});

// GET THE ID FROM URL => ALLOW URL SHARING AS IT EITHER FIND USERID IN STORE IF USERS EXIST OR REFETCH THIS ID
const urlArr = window.location.href.split("/");
const mapDispatchToProps = (dispatch) => ({
  getUniqueUser: () =>
    dispatch({
      type: GET_UNIQUE_USER_REQUESTED,
      id: Number(urlArr[urlArr.length - 1]),
      method: "fromUrl",
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UniqueUser);
