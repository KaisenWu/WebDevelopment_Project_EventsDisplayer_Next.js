import { createContext, useState, useEffect } from "react";

// Define the notification context structure.
// All the components in this app can access this context.
const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

// Create the notification context provider component.
// All the components in this tag can access the properties of the context.
// In order to use the context, we put all other components in this tag at _app.js script.
export function NotificationContextProvider(props) {
  // Define how to manage the context state.
  // Set the status of the notification.
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {hideNotificationHandler()},3000)
      return () => {
        clearTimeout(timer);
      }
    }
  }, [activeNotification]);

  // Define how to show the notification.
  function showNotificationHandler(notificationData) {
    // Setting the content of the notification.
    setActiveNotification(notificationData);
  }
  // Define the function to hide the notification.
  function hideNotificationHandler() {
    setActiveNotification(null);
  }
  // Store all the state and function of this components.
  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  // Define how to return.
  return (
    // The value={context} will distribute the context data to all the components which are wrapped by the provider.
    // Bundle the context and context provider.
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
