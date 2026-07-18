'use client';
import { useState } from 'react';
import { useLang } from '../../context/LangContext';
import styles from './TechStack.module.css';

// functional vector icons optimized for both dark & light themes
const ICONS = {
  React: (
    <svg viewBox="-11.5 -10.2 23 20.4" width="100%" height="100%">
      <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  NextJS: (
    <svg viewBox="0 0 180 180" width="100%" height="100%" fill="none">
      <circle cx="90" cy="90" r="90" fill="currentColor" />
      <path d="M149.5 157.5L69.1 54H54v71.9h12V71.7l71.5 91.8c4.4-1.7 8.4-3.7 12-6z" fill="url(#nextGrad)" />
      <rect x="115" y="54" width="12" height="72" fill="url(#nextGrad2)" />
      <defs>
        <linearGradient id="nextGrad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nextGrad2" x1="121" y1="54" x2="120.8" y2="106.9" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <rect width="100" height="100" fill="#3178c6" rx="12"/>
      <path d="M38 70h-8V38h8v32zm27.8-21.7c-2-1.4-4.8-2-8-2-3.5 0-6.1.8-8 2.5-1.8 1.6-2.8 4.1-2.8 7.3s.9 5.5 2.8 7.2c1.9 1.7 4.5 2.5 8 2.5 3.2 0 6-.6 8-2v-5.5h-8v-6h14.5v13.5c-3 2.5-8.3 4.2-14.5 4.2-6.5 0-11.8-1.8-15.5-5.5C39 63.3 37 58.1 37 51.5c0-6.5 2-11.7 5.8-15.5 3.8-3.8 9.2-5.5 16.2-5.5 6 0 11.2 1.5 14.5 4l-5.7 5.8z" fill="white"/>
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 25c-8.5 0-14 4.5-16.5 13.5 3.8-5 8.2-6.8 13.2-5.3 2.8.8 4.9 2.9 7.1 5.2s4.8 5.1 10.4 5.1c8.5 0 14-4.5 16.5-13.5-3.8 5-8.2 6.8-13.2 5.3-2.8-.8-4.9-2.9-7.1-5.2S65.5 25 50 25zM25 50c-8.5 0-14 4.5-16.5 13.5 3.8-5 8.2-6.8 13.2-5.3 2.8.8 4.9 2.9 7.1 5.2s4.8 5.1 10.4 5.1c8.5 0 14-4.5 16.5-13.5-3.8 5-8.2 6.8-13.2 5.3-2.8-.8-4.9-2.9-7.1-5.2S40.5 50 25 50z" fill="#38bdf8"/>
    </svg>
  ),
  Vue: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,15 90,85 75,85 50,41 25,85 10,85" fill="#41b883"/>
      <polygon points="50,15 75,85 62,85 50,62 38,85 25,85" fill="#35495e"/>
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M25 25c0-6.9 5.6-12.5 12.5-12.5S50 18.1 50 25v12.5H37.5C30.6 37.5 25 31.9 25 25z" fill="#f24e1e"/>
      <path d="M25 50c0-6.9 5.6-12.5 12.5-12.5H50V50c0 6.9-5.6 12.5-12.5 12.5S25 56.9 25 50z" fill="#a259ff"/>
      <path d="M25 75c0-6.9 5.6-12.5 12.5-12.5H50V75c0 6.9-5.6 12.5-12.5 12.5S25 81.9 25 75z" fill="#1abc9c"/>
      <path d="M50 25c0-6.9 5.6-12.5 12.5-12.5S75 18.1 75 25s-5.6 12.5-12.5 12.5H50V25z" fill="#ff7262"/>
      <circle cx="62.5" cy="50" r="12.5" fill="#1abc9c"/>
    </svg>
  ),
  NodeJS: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 10l35 20v40L50 90 15 70V30L50 10z" fill="none" stroke="#68a063" strokeWidth="6" strokeLinejoin="round"/>
      <path d="M50 22L75 36.5v29L50 80 25 65.5v-29L50 22z" fill="#68a063"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 10C27.9 10 28.5 28.9 28.5 28.9h8.8s-.3-10.2 11.2-10.2c11.5 0 11.5 8.8 11.5 8.8h17s4.1-.1 4.1 19.3c0 19.4-15.6 18.2-15.6 18.2h-6.2v-8.8s.2-11.2-11.2-11.2H32c-11.4 0-16.7 10-16.7 18s4 18 16.7 18h6.2V83s-.6 8.8 21.8 8.8c22.4 0 21.8-18.9 21.8-18.9h-8.8s.3 10.2-11.2 10.2c-11.5 0-11.5-8.8-11.5-8.8h-17s-4.1.1-4.1-19.3c0-19.4 15.6-18.2 15.6-18.2h6.2v8.8s-.2 11.2 11.2 11.2H68c11.4 0 16.7-10 16.7-18s-4-18-16.7-18h-6.2V17s.6-8.8-21.8-8.8z" fill="#3776ab"/>
    </svg>
  ),
  Express: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" />
      <path d="M30 40h12L32 60h12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="65" cy="50" r="8" fill="currentColor" />
    </svg>
  ),
  FastAPI: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <rect width="100" height="100" fill="#059669" rx="12"/>
      <path d="M55 15L25 55h20L35 85l35-45H50l5-25z" fill="white"/>
    </svg>
  ),
  GraphQL: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 15L15 35v30l35 20 35-20V35L50 15zm0 8l28 16v32L50 87 22 71V39l28-16z" fill="#e10098"/>
      <circle cx="50" cy="15" r="7" fill="#e10098"/>
      <circle cx="15" cy="35" r="7" fill="#e10098"/>
      <circle cx="15" cy="65" r="7" fill="#e10098"/>
      <circle cx="50" cy="85" r="7" fill="#e10098"/>
      <circle cx="85" cy="65" r="7" fill="#e10098"/>
      <circle cx="85" cy="35" r="7" fill="#e10098"/>
      <path d="M50 25L24 40v20l26 15 26-15V40L50 25z" fill="none" stroke="#e10098" strokeWidth="3"/>
    </svg>
  ),
  RestAPI: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
      <rect x="15" y="15" width="70" height="70" rx="12" strokeWidth="6" />
      <path d="M30 40h24M30 60h40M30 50h30" />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 10c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40-17.9-40-40-40zm14 47.5c-1 1.7-2.6 3-4.5 3.5v11.5c0 1.4-1.1 2.5-2.5 2.5h-5c-1.4 0-2.5-1.1-2.5-2.5V61c-1.9-.5-3.5-1.8-4.5-3.5-1.2-2-1.5-4.5-.7-6.8l.2-.5c.4-1.1 1.2-2.1 2.2-2.7l3-1.8c.9-.5 2-.8 3-.8h10c1.1 0 2.1.3 3 .8l3 1.8c1 .6 1.8 1.6 2.2 2.7l.2.5c.8 2.3.5 4.8-.7 6.8zM41.5 30h17c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5h-17c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5z" fill="#336791"/>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 10c-1.1 0-2.1.6-2.6 1.5C40 25 35 40 35 55c0 13.8 6.7 25 15 25s15-11.2 15-25c0-15-5-30-12.4-43.5-.5-.9-1.5-1.5-2.6-1.5z" fill="#47a248"/>
      <path d="M50 10c.1 0 .2.1.3.1V80c-8.3 0-15-11.2-15-25 0-15 5-30 12.4-43.5.5-.9 1.5-1.5 2.6-1.5z" fill="#3f3f3f" opacity="0.15" />
      <path d="M50 80v10c0 1.1-.9 2-2 2h4c1.1 0 2-.9 2-2V80" fill="#47a248"/>
    </svg>
  ),
  Redis: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 10L15 28l35 18 35-18L50 10z" fill="#d82c20"/>
      <path d="M15 42l35 18 35-18v10L50 70 15 52V42z" fill="#a31f16"/>
      <path d="M15 62l35 18 35-18v10L50 90 15 72V62z" fill="#d82c20"/>
    </svg>
  ),
  Supabase: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M55 10L25 52h22L35 90l40-42H53l12-38z" fill="#3ecf8e"/>
    </svg>
  ),
  Prisma: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
      <path d="M50 10L15 45v20l35 25 35-25V45L50 10z" fill="#0c344b"/>
      <path d="M50 10L15 45l35 25 35-25-35-35z" fill="#2d3748" opacity="0.3"/>
      <path d="M50 10v60L85 45 50 10z" fill="#16a394"/>
    </svg>
  ),
  Firebase: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M18.5 75.8l10.3-64.4c.3-1.8 2.2-2.8 3.7-1.8L50 21.3l-31.5 54.5z" fill="#ffca28"/>
      <path d="M81.5 75.8L71.2 11.4c-.3-1.8-2.2-2.8-3.7-1.8L50 21.3l31.5 54.5z" fill="#ffa000"/>
      <path d="M18.5 75.8l31.5-54.5 10.3 35.4c.5 1.8-1.5 3.3-2.9 2.1L18.5 75.8z" fill="#f57c00"/>
      <path d="M18.5 75.8H81.5L50 95 18.5 75.8z" fill="#ff7043"/>
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="14" y="46" width="14" height="12" fill="#2496ed"/>
      <rect x="30" y="46" width="14" height="12" fill="#2496ed"/>
      <rect x="46" y="46" width="14" height="12" fill="#2496ed"/>
      <rect x="30" y="32" width="14" height="12" fill="#2496ed"/>
      <rect x="46" y="32" width="14" height="12" fill="#2496ed"/>
      <rect x="46" y="18" width="14" height="12" fill="#2496ed"/>
      <path d="M10 58c0 16 14 27 33 27 24 0 40-11 47-30 8 .5 14-4 14-4s-6-8-16-6c-2-14-14-19-14-19s-6 8-4 17c-2 1-6 2-11 2H10v13z" fill="#2496ed"/>
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M92.6 46.3L53.7 7.4a6.8 6.8 0 0 0-9.6 0l-9.6 9.6 12.2 12.2a8.1 8.1 0 0 1 10.2 7.7 8.1 8.1 0 0 1-8.1 8.1c-.9 0-1.8-.2-2.6-.5v20.9c1.4.4 2.6 1.1 3.6 2.1a8.1 8.1 0 1 1-13.7 6.1V52.2a8.1 8.1 0 0 1-4.3-10.7L20.5 30.2 7.4 43.3a6.8 6.8 0 0 0 0 9.6l38.9 38.9a6.8 6.8 0 0 0 9.6 0l36.7-36.7a6.8 6.8 0 0 0 0-9.6z" fill="#f05033"/>
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 8C26.8 8 8 26.8 8 50c0 18.6 12 34.3 28.7 39.9 2.1.4 2.9-.9 2.9-2 0-1-.1-4.3-.1-7.8-11.7 2.1-14.7-2.9-15.6-5.6-.5-1.3-2.8-5.6-4.8-6.7-1.6-.9-4-3.1-.1-3.2 3.7-.1 6.4 3.5 7.3 4.9 4.3 7.1 11 5.1 13.7 3.9.4-3.1 1.7-5.1 3-6.3-10.6-1.2-21.7-5.3-21.7-23.3 0-5.1 1.8-9.4 4.8-12.6-.5-1.2-2.1-6 .5-12.6 0 0 3.9-1.3 12.9 4.9 3.7-1 7.7-1.6 11.7-1.6s8 .6 11.7 1.6c9-6.1 12.9-4.9 12.9-4.9 2.6 6.6 1 11.4.5 12.6 3 3.2 4.8 7.4 4.8 12.6 0 18-11.1 22-21.7 23.3 1.7 1.5 3.2 4.4 3.2 8.9 0 6.4-.1 11.6-.1 13.2 0 1.1.8 2.4 2.9 2 16.6-5.7 28.6-21.4 28.6-40C92 26.8 73.2 8 50 8z" fill="#181717"/>
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M28 46c0 1.3.1 2.4.4 3.2.3.8.7 1.7 1.3 2.7.2.3.3.6.3.9 0 .4-.2.7-.7 1.1l-2.3 1.5c-.3.2-.6.3-.9.3-.4 0-.7-.2-1.1-.5-.5-.6-1-1.2-1.4-1.8-.4-.6-.8-1.4-1.2-2.2-3.1 3.6-6.9 5.4-11.5 5.4-3.3 0-5.9-.9-7.8-2.8-1.9-1.9-2.9-4.4-2.9-7.5 0-3.3 1.2-6 3.5-7.9 2.3-2 5.4-3 9.4-3 1.3 0 2.6.1 4 .3 1.4.2 2.9.5 4.4.9v-2.6c0-3.1-.6-5.3-1.9-6.5-1.3-1.2-3.5-1.8-6.7-1.8-1.4 0-2.9.2-4.4.5-1.5.3-3 .8-4.4 1.4-.7.3-1.2.5-1.4.6-.3.1-.5.1-.6.1-.5 0-.8-.4-.8-1.2v-1.9c0-.6.1-1 .2-1.3.2-.3.5-.5 1-.8 1.4-.7 3.1-1.3 5.1-1.8 2-.5 4.1-.7 6.3-.7 4.8 0 8.3 1.1 10.6 3.3 2.2 2.2 3.4 5.5 3.4 10v13.2h.1zm-15.9 6c1.3 0 2.6-.2 4-.7 1.4-.5 2.6-1.4 3.7-2.6.6-.7 1.1-1.6 1.4-2.5.3-1 .4-2.1.4-3.5v-1.7c-1.1-.3-2.3-.5-3.6-.6-1.3-.1-2.5-.2-3.7-.2-2.6 0-4.6.5-5.9 1.6-1.3 1.1-1.9 2.6-1.9 4.6 0 1.9.5 3.3 1.5 4.2 1 1 2.4 1.4 4.1 1.4zm31.5 4.3c-.7 0-1.1-.1-1.4-.4-.3-.2-.5-.7-.7-1.4l-8-26.4c-.2-.7-.3-1.2-.3-1.4 0-.6.3-.9.9-.9h3.7c.7 0 1.2.1 1.4.4.3.2.5.7.6 1.4l5.8 22.7 5.3-22.7c.2-.7.4-1.2.6-1.4.3-.2.8-.4 1.4-.4h3c.7 0 1.2.1 1.4.4.3.2.5.7.6 1.4l5.4 23 5.9-23c.2-.7.4-1.2.6-1.4.3-.2.8-.4 1.4-.4h3.5c.6 0 .9.3.9.9 0 .2 0 .4-.1.6-.1.2-.1.5-.3.9l-8.2 26.4c-.2.7-.4 1.2-.7 1.4-.3.2-.8.4-1.4.4h-3.2c-.7 0-1.2-.1-1.4-.4-.3-.3-.5-.7-.6-1.4l-5.3-22-5.2 22c-.2.7-.4 1.2-.6 1.4-.3.3-.8.4-1.4.4h-3.2zm50.3 1.1c-2.1 0-4.2-.2-6.2-.7-2-.5-3.5-1-4.6-1.6-.7-.4-1.1-.8-1.3-1.2-.2-.4-.3-.8-.3-1.2v-2c0-.8.3-1.2.9-1.2.2 0 .5.1.7.2.3.1.6.3 1 .5 1.4.6 2.9 1.1 4.4 1.4 1.6.3 3.1.5 4.7.5 2.5 0 4.4-.4 5.7-1.3 1.3-.9 2-2.1 2-3.7 0-1.1-.4-2-1.1-2.7-.7-.7-2.1-1.4-4.1-2l-5.9-1.8c-3-.9-5.2-2.3-6.5-4.1-1.3-1.8-2-3.8-2-6 0-1.7.4-3.3 1.1-4.6.7-1.3 1.7-2.5 2.9-3.4 1.2-1 2.6-1.7 4.3-2.2 1.7-.5 3.4-.7 5.3-.7.9 0 1.9.1 2.8.2 1 .1 1.9.3 2.7.5.8.2 1.6.4 2.3.7.7.3 1.2.5 1.6.8.5.3.9.6 1.1 1 .2.3.3.7.3 1.2v1.9c0 .8-.3 1.2-.9 1.2-.3 0-.8-.2-1.4-.5-2.1-1-4.5-1.4-7.1-1.4-2.3 0-4.1.4-5.3 1.1-1.2.7-1.9 1.9-1.9 3.5 0 1.1.4 2 1.2 2.8.8.7 2.3 1.5 4.5 2.2l5.8 1.8c2.9.9 5 2.2 6.2 3.9 1.2 1.7 1.9 3.6 1.9 5.8 0 1.8-.4 3.4-1.1 4.8-.7 1.4-1.7 2.6-3 3.6-1.3 1-2.8 1.8-4.5 2.3-1.8.6-3.7.9-5.8.9z" fill="#ff9900"/>
      <path d="M89.9 76.2c-10.6 7.8-26 12-39.3 12-18.6 0-35.3-6.9-48-18.3-1-.9-.1-2.1 1.1-1.4 13.8 8 30.8 12.8 48.4 12.8 11.9 0 24.9-2.5 36.9-7.6 1.8-.8 3.3 1.2 1.9 2.5z" fill="#ff9900"/>
      <path d="M94.4 71c-1.4-1.8-9-.8-12.5-.4-1 .1-1.2-.8-.3-1.4 6.1-4.3 16.1-3 17.3-1.6 1.2 1.4-.3 11.5-6 16.3-.9.8-1.7.4-1.3-.6 1.3-3.2 4.2-10.4 2.8-12.3z" fill="#ff9900"/>
    </svg>
  ),
  Kubernetes: (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50 8l38 27.6-14.5 44.6H26.5L12 35.6z" fill="#326ce5"/>
      <circle cx="50" cy="50" r="15" fill="white"/>
      <path d="M50 42l-6 4 2 7h8l2-7z" fill="#326ce5"/>
    </svg>
  ),
};

// Category keys stay in English — they're internal lookup keys, not display
// text. The visible tab label comes from t.techStack.tabs[key] at render
// time, so this object never needs to change when a new language is added.
const CATEGORIES = {
  frontend: [
    { name: 'React', iconKey: 'React' },
    { name: 'Next.js', iconKey: 'NextJS' },
    { name: 'TypeScript', iconKey: 'TypeScript' },
    { name: 'Tailwind', iconKey: 'Tailwind' },
    { name: 'Vue.js', iconKey: 'Vue' },
    { name: 'Figma', iconKey: 'Figma' },
  ],
  backend: [
    { name: 'Node.js', iconKey: 'NodeJS' },
    { name: 'Python', iconKey: 'Python' },
    { name: 'Express', iconKey: 'Express' },
    { name: 'FastAPI', iconKey: 'FastAPI' },
    { name: 'GraphQL', iconKey: 'GraphQL' },
    { name: 'REST APIs', iconKey: 'RestAPI' },
    { name: 'PostgreSQL', iconKey: 'PostgreSQL' },
    { name: 'MongoDB', iconKey: 'MongoDB' },
    { name: 'Redis', iconKey: 'Redis' },
    { name: 'Supabase', iconKey: 'Supabase' },
    { name: 'Prisma', iconKey: 'Prisma' },
    { name: 'Firebase', iconKey: 'Firebase' },
  ],
  devops: [
    { name: 'Docker', iconKey: 'Docker' },
    { name: 'Git', iconKey: 'Git' },
    { name: 'GitHub Actions', iconKey: 'GitHub' },
    { name: 'AWS', iconKey: 'AWS' },
    { name: 'Kubernetes', iconKey: 'Kubernetes' },
  ],
};

const CATEGORY_KEYS = Object.keys(CATEGORIES); // ['frontend', 'backend', 'devops']

export default function TechStack() {
  const { t } = useLang();
  const techStack = t?.techStack || {};
  const tabLabels = techStack.tabs || {};
  const [active, setActive] = useState('frontend');

  return (
    <section className="section section--muted" id="tech-stack">
      <div className="container">
        <div className="section-header--center">
          <span className="tag-badge">{techStack.badge}</span>
          <h2 className={`display-lg ${styles.headline}`}>
            {techStack.title}
          </h2>
          <p className="body-lg">
            {techStack.subTitle}
          </p>
        </div>

        {/* ── Tabs Container (Touch scroll friendly wrapper) ── */}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabs}>
            {CATEGORY_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`${styles.tab} ${active === key ? styles.tabActive : ''}`}
              >
                {tabLabels[key]}
              </button>
            ))}
          </div>
        </div>

        {/* ── Dynamic Badge Grid ── */}
        <div className={styles.badgeGrid} key={active}>
          {CATEGORIES[active].map((tech) => (
            <div key={tech.name} className={styles.techBadge}>
              <span className={styles.techIcon}>
                {ICONS[tech.iconKey]}
              </span>
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}