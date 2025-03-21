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
    <footer className='footer-bg'>
      <FaCompass />
      <FaQuestionCircle />
      <FaBell />
      <FaLanguage />
      <FaUserCircle />
    </footer>
  );
}
