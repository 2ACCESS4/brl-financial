import { useQuery } from '@tanstack/react-query';
import { Shield, Lock, CheckCircle, Globe } from 'lucide-react';
import { StatisticsData } from '@shared/schema';
import { getQueryFn } from '@/lib/queryClient';
import { STATS_ENDPOINT, CONFIG } from '@/lib/config';
import CurrencyExchangeWidget from './CurrencyExchangeWidget';

export function TrustAndSecuritySection() {
  const { data, isLoading } = useQuery<StatisticsData>({
    queryKey: [STATS_ENDPOINT],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    refetchInterval: CONFIG.statisticsRefreshInterval, // Refetch interval from config
  });

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Trust & Security Column */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="flex items-center mb-3">
                <Shield className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Trust & Security</h3>
              </div>
              
              <p className="text-gray-600 mb-4">
                Your security is our top priority. We utilize industry-leading 
                encryption and security protocols.
              </p>
              
              <div className="flex items-center mt-6">
                <Lock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700">Enterprise-grade protection</span>
              </div>
            </div>
            
            {/* Currency Exchange Widget Column */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">USD to BRL Exchange</h3>
                <div className="mt-2">
                  <CurrencyExchangeWidget />
                </div>
                <div className="mt-4 text-xs text-gray-500 text-center">
                  Real-time currency data updating every 30 seconds
                </div>
                <div className="mt-auto pt-4">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full max-w-xs mx-auto">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-gray-700">SHA-256 Encryption</span>
                    </div>
                    
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-gray-700">TLS 1.3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Site Statistics Column */}
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Globe className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Site Statistics</h3>
                <span className="ml-auto text-sm text-gray-500">
                  Last updated: Today
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Total Visits</span>
                  <span className="text-lg font-semibold text-green-700">
                    {isLoading ? (
                      <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
                    ) : (
                      new Intl.NumberFormat().format(data?.totalVisits || 0)
                    )}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Active Users</span>
                  <span className="text-lg font-semibold text-green-700">
                    {isLoading ? (
                      <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
                    ) : (
                      new Intl.NumberFormat().format(data?.activeUsers || 0)
                    )}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Registered Users</span>
                  <span className="text-lg font-semibold text-green-700">
                    {isLoading ? (
                      <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
                    ) : (
                      new Intl.NumberFormat().format(data?.registeredUsers || 0)
                    )}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Server Status</span>
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-600">Online</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Security Verification</span>
                  </div>
                  <span className="text-sm text-green-600">Valid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustAndSecuritySection;