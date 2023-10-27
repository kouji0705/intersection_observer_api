import React, { useEffect, useRef } from 'react';

const IntersectionObserverExample: React.FC = () => {
  // IntersectionObserverを作成するためのref
  const targetRef = useRef<HTMLDivElement>(null);

  // IntersectionObserverのコールバック関数
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 要素が表示されたときのアクションをここに記述
        console.log('要素が画面に表示されました！');
      }
    });
  };

  useEffect(() => {
    if (targetRef.current) {
      const options: IntersectionObserverInit = {
        root: null, // ルート要素 (nullはビューポートを意味します)
        rootMargin: '0px', // ルート要素とのマージン
        // threshold: 0.5, // 交差の閾値（50%以上が表示されたときにコールバックが呼び出されます）
        threshold: 0, // 交差の閾値（50%以上が表示されたときにコールバックが呼び出されます）
      };

      const observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(targetRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div>
      <h1>IntersectionObserver Example</h1>
      <div
        ref={targetRef}
        style={{
          width: '100px',
          height: '100px',
          background: 'lightblue',
          margin: '200px 0',
        }}
      >
        目標要素
      </div>
    </div>
  );
};

export default IntersectionObserverExample;
