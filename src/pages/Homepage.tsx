import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <div>
      HomePage
      <Button onClick={() => navigate("/app")}>Go to dashboard</Button>
    </div>
  );
}
