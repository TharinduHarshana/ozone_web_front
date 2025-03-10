import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer"; // Make sure this path is correct

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {/* Common Header */}
      <ShoppingHeader />

      {/* Main content grows to fill available space */}
      <main className="flex-grow flex flex-col w-full">
        <Outlet />
      </main>

      {/* Common Footer */}
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;
