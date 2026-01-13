'use client';

import { useState } from 'react';

interface Link {
  label: string;
  url: string;
  onClick?: () => void;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  links: Link[];
  maxVisibleLinks?: number;
}

export default function FeatureCard({ 
  title, 
  description, 
  icon, 
  links,
  maxVisibleLinks = 4 
}: FeatureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreLinks = links.length > maxVisibleLinks;
  const visibleLinks = isExpanded ? links : links.slice(0, maxVisibleLinks);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-xl transition-shadow flex flex-col">
      <div
        className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl"
        style={{ backgroundColor: 'oklch(0.75 0.183 55.934)' }}
      >
        <span>{icon}</span>
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 flex-1 mb-4">{description}</p>
      <div className="mt-2 space-y-2">
        {visibleLinks.map((link) => (
          link.onClick ? (
            <button
              key={link.label}
              onClick={link.onClick}
              className="flex items-center text-sm font-semibold hover:opacity-80 transition-opacity text-left w-full"
              style={{ color: 'oklch(0.75 0.183 55.934)' }}
            >
              {link.label}
              <span className="ml-2" aria-hidden="true">
                ↗
              </span>
            </button>
          ) : (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ color: 'oklch(0.75 0.183 55.934)' }}
            >
              {link.label}
              <span className="ml-2" aria-hidden="true">
                ↗
              </span>
            </a>
          )
        ))}
      </div>
      {hasMoreLinks && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm font-semibold hover:opacity-80 transition-opacity text-left"
          style={{ color: 'grey' }}
        >
          {isExpanded ? 'แสดงน้อยลง ↑' : `แสดงเพิ่มเติม (${links.length - maxVisibleLinks}) ↓`}
        </button>
      )}
    </div>
  );
}

