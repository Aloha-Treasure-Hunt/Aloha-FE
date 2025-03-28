import {
  FaBell,
  FaCompass,
  FaLanguage,
  FaQuestionCircle,
  FaUserCircle,
} from 'react-icons/fa';
import '@/components/home/home.css';

export function Footer() {
  return (
    <footer className='footer-bg p-4 grid grid-cols-5 gap-2 items-center justify-items-center fixed bottom-0 w-full z-20'>
      <div className='text-center'>
        <FaCompass className='text-app text-xl' />
      </div>
      <div className='text-center'>
        <FaQuestionCircle className='text-app text-xl' />
      </div>
      <div className='text-center'>
        <FaBell className='text-app text-xl' />
      </div>
      <div className='text-center'>
        <FaLanguage className='text-app text-xl' />
      </div>
      <div className='text-center'>
        <FaUserCircle className='text-app text-xl' />
      </div>
    </footer>
  );
}
