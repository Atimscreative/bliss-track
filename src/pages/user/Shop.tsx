import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Package } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
import { stock } from "@/services/mockData";
import { prices, formatNaira } from "@/services/mockData";
import { BedSize } from "@/types";
import { useCart } from "@/hooks/useCart";

const Shop = () => {
  // const { toast } = useToast();
  const { addToCart } = useCart();
  const [filter, setFilter] = useState<string>("all");

  // Filter products that are bedsheets with stock
  const products = stock.filter(
    (item) => item.type === "bedsheet" && item.quantity > 0
  );

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((item) => item.size === filter);

  const handleAddToCart = (productId: string, size: BedSize, name: string) => {
    const product = stock.find((item) => item.id === productId);
    const priceInfo = prices.find((p) => p.size === size);

    if (product && priceInfo) {
      addToCart({
        id: productId,
        name,
        size,
        price: priceInfo.price,
        quantity: 1,
      });

      // toast({
      //   title: "Added to cart",
      //   description: `${name} has been added to your cart.`,
      // });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shop</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          {prices.map((price) => (
            <Button
              key={price.size}
              variant={filter === price.size ? "default" : "outline"}
              onClick={() => setFilter(price.size)}
            >
              {price.size}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => {
          const priceInfo = prices.find((p) => p.size === product.size);
          return (
            <Card key={product.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      Size: {product.size}
                    </p>
                  </div>
                  {product.quantity <= product.alertThreshold && (
                    <Badge variant="destructive">Low Stock</Badge>
                  )}
                </div>

                <div className="bg-muted aspect-video rounded-md mb-4 flex items-center justify-center">
                  <Package className="h-16 w-16 text-muted-foreground opacity-50" />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">
                      {priceInfo
                        ? formatNaira(priceInfo.price)
                        : "Price not available"}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {product.quantity} in stock
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      handleAddToCart(
                        product.id,
                        product.size as BedSize,
                        product.name
                      )
                    }
                    disabled={product.quantity <= 0}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-muted-foreground">
              Try changing your filter or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
