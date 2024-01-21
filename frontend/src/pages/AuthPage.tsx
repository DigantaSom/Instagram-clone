import { useLocation } from 'react-router-dom';

import SignIn from '../features/auth/SignIn';
import SignUp from '../features/auth/SignUp';

import PhoneImg from '../img/phone.png';

const AuthPage = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <div className='flex items-center justify-center h-screen lg:space-x-5'>
        <div className='relative hidden lg:block'>
          <div className='h-[35.3rem] w-96'>
            <img src={PhoneImg} alt='Login' className='h-full w-full' />
            <div className='auth-page__mobile-wallpaper h-[30.5rem] w-[13.3rem] absolute top-[18.5px] right-[46px]'></div>
          </div>
        </div>

        <div className='w-[90vw] ph:w-[60vw] md:w-[40vw] lg:w-[25vw]'>
          {pathname === '/login' ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
