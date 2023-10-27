import React, { useState } from 'react';
import './App.css';
import Container from './Container'

const App: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const intersectCallback = (index: number) => {
    console.log('intersectCallback',index)
    setPage(index);
  };

  const items = [1, 2, 3];

  return (
    <div>
      <header className="header" style={{
        position: 'fixed', // 画面上部に固定
        top: 0, // 画面の上端に固定
        left: 0, // 画面の左端に固定
        width: '100%', // 画面幅いっぱいに広げる
        backgroundColor: '#333', // 背景色
        color: 'white', // テキスト色
        padding: '10px', // パディング
        zIndex: 1000, // 他の要素より手前に表示
        /* その他のスタイルプロパティを適用 */
      }}>{page} まで読んだ</header>
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
