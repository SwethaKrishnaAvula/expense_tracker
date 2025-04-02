import { ExpenseHistory } from "@/components/expense-history"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function HistoryPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold ml-4">Expense History</h1>
      </div>

      <ExpenseHistory />
    </div>
  )
}

