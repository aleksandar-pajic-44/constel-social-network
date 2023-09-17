import React from 'react';
import ContentLoader from 'react-content-loader';

const PostCommentsListLoader = ({ count = 1 }: { count?: number }) => (
  <div className='post__comments'>
    <div className="post__comments__list">
      {Array.from({ length: count }, (_, index) => (
        <ContentLoader
          key={index}
          uniqueKey='commentsList'
          viewBox="0 0 434 74"
          backgroundColor="#f0f0f0"
          foregroundColor="#dedede"
        >
          <circle cx="20" cy="19" r="20" />
          <rect x="50" y="20" rx="5" ry="5" width="108" height="13" />
          <rect x="50" y="0" rx="5" ry="5" width="60" height="13" />
          <rect x="300" y="4" rx="5" ry="5" width="60" height="20" />
          <rect x="370" y="4" rx="5" ry="5" width="60" height="20" />
          <rect x="0" y="50" rx="5" ry="5" width="320" height="22" />
        </ContentLoader>
      ))}
    </div>
  </div>
);

export default PostCommentsListLoader;
