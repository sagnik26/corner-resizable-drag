import React, { useState } from "react";

const ResizableDiv = ({ size, onResize }) => {
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = (mouseDownEvent) => {
    setIsResizing(true);

    const startWidth = size.width;
    const startHeight = size.height;
    const startX = mouseDownEvent.clientX;
    const startY = mouseDownEvent.clientY;

    const handleMouseMove = (mouseMoveEvent) => {
      const newWidth = startWidth + (mouseMoveEvent.clientX - startX);
      const newHeight = startHeight + (mouseMoveEvent.clientY - startY);
      onResize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        border: "1px solid black",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: "blue",
          position: "absolute",
          bottom: "0",
          right: "0",
          cursor: "nwse-resize",
        }}
        onMouseDown={startResizing}
      ></div>
      Resizable Div
    </div>
  );
};

export default ResizableDiv;
