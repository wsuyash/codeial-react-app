import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications';
import { useState } from 'react/cjs/react.development';
import { createComment } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import { Comment } from './'

const Post = ({ post }) => {
	const [comment, setComment] = useState('');
	const [creatingComment, setCreatingComment] = useState(false);

	const posts = usePosts();

	const { addToast } = useToasts(); 

	const handleAddComment = async (e) => {
		if (e.key === 'Enter') {
			setCreatingComment(true);
		}

		const response = await createComment(comment, post._id);

		if (response.success) {
			setComment('');
			posts.addComment(response.data.comment, post._id);
			addToast('Comment added.', {
				appearance: 'success',
			});
		} else {
			addToast(response.message, {
				appearance: 'error',
			});
		}

		setCreatingComment(false);
	}

	return (
  	<div className={styles.postWrapper} key={post._id}>
  	  <div className={styles.postHeader}>
  	    <div className={styles.postAvatar}>
  	      <img
  	        src="https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1641224049~hmac=f865da68d726935f8c026b964cf207aa"
  	        alt="user-pic"
  	      />
  	      <div>
  	        <Link
							to={{
								pathname: `/user/${post.user._id}`,
								state: {
									user: post.user,
								}
							}}
							className={styles.postAuthor}
						>
					{post.user.name}
				</Link>
  	        <span className={styles.postTime}>a minute ago</span>
  	      </div>
  	    </div>
  	    <div className={styles.postContent}>{post.content}</div>

  	    <div className={styles.postActions}>
  	      <div className={styles.postLike}>
  	        <img
  	          src="https://cdn-icons.flaticon.com/png/512/880/premium/880452.png?token=exp=1641224085~hmac=15edf68d1059259a5dd87fd62367a738"
  	          alt="likes-icon"
  	        />
  	        <span>{post.likes.length}</span>
  	      </div>

  	      <div className={styles.postCommentsIcon}>
  	        <img
  	          src="https://cdn-icons.flaticon.com/png/512/2593/premium/2593491.png?token=exp=1641224123~hmac=07689a5c10e8e37a11c09c44e0861d21"
  	          alt="comments-icon"
  	        />
  	        <span>{post.comments.length}</span>
  	      </div>
  	    </div>
  	    <div className={styles.postCommentBox}>
  	      <input 
						placeholder="Start typing a comment" 
						value={comment}	
						onChange={(e) => setComment(e.target.value)}
						onKeyDown={handleAddComment}
						/>
  	    </div>

  			<div className={styles.postCommentsList}>
					{post.comments.map((comment) => (
						<Comment comment={comment} key={`post-comment-${comment._id}`}/>
					))}
				</div>
  	  </div>
  	</div>
	);
}

// Post.propTypes = {
// 	post: PropTypes.object.isRequired
// }

export default Post;