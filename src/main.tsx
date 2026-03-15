import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/home';
import NotFound from './pages/404';
import CustomCursor from './components/ui/custom-cursor';
import { ScrollToTop } from './components/scroll-to-top';
// import BottomBlur from './components/ui/bottom-blur';
import Preloader from './components/preloader';

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Check if this is a page reload/refresh (not navigation)
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isReload = navEntry?.type === 'reload';
    
    if (!isReload) {
      setShowPreloader(false);
    }
  }, []);

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <BrowserRouter>
        <CustomCursor />
        {/* <BottomBlur /> */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
