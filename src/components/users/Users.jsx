import React, { Fragment, useState } from "react";
import "./Users.css";
import male from "../../assets/male-avatar-boy-face-man-user-9.svg";
import female from "../../assets/female-avatar-girl-face-woman-user-2.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromUsers,
  followUser,
  unfollowUser,
} from "../../store/slices/usersSlice";
import EditUser from "../../router/edit-users/EditUser";

function Users({ data }) {
  const [editUser, setEditUser] = useState(null);
  const dispatch = useDispatch();
  const followedUsers = useSelector((state) => state.users.followed);

  const handleEditClick = (user) => {
    setEditUser(user);
  };

  const handleCloseEdit = () => {
    setEditUser(null);
  };

  const handleFollowClick = (user) => {
    if (followedUsers.find((u) => u.id === user.id)) {
      dispatch(unfollowUser(user));
    } else {
      dispatch(followUser(user));
    }
  };

  const users = data?.map((user) => (
    <div className="users__card" key={user.id}>
      <img src={user.gender === "male" ? male : female} alt={user.name} />
      <h2>{user.name}</h2>
      <h3>{user.username}</h3>
      <p>{user.profession}</p>
      <p>{user.age} years old</p>
      <h3>{user.gender}</h3>
      <div className="users__card__btns">
        <button onClick={() => dispatch(removeFromUsers(user))}>Delete</button>
        <button
          style={{ background: "green" }}
          onClick={() => handleEditClick(user)}
        >
          Edit
        </button>
        <button
          style={{
            background: followedUsers.find((u) => u.id === user.id)
              ? "red"
              : "blue",
          }}
          onClick={() => handleFollowClick(user)}
        >
          {followedUsers.find((u) => u.id === user.id) ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  ));

  return (
    <Fragment>
      {editUser && <div onClick={handleCloseEdit} className="overlay"></div>}
      <div className="users__wrapper">{users}</div>
      {editUser && (
        <EditUser user={editUser} setShowEditModule={handleCloseEdit} />
      )}
    </Fragment>
  );
}

export default Users;
