import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tag } from "lucide-react";
import { BedsheetPrice } from "@/types";
import { prices } from "@/services/mockData";
import { formatNaira } from "@/services/mockData";

const Pricing = () => {
  const [currentPrices, setCurrentPrices] = useState<BedsheetPrice[]>(prices);
  const [editMode, setEditMode] = useState(false);

  const handleUpdatePrice = (size: string, newPrice: number) => {
    setCurrentPrices((prev) =>
      prev.map((p) => (p.size === size ? { ...p, price: Number(newPrice) } : p))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold  tracking-tight text-neutral-800">
          Pricing
        </h1>
        <Button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Save Changes" : "Update Prices"}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {currentPrices.map((price) => (
          <Card key={price.size} className="p-4">
            <div className="flex items-start space-x-4">
              <Tag className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <Label className="text-lg font-medium">
                  {price.size} Bedsheet
                </Label>
                {editMode ? (
                  <div className="mt-2">
                    <Input
                      type="number"
                      value={price.price}
                      onChange={(e) =>
                        handleUpdatePrice(price.size, Number(e.target.value))
                      }
                      className="text-lg font-bold"
                    />
                  </div>
                ) : (
                  <p className="text-lg font-bold text-primary mt-2">
                    {formatNaira(price.price)}
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
