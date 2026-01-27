import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterState } from "@/pages/FindLawyers";
import { useState } from "react";

interface LawyerFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
}

const specializations = [
  "Criminal Law",
  "Civil Law",
  "Family Law",
  "Property Law",
  "Motor Vehicle Law",
  "Corporate Law",
  "Consumer Law",
  "Labour Law",
  "Cyber Law",
  "Tax Law",
  "Immigration Law",
  "Intellectual Property",
];

const locations = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

const courts = [
  "District Court",
  "High Court",
  "Supreme Court",
  "Consumer Court",
  "Family Court",
  "Labour Court",
];

const budgets = [
  "Under ₹500",
  "₹500 - ₹1000",
  "₹1000 - ₹2000",
  "₹2000 - ₹5000",
  "Above ₹5000",
];

const languages = [
  "Hindi",
  "English",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
];

const FilterContent = ({
  filters,
  onFilterChange,
  onClearFilters,
}: LawyerFiltersProps) => {
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          value={filters.searchQuery}
          onChange={(e) => onFilterChange("searchQuery", e.target.value)}
          className="pl-10 bg-background"
        />
      </div>

      {/* Specialization */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Specialization
        </label>
        <Select
          value={filters.specialization}
          onValueChange={(value) => onFilterChange("specialization", value)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select specialization" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border z-50">
            {specializations.map((spec) => (
              <SelectItem key={spec} value={spec}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Location</label>
        <Select
          value={filters.location}
          onValueChange={(value) => onFilterChange("location", value)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border z-50">
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Court */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Court</label>
        <Select
          value={filters.court}
          onValueChange={(value) => onFilterChange("court", value)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select court" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border z-50">
            {courts.map((court) => (
              <SelectItem key={court} value={court}>
                {court}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Consultation Fee
        </label>
        <Select
          value={filters.budget}
          onValueChange={(value) => onFilterChange("budget", value)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border z-50">
            {budgets.map((budget) => (
              <SelectItem key={budget} value={budget}>
                {budget}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Language */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Language</label>
        <Select
          value={filters.language}
          onValueChange={(value) => onFilterChange("language", value)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border z-50">
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={onClearFilters}
        >
          <X className="w-4 h-4" />
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );
};

const LawyerFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
}: LawyerFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle>Filter Lawyers</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent
                filters={filters}
                onFilterChange={onFilterChange}
                onClearFilters={onClearFilters}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block">
        <div className="bg-background rounded-xl border border-border p-6 sticky top-24">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Filter Lawyers</h2>
          </div>
          <FilterContent
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          />
        </div>
      </aside>
    </>
  );
};

export default LawyerFilters;
