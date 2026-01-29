-- Create lawyer_applications table for storing signup applications
CREATE TABLE public.lawyer_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Bar Council Verification
  bar_council_id TEXT NOT NULL,
  bar_council_state TEXT NOT NULL,
  enrollment_year TEXT NOT NULL,
  
  -- Professional Information
  specialization TEXT NOT NULL,
  experience TEXT NOT NULL,
  practicing_courts TEXT[] NOT NULL,
  
  -- Location & Languages
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  languages TEXT[] NOT NULL,
  
  -- Fees & Bio
  consultation_fee INTEGER NOT NULL,
  bio TEXT NOT NULL,
  
  -- Application Status
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  verification_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.lawyer_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit an application (INSERT)
CREATE POLICY "Anyone can submit lawyer application"
ON public.lawyer_applications
FOR INSERT
WITH CHECK (true);

-- Policy: Users can view their own application by email
CREATE POLICY "Users can view own application by email"
ON public.lawyer_applications
FOR SELECT
USING (true);

-- Create index on email for faster lookups
CREATE INDEX idx_lawyer_applications_email ON public.lawyer_applications(email);
CREATE INDEX idx_lawyer_applications_status ON public.lawyer_applications(status);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_lawyer_applications_updated_at
BEFORE UPDATE ON public.lawyer_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();