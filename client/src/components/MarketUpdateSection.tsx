import { motion } from 'framer-motion';
import { 
  ChevronRight,
  Calendar, 
  Clock,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

const MarketUpdateSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Mock market updates
  const marketUpdates = [
    {
      title: 'Q2 2023 Market Review',
      date: 'July 15, 2023',
      excerpt: 'Our analysis of market performance and economic trends from the second quarter of 2023.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Federal Reserve Policy Update',
      date: 'June 22, 2023',
      excerpt: 'A review of recent Federal Reserve decisions and what they mean for your investments.',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Inflation Outlook for 2023',
      date: 'May 30, 2023',
      excerpt: 'Our analysis of inflation trends and their potential impact on various asset classes.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    }
  ];
  
  // Mock market indicators
  const marketIndicators = [
    { name: 'S&P 500', value: '4,587.64', change: '+0.37%', trend: 'up' },
    { name: 'Dow Jones', value: '35,721.34', change: '+0.21%', trend: 'up' },
    { name: 'NASDAQ', value: '14,304.56', change: '+0.83%', trend: 'up' },
    { name: '10Y Treasury', value: '3.54%', change: '-0.02%', trend: 'down' },
    { name: 'Gold', value: '$1,978.80', change: '+0.15%', trend: 'up' }
  ];
  
  return (
    <section id="market-update" className="py-16 bg-gray-50">
      <div className="container">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
        >
          <h2 className="font-inter font-bold text-3xl md:text-4xl text-primary mb-4">Market Update</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">
            Stay informed with our latest market insights and analysis to help guide your investment decisions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Market Updates */}
          <div className="lg:col-span-2">
            <h3 className="font-inter font-semibold text-2xl text-primary mb-6">
              Latest Insights
            </h3>
            <div className="space-y-8">
              {marketUpdates.map((update, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  variants={fadeInUp}
                >
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={update.image} 
                      alt={update.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col">
                    <h4 className="font-inter font-semibold text-xl text-primary mb-2">
                      {update.title}
                    </h4>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{update.date}</span>
                    </div>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {update.excerpt}
                    </p>
                    <a 
                      href="#" 
                      className="text-primary font-medium flex items-center hover:underline self-start"
                    >
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a 
                href="#" 
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                View All Market Updates <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
          
          {/* Market Indicators */}
          <div>
            <h3 className="font-inter font-semibold text-2xl text-primary mb-6">
              Market Indicators
            </h3>
            <motion.div
              className="bg-white rounded-lg shadow-sm p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              variants={fadeInUp}
            >
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Last updated: Today, 4:00 PM ET</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {marketIndicators.map((indicator, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="font-medium">{indicator.name}</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-3">{indicator.value}</span>
                      <div className={`flex items-center ${
                        indicator.trend === 'up' 
                          ? 'text-green-600' 
                          : indicator.trend === 'down' 
                            ? 'text-red-600' 
                            : 'text-gray-600'
                      }`}>
                        {indicator.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : indicator.trend === 'down' ? (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        ) : (
                          <Minus className="h-4 w-4 mr-1" />
                        )}
                        <span>{indicator.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-gray-500 text-sm text-center">
                *Data shown is for illustrative purposes only
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-lg shadow-sm p-6 mt-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={fadeInUp}
            >
              <h4 className="font-inter font-semibold text-lg text-primary mb-4">
                Economic Calendar
              </h4>
              <div className="space-y-3">
                {[
                  { date: 'Aug 10', event: 'CPI Data Release', time: '8:30 AM ET' },
                  { date: 'Aug 15', event: 'Retail Sales', time: '8:30 AM ET' },
                  { date: 'Aug 24', event: 'Fed Meeting Minutes', time: '2:00 PM ET' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <div className="font-medium">{item.event}</div>
                      <div className="text-sm text-gray-500">{item.date} • {item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <a 
                  href="#" 
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View Full Calendar
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketUpdateSection;