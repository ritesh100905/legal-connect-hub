import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LawyerFilters from "@/components/find-lawyers/LawyerFilters";
import LawyerResults from "@/components/find-lawyers/LawyerResults";
import { useState } from "react";

export interface FilterState {
  specialization: string;
  location: string;
  court: string;
  budget: string;
  language: string;
  searchQuery: string;
}

const FindLawyers = () => {
  const [filters, setFilters] = useState<FilterState>({
    specialization: "",
    location: "",
    court: "",
    budget: "",
    language: "",
    searchQuery: "",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      specialization: "",
      location: "",
      court: "",
      budget: "",
      language: "",
      searchQuery: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-background py-8 border-b border-border">
          <div className="container">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Find Lawyers
            </h1>
            <p className="text-muted-foreground">
              Search from 5000+ verified lawyers across India
            </p>
          </div>
        </section>

        {/* Filters and Results */}
        <div className="container py-6">
          <div className="grid lg:grid-cols-[300px_1fr] gap-6">
            {/* Filters Sidebar */}
            <LawyerFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />

            {/* Results */}
            <LawyerResults filters={filters} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FindLawyers;
