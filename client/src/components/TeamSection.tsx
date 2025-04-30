import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: 'John Anderson',
    title: 'CEO & Senior Financial Advisor',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    bio: 'With over 25 years of experience in financial services, John leads our team with expertise in investment management and retirement planning.'
  },
  {
    name: 'Sarah Johnson',
    title: 'Senior Financial Planner',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    bio: 'Sarah specializes in comprehensive financial planning, helping clients navigate complex financial decisions with confidence and clarity.'
  },
  {
    name: 'Michael Rodriguez',
    title: 'Investment Strategist',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    bio: 'Michael brings expert knowledge in portfolio management and investment strategies tailored to each client\'s unique risk tolerance and goals.'
  }
];

const TeamSection = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section id="team" className="section-padding bg-white">
      <div className="container">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Our experienced team of financial professionals is dedicated to helping you achieve your financial goals.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="overflow-hidden h-full">
                <div className="h-72 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-inter font-semibold text-xl text-primary mb-1">{member.name}</h3>
                  <p className="text-secondary mb-4">{member.title}</p>
                  <p className="text-muted-foreground mb-4">
                    {member.bio}
                  </p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button 
            onClick={scrollToAbout}
            className="inline-block text-secondary hover:text-secondary-dark font-medium"
          >
            Learn More About Our Team
            <span className="ml-2">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
