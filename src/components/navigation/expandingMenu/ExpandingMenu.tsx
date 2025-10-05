"use client";
import React, { useCallback, memo } from 'react';
import { useResponsiveMenuWidth } from './useResponsiveMenuWidth';

interface NavItem {
    id: string;
    name: string;
}

interface ExpandingMenuProps {
    isOpen: boolean;
    onToggle: () => void;
    navItems: NavItem[];
    onNavClick: (id: string) => void;
    currentPage?: string;
    isScrolled?: boolean;
}

const ExpandingMenu = memo<ExpandingMenuProps>(function ExpandingMenu({
    isOpen,
    onToggle,
    navItems,
    onNavClick,
    currentPage = 'Home',
    isScrolled = false
}) {
    const { isMounted, menuWidth } = useResponsiveMenuWidth();

    const handleNavClick = useCallback((id: string) => {
        onNavClick(id);
        onToggle();
    }, [onNavClick, onToggle]);

    return (
        <div 
            className={`
            rounded-[1.75em] absolute top-3 right-3
            transition-[top] duration-500 ease-in-out
            ${isScrolled ? '' : ''}
        `}>
            <div 
                aria-hidden="true"
                className={`
                    transition-all duration-700 ease-[cubic-bezier(0.5,0.5,0,1)]
                    bg-black rounded-[1.75em] absolute top-0 right-0
                    ${isOpen
                        ? 'w-full h-full'
                        : 'h-10 w-[var(--height-10)]'
                    }
                `} 
            />

            <div className={`
                relative p-6 flex flex-col gap-6
                transition-all duration-500 ease-[cubic-bezier(0.5,0.5,0,1)]
                pointer-events-auto origin-[100%_0]
                ${isOpen
                    ? 'scale-100 opacity-100 visible'
                    : 'scale-[0.15] opacity-0 invisible'
                }
            `}
                style={{
                    transition: 'all 0.5s cubic-bezier(0.5, 0.5, 0, 1), transform 0.7s cubic-bezier(0.5, 0.5, 0, 1)',
                    width: isMounted ? menuWidth : 'var(--width-20)'
                }}
            >
                <p className="text-xl text-white" aria-hidden="true">Menu</p>
                <ul 
                    role="menu"
                    className="relative list-none flex flex-col gap-3 m-0 p-0"
                >
                    {navItems.map((item) => {
                        const isCurrentPage = item.name === currentPage;

                        return (
                            <li 
                                key={item.id} 
                                role="menuitem"
                                className="m-0 p-0 list-none"
                            >
                                <button
                                    aria-label={`Navigate to ${item.name}${isCurrentPage ? ' (current page)' : ''}`}
                                    aria-current={isCurrentPage ? 'page' : undefined}
                                    className={`
                                        text-white flex justify-between items-center
                                        no-underline bg-none border-none cursor-pointer w-full
                                        font-inherit group
                                    `}
                                    onClick={() => handleNavClick(item.id)}
                                >
                                    <span className={`text-base ${isCurrentPage ? '' : 'opacity-50'}`}>
                                        {item.name}
                                    </span>
                                    <div className={`
                                        transition-all duration-700 ease-[cubic-bezier(0.5,0.5,0,1)]
                                        bg-current rounded-full shrink-0 
                                        h-2 aspect-square
                                        ${isCurrentPage
                                            ? 'scale-100 opacity-100'
                                            : 'scale-0 opacity-50 group-hover:scale-100 group-hover:opacity-25'
                                        }
                                    `} />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <button
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="navigation-menu"
                className={`
                    transition-transform duration-700 ease-[cubic-bezier(0.5,0.5,0,1)]
                    pointer-events-auto cursor-pointer rounded-full
                    flex justify-center items-center
                    h-10 w-[var(--height-10)] aspect-square absolute top-0 right-0
                    bg-transparent border-none
                    ${isOpen
                        ? '-translate-x-3 translate-y-3'
                        : 'translate-x-0 translate-y-0'
                    }
                `}
                onClick={onToggle}
            >
                <span 
                    aria-hidden="true"
                    className={`
                    transition-transform duration-700 ease-[cubic-bezier(0.5,0.5,0,1)]
                    bg-white w-[40%] h-0.25 absolute
                    ${isOpen
                        ? 'translate-y-0 rotate-45'
                        : '-translate-y-1 hover:translate-y-1'
                    }
                `} />
                <span 
                    aria-hidden="true"
                    className={`
                    transition-transform duration-700 ease-[cubic-bezier(0.5,0.5,0,1)]
                    bg-white w-[40%] h-0.25 absolute
                    ${isOpen
                        ? 'translate-y-0 -rotate-45'
                        : 'translate-y-1 hover:-translate-y-1'
                    }
                `} />
            </button>
        </div>
    );
});

export default ExpandingMenu;