import { Route, Routes } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"

import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/Login";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProduct from "./pages/admin-view/product";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common-view/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import SearchProduct from "./pages/shopping-view/search";

function App() {
    const { user, isAuthenticated, isLoading } = useSelector(
      (state) => state.auth
    );
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(checkAuth());
    }, [dispatch]);
  
    if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />;
  
    return (
        <div className="flex flex-col overflow-hidden bg-white">
<Routes>
    {/* Auth Routes */}
    <Route
        path="/auth"
        element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
        </CheckAuth>
        }
    >
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
    </Route>

    {/* Admin Routes */}
    <Route
        path="/admin"
        element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
        </CheckAuth>
        }
    >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="product" element={<AdminProduct />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="features" element={<AdminFeatures />} />
    </Route>

    {/* Unified Shop Route: Public + Protected */}
    <Route path="/shop" element={<ShoppingLayout /> }>
        {/* Public Pages */}
        <Route path="home" element={<ShoppingHome isAuthenticated={isAuthenticated} user={user} />} />
        <Route path="listing" element={<ShoppingListing isAuthenticated={isAuthenticated} user={user} />} />
        <Route path="search" element={<SearchProduct isAuthenticated={isAuthenticated} user={user} />} />
   


        {/* Protected Pages */}
        <Route
        path="checkout"
        element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingCheckout />
            </CheckAuth>
        }
        />
        <Route
        path="account"
        element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingAccount />
            </CheckAuth>
        }
        />
    </Route>

    {/* Other Routes */}
    <Route path="/unauth-page" element={<UnauthPage />} />
    <Route path="*" element={<NotFound />} />
    </Routes>
      </div>
    );
  }

export default App;
