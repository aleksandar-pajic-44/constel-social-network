// Import components
import CreatePost from './createPost';
import CreatePostLoader from './createPostLoader';
import FeedPost from './feedPost';
import FeedPostLoader from './feedPostLoader';
import PostActionButton from './actionButton';
import PostAuthorDetails from './authorDetails';
import PostTimePosted from './timePosted';
import PostDeleteButton from './deletePostButton';
import PostCommentsList from './commentsList';
import PostCommentsListLoader from './commentsListLoader';

// Export them as a single object
const HomeComponents = {
  CreatePost,
  CreatePostLoader,
  FeedPost,
  FeedPostLoader,
  PostActionButton,
  PostAuthorDetails,
  PostTimePosted,
  PostDeleteButton,
  PostCommentsList,
  PostCommentsListLoader,
};

export default HomeComponents;