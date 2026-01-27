import { Search, MapPin, Scale, Shield, Users, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
  const features = [{
    icon: Shield,
    title: "Verified Profiles",
    subtitle: "Bar Council Verified"
  }, {
    icon: Users,
    title: "Direct Connect",
    subtitle: "Online & Offline"
  }, {
    icon: Star,
    title: "Transparent Reviews",
    subtitle: "Real Client Feedback"
  }];
  const stats = [{
    value: "5000+",
    label: "Verified Lawyers"
  }, {
    value: "50K+",
    label: "Consultations"
  }, {
    value: "28",
    label: "States Covered"
  }];
  return <section className="bg-navy text-navy-foreground">
      <div className="container py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-light rounded-full border border-navy-light">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Verified Lawyers Across India</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-navy">
                Find Your Perfect{" "}
                <span className="text-primary">Legal Expert</span>
              </h1>
              <p className="text-navy-foreground/80 max-w-lg text-base font-bold">
                Connect with verified lawyers and advocates across India. Get expert legal consultation for your specific needs with complete transparency.
              </p>
            </div>

            {/* Search Box */}
            <div className="bg-background rounded-xl p-2 flex flex-col sm:flex-row gap-2 shadow-card">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg bg-muted">
                <Scale className="w-5 h-5 text-muted-foreground" />
                <select className="flex-1 bg-transparent text-foreground text-sm outline-none cursor-pointer">
                  <option value="">Legal Need</option>
                  <option value="criminal">Criminal Law</option>
                  <option value="civil">Civil Law</option>
                  <option value="family">Family Law</option>
                  <option value="property">Property Law</option>
                  <option value="corporate">Corporate Law</option>
                </select>
              </div>
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg bg-muted">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <select className="flex-1 bg-transparent text-foreground text-sm outline-none cursor-pointer">
                  <option value="">Location</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="chennai">Chennai</option>
                  <option value="kolkata">Kolkata</option>
                </select>
              </div>
              <Button size="lg" className="gap-2 px-8">
                <Search className="w-4 h-4" />
                Search
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              {stats.map(stat => <div key={stat.label} className="space-y-1">
                  <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-navy-foreground/60">{stat.label}</div>
                </div>)}
            </div>
          </div>

          {/* Right Content - Feature Card */}
          <div className="bg-background rounded-2xl p-6 md:p-8 shadow-card-hover">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                <Scale className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">Expert Legal Help</h3>
                <p className="text-sm text-muted-foreground">At your fingertips</p>
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {features.map(feature => <div key={feature.title} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
                  </div>
                </div>)}
            </div>

            {/* Rating Badge */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary rounded-full">
                <Star className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                <span className="font-semibold text-primary-foreground bg-orange-400">4.8/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;