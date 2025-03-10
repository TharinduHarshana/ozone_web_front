import Address from '@/components/shopping-view/address';
import image from '../../assets/accCover.webp';
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemsContent from '@/components/shopping-view/cart-items-content';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createNewOrder } from '@/store/shop/order-slice';
import { clearCart } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';

function ShoppingCheckout() {
  const { cartItem } = useSelector((state) => state.shopCart) || {}; // Ensure cartItem is at least an empty object
  const { user } = useSelector((state) => state.auth);
  console.log(user?.id, "user id");
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const {toast} = useToast();

  // Ensure cartItem.items is always an array to prevent errors
  const totalCartAmount = cartItem?.items?.length > 0
    ? cartItem.items.reduce((sum, currentItem) => 
        sum + (Number(currentItem?.salePrice) > 0 
            ? Number(currentItem?.salePrice) 
            : Number(currentItem?.price || 0)) * Number(currentItem?.quantity || 1)
      , 0)
    : 0;

  const orderData = {
    userId: user?.id,
    cartItems: cartItem?.items?.map(singleCartItem => ({
      productId: singleCartItem?.productId,
      title: singleCartItem?.title,
      image: singleCartItem?.image,
      price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
      quantity: singleCartItem?.quantity,
    })) || [],
    addressInfo: currentSelectedAddress
      ? {
          addressId: currentSelectedAddress?._id,
          address: currentSelectedAddress?.address,
          city: currentSelectedAddress?.city,
          pincode: currentSelectedAddress?.postalCode,
          phone: currentSelectedAddress?.phone,
          notes: currentSelectedAddress?.notes,
        }
      : null,
    orderStatus: "pending",
    totalAmount: totalCartAmount,
    orderDate: new Date(),
    orderUpdateDate: new Date(),
    cartId: cartItem?._id,
  };

  function handleSubmitOrder() {
    if (cartItem?.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to cart to proceed",
        variant: "destructive",
    });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select an address to proceed",
        variant: "destructive",
    });
      return;
    }

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        dispatch(clearCart(user?.id)).then((clearCartResponse) => {
          if (clearCartResponse?.payload?.success) {
            toast({ title: "Order placed successfully!", variant: "success" });
          } else {
            toast({ title: "Order placed, but failed to clear cart.", variant: "warning" });
          }
        });
      } else {
        toast({ title: "Failed to place order.", variant: "destructive" });
      }
    });
}    

  return (
    <div className="flex flex-col">
      {/* Cover Image */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={image}
          alt="cover"
          className="object-cover w-full h-full object-center"
        />
      </div>

      {/* Checkout Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-6">
        {/* Address Section */}
        <Address selectedId={currentSelectedAddress}  setCurrentSelectedAddress={setCurrentSelectedAddress} />

        {/* Cart Items Section */}
        <div className="flex flex-col gap-5">
          {cartItem?.items?.length > 0 ? (
            cartItem.items.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
          ) : (
            <p className="text-center text-gray-500">No items in cart.</p>
          )}

          {/* Order Summary */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Subtotal</span>
              <span className="font-bold">Rs:{totalCartAmount.toFixed(2)}</span>
            </div>

            {/* Submit Order Button */}
            <div className="mt-4 w-full">
              <Button onClick={handleSubmitOrder} className="w-full">
                Submit Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
