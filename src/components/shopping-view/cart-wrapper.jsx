import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItem , setOpenCartSheet}) {

    const navigate = useNavigate();
    // Calculate total price safely
    const totalCartAmount = cartItem && cartItem.length > 0
        ? cartItem.reduce((sum, currentItem) => 
            sum + (Number(currentItem?.salePrice) > 0 
                ? Number(currentItem?.salePrice) 
                : Number(currentItem?.price || 0)) * Number(currentItem?.quantity || 1)
          , 0)
        : 0;

    return (
        <SheetContent className="sm:max-w-md">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>

            <div className="mt-8 space-y-4">
                {cartItem?.length > 0 ? (
                    cartItem.map(item => <UserCartItemsContent key={item.productId} cartItem={item} />)
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                )}
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Subtotal</span>
                    <span className="font-bold">Rs:{totalCartAmount.toFixed(2)}</span>
                </div>
            </div>

            <Button 
            onClick={()=>{ navigate('/shop/checkout');
                setOpenCartSheet(false);
            }}
            className="w-full mt-6">Checkout</Button>
        </SheetContent>
    );
}

export default UserCartWrapper;
