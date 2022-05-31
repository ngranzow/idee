import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header className="bg-secondary mb-4 py-2 flex-row align-center">
            <div className="container flex-row justify-space-between-lg justify-center align-center">
                <Link to="/">
                    <h1>Idee</h1>
                </Link>

                <nav className="text-center">
                    {Auth.loggedIn() ? (
                        <>
                            <Link to="/youridee">My Idees</Link>
                            <a href="/" onClick={logout}>
                                Logout
                            </a>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><h2>Login</h2></Link>
                            <Link to="/signup"><h2>Signup</h2></Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;