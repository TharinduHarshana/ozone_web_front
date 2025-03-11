import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
  const { toast } = useToast();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleCartClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please log in to add items to your cart.",
        variant: "destructive",
      });
      return;
    }
    handleAddToCart(product?._id, product?.totalStock);
  };

  return (
    <Card className="w-full sm:w-[300px] max-w-sm h-[550px] flex flex-col justify-between">
      <div onClick={() => handleGetProductDetails(product?._id)} className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Out Of Stock</Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {`Only ${product?.totalStock} items left`}
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Sale</Badge>
        ) : null}
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[16px] text-muted-foreground">
            {categoryOptionsMap[product?.category]}
          </span>
          <span className="text-[16px] text-muted-foreground">
            {brandOptionsMap[product?.brand]}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            Rs:{product?.price}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-lg font-semibold text-primary">Rs:{product?.salePrice}</span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCartClick} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
