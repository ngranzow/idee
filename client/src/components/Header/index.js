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
                <h2>Let us know what your idee is!</h2>
                <nav>
                    {Auth.loggedIn() ? (
                        <>
                            <Link to="/youridee">My Idees</Link>
                             |<div></div>
                            <a href="/" onClick={logout}>
                                Logout
                            </a>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <></>
                            <Link to="/signup">Signup</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;