import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-inter font-bold text-3xl md:text-4xl mb-6">Ready to Secure Your Financial Future?</h2>
          <p className="text-lg mb-8 text-white/90">
            Schedule a free consultation with one of our experienced financial advisors and take the first step toward financial confidence.
          </p>
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="bg-accent hover:bg-accent/90 text-lg font-medium"
          >
            Book Your Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
