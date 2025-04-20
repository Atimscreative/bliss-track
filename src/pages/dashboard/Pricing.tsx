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
        <Button
          className="bg-bliss-500 text-white hover:bg-bliss-500"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Save Changes" : "Update Prices"}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {currentPrices.map((price) => (
          <Card
            key={price.size}
            className="p-4 shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80"
          >
            <div className="flex items-start space-x-4">
              <Tag size={20} className="text-bliss-500 translate-x-1" />
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
                      className="text-lg font-medium"
                    />
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-bliss-500 mt-2">
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
