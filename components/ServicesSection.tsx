import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { 
  PieChart,
  Coins,
  Umbrella,
  Home,
  Building,
  Building2,
  Briefcase,
  LineChart,
  Landmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: 'Wealth Management',
    description: 'Comprehensive wealth management services that integrate investment strategies, tax planning, retirement planning, and estate planning.',
    features: [
      'Investment portfolio construction and monitoring',
      'Risk management strategy development',
      'Regular portfolio reviews and rebalancing',
      'Tax-efficient investing strategies'
    ]
  },
  {
    icon: <PieChart className="h-6 w-6" />,
    title: 'Financial Planning',
    description: 'Personalized financial planning that addresses your entire financial picture and helps you achieve your life goals.',
    features: [
      'Goal-based financial planning',
      'Cash flow analysis and budgeting',
      'Education funding strategies',
      'Debt management solutions'
    ]
  },
  {
    icon: <Home className="h-6 w-6" />,
    title: 'Retirement Planning',
    description: 'Strategic retirement planning to help ensure you can enjoy the lifestyle you desire with confidence throughout your retirement years.',
    features: [
      'Retirement income strategies',
      'Social Security optimization',
      '401(k) and IRA management',
      'Pension analysis and maximization'
    ]
  },
  {
    icon: <Building className="h-6 w-6" />,
    title: 'Estate Planning',
    description: 'Comprehensive estate planning strategies to help you preserve and transfer your wealth according to your wishes.',
    features: [
      'Wealth transfer strategies',
      'Trust services and administration',
      'Charitable giving solutions',
      'Legacy planning guidance'
    ]
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: 'Investment Management',
    description: 'Customized investment strategies designed to help you achieve your financial goals with an appropriate level of risk.',
    features: [
      'Asset allocation strategies',
      'Investment selection and monitoring',
      'Portfolio diversification',
      'Performance reporting and analysis'
    ]
  },
  {
    icon: <Landmark className="h-6 w-6" />,
    title: 'Business Services',
    description: 'Financial strategies and solutions for business owners, from succession planning to employee benefits.',
    features: [
      'Business succession planning',
      'Key employee retention strategies',
      'Executive compensation planning',
      'Business valuation guidance'
    ]
  }
];

const ServicesSection = () => {
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-inter font-bold text-3xl md:text-4xl text-primary mb-4">Our Services</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">
            We offer a comprehensive suite of financial services tailored to your unique needs and goals.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-lg shadow-sm overflow-hidden h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mr-3">
                    {service.icon}
                  </div>
                  <h3 className="font-inter font-semibold text-xl text-primary">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start">
                      <span className="text-primary mr-2 mt-1">•</span>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto p-4 pt-0">
                <Button
                  variant="link"
                  onClick={scrollToContact}
                  className="text-primary font-medium p-0 h-auto hover:no-underline"
                >
                  Learn More 
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-16 bg-primary text-white p-8 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-inter font-semibold text-2xl mb-4">Ready to Take Control of Your Financial Future?</h3>
          <p className="text-white/90 mb-6 max-w-3xl mx-auto">
            Schedule a complimentary consultation with one of our financial advisors to learn how we can help you achieve your financial goals.
          </p>
          <Button 
            onClick={scrollToContact}
            variant="secondary"
            size="lg"
            className="font-medium bg-white text-primary hover:bg-white/90"
          >
            Schedule a Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
