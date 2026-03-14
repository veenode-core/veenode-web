import { Link } from "react-router-dom";
import WebLayout from "../components/web-layout";
import Button from "../components/ui/button";

export default function NotFound() {
  return (
    <WebLayout>
      <section className="min-h-screen flex items-center justify-center px-6 bg-light-blue">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-muted mb-6">
            Error 404
          </p>
          <h1
            className="font-bold text-primary leading-tight mb-6"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Page Not Found
          </h1>
          <p className="text-lg text-dark-text mb-10 max-w-lg mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="primary" to="/">
              Back to Home
            </Button>
            <Button variant="ghost" to="/contact">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </WebLayout>
  );
}
