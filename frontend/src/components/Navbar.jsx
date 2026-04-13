import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.navBarContainer}>
      <div style={styles.navInner}>
        <div style={styles.leftLinks}>
          <Link to="/posts" style={styles.link}>Feed</Link>
          <Link to="/messages" style={styles.link}>Messages</Link>
          <Link to="/profile" style={styles.link}>Profile</Link>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Log out
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navBarContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'center', // This centers the 'inner' part
    height: '60px',
  },
  navInner: {
    width: '100%',
    maxWidth: '600px', 
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '0 20px',
  },
  leftLinks: {
    display: 'flex',
    gap: '15px'
  },
  link: { textDecoration: 'none', color: '#333', fontWeight: 'bold' },
  logoutBtn: { 
    backgroundColor: '#ff4b2b', 
    color: 'white', 
    border: 'none', 
    padding: '6px 12px', 
    borderRadius: '4px', 
    cursor: 'pointer' 
  }
};

export default Navbar;