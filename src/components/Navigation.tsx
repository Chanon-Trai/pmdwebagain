'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const hoverStyle = { color: 'oklch(0.75 0.183 55.934)' };
  const defaultStyle = { color: 'inherit' };
  const [isIsoOpen, setIsIsoOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            ฝ่ายบำรุงรักษาระบบไฟฟ้า - PMD
          </Link>
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className="text-gray-700 dark:text-gray-300 transition-colors" 
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)} 
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, defaultStyle)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 dark:text-gray-300 transition-colors" 
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)} 
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, defaultStyle)}
            >
              About
            </Link>
            <div 
              className="relative"
              onMouseEnter={() => setIsIsoOpen(true)}
              onMouseLeave={() => setIsIsoOpen(false)}
            >
              <button
                className="text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1"
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)} 
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, defaultStyle)}
              >
                ISO
                <svg 
                  className={`w-4 h-4 transition-transform ${isIsoOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isIsoOpen && (
                <div className="absolute top-full left-0 pt-2 w-56">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                  <Link
                    href="/iso45001"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, { color: 'oklch(0.75 0.183 55.934)' })} 
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, { color: '' })}
                  >
                    ISO 45001
                  </Link>
                  <Link
                    href="/iso9001"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, { color: 'oklch(0.75 0.183 55.934)' })} 
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, { color: '' })}
                  >
                    ISO 9001
                  </Link>
                  <a
                    href="http://pmdweb/images/RiskManage/%E0%B8%84%E0%B8%B9%E0%B9%88%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%87_%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%A2%E0%B9%88%E0%B8%AD_%E0%B8%81%E0%B8%8464.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, { color: 'oklch(0.75 0.183 55.934)' })} 
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, { color: '' })}
                  >
                    <span aria-hidden="true">📘</span> คู่มือการบริหารความเสี่ยง
                  </a>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/emergency-plan"
              className="text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1"
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, defaultStyle)}
            >
              <span aria-hidden="true">⚠️</span> แผนฉุกเฉิน
            </Link>
            <a
              href="https://app.powerbi.com/view?r=eyJrIjoiZDMyYTk0NWYtYzA1YS00ZTZjLWE1N2ItMDdiMTc4YjkxYWQ1IiwidCI6ImZlYmM0NDkwLTY2MjEtNGJkNy1iZmI1LTZmMDkyZjhiN2ZhYyIsImMiOjEwfQ%3D%3D&pageName=27aac719ac01c08bdd58"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1"
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, defaultStyle)}
            >
              <span aria-hidden="true">🚀</span> MEA GO ฝบร.
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}


