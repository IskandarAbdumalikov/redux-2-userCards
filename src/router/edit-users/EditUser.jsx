import React, { useState } from "react";
import "./editUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../store/slices/usersSlice";

const EditUser = ({ user, setShowEditModule }) => {
  const [name, setName] = useState(user.name);
  const [profession, setProfession] = useState(user.profession);
  const [username, setUsername] = useState(user.username);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUser = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() && u.id !== user.id
    );
    if (existingUser) {
      alert("Bu username allaqachon ishlatilgan.Iltimos boshqasini tanlang");
      return;
    }
    const editedUser = {
      id: user.id,
      name,
      profession,
      username,
      age,
      gender,
    };
    dispatch(editUser(editedUser));
    setShowEditModule(false);
  };

  return (
    <div className="edit__module">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} className="edit__user-form" action="">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          type="text"
          placeholder="profession"
        />

        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="age"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          name=""
          id=""
        >
          <option value="">gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <div className="edit__btns">
          <button type="submit">Save</button>
          <button onClick={() => setShowEditModule(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
