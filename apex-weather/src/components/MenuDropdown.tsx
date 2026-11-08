import React, { useEffect, useRef, useState } from 'react';

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
  onAboutClick?: () => void;
}

const ISSUES_URL = 'https://github.com/olafabregas/Apex-Weather/issues';

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the selection fallback.
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ isOpen, onClose, onRefresh, onAboutClick }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shareLocation = async () => {
    const url = window.location.href;
    const payload = {
      title: 'Apex Weather',
      text: 'Check the weather on Apex Weather.',
      url
    };

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(payload);
        onClose();
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          onClose();
          return;
        }
      }
    }

    const copied = await copyText(url);
    setShareStatus(copied ? 'Link copied' : 'Could not copy link');
    if (copied) {
      window.setTimeout(onClose, 900);
    }
  };

  const menuItems = [
    {
      id: 'refresh',
      icon: 'refresh',
      label: 'Refresh Data',
      action: () => {
        onRefresh?.();
        onClose();
      },
      disabled: !onRefresh
    },
    {
      id: 'about',
      icon: 'info',
      label: 'About Apex Weather',
      action: () => {
        onAboutClick?.();
        onClose();
      }
    },
    {
      id: 'share',
      icon: 'share',
      label: shareStatus ?? 'Share Location',
      action: () => {
        void shareLocation();
      }
    },
    {
      id: 'issue',
      icon: 'bug_report',
      label: 'Report Issue',
      action: () => {
        window.open(ISSUES_URL, '_blank', 'noopener,noreferrer');
        onClose();
      }
    }
  ];

  return (
    <div
      ref={menuRef}
      className="absolute right-4 sm:right-6 top-full mt-2 w-52 sm:w-56 glass-glow rounded-xl overflow-hidden shadow-xl z-50"
    >
      <div className="py-1.5">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            disabled={item.disabled}
            className="w-full px-3.5 py-3 flex items-center gap-3 hover:bg-white/5 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-primary text-lg flex-shrink-0">
              {item.icon}
            </span>
            <span className="text-sm font-medium text-white/90">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuDropdown;
