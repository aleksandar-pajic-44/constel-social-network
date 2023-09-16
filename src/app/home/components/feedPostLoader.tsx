import React from 'react';
import ContentLoader from 'react-content-loader';

const FeedPostLoader = ({ count = 1 }: { count?: number }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <ContentLoader key={index} uniqueKey='feedPostLoader' viewBox="0 0 668 340">
        <circle cx="30" cy="45" r="30" />
        <rect x="75" y="25" rx="3" ry="3" width="70" height="20" />
        <rect x="75" y="50" rx="3" ry="3" width="130" height="15" />
        <rect x="580" y="35" rx="3" ry="3" width="130" height="20" />
        <rect x="0" y="90" rx="10" ry="10" width="668" height="217" />
        <rect x="0" y="315" rx="4" ry="4" width="450" height="11" />
        <rect x="0" y="332" rx="3" ry="3" width="300" height="8" />
      </ContentLoader>
    ))}
  </>
);

export default FeedPostLoader;
