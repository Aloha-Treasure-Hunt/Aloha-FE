'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Compass, Map, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { MobileNavButton } from '@/components/MobileNavButton';
import NavButton from '@/components/NavButton';
import { FaPuzzlePiece } from 'react-icons/fa';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className='header-bg'>
      <nav className='flex justify-between items-center py-3 px-4 md:px-6'>
        <Link
          href='/homepage'
          className='text-xl md:text-2xl font-bold flex items-center gap-2'
        >
          <Compass className=' h-6 w-6 md:h-7 md:w-7' />
          <span>Aloha Treasure Hunt</span>
        </Link>

        {/* Mobile menu button */}
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden  hover:text-[#337cad]'
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Desktop navigation */}
        <div className='hidden md:flex space-x-2 lg:space-x-3'>
          <NavButton href='/dashboard'>
            <Map size={18} />
            Dashboard
          </NavButton>
          <NavButton href='/clues'>
            <Compass size={18} />
            Clues
          </NavButton>
          <NavButton href='/challenges'>
            <FaPuzzlePiece size={18} />
            Side Quests
          </NavButton>
          <NavButton href='/landing'>
            <HelpCircle size={18} />
            Q&A
          </NavButton>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white animate-fadeIn'>
          <div className='flex flex-col py-2 px-4 space-y-2'>
            <MobileNavButton href='/dashboard' onClick={toggleMenu}>
              <Map size={18} />
              Dashboard
            </MobileNavButton>
            <MobileNavButton href='/clues' onClick={toggleMenu}>
              <Compass size={18} />
              Clues
            </MobileNavButton>
            <MobileNavButton href='/challenges' onClick={toggleMenu}>
              <FaPuzzlePiece size={18} />
              Side Quests
            </MobileNavButton>
            <MobileNavButton href='/landing' onClick={toggleMenu}>
              <HelpCircle size={18} />
              Q&A
            </MobileNavButton>
          </div>
        </div>
      )}
    </header>
  );
}
