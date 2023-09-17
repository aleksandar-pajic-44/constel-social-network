import React from 'react';

import PostAuthorDetails from './authorDetails';
import PostTimePosted from './timePosted';
import PostDeleteButton from './deletePostButton';

import { PostComment } from '../models/post';

const PostCommentsList = ({ comments, authorUsername }: { comments: PostComment[], authorUsername: string}) => (
  <>
    <div className='post__comments'>
      {/* Display number of comments */}
      <h2 className='post__comments__title'>{comments?.length} comments</h2>

      {/* Comments list wrapper */}
      <div className="post__comments__list">
        <>
          {/* Show all comments */}
          {comments?.map((comment: PostComment) => (
            <div key={comment?.comment_id} className="post__comments__list__comment">

              {/* Comment header info */}
              <div className="post__comments__list__comment__header">
                {/* Author profile details */}
                <PostAuthorDetails
                  username={comment?.username}
                  fullName={comment?.full_name}
                  picture={comment?.picture}
                />

                {/* Delete button & time posted info */}
                <div className='post__comments__list__comment__header__actions'>
                  <PostTimePosted timePosted={comment?.created_at}/>
                  { authorUsername === comment?.username && (
                    <PostDeleteButton />
                  )}
                </div>
              </div>

              {/* Comment body content */}
              <div className="post__comments__list__comment__body">
                <p className="post__description post__description--modal">
                  {comment?.text}
                </p>
              </div>

              {/* Comments footer mobile only */}
              { authorUsername === comment?.username && (
                <div className="post__comments__list__comment__footer">
                    <PostDeleteButton />
                </div>
              )}
            </div>
          ))}
        </>
      </div>
    </div>
  </>
);

export default PostCommentsList;
