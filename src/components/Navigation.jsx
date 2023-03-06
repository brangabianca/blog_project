import { Link } from "react-router-dom";
import "./Navigation.style.css";

function Navigation() {
	return (
		<div className='navbar_blog'>
			<Link to='/home'>Home</Link>
			<Link to='/blogs'>All blogs</Link>
			<Link to='/wishlist'>Wishlist</Link>
		</div>
	);
}

export default Navigation;
