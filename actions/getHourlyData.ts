import { headers } from "next/headers"

export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
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
    throw new Error("Failed to fetch data")
  }

  return data.json()
}
