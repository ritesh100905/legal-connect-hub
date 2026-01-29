import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Scale, Shield, CheckCircle, Upload, FileText, User, Briefcase, MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
const lawyerSignupSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  
  // Bar Council Verification
  barCouncilId: z.string().min(5, "Bar Council ID is required").max(50),
  barCouncilState: z.string().min(1, "Please select your Bar Council state"),
  enrollmentYear: z.string().min(4, "Please enter your enrollment year"),
  
  // Professional Information
  specialization: z.string().min(1, "Please select your primary specialization"),
  secondarySpecializations: z.array(z.string()).optional(),
  experience: z.string().min(1, "Please select your experience"),
  practicingCourts: z.array(z.string()).min(1, "Please select at least one court"),
  
  // Location & Availability
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "Please select your state"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  
  // Fees
  consultationFee: z.string().min(1, "Please enter your consultation fee"),
  
  // Bio
  bio: z.string().min(50, "Bio must be at least 50 characters").max(1000),
  
  // Terms
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
});

type LawyerSignupForm = z.infer<typeof lawyerSignupSchema>;

const specializations = [
  "Criminal Law",
  "Family Law",
  "Corporate Law",
  "Civil Law",
  "Property Law",
  "Labor Law",
  "Tax Law",
  "Immigration Law",
  "Intellectual Property",
  "Banking & Finance",
  "Consumer Protection",
  "Environmental Law",
];

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh",
];

const courts = [
  "Supreme Court of India",
  "High Court",
  "District Court",
  "Sessions Court",
  "Family Court",
  "Consumer Court",
  "Labour Court",
  "Tribunal",
];

const languages = [
  "English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam",
  "Marathi", "Gujarati", "Bengali", "Punjabi", "Odia", "Urdu",
];

const experienceOptions = [
  "0-2 years",
  "3-5 years",
  "6-10 years",
  "11-15 years",
  "15+ years",
];

const LawyerSignup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedCourts, setSelectedCourts] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LawyerSignupForm>({
    resolver: zodResolver(lawyerSignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      barCouncilId: "",
      barCouncilState: "",
      enrollmentYear: "",
      specialization: "",
      experience: "",
      practicingCourts: [],
      city: "",
      state: "",
      languages: [],
      consultationFee: "",
      bio: "",
      termsAccepted: false,
    },
  });

  const toggleCourt = (court: string) => {
    const updated = selectedCourts.includes(court)
      ? selectedCourts.filter(c => c !== court)
      : [...selectedCourts, court];
    setSelectedCourts(updated);
    form.setValue("practicingCourts", updated);
  };

  const toggleLanguage = (language: string) => {
    const updated = selectedLanguages.includes(language)
      ? selectedLanguages.filter(l => l !== language)
      : [...selectedLanguages, language];
    setSelectedLanguages(updated);
    form.setValue("languages", updated);
  };

  const onSubmit = async (data: LawyerSignupForm) => {
    setIsSubmitting(true);
    try {
      // Check if email already exists
      const { data: existingApplication } = await supabase
        .from("lawyer_applications")
        .select("id, status")
        .eq("email", data.email)
        .maybeSingle();

      if (existingApplication) {
        const statusMessage = existingApplication.status === 'pending' 
          ? "Your application is currently under review." 
          : existingApplication.status === 'approved' 
            ? "Your application has already been approved." 
            : "Your previous application was reviewed. Please contact support for more information.";
        
        toast({
          title: "Application Already Exists",
          description: statusMessage,
          variant: "destructive",
        });
        return;
      }

      // Insert new application
      const { error } = await supabase.from("lawyer_applications").insert({
        full_name: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        bar_council_id: data.barCouncilId.trim(),
        bar_council_state: data.barCouncilState,
        enrollment_year: data.enrollmentYear.trim(),
        specialization: data.specialization,
        experience: data.experience,
        practicing_courts: data.practicingCourts,
        city: data.city.trim(),
        state: data.state,
        languages: data.languages,
        consultation_fee: parseInt(data.consultationFee, 10),
        bio: data.bio.trim(),
        status: "pending",
      });

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }

      toast({
        title: "Application Submitted Successfully!",
        description: "We will verify your Bar Council ID and contact you within 24-48 hours.",
      });

      // Reset form
      form.reset();
      setSelectedCourts([]);
      setSelectedLanguages([]);

    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            <Shield className="w-3 h-3 mr-1" />
            Verified Lawyers Only
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join DAL as a Verified Advocate
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with clients across India. Get verified with your Bar Council ID and start receiving consultation requests.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Verified Profile</h3>
              <p className="text-sm text-muted-foreground">Get a verified badge after Bar Council ID verification</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Grow Your Practice</h3>
              <p className="text-sm text-muted-foreground">Reach thousands of clients looking for legal help</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Receive consultation fees directly to your account</p>
            </CardContent>
          </Card>
        </div>

        {/* Registration Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Lawyer Registration Form
            </CardTitle>
            <CardDescription>
              Fill in your details accurately. All fields marked with * are mandatory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Bar Council Verification Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Bar Council Verification</h3>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Important:</strong> Your Bar Council Registration ID will be verified before your profile goes live. Please ensure the details match your Bar Council certificate.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="barCouncilId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bar Council Registration ID *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., MH/1234/2020" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="barCouncilState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bar Council State *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {states.map(state => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="enrollmentYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enrollment Year *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2020" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Personal Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name (as per Bar Council) *</FormLabel>
                          <FormControl>
                            <Input placeholder="Adv. John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="advocate@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Professional Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Specialization *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select specialization" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {specializations.map(spec => (
                                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {experienceOptions.map(exp => (
                                <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Practicing Courts */}
                  <FormField
                    control={form.control}
                    name="practicingCourts"
                    render={() => (
                      <FormItem>
                        <FormLabel>Practicing Courts *</FormLabel>
                        <FormDescription>Select all courts where you practice</FormDescription>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {courts.map(court => (
                            <Badge
                              key={court}
                              variant={selectedCourts.includes(court) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => toggleCourt(court)}
                            >
                              {court}
                            </Badge>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Location & Languages</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Mumbai" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {states.map(state => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Languages */}
                  <FormField
                    control={form.control}
                    name="languages"
                    render={() => (
                      <FormItem>
                        <FormLabel>Languages Spoken *</FormLabel>
                        <FormDescription>Select all languages you can consult in</FormDescription>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {languages.map(language => (
                            <Badge
                              key={language}
                              variant={selectedLanguages.includes(language) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => toggleLanguage(language)}
                            >
                              {language}
                            </Badge>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Fees */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="consultationFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consultation Fee (₹) *</FormLabel>
                        <FormDescription>Your fee for a 30-minute video consultation</FormDescription>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Bio */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Bio *</FormLabel>
                        <FormDescription>
                          Write about your experience, notable cases, and areas of expertise (50-1000 characters)
                        </FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="I am a practicing advocate with expertise in..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Document Upload Info */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Document Verification</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    After form submission, you will receive an email to upload the following documents for verification:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>Bar Council Certificate (mandatory)</li>
                    <li>Photo ID (Aadhaar/PAN/Passport)</li>
                    <li>Professional photograph</li>
                  </ul>
                </div>

                {/* Terms */}
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I confirm that all information provided is accurate and I agree to the{" "}
                          <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                          {" "}and{" "}
                          <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default LawyerSignup;
