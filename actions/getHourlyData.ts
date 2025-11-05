export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=55.6760968&lon=12.5683371&appid=183ed297f46a1a3da2019bb9d46afcc4`

  const data = await fetch(url,  {
    cache: "no-store",
    headers: { "Cache-Control": "no-cache" },
  })
  // const data = await fetch(
  //   `https://${process.env.VERCEL_URL}/api/weather/hourly`,
  //   { cache: "no-store" }
  // )
  if (!data.ok) {
    throw new Error("Failed to fetch data")
  }

  return data.json()
}
