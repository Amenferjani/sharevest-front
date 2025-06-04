"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  Filter,
  Book,
  MessageCircleQuestionIcon as QuestionMarkCircle,
  ArrowUpRight,
  Download,
  RefreshCcw,
} from "lucide-react"

export default function HelpDocumentation() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Help Documentation</h1>
          <p className="text-muted-foreground">Browse documentation and find answers to common questions</p>
        </div>
        <Tabs defaultValue="getting-started" className="w-full md:w-auto">
          <TabsList className="bg-zinc-900">
            <TabsTrigger value="getting-started" className="text-white data-[state=active]:bg-zinc-800">
              Getting Started
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-white data-[state=active]:bg-zinc-800">
              FAQ
            </TabsTrigger>
            <TabsTrigger value="api" className="text-white data-[state=active]:bg-zinc-800">
              API Reference
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="w-full pl-8 bg-zinc-900 border-zinc-800 text-white"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-black border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Account Setup</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400">Learn how to set up your account and configure initial settings.</p>
            <Button variant="link" className="p-0 h-auto mt-1 text-sm text-emerald-500 hover:text-emerald-400">
              View documentation
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Portfolio Management</CardTitle>
            <QuestionMarkCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400">
              Discover how to manage your investment portfolio and track performance.
            </p>
            <Button variant="link" className="p-0 h-auto mt-1 text-sm text-emerald-500 hover:text-emerald-400">
              View documentation
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Trading & Investments</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400">
              Understand how to execute trades and explore investment opportunities.
            </p>
            <Button variant="link" className="p-0 h-auto mt-1 text-sm text-emerald-500 hover:text-emerald-400">
              View documentation
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
            <CardDescription className="text-zinc-400">Common questions and answers</CardDescription>
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
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white">How do I reset my password?</h3>
              <p className="text-sm text-zinc-400">
                To reset your password, click on the "Forgot password" link on the login page and follow the
                instructions.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white">What payment methods are accepted?</h3>
              <p className="text-sm text-zinc-400">We accept credit cards, debit cards, and bank transfers.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white">How do I contact support?</h3>
              <p className="text-sm text-zinc-400">
                You can contact support by sending an email to support@sharevest.io or by calling our support line.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
