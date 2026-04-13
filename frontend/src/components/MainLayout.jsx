import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#f4f4f4' }}>
        <div style={{ width: '100%', maxWidth: '600px', padding: '20px', boxSizing: 'border-box' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;