import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExpenseForm } from "@/components/expense-form"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <p className="text-muted-foreground">Track your expenses easily and efficiently!!</p>
      </div>

      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
            <CardDescription>Enter the details </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseForm />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-center">
        <Link href="/history">
          <Button variant="outline" size="lg">
            Expense History
          </Button>
        </Link>
      </div>
    </div>
  )
}

