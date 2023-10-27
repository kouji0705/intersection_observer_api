import React, { useState } from 'react';
import './App.css';
import Container from './Container'

const App: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const intersectCallback = (index: number) => {
    console.log('intersectCallback',index)
    setProgress(index);
  };

  const items = [1, 2, 3];

  return (
    <div>
      <header className="header">{progress} まで読んだ</header>
      {items.map((i) => (
        <Container index={i} onIntersection={intersectCallback}>
          <div ref={ref} key={i} className="contents">
            {i}
          </div>
        </Container>
      ))}
    </div>
  );
};

export default App;