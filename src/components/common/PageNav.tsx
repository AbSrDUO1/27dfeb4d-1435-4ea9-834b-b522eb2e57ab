'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Home } from 'lucide-react';

interface PageNavProps {
  position?: 'top' | 'bottom';
}

export const PageNav = ({ position = 'top' }: PageNavProps = {}) => {
  const router = useRouter();

  return (
    <div className={`fixed ${position === 'bottom' ? 'bottom-6' : 'top-6'} left-6 flex gap-3 z-50`}>
      <button
        onClick={() => router.back()}
        className="relative cursor-pointer white-button white-button-rounded rounded h-10 aspect-square flex items-center justify-center"
        aria-label="Go back"
      >
        <ChevronLeft className="h-[35%] w-auto aspect-square" />
      </button>
      <Link href="/components">
        <button
          className="relative cursor-pointer white-button white-button-rounded rounded h-10 aspect-square flex items-center justify-center"
          aria-label="Go to components"
        >
          <Home className="h-[35%] w-auto aspect-square" />
        </button>
      </Link>
    </div>
  );
};