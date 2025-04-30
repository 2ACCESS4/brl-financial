import { useQuery } from '@tanstack/react-query';
import { Users, BarChart, Eye } from 'lucide-react';
import { StatisticsData } from '@shared/schema';
import { getQueryFn } from '@/lib/queryClient';

export function SiteStatistics() {
  const { data, isLoading } = useQuery<StatisticsData>({
    queryKey: ['/api/stats'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    refetchInterval: 60000, // Refetch every minute
  });

  return (
    <div className="bg-green-50 border-t border-green-100">
      <div className="container mx-auto py-2 px-4">
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 mr-2">
              <Eye size={16} className="text-green-700" />
            </div>
            <div>
              <span className="font-semibold text-gray-800">
                {isLoading ? (
                  <div className="h-5 w-16 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  new Intl.NumberFormat().format(data?.totalVisits || 0)
                )}
              </span>{' '}
              <span>Total Visits</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 mr-2">
              <Users size={16} className="text-green-700" />
            </div>
            <div>
              <span className="font-semibold text-gray-800">
                {isLoading ? (
                  <div className="h-5 w-10 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  new Intl.NumberFormat().format(data?.activeUsers || 0)
                )}
              </span>{' '}
              <span>Online Now</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 mr-2">
              <BarChart size={16} className="text-green-700" />
            </div>
            <div>
              <span className="font-semibold text-gray-800">
                {isLoading ? (
                  <div className="h-5 w-16 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  new Intl.NumberFormat().format(data?.registeredUsers || 0)
                )}
              </span>{' '}
              <span>Registered Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteStatistics;