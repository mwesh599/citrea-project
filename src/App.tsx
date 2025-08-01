import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Identity from "./pages/Identity";
import Credentials from "./pages/Credentials";
import Reputation from "./pages/Reputation";
import ZkLogin from "./pages/ZkLogin";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// ✅ RainbowKit + Wagmi Wallet Support
import { WalletProvider } from "@/wallet/WalletProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WalletProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/identity" element={<Identity />} />
              <Route path="/credentials" element={<Credentials />} />
              <Route path="/reputation" element={<Reputation />} />
              <Route path="/zklogin" element={<ZkLogin />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
