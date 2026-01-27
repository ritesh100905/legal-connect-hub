import { Star, MapPin, Briefcase, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const FeaturedLawyersSection = () => {
  const lawyers = [
    {
      id: 1,
      name: "Adv. Priya Mehta",
      location: "New Delhi, Delhi",
      experience: 11,
      rating: 4.9,
      reviews: 89,
      specializations: ["Family Law", "Property Law"],
      consultationFee: 1000,
      isVerified: true,
      avatarBg: "bg-amber-100",
      avatarText: "text-amber-600",
    },
    {
      id: 2,
      name: "Adv. Neha Kapoor",
      location: "New Delhi, Delhi",
      experience: 8,
      rating: 4.8,
      reviews: 76,
      specializations: ["Cyber Law", "Corporate Law"],
      consultationFee: 1500,
      isVerified: true,
      avatarBg: "bg-blue-100",
      avatarText: "text-blue-600",
    },
    {
      id: 3,
      name: "Adv. Rajesh Kumar Sharma",
      location: "Mumbai, Maharashtra",
      experience: 15,
      rating: 4.8,
      reviews: 47,
      specializations: ["Criminal Law", "Civil Law"],
      consultationFee: 1500,
      isVerified: true,
      avatarBg: "bg-purple-100",
      avatarText: "text-purple-600",
    },
    {
      id: 4,
      name: "Adv. Arun Venkatesh",
      location: "Bangalore, Karnataka",
      experience: 12,
      rating: 4.7,
      reviews: 62,
      specializations: ["Corporate Law", "Tax Law"],
      consultationFee: 1200,
      isVerified: true,
      avatarBg: "bg-green-100",
      avatarText: "text-green-600",
    },
    {
      id: 5,
      name: "Adv. Sunita Patel",
      location: "Ahmedabad, Gujarat",
      experience: 9,
      rating: 4.6,
      reviews: 54,
      specializations: ["Family Law", "Consumer Law"],
      consultationFee: 800,
      isVerified: true,
      avatarBg: "bg-rose-100",
      avatarText: "text-rose-600",
    },
    {
      id: 6,
      name: "Adv. Mohammed Faiz",
      location: "Chennai, Tamil Nadu",
      experience: 12,
      rating: 4.5,
      reviews: 38,
      specializations: ["Property Law", "Civil Law"],
      consultationFee: 1100,
      isVerified: true,
      avatarBg: "bg-teal-100",
      avatarText: "text-teal-600",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
              Featured Lawyers
            </h2>
            <p className="text-muted-foreground">
              Top-rated lawyers verified by our team for their expertise and service quality.
            </p>
          </div>
          <Link
            to="/find-lawyers"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline whitespace-nowrap"
          >
            View All Lawyers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Lawyers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="group p-5 rounded-xl border border-border bg-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar */}
                <div className={`w-14 h-14 rounded-full ${lawyer.avatarBg} ${lawyer.avatarText} flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                  {lawyer.name.split(" ").slice(-1)[0].charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{lawyer.name}</h3>
                    {lawyer.isVerified && (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="font-medium text-sm">{lawyer.rating}</span>
                    <span className="text-muted-foreground text-sm">({lawyer.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-muted-foreground/70" />
                  {lawyer.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4 text-muted-foreground/70" />
                  {lawyer.experience} years experience
                </div>
              </div>

              {/* Specializations */}
              <div className="flex flex-wrap gap-2 mb-4">
                {lawyer.specializations.map((spec) => (
                  <Badge key={spec} variant="secondary" className="text-xs font-normal">
                    {spec}
                  </Badge>
                ))}
                {lawyer.specializations.length > 2 && (
                  <Badge variant="secondary" className="text-xs font-normal">
                    +1
                  </Badge>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <span className="text-xs text-muted-foreground">Consultation from</span>
                  <p className="font-bold text-lg text-foreground">₹{lawyer.consultationFee}</p>
                </div>
                <Button size="sm">View Profile</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLawyersSection;
