import React from 'react';
import IntersectionObserverExample from './IntersectionObserverExample'; // コンポーネントのインポート先を適切に設定してください

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>IntersectionObserverを使ったReactアプリ</h1>
      <IntersectionObserverExample />
      {/* 他のコンポーネントもここで呼び出せます */}
    </div>
  );
}

export default App;
