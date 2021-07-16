import { useState } from "react"

export const useThrottle = (timeout: number = 100) => {
    const [ready, setReady] = useState<boolean>()
}