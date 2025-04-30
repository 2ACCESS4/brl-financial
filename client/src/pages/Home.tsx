import { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import TrustAndSecuritySection from '../components/TrustAndSecuritySection';
import { Shield, Lock, Globe, ChevronRight, Check, TrendingUp, Users, Rocket, Award, BarChart4, Sparkles, BadgeDollarSign, PiggyBank, ChevronDown, ArrowUpRight } from 'lucide-react';

const Home = () => {
  // Set page title
  useEffect(() => {
    document.title = "BRL Financial - Login to Your Account";
  }, []);
  
  const [visitCount] = useState(1422);
  
  const makeDefaultHomepage = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Your browser may prevent this action due to security settings. To make this your homepage, use your browser's settings menu.");
  };
  
  const stats = [
    { label: "Years Experience", value: "18+" },
    { label: "Clients Served", value: "10K+" },
    { label: "Financial Products", value: "150+" },
    { label: "Client Satisfaction", value: "98%" }
  ];
  
  const features = [
    { 
      icon: <Shield className="h-6 w-6 text-white" />, 
      title: "Secure Protection", 
      description: "Advanced security protocols to protect your financial assets and information." 
    },
    { 
      icon: <TrendingUp className="h-6 w-6 text-white" />, 
      title: "Instant Access", 
      description: "Fast, hassle-free account setup and turnkey solutions." 
    },
    { 
      icon: <Users className="h-6 w-6 text-white" />, 
      title: "Expert Support", 
      description: "Dedicated team of financial professionals to support your needs." 
    }
  ];
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-white to-green-50">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute top-1/2 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute -bottom-16 right-1/3 w-72 h-72 bg-green-100/30 rounded-full blur-3xl opacity-40"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-12 h-12 rounded-full border-4 border-primary/10 animate-pulse opacity-30"></div>
          <div className="absolute bottom-32 left-16 w-8 h-8 rounded-lg bg-secondary/10 rotate-12 animate-bounce opacity-40"></div>
          <div className="absolute top-1/3 left-1/3 w-6 h-6 rounded-full bg-green-200/20 animate-ping"></div>
        </div>
        
        {/* Background wave pattern */}
        <img 
          src="/images/wave-pattern.svg"
          alt=""
          className="absolute bottom-0 left-0 w-full opacity-70"
          aria-hidden="true"
        />
        
        <div className="container pt-12 lg:pt-20 pb-20 lg:pb-28 relative">
          {/* Highlight sparkle decorations */}
          <div className="absolute top-12 right-1/4">
            <Sparkles className="h-6 w-6 text-yellow-400/70 animate-pulse" />
          </div>
          <div className="absolute bottom-16 left-1/3">
            <BadgeDollarSign className="h-8 w-8 text-primary/30 animate-bounce" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex gap-3 mb-4 animate-fadeIn">
                <div className="brl-badge secondary">
                  <Sparkles className="h-3 w-3 mr-1" /> Trusted Financial Solutions
                </div>
                <div className="brl-badge shine">Since 1996</div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-4 animate-fadeIn">
                Premium Financial <span className="relative">
                  <span className="relative z-10 text-primary">Solutions</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 rounded-full -z-10"></span>
                </span> for Your Future
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 animate-fadeIn">
                Accelerate your agency's success with our user-friendly, high-tech finance platform!
              </p>
              
              {/* Feature Quick Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 animate-fadeIn">
                <div className="flex items-center p-3 rounded-lg border border-primary/10 bg-primary/5 shadow-sm">
                  <div className="rounded-full w-8 h-8 bg-white shadow-sm flex items-center justify-center mr-3">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Real-time Analytics</span>
                </div>
                <div className="flex items-center p-3 rounded-lg border border-primary/10 bg-primary/5 shadow-sm">
                  <div className="rounded-full w-8 h-8 bg-white shadow-sm flex items-center justify-center mr-3">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Enterprise Security</span>
                </div>
              </div>
              
              <div className="brl-notice warning mb-6 flex items-start gap-3 text-left animate-fadeIn">
                <Lock className="h-5 w-5 mt-0.5 flex-shrink-0 text-amber-700" />
                <div>
                  <p className="text-sm font-semibold mb-1 text-amber-800">NOTICE TO ALL USERS:</p>
                  <p className="text-sm text-amber-700">
                    This site contains confidential information. Access is restricted to authorized persons ONLY.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 mb-8 animate-fadeIn">
                <a 
                  href="#features"
                  className="flex items-center justify-center gap-2 text-white font-medium px-6 py-3 bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                >
                  <span>Learn More</span>
                  <ChevronDown className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  onClick={makeDefaultHomepage}
                  className="flex items-center justify-center gap-2 text-primary font-medium px-6 py-3 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Make Homepage
                </a>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative animate-fadeIn">
              {/* Highlight bubble */}
              <div className="absolute -top-5 -right-5 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-yellow-200 animate-pulse">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Premium Features
                </span>
              </div>
              
              <div className="relative">
                <img 
                  src="/images/financial-hero.svg"
                  alt="Financial Growth Illustration"
                  className="w-full max-w-lg mx-auto relative z-10"
                />
                
                {/* Decorative gradient circle behind the image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-green-50 via-primary/5 to-blue-50 blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div id="features" className="bg-gradient-to-r from-gray-50 via-white to-gray-50 py-16 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-12 right-10 w-8 h-8 border-4 border-primary/10 rounded-full animate-ping opacity-20"></div>
        <div className="absolute bottom-12 left-10 w-6 h-6 bg-green-100/40 rounded-lg animate-bounce opacity-30"></div>
        
        <div className="container">
          <div className="text-center mb-10">
            <div className="flex justify-center">
              <div className="brl-badge shine inline-flex items-center">
                <BarChart4 className="h-3.5 w-3.5 mr-1.5" />
                Key Performance Indicators
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-2">Trusted By Thousands</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Our track record speaks for itself through these impressive statistics
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="relative overflow-hidden rounded-2xl bg-white border border-primary/10 shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1"
                style={{animationDelay: `${index * 100}ms`}}
              >
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    {index === 0 && <Award className="h-6 w-6 text-primary" />}
                    {index === 1 && <Users className="h-6 w-6 text-primary" />}
                    {index === 2 && <PiggyBank className="h-6 w-6 text-primary" />}
                    {index === 3 && <BadgeDollarSign className="h-6 w-6 text-primary" />}
                  </div>
                  
                  <div className="text-2xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                  
                  {/* Decorative underline */}
                  <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto mt-3"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a href="#" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
              <span>Learn more about our achievements</span>
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Trust and Security Section */}
      <TrustAndSecuritySection />
      
      {/* Features Section */}
      <div className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-yellow-200 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-primary/10 rounded-full animate-bounce opacity-40"></div>
        
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-full mb-4 shadow-sm border border-primary/10">
              <Sparkles className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Our Premium Services</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-700">
              Comprehensive Financial Services
            </h2>
            
            <p className="text-gray-600 text-lg">
              We provide a wide range of financial services designed to help you achieve your goals with confidence and security.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="bg-white rounded-2xl overflow-visible group shadow-lg border border-primary/10 hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="relative">
                  {/* Feature icon */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  
                  {/* Card top decorative area */}
                  <div className="h-16 bg-primary/5 rounded-t-2xl"></div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                    <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">{feature.description}</p>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm text-gray-600">Premium Support</span>
                      </div>
                      
                      <a href="#" className="text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium">
                        Learn more
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 flex flex-col items-center justify-center">
            <div className="bg-white rounded-2xl border border-primary/10 shadow-xl p-6 max-w-2xl mx-auto relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Rocket className="h-8 w-8 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-center mb-3">Ready to Get Started?</h3>
                <p className="text-gray-600 text-center mb-6">
                  Join thousands of satisfied clients who trust BRL Financial for all their financial needs.
                </p>
                
                <div className="flex justify-center">
                  <a href="#" className="inline-flex items-center justify-center gap-2 bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-md">
                    <span>Contact Our Team</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Other sections removed, since we now have the TrustAndSecuritySection above */}
    </Layout>
  );
};

export default Home;