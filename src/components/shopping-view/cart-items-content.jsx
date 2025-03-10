import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function UserCartItemsContent({ cartItem }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { toast } = useToast();
    const { productList } = useSelector((state) => state.shopProduct);

    if (!cartItem || typeof cartItem !== "object") {
        return null; // Prevents rendering errors if cartItem is undefined or invalid
    }

    function handleCartItemDelete(getCartItem) {
        dispatch(deleteCartItems({ userId: user?.id, productId: getCartItem?.productId }))
            .unwrap()
            .then(() => {
                toast({
                    title: "Cart Item Removed Successfully",
                    variant: "success",
                });
            })
            .catch(error => console.error("Error deleting cart item:", error));
    }

    function handleUpdateQuantity(getCartItem, typeOfAction) {
        if (!getCartItem || !getCartItem.productId) return;

        // Find the current product in the product list
        const product = productList.find((p) => p._id === getCartItem.productId);
        if (!product) return;

        const totalStock = product.totalStock || 0; // Get total stock of product
        const currentQuantity = getCartItem.quantity || 0; // Current cart item quantity

        if (typeOfAction === "plus") {
            if (currentQuantity + 1 > totalStock) {
                toast({
                    title: `Only ${totalStock} items available in stock`,
                    variant: "destructive",
                });
                return;
            }
        } else if (typeOfAction === "minus" && currentQuantity <= 1) {
            return; // Prevent decreasing below 1
        }

        // Dispatch update cart quantity action
        dispatch(updateCartQuantity({
            userId: user?.id,
            productId: getCartItem.productId,
            quantity: typeOfAction === "plus" ? currentQuantity + 1 : currentQuantity - 1,
        }))
            .unwrap()
            .then(data => {
                if (data?.success) {
                    toast({
                        title: "Cart Item Updated Successfully",
                        variant: "success",
                    });
                }
            })
            .catch(error => console.error("Error updating cart item:", error));
    }

    return (
        <div className="flex items-center space-x-4">
            <img
                src={cartItem?.image}
                alt={cartItem?.title || "Product Image"}
                className="w-20 h-10 rounded object-cover"
            />
            <div className="flex-1">
                <h3 className="font-semibold">{cartItem?.title || "No title available"}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleUpdateQuantity(cartItem, "minus")}
                    >
                        <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">{cartItem?.quantity ?? 0}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleUpdateQuantity(cartItem, "plus")}
                    >
                        <Plus className="w-4 h-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    Rs:{(
                        Number(cartItem?.salePrice && cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
                        Number(cartItem?.quantity || 1)
                    ).toFixed(2)}
                </p>
                <button onClick={() => handleCartItemDelete(cartItem)} aria-label="Remove item">
                    <Trash className="cursor-pointer mt-1" size={20} />
                </button>
            </div>
        </div>
    );
}

export default UserCartItemsContent;
