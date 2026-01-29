import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Scale, Mail, Lock, Loader2, User, Briefcase } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["client", "lawyer"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const otpRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const otpVerifySchema = z.object({
  token: z.string().min(6, "OTP must be 6 digits"),
});

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;
type OtpRequestForm = z.infer<typeof otpRequestSchema>;
type OtpVerifyForm = z.infer<typeof otpVerifySchema>;

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading, signUp, signIn, signInWithOtp, verifyOtp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authMode, setAuthMode] = useState<"password" | "otp">("password");
  const [otpSent, setOtpSent] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "", role: "client" },
  });

  const otpRequestForm = useForm<OtpRequestForm>({
    resolver: zodResolver(otpRequestSchema),
    defaultValues: { email: "" },
  });

  const otpVerifyForm = useForm<OtpVerifyForm>({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: { token: "" },
  });

  const handleLogin = async (data: LoginForm) => {
    setIsSubmitting(true);
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message === "Invalid login credentials" 
            ? "Invalid email or password. Please check your credentials."
            : error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate("/");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (data: SignupForm) => {
    setIsSubmitting(true);
    try {
      const { error } = await signUp(data.email, data.password, data.role);
      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            title: "Account Exists",
            description: "This email is already registered. Please login instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpRequest = async (data: OtpRequestForm) => {
    setIsSubmitting(true);
    try {
      const { error } = await signInWithOtp(data.email);
      if (error) {
        toast({
          title: "OTP Request Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setOtpEmail(data.email);
        setOtpSent(true);
        toast({
          title: "OTP Sent!",
          description: "Please check your email for the verification code.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpVerify = async (data: OtpVerifyForm) => {
    setIsSubmitting(true);
    try {
      const { error } = await verifyOtp(otpEmail, data.token);
      if (error) {
        toast({
          title: "Verification Failed",
          description: "Invalid or expired OTP. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome!",
          description: "You have successfully logged in.",
        });
        navigate("/");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Welcome to DAL</h1>
            <p className="text-muted-foreground">Sign in or create an account to continue</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <div className="flex gap-2 mb-6">
                    <Button
                      variant={authMode === "password" ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setAuthMode("password"); setOtpSent(false); }}
                      className="flex-1"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Password
                    </Button>
                    <Button
                      variant={authMode === "otp" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAuthMode("otp")}
                      className="flex-1"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email OTP
                    </Button>
                  </div>

                  {authMode === "password" ? (
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                          Login
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    !otpSent ? (
                      <Form {...otpRequestForm}>
                        <form onSubmit={otpRequestForm.handleSubmit(handleOtpRequest)} className="space-y-4">
                          <FormField
                            control={otpRequestForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            Send OTP
                          </Button>
                        </form>
                      </Form>
                    ) : (
                      <Form {...otpVerifyForm}>
                        <form onSubmit={otpVerifyForm.handleSubmit(handleOtpVerify)} className="space-y-4">
                          <p className="text-sm text-muted-foreground text-center mb-4">
                            We sent a code to <strong>{otpEmail}</strong>
                          </p>
                          <FormField
                            control={otpVerifyForm.control}
                            name="token"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Verification Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="123456" maxLength={6} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            Verify OTP
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={() => setOtpSent(false)}
                          >
                            Use a different email
                          </Button>
                        </form>
                      </Form>
                    )
                  )}
                </TabsContent>

                <TabsContent value="signup">
                  <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                      <FormField
                        control={signupForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>I am a</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 gap-4"
                              >
                                <div>
                                  <RadioGroupItem
                                    value="client"
                                    id="client"
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor="client"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                  >
                                    <User className="mb-2 h-6 w-6" />
                                    Client
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem
                                    value="lawyer"
                                    id="lawyer"
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor="lawyer"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                  >
                                    <Briefcase className="mb-2 h-6 w-6" />
                                    Lawyer
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        Create Account
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
