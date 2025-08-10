import React from 'react';
import styles from '@/styles/page.module.scss';

/**
 * SVG sprite definitions for the medieval theme
 * Extracted from main component for better organization
 */
export function SvgSprites(): React.JSX.Element {
  return (
    <svg className={styles.svgSprite} aria-hidden="true">
      {/* Resource Icons */}
      <symbol id="ic-gold" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#ffd700"/>
        <path fill="#b8860b" d="M12 6v12M8 12h8"/>
      </symbol>
      <symbol id="ic-wood" viewBox="0 0 24 24">
        <path fill="#8B4513" d="M10 4h4v16h-4z"/>
        <path fill="#228B22" d="M8 2h8l-2 4H10z"/>
      </symbol>
      <symbol id="ic-stone" viewBox="0 0 24 24">
        <path fill="#696969" d="M4 8h16v8H4z"/>
        <path fill="#808080" d="M6 6h12v2H6z"/>
        <path fill="#A9A9A9" d="M8 4h8v2H8z"/>
      </symbol>
      <symbol id="ic-food" viewBox="0 0 24 24">
        <path fill="#FFD700" d="M7 2h2v9a3 3 0 1 1-2 0V2zm10 0h2v7h-2zM15 2h2v7h-2z"/>
      </symbol>
      <symbol id="ic-prestige" viewBox="0 0 24 24">
        <path fill="#C0C0C0" d="M12 2l3 9h-6l3-9z"/>
        <rect x="8" y="12" width="8" height="8" fill="#C0C0C0"/>
        <circle cx="12" cy="16" r="2" fill="#FFD700"/>
      </symbol>
      
      {/* Building Icons */}
      <symbol id="ic-woodcutter" viewBox="0 0 24 24">
        <path fill="#8B4513" d="M4 20h16V8l-5-3-5 3v5H4z"/>
        <path fill="#696969" d="M10 6h4v2h-4z"/>
        <path fill="#FFD700" d="M11 8h2v4h-2z"/>
      </symbol>
      <symbol id="ic-quarry" viewBox="0 0 24 24">
        <path fill="#696969" d="M4 8h16v12H4z"/>
        <path fill="#808080" d="M6 6h12v2H6z"/>
        <path fill="#A9A9A9" d="M8 4h8v2H8z"/>
        <path fill="#FFD700" d="M10 10h4v2h-4z"/>
      </symbol>
      <symbol id="ic-farm" viewBox="0 0 24 24">
        <path fill="#228B22" d="M4 20h16V8l-5-3-5 3v5H4z"/>
        <path fill="#FFD700" d="M8 12h8v2H8z"/>
        <path fill="#FFD700" d="M10 15h4v2h-4z"/>
      </symbol>
      <symbol id="ic-blacksmith" viewBox="0 0 24 24">
        <path fill="#696969" d="M4 20h16V8l-5-3-5 3v5H4z"/>
        <path fill="#FF4500" d="M8 12h8v4H8z"/>
        <path fill="#FFD700" d="M10 6h4v2h-4z"/>
      </symbol>
      <symbol id="ic-castle" viewBox="0 0 24 24">
        <path fill="#C0C0C0" d="M4 20h16V8l-5-3-5 3v5H4z"/>
        <path fill="#FFD700" d="M8 4h8v4H8z"/>
        <path fill="#C0C0C0" d="M10 2h4v2h-4z"/>
        <path fill="#696969" d="M6 16h12v2H6z"/>
      </symbol>
    </svg>
  );
} 