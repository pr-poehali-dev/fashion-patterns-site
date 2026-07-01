import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Blog from "./pages/Blog";
import Reviews from "./pages/Reviews";
import Payment from "./pages/Payment";
import About from "./pages/About";
import Articles from "./pages/Articles";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Auth from "./pages/Auth";
import FabricForDress from "./pages/articles/FabricForDress";
import SewingMachines from "./pages/articles/SewingMachines";
import GarmentCare from "./pages/articles/GarmentCare";
import SeamAllowances from "./pages/articles/SeamAllowances";
import PrintingPatterns from "./pages/articles/PrintingPatterns";
import ChoosingSize from "./pages/articles/ChoosingSize";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/fabric-for-dress" element={<FabricForDress />} />
            <Route path="/articles/sewing-machines" element={<SewingMachines />} />
            <Route path="/articles/garment-care" element={<GarmentCare />} />
            <Route path="/articles/seam-allowances" element={<SeamAllowances />} />
            <Route path="/articles/printing-patterns" element={<PrintingPatterns />} />
            <Route path="/articles/choosing-size" element={<ChoosingSize />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/auth" element={<Auth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
