import { DiffIcon, StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/product-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common-view/start-raring";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const [reviewMsg, setReviewMsg] = useState("");
    const [rating, setRating] = useState(0);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { cartItem } = useSelector((state) => state.shopCart);
    const { reviews } = useSelector((state) => state.shopReview);


    function handleRatingChange(getRaring) {
        setRating(getRaring)

    }



      function handleAddToCart(getCurrentProductId, getTotalStock) {
        let getCartItems = cartItem?.items || [];
    
        // Check if the product is already in the cart
        const cartItems = getCartItems.find((item) => item.productId === getCurrentProductId);
        const currentQuantity = cartItems?.quantity || 0;
    
        // Check if adding more exceeds the total stock
        if (currentQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getTotalStock} items available`,
            variant: "destructive",
          });
          return;
        }
        dispatch(
          addToCart({
            userId: user?.id,
            productId: getCurrentProductId,
            quantity: 1
          })
        ).then((data) => {
          if (data.payload?.success) {
            dispatch(fetchCartItems(user?.id));
            toast({
              title: "Product Added to Cart",
              type: "success"
            });
          }
        });
      }

      function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails());
        setRating(0);
        setReviewMsg("");
      }

      function handleAddReview(){
        dispatch(addReview({
            productId: productDetails?._id,
            userId: user?.id,
            userName: user?.userName,
            reviewMessage: reviewMsg,
            reviewValue: rating,
        })).then(data =>{
            if(data.payload?.success){
                dispatch(getReviews(productDetails?._id));
                toast({
                    title: "Review Added Successfully",
                    type: "success"
                })
            }
        })
      }

      useEffect(()=>{
        if(productDetails !== null){
            dispatch(getReviews(productDetails?._id));
        }
      },[productDetails])
      
      const averageReview = reviews && reviews.length > 0 ?
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      reviews.length : 0;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 overflow-y-auto p-4 sm:p-8 max-h-[90vh] w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[70vw]">

                <div className="relative overflow-hidden rounded-lg w-full h-auto">
                    {productDetails?.image && (
                        <img
                            src={productDetails.image}
                            alt={productDetails?.title || "Product Image"}
                            width={500}
                            height={600}
                            className="w-full object-cover rounded-md"
                        />
                    )}
                </div>
                <div className="grid gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold">
                            {productDetails?.title || "No Title Available"}
                        </h1>
                        {/* ✅ Add '-' before new lines */}
                        <div className="text-muted-foreground space-y-2">
                            {productDetails?.description
                                ?.split("\n")
                                .filter(line => line.trim() !== "") // Remove empty lines
                                .map((line, index) => (
                                    <p key={index} className="flex items-start gap-2">
                                        <span className="text-primary">-</span> {line}
                                    </p>
                                )) || "No description available."}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <p
                        className={`text-3xl font-bold text-primary ${
                            productDetails?.salePrice > 0 ? "line-through" : ""
                        }`}
                        >
                        Rs:{productDetails?.price}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                        <p className="text-2xl font-bold text-muted-foreground">
                            Rs:{productDetails?.salePrice}
                        </p>
                        ) : null}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5">
                                    <StarRatingComponent rating={averageReview}/>
                                </div>
                        <span className="text-muted-foreground">{averageReview.toFixed(2)}</span>
                    </div>
                    <div className="mt-5 mb-5">
                        {
                            productDetails?.totalStock === 0 ? (
                            <Button className="w-full opacity-60 cursor-not-allowed" >
                                Out of Stock
                            </Button>):
                            (
                            <Button onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)} className="w-full">
                                Add to Cart
                            </Button>
                            )

                            
                        }

                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-y-auto pr-2">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="grid gap-6 ">
                            {reviews && reviews.length > 0 ? (
                            reviews.map((reviewItem) => (
                            <div className="flex gap-4">
                                    <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>
                                        {reviewItem?.userName[0].toUpperCase()}
                                    </AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                                    </div>
                                    <p className="text-muted-foreground">
                                        {reviewItem.reviewMessage}
                                    </p>
                                    </div>
                                </div>
                                ))
                                ) : (
                                    <h1>No Reviews</h1>
                                )}
                                </div>
                        <div className="mt-10 flex-col flex gap-2">
                            <Label>Write A Review</Label>
                            <div className="flex gap-1">
                                <StarRatingComponent
                                    rating={rating}
                                    handleRatingChange={handleRatingChange}
                                />
                            </div>
                            <Input 
                            placeholder = "Write a review"
                            name = "reviewMsg"
                            value = {reviewMsg}
                            onChange = {(e) => setReviewMsg(e.target.value)}
                            
                            />
                            <Button onClick={handleAddReview} disabled={reviewMsg.trim()===''}>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;
