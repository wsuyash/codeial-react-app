import { useState } from 'react/cjs/react.development';
import styles from '../styles/settings.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchUserProfile } from '../api';
import { useToasts } from 'react-toast-notifications';
import { Loader } from '../components';
import { useAuth } from '../hooks';

const UserProfile = () => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const { userId } = useParams(); 
	const { addToast } = useToasts();
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		const getUser = async () => {
			const response = await fetchUserProfile(userId);

			if (response.success) {
				setUser(response.data.user);
			} else {
				addToast(response.message, {
					appearance: 'error',
				});
				return navigate("/");
			}

			setLoading(false);
		}

		getUser();
	}, [userId, navigate, addToast]);

	if (loading) {
		return <Loader />;
	}

	const checkIfUserIsAFriend = () => {
		const friends = auth.user.friends;

		const friendIDs = friends.map(friend => friend.to_user._id);
		const index = friendIDs.indexOf(userId);

		if (index !== -1) {
			return true;
		}

		return false;
	}

	return (
		<div className={styles.settings}>
			<div className={styles.imgContainer}>
				<img 
					src="https://cdn-icons-png.flaticon.com/512/2099/2099058.png"
					alt='settings'	
				/>
			</div>

			<div className={styles.field}>
				<div className={styles.fieldLabel}>Email</div>
				<div className={styles.fieldValue}> {user.email } </div>
			</div>

			<div className={styles.field}>
				<div className={styles.fieldLabel}>Name</div>
				<div className={styles.fieldValue}> {user.name } </div>
			</div>

			<div className={styles.btnGrp}>
				{checkIfUserIsAFriend() ? (
					<button className={`button ${styles.saveBtn}`}>
						Remove Friend
					</button>
				) : (
					<button className={`button ${styles.saveBtn}`}>
						Add Friend
					</button>
				)}
			</div>
		</div>
	);
}

export default UserProfile;