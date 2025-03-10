import { Facebook, Menu, Phone, ShoppingCart, UserCog, LogOut, } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { logoutUser } from "@/store/auth-slice";
import { fetchCartItems } from "@/store/shop/cart-slice";
import UserCartWrapper from "./cart-wrapper";
import { shoppingViewHeaderMenuItems } from "@/config";
import logo from "../../assets/logo.png";

function TopContactBar() {
  return (
    <div className="w-full bg-red-600 text-white text-sm px-4 py-2 flex justify-between items-center">
      <div className="flex items-center gap-3">
      </div>
      <div className="flex gap-4 items-center">
        <span> Contact Us:077 753 9333</span>|
        <a
          href="https://web.facebook.com/ozonecomputerslk/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200"
        >
          <Facebook className="w-4 h-4" />
        </a>
        <a
          href="https://wa.me/94777539333"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-200"
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigateListingPage(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !== "products" && getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigateListingPage(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function UnauthHeaderContent() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-3">
      <Button variant="outline" onClick={() => navigate("/auth/login")}>
        Login
      </Button>
      <Button onClick={() => navigate("/auth/register")}>Register</Button>
    </div>
  );
}

function HeaderRightContent() {
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartItem } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    navigate("/shop/home");
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);


  return (
    <div className="flex lg:items-center lg:flex-row gap-5">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-1px] right-[6.5px] font-bold text-sm">
            {cartItem?.items?.length ?? 0}
          </span>
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItem={cartItem?.items?.length > 0 ? cartItem.items : []}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black rounded-full w-9 h-9 items-center flex">
            <AvatarFallback className="bg-black text-white font-bold">
              {user?.userName?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  return (
    <>
      
      <header className="fixed top-0 left-0 w-full z-50 border-b bg-background shadow-md">
      <TopContactBar  />
        <div className="flex h-16 items-center justify-between px-10 md:px-5">
          <Link to={"/shop/home"} className="flex items-center gap-2">
            <img src={logo} alt="Ozone Computers" className="h-10 w-10" />
            <span className="font-bold">Ozone Computers</span>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              <MenuItems />
              {isAuthenticated ? <HeaderRightContent /> : <UnauthHeaderContent />}
            </SheetContent>
          </Sheet>

          <div className="hidden lg:block">
            <MenuItems />
          </div>

          <div className="hidden lg:block">
            {isAuthenticated ? <HeaderRightContent /> : <UnauthHeaderContent />}
          </div>
        </div>
      </header>
    </>
  );
}

export default ShoppingHeader;
