// Custom hook for ScreenSize

import { useEffect, useState } from "react";

export const UseGetScreenResolution = () => {
  const [currentResolution, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return [currentResolution];
};
