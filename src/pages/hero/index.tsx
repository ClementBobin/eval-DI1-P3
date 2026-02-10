/**
 * Hero/Landing Page Component
 * 
 * This is the main landing page that showcases the Witcher Contracts application.
 * It provides an overview of features and encourages users to get started.
 */

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Sword, ScrollText, Users, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import './hero.css';

/**
 * Hero Page Component
 * 
 * Displays a professional landing page with:
 * - Hero section with call-to-action
 * - Feature showcase
 * - Statistics
 * - Getting started section
 */
export const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  /**
   * Navigate to the appropriate page based on authentication status
   */
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/contracts');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="hero-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Shield className="hero-badge-icon" />
            <span>Professional Monster Hunting Platform</span>
          </div>
          
          <h1 className="hero-title">
            Witcher Contracts
            <span className="hero-title-accent">Management System</span>
          </h1>
          
          <p className="hero-description">
            The ultimate platform for witchers to discover, manage, and complete monster hunting contracts. 
            Track your progress, claim rewards, and build your reputation as a professional monster slayer.
          </p>

          <div className="hero-actions">
            <Button 
              onClick={handleGetStarted}
              className="hero-cta-primary"
            >
              {isAuthenticated ? 'View Contracts' : 'Get Started'}
              <ArrowRight className="button-icon" />
            </Button>
            
            {!isAuthenticated && (
              <Link to="/login">
                <Button variant="outline" className="hero-cta-secondary">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Statistics */}
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">500+</div>
              <div className="hero-stat-label">Contracts Completed</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">50+</div>
              <div className="hero-stat-label">Active Witchers</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">98%</div>
              <div className="hero-stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-header">
          <h2 className="features-title">Everything You Need</h2>
          <p className="features-subtitle">
            Powerful features to help you manage contracts efficiently
          </p>
        </div>

        <div className="features-grid">
          {/* Feature 1: Browse Contracts */}
          <div className="feature-card">
            <div className="feature-icon feature-icon-primary">
              <ScrollText />
            </div>
            <h3 className="feature-title">Browse Contracts</h3>
            <p className="feature-description">
              Access a comprehensive database of monster hunting contracts. Filter by status, 
              difficulty, and location to find the perfect job for your skills.
            </p>
          </div>

          {/* Feature 2: Manage Assignments */}
          <div className="feature-card">
            <div className="feature-icon feature-icon-success">
              <Users />
            </div>
            <h3 className="feature-title">Manage Assignments</h3>
            <p className="feature-description">
              Assign yourself to contracts, track your progress, and collaborate with other 
              witchers. Keep all your active jobs organized in one place.
            </p>
          </div>

          {/* Feature 3: Track Progress */}
          <div className="feature-card">
            <div className="feature-icon feature-icon-warning">
              <CheckCircle2 />
            </div>
            <h3 className="feature-title">Track Progress</h3>
            <p className="feature-description">
              Monitor contract status in real-time. Mark contracts as completed and maintain 
              a detailed history of your successful hunts.
            </p>
          </div>

          {/* Feature 4: Professional Tools */}
          <div className="feature-card">
            <div className="feature-icon feature-icon-info">
              <Sword />
            </div>
            <h3 className="feature-title">Professional Tools</h3>
            <p className="feature-description">
              Access detailed contract information, monster descriptions, recommended preparations, 
              and estimated rewards before accepting any job.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="how-it-works-content">
          <h2 className="how-it-works-title">How It Works</h2>
          
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Sign In</h3>
                <p className="step-description">
                  Create your witcher profile or sign in to access the contract board
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Browse Contracts</h3>
                <p className="step-description">
                  Explore available contracts and find jobs that match your expertise
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Accept & Complete</h3>
                <p className="step-description">
                  Assign yourself to a contract, complete the hunt, and claim your reward
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3 className="step-title">Build Reputation</h3>
                <p className="step-description">
                  Complete contracts successfully to build your reputation and access better jobs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Hunting?</h2>
          <p className="cta-description">
            Join our community of professional witchers and start managing your contracts today.
          </p>
          <Button 
            onClick={handleGetStarted}
            className="cta-button"
          >
            {isAuthenticated ? 'Go to Contracts' : 'Get Started Now'}
            <ArrowRight className="button-icon" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="hero-footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2024 Witcher Contracts Management System. Built for professional monster hunters.
          </p>
        </div>
      </footer>
    </div>
  );
};
