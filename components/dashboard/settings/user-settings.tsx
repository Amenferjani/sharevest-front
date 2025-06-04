import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Bell, Shield, Globe, DollarSign, Save } from "lucide-react"

export default function UserSettings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <Tabs defaultValue="general" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your general account preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Language</Label>
                  <p className="text-sm text-muted-foreground">Select your preferred language</p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Time Zone</Label>
                  <p className="text-sm text-muted-foreground">Set your local time zone</p>
                </div>
                <Select defaultValue="est">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern Time (ET)</SelectItem>
                    <SelectItem value="cst">Central Time (CT)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Currency</Label>
                  <p className="text-sm text-muted-foreground">Set your preferred currency</p>
                </div>
                <Select defaultValue="usd">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="jpy">JPY (¥)</SelectItem>
                    <SelectItem value="cad">CAD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Login Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts for new login attempts</p>
                </div>
                <Switch defaultChecked={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Biometric Authentication</Label>
                  <p className="text-sm text-muted-foreground">Use fingerprint or face ID to login on mobile</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div></div>
                <div className="text-center text-sm font-medium">Email</div>
                <div className="text-center text-sm font-medium">Mobile</div>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Portfolio Updates</Label>
                  <p className="text-sm text-muted-foreground">Daily summary of your investments</p>
                </div>
                <div className="flex justify-center">
                  <Switch id="portfolio-email" defaultChecked={true} />
                </div>
                <div className="flex justify-center">
                  <Switch id="portfolio-mobile" defaultChecked={false} />
                </div>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Market Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notifications about market changes</p>
                </div>
                <div className="flex justify-center">
                  <Switch id="market-email" defaultChecked={true} />
                </div>
                <div className="flex justify-center">
                  <Switch id="market-mobile" defaultChecked={true} />
                </div>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Investment Opportunities</Label>
                  <p className="text-sm text-muted-foreground">New investment recommendations</p>
                </div>
                <div className="flex justify-center">
                  <Switch id="investment-email" defaultChecked={true} />
                </div>
                <div className="flex justify-center">
                  <Switch id="investment-mobile" defaultChecked={false} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>Investment Preferences</CardTitle>
                <CardDescription>Customize your investment strategy and risk tolerance</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-base">Risk Tolerance</Label>
                  <span className="text-sm font-medium">Moderate</span>
                </div>
                <Slider defaultValue={[65]} max={100} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conservative</span>
                  <span>Moderate</span>
                  <span>Aggressive</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Investment Focus</Label>
                  <p className="text-sm text-muted-foreground">Select your primary investment focus</p>
                </div>
                <Select defaultValue="balanced">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="esg">ESG/Sustainable</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-Invest</Label>
                  <p className="text-sm text-muted-foreground">Automatically invest based on your strategy</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Save className="mr-2 h-4 w-4" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
