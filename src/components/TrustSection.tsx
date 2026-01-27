import { Shield, Award, Lock, Headphones } from "lucide-react";
const TrustSection = () => {
  const trustPoints = [{
    icon: Shield,
    title: "Verified Lawyers",
    description: "Every lawyer is verified through Bar Council records and document verification.",
    color: "bg-primary/10 text-primary"
  }, {
    icon: Award,
    title: "Quality Assured",
    description: "We maintain strict quality standards and monitor lawyer performance regularly.",
    color: "bg-primary/10 text-primary"
  }, {
    icon: Lock,
    title: "Secure & Private",
    description: "Your data and consultations are protected with bank-grade encryption.",
    color: "bg-primary/10 text-primary"
  }, {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our support team is always ready to help you with any queries.",
    color: "bg-primary/10 text-primary"
  }];
  return <section className="py-16 md:py-24 bg-navy text-navy-foreground">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Trust DAL?
          </h2>
          <p className="text-navy-foreground/70">
            We've built a platform that prioritizes trust, transparency, and quality to help you find the right legal help.
          </p>
        </div>

        {/* Trust Points Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map(point => <div key={point.title} className="text-center">
              <div className={`w-16 h-16 rounded-2xl ${point.color} flex items-center justify-center mx-auto mb-5`}>
                <point.icon className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
              <p className="text-sm text-navy-foreground/70 leading-relaxed">
                {point.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default TrustSection;