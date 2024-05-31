import React from "react";
import { useDispatch, useSelector } from "react-redux";
import male from "../../assets/male-avatar-boy-face-man-user-9.svg";
import female from "../../assets/female-avatar-girl-face-woman-user-2.svg";
import { followUser, unfollowUser } from "../../store/slices/usersSlice";
import Empty from "../empty/Empty";
import "./followers.scss"

function Followers() {
  const dispatch = useDispatch();
  const followedUsers = useSelector((state) => state.users.followed);

  const handleFollowClick = (user) => {
    if (followedUsers.find((u) => u.id === user.id)) {
      dispatch(unfollowUser(user));
    } else {
      dispatch(followUser(user));
    }
  };

  return (
    <div className="followers__wrapper container">
      {followedUsers.length ? (
        followedUsers.map((user) => (
          <div className="followers__card" key={user.id}>
            <img src={user.gender === "male" ? male : female} alt={user.name} />
            <div className="followers__card__info">
              <h2>{user.name}</h2>
              <h3>{user.username}</h3>
              <p>{user.profession}</p>
              <p>{user.age} years old</p>
              <h3>{user.gender}</h3>
            </div>
            <div className="followers__card__btns">
              <button
                style={{ background: "red" }}
                onClick={() => handleFollowClick(user)}
              >
                Unfollow
              </button>
            </div>
          </div>
        ))
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default Followers;
