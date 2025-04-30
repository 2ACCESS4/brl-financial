import { motion } from 'framer-motion';
import { 
  Handshake, 
  TrendingUp, 
  Shield,
  Award,
  Users,
  Check
} from 'lucide-react';

const AboutSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };
  
  return (
    <section id="about" className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <motion.div 
          className="max-w-xl mx-auto text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
        >
          <h2 className="font-inter font-bold text-2xl md:text-3xl mb-3" style={{ color: '#00853E', textShadow: '1px 1px 1px rgba(0,0,0,0.1)' }}>
            About BRL FINANCIAL GROUP
          </h2>
          <div className="h-1 w-20 mx-auto mb-4 bg-gradient-to-r from-primary/40 to-primary"></div>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            BRL Financial is an independent wealth management firm dedicated to helping our clients achieve their financial goals through personalized service and expert guidance.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="order-2 lg:order-1">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={scaleIn}
            >
              <h3 className="font-inter font-semibold text-lg mb-3" style={{ color: '#00853E' }}>Our Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Our mission at BRL Financial is to provide comprehensive financial planning and investment management services that help our clients build, manage, protect, and transition their wealth according to their unique goals and values.
              </p>
            
              <h3 className="font-inter font-semibold text-lg mb-3 mt-6" style={{ color: '#00853E' }}>Our Values</h3>
              <ul className="text-gray-600 text-sm space-y-3">
                {[
                  'Integrity in every client relationship',
                  'Personalized attention to your unique financial situation',
                  'Transparency in our communication and fee structure',
                  'Excellence in service delivery and investment management'
                ].map((value, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: 'rgba(0, 133, 62, 0.1)' }}>
                        <Check className="h-3 w-3" style={{ color: '#00853E' }} />
                      </div>
                    </div>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <motion.div
            className="order-1 lg:order-2 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            variants={fadeInUp}
          >
            <div className="rounded-lg overflow-hidden shadow-lg relative">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="BRL Financial team meeting" 
                className="w-full h-auto object-cover"
                style={{ maxHeight: '300px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-sm font-medium">Building trust and lasting relationships since 1996</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-4 border-primary/20 rounded-lg -z-10"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-primary/10 rounded-lg -z-10"></div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {[
            {
              icon: <Award className="h-6 w-6" />,
              title: '30+',
              description: 'Years of Experience'
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: '500+',
              description: 'Satisfied Clients'
            },
            {
              icon: <TrendingUp className="h-6 w-6" />,
              title: '$250M+',
              description: 'Assets Under Management'
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: '100%',
              description: 'Independent Advice'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              variants={scaleIn}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" 
                style={{ backgroundColor: 'rgba(0, 133, 62, 0.1)', color: '#00853E' }}
              >
                {item.icon}
              </div>
              <h3 className="font-inter font-bold text-xl mb-1" style={{ color: '#00853E' }}>{item.title}</h3>
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
        >
          <h3 className="font-inter font-semibold text-xl mb-6 text-center" style={{ color: '#00853E' }}>
            Why Choose BRL FINANCIAL GROUP?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Handshake className="h-5 w-5" />,
                title: 'Personalized Service',
                description: 'We take time to understand your goals and create strategies tailored to your unique financial situation.'
              },
              {
                icon: <TrendingUp className="h-5 w-5" />,
                title: 'Expert Guidance',
                description: 'Our team of experienced professionals provides knowledgeable advice backed by decades of industry experience.'
              },
              {
                icon: <Shield className="h-5 w-5" />,
                title: 'Fiduciary Standard',
                description: 'As a fiduciary, we are legally obligated to act in your best interest at all times.'
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
              >
                <div className="flex items-start mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg mr-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: 'rgba(0, 133, 62, 0.1)', color: '#00853E' }}
                  >
                    {item.icon}
                  </div>
                  <h4 className="font-inter font-semibold text-base pt-2" style={{ color: '#00853E' }}>{item.title}</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;