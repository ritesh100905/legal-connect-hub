import { 
  Gavel, 
  Scale, 
  Users, 
  Home, 
  Building2, 
  Car, 
  ShoppingCart, 
  Briefcase, 
  Globe, 
  FileText,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const SpecializationsSection = () => {
  const specializations = [
    {
      icon: Gavel,
      title: "Criminal Law",
      description: "Defense against criminal charges",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Scale,
      title: "Civil Law",
      description: "Civil disputes & litigation",
      color: "bg-primary-light text-primary",
    },
    {
      icon: Users,
      title: "Family Law",
      description: "Divorce, custody & inheritance",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Home,
      title: "Property Law",
      description: "Real estate & land matters",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Building2,
      title: "Corporate Law",
      description: "Business & company matters",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Car,
      title: "Motor Vehicle Act",
      description: "Accident claims & violations",
      color: "bg-slate-100 text-slate-600",
    },
    {
      icon: ShoppingCart,
      title: "Consumer Law",
      description: "Consumer rights protection",
      color: "bg-teal-100 text-teal-600",
    },
    {
      icon: Briefcase,
      title: "Labour Law",
      description: "Employment disputes",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: Globe,
      title: "Cyber Law",
      description: "Digital crimes & online fraud",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: FileText,
      title: "Tax Law",
      description: "Tax disputes & compliance",
      color: "bg-rose-100 text-rose-600",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Browse by Legal Specialization
          </h2>
          <p className="text-muted-foreground">
            Find lawyers specialized in your specific legal needs. Click on any category to view verified experts.
          </p>
        </div>

        {/* Specializations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {specializations.map((spec) => (
            <Link
              key={spec.title}
              to={`/specializations/${spec.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group p-5 rounded-xl border border-border bg-card hover:shadow-card-hover hover:border-primary/20 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg ${spec.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <spec.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{spec.title}</h3>
              <p className="text-xs text-muted-foreground">{spec.description}</p>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            to="/specializations"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View All Specializations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecializationsSection;
