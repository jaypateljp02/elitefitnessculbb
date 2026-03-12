import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
    const cursorRef = useRef(null)
    const dotRef = useRef(null)
    const pos = useRef({ x: -100, y: -100 })
    const target = useRef({ x: -100, y: -100 })
    const [hovering, setHovering] = useState(false)

    useEffect(() => {
        // Don't run on touch devices
        if ('ontouchstart' in window && navigator.maxTouchPoints > 0) return

        const handleMouseMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY }
        }

        // High-speed lerp for snappy cursor (0.35 factor = fast follow, slight smoothness)
        let raf
        const animate = () => {
            pos.current.x += (target.current.x - pos.current.x) * 0.35
            pos.current.y += (target.current.y - pos.current.y) * 0.35

            if (cursorRef.current) {
                cursorRef.current.style.left = `${pos.current.x}px`
                cursorRef.current.style.top = `${pos.current.y}px`
            }
            if (dotRef.current) {
                dotRef.current.style.left = `${target.current.x}px`
                dotRef.current.style.top = `${target.current.y}px`
            }
            raf = requestAnimationFrame(animate)
        }
        raf = requestAnimationFrame(animate)

        // Hover detection for clickable elements
        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer')) {
                setHovering(true)
            }
        }
        const handleMouseOut = (e) => {
            if (e.target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer')) {
                setHovering(false)
            }
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        document.addEventListener('mouseover', handleMouseOver, { passive: true })
        document.addEventListener('mouseout', handleMouseOut, { passive: true })

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseout', handleMouseOut)
            cancelAnimationFrame(raf)
        }
    }, [])

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window && navigator.maxTouchPoints > 0) {
        return null
    }

    return (
        <>
            <div ref={cursorRef} className={`custom-cursor ${hovering ? 'hovering' : ''}`} />
            <div ref={dotRef} className="custom-cursor-dot" />
        </>
    )
}
