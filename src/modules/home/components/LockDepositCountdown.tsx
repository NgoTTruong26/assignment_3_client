import { useEffect, useState } from "react"
import { cn } from "utils/cn"
import { formatToMinutesAndSeconds } from "utils/time"

interface Props {
  time: number
  lockDepositERC20: boolean
  setLockDepositERC20: (state: boolean) => void
  wrapperClass?: string
}

export default function LockDepositCountdown({
  time,
  lockDepositERC20,
  wrapperClass,
  setLockDepositERC20,
}: Props) {
  const [timer, setTimer] = useState(time)

  useEffect(() => {
    let interval: NodeJS.Timer
    if (lockDepositERC20) {
      interval = setInterval(() => {
        setTimer((prevs) => {
          if (prevs <= 0) {
            return 0
          }
          return prevs - 1
        })
      }, 1000)
    }

    if (timer == 0) {
      setLockDepositERC20(false)
    }
    return () => clearInterval(interval)
  }, [lockDepositERC20, timer])

  useEffect(() => {
    setTimer(time)
  }, [time])

  return (
    <div className={cn(["text-xl", wrapperClass])}>
      {formatToMinutesAndSeconds(timer)}
    </div>
  )
}
