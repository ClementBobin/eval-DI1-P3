import { useState, useRef, useEffect } from 'react';
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
import './login.css';

/**
 * Login Component Props
 * 
 * Configuration options for customizing the registration form behavior
 */
interface LoginProps {
    /**
     * Redirect path after successful registration
     * Defaults to '/home' if not specified
     */
    redirectTo?: string;
    
    /**
     * Show login link for existing users
     * Defaults to true
     */
    showLoginLink?: boolean;
    
    /**
     * Custom title for the registration form
     */
    title?: string;
    
    /**
     * Custom description for the registration form
     */
    description?: string;
}

/**
 * Login (Registration) Form Component
 * 
 * A comprehensive user registration form with validation, error handling,
 * and integration with the authentication system. After successful registration,
 * users are automatically logged in and redirected.
 * 
 * @example
 * // Basic usage in routing
 * <Route path="/register" element={<Login />} />
 * 
 * // With custom redirect
 * <Route path="/signup" element={<Login redirectTo="/dashboard" />} />
 * 
 * // With custom title and no login link
 * <Route path="/join" element={
 *   <Login 
 *     title="Join Our Community" 
 *     description="Create your account to get started"
 *     showLoginLink={false}
 *   />
 * } />
 */
export function Login({ 
    redirectTo = '/home', 
    showLoginLink = true,
    title = "Create Account",
    description = "Register to access the WitcherBoard"
}: LoginProps) {
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
    
    // Form validation errors
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    
    // ============================================
    // REFS
    // ============================================
    
    // Auto-focus on first input
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    
    // ============================================
    // EFFECTS
    // ============================================
    
    /**
     * Auto-focus the first input field on component mount
     * Improves accessibility and user experience
     */
    useEffect(() => {
        if (firstNameInputRef.current) {
            firstNameInputRef.current.focus();
        }
    }, []);
    
    // ============================================
    // FORM HANDLERS
    // ============================================
    
    /**
     * Handle form input changes with validation
     * 
     * Updates the corresponding form field state and validates
     * the specific field in real-time
     * 
     * @param field - The form field name to update
     * @returns Event handler function
     */
    const handleInputChange = (field: keyof typeof formData) => 
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            
            // Update form data
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
            
            // Clear field error when user starts typing
            if (fieldErrors[field]) {
                setFieldErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[field];
                    return newErrors;
                });
            }
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
        setFieldErrors({});
    };
    
    // ============================================
    // VALIDATION FUNCTIONS
    // ============================================
    
    /**
     * Validate individual form field
     * 
     * Performs specific validation for each field type
     * 
     * @param field - Field name to validate
     * @param value - Field value to validate
     * @returns Error message or empty string if valid
     */
    const validateField = (field: string, value: string): string => {
        switch (field) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) {
                    return 'This field is required';
                }
                if (value.length > 50) {
                    return 'Cannot exceed 50 characters';
                }
                return '';
                
            case 'email':
                if (!value.trim()) {
                    return 'Email is required';
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value.trim())) {
                    return 'Please enter a valid email address';
                }
                return '';
                
            case 'password':
                if (!value) {
                    return 'Password is required';
                }
                if (value.length < 6) {
                    return 'Password must be at least 6 characters long';
                }
                return '';
                
            case 'confirmPassword':
                if (!value) {
                    return 'Please confirm your password';
                }
                if (value !== formData.password) {
                    return 'Passwords do not match';
                }
                return '';
                
            default:
                return '';
        }
    };
    
    /**
     * Validate all form fields
     * 
     * Checks all fields and returns array of error messages
     * Updates fieldErrors state for individual field highlighting
     * 
     * @returns Array of error messages (empty if validation passes)
     */
    const validateForm = (): string[] => {
        const errors: string[] = [];
        const newFieldErrors: Record<string, string> = {};
        
        // Validate each field
        Object.entries(formData).forEach(([field, value]) => {
            const error = validateField(field, value);
            if (error) {
                errors.push(error);
                newFieldErrors[field] = error;
            }
        });
        
        // Update field errors state
        setFieldErrors(newFieldErrors);
        
        return errors;
    };
    
    /**
     * Prepare user data for registration
     * 
     * Trims whitespace, validates, and structures data for the API
     * 
     * @returns RegisterData object ready for submission
     * @throws Error if validation fails
     */
    const prepareUserData = (): RegisterData => {
        const validationErrors = validateForm();
        
        if (validationErrors.length > 0) {
            throw new Error(validationErrors[0]);
        }
        
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
     * Complete registration flow with validation, API call,
     * and appropriate user feedback
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
            const errorMessage = error.message || 'Registration failed. Please try again.';
            toast.error(errorMessage);
            
            // Clear password fields for security
            setFormData(prev => ({
                ...prev,
                password: '',
                confirmPassword: '',
            }));
            
            // Scroll to top of form on error
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } finally {
            // Step 5: Clean up
            setIsSubmitting(false);
        }
    };
    
    // ============================================
    // HELPER FUNCTIONS
    // ============================================
    
    /**
     * Navigate to login page
     * 
     * Provides alternative navigation for existing users
     */
    const navigateToLogin = () => {
        navigate('/login');
    };
    
    // ============================================
    // COMPUTED VALUES
    // ============================================
    
    // Combined loading state for better UX
    const isLoading = authIsLoading || isSubmitting;
    
    // Form completion percentage (for progress indication)
    const formCompletion = () => {
        const totalFields = Object.keys(formData).length;
        const filledFields = Object.values(formData).filter(value => 
            typeof value === 'string' && value.trim().length > 0
        ).length;
        return Math.round((filledFields / totalFields) * 100);
    };
    
    // ============================================
    // RENDER
    // ============================================
    
    return (
        <div 
            className="login-registration-page"
            role="main"
            aria-labelledby="registration-title"
        >
            <div className="login-registration-container">
                <form 
                    onSubmit={handleSubmit}
                    className="login-registration-form"
                    noValidate
                >
                    <Card className="login-card">
                        {/* HEADER SECTION */}
                        <CardHeader className="login-card-header">
                            <CardTitle 
                                className="login-title"
                                id="registration-title"
                            >
                                {title}
                            </CardTitle>
                            <CardDescription className="login-description">
                                {description}
                            </CardDescription>
                        </CardHeader>
                        
                        {/* FORM FIELDS SECTION */}
                        <CardContent className="login-card-content">
                            {/* NAME FIELDS */}
                            <div className="name-fields-container">
                                <div className="form-field-group">
                                    <Label 
                                        htmlFor="first-name"
                                        className={`form-label ${fieldErrors.firstName ? 'error' : ''}`}
                                    >
                                        First Name <span className="required-indicator">*</span>
                                    </Label>
                                    <Input
                                        ref={firstNameInputRef}
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
                                        aria-invalid={!!fieldErrors.firstName}
                                        aria-required="true"
                                        className={fieldErrors.firstName ? 'error' : ''}
                                    />
                                    {fieldErrors.firstName && (
                                        <p 
                                            id="first-name-error" 
                                            className="field-error-message"
                                            role="alert"
                                        >
                                            {fieldErrors.firstName}
                                        </p>
                                    )}
                                    <p id="first-name-help" className="field-help-text">
                                        Enter your first name as it appears on official documents
                                    </p>
                                </div>
                                
                                <div className="form-field-group">
                                    <Label 
                                        htmlFor="last-name"
                                        className={`form-label ${fieldErrors.lastName ? 'error' : ''}`}
                                    >
                                        Last Name <span className="required-indicator">*</span>
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
                                        aria-invalid={!!fieldErrors.lastName}
                                        aria-required="true"
                                        className={fieldErrors.lastName ? 'error' : ''}
                                    />
                                    {fieldErrors.lastName && (
                                        <p 
                                            id="last-name-error" 
                                            className="field-error-message"
                                            role="alert"
                                        >
                                            {fieldErrors.lastName}
                                        </p>
                                    )}
                                    <p id="last-name-help" className="field-help-text">
                                        Enter your last name
                                    </p>
                                </div>
                            </div>
                            
                            {/* EMAIL FIELD */}
                            <div className="form-field-group">
                                <Label 
                                    htmlFor="email"
                                    className={`form-label ${fieldErrors.email ? 'error' : ''}`}
                                >
                                    Email Address <span className="required-indicator">*</span>
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
                                    aria-invalid={!!fieldErrors.email}
                                    aria-required="true"
                                    className={fieldErrors.email ? 'error' : ''}
                                />
                                {fieldErrors.email && (
                                    <p 
                                        id="email-error" 
                                        className="field-error-message"
                                        role="alert"
                                    >
                                        {fieldErrors.email}
                                    </p>
                                )}
                                <p id="email-help" className="field-help-text">
                                    We'll never share your email with anyone else
                                </p>
                            </div>
                            
                            {/* PASSWORD FIELD */}
                            <div className="form-field-group">
                                <Label 
                                    htmlFor="password"
                                    className={`form-label ${fieldErrors.password ? 'error' : ''}`}
                                >
                                    Password <span className="required-indicator">*</span>
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
                                    aria-invalid={!!fieldErrors.password}
                                    aria-required="true"
                                    className={fieldErrors.password ? 'error' : ''}
                                />
                                {fieldErrors.password && (
                                    <p 
                                        id="password-error" 
                                        className="field-error-message"
                                        role="alert"
                                    >
                                        {fieldErrors.password}
                                    </p>
                                )}
                                <p id="password-help" className="field-help-text">
                                    Must be at least 6 characters long
                                </p>
                            </div>
                            
                            {/* CONFIRM PASSWORD FIELD */}
                            <div className="form-field-group">
                                <Label 
                                    htmlFor="confirm-password"
                                    className={`form-label ${fieldErrors.confirmPassword ? 'error' : ''}`}
                                >
                                    Confirm Password <span className="required-indicator">*</span>
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
                                    aria-invalid={!!fieldErrors.confirmPassword}
                                    aria-required="true"
                                    className={fieldErrors.confirmPassword ? 'error' : ''}
                                />
                                {fieldErrors.confirmPassword && (
                                    <p 
                                        id="confirm-password-error" 
                                        className="field-error-message"
                                        role="alert"
                                    >
                                        {fieldErrors.confirmPassword}
                                    </p>
                                )}
                                <p id="confirm-password-help" className="field-help-text">
                                    Re-enter your password for verification
                                </p>
                            </div>
                        </CardContent>
                        
                        {/* FOOTER SECTION */}
                        <CardFooter className="login-card-footer">
                            {/* FORM PROGRESS INDICATOR (Optional) */}
                            <div className="form-progress" aria-hidden="true">
                                <div 
                                    className="form-progress-bar"
                                    style={{ width: `${formCompletion()}%` }}
                                />
                            </div>
                            
                            {/* SUBMIT BUTTON */}
                            <Button
                                type="submit"
                                className="submit-button"
                                disabled={isLoading}
                                aria-busy={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner className="button-spinner" />
                                        <span className="button-loading-text">
                                            Creating Account...
                                        </span>
                                    </>
                                ) : (
                                    <span className="button-text">
                                        Create Account
                                    </span>
                                )}
                            </Button>
                            
                            {/* TERMS NOTE */}
                            <p className="terms-notice">
                                By registering, you agree to our{' '}
                                <a 
                                    href="/terms" 
                                    className="terms-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a 
                                    href="/privacy" 
                                    className="terms-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Privacy Policy
                                </a>
                                .
                            </p>
                            
                            {/* LOGIN LINK */}
                            {showLoginLink && (
                                <div className="login-link-container">
                                    <p className="login-link-text">
                                        Already have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={navigateToLogin}
                                            className="login-link-button"
                                            disabled={isLoading}
                                            aria-label="Sign in to existing account"
                                        >
                                            Sign in here
                                        </button>
                                    </p>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    );
}