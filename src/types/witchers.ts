/**
 * Witcher Interface
 * 
 * Represents a witcher character in the system.
 */
export interface Witcher {
  /** Unique identifier for the witcher */
  id: number;
  
  /** Witcher's name */
  name: string;
  
  /** URL or path to witcher's avatar image */
  avatar: string;
  
  /** Witcher school (optional) - e.g., "Wolf", "Cat", "Bear" */
  school?: string;
  
  /** List of witcher's skills (optional) */
  skills?: string[];
}