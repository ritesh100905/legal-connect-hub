import { Search, UserCheck, CalendarCheck, Video } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Search",
      description: "Find lawyers by specialization, location, court, budget, and language preferences.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      number: 2,
      icon: UserCheck,
      title: "Choose",
      description: "Compare verified profiles, read reviews, and select the right lawyer for your case.",
      color: "bg-primary-light text-primary",
    },
    {
      number: 3,
      icon: CalendarCheck,
      title: "Book",
      description: "Schedule an online or offline consultation at your convenient time slot.",
      color: "bg-green-100 text-green-600",
    },
    {
      number: 4,
      icon: Video,
      title: "Consult",
      description: "Connect via secure video call or visit the lawyer's office for your consultation.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Get legal help in 4 simple steps. Our platform makes it easy to find and consult with the right lawyer.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold z-10">
                {step.number}
              </div>

              {/* Card */}
              <div className="h-full p-6 pt-8 rounded-xl border border-border bg-card hover:shadow-card transition-shadow">
                <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center mb-5`}>
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* Connector Line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
