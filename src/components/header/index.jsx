const Header = ({ title }) => {
	return (
		<nav className="navbar bg-body-tertiary">
			<div className="container">
				<h1 className="navbar-brand mb-0 h1">{title}</h1>
			</div>
		</nav>
	);
};

export { Header };
