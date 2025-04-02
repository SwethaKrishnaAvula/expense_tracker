import { NextResponse } from "next/server"

// Predefined categories only - no ability to add/delete
const categories = [
  { id: "1", name: "Food" },
  { id: "2", name: "Transportation" },
  { id: "3", name: "Entertainment" },
  { id: "4", name: "Utilities" },
  { id: "5", name: "Travel" },
  { id: "6", name: "Shopping" },
  { id: "7", name: "Healthcare" },
  { id: "8", name: "Education" },
  { id: "9", name: "Housing" },
  { id: "10", name: "Other" },
]

export async function GET() {
  return NextResponse.json(categories)
}



