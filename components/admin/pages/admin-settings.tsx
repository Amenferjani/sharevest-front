import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { AlertTriangle, ShieldCheck, Lock, Clock, Save, Mail } from "lucide-react"

export default function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Admin Settings</h1>
          <p className="text-zinc-400">Manage platform settings and configurations</p>
        </div>
        <Tabs defaultValue="general" className="w-full md:w-auto">
          <TabsList className="bg-zinc-900">
            <TabsTrigger value="general" className="text-white data-[state=active]:bg-zinc-800">
              General
            </TabsTrigger>
            <TabsTrigger value="access" className="text-white data-[state=active]:bg-zinc-800">
              Access
            </TabsTrigger>
            <TabsTrigger value="audit" className="text-white data-[state=active]:bg-zinc-800">
              Audit Log
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-amber-500 bg-black border-zinc-800">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-sm font-medium text-white">Security Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400">3 failed login attempts detected in the last 24 hours</p>
            <Button variant="link" className="p-0 h-auto mt-1 text-sm text-amber-500 hover:text-amber-400">
              View details
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-black border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">2FA Status</CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">72%</div>
            <p className="text-xs text-zinc-400">
              <span className="text-emerald-500">+5%</span> of users enabled
            </p>
          </CardContent>
        </Card>
        <Card className="bg-black border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Password Strength</CardTitle>
            <Lock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Average</div>
            <p className="text-xs text-zinc-400">
              <span className="text-amber-500">65%</span> security score
            </p>
          </CardContent>
        </Card>
        <Card className="bg-black border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Last Backup</CardTitle>
            <Clock className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2 hours ago</div>
            <p className="text-xs text-zinc-400">
              <span className="text-emerald-500">Automatic</span> daily backups
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Authentication Settings</CardTitle>
          <CardDescription className="text-zinc-400">Manage user authentication and security options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-white">Two-Factor Authentication</Label>
                <p className="text-sm text-zinc-400">Require 2FA for all admin accounts</p>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-white">Biometric Authentication</Label>
                <p className="text-sm text-zinc-400">Allow fingerprint and face ID login</p>
              </div>
              <Switch checked={false} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-white">Single Sign-On (SSO)</Label>
                <p className="text-sm text-zinc-400">Enable SSO with corporate identity providers</p>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-white">Auto-Logout</Label>
                <p className="text-sm text-zinc-400">Automatically log out inactive users</p>
              </div>
              <Switch checked={true} />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <p className="font-medium text-white">Session Settings</p>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-white">Session Timeout</Label>
                <p className="text-sm text-zinc-400">Time before inactive users are logged out</p>
              </div>
              <Select defaultValue="30">
                <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-black border-zinc-800">
                  <SelectItem value="15" className="text-white">
                    15 minutes
                  </SelectItem>
                  <SelectItem value="30" className="text-white">
                    30 minutes
                  </SelectItem>
                  <SelectItem value="60" className="text-white">
                    1 hour
                  </SelectItem>
                  <SelectItem value="120" className="text-white">
                    2 hours
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-black border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Email Configuration</CardTitle>
            <CardDescription className="text-zinc-400">Configure email server settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-server" className="text-white">
                SMTP Server
              </Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-zinc-400" />
                <Input
                  id="smtp-server"
                  defaultValue="smtp.sharevest.io"
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-port" className="text-white">
                  SMTP Port
                </Label>
                <Input id="smtp-port" defaultValue="587" className="bg-zinc-900 border-zinc-800 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-security" className="text-white">
                  Security
                </Label>
                <Select defaultValue="tls">
                  <SelectTrigger id="smtp-security" className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectValue placeholder="Select security" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-zinc-800">
                    <SelectItem value="none" className="text-white">
                      None
                    </SelectItem>
                    <SelectItem value="ssl" className="text-white">
                      SSL
                    </SelectItem>
                    <SelectItem value="tls" className="text-white">
                      TLS
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sender-email" className="text-white">
                Sender Email
              </Label>
              <Input
                id="sender-email"
                defaultValue="no-reply@sharevest.io"
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>

            <Button className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white">Test Connection</Button>
          </CardContent>
        </Card>

        <Card className="bg-black border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Notification Settings</CardTitle>
            <CardDescription className="text-zinc-400">Configure system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-white">Security Alerts</Label>
                <p className="text-sm text-zinc-400">Notify admins about security events</p>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-white">System Updates</Label>
                <p className="text-sm text-zinc-400">Notify about platform updates</p>
              </div>
              <Switch checked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-white">User Reports</Label>
                <p className="text-sm text-zinc-400">Send weekly user activity reports</p>
              </div>
              <Switch checked={false} />
            </div>

            <div className="space-y-2 pt-4">
              <Label className="text-white">Notification Recipients</Label>
              <Input
                placeholder="admin@sharevest.io, security@sharevest.io"
                className="bg-zinc-900 border-zinc-800 text-white"
              />
              <p className="text-xs text-zinc-400">Separate multiple emails with commas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">System Maintenance</CardTitle>
          <CardDescription className="text-zinc-400">Configure system maintenance settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-white">Automatic Updates</Label>
                <p className="text-sm text-zinc-400">Install updates automatically</p>
              </div>
              <Switch checked={true} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-base text-white">Backup Frequency</Label>
                <span className="text-sm font-medium text-white">Daily</span>
              </div>
              <Select defaultValue="daily">
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="bg-black border-zinc-800">
                  <SelectItem value="hourly" className="text-white">
                    Hourly
                  </SelectItem>
                  <SelectItem value="daily" className="text-white">
                    Daily
                  </SelectItem>
                  <SelectItem value="weekly" className="text-white">
                    Weekly
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-base text-white">Data Retention Period</Label>
                <span className="text-sm font-medium text-white">90 days</span>
              </div>
              <Slider defaultValue={[90]} max={365} step={30} className="w-full" />
              <div className="flex justify-between text-xs text-zinc-400">
                <span>30 days</span>
                <span>180 days</span>
                <span>365 days</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Save className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  )
}
