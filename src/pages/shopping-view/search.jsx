import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/product-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";


function SearchProduct () {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    
    const [keyword, setKeyword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams([]);
    const dispatch = useDispatch();
    const {searchResults} = useSelector(state => state.shopSearch);
    const {cartItem} = useSelector(state => state.shopCart);
    const {user} = useSelector(state => state.auth);
    const {productDetails} = useSelector(state => state.shopProduct);
    const {toast} = useToast();

    console.log(searchResults, "searchResults");
    useEffect(() => {
        if(keyword && keyword.trim() !== '' && keyword.trim().length > 3){
            setTimeout(()=>{
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword));
            },1000)
        }else{
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResults());
        }
    },[keyword]);



    
      function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
      }




      function handleAddToCart(getCurrentProductId, getTotalStock) {
        console.log(cartItem);
        let getCartItems = cartItem.items || [];
    
        if (getCartItems.length) {
          const indexOfCurrentItem = getCartItems.findIndex(
            (item) => item.productId === getCurrentProductId
          );
          if (indexOfCurrentItem > -1) {
            const getQuantity = getCartItems[indexOfCurrentItem].quantity;
            if (getQuantity + 1 > getTotalStock) {
              toast({
                title: `Only ${getQuantity} quantity can be added for this item`,
                variant: "destructive",
              });
    
              return;
            }
          }
        }
    
        dispatch(
          addToCart({
            userId: user?.id,
            productId: getCurrentProductId,
            quantity: 1,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchCartItems(user?.id));
            toast({
              title: "Product is added to cart",
            });
          }
        });
      }

      useEffect(() => {
        if (productDetails !== null) {
          setOpenDetailsDialog(true);
        }
      }, [productDetails]);





    return (
        <div className="container mx-auto md:px-6 px-4 pt-[104px] px-4 sm:px-10 lg:px-15">
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                    <Input
                        value={keyword}
                        name="keyword"
                        onChange={(e) => setKeyword(e.target.value)}
                        className="py-6 mt-7 "
                        placeholder="Search for products"
                    />
                </div>
            </div>
            {/* {
                ! searchResults.length ? <h3 className="text-3xl items-end text-center font-extrabold py-10 px-4">No Result Found !</h3> : null
            } */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    searchResults && searchResults.length ?
                    searchResults.map(item => <ShoppingProductTile
                         handleAddToCart={handleAddToCart}
                        handleGetProductDetails={handleGetProductDetails}
                           product={item}/>) :null
                    
                }
            </div>
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    );
}

export default SearchProduct;