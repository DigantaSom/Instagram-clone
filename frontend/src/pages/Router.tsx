import { Routes, Route, useLocation } from 'react-router-dom';

import AuthPage from './AuthPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import StoryPage from './StoryPage';

import Sidebar from '../features/ui/sidebar/Sidebar';

const Router = () => {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === '/signup' || pathname === '/login' ? (
        <Routes>
          <Route path='/signup' element={<AuthPage />} />
          <Route path='/login' element={<AuthPage />} />
        </Routes>
      ) : (
        <div className='flex'>
          <div className='w-[20%] border border-l-slate-500'>
            <Sidebar />
          </div>
          <div className='w-full'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/:username' element={<ProfilePage />} />
              <Route path='/story' element={<StoryPage />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default Router;
