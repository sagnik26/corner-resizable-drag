import React, { useState } from "react";
import ResizableDiv from "../../components/ResizableDiv.tsx";

const GridOfResizableDivs = ({ rows, columns }) => {
  // Initialize a grid state to manage the size of each cell
  const initialSizes = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ width: 200, height: 200 }))
  );
  const [gridSizes, setGridSizes] = useState(initialSizes);

  const updateSize = (rowIndex, colIndex, newSize) => {
    const newSizes = gridSizes.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          return { ...cell, ...newSize };
        }
        return cell;
      })
    );
    setGridSizes(newSizes);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, auto)`,
      }}
    >
      {gridSizes.map((row, rowIndex) =>
        row.map((size, colIndex) => (
          <ResizableDiv
            key={`${rowIndex}-${colIndex}`}
            size={size}
            onResize={(newSize) => updateSize(rowIndex, colIndex, newSize)}
          />
        ))
      )}
    </div>
  );
};

export default GridOfResizableDivs;
