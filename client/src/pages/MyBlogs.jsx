import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Card, Image } from "semantic-ui-react";

import axios from "axios";
import UserPrivateNav from "../components/UserPrivateNav";
function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState();
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`/blog/api/ownBlogs/${id}`)
      .then((res) => setMyBlogs(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <UserPrivateNav id={id} />
      <h1>My blogs</h1>
      {myBlogs?.map((blog) => (
        <Card>
          <Card.Content>
            <Image
              floated="right"
              size="large"
              src={`data:image/gif;base64,${blog.imgUrl} `}
            />
            <Card.Header>{blog.title}</Card.Header>
            <Card.Meta>{blog.desc}</Card.Meta>
            <Card.Description>{blog.body}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green">
                Edit
              </Button>
              <Button basic color="red">
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}

export default MyBlogs;
