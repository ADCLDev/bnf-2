'use client'
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, ChevronDown, Menu, X } from "lucide-react";
import CartPopup from "../reuseable/CartPopUp";

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const dropdownLinks = [
    { href: "/profile", label: "Profile" },
    { href: "/contributor-dashboard", label: "Contributor Dashboard" },
    { href: "/admin-dashboard", label: "Admin Dashboard" },
    { href: "/subscription-dashboard", label: "Subscription Dashboard" },
  ];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/faqs", label: "FAQs" },
  ];

  // Handle clicks outside the dropdown and mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b relative z-50 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold text-red-500">
            জিফন্ট ফন্টস
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-red-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Cart */}
            <div className="hidden sm:block">
              <CartPopup />
            </div>

            {/* User Menu */}
            {isLoggedIn ? (
              <div ref={dropdownRef} className="relative flex items-center space-x-1">
                <Link href="/welcome">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                  </div>
                </Link>
                
                <button
                  onClick={toggleDropdown}
                  className="p-1 md:p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 md:w-56 bg-white rounded-lg shadow-lg py-1 border">
                    {dropdownLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:block bg-red-500 text-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-red-600 transition-colors"
              >
                Get Started
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg"
          >
            <div className="container mx-auto px-4 py-2">
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-2 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-500 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Mobile Cart */}
                <div className="sm:hidden px-4 py-2">
                  <CartPopup />
                </div>

                {/* Mobile Get Started Button */}
                {!isLoggedIn && (
                  <Link
                    href="/login"
                    className="sm:hidden px-4 py-2 text-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;