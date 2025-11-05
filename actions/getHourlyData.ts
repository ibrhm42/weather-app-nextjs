export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  const data = await fetch(
    `https://${process.env.VERCEL_URL}/api/weather/hourly?lat=${lat}&lon=${lon}&_=${Date.now()}`,
    {
      cache: "no-store",
    }
  )
  if (!data.ok) {
    throw new Error("Failed to fetch data")
  }

  return data.json()
}
