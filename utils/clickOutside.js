import React, { useEffect } from "react";

function ClickOutsideHandler({ containerClass, action }) {
  const handleClickOutside = (event) => {
    if (!event.target.closest(containerClass)) {
      action();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [containerClass, action]);

  return null; // This component doesn't render anything
}

export default ClickOutsideHandler;
