import { Scale, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { label: "Find Lawyers", href: "/find-lawyers" },
    { label: "Specializations", href: "/specializations" },
    { label: "How It Works", href: "/how-it-works" },
  ];

  const forLawyers = [
    { label: "Join as Lawyer", href: "/lawyer-signup" },
    { label: "Lawyer Dashboard", href: "/lawyer-dashboard" },
  ];

  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">DAL</span>
                <span className="text-xs text-primary leading-tight">Dhundho Apna Lawyer</span>
              </div>
            </Link>
            <p className="text-sm text-navy-foreground/70 leading-relaxed">
              India's trusted platform to find verified lawyers and advocates. Get legal help with transparency and trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-navy-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Lawyers */}
          <div>
            <h4 className="font-semibold mb-4">For Lawyers</h4>
            <ul className="space-y-3">
              {forLawyers.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-navy-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-navy-foreground/70">
                <Mail className="w-4 h-4 text-primary" />
                support@dal.in
              </li>
              <li className="flex items-center gap-2 text-sm text-navy-foreground/70">
                <Phone className="w-4 h-4 text-primary" />
                1800-XXX-XXXX
              </li>
              <li className="flex items-center gap-2 text-sm text-navy-foreground/70">
                <MapPin className="w-4 h-4 text-primary" />
                New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-navy-light flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-navy-foreground/60">
            © 2026 DAL - Dhundho Apna Lawyer. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-sm text-navy-foreground/60 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-navy-foreground/60 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
