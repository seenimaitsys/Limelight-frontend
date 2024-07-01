import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePreventBackNavigation = (
  isDirty,
  message = "Are you sure you want to discard changes?"
) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, message]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (isDirty && !window.confirm(message)) {
        event.preventDefault();
        navigate(1); // Move forward in history to cancel the back navigation
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty, message, navigate]);

  return null;
};

export default usePreventBackNavigation;
