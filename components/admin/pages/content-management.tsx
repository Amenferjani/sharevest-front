import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, FileText, ImageIcon, Globe, Eye, Filter } from "lucide-react"

const contentItems = [
  {
    id: "1",
    title: "Landing Page Hero",
    type: "Landing",
    status: "Published",
    lastUpdated: "April 15, 2023",
    author: "Admin User",
  },
  {
    id: "2",
    title: "About Us Section",
    type: "Landing",
    status: "Published",
    lastUpdated: "April 16, 2023",
    author: "Admin User",
  },
  {
    id: "3",
    title: "Services Overview",
    type: "Landing",
    status: "Published",
    lastUpdated: "April 17, 2023",
    author: "Content Editor",
  },
  {
    id: "4",
    title: "Investment Process",
    type: "Landing",
    status: "Published",
    lastUpdated: "April 18, 2023",
    author: "Content Editor",
  },
  {
    id: "5",
    title: "Blog: Market Trends 2023",
    type: "Blog",
    status: "Draft",
    lastUpdated: "April 22, 2023",
    author: "Financial Analyst",
  },
  {
    id: "6",
    title: "Quarterly Newsletter",
    type: "Email",
    status: "Scheduled",
    lastUpdated: "April 25, 2023",
    author: "Marketing Team",
  },
  {
    id: "7",
    title: "Privacy Policy",
    type: "Legal",
    status: "Published",
    lastUpdated: "January 10, 2023",
    author: "Legal Team",
  },
  {
    id: "8",
    title: "Testimonials Section",
    type: "Landing",
    status: "Review",
    lastUpdated: "April 28, 2023",
    author: "Content Editor",
  },
]

export default function ContentManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Manage website, emails, and marketing content</p>
        </div>
        <Tabs defaultValue="all" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+12</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">112</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">77%</span> of total content
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500">16%</span> of total content
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-gray-500">7%</span> of total content
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Library</CardTitle>
          <CardDescription>Manage website, emails, and marketing content</CardDescription>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search content..." className="w-full pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Content
              </Button>
              <Button variant="outline" className="w-full md:w-auto">
                <Globe className="mr-2 h-4 w-4" />
                View Site
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-md ${
                            item.type === "Landing"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : item.type === "Blog"
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                : item.type === "Email"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                          }`}
                        >
                          {item.type === "Landing" && <Globe className="h-4 w-4" />}
                          {item.type === "Blog" && <FileText className="h-4 w-4" />}
                          {item.type === "Email" && <ImageIcon className="h-4 w-4" />}
                          {item.type === "Legal" && <FileText className="h-4 w-4" />}
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          item.status === "Published"
                            ? "border-emerald-200 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : item.status === "Draft"
                              ? "border-gray-200 bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                              : item.status === "Review"
                                ? "border-amber-200 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                : "border-blue-200 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Globe className="mr-2 h-4 w-4" /> Publish
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
