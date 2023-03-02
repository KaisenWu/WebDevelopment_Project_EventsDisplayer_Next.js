import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import NotificationContext from "../../store/notification-context";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const [ isFetchingCommets, setIsFetchingCommets ] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingCommets(true)
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingCommets(false)
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // Call the showNotification function from context to append the data and show the component.
    // The component will show after the user click submit but still post the data to database.
    notificationCtx.showNotification({
      title: "Submiting...",
      message: "Commenting",
      status: "pending",
    });

    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // Define how to response as ling as error happens.
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        // Call the showNotification function from context to append the data and show the component.
        // The component will show after the user click register but still post the data to database.
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your comment was saves",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingCommets && <CommentList items={comments} />}
      {showComments && isFetchingCommets && <p>Loading ...</p>}
    </section>
  );
}

export default Comments;
