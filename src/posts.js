import React from "react";
import axios from "axios";

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then(response => {
      this.setState({ posts: response.data.slice(0, 20) });
      this.loadComments(this.state.posts[this.state.posts.length - 1].id);
    });
  }

  comment(postId, comment) {
    axios
      .post(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
        body: comment
      })
      .then(response => {
        this.setState({ comments: this.state.comments.concat(response.data) });
      });
  }

  loadComments(postId) {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => {
        this.setState({ comments: response.data.slice(0, 10) });
      });
  }

  render() {
    const { posts, comments } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          {posts.map(post => (
            <div className="post" key={post.id}>
              <div className="post-title">
                <b>{post.title}</b>
              </div>
              <div className="post-text">{post.body}</div>
            </div>
          ))}
        </div>
        <div className="container">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.comment(posts[posts.length - 1].id, e.target.comment.value);
            }}
          >
            <textarea
              name="comment"
              placeholder="write a comment"
              cols="50"
              rows="2"
            />
            <button className="btn">submit</button>
          </form>
          <div className="show-comments">
            {comments.map(comment => (
              <div className="show-comment" key={comment.id}>
                <div className="comment">{comment.body}</div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
