import { useRef, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  // Declare a useRef instance to email.
  const emailInputRef = useRef();

  // Get the context.
  const notificationCtx = useContext(NotificationContext);

  // Define the function od the submission button.
  function registrationHandler(event) {
    // Prevent refresh the page after submmision.
    event.preventDefault();
    // Store the user inputed email.
    const enteredEmail = emailInputRef.current.value;

    // Call the showNotification function from context to append the data and show the component.
    // The component will show after the user click register but still post the data to database.
    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    // Using fetch functon to send POST request to the corresponding backend file.
    // Since the beckend file is at the same root, hence we don't have to declare the prefixes.
    // The contents in the fetch function include: the path of the backend file and the attributes.
    fetch("/api/newsletter", {
      // Define the method to access the beckend.
      method: "POST",
      // Define the content will post to beckend.
      // The content should in format with JSON string.
      // body: JSON.stringify({email: enteredEmail}),
      body: JSON.stringify({ email: enteredEmail }),
      // Define the header with JSON object or JSON string as the data exchange format.
      header: {
        "Content-Type": "application/json",
      },
    })
      // Setting how to process the response data.
      // Since we used json string to transport data from server to client.
      // For here we need to parse the JSON string to a Javascript Object.
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // Define how to response as ling as error happens.
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      // Log the response.
      .then((data) => {
        // Define the notification after post data successfully.
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter!',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
