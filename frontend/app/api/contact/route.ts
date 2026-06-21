import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();

  const response = await fetch(
    "https://aisback.atulyaitsolutions.com/wp-json/ais/v1/lead",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const result = await response.json();

  return NextResponse.json(result);
}