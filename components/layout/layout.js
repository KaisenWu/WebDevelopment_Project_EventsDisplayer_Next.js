import { Fragment, useContext } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
// Import the comtext.
import NotificationContext from "../../store/notification-context";

function Layout(props) {
  // useContext passed the notification context value to this component.
  const notificationCtx = useContext(NotificationContext);
  //   Store the notification data.
  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {/* The active notification is the status of notification. If the status is not null, the notification component will be shown. */}
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={notificationCtx.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
