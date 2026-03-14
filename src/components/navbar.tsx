import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import Button from "./ui/button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-gray-200/50"
          : "bg-white border-gray-200"
      }`}
      id="main-navbar"
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <Link to="/" className="flex items-center gap-2" id="navbar-logo">
          <img
            src="/src/assets/veenode-logo.png"
            alt="Veenode Technologies"
            className="h-10"
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6" id="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="text-sm font-medium text-gray-600 px-2 py-2 rounded-md transition-colors duration-150 hover:text-gray-900"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <Button to="/contact" variant="cta" size="md" id="navbar-cta">
            Contact us
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          id="navbar-mobile-toggle"
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-screen w-full bg-gray-900 shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
          id="navbar-mobile-menu"
        >
          {/* Close button */}
          <div className="flex justify-end p-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Menu links */}
          <nav className="flex flex-col px-8 pt-8 gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-white text-xl font-medium py-4 px-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6">
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setMenuOpen(false)}
              >
                Contact us
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
}
