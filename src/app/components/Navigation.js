'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/95 border-b border-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white">
              <span className="text-blue-500">X</span>Automation
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md transition-colors">
              Home
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md transition-colors">
              Contact Us
            </Link>
            <Link href="/testimonials" className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md transition-colors">
              Testimonials
            </Link>
            <Link href="/signin" className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Sign Up
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          <div className="flex flex-col space-y-2">
            <Link href="/" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 px-3 py-2 rounded-md">
              Contact Us
            </Link>
            <Link href="/testimonials" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 px-3 py-2 rounded-md">
              Testimonials
            </Link>
            <Link href="/signin" className="text-gray-600 dark:text-gray-200 hover:text-blue-500 px-3 py-2 rounded-md">
              Sign In
            </Link>
            <Link href="/signup" className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md text-center">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 