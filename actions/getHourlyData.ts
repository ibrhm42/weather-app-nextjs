import { headers } from "next/headers"

export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  const host = headers().get("host") || "localhost:3000"
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  const url = `${protocol}://${host}/api/weather/hourly?lat=${lat}&lon=${lon}`

  const res = await fetch(url, { cache: "no-store" })

  if (!res.ok) throw new Error("Failed to fetch weather")
  return res.json()
}