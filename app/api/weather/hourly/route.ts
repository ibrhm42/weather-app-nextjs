export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const HOURS = 23


  if (!lat || !lon) {
    return Response.json({ message: "Missing parameters" }, { status: 400 })
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${HOURS}&exclude=current,minutely,daily,alerts&appid=183ed297f46a1a3da2019bb9d46afcc4&units=metric&nocache=${Date.now()}`

  const res = await fetch(url, {
    next: { revalidate: 900 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await res.json()

  return Response.json(data)
}
