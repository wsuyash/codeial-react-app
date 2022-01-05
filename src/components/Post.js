import { useToasts } from 'react-toast-notifications';
import { useState } from 'react/cjs/react.development';
import { createComment, toggleLike } from '../api';
import { useProvidePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import { Comment } from './'

const Post = (post) => {
	const [comment, setComment] = useState('');
	const [creatingComment, setCreatingComment] = useState(false);

	const posts = useProvidePosts();

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

	const handlePostLikeClick = async () => {
		const response = await toggleLike(post.props._id, 'Post');

		if (response.success) {
			if (response.data.deleted) {
				addToast('Like removed.', {
					appearance: 'success',
				});
			} else {
				addToast('Like added.', {
					appearance: 'success',
				});
			}
		} else {
			addToast(response.message, {
				appearance: 'error',
			});
		}
	}

	return (
  	<div className={styles.postWrapper} key={post.props._id}>
  	  <div className={styles.postHeader}>
  	    <div className={styles.postAvatar}>
  	      <img
  	        src="https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1641224049~hmac=f865da68d726935f8c026b964cf207aa"
  	        alt="user-pic"
  	      />
  	      <div>
  	        <Link
							to={{
								pathname: `/user/${post.props.user._id}`,
								state: {
									user: post.props.user,
								}
							}}
							className={styles.postAuthor}
						>
					{post.props.user.name}
				</Link>
  	        <span className={styles.postTime}>{post.props.createdAt.toString()}</span>
  	      </div>
  	    </div>
  	    <div className={styles.postContent}>{post.props.content}</div>

  	    <div className={styles.postActions}>
  	      <div className={styles.postLike}>
						<button
							onClick={handlePostLikeClick}
							style={{ border: 'none', background: 'transparent' }}
						>
	  	        <img
	  	          src="https://cdn-icons.flaticon.com/png/512/880/premium/880452.png?token=exp=1641224085~hmac=15edf68d1059259a5dd87fd62367a738"
	  	          alt="likes-icon"
	  	        />
						</button>
  	        <span>{post.props.likes.length}</span>
  	      </div>

  	      <div className={styles.postCommentsIcon}>
  	        <img
  	          src="https://cdn-icons.flaticon.com/png/512/2593/premium/2593491.png?token=exp=1641224123~hmac=07689a5c10e8e37a11c09c44e0861d21"
  	          alt="comments-icon"
  	        />
  	        <span>{post.props.comments.length}</span>
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
					{post.props.comments.map((comment) => (
						<Comment comment={comment} key={`post-comment-${comment._id}`}/>
					))}
				</div>
  	  </div>
  	</div>
	);
}

export default Post;