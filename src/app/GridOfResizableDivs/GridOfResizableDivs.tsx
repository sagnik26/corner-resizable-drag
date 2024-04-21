import React, { useEffect, useState } from "react";
import ResizableDiv from "../../components/ResizableDiv.tsx";

const GridOfResizableDivs = ({ rows, columns }) => {
  const [size, setSIze] = useState([
    window.innerWidth - 50,
    window.innerHeight,
  ]);

  // Initialize a grid state to manage the size of each cell
  const initialSizes = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({
      width: size[0] / columns,
      height: 200,
    }))
  );
  const [gridSizes, setGridSizes] = useState(initialSizes);

  const updateBlockSize = (rowIndex, colIndex, newSize, dX, dY) => {
    const newSizes = gridSizes.map((row, rIndex) => {
      return row.map((cell, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          return { ...cell, ...newSize };
        }
        return cell;
      });
    });
    setGridSizes(newSizes);
  };

  useEffect(() => {
    function updateWindowSize() {
      setSIze([window.innerWidth - 50, window.innerHeight]);
      setGridSizes(
        Array.from({ length: rows }, () =>
          Array.from({ length: columns }, () => ({
            width: (window.innerWidth - 50) / columns,
            height: 200,
          }))
        )
      );
    }

    window.addEventListener("resize", updateWindowSize);
    updateWindowSize();
    return () => window.removeEventListener("resize", updateWindowSize);
  }, [window.innerWidth]);

  return (
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, auto)`,
          justifyContent: "center",
        }}
      >
        {gridSizes.map((row, rowIndex) =>
          row.map((size, colIndex) => (
            <ResizableDiv
              key={`${rowIndex}-${colIndex}`}
              size={size}
              onResize={(newSize, dX, dY) =>
                updateBlockSize(rowIndex, colIndex, newSize, dX, dY)
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GridOfResizableDivs;
