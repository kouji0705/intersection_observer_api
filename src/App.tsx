import React, { useState } from 'react';
import './App.css';
import Container from './Container'
import axios from 'axios'
import { Post } from './types'

const App: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  // const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=0&_limit=10`)
  const [newItems, setNewItems] = useState<Post[]>([{
    userId: 1,
    id: 1,
    title: "タイトル",
    body: "本文"
  }]);
  const [page, setPage] = useState(0);

  // callback関数を定義
  const intersectCallback = async (index: number) => {
    console.log('intersectCallback',index)
    if (index === 3) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${index}&_limit=10`);
        console.log('response', response.data);
        // setNewItems((prevItems) => [...prevItems, 4, 5]);
        setNewItems((prevItems) => [...prevItems]);
      } catch (error) {
        console.error('APIリクエストエラー:', error);
      }
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
      {newItems.map((post) => (
  <Container index={post.id} onIntersection={intersectCallback} >
    <div ref={ref} key={post.id} className="contents" style={{fontSize:"20pt"}}>
      {post.id}<br/>
      {post.title}<br/>
      {post.body}<br/>
    </div>
  </Container>
))}    </div>
  );
};

export default App;
