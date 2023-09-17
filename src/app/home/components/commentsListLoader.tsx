import React from 'react';
import ContentLoader from 'react-content-loader';

const PostCommentsListLoader = ({ count = 1 }: { count?: number }) => (
  <div className='post__comments'>
    <div className="post__comments__list">
      {Array.from({ length: count }, (_, index) => (
        <ContentLoader
          key={index}
          uniqueKey='commentsList'
          viewBox="0 0 573 90"
          backgroundColor="#f0f0f0"
          foregroundColor="#dedede"
        >
          <circle cx="20" cy="20" r="20" />
          <rect x="50" y="23" rx="5" ry="5" width="108" height="13" />
          <rect x="50" y="4" rx="5" ry="5" width="60" height="13" />
          <rect x="510" y="6" rx="5" ry="5" width="60" height="20" />
          <rect x="440" y="6" rx="5" ry="5" width="60" height="20" />
          <rect x="0" y="50" rx="5" ry="5" width="320" height="15" />
          <rect x="0" y="70" rx="5" ry="5" width="500" height="15" />
        </ContentLoader>
      ))}
    </div>
  </div>
);

export default PostCommentsListLoader;
