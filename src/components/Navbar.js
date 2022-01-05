import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
	const [results, setResults] = useState([]);
	const [searchText, setSearchText] = useState('');
	const auth = useAuth();

	return (
		<div className={styles.nav}>

			<div className={styles.leftDiv}>
				<Link to="/">
					<img alt='' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png'/>
				</Link>
			</div>

			<div className={styles.searchContainer}>
				<img 
					src='https://cdn-icons.flaticon.com/png/512/3031/premium/3031293.png?token=exp=1641421231~hmac=83c1d8680ce1ba5ac0e6b9548512b195' 
					alt='search'
					className={styles.userDp}
				/>

				<input
					placeholder='Search users...'
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>

				{results.length > 0 && (
					<div className={styles.searchResults}>
						<ul>
							{results.map((user) => (
								<li
									className={styles.searchResultsRow}
									key={`user-${user._id}`}
								>
									<Link to={`/user/${user._id}`}>
										<img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' alt=''/>

										<span>{user.name}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			<div className={styles.rightNav}>
				{auth.user && (
					<div className={styles.user}>
						<Link to='/settings'>
							<img 
								src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' 
								alt=''
								style={{height: '40px'}}
								className={styles.userDP} 
							/>
						</Link>
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