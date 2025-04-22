// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

export default function CustomInput({ data }: any) {
  switch (data.type) {
    case "text":
    case "email":
      break;

    default:
      break;
  }
}

// const TextField = () => {
//   return (
//     <div className="space-y-2">
//       <Label htmlFor="name">Name</Label>
//       <Input id="name" name="name" />
//     </div>
//   );
// };
