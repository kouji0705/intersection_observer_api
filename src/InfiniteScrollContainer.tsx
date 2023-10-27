import React, { useEffect, useRef, useState } from 'react';

interface InfiniteScrollContainerProps {
  children: React.ReactNode;
  fetchMore: () => Promise<void>; // fetchMoreがPromiseを返すように変更
}

export const InfiniteScrollContainer: React.FC<InfiniteScrollContainerProps> =
  ({ children, fetchMore }) => {
    let bottomBoundaryRef = useRef<HTMLDivElement | null>(null);
    const [needFetchMore, setNeedFetchMore] = useState(false);

    useEffect(() => {
      const scrollObserver = (node: HTMLDivElement | null) => {
        if (!node) return;

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              setNeedFetchMore(true);
            }
          });
        });

        observer.observe(node);

        return () => {
          observer.disconnect();
        };
      };

      scrollObserver(bottomBoundaryRef.current);
    }, []);

    useEffect(() => {
      if (needFetchMore) {
        fetchMore()
          .then(() => setNeedFetchMore(false))
          .catch((error) => {
            console.error('Error while fetching more data:', error);
            setNeedFetchMore(false);
          });
      }
    }, [needFetchMore, fetchMore]);

    return (
      <div>
        {children}
        <div ref={bottomBoundaryRef} />
      </div>
    );
  };
