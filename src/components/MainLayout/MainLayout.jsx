import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

function MainLayout() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
