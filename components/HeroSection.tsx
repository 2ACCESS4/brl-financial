import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Briefcase, PiggyBank } from 'lucide-react';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Hero image with overlay - smaller to match original site */}
      <div className="relative h-[400px] md:h-[450px] w-full">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" 
            alt="Financial planning" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
          
          {/* Modern geometric shapes overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-[10%] right-[15%] w-40 h-40 rounded-full border-4 border-white"></div>
            <div className="absolute bottom-[20%] left-[10%] w-20 h-20 rounded-full border-2 border-white"></div>
            <div className="absolute top-[30%] left-[20%] w-32 h-32 rounded-full border border-white"></div>
          </div>
        </div>
        
        <div className="container relative z-10 h-full flex flex-col justify-center items-center text-center text-white pt-4">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-inter font-bold text-3xl md:text-4xl mb-2">
              <span className="text-white">Welcome to</span>
            </h1>
            <h2 className="font-bold text-3xl md:text-5xl mb-4" style={{ 
              color: '#00853E', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              marginTop: '-5px',
              letterSpacing: '0.5px'
            }}>
              BRL FINANCIAL GROUP
            </h2>
            <p className="text-sm md:text-base mb-6 text-white/90 max-w-xl mx-auto leading-relaxed">
              Providing personalized wealth management solutions to help you achieve your financial goals and secure your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                size="default" 
                onClick={() => scrollToSection('#contact')}
                className="font-medium bg-primary hover:bg-primary/90 text-white group relative overflow-hidden shadow-lg"
              >
                <span className="relative z-10">Schedule a Consultation</span>
                <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
              <Button 
                variant="outline" 
                size="default"
                onClick={() => scrollToSection('#services')}
                className="font-medium border-white text-white hover:bg-white/10 transition-all duration-300"
              >
                Learn More 
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
            
            {/* Stats display */}
            <motion.div 
              className="flex justify-center gap-6 md:gap-10 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {[
                { value: "25+", label: "Years Experience" },
                { value: "1000+", label: "Clients Served" },
                { value: "$800M+", label: "Assets Managed" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl md:text-2xl font-bold" style={{ color: '#00853E' }}>{stat.value}</div>
                  <div className="text-xs text-white/80">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Feature boxes below hero - more modern with icons */}
      <div className="bg-white py-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Wealth Management",
                description: "Customized investment strategies designed to help you achieve your financial goals.",
                action: "#services",
                icon: <BarChart3 className="h-8 w-8 text-primary/80" />
              },
              {
                title: "Retirement Planning",
                description: "Strategic planning to help ensure you can enjoy the retirement lifestyle you desire.",
                action: "#services",
                icon: <PiggyBank className="h-8 w-8 text-primary/80" />
              },
              {
                title: "Estate Planning",
                description: "Comprehensive strategies to help you preserve and transfer your wealth.",
                action: "#services",
                icon: <Briefcase className="h-8 w-8 text-primary/80" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
              >
                <div className="flex items-start mb-3">
                  <div className="mr-3 p-2 bg-primary/5 rounded-md">{item.icon}</div>
                  <h3 className="font-inter font-semibold text-base text-primary">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{item.description}</p>
                <a 
                  href={item.action}
                  className="text-primary text-xs font-medium flex items-center animated-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.action);
                  }}
                >
                  Learn More 
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;