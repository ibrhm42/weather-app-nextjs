export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const HOURS = 23

  if (!lat || !lon) {
    return Response.json({ message: "Missing lat/lon" }, { status: 400 })
  }

  console.log("Fetching weather for:", lat, lon)

  // Fixed URL: no double ?, no appid in params
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${HOURS}&appid=183ed297f46a1a3da2019bb9d46afcc4&units=metric&nocache=${Date.now()}`

  const res = await fetch(url, {
    cache: "no-store",
    headers: { "Cache-Control": "no-cache" },
  })

  // Log real response
  console.log("OWM Status:", res.status, "URL:", url.replace(/appid=[^&]+/, 'appid=[HIDDEN]'))

  if (!res.ok) {
    const errorText = await res.text()
    console.error("OWM Error:", errorText)
    return Response.json({ error: "Weather API failed", details: errorText }, { status: res.status })
  }

  const data = await res.json()
  return Response.json(data)
}