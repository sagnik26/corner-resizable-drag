import React from 'react';
import GridOfResizableDivs from './app/GridOfResizableDivs/GridOfResizableDivs.tsx';

function App() {
  return (
    <div>
      <GridOfResizableDivs rows={3} columns={3} />
    </div>
  );
}

export default App;
