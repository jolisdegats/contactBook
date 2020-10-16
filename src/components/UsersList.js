import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  GET_USERS_REQUESTED,
  GET_UNIQUE_USER_REQUESTED,
} from "../redux/actions/users-action";
import Loader from "./Loader";

const UsersList = ({
  usersReducer: { loading, users },
  getUsers,
  getUniqueUser,
}) => {
  const history = useHistory();

  useEffect(() => {
    getUsers();

    // eslint-disable-next-line
  }, []);

  const handleClick = async (id) => {
    await getUniqueUser(id);
    history.push(`/user/${id}`);
  };

  return loading ? (
    <Loader></Loader>
  ) : (
    users && (
      <div className="contactListMain">
        <h1>People I know...</h1>
        <div className="usersList">
          {users.map((user) => {
            const {
              id,
              name,
              profilePic,
              company: { name: companyName },
            } = user;
            return (
              <div key={id} className="userCardBlock">
                <div onClick={() => handleClick(id)} className="userCard">
                  <div className="picAndName">
                    <img
                      src={profilePic}
                      alt={name}
                      className="profilePicCard"
                    />
                    <div>
                      <h2>{name}</h2>
                      <p>{companyName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="seeMore">•••</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

UsersList.propTypes = {
  loading: PropTypes.bool,
  users: PropTypes.array,
  getUsers: PropTypes.func.isRequired,
  getUniqueUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usersReducer: state.usersReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch({ type: GET_USERS_REQUESTED }),
  getUniqueUser: (id) =>
    dispatch({
      type: GET_UNIQUE_USER_REQUESTED,
      id: id,
      method: "fromClick",
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
