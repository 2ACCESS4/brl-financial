import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Legal() {
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
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Legal Information</h1>
        
        <div className="prose prose-sm max-w-none">
          <p>
            The information contained in this website is for general information purposes only. The information is provided by BRL Financial Group ("BRL") and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">Terms of Use</h2>
          <p>
            Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
          </p>
          <p>
            Through this website you are able to link to other websites which are not under the control of BRL. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>
          <p>
            Every effort is made to keep the website up and running smoothly. However, BRL takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">Copyright</h2>
          <p>
            This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
          </p>
          <p>
            All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.
          </p>
          
          <p className="text-sm text-gray-500 mt-8">
            Last updated: January 1, 2023
          </p>
        </div>
      </div>
    </motion.div>
  );
}