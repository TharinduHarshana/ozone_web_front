import { Outlet } from "react-router-dom";
import image from "../../assets/cover.jpg";

function AuthLayout() {
    return (
        <div className="flex min-h-screen">
            {/* Left side with image (hidden on small screens) */}
            <div className="hidden lg:flex items-center justify-center bg-black w-1/2">
                <img
                    src={image}
                    alt="Welcome Visual"
                    className="h-full w-full aspect-w-4 aspect-h-3 object-cover"
                />
            </div>

            {/* Right side with auth form */}
            <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
