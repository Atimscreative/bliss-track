import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Settings2, Bell, User } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold  tracking-tight text-neutral-800">
        Settings
      </h1>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <User className="h-5 w-5 text-primary" />
            <div>
              <h2 className="font-medium">Profile Settings</h2>
              <p className="text-sm text-muted-foreground">
                Manage your account details
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Business Name</Label>
              <Input id="name" defaultValue="Oluwaseyi Bliss Beddings" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue="admin@blisstrack.com"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <h2 className="font-medium">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                Configure alert thresholds
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="stockThreshold">Low Stock Alert Threshold</Label>
              <Input id="stockThreshold" type="number" defaultValue="5" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Settings2 className="h-5 w-5 text-primary" />
            <div>
              <h2 className="font-medium">App Preferences</h2>
              <p className="text-sm text-muted-foreground">
                Customize your experience
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Input id="language" defaultValue="English" disabled />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" defaultValue="NGN (₦)" disabled />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
