import { NextResponse } from "next/server"

// Reference to the in-memory store (shared with the main expenses route)
let expenses = []

export async function GET(request, { params }) {
  const { id } = params

  const expense = expenses.find((exp) => exp.id === id)

  if (!expense) {
    return NextResponse.json({ error: "Expense not found" }, { status: 404 })
  }

  return NextResponse.json(expense)
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const data = await request.json()

    // Find expense index
    const expenseIndex = expenses.findIndex((exp) => exp.id === id)

    if (expenseIndex === -1) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 })
    }

    // Validate required fields
    if (!data.name || !data.amount || !data.category) {
      return NextResponse.json({ error: "Name, amount, and category are required" }, { status: 400 })
    }

    // Update expense
    const updatedExpense = {
      ...expenses[expenseIndex],
      name: data.name,
      amount: data.amount,
      category: data.category,
      date: data.date || expenses[expenseIndex].date,
      updatedAt: new Date().toISOString(),
    }

    expenses[expenseIndex] = updatedExpense

    return NextResponse.json(updatedExpense)
  } catch (error) {
    console.error("Error updating expense:", error)
    return NextResponse.json({ error: "Failed to update expense" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const { id } = params

  // Find expense index
  const expenseIndex = expenses.findIndex((exp) => exp.id === id)

  if (expenseIndex === -1) {
    return NextResponse.json({ error: "Expense not found" }, { status: 404 })
  }

  // Remove expense
  expenses = expenses.filter((exp) => exp.id !== id)

  return NextResponse.json({ success: true })
}

