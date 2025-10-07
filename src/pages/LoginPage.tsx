import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scissors, Users, User, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"admin" | "staff" | "customer" | "deliverer">("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .single()
          .then(({ data: roleData }) => {
            if (roleData?.role === "customer") {
              navigate("/user/dashboard", { replace: true });
            } else if (roleData?.role === "deliverer") {
              navigate("/deliverer/dashboard", { replace: true });
            } else if (["admin", "staff"].includes(roleData?.role || "")) {
              navigate("/dashboard", { replace: true });
            }
          });
      }
      setCheckingAuth(false);
    });
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const { error: validationError } = signInSchema.safeParse({ email, password });
        if (validationError) {
            throw new Error(validationError.errors.map(e => e.message).join(', '));
        }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .single();

      if (activeTab === "admin") {
        if (roleData?.role === "admin") {
          navigate("/dashboard");
        } else {
          await supabase.auth.signOut();
          throw new Error("This login is for administrators only.");
        }
      } else if (activeTab === "staff") {
        if (roleData?.role === "staff") {
          navigate("/dashboard");
        } else {
          await supabase.auth.signOut();
          throw new Error("This login is for staff only. Please use the appropriate tab.");
        }
      } else if (activeTab === "deliverer") {
        if (roleData?.role === "deliverer") {
          navigate("/deliverer/dashboard");
        } else {
          await supabase.auth.signOut();
          throw new Error("This login is for deliverers only. Please use the appropriate tab.");
        }
      } else { // customer
        if (roleData?.role === "customer") {
          navigate("/user/dashboard");
        } else {
          await supabase.auth.signOut();
          throw new Error("This login is for customers only. Please use the Staff tab for staff login.");
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Scissors className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Login to TailorPro</CardTitle>
          <CardDescription>
            Choose your login type to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "admin" | "staff" | "customer" | "deliverer")} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="admin" className="flex items-center gap-1 text-xs sm:text-sm">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </TabsTrigger>
              <TabsTrigger value="staff" className="flex items-center gap-1 text-xs sm:text-sm">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Staff</span>
              </TabsTrigger>
              <TabsTrigger value="deliverer" className="flex items-center gap-1 text-xs sm:text-sm">
                <Truck className="h-4 w-4" />
                <span className="hidden sm:inline">Deliverer</span>
              </TabsTrigger>
              <TabsTrigger value="customer" className="flex items-center gap-1 text-xs sm:text-sm">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Customer</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}