import { useEffect } from "react";
import { useNavigate, useLocation, useBeforeUnload } from "react-router-dom";

const Prevent_back_navigation = (
  isDirty,
  message = "Are you sure you want to discard changes?"
) => {
  const navigate = useNavigate();
  const location = useLocation();

  useBeforeUnload(
    (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = message;
      }
    },
    [isDirty, message]
  );

  useEffect(() => {
    const unblock = navigate.block((tx) => {
      if (isDirty && !window.confirm(message)) {
        tx.preventDefault();
      } else {
        unblock();
        navigate(tx.location.pathname, { replace: true });
      }
    });

    return () => {
      unblock();
    };
  }, [isDirty, message, navigate, location]);
};

export default Prevent_back_navigation;
