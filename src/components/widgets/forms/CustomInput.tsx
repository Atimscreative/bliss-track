// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
export type FieldProps = {
  data: any;
  errors?: any;
  register?: any;
  control?: any;
};

import { Label } from "@/components/ui/label";
import TextField from "./form-fields/TextField";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomInput({
  data,
  errors,
  register,
  control,
}: FieldProps) {
  switch (data.type) {
    case "text":
    case "email":
      return <TextField {...{ data, errors, register }} />;
    case "password":
    case "confirmPassword":
      return <PasswordField {...{ data, errors, register }} />;

    default:
      break;
  }
}

function PasswordField({ data, register, errors }: FieldProps) {
  const [show, setShow] = useState(false);

  const toggleVisibility = () => setShow((prev) => !prev);

  return (
    <div className="space-y-2">
      <Label htmlFor={data?.name} className="text-neutral-600 gap-1">
        {data?.label}
        {data?.required && (
          <sup className="text-red-500 top-0 text-base font-medium">*</sup>
        )}
      </Label>
      <div className="w-full relative">
        <Input
          {...register(data.name)}
          id={data?.name}
          type={show ? "text" : "password"}
          placeholder={data?.placeholder}
          className={cn(
            "border w-full border-neutral-300 h-10 focus-visible:ring-2 focus-visible:ring-bliss-500 focus-visible:border-0 text-neutral-600",

            errors[data?.name] &&
              "border-red-500 border focus-visible:ring-red-500"
          )}
        />
        <span
          onClick={toggleVisibility}
          className="text-neutral-400 absolute top-1/2 right-3 -translate-y-1/2"
        >
          {show ? <Eye size={20} /> : <EyeClosed size={20} />}
        </span>
      </div>
      {errors[data?.name] && (
        <p className="text-red-500 text-sm mt-2">
          {errors[data.name].message as string}
        </p>
      )}
    </div>
  );
}
