import { Link } from 'wouter';
import Logo from './Logo';
import { Facebook, Twitter, Linkedin, MapPin, Phone, Mail, Clock, Shield, ChevronRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-tr from-primary/5 to-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-bl from-secondary/5 to-secondary/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-xl"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-10">
          <div className="lg:col-span-4">
            <Logo className="mb-4 transform scale-90 origin-left" />
            <p className="text-sm text-gray-600 mb-6 max-w-sm">
              Providing comprehensive financial services to help you achieve your financial goals with confidence and security.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-medium text-base mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Legal', path: '/legal' },
                { name: 'Privacy', path: '/privacy' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>
                    <a className="text-gray-600 hover:text-primary flex items-center group">
                      <ChevronRight className="h-3.5 w-3.5 mr-1.5 text-primary/70 group-hover:translate-x-0.5 transition-transform" />
                      <span>{item.name}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="font-medium text-base mb-4 text-gray-800">Services</h4>
            <div className="grid grid-cols-1 gap-x-6 gap-y-2.5">
              {[
                'Financial Planning',
                'Investment Management',
                'Retirement Planning',
                'Estate Planning',
                'Insurance Solutions'
              ].map((service) => (
                <div key={service} className="flex items-center">
                  <Shield className="h-3.5 w-3.5 mr-2 text-primary/70" />
                  <span className="text-gray-600">{service}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="font-medium text-base mb-4 text-gray-800">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span className="text-gray-600 text-sm">123 Financial District<br/>New York, NY 10004</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-primary mr-2 h-4 w-4 flex-shrink-0" />
                <span className="text-gray-600 text-sm">561-200-6004</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-primary mr-2 h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@brlfinancial.com" className="text-gray-600 text-sm hover:text-primary">
                  info@brlfinancial.com
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Monday-Friday: 9AM-5PM<br/>Saturday-Sunday: Closed</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center py-4">
            <p className="text-gray-500 text-sm mb-3 md:mb-0">
              &copy; {currentYear} BRL Financial Corp. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/legal">
                <a className="text-gray-500 hover:text-primary text-sm transition-colors">
                  Terms of Service
                </a>
              </Link>
              <Link href="/privacy">
                <a className="text-gray-500 hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </a>
              </Link>
              <a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors">
                Sitemap
              </a>
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-400 pb-4">
            Powered by Advanced Insurance Systems, Inc. | BRL Financial provides tools designed specifically for insurance professionals.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
