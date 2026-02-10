/**
 * Witcher Interface
 * 
 * Represents a witcher character in the system.
 */
export interface Witcher {
  id: number;
  name: string;
  avatar: string;
  school?: string;
  skills?: string[];
}