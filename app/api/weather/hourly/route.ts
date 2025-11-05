export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const appid = searchParams.get("appid")
  const HOURS = 23

  if (!appid) {
    return Response.json(
      { message: "OpenWeather API key not found in environment variables" },
      { status: 401 }
    )
  }
  if (!lat || !lon) {
    return Response.json({ message: "Missing parameters" }, { status: 400 })
  }
  console.log(
    "API key from env:",
    process.env.OPEN_WEATHER_API_KEY ? "exists" : "missing"
  )

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${HOURS}&exclude=current,minutely,daily,alerts&appid=${appid}&units=metric&nocache=${Date.now()}`

  const res = await fetch(url, {
    next: { revalidate: 900 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await res.json()

  return Response.json(data)
}
