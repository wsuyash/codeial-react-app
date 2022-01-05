import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks'
import { useState } from 'react/cjs/react.development';
import { useToasts } from 'react-toast-notifications';

const Settings = () => {
	const auth = useAuth();
	const [editMode, setEditMode] = useState(false);
	const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [savingForm, setSavingForm] = useState(false);
	const { addToast } = useToasts();

	const clearForm = () => {
		setPassword('');
		setConfirmPassword('');
	}

	const updateProfile = async () => {
		setSavingForm(true);

		let error = false;
		
		if (!name || !password || !confirmPassword) {
			addToast('Please fill all the fields', {
				appearance: 'error'
			});

			error = true;
		}

		if (password !== confirmPassword) {
			addToast('Password and Confirm Password do not match.', {
				appearance: 'error'
			});

			error = true;
		}

		if (error) {
			return setSavingForm(false);
		}

		const response = await auth.updateUser(auth.user._id, name, password, confirmPassword);

		if (response.success) {
			setEditMode(false);
			setSavingForm(false);
			clearForm();

			return addToast('User updated!', {
				appearance: 'success'
			});
		} else {
			return addToast(response.message, {
				appearance: 'error'
			});
		}

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
				<div className={styles.fieldValue}> {auth.user?.email } </div>

			</div>

			<div className={styles.field}>
				<div className={styles.fieldLabel}>Name</div>
				{editMode ? (
					<input 
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				) : (
					<div className={styles.fieldValue}> {auth.user?.name } </div>
				)}
			</div>

			{editMode && (
				<>
					<div className={styles.field}>
						<div className={styles.fieldLabel}>Password</div>
						<input 
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className={styles.field}>
						<div className={styles.fieldLabel}>Confirm Password</div>
						<input 
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
				</>
			)}

			<div className={styles.btnGrp}>
				{editMode ? (
					<>
						<button 
							className={`button ${styles.editBtn}`}
							onClick={updateProfile}	
							disabled={savingForm}	
						>
							{savingForm ? 'Saving profile...' : 'Save Profile'}
						</button>
						<button className={`button ${styles.editBtn}`} onClick={() => setEditMode(false)}>Go back</button>
					</>	
				) : (
					<button className={`button ${styles.editBtn}`} onClick={() => setEditMode(true)}>Edit Profile</button>
				)}
			</div>
		</div>
	);
}

export default Settings;