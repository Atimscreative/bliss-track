import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCart } from "@/hooks/useCart";
import { formatNaira } from "@/services/mockData";
import { useAuth } from "@/hooks/useAuth";

// Form schema
const formSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  // const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "Lagos",
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    // In a real app, you would send this data to your backend/API
    setIsSubmitting(true);
    console.log(values);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate a random order ID
      // const orderId = `ORD-${Math.random()
      //   .toString(36)
      //   .substring(2, 10)
      //   .toUpperCase()}`;

      // Create order object to save
      // const order = {
      //   id: orderId,
      //   customer: values.fullName,
      //   email: values.email,
      //   phone: values.phone,
      //   address: {
      //     street: values.address,
      //     city: values.city,
      //     state: values.state,
      //   },
      //   items: items.map((item) => ({
      //     id: item.id,
      //     name: item.name,
      //     size: item.size,
      //     quantity: item.quantity,
      //     pricePerUnit: item.price,
      //     total: item.price * item.quantity,
      //   })),
      //   totalAmount: totalPrice,
      //   date: new Date().toISOString(),
      //   status: "pending",
      // };

      // Success! Clear cart and redirect
      clearCart();

      // toast({
      //   title: "Order placed successfully!",
      //   description: `Your order #${orderId} has been received and is being processed.`,
      // });

      // In a real app, you would redirect to an order confirmation page
      // with the new order details
      navigate("/orders");
    } catch (error) {
      console.log(error);

      // toast({
      //   variant: "destructive",
      //   title: "Something went wrong",
      //   description: "Your order could not be processed. Please try again.",
      // });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <section className="py-10">
      <div className="space-y-6 wrapper">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Checkout</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Shipping Information
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Your street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </form>
              </Form>
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatNaira(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="font-medium">{formatNaira(totalPrice)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p className="font-medium">Free</p>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <p>Total</p>
                  <p>{formatNaira(totalPrice)}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
