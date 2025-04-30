import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Privacy() {
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
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Privacy Policy</h1>
        
        <div className="prose prose-sm max-w-none">
          <p>
            BRL Financial Group ("BRL") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">Collection of Your Information</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect via the Website includes:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, telephone number, and financial information that you voluntarily give to us when you register with the Website or when you choose to participate in various activities related to the Website.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Website, such as your IP address, browser type, operating system, access times, and the pages you have viewed.
            </li>
            <li>
              <strong>Financial Data:</strong> Financial information, such as data related to your payment method, that we may collect when you purchase services from us. We store only very limited financial information that we need to provide our services.
            </li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Website to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Deliver targeted advertising, newsletters, and other information regarding promotions to you.</li>
            <li>Email you regarding your account or services.</li>
            <li>Enable user-to-user communications.</li>
            <li>Generate a personal profile about you to make future visits to the Website more personalized.</li>
            <li>Increase the efficiency and operation of the Website.</li>
            <li>Request feedback and contact you about your use of the Website.</li>
            <li>Resolve disputes and troubleshoot problems.</li>
            <li>Respond to product and customer service requests.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          <ul>
            <li>
              <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </li>
            <li>
              <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </li>
            <li>
              <strong>Marketing Communications:</strong> With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.
            </li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <p>
            BRL Financial Group<br />
            Phone: 561-200-6004<br />
            Email: info@brlfinancial.com
          </p>
          
          <p className="text-sm text-gray-500 mt-8">
            Last updated: January 1, 2023
          </p>
        </div>
      </div>
    </motion.div>
  );
}