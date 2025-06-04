"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, ShieldCheck, Lock, Clock } from "lucide-react"

export default function SecuritySettings() {
  const [tab, setTab] = useState("general")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Security Settings</h1>
          <p className="text-muted-foreground">
            Manage platform security and authentication settings
          </p>
        </div>
        <Tabs defaultValue="general" className="w-full md:w-auto" onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="access">Access</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {tab === "general" && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-sm font-medium">Security Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  3 failed login attempts detected in the last 24 hours
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto mt-1 text-sm text-amber-600 dark:text-amber-400"
                >
                  View details
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">2FA Status</CardTitle>
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+5%</span> of users enabled
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Password Strength</CardTitle>
                <Lock className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Average</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-amber-500">65%</span> security score
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
                <Clock className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2 hours ago</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">Automatic</span> daily backups
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Settings</CardTitle>
                <CardDescription>
                  Manage user authentication and security options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all admin accounts
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Biometric Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow fingerprint and face ID login
                      </p>
                    </div>
                    <Switch checked={false} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Single Sign-On (SSO)</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable SSO with corporate identity providers
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-Logout</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out inactive users
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <p className="font-medium">Session Settings</p>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">
                        End sessions after 30 minutes of inactivity
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Concurrent Sessions</Label>
                      <p className="text-sm text-muted-foreground">
                        Restrict users to one active session
                      </p>
                    </div>
                    <Switch checked={false} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {tab === "access" && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>
                Configure roles, permissions, and account restrictions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                (This is placeholder content — you can add access management components here.)
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "audit" && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>
                View recent security-related events and user activity logs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                (This is placeholder content — insert audit log table or timeline here.)
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
