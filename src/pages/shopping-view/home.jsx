import { Button } from "@/components/ui/button";
import banner1 from "../../assets/banner-1.jpg";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.jpg";

// category
import desktop from "../../assets/desktop.webp";
import laptop from "../../assets/lap.jpeg";
import desktopAccessories from "../../assets/deskacc.jpg";
import laptopAccessories from "../../assets/lapacc.jpg";
import cctvCamera from "../../assets/cctv.jpeg";
import cctvCameraacc from "../../assets/cctvacc.jpg";
import printerAcc from "../../assets/printeracc.png";
import printer from "../../assets/printer.png";

// brand
import dell from "../../assets/dell.png";
import asus from "../../assets/asus.webp";
import msi from "../../assets/msi.png";
import addlink from "../../assets/addlink.webp";
import hikvision from "../../assets/hikvision.jpg";
import hp from "../../assets/hp.png";

import { ChevronLeft, ChevronLeftIcon, ChevronRight, ChevronRightIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/product-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

const CategoryWithImage = [
  { id: "desktop", label: "Desktop", image: desktop },
  { id: "desktopAccessories", label: "Desktop Accessories", image: desktopAccessories },
  { id: "laptop", label: "Laptop", image: laptop },
  { id: "laptopAccessories", label: "Laptop Accessories", image: laptopAccessories },
  { id: "cctvCamera", label: "CCTV Camera", image: cctvCamera },
  { id: "cctvCameraAccessories", label: "CCTV Camera Accessories", image: cctvCameraacc },
  { id: "printer", label: "Printer", image: printer },
  { id: "printerAccessories", label: "Printer Accessories", image: printerAcc },
];

const BrandWithImage = [
  { id: "dell", label: "Dell", image: dell },
  { id: "asus", label: "Asus", image: asus },
  { id: "msi", label: "MSI", image: msi },
  { id: "addlink", label: "Addlink", image: addlink },
  { id: "hikvision", label: "Hikvision", image: hikvision },
  { id: "hp", label: "HP", image: hp },
];

function ShoppingHome() {
  const slides = [banner1, banner2, banner3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProduct);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItem } = useSelector((state) => state.shopCart);

  const scrollRef = useRef(null);
  const maxProducts = 10;

  function handleNavigateListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing/");
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
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
      if (data.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product Added to Cart",
          type: "success",
        });
      }
    });
  }


  // Scroll function for sliding featured products
    const handleScroll = (direction) => {
      if (scrollRef.current) {
        const scrollAmount = 300; // Adjust scroll step size
        scrollRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    };
  



    return (
      <div className="flex flex-col min-h-screen py-10">
      {/* Banner */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/6] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Left Arrow */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
          }
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>

        {/* Right Arrow */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        >
          <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </div>
    
        {/* Categories */}
        <section className="py-10 bg-gray-300 " >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-center mb-8 font-sans">
              Explore Our Categories
            </h2>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {CategoryWithImage.map((Item) => (
                <Card
                  key={Item.id}
                  onClick={() => handleNavigateListingPage(Item, "category")}
                  className="relative cursor-pointer overflow-hidden group rounded-xl transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center brightness-10 group-hover:brightness-100 transition-all duration-300 opacity-80 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${Item.image})` }}
                  ></div>
                  <div className="relative z-10 flex items-center justify-center h-[250px] sm:h-[300px] md:h-[400px] p-6">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-gray-100 text-center drop-shadow-md">
                      {Item.label}
                    </span><n/>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
    
        {/* Brands */}
        <section className="py-10 bg-gray-300">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-center mb-8 font-sans text-gray-950 ">
                Explore Our Brands
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {BrandWithImage.map((Item) => (
                  <Card
                    key={Item.id}
                    onClick={() => handleNavigateListingPage(Item, "brand")}
                    className="cursor-pointer bg-gray-800 hover:bg-gray-700 hover:shadow-xl transition-all rounded-lg"
                  >
                    <CardContent className="flex items-center justify-center p-6 sm:p-8">
                      <img
                        src={Item.image}
                        alt="Brand"
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

    
        {/* Featured Products */}
        <section className="py-10 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Feature Products</h2>

          <div className="relative">
            {/* Left Button */}
            <button 
              onClick={() => handleScroll("left")} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 z-10"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Product List - Scrollable */}
            <div 
              ref={scrollRef} 
              className="flex gap-6 overflow-x-auto no-scrollbar px-8"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {productList.slice(0, maxProducts).map((productItem) => (
                <div key={productItem.id} className="min-w-[250px] md:min-w-[300px] scroll-snap-align-start md:p-20">
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>

            {/* Right Button */}
            <button 
              onClick={() => handleScroll("right")} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

    
        {/* Product Details Dialog */}
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    );
    
}

export default ShoppingHome;
