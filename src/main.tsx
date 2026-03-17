import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import ContactPage from "./pages/contact";
import NotFound from "./pages/404";
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
            <Route path="/contact" element={<ContactPage />} />
          </Route>

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