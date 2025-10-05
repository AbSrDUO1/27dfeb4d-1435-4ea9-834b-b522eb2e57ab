"use client";

import React, { memo } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { NavItem } from '@/types/navigation';
import { useMenuAnimation } from './useMenuAnimation';

interface MobileMenuProps {
    menuOpen: boolean;
    onMenuToggle: () => void;
    navItems: NavItem[];
    onNavClick: (id: string) => void;
    children?: React.ReactNode;
}

const MobileMenu = ({
    menuOpen,
    onMenuToggle,
    navItems,
    onNavClick,
    children
}: MobileMenuProps) => {
    const menuRef = useMenuAnimation(menuOpen);

    return (
        <div 
            id="mobile-menu"
            className="md:hidden z-10 fixed top-3 left-1/2 -translate-x-1/2 h-fit rounded bg-white shadow backdrop-blur-sm p-6 flex flex-col gap-6 select-none opacity-0"
            style={{ width: 'calc(100vw - var(--vw-0_75) * 2)' }}
            ref={menuRef}
            role="navigation"
            aria-label="Mobile navigation menu"
        >
            <div className="w-full flex justify-between items-center">
                <p className="text-xl text-black">Menu</p>
                <button 
                    className="shrink-0 h-8 aspect-square rounded-sm bg-black flex items-center justify-center cursor-pointer"
                    onClick={onMenuToggle}
                    aria-label="Close menu"
                >
                    <Plus className="w-1/2 h-1/2 text-white rotate-45" strokeWidth={1.5} aria-hidden="true" />
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <button 
                            className="w-full h-fit flex justify-between items-center cursor-pointer"
                            onClick={() => onNavClick(item.id)}
                            aria-label={`Navigate to ${item.name}`}
                        >
                            <p className="text-base font-medium">{item.name}</p>
                            <ArrowRight strokeWidth={1.5} className="h-[var(--text-base)] w-auto text-black" aria-hidden="true" />
                        </button>
                        {index < navItems.length - 1 && (
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                        )}
                    </React.Fragment>
                ))}
            </div>
            {children && (
                <div className="flex gap-3 items-center">{children}</div>
            )}
        </div>
    );
};

export default memo(MobileMenu);