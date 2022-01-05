import { useEffect, useState } from "react";
import { getPosts } from '../api'
import styles from '../styles/home.module.css';
import Comment from '../components/Comment';
import { CreatePost, FriendsList, Loader } from "../components";
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const auth = useAuth();

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await getPosts();
			console.log('response', response);

			if (response.success) {
				setPosts(response.data.posts);
			}

			setLoading(false);
		}

		fetchPosts();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.home}>
			<div className={styles.postsList}>
				<CreatePost />
				{posts.map((post) => (
  	    	<div className={styles.postWrapper} key={`post-${post._id}`}>
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
  	    	        <span>5</span>
  	    	      </div>

  	    	      <div className={styles.postCommentsIcon}>
  	    	        <img
  	    	          src="https://cdn-icons.flaticon.com/png/512/2593/premium/2593491.png?token=exp=1641224123~hmac=07689a5c10e8e37a11c09c44e0861d21"
  	    	          alt="comments-icon"
  	    	        />
  	    	        <span>2</span>
  	    	      </div>
  	    	    </div>
  	    	    <div className={styles.postCommentBox}>
  	    	      <input placeholder="Start typing a comment" />
  	    	    </div>

  	  				<div className={styles.postCommentsList}>
								{post.comments.map((comment) => (
									<Comment comment={comment}/>
								))}
							</div>
  	    	  </div>
  	    	</div>
				))}
  	  </div>

			{auth.user && <FriendsList />}

		</div>
	);
}

export default Home;