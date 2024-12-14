// TypeScript interface for Script object structure
export interface Script {
    title: string;          // Script name
    description: string;    // Short description for cards
    price: number;         // Price in TL (0 for free scripts)
    image: string;         // Path to script preview image
    isFree: boolean;       // Indicates if script is free
    features?: string[];   // List of script features
    longDescription?: string; // Detailed description for script detail page
    demoUrl?: string;      // Demo site URL if available
    version?: string;      // Current version number
    lastUpdate?: string;   // Last update date
    requirements?: string[]; // System requirements
    rating?: number;       // Average user rating (0-5)
    downloads?: number;    // Number of downloads
  }
  
  // TypeScript interface for Comment object structure
  export interface Comment {
    id: number;           // Unique comment ID
    userName: string;     // Commenter's name
    rating: number;       // User rating (0-5)
    comment: string;      // Comment text
    date: string;        // Comment date
    avatar?: string;     // Optional user avatar URL
  }
  
  // Sample comment data
  export const comments: Comment[] = [
    // ... comment data ...
  ];
  
  // Sample script data
  export const scripts: Script[] = [
    // ... script data ...
  ];
  
  // Featured scripts shown on homepage (first 3 scripts)
  export const featuredScripts = scripts.slice(0, 3);