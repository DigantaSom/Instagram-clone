import ProfileUserDetails from '../features/profile/ProfileUserDetails';
import ReqUserPostPart from '../features/profile/ReqUserPostPart';

const ProfilePage = () => {
  return (
    <div className='px-20'>
      <div>
        <ProfileUserDetails />
      </div>
      <div>
        <ReqUserPostPart />
      </div>
    </div>
  );
};

export default ProfilePage;
