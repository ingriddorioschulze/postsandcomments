import React from "react";
import ReactDOM from "react-dom";
import Posts from "./posts";

function App() {
  return (
    <div className="App">
      <h1>posts & comments</h1>
      <Posts />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
