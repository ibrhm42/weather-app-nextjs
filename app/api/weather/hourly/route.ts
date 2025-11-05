export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request) {

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=55.6760968&lon=12.5683371&appid=183ed297f46a1a3da2019bb9d46afcc4`

  const res = await fetch(url, {
    cache: "no-store",
    headers: { "Cache-Control": "no-cache" },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await res.json()

  return Response.json(data)
}
