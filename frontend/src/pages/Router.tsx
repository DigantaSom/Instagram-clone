import { Routes, Route } from 'react-router-dom';

import Sidebar from '../features/ui/sidebar/Sidebar';

import HomePage from './HomePage';
import ProfilePage from './ProfilePage';

const Router = () => {
  return (
    <div>
      <div className='flex'>
        <div className='w-[20%] border border-l-slate-500'>
          <Sidebar />
        </div>
        <div className='w-full'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/:username' element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Router;
