import React from 'react';
import ContentLoader from 'react-content-loader';

const FeedPostLoader = ({ count = 1 }: { count?: number }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <ContentLoader key={index} uniqueKey='feedPostLoader' viewBox="0 0 668 260">
        <rect x="0" y="230" rx="4" ry="4" width="450" height="11" />
        <rect x="0" y="250" rx="3" ry="3" width="300" height="8" />
        <rect x="0" y="0" rx="10" ry="10" width="668" height="217" />
      </ContentLoader>
    ))}
  </>
);

export default FeedPostLoader;
