import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import ServiceDetails from "./pages/service-details";
import ContactPage from "./pages/contact";
import BlogDetailPage from "./pages/blog-details";
import BlogPage from "./pages/blog-listing";
import NotFound from "./pages/404";
import LoginPage from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import BlogManager from "./pages/admin/blog-manager";
import BlogCreate from "./pages/admin/blog-create";
import ServicesManager from "./pages/admin/services-manager";
import CustomCursor from "./components/ui/custom-cursor";
import { ScrollToTop } from "./components/scroll-to-top";
import Preloader from "./components/preloader";
import WebLayout from "./components/web-layout";

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const navEntry = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    const isReload = navEntry?.type === "reload";
    if (!isReload) setShowPreloader(false);
  }, []);

  return (
    <>
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}
      <BrowserRouter>
        <Toaster richColors position="top-right" />
        <CustomCursor />
        <ScrollToTop />
        <Routes>
          {/* Layout wrapper — Outlet renders the matched child route */}
          <Route
            element={
              <WebLayout>
                <Outlet />
              </WebLayout>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetails />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
          </Route>
          
          <Route path="/admin" element={<LoginPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blog" element={<BlogManager />} />
          <Route path="/admin/blog/new" element={<BlogCreate />} />
          <Route path="/admin/blog/edit/:id" element={<BlogCreate />} />
          <Route path="/admin/services" element={<ServicesManager />} />

          {/* 404 — outside the layout if you want it full-screen, or inside if not */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);