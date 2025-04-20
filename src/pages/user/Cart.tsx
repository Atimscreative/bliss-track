import { useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Trash, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatNaira } from "@/services/mockData";
import { stock } from "@/services/mockData";

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <div>
          <Button variant="ghost" onClick={() => navigate("/shop")}>
            Continue Shopping
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-medium">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button className="mt-4" onClick={() => navigate("/shop")}>
            Browse Products
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size}
                    </p>
                    <p className="font-medium text-primary">
                      {formatNaira(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-20">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, Number(e.target.value))
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
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Subtotal ({totalItems} items):</span>
              <span>{formatNaira(totalPrice)}</span>
            </div>

            <Button
              className="w-full mt-4"
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
  );
};

export default Cart;
