import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks'

const Settings = () => {
	const auth = useAuth();



	return (
		<div className={styles.settings}>

			<div className={styles.imgContainer}>
				<img 
					src='https://cdn-icons.flaticon.com/png/512/2881/premium/2881031.png?token=exp=1641276776~hmac=7cd3c897ec007884fb479a054294a6d3'
					alt='settings'	
				/>
			</div>

			<div className={styles.field}>
				<div className={styles.fieldLabel}>Email</div>
				<div className={styles.fieldValue}> {auth.user?.email } </div>
			</div>

			<div className={styles.field}>
				<div className={styles.fieldLabel}>Name</div>
				<div className={styles.fieldValue}> {auth.user?.name } </div>
			</div>

			<div className={styles.field}>
				<div className={styles.fieldLabel}>Password</div>
				<input type="password" />
			</div>

			<div className={styles.field}>
				<div className={styles.fieldLabel}>Confirm Password</div>
				<input type="password" />
			</div>

			<div className={styles.btnGrp}>
				<button className={`button ${styles.editBtn}`}>Edit Profile</button>
			</div>

		</div>
	);
}

export default Settings;