import { ReactNode } from 'react';
import Header from './Header';
import SiteStatistics from './SiteStatistics';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* We moved SiteStatistics to be inside the TrustAndSecuritySection */}
      
      <main className="flex-1 bg-white">
        <div className="container py-4">
          {children}
        </div>
      </main>
      
      <footer className="footer py-6 bg-gray-100">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              <a 
                href="/about-us" 
                className="text-sm text-gray-700 hover:text-primary animated-link"
              >
                About Us
              </a>
              <span className="text-gray-400">|</span>
              <a 
                href="/contact" 
                className="text-sm text-gray-700 hover:text-primary animated-link"
              >
                Contact
              </a>
              <span className="text-gray-400">|</span>
              <a href="/legal" className="text-sm text-gray-700 hover:text-primary animated-link">Legal</a>
              <span className="text-gray-400">|</span>
              <a href="/privacy" className="text-sm text-gray-700 hover:text-primary animated-link">Privacy</a>
              <span className="text-gray-400">|</span>
              <a href="/system-requirements" className="text-sm text-gray-700 hover:text-primary animated-link">System Requirements</a>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} BRL Financial Group. All Rights Reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Phone: 561-200-6004 | Email: info@brlfinancial.com
              </p>
              <p className="text-[9px] text-gray-400 mt-2">
                Powered by Advanced Insurance Systems, Inc.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;