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
          <Compass className='icon-color h-6 w-6 md:h-7 md:w-7' />
          <span className='gradient-text'>Aloha Treasure Hunt</span>
        </Link>

        {/* Mobile menu button */}
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden text-white hover:bg-[#00707e]/50'
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Desktop navigation */}
        <div className='hidden md:flex space-x-2 lg:space-x-3'>
          <NavButton href='/dashboard' className='text-hover'>
            <Map size={18} />
            Dashboard
          </NavButton>
          <NavButton href='/clues' className='text-hover'>
            <Compass size={18} />
            Clues
          </NavButton>
          <NavButton href='/challenges' className='text-hover'>
            <FaPuzzlePiece size={18} />
            Side Quests
          </NavButton>
          <NavButton href='/landing' className='text-hover'>
            <HelpCircle size={18} />
            Q&A
          </NavButton>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-[#00707e]/95 animate-fadeIn'>
          <div className='flex flex-col py-2 px-4 space-y-2'>
            <MobileNavButton
              href='/dashboard'
              onClick={toggleMenu}
              className='text-white hover:bg-[#00707e] hover:text-amber-300 flex items-center gap-2 py-3'
            >
              <Map size={18} />
              Dashboard
            </MobileNavButton>
            <MobileNavButton
              href='/clues'
              onClick={toggleMenu}
              className='text-white hover:bg-[#00707e] hover:text-amber-300 flex items-center gap-2 py-3'
            >
              <Compass size={18} />
              Clues
            </MobileNavButton>
            <MobileNavButton
              href='/challenges'
              onClick={toggleMenu}
              className='text-white hover:bg-[#00707e] hover:text-amber-300 flex items-center gap-2 py-3'
            >
              <FaPuzzlePiece size={18} />
              Side Quests
            </MobileNavButton>
            <MobileNavButton
              href='/landing'
              onClick={toggleMenu}
              className='text-white hover:bg-[#00707e] hover:text-amber-300 flex items-center gap-2 py-3'
            >
              <HelpCircle size={18} />
              Q&A
            </MobileNavButton>
          </div>
        </div>
      )}
    </header>
  );
}
