import { TbCircleDashed } from 'react-icons/tb';

const ProfileUserDetails = () => {
  return (
    <div className='py-10'>
      <div className='flex items-center'>
        <div className='w-[15%]'>
          <img
            src='https://cdn.pixabay.com/photo/2023/12/01/15/16/red-fruits-8423880_1280.jpg'
            alt=''
            className='w-32 h-32 rounded-full'
          />
        </div>

        <div className='space-y-5'>
          <div className='flex items-center space-x-10'>
            <p>username</p>
            <button>Edit Profile</button>
            <TbCircleDashed />
          </div>

          <div className='flex items-center space-x-10'>
            <div>
              <span className='font-semibold mr-2'>10</span>
              <span>posts</span>
            </div>
            <div>
              <span className='font-semibold mr-2'>5</span>
              <span>followers</span>
            </div>
            <div>
              <span className='font-semibold mr-2'>7</span>
              <span>following</span>
            </div>
          </div>

          <div>
            <p className='font-semibold'>Full Name</p>
            <p className='font-thin text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
              rem? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserDetails;
