import React, { useState, useLayoutEffect } from "react";
import { NavLink } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import axios from "axios";
import "./style.css";
function UserPrivateNav(props) {
  let id = localStorage.getItem("id");
  const [data, setData] = useState({});
  useLayoutEffect(() => {
    axios
      .get(`/blog/api/myData?id=${id}`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.dir(err));
  }, []);
  return (
    <div className="public-nav-container">
      <h1>
        <NavLink
          to="/blogs"
          style={({ isActive }) => {
            return {
              all: "unset",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "red" : "black",
              cursor: "pointer",
            };
          }}
        >
          BLOG-APP
        </NavLink>
      </h1>
      <ul>
        <li>
          <NavLink
            to={`/blogs`}
            style={({ isActive }) => {
              return {
                all: "unset",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "black",
                cursor: "pointer",
              };
            }}
          >
            Blogs
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`/myBlogs/${id}`}
            style={({ isActive }) => {
              return {
                all: "unset",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "black",
                cursor: "pointer",
              };
            }}
          >
            My Blogs
          </NavLink>
        </li>
        <li>{data?.userName}</li>
        <li>
          <img
            src={`data:image/gif;base64,${data?.imgUrl} `}
            width="60px"
            alt=""
          />
        </li>
        <li>
          <NavLink
            to="/login"
            style={({ isActive }) => {
              return {
                all: "unset",
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "black",
                cursor: "pointer",
              };
            }}
            onClick={() => {
              localStorage.clear();
            }}
            className="prv-nav-item"
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default UserPrivateNav;
