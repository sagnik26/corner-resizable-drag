import React, { useEffect, useState } from "react";
import ResizableDiv from "../../components/ResizableDiv.tsx";

const GridOfResizableDivs = ({ rows, columns }) => {
  const [size, setSIze] = useState([window.innerWidth, window.innerHeight]);
  
  // Initialize a grid state to manage the size of each cell
  const initialSizes = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ width: size[0] / columns, height: 200 }))
  );
  const [gridSizes, setGridSizes] = useState(initialSizes);

  const updateBlockSize = (rowIndex, colIndex, newSize) => {
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

  useEffect(() => {
    function updateWindowSize() {
      setSIze([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateWindowSize);
    updateWindowSize();
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

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
            onResize={(newSize) => updateBlockSize(rowIndex, colIndex, newSize)}
          />
        ))
      )}
    </div>
  );
};

export default GridOfResizableDivs;
