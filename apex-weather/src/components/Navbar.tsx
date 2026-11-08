import React, { useState } from 'react';
import type { Location } from '../types/weather.types';
import MenuDropdown from './MenuDropdown';

interface NavbarProps {
  location: Location | null;
  onRefresh?: () => void;
  onSearchClick?: () => void;
  onAboutClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ location, onRefresh, onSearchClick, onAboutClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuSession, setMenuSession] = useState(0);
  const place = location
    ? `${location.city}${location.state ? `, ${location.state}` : location.country ? `, ${location.country}` : ''}`
    : null;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#102122]/95 backdrop-blur-md">
      <div className="relative mx-auto w-full max-w-3xl">
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2 min-w-0">
            {place ? (
              <>
                <span className="material-symbols-outlined text-cyan-400 text-xl flex-shrink-0">location_on</span>
                <span className="text-sm sm:text-base md:text-lg font-medium tracking-tight truncate">
                  {place}
                </span>
              </>
            ) : (
              <span className="text-sm sm:text-base md:text-lg font-semibold tracking-tight">
                Apex Weather
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onSearchClick}
              aria-label="Search location"
              className="w-10 h-10 glass-glow rounded-full flex items-center justify-center transition-all hover:bg-white/10 active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px] text-white/90">
                search
              </span>
            </button>
            <button
              onClick={() => {
                if (!menuOpen) setMenuSession((session) => session + 1);
                setMenuOpen(!menuOpen);
              }}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="w-10 h-10 glass-glow rounded-full flex items-center justify-center transition-all hover:bg-white/10 active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px] text-white/90">
                {menuOpen ? 'close' : 'more_vert'}
              </span>
            </button>
          </div>
        </div>

        <MenuDropdown
          key={menuSession}
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onRefresh={onRefresh}
          onAboutClick={onAboutClick}
        />
      </div>
    </header>
  );
};

export default Navbar;
