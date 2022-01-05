import { useState } from 'react/cjs/react.development';
import styles from '../styles/home.module.css';

const CreatePost = () => {
	const [post, setPost] = useState('');
	const [addingPost, setAddingPost] = useState(false);

	const handleAddPostClick = () => {};

	return (
		<div className={styles.createPost}>
			<textarea 
				className={styles.addPost}	
				onChange={(e) => setPost(e.target.value)}
			/>
			<div>
				<button className={styles.addPostBtn} onClick={handleAddPostClick} disabled={addingPost}>
					{addingPost ? 'Adding post...' : 'Add Post'}</button>
			</div>
		</div>
	);
}

export default CreatePost;