// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { DollarSign, ShoppingBag, Clock, CheckCircle, Plus, ArrowRight } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";

// interface DashboardStats {
//   totalOrders: number;
//   pendingOrders: number;
//   totalRevenue: number;
//   outstandingBalance: number;
// }

// interface RecentOrder {
//   id: string;
//   customer_name: string;
//   total_price: number;
//   remaining_balance: number;
//   status: string;
//   created_at: string;
// }

// export default function Dashboard() {
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       // Fetch stats
//       const { data: orders, error: ordersError } = await supabase
//         .from("orders")
//         .select("total_price, remaining_balance, status");

//       if (ordersError) throw ordersError;

//       const stats: DashboardStats = {
//         totalOrders: orders?.length || 0,
//         pendingOrders: orders?.filter(o => o.status !== 'paid').length || 0,
//         totalRevenue: orders?.reduce((sum, o) => sum + Number(o.total_price), 0) || 0,
//         outstandingBalance: orders?.reduce((sum, o) => sum + Number(o.remaining_balance), 0) || 0,
//       };

//       setStats(stats);

//       // Fetch recent orders
//       const { data: recent, error: recentError } = await supabase
//         .from("orders")
//         .select("id, customer_name, total_price, remaining_balance, status, created_at")
//         .order("created_at", { ascending: false })
//         .limit(5);

//       if (recentError) throw recentError;
//       setRecentOrders(recent || []);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'paid':
//         return 'bg-green-500/10 text-green-700 dark:text-green-400';
//       case 'partial':
//         return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
//       default:
//         return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <Skeleton className="h-8 w-48" />
//           <Skeleton className="h-10 w-32" />
//         </div>
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//           {[1, 2, 3, 4].map((i) => (
//             <Card key={i}>
//               <CardHeader className="pb-2">
//                 <Skeleton className="h-4 w-24" />
//               </CardHeader>
//               <CardContent>
//                 <Skeleton className="h-8 w-32" />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 animate-in fade-in duration-500">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">Dashboard</h1>
//           <p className="text-muted-foreground mt-1">Overview of your tailor shop</p>
//         </div>
//         <Link to="/orders/new">
//           <Button className="gap-2 gradient-primary text-white hover:opacity-90">
//             <Plus className="w-4 h-4" />
//             New Order
//           </Button>
//         </Link>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card className="transition-smooth hover:shadow-md">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Total Orders
//             </CardTitle>
//             <ShoppingBag className="w-4 h-4 text-primary" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats?.totalOrders || 0}</div>
//           </CardContent>
//         </Card>

//         <Card className="transition-smooth hover:shadow-md">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Pending Orders
//             </CardTitle>
//             <Clock className="w-4 h-4 text-yellow-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats?.pendingOrders || 0}</div>
//           </CardContent>
//         </Card>

//         <Card className="transition-smooth hover:shadow-md">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Total Revenue
//             </CardTitle>
//             <DollarSign className="w-4 h-4 text-green-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               ${stats?.totalRevenue.toFixed(2) || "0.00"}
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="transition-smooth hover:shadow-md">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Outstanding
//             </CardTitle>
//             <CheckCircle className="w-4 h-4 text-blue-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               ${stats?.outstandingBalance.toFixed(2) || "0.00"}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Orders */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle>Recent Orders</CardTitle>
//               <CardDescription>Latest orders from your shop</CardDescription>
//             </div>
//             <Link to="/orders">
//               <Button variant="ghost" size="sm" className="gap-2">
//                 View All
//                 <ArrowRight className="w-4 h-4" />
//               </Button>
//             </Link>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {recentOrders.length === 0 ? (
//             <div className="text-center py-8 text-muted-foreground">
//               <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
//               <p>No orders yet. Create your first order!</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {recentOrders.map((order) => (
//                 <Link
//                   key={order.id}
//                   to={`/orders/${order.id}`}
//                   className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-smooth"
//                 >
//                   <div className="space-y-1">
//                     <p className="font-medium">{order.customer_name}</p>
//                     <div className="flex items-center gap-2">
//                       <Badge variant="secondary" className={getStatusColor(order.status)}>
//                         {order.status}
//                       </Badge>
//                       <span className="text-sm text-muted-foreground">
//                         {new Date(order.created_at).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold">${Number(order.total_price).toFixed(2)}</p>
//                     {Number(order.remaining_balance) > 0 && (
//                       <p className="text-sm text-muted-foreground">
//                         ${Number(order.remaining_balance).toFixed(2)} due
//                       </p>
//                     )}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ShoppingBag, Clock, CheckCircle, Plus, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  outstandingBalance: number;
}

interface RecentOrder {
  id: string;
  customer_name: string;
  total_price: number;
  remaining_balance: number;
  status: string;
  created_at: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("total_price, remaining_balance, status, created_at, customer_name, id");

      if (ordersError) throw ordersError;

      const stats: DashboardStats = {
        totalOrders: orders?.length || 0,
        pendingOrders: orders?.filter(o => o.status !== 'paid').length || 0,
        totalRevenue: orders?.reduce((sum, o) => sum + Number(o.total_price), 0) || 0,
        outstandingBalance: orders?.reduce((sum, o) => sum + Number(o.remaining_balance), 0) || 0,
      };

      setStats(stats);

      const recent = (orders || [])
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

      setRecentOrders(recent);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'partial':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your tailor shop</p>
        </div>
        <Link to="/orders/new">
          <Button className="gap-2 gradient-primary text-white hover:opacity-90">
            <Plus className="w-4 h-4" />
            New Order
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-semibold uppercase">Total Orders</CardTitle>
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalOrders || 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-white shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-semibold uppercase">Pending Orders</CardTitle>
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.pendingOrders || 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-semibold uppercase">Total Revenue</CardTitle>
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats?.totalRevenue.toLocaleString('en-ET', { style: 'currency', currency: 'ETB' }) || "ETB 0.00"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-semibold uppercase">Outstanding</CardTitle>
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats?.outstandingBalance.toLocaleString('en-ET', { style: 'currency', currency: 'ETB' }) || "ETB 0.00"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your shop</CardDescription>
          </div>
          <Link to="/orders">
            <Button variant="ghost" size="sm" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No orders yet. Create your first order!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {recentOrders.map(order => (
                <Link
                  key={order.id}
                  to={`/orders/${order.id}`}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-105 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-lg">{order.customer_name}</p>
                    <Badge className={`${getStatusColor(order.status)} rounded-full px-3 py-1 mt-1`}>
                      {order.status.toUpperCase()}
                    </Badge>
                    <p className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {Number(order.total_price).toLocaleString('en-ET', { style: 'currency', currency: 'ETB' })}
                    </p>
                    {Number(order.remaining_balance) > 0 && (
                      <p className="text-sm text-red-500">
                        {Number(order.remaining_balance).toLocaleString('en-ET', { style: 'currency', currency: 'ETB' })} due
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
