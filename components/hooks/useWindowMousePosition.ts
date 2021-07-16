import { useEffect, useState } from "react"
import { Position } from "../../types/position"

/** This hook returns the mouse position - {x: number, y: number} */
export const useWindowMousePosition = (): Position => {
    // Hold the position in state
    const [position, setPosition] = useState<Position>(undefined)

    useEffect(() => {
        // Function to run when mouse moves
        const handleMouseMove = (e: MouseEvent) => {
            const {clientX, clientY} = e
            setPosition({x:clientX, y: clientY})
        }

        // Add mouse move listener to the window
        window.addEventListener("mousemove", handleMouseMove)

        // Remove the listener when unmounting
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }

    }, [])

    return position
}