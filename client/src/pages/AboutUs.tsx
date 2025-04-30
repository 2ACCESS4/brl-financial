import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <motion.div 
      className="container py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <a 
        href="/" 
        className="inline-flex items-center text-primary hover:text-primary/80 text-sm mb-6 group"
      >
        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </a>
      
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-primary">About Us</h1>
        
        <div className="prose prose-sm max-w-none">
          <p className="mb-4">
            We are one of the state's leading insurance premium finance companies. We know that you have a choice and we want to be your first choice for financing insurance premiums.
          </p>
          
          <p className="mb-4">
            Since our inception our goal has been to provide you and your insureds with world-class service and support. From our home office we can reach out to furthest corners of the state and offer exceptional customer service.
          </p>
          
          <p className="mb-4">
            Our management team represents many years of insurance, business and information technology experience. We know the types of challenges you are confronted with on a daily basis and we are here to help.
          </p>
          
          <p className="mb-4">
            We are anxious to hear your feedback about our web products and our service. Please do not hesitate to call upon us to resolve a particular issue or address a unique request.
          </p>
          
          <p className="text-right italic mt-8">
            The Entire Staff
          </p>
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-primary">Contact Information</h2>
            <p>
              <strong>Phone:</strong> 561-200-6004<br />
              <strong>Email:</strong> info@brlfinancial.com
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}