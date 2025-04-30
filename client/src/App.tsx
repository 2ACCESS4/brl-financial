import { Route, Switch } from 'wouter';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import NotFound from '@/pages/not-found';
import Legal from '@/pages/Legal';
import Privacy from '@/pages/Privacy';
import SystemRequirements from '@/pages/SystemRequirements';
import AboutUs from '@/pages/AboutUs';
import Contact from '@/pages/Contact';
import { AuthProvider } from '@/hooks/use-auth';
import { ProtectedRoute } from '@/lib/protected-route';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/index.html" component={Home} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact" component={Contact} />
          <Route path="/legal" component={Legal} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/system-requirements" component={SystemRequirements} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;