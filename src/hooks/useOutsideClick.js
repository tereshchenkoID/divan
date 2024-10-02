import { useEffect } from 'react'

export const useOutsideClick = (elementRef, buttonRef, handler, attached = true) => {
  useEffect(() => {
    if (!attached) return

    const handleClick = e => {
      if (e.target === buttonRef.current) return
      if (!elementRef.current && !buttonRef.current) return
      if (!elementRef.current.contains(e.target)) {
        handler(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [elementRef, handler, attached])
}
