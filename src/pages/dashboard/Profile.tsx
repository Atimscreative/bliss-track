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
      <h1 className="text-3xl font-bold">Profile</h1>
      <p className="text-muted-foreground">
        Manage your account settings and preferences
      </p>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account">
          <Card>
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
            <CardFooter className="flex justify-between border-t p-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card className="mt-4">
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
            <CardFooter className="flex justify-between border-t p-4">
              <Button variant="outline">Cancel</Button>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
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
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, reports: checked })
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-4">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage access for family members and staff
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Oluwaseyi (You)</h3>
                        <p className="text-sm text-muted-foreground">
                          oluwaseyi@example.com
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          Admin
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Daughter 1</h3>
                        <p className="text-sm text-muted-foreground">
                          daughter1@example.com
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
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
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                          Staff
                        </span>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Invite New User</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
