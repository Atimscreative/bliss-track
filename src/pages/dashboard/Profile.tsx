import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({
    name: "Oluwaseyi",
    email: "oluwaseyi@example.com",
    role: "Admin",
  });

  const [notifications, setNotifications] = useState({
    lowStock: true,
    newSales: true,
    newExpenses: false,
    reports: true,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold  tracking-tight text-neutral-800">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="h-max p-1 bg-bliss-100">
          <TabsTrigger
            value="account"
            className="px-3 data-[state=active]:bg-bliss-500 data-[state=active]:text-white py-2"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="px-3 data-[state=active]:bg-bliss-500 data-[state=active]:text-white py-2"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="px-3 data-[state=active]:bg-bliss-500 data-[state=active]:text-white py-2"
          >
            Users
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="">
          <Card className="shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your personal details here
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={userProfile.name}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userProfile.email}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={userProfile.role}
                  onValueChange={(value) =>
                    setUserProfile({ ...userProfile, role: value })
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin (Owner)</SelectItem>
                    <SelectItem value="Staff">
                      Staff (Limited Access)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Admin has full access. Staff can only manage sales.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-neutral-200 border-t p-4 [.border-t]:pb-0">
              <Button
                variant="outline"
                className="border-bliss-500 hover:border-bliss-600 hover:text-bliss-600 text-bliss-500"
              >
                Cancel
              </Button>
              <Button className="bg-bliss-500 hover:bg-bliss-600 hover:text-bliss-600 text-white">
                Save changes
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-4 shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Update your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-neutral-200 border-t p-4 [.border-t]:pb-0">
              <Button
                variant="outline"
                className="border-bliss-500 hover:border-bliss-600 hover:text-bliss-600 text-bliss-500"
              >
                Cancel
              </Button>
              <Button className="bg-bliss-500 hover:bg-bliss-600 hover:text-bliss-600 text-white">
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Choose what alerts you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="low-stock">Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when inventory is running low
                  </p>
                </div>
                <Switch
                  id="low-stock"
                  className="data-[state=checked]:bg-bliss-500"
                  checked={notifications.lowStock}
                  onCheckedChange={(checked: boolean) =>
                    setNotifications({ ...notifications, lowStock: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-sales">New Sales</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new sales are recorded
                  </p>
                </div>
                <Switch
                  id="new-sales"
                  checked={notifications.newSales}
                  className="data-[state=checked]:bg-bliss-500"
                  onCheckedChange={(checked: boolean) =>
                    setNotifications({ ...notifications, newSales: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-expenses">New Expenses</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new expenses are added
                  </p>
                </div>
                <Switch
                  id="new-expenses"
                  checked={notifications.newExpenses}
                  className="data-[state=checked]:bg-bliss-500"
                  onCheckedChange={(checked: boolean) =>
                    setNotifications({ ...notifications, newExpenses: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reports">Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Get weekly and monthly financial reports
                  </p>
                </div>
                <Switch
                  id="reports"
                  checked={notifications.reports}
                  className="data-[state=checked]:bg-bliss-500"
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, reports: checked })
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-neutral-200 border-t p-4 [.border-t]:pb-0">
              <Button className="bg-bliss-500 text-white hover:bg-bliss-600">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users">
          <Card className="shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage access for family members and staff
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border border-neutral-300">
                  <div className="p-4 border-b border-neutral-300">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Oluwaseyi (You)</h3>
                        <p className="text-sm text-muted-foreground">
                          oluwaseyi@example.com
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs bg-gradient-to-l from-bliss-500 to-bliss-800 text-white px-2 py-1 rounded-full">
                          Admin
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b border-neutral-300">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Daughter 1</h3>
                        <p className="text-sm text-muted-foreground">
                          daughter1@example.com
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-bliss-500 text-white px-2.5 py-1 rounded-full">
                          Staff
                        </span>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Daughter 2</h3>
                        <p className="text-sm text-muted-foreground">
                          daughter2@example.com
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-bliss-500 text-white px-2.5 py-1 rounded-full">
                          Staff
                        </span>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <AdminUserDialog
                trigger={
                  <Button className="bg-bliss-500 text-white hover:bg-bliss-600">
                    Invite New User
                  </Button>
                }
                title="Invite New User"
                description="Send an invite to add a new user to your team or platform."
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={userProfile.name}
                      onChange={(e) =>
                        setUserProfile({ ...userProfile, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={userProfile.role}
                      onValueChange={(value) =>
                        setUserProfile({ ...userProfile, role: value })
                      }
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin (Owner)</SelectItem>
                        <SelectItem value="Staff">
                          Staff (Limited Access)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Admin has full access. Staff can only manage sales.
                    </p>
                  </div>
                  <Button className="bg-bliss-500 hover:bg-bliss-600 text-white">
                    Send Invite
                  </Button>
                </div>
              </AdminUserDialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

type AdminDialogProps = {
  trigger: React.ReactNode | string;
  title?: string;
  description?: string;
  children: React.ReactNode | string;
};

const AdminUserDialog = ({
  trigger,
  title,
  description,
  children,
}: AdminDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
