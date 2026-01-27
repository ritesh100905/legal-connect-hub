import { Star, MapPin, BadgeCheck, Scale, Languages, Video, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterState } from "@/pages/FindLawyers";
import { Link } from "react-router-dom";

interface LawyerResultsProps {
  filters: FilterState;
}

// Mock data for lawyers
const mockLawyers = [
  {
    id: 1,
    name: "Adv. Priya Sharma",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
    specializations: ["Criminal Law", "Civil Law"],
    location: "Delhi",
    court: "Supreme Court",
    experience: 12,
    rating: 4.9,
    reviews: 156,
    consultationFee: 2000,
    languages: ["Hindi", "English"],
    isVerified: true,
    isAvailable: true,
  },
  {
    id: 2,
    name: "Adv. Rajesh Kumar",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    specializations: ["Property Law", "Family Law"],
    location: "Mumbai",
    court: "High Court",
    experience: 8,
    rating: 4.7,
    reviews: 89,
    consultationFee: 1500,
    languages: ["Hindi", "English", "Marathi"],
    isVerified: true,
    isAvailable: true,
  },
  {
    id: 3,
    name: "Adv. Ananya Reddy",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    specializations: ["Corporate Law", "Tax Law"],
    location: "Bangalore",
    court: "High Court",
    experience: 15,
    rating: 4.8,
    reviews: 203,
    consultationFee: 3000,
    languages: ["English", "Kannada", "Telugu"],
    isVerified: true,
    isAvailable: false,
  },
  {
    id: 4,
    name: "Adv. Mohammed Iqbal",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    specializations: ["Motor Vehicle Law", "Consumer Law"],
    location: "Hyderabad",
    court: "District Court",
    experience: 6,
    rating: 4.5,
    reviews: 67,
    consultationFee: 800,
    languages: ["Hindi", "English", "Telugu"],
    isVerified: true,
    isAvailable: true,
  },
  {
    id: 5,
    name: "Adv. Sneha Patel",
    photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face",
    specializations: ["Family Law", "Civil Law"],
    location: "Ahmedabad",
    court: "Family Court",
    experience: 10,
    rating: 4.6,
    reviews: 124,
    consultationFee: 1200,
    languages: ["Hindi", "English", "Gujarati"],
    isVerified: true,
    isAvailable: true,
  },
  {
    id: 6,
    name: "Adv. Vikram Singh",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    specializations: ["Criminal Law", "Cyber Law"],
    location: "Delhi",
    court: "District Court",
    experience: 9,
    rating: 4.4,
    reviews: 78,
    consultationFee: 1000,
    languages: ["Hindi", "English", "Punjabi"],
    isVerified: true,
    isAvailable: true,
  },
];

const LawyerResults = ({ filters }: LawyerResultsProps) => {
  // Filter lawyers based on filters
  const filteredLawyers = mockLawyers.filter((lawyer) => {
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      if (!lawyer.name.toLowerCase().includes(query)) return false;
    }
    if (filters.specialization && !lawyer.specializations.includes(filters.specialization)) {
      return false;
    }
    if (filters.location && lawyer.location !== filters.location) {
      return false;
    }
    if (filters.court && lawyer.court !== filters.court) {
      return false;
    }
    if (filters.language && !lawyer.languages.includes(filters.language)) {
      return false;
    }
    if (filters.budget) {
      const fee = lawyer.consultationFee;
      switch (filters.budget) {
        case "Under ₹500":
          if (fee >= 500) return false;
          break;
        case "₹500 - ₹1000":
          if (fee < 500 || fee > 1000) return false;
          break;
        case "₹1000 - ₹2000":
          if (fee < 1000 || fee > 2000) return false;
          break;
        case "₹2000 - ₹5000":
          if (fee < 2000 || fee > 5000) return false;
          break;
        case "Above ₹5000":
          if (fee <= 5000) return false;
          break;
      }
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredLawyers.length}</span> lawyers
        </p>
        <div className="text-sm text-muted-foreground">
          Sort by: <span className="font-medium text-foreground">Relevance</span>
        </div>
      </div>

      {/* Lawyer Cards */}
      {filteredLawyers.length > 0 ? (
        <div className="space-y-4">
          {filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-background rounded-xl border border-border p-4 md:p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={lawyer.photo}
                      alt={lawyer.name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover"
                    />
                    {lawyer.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <BadgeCheck className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {lawyer.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-sm font-medium text-foreground">
                            {lawyer.rating}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({lawyer.reviews} reviews)
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {lawyer.experience} yrs exp
                        </span>
                      </div>
                    </div>

                    {/* Availability Badge */}
                    <Badge
                      variant={lawyer.isAvailable ? "default" : "secondary"}
                      className={lawyer.isAvailable ? "bg-green-500/10 text-green-600 border-green-500/20" : ""}
                    >
                      {lawyer.isAvailable ? "Available Today" : "Busy"}
                    </Badge>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {lawyer.specializations.map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{lawyer.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Scale className="w-4 h-4" />
                      <span>{lawyer.court}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Languages className="w-4 h-4" />
                      <span>{lawyer.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col gap-3 md:items-end md:justify-between border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Consultation Fee</p>
                    <p className="text-xl font-bold text-primary">₹{lawyer.consultationFee}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="gap-2">
                      <Video className="w-4 h-4" />
                      Book Video Call
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-background rounded-xl border border-border p-12 text-center">
          <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No lawyers found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  );
};

export default LawyerResults;
