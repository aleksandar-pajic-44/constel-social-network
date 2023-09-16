import React from 'react';
import ContentLoader from 'react-content-loader';

const createPostLoader = ({ count = 1 }: { count?: number }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <ContentLoader
        key={index}
        uniqueKey='createPosts'
        viewBox="0 0 320 80"
      >
        <circle cx="20" cy="33" r="18" />
        <rect x="50" y="20" rx="3" ry="3" width="220" height="25" />
        <rect x="280" y="20" rx="3" ry="3" width="25" height="25" />
        <rect x="235" y="50" rx="3" ry="3" width="70" height="25" />
        <circle cx="60" cy="65" r="10" />
      </ContentLoader>
    ))}
  </>
);

export default createPostLoader;
