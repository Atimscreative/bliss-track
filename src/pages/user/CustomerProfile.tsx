import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BillingAddress } from "@/types";
import AddressForm from "@/components/widgets/AddressForm";
// import { useToast } from "@/hooks/use-toast";
import { Edit, Trash, Plus, MapPin } from "lucide-react";

const CustomerProfile = () => {
  const { currentUser } = useAuth();
  // const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState<BillingAddress | null>(
    null
  );
  const [addresses, setAddresses] = useState<BillingAddress[]>([]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // toast({
    //   title: "Profile Updated",
    //   description: "Your profile has been updated successfully.",
    // });
  };

  const handleAddAddress = (address: Partial<BillingAddress>) => {
    const newAddress = {
      ...address,
      id: crypto.randomUUID(),
      userId: currentUser?.id || "",
      isDefault: addresses.length === 0,
    } as BillingAddress;

    setAddresses([...addresses, newAddress]);
    setEditingAddress(null);
  };

  const handleUpdateAddress = (updatedAddress: Partial<BillingAddress>) => {
    if (!editingAddress) return;

    setAddresses(
      addresses.map((addr) =>
        addr.id === editingAddress.id ? { ...addr, ...updatedAddress } : addr
      )
    );
    setEditingAddress(null);
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== addressId));
    // toast({
    //   title: "Address Deleted",
    //   description: "The billing address has been removed.",
    // });
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
    // toast({
    //   title: "Default Address Updated",
    //   description: "Your default billing address has been updated.",
    // });
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  defaultValue={currentUser?.name}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={currentUser?.email}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" disabled={!isEditing} />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
              {isEditing && <Button type="submit">Save Changes</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Billing Addresses</CardTitle>
          <Button
            onClick={() =>
              setEditingAddress({
                id: "",
                userId: "",
                name: "",
                street: "",
                city: "",
                state: "",
                zipCode: "",
                isDefault: false,
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" /> Add Address
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((address) => (
              <Card key={address.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-medium">{address.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {address.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      {address.isDefault && (
                        <span className="inline-flex items-center text-xs text-primary">
                          <MapPin className="mr-1 h-3 w-3" /> Default
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingAddress(address)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {!address.isDefault && (
                    <Button
                      variant="link"
                      className="mt-2 h-auto p-0"
                      onClick={() => handleSetDefaultAddress(address.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={editingAddress !== null}
        onOpenChange={() => setEditingAddress(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAddress?.id ? "Edit Address" : "Add New Address"}
            </DialogTitle>
          </DialogHeader>
          <AddressForm
            address={editingAddress || undefined}
            onSave={editingAddress?.id ? handleUpdateAddress : handleAddAddress}
            onCancel={() => setEditingAddress(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerProfile;
