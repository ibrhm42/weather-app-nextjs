import { headers } from "next/headers"

export const getHourlyData = async () => {
  const incomingHeaders = headers()
  const host = incomingHeaders.get("host") || "localhost:3000"

  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"

  const url = `${protocol}://${host}/api/weather/hourly`
  const data = await fetch(url, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache",
      // REQUIRED for Vercel internal routing
      host: host,
      "x-forwarded-host": host,
      "x-forwarded-proto": protocol.replace(":", ""), // 'https' or 'http'
    },
  })
  if (!data.ok) {
    const errorText = await data.text()
    console.error("OWM Error:", errorText)
    return Response.json(
      { error: "Weather API failed", details: errorText },
      { status: data.status }
    )
  }

  return data.json()
}
