import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const InfiniteScrollExample: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // 初期状態を1に戻す

  const targetRef = useRef<HTMLDivElement>(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !loading) {
        loadMorePosts();
      }
    });
  };

  useEffect(() => {
    if (targetRef.current) {
      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      };

      const observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(targetRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  const loadMorePosts = async () => {
    setLoading(true);

    // ページ番号を更新してからリクエストを送信
    const nextPage = page + 1;
    setPage(nextPage);

    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${nextPage}&_limit=10`);
    const newPosts = response.data;

    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setLoading(false);
  };

  useEffect(() => {
    loadMorePosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '8px' }}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      <div ref={targetRef} style={{ width: '100%', height: '10px' }} />
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScrollExample;
