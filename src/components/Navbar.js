import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
	const auth = useAuth();

	return (
		<div className={styles.nav}>

			<div className={styles.leftDiv}>
				<Link to="/">
					<img alt='' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png'/>
				</Link>
			</div>

			<div className={styles.rightNav}>
				{auth.user && (
					<div className={styles.user}>
						<a href='/'>
							<img 
								src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' 
								alt=''
								className={styles.userDP} 
								style={{height: '40px'}}
							/>
						</a>
						<span>Suyash</span>
					</div>
				)}

				<div className={styles.navLinks}>
					<ul>
						{auth.user ? (
								<li onClick={auth.logout}>Log Out</li>
						) : (
							<>
								<li>
									<Link to='/login'>Log In</Link>
								</li>
								<li>
									<Link to='/register'>Register</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>

		</div>
	);
}

export default Navbar;