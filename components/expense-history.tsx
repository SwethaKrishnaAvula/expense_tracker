"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Edit, Trash2, Calendar, Tag, DollarSign } from "lucide-react"
import { format } from "date-fns"
import { ExpenseForm } from "./expense-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ExpenseHistory() {
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedExpense, setSelectedExpense] = useState(null)
  const [filters, setFilters] = useState({
    search: "",
    category: "",
  })

  // Fetch expenses and categories on component mount
  useEffect(() => {
    Promise.all([fetchExpenses(), fetchCategories()])
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false))
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/expenses")
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      console.error("Failed to fetch expenses:", error)
      toast({
        title: "Error",
        description: "Failed to load expenses. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete expense")
      }

      toast({
        title: "Success",
        description: "Expense deleted successfully!",
      })

      fetchExpenses()
    } catch (error) {
      console.error("Error deleting expense:", error)
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : "Unknown"
  }

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = filters.search === "" || expense.name.toLowerCase().includes(filters.search.toLowerCase())

    const matchesCategory = filters.category === "all" || !filters.category || expense.category === filters.category

    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return <div className="flex justify-center py-10">Loading expenses...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search expenses..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <div className="w-full sm:w-64">
          <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No expenses found. Add your first expense to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredExpenses.map((expense) => (
            <Card key={expense.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{expense.name}</h3>
                  <div className="flex items-center text-lg font-bold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {Number.parseFloat(expense.amount).toFixed(2)}
                  </div>
                </div>

                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Tag className="h-4 w-4 mr-2" />
                    {getCategoryName(expense.category)}
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(expense.date || expense.createdAt), "MMM d, yyyy")}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-2 p-4 pt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedExpense(expense)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Expense</DialogTitle>
                      <DialogDescription>Make changes to your expense here.</DialogDescription>
                    </DialogHeader>
                    {selectedExpense && <ExpenseForm expenseToEdit={selectedExpense} />}
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this expense. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteExpense(expense.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

