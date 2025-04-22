import { useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag,
  Trash,
  ArrowRight,
  // Package,
  Minus,
  Plus,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatNaira } from "@/services/mockData";
import { stock } from "@/services/mockData";
import { cn } from "@/lib/utils";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, quantity: number) => {
    const product = stock.find((item) => item.id === id);
    const maxQuantity = product ? product.quantity : 10; // Default to 10 if product not found

    if (quantity > maxQuantity) {
      quantity = maxQuantity;
    }

    updateQuantity(id, quantity);
  };

  return (
    <section className="py-10">
      <div className="wrapper space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Your Cart</h1>
          {items.length > 0 && (
            <div>
              <Button
                variant="outline"
                className="border-bliss-500 text-bliss-500 hover:bg-bliss-50 hover:text-bliss-500"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-medium">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button
              className="mt-4 bg-bliss-500 text-white hover:bg-bliss-600"
              onClick={() => navigate("/shop")}
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className="p-3 relative bg-white border shadow-[0_3px_10px_rgba(0,0,0,.06)] border-bliss-200/30"
                >
                  <div className="grid">
                    <div className="grid grid-cols-[64px_1fr] items-center sm:grid-cols-[80px_1fr] gap-2">
                      {/* REMOVE FROM CART */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="absolute size-auto top-4 right-4"
                      >
                        <Trash className="size-3.5 sm:size-4 text-destructive" />
                      </Button>

                      {/* CART ITEM INFO */}
                      <div className="bg-muted aspect-square w-full h-auto sm:h-full rounded-md"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold sm:text-lg">
                          {item.name.slice(0, 20)}...
                        </h3>
                        <p className="text-xs mb-1 text-muted-foreground sm:text-sm">
                          Size: {item.size}
                        </p>
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-bliss-500 text-base">
                            {formatNaira(item.price)}
                          </p>
                          <div className="inline-flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "bg-bliss-500 size-6 rounded",
                                item.quantity <= 1 &&
                                  "bg-bliss-300 cursor-not-allowed"
                              )}
                            >
                              <Minus className="size-4 text-white" />
                            </Button>
                            <Input
                              type="text"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  Number(e.target.value)
                                )
                              }
                              className="text-center font-medium appearance-none rounded size-6 block w-6 text-xs p-0"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-bliss-500 size-6 rounded"
                            >
                              <Plus className="size-4 text-white" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="flex items-center space-x-4">
                      <div className="w-20">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              Number(e.target.value)
                            )
                          }
                          className="text-center"
                        />
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash className="h-5 w-5 text-destructive" />
                      </Button>
                    </div> */}
                  </div>
                </Card>
              ))}
            </div>

            <div className="border-t pt-4 border-neutral-300">
              <div className="flex justify-between text-base font-medium">
                <span className="text-neutral-500">
                  Subtotal ({totalItems} items):
                </span>
                <span className="font-semibold">{formatNaira(totalPrice)}</span>
              </div>

              <Button
                className="w-full mt-4 bg-bliss-500 hover:bg-bliss-600 text-white h-auto py-3"
                onClick={() => navigate("/checkout")}
                disabled={items.length === 0}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
