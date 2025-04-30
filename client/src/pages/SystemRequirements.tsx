import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function SystemRequirements() {
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
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">System Requirements</h1>
        
        <div className="prose prose-sm max-w-none">
          <p>
            To ensure the best experience when using the BRL Financial Group website and online services, please ensure your system meets the following requirements:
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">Recommended Browser Requirements</h2>
          <ul>
            <li><strong>Google Chrome:</strong> Version 90 or higher</li>
            <li><strong>Mozilla Firefox:</strong> Version 88 or higher</li>
            <li><strong>Microsoft Edge:</strong> Version 90 or higher</li>
            <li><strong>Safari:</strong> Version 14 or higher</li>
            <li><strong>Opera:</strong> Version 76 or higher</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">
            Note: Using older or unsupported browsers may result in limited functionality or security vulnerabilities.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">Desktop Requirements</h2>
          <h3 className="text-lg font-medium mt-4 mb-2">Windows</h3>
          <ul>
            <li>Windows 10 or later</li>
            <li>1 GHz processor or higher</li>
            <li>2 GB RAM or higher</li>
            <li>Screen resolution: 1280 x 768 or higher</li>
            <li>JavaScript enabled</li>
            <li>Cookies enabled</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">macOS</h3>
          <ul>
            <li>macOS 10.13 (High Sierra) or later</li>
            <li>Intel processor or Apple Silicon</li>
            <li>2 GB RAM or higher</li>
            <li>Screen resolution: 1280 x 768 or higher</li>
            <li>JavaScript enabled</li>
            <li>Cookies enabled</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">Mobile Requirements</h2>
          <h3 className="text-lg font-medium mt-4 mb-2">iOS</h3>
          <ul>
            <li>iOS 14 or later</li>
            <li>Safari browser</li>
            <li>JavaScript enabled</li>
            <li>Cookies enabled</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">Android</h3>
          <ul>
            <li>Android 8.0 or later</li>
            <li>Chrome browser</li>
            <li>JavaScript enabled</li>
            <li>Cookies enabled</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">Internet Connection</h2>
          <p>
            A stable broadband internet connection with a minimum speed of 1 Mbps is recommended for optimal performance.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">PDF Viewing</h2>
          <p>
            Some documents on our site are provided in PDF format. To view these documents, you will need a PDF reader such as:
          </p>
          <ul>
            <li>Adobe Acrobat Reader DC</li>
            <li>Browser built-in PDF viewer</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">Support</h2>
          <p>
            If you are experiencing technical issues with our website, please contact our technical support team:
          </p>
          <p>
            Email: support@brlfinancial.com<br />
            Phone: 561-200-6004
          </p>
          
          <p className="text-sm text-gray-500 mt-8">
            Last updated: January 1, 2023
          </p>
        </div>
      </div>
    </motion.div>
  );
}