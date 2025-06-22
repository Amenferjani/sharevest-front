"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMutation } from "@tanstack/react-query"
import { registerUser, loginUser, googleAuth, getRedirectRoute } from "@/services/auth/service"
import { UserRole } from "@/types/types"
import { useSearchParams } from 'next/navigation';
import { toast } from "@/hooks/use-toast"; 


export default function LoginForm() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      const rolesArray = Array.isArray(data.user?.role)
        ? data.user.role
        : [];

      const roles: UserRole[] = rolesArray.map(r => r.name as UserRole);

      const target = getRedirectRoute(roles);
      console.log("redirecting to:", target);
      router.push(target);
    },
    onError: (err) => {
      console.error("Login failed:", err);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(data);
      // Redirect or show message
      router.push("/login")
    },
    onError: (error) => {
      console.error("Registration failed:", error)
    },
  })

  const googleAuthMutation = useMutation({
    mutationFn: googleAuth,
    onSuccess: () => {},
    onError: (error) => {
      console.error("Google login failed:", error)
    },
  })

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setErrorMessage(decodeURIComponent(error));
    }
  }, [searchParams]);

  // Trigger toast only when errorMessage is set
  useEffect(() => {
    if (errorMessage) {
      toast({
        title: "Login Error",
        description: errorMessage,
        variant: "destructive",
      });

      // Optional: Clean the query param
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      window.history.replaceState({}, "", url.toString());
    }
  }, [errorMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    console.log("logging")
    loginMutation.mutate(
      { email:email, pass:password },
      {
        onSettled: () => setIsLoading(false),
      }
    )
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordSignup !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    registerMutation.mutate(
      {
        username: `${lastName} ${firstName}`,
        email: emailSignup,
        password: passwordSignup,
      },
      {
        onSettled: () => {
          router.replace('/login');
          setIsLoading(false)
        },
      }
    );
  };


  return (
    <div className="w-full max-w-md px-4">
      <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="bg-black border-zinc-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">ShareVest</CardTitle>
          <CardDescription className="text-gray-400">Access your investment dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-zinc-900">
              <TabsTrigger value="login" className="text-white data-[state=active]:bg-zinc-800">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-white data-[state=active]:bg-zinc-800">
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    // id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    {/* <Link href="#" className="text-sm text-emerald-500 hover:text-emerald-400">
                      Forgot password?
                    </Link> */}
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
                {/* <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-zinc-700 data-[state=checked]:bg-emerald-600" />
                  <Label htmlFor="remember" className="text-sm font-normal text-white">
                    Remember me
                  </Label>
                </div> */}
                <Button type="submit" className=" w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="bg-zinc-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black px-2 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800"
                  type="button"
                  onClick={() => googleAuthMutation.mutate()}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="bg-zinc-900 border-zinc-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="bg-zinc-900 border-zinc-800 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="name@example.com"
                    value={emailSignup}
                    onChange={(e) => setEmailSignup(e.target.value)}
                    required
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password-signup"
                    type="password"
                    value={passwordSignup}
                    onChange={(e) => setPasswordSignup(e.target.value)}
                    required
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-zinc-900 border-zinc-800 text-white"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required className="border-zinc-700 data-[state=checked]:bg-emerald-600" />
                  <Label htmlFor="terms" className="text-sm font-normal text-white">
                    I agree to the{" "}
                    <Link href="#" className="text-emerald-500 hover:text-emerald-400">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-emerald-500 hover:text-emerald-400">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-gray-400 mt-2">
            Need help?{" "}
            <Link href="#" className="text-emerald-500 hover:text-emerald-400 font-medium">
              Contact support
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
