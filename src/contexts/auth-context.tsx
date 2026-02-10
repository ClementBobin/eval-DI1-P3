import { createContext, useContext, useState, type ReactNode } from 'react';
import type { RegisterData, User } from '@/types/auth';

/**
 * Authentication Context Type
 * 
 * This interface defines all the properties and methods
 * available through the authentication context.
 */
interface AuthContextType {
  /**
   * Boolean indicating whether a user is currently authenticated
   * True when a user has registered and is "logged in"
   */
  isAuthenticated: boolean;
  
  /**
   * Boolean indicating if an authentication operation is in progress
   * Useful for showing loading states during registration
   */
  isLoading: boolean;
  
  /**
   * The currently authenticated user object
   * Contains user information (email, role, name)
   */
  user: User | null;
  
  /**
   * Register a new user
   * 
   * This function creates a new user account, validates uniqueness,
   * saves the user to localStorage, and automatically "logs them in"
   * 
   * @param userData - The registration data including name, email, password
   * @returns Promise<User> - The created user object
   * @throws Error - If user already exists or validation fails
   */
  register: (userData: RegisterData) => Promise<User>;
  
  /**
   * Logout the current user
   * 
   * Clears the current user from localStorage and authentication state
   * Returns the user to an unauthenticated state
   */
  logout: () => void;
}

/**
 * Create the authentication context with undefined default value
 * This ensures TypeScript will catch usage outside of AuthProvider
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to access authentication context
 * 
 * Provides easy access to authentication state and methods
 * Must be used within an AuthProvider component
 * 
 * @returns AuthContextType - The authentication context value
 * @throws Error - If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Storage keys for localStorage
 * 
 * These keys are used to store and retrieve user data
 * from the browser's localStorage API
 */
const CURRENT_USER_KEY = 'current_user';    // Stores the currently active user
const USERS_STORAGE_KEY = 'users';          // Stores all registered users

/**
 * Extended user interface for storage
 * 
 * Includes additional metadata not exposed to the UI
 */
interface StoredUser extends RegisterData {
  id: string;           // Unique identifier for the user
  createdAt: string;    // Timestamp when the user was created
}

/**
 * Retrieve all stored users from localStorage
 * 
 * @returns StoredUser[] - Array of all registered users
 */
const getStoredUsers = (): StoredUser[] => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

/**
 * Save users array to localStorage
 * 
 * @param users - Array of users to save
 */
const saveStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

/**
 * Retrieve the current user from localStorage
 * 
 * @returns User | null - The currently authenticated user or null
 */
const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

/**
 * Save or remove the current user from localStorage
 * 
 * @param user - User object to save, or null to remove
 */
const saveCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

/**
 * Props for the AuthProvider component
 */
interface AuthProviderProps {
  children: ReactNode;  // React children to be wrapped by the provider
}

/**
 * Authentication Provider Component
 * 
 * This component wraps the application and provides authentication
 * state and methods to all child components through React Context.
 * 
 * Features:
 * - Manages authentication state
 * - Persists users in localStorage
 * - Provides registration and logout functionality
 * - Auto-logs in users on page reload
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  /**
   * State Management
   */
  
  // Current user state, initialized from localStorage
  const [user, setUser] = useState<User | null>(() => getCurrentUser());
  
  // Loading state for async operations
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  /**
   * Derived Authentication State
   * 
   * User is considered authenticated if we have a user object
   * This is derived from the user state for consistency
   */
  const isAuthenticated = !!user;

  /**
   * Register a new user
   * 
   * This function handles the complete user registration flow:
   * 1. Validates email uniqueness
   * 2. Creates a new user with metadata
   * 3. Saves to localStorage
   * 4. Automatically logs the user in
   * 
   * @param userData - User registration data
   * @returns Promise<User> - The created user object
   */
  const register = async (userData: RegisterData): Promise<User> => {
    setIsLoading(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // 1. Get existing users
      const users = getStoredUsers();
      
      // 2. Check for existing user with same email
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // 3. Create new user with metadata
      const newUser: StoredUser = {
        ...userData,
        // Generate a unique ID using timestamp and random string
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        role: userData.role || 'User', // Default role if not specified
      };
      
      // 4. Save user to storage
      users.push(newUser);
      saveStoredUsers(users);
      
      // 5. Create response object (exclude sensitive data)
      const userResponse: User = {
        email: newUser.email,
        role: newUser.role || 'User',
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      };
      
      // 6. Save as current user and update state (auto-login)
      saveCurrentUser(userResponse);
      setUser(userResponse);
      
      setIsLoading(false);
      return userResponse;
      
    } catch (error) {
      setIsLoading(false);
      // Re-throw error for component handling
      throw error;
    }
  };

  /**
   * Logout the current user
   * 
   * Clears the current user from state and localStorage
   * Effectively ends the user's session
   */
  const logout = () => {
    saveCurrentUser(null);
    setUser(null);
  };

  /**
   * Context Value
   * 
   * All authentication state and methods exposed to consumers
   */
  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    register,
    logout,
  };

  /**
   * Render Provider
   * 
   * Wrap children with the authentication context provider
   */
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};