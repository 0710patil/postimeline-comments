import axios from "axios";
import profile from "./images/profile.png";
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { blue } from "@mui/material/colors";

const Post = ({ post, comments }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 600 }} style={{ margin: "1rem" }} key={post.id}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <h3>{post.title}</h3>
          </Typography>
          <Typography variant="h5" component="div">
            {post.body}
          </Typography>
        </CardContent>

        <CardActions>
          <Button>
            <i className="far fa-thumbs-up"></i> Like
          </Button>
          <Button onClick={handleOpen} size="small">
            <i className="far fa-comment"></i> 5 Comments
          </Button>
          <Button>
            <i className="far fa-share-square"></i>Share
          </Button>
        </CardActions>
      </Card>

      <div className="post">
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Typography variant="h5"> Comments:</Typography>
            <ul>
              {comments
                .filter((comment) => comment.postId === post.id)
                .map((comment) => (
                  <li key={comment.id}>
                    <div>
                      <img src={profile} alt="profile" className="profile" />
                      <h4>{comment.name}</h4>
                    </div>
                    <h5 style={{ color: "blue" }}>{comment.email}</h5>
                    <div>
                      <h4>{comment.body}</h4>
                      <Button>
                        <i className="far fa-comment"></i> Like
                      </Button>
                      <Button className="likebutton">
                        <span /> Reply
                      </Button>
                    </div>
                  </li>
                ))}
            </ul>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

const App = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);

  function fetchPosts() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchComments() {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container">
      <center>
        <h1>Posts and Comments</h1>
        {posts.map((post) => (
          <Post key={post.id} post={post} comments={comments} />
        ))}
      </center>
    </div>
  );
};

export default App;
