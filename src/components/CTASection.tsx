import { Scale, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Clients */}
          <div className="p-8 md:p-10 rounded-2xl bg-primary-light border border-primary/10">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Scale className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Need Legal Help?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Find verified lawyers across India for any legal matter. Get expert consultation online or offline at transparent prices.
            </p>
            <Link to="/find-lawyers">
              <Button className="gap-2">
                Find a Lawyer
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* For Lawyers */}
          <div className="p-8 md:p-10 rounded-2xl bg-navy text-navy-foreground">
            <div className="w-14 h-14 rounded-xl bg-navy-light flex items-center justify-center mb-6">
              <Building2 className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">
              Are You a Lawyer?
            </h3>
            <p className="text-navy-foreground/70 mb-6 leading-relaxed">
              Join India's fastest-growing legal platform. Expand your practice, get more clients, and manage consultations easily.
            </p>
            <Link to="/lawyer-signup">
              <Button variant="outline" className="gap-2 bg-transparent border-navy-foreground/30 text-navy-foreground hover:bg-navy-light hover:text-navy-foreground">
                Join as Lawyer
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
