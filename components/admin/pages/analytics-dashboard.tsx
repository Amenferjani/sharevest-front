import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Download, Calendar, RefreshCcw } from "lucide-react"

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Insights and performance metrics for the platform</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Tabs defaultValue="week" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">+12%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2B</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">+15%</span> from last quarter
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-red-500">-0.4%</span> from last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4m 38s</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">+12s</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly new user registration</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">User growth chart will be displayed here</div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Top channels bringing users to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">Traffic source chart will be displayed here</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Popular Pages</CardTitle>
            <CardDescription>Most visited pages on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dashboard</p>
                  <p className="text-xs text-muted-foreground">/dashboard</p>
                </div>
                <p className="text-emerald-600 dark:text-emerald-400">24.5%</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Portfolio Overview</p>
                  <p className="text-xs text-muted-foreground">/dashboard/portfolio</p>
                </div>
                <p className="text-emerald-600 dark:text-emerald-400">18.2%</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">AssetVest</p>
                  <p className="text-xs text-muted-foreground">/dashboard/assetvest</p>
                </div>
                <p className="text-emerald-600 dark:text-emerald-400">12.7%</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Login</p>
                  <p className="text-xs text-muted-foreground">/login</p>
                </div>
                <p className="text-emerald-600 dark:text-emerald-400">9.2%</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Home</p>
                  <p className="text-xs text-muted-foreground">/</p>
                </div>
                <p className="text-emerald-600 dark:text-emerald-400">8.1%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Device Analytics</CardTitle>
            <CardDescription>Distribution of users by device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">Device analytics chart will be displayed here</div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>User interaction with the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Avg. Session Duration</p>
                  <p className="text-sm font-medium">4m 38s</p>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-full rounded-full bg-emerald-600" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Pages per Session</p>
                  <p className="text-sm font-medium">3.8</p>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-full rounded-full bg-emerald-600" style={{ width: "48%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Bounce Rate</p>
                  <p className="text-sm font-medium">32%</p>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-full rounded-full bg-emerald-600" style={{ width: "32%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Return Visitors</p>
                  <p className="text-sm font-medium">68%</p>
                </div>
                <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-full rounded-full bg-emerald-600" style={{ width: "68%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
