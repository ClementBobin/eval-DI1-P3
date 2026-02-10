import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { RegisterData } from '@/types/auth'
import { Spinner } from '@/components/ui/spinner';

interface LoginProps {
    redirectTo?: string;
}

/**
 * Registration Form Component
 * 
 * A user registration form that validates input, handles form submission,
 * and integrates with the authentication system. After successful registration,
 * users are automatically logged in and redirected to the dashboard.
 * 
 * @example
 * // Usage in routing
 * <Route path="/login" element={<Login redirectTo="/home" />} />
 */
export function Login({ redirectTo = '/home' }: LoginProps ) {
  // ============================================
  // HOOKS & CONTEXT
  // ============================================
  
  const { register, isLoading: authIsLoading } = useAuth();
  const navigate = useNavigate();
  
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  // Local loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form field states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // ============================================
  // FORM HANDLERS
  // ============================================
  
  /**
   * Handle form input changes
   * 
   * Updates the corresponding form field state when user types
   * 
   * @param field - The form field name to update
   * @returns Event handler function
   */
  const handleInputChange = (field: keyof typeof formData) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value
      }));
    };
  
  /**
   * Reset all form fields to their initial empty state
   * 
   * Used after successful registration or when clearing the form
   */
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };
  
  // ============================================
  // VALIDATION FUNCTIONS
  // ============================================
  
  /**
   * Validate all form fields
   * 
   * Checks for:
   * 1. Required fields
   * 2. Valid email format
   * 3. Password match
   * 4. Minimum password length
   * 
   * @returns Array of error messages (empty if validation passes)
   */
  const validateForm = (): string[] => {
    const errors: string[] = [];
    const { firstName, lastName, email, password, confirmPassword } = formData;
    
    // Check required fields
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      errors.push('All fields are required');
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email.trim())) {
      errors.push('Please enter a valid email address');
    }
    
    // Validate password match
    if (password && password !== confirmPassword) {
      errors.push('Passwords do not match');
    }
    
    // Validate password strength
    if (password && password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }
    
    return errors;
  };
  
  /**
   * Prepare user data for registration
   * 
   * Trims whitespace and structures data for the API
   * 
   * @returns RegisterData object ready for submission
   */
  const prepareUserData = (): RegisterData => {
    return {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };
  };
  
  // ============================================
  // FORM SUBMISSION
  // ============================================
  
  /**
   * Handle form submission
   * 
   * 1. Prevents default form behavior
   * 2. Validates form data
   * 3. Submits to authentication API
   * 4. Handles success/error responses
   * 5. Redirects on success
   * 
   * @param event - Form submission event
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Step 1: Validate form data
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        validationErrors.forEach(error => toast.error(error));
        setIsSubmitting(false);
        return;
      }
      
      // Step 2: Prepare and submit data
      const userInfo = prepareUserData();
      const user = await register(userInfo);
      
      // Step 3: Handle success
      toast.success(`Welcome ${user.firstName}! Registration successful.`);
      resetForm();
      navigate(redirectTo);
      
    } catch (error: any) {
      // Step 4: Handle errors
      toast.error(error.message || 'Registration failed');
      
      // Clear password fields for security
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: '',
      }));
      
    } finally {
      // Step 5: Clean up
      setIsSubmitting(false);
    }
  };
  
  // ============================================
  // COMPUTED VALUES
  // ============================================
  
  // Combined loading state for better UX
  const isLoading = authIsLoading || isSubmitting;
  
  // ============================================
  // RENDER
  // ============================================
  
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <Card className="shadow-lg">
            
            {/* HEADER SECTION */}
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">
                Create Account
              </CardTitle>
              <CardDescription className="text-gray-600">
                Register to access the WitcherBoard
              </CardDescription>
            </CardHeader>
            
            {/* FORM FIELDS SECTION */}
            <CardContent className="space-y-6">
              
              {/* NAME FIELDS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="first-name"
                    name="first-name"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    required
                    disabled={isLoading}
                    autoComplete="given-name"
                    aria-describedby="first-name-help"
                  />
                  <p id="first-name-help" className="sr-only">
                    Enter your first name
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last-name">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="last-name"
                    name="last-name"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    required
                    disabled={isLoading}
                    autoComplete="family-name"
                    aria-describedby="last-name-help"
                  />
                  <p id="last-name-help" className="sr-only">
                    Enter your last name
                  </p>
                </div>
              </div>
              
              {/* EMAIL FIELD */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  aria-describedby="email-help"
                />
                <p id="email-help" className="text-xs text-gray-500">
                  We'll never share your email with anyone else.
                </p>
              </div>
              
              {/* PASSWORD FIELD */}
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                  aria-describedby="password-help"
                />
                <p id="password-help" className="text-xs text-gray-500">
                  Must be at least 6 characters long
                </p>
              </div>
              
              {/* CONFIRM PASSWORD FIELD */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                  aria-describedby="confirm-password-help"
                />
                <p id="confirm-password-help" className="text-xs text-gray-500">
                  Re-enter your password for verification
                </p>
              </div>
              
            </CardContent>
            
            {/* FOOTER SECTION */}
            <CardFooter className="flex flex-col space-y-4">
              
              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                className="w-full py-6 text-base font-medium"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner className="mr-2" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
              
              {/* TERMS NOTE */}
              <p className="text-xs text-gray-500 text-center">
                By registering, you agree to our{' '}
                <a className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
              
              {/* LOGIN LINK */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-blue-600 hover:underline font-medium"
                    disabled={isLoading}
                  >
                    Sign in here
                  </button>
                </p>
              </div>
              
            </CardFooter>
            
          </Card>
        </form>
      </div>
    </div>
  );
}