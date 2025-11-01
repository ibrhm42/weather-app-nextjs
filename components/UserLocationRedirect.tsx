"use client"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Popup } from "./ui/Popup"

interface UserLocationRedirectProps {
  autoRedirect?: boolean
}

export default function UserLocationRedirect({
  autoRedirect = false,
}: UserLocationRedirectProps): JSX.Element {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getAndRedirect = useCallback(() => {
    setError(null)
    setLoading(true)

    if (!("geolocation" in navigator)) {
      setError("Geolocation is not available in this browser.")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = String(pos.coords.latitude)
        const lon = String(pos.coords.longitude)
        const params = new URLSearchParams({ lat, lon }).toString()
        // Push to /search with lat and lon query params
        setLoading(false)
        router.push(`/search?${params}`)
      },
      (err) => {
        setError(err.message || "Unable to retrieve location.")
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }, [router])

  useEffect(() => {
    autoRedirect && getAndRedirect()
  }, [getAndRedirect])

  return (
    <>
      {!autoRedirect && (
        <img
          className="cursor-pointer"
          width={30}
          src="/icons/gps.svg"
          onClick={getAndRedirect}
        />
      )}

      {loading && <Popup>Obtaining your location and redirecting…</Popup>}

      {error && (
        <Popup onClose={() => setError(null)}>
          <p>Could not get your location: {error}</p>
          <button onClick={getAndRedirect}>Try again</button>
        </Popup>
      )}
    </>
  )
}
