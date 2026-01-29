import Header from "@/components/Header";
import Footer from "@/components/Footer";

const architectureLayers = [
  {
    title: "1) App screens (what people see)",
    description:
      "Web pages where clients, lawyers, and admins sign in, search, book, and manage work.",
  },
  {
    title: "2) API (the messenger)",
    description:
      "A secure helper that takes requests from the app and passes them to the database safely.",
  },
  {
    title: "3) Database (the organized storage)",
    description:
      "Structured tables that store users, lawyers, bookings, reviews, payments, and verification.",
  },
  {
    title: "4) Integrations (trusted services)",
    description:
      "OTP, payments, and video calls from trusted providers connected to the API.",
  },
  {
    title: "5) Security & monitoring",
    description:
      "Rules and tracking to keep data safe, prevent fraud, and audit activity.",
  },
];

const nextSections = [
  "Feature list (MVP + future)",
  "Database tables (explained simply)",
  "API routes (plain-English description)",
  "Beginner-friendly tech stack",
  "UI/UX screen map",
  "Backend build steps",
  "Frontend build steps",
  "Auth, payments, and video calls",
  "Testing, deployment, maintenance",
  "Missing essential features & security",
];

const Blueprint = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/30 border-b border-border">
          <div className="container py-12 space-y-4">
            <p className="text-sm font-semibold text-primary">DAL Product Blueprint</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Step 1: Simple App Architecture (Beginner Friendly)
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              This is the first step in the full build plan. It explains how the app is
              organized in very simple words. We will unlock the next steps one by one.
            </p>
          </div>
        </section>

        <section className="container py-10 space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {architectureLayers.map((layer) => (
              <div
                key={layer.title}
                className="border border-border rounded-xl p-6 bg-card shadow-sm"
              >
                <h2 className="font-semibold text-lg text-foreground">{layer.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">{layer.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-6">
            <h2 className="text-lg font-semibold text-foreground">Next steps (coming next)</h2>
            <p className="text-sm text-muted-foreground mt-1">
              We will go through these one at a time, in beginner-friendly language.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              {nextSections.map((section) => (
                <li key={section} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                  {section}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blueprint;
