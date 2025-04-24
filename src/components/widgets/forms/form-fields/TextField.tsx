import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldProps } from "../CustomInput";
import { cn } from "@/lib/utils";

export default function TextField({ data, register, errors }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={data?.name} className="text-neutral-600 gap-1">
        {data?.label}
        {data?.required && (
          <sup className="text-red-500 top-0 text-base font-medium">*</sup>
        )}
      </Label>
      <Input
        {...register(data.name)}
        id={data?.name}
        type={data?.type}
        placeholder={data?.placeholder}
        className={cn(
          "border w-full border-neutral-300 h-10 focus-visible:ring-2 focus-visible:ring-bliss-500 focus-visible:border-0 text-neutral-600",

          errors[data?.name] &&
            "border-red-500 border focus-visible:ring-red-500"
        )}
      />
      {errors[data?.name] && (
        <p className="text-red-500 text-sm mt-2">
          {errors[data.name].message as string}
        </p>
      )}
    </div>
  );
}

// {
//   type: "",
//   name: "",
//   label: "",
//   placeholder: "",
//   required: true,
//   errorMessage: "",
// },
