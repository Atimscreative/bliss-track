import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Package } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
import { stock } from "@/services/mockData";
import { prices, formatNaira } from "@/services/mockData";
import { BedSize } from "@/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart } from "@/redux/features/cart/cartSlice";

const Shop = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
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
      dispatch(
        addToCart({
          id: productId,
          name,
          size,
          price: priceInfo.price,
          quantity: 1,
        })
      );
    }
  };

  console.log(cart, "RED");

  return (
    <section className="wrapper py-10">
      <div className="rounded-2xl mb-8 p-6 bg-gradient-to-br from-bliss-800 to-bliss-600">
        <h1 className="text-white text-2xl mb-2 font-semibold">
          Experience Luxury in Every Sleep
        </h1>
        <p className="text-bliss-100">
          Discover our premium collection of bedsheets crafted for your perfect
          night's sleep.
        </p>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold">All products</h2>
          <div className="flex items-center space-x-2">
            {/* <Button
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
            ))} */}

            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Sizes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" onClick={() => setFilter("all")}>
                  All Sizes
                </SelectItem>
                {prices.map((price) => (
                  <SelectItem
                    onClick={() => setFilter(price.size)}
                    key={price.size}
                    value={price.size}
                  >
                    {price.size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const priceInfo = prices.find((p) => p.size === product.size);
            return (
              <Card
                key={product.id}
                className="bg-white border shadow-[0_0_10px_rgba(0,0,0,.02)] border-bliss-200/80"
              >
                <CardContent className="">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-base">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Size: {product.size}
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted aspect-video rounded-md mb-4 flex items-center justify-center">
                    <Package className="h-16 w-16 text-muted-foreground opacity-50" />
                  </div>

                  <div className="flex flex-wrap gap-3 justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">
                        {priceInfo
                          ? formatNaira(priceInfo.price)
                          : "Price not available"}
                      </p>
                      {/* <p className="text-muted-foreground text-sm">
                        {product.quantity} in stock
                      </p> */}
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
                      className={cn(
                        "text-white",
                        product.quantity <= 0
                          ? "bg-red-500"
                          : "bg-bliss-500 hover:bg-bliss-600"
                      )}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      {product.quantity <= 0 ? "Out of Stock" : "Add to Cart"}
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
    </section>
  );
};

export default Shop;
