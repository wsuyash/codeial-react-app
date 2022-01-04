import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAuth } from "../hooks";
import { Home, Login } from '../pages';
import { Loader, Navbar } from './'

const About = () => {
	return <h1>About</h1>
}

const UserInfo = () => {
	return <h1>User Info</h1>
}

const Page404 = () => {
	return <h1>404</h1>
}

function App() {
	const auth = useAuth();

	if (auth.loading) {
		return <Loader />;
	}

  return (
    <div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/login" element={<Login />} />
					<Route path="/about" element={<About />} />
					<Route path="/user/asdasd" element={<UserInfo />} />
					<Route path="*" element={<Page404 />}/>
				</Routes>
			</Router>
    </div>
  );
}

export default App;
