'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { MobileNavButton } from '@/components/MobileNavButton';
import NavButton from '@/components/NavButton';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className='bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50 shadow-sm'>
      <nav className='container mx-auto flex justify-between items-center py-3 px-4 md:px-6'>
        <Link href='/homepage' className='text-xl md:text-2xl font-bold'>
          <span className='bg-gradient-to-r from-amber-500 to-teal-600 bg-clip-text text-transparent'>
            Aloha Treasure Hunt
          </span>
        </Link>

        {/* Mobile menu button */}
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Desktop navigation */}
        <div className='hidden md:flex space-x-1 lg:space-x-2'>
          <NavButton href='/dashboard'>Dashboard</NavButton>
          <NavButton href='/clues'>Clues</NavButton>
          <NavButton href='/challenges'>Side Quests</NavButton>
          <NavButton href='/landing'>Q&A</NavButton>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white/95 border-b border-amber-100 animate-fadeIn'>
          <div className='flex flex-col py-2 px-4 space-y-1'>
            <MobileNavButton href='/dashboard' onClick={toggleMenu}>
              Dashboard
            </MobileNavButton>
            <MobileNavButton href='/clues' onClick={toggleMenu}>
              Clues
            </MobileNavButton>
            <MobileNavButton href='/challenges' onClick={toggleMenu}>
              Side Quests
            </MobileNavButton>
            <MobileNavButton href='/landing' onClick={toggleMenu}>
              Q&A
            </MobileNavButton>
          </div>
        </div>
      )}
    </header>
  );
}
