import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// In-memory store for expenses
const expenses = []

export async function GET() {
  return NextResponse.json(expenses)
}

export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.amount || !data.category) {
      return NextResponse.json({ error: "Name, amount, and category are required" }, { status: 400 })
    }

    // Create new expense
    const newExpense = {
      id: uuidv4(),
      name: data.name,
      amount: data.amount,
      category: data.category,
      date: data.date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    // Add to in-memory store
    expenses.push(newExpense)

    return NextResponse.json(newExpense, { status: 201 })
  } catch (error) {
    console.error("Error creating expense:", error)
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 })
  }
}

