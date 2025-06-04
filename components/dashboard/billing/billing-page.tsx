import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, Plus, FileText } from "lucide-react"

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing & Payments</h1>
          <p className="text-muted-foreground">Manage your subscription, payment methods, and billing history</p>
        </div>
        <Tabs defaultValue="overview" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Premium</div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">Active</span> until Dec 31, 2025
              </p>
              <Button variant="outline" size="sm">
                Upgrade
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$199.00</div>
            <p className="text-xs text-muted-foreground">
              Due on <span className="font-medium">Jan 1, 2026</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <div className="text-lg font-medium">•••• 4242</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Expires <span className="font-medium">09/27</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your past invoices</CardDescription>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV-001</TableCell>
                  <TableCell>Dec 1, 2024</TableCell>
                  <TableCell>$199.00</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-emerald-200 bg-emerald-100 text-emerald-800">
                      Paid
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV-002</TableCell>
                  <TableCell>Nov 1, 2024</TableCell>
                  <TableCell>$199.00</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-emerald-200 bg-emerald-100 text-emerald-800">
                      Paid
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV-003</TableCell>
                  <TableCell>Oct 1, 2024</TableCell>
                  <TableCell>$199.00</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-emerald-200 bg-emerald-100 text-emerald-800">
                      Paid
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-zinc-900 p-2 rounded-md">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 09/27</p>
                </div>
              </div>
              <Badge>Default</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-zinc-900 p-2 rounded-md">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Mastercard ending in 8888</p>
                  <p className="text-sm text-muted-foreground">Expires 12/26</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Make Default
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
