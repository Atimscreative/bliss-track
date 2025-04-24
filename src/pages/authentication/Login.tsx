import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import CustomInput from "@/components/widgets/forms/CustomInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Login Form Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { isLoading } = useAuth();
  // const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    // watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    // e.preventDefault();
    try {
      // await login(email, password);
      // navigate("/admin");
      console.log(data);
      reset();
    } catch (err) {
      // Error is already handled in the auth context
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bliss-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-bliss-500">BlissTrack</h1>
          <p className="text-gray-600">Oluwaseyi Bliss Beddings</p>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-neutral-800 text-center ">
              Login
            </CardTitle>
            <CardDescription className="text-center text-neutral-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {adminLogin?.map((data, i) => {
                return (
                  <CustomInput
                    key={i}
                    {...{ data, register, control, errors }}
                  />
                );
              })}
              {/* <div className="space-y-2">
                <Label htmlFor="email" className="text-neutral-600">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-neutral-300 h-10 focus-visible:ring-2 focus-visible:ring-bliss-500 focus-visible:border-0 text-neutral-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-neutral-600">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-neutral-300 h-10 focus-visible:ring-2 focus-visible:ring-bliss-500 focus-visible:border-0 text-neutral-600"
                  required
                />
              </div> */}
              {/* {error && (
                <div className="bg-red-100 p-3 rounded-md text-red-700 text-sm">
                  {error}
                </div>
              )} */}
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-bliss-500 hover:bg-bliss-600 h-10 mt-6 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo credentials:</p>
          <p>Email: admin@blisstrack.com</p>
          <p>Password: any password will work for demo</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

const adminLogin = [
  {
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
    errorMessage: "Email is required",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Your password",
    required: true,
    errorMessage: "Your password is required",
  },
];
