import React from 'react';
import ContentLoader from 'react-content-loader';

const createPostLoader = ({ count = 1 }: { count?: number }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <ContentLoader
        key={index}
        uniqueKey='createPosts'
        viewBox="0 0 320 70"
      >
        <circle cx="20" cy="19" r="15" />
        <rect x="50" y="10" rx="3" ry="3" width="240" height="20" />
        <rect x="295" y="10" rx="3" ry="3" width="20" height="20" />
        <rect x="5" y="40" rx="3" ry="3" width="310" height="0.5" />
        <rect x="245" y="46" rx="3" ry="3" width="70" height="20" />
        <circle cx="60" cy="57" r="10" />
      </ContentLoader>
    ))}
  </>
);

export default createPostLoader;
