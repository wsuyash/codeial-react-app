import { useState } from 'react/cjs/react.development';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { useToasts } from 'react-toast-notifications';

const CreatePost = () => {
	const [post, setPost] = useState('');
	const [addingPost, setAddingPost] = useState(false);
	const { addToast } = useToasts();

	const handleAddPostClick = async () => {
		setAddingPost(true);

		// do some checks like if post is empty, etc.
		const response = await addPost(post);

		if (response.success) {
			setPost('');
			addToast('Post created!', {
				appearance: 'success',
			});
		} else {
			addToast(response.message, {
				appearance: 'error',
			});
		}

		setAddingPost(false);
	};

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