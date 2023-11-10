import React, { useEffect, useState } from "react";
import UserPrivateNav from "../components/UserPrivateNav";
import axios from "axios";
import { Card, Icon, Image } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";

import "./style.css";
import { Link } from "react-router-dom";
function Blogs() {
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    axios
      .get("/blog/api/blogs")
      .then((res) => {
        setBlogs(res.data.data);
      })
      .catch((err) => console.dir(err));
  }, [blogs]);

  return (
    <div>
      <UserPrivateNav />
      <div className="blogs-container">
        {blogs ? (
          blogs.map((blog) => (
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
              <Card.Content extra>
                <a>
                  <Icon name="thumbs up" />
                  {blog.likes.length} like(s)
                </a>
              </Card.Content>
            </Card>
          ))
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
