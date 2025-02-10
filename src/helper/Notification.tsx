import { forwardRef } from "react";
import { createRoot } from "react-dom/client";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type NotificationSeverity = "success" | "error" | "warning";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const showNotification = (message: string, severity: NotificationSeverity) => {
  const notificationRoot = document.createElement("div");
  document.body.appendChild(notificationRoot);

  const root = createRoot(notificationRoot);

  const handleClose = () => {
    root.unmount();
    document.body.removeChild(notificationRoot);
  };

  root.render(
    <Snackbar
      open
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export const successNotification = (message: string) => {
  showNotification(message, "success");
};

export const errorNotification = (message: string) => {
  showNotification(message || "Something went wrong!", "error");
};

export const warningNotification = (message: string) => {
  showNotification(message, "warning");
};
