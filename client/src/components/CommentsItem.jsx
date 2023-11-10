import React, { useState } from "react";
import { Comment, Loader, Form, Button } from "semantic-ui-react";
import "./style.css";
import axios from "axios";
function CommentsItem(props) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [newComment, setNewComment] = useState("");
  let id = localStorage.getItem("id");
  const handleDeleteComment = () => {
    setLoading(true);
    axios
      .delete(`/blog/api/deleteComment?id=${props.commentId}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false);
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const handleShowEdit = () => {
    setShow(!show);
  };
  const handleSaveComment = () => {
    axios
      .put(`/blog/api/editComment?commentId=${props.commentId}`, {
        comment: newComment,
      })
      .then((res) => {
        if (res.data.status) {
          setShow(false);
          setNewComment("");
        }
      });
  };
  return (
    <div className="comment-item">
      <Comment.Group>
        <Comment>
          {props.img.includes(".png") ||
          props.img.includes(".jpg") ||
          props.img.includes(".jpeg") ? (
            <Comment.Avatar src={props.img} />
          ) : (
            <Comment.Avatar src={`data:image/gif;base64,${props.img} `} />
          )}
          <Comment.Content>
            <Comment.Author>{props.userName}</Comment.Author>

            {props.userId === id && show ? (
              <Form>
                <Form.Input
                  type="text"
                  size="mini"
                  width="10"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                  onClick={() => {
                    handleSaveComment();
                  }}
                >
                  Save
                </Button>
              </Form>
            ) : (
              <Comment.Text>{props.comment}</Comment.Text>
            )}
            {props.userId === id && (
              <Comment.Actions>
                {loading ? (
                  <Loader active inline size="tiny" />
                ) : (
                  <Comment.Action
                    onClick={() => {
                      handleDeleteComment();
                    }}
                  >
                    Delete
                  </Comment.Action>
                )}

                <Comment.Action
                  onClick={() => {
                    handleShowEdit();
                  }}
                >
                  {props.userId === id && show ? "Cancel" : "Edit"}
                </Comment.Action>
              </Comment.Actions>
            )}
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </div>
  );
}

export default CommentsItem;
