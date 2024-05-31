import React, { useState } from "react";
import "./CreateUser.css";
import { useDispatch, useSelector } from "react-redux";
import { addToUsers } from "../../store/slices/usersSlice";

function CreateUser() {
  let [name, setName] = useState("");
  let [profession, setProfession] = useState("");
  let [username, setUsername] = useState("");
  let [age, setAge] = useState("");
  let [gender, setGender] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);

  let handleSubmit = (e) => {
    e.preventDefault();
    const existingUser = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
    if (existingUser) {
      alert("Bu username allaqachon ishlatilgan.Iltimos boshqasini tanlang");
      return;
    }
    let newUser = {
      id: new Date().getTime(),
      name,
      profession,
      username,
      age: +age,
      gender,
    };
    dispatch(addToUsers(newUser));
    setAge("");
    setGender("");
    setName("");
    setUsername("");
    setProfession("");
  };

  return (
    <div className="create__user">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} className="create__user-form" action="">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
        />
        <input
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          required
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          type="text"
          placeholder="profession"
        />

        <input
          required
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="age"
        />
        <select
          required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          name=""
          id=""
        >
          <option value="">gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateUser;
