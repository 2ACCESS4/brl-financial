import { motion } from 'framer-motion';
import { 
  FileText, 
  BarChart4, 
  CalendarDays, 
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ResourcesSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const resources = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Market Insights',
      description: 'Stay informed with our quarterly market reviews and investment insights.',
      action: '#'
    },
    {
      icon: <BarChart4 className="h-8 w-8" />,
      title: 'Financial Calculators',
      description: 'Use our suite of financial calculators to help plan for your future.',
      action: '#'
    },
    {
      icon: <CalendarDays className="h-8 w-8" />,
      title: 'Economic Calendar',
      description: 'Keep track of important economic events that may impact your investments.',
      action: '#'
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Educational Materials',
      description: 'Browse our library of articles, videos, and guides on various financial topics.',
      action: '#'
    }
  ];
  
  return (
    <section id="resources" className="py-16 bg-white">
      <div className="container">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
        >
          <h2 className="font-inter font-bold text-3xl md:text-4xl text-primary mb-4">Resources</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">
            Access our collection of resources designed to help you make informed financial decisions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              variants={fadeInUp}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto mb-6">
                    {resource.icon}
                  </div>
                  <h3 className="font-inter font-semibold text-xl text-primary mb-3 text-center">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    {resource.description}
                  </p>
                  <div className="text-center">
                    <Button variant="link" className="text-primary">
                      View Resource
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="bg-gray-50 p-8 rounded-lg shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-inter font-semibold text-2xl text-primary mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-600 mb-6">
                Stay up-to-date with our latest market insights, financial tips, and company news by subscribing to our monthly newsletter.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 border border-gray-300 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                />
                <Button className="whitespace-nowrap">
                  Subscribe Now
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Market analysis charts"
                className="rounded-lg shadow-md max-h-64 object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesSection;