import styles from './Navbar.module.css';
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../lib/auth";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <header className={styles.logo}>NotesApp</header>

      <div className={styles.actions}>
        {!loggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
