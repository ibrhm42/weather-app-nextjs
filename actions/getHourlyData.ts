export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  const data = await fetch(
    `https://${process.env.VERCEL_URL}/api/weather/hourly`,
    {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        // REQUIRED for Vercel internal routing
        host: process.env.VERCEL_URL || "localhost:3000",
        "x-forwarded-host": process.env.VERCEL_URL || "localhost:3000",
        "x-forwarded-proto": "https",
      },
    }
  )
  if (!data.ok) {
    throw new Error("Failed to fetch data")
  }

  return data.json()
}
