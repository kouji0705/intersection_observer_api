import React, { useState } from 'react';
import './App.css';
import Container from './Container'
import axios from 'axios'

const App: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [newItems, setNewItems] = useState<number[]>([1, 2, 3]);
  const [page, setPage] = useState(0);


  
  // callback関数を定義
  const intersectCallback = (index: number) => {
    console.log('intersectCallback',index)
    if (index === 3) {
      const test = axios.get('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10')
      .then(response => {
        // APIリクエストが成功した場合の処理
        // レスポンスデータを使用して必要な処理を実行
        // ここでは、setNewItemsを呼び出して新しいアイテムを追加する例を示します。
        console.log('response',response.data)
        return response.data
      })
      console.log('test',test)
      setNewItems((prevItems) => [...prevItems, 4, 5]);
    }
    setPage(index);
  };

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
      <div style={{paddingTop:"200px"}}></div>
      {newItems.map((i) => (
  <Container index={i} onIntersection={intersectCallback} >
    <div ref={ref} key={i} className="contents" style={{fontSize:"20pt"}}>
      {i}
    </div>
  </Container>
))}    </div>
  );
};

export default App;
