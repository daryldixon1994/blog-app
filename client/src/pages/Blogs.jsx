import React, { useEffect, useState } from "react";
import UserPrivateNav from "../components/UserPrivateNav";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";

import "./style.css";
import { Link } from "react-router-dom";
function Blogs() {
  const [blogs, setBlogs] = useState();
  // const [likesArray, setLikesArray] = useState();
  let id = localStorage.getItem("id");
  useEffect(() => {
    axios
      .get("/blog/api/blogs")
      .then((res) => {
        setBlogs(res.data.data);
      })
      .catch((err) => console.dir(err));
  }, [blogs]);
  const handleReportBlog = (id) => {
    axios
      .put(`/blog/api/reportBlog/${id}`)
      .then((res) => console.log(res.data.data.isReported))
      .catch((err) => console.dir(err));
  };
  const handleAddLike = (blogId) => {
    axios.post(`/blog/api/addLike?id=${id}&blogId=${blogId}`).then().catch();
  };
  return (
    <div>
      <UserPrivateNav />
      <div className="blogs-container">
        {blogs ? (
          blogs.map((blog) => {
            let arrayLikes = blog.likes.map((elt) => elt._id);
            return (
              <Card className="card">
                <Image
                  src={`data:image/gif;base64,${blog.imgUrl} `}
                  height="250px"
                  ui={true}
                />
                <Card.Content>
                  <Link to={`/blogs/${blog._id}`}>
                    <Card.Header>{blog.title}</Card.Header>
                  </Link>
                  <Card.Meta>{blog.createdAt.split("T")[0]}</Card.Meta>
                  <Card.Meta>
                    at {blog.createdAt.split("T")[1].substr(0, 5)}
                  </Card.Meta>
                  <Card.Description>{blog.desc}</Card.Description>
                </Card.Content>
                <Card.Content extra className="blogs-card-extra">
                  {console.log(blog.likes)}
                  <Icon
                    name="thumbs up"
                    color={arrayLikes.includes(id) ? "blue" : ""}
                    className="thumb-up"
                    onClick={() => {
                      handleAddLike(blog._id);
                    }}
                  />
                  {blog.likes.length} like(s)
                  <Icon
                    name="flag"
                    onClick={() => {
                      !blog.isReported && handleReportBlog(blog._id);
                    }}
                    className="flag-report"
                    color={blog.isReported ? "red" : ""}
                  />
                </Card.Content>
              </Card>
            );
          })
        ) : (
          <div className="spinner-box">
            <Loader active inline="centered" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
