import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import axios from "axios";

function Comment({ comment }) {
  const [authors, setAuthors] = useState();
  const data = useSelector((state) => {
    let {
      tokenReducer: { token },
    } = state;
    return {
      token: token,
    };
  }, shallowEqual);
  const { token } = data;
  useEffect(() => {
    comment
      ? axios
          .get(`/api/users/${comment.author}`, {
            headers: { Authorization: token },
          })
          .then((res) => {
            setAuthors(res.data);
          })
      : setAuthors("");
  }, [token, comment?.author]);
  return (
    <div className={"comment"}>
      <p>{comment.content}</p>
      <div className={"comment_flex"}>
        <div className={"comment_updated"}>
          <span>
            Updated:{" "}
            {new Date(comment.updatedAt).toDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className={"comment_author"}>
          <p>
            Author: <span>{authors?.login}&nbsp;</span>
          </p>
          <p className={authors?.rating >= 0 ? "good" : "evil"}>
            &nbsp;Rating: <i className="fas fa-star"></i>
            <span>{authors?.rating}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
