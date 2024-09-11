import { format, fromUnixTime } from "date-fns"

export function formatDate(timestamp: number) {
  const date = fromUnixTime(timestamp)

  const formattedDate = format(date, "HH:mm dd-MM-yyyy")

  return formattedDate
}

export function formatToMinutesAndSeconds(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const formattedTime = `${minutes}:${String(seconds).padStart(2, "0")}`

  return formattedTime
}
