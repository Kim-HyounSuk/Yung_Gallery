'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
  tabsListRef: React.RefObject<HTMLDivElement | null>
  isDragging: boolean
  handleMouseDown: (e: React.MouseEvent) => void
  handleMouseMove: (e: React.MouseEvent) => void
  handleMouseUpOrLeave: () => void
  showLeftArrow: boolean
  showRightArrow: boolean
  scrollToLeft: () => void
  scrollToRight: () => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

export function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs must be used within TabsProvider')
  }
  return context
}

interface TabsProviderProps {
  children: ReactNode
  defaultValue: string
}

export function TabsProvider({ children, defaultValue }: TabsProviderProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const tabsListRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const checkScroll = () => {
    if (!tabsListRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1)
  }

  useEffect(() => {
    const element = tabsListRef.current
    if (!element) return

    checkScroll()

    const resizeObserver = new ResizeObserver(() => {
      checkScroll()
    })

    resizeObserver.observe(element)
    element.addEventListener('scroll', checkScroll)

    return () => {
      resizeObserver.disconnect()
      element.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tabsListRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - tabsListRef.current.offsetLeft)
    setScrollLeft(tabsListRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tabsListRef.current) return
    e.preventDefault()
    const x = e.pageX - tabsListRef.current.offsetLeft
    const walk = (x - startX) * 2
    tabsListRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  }

  const scrollToLeft = () => {
    if (!tabsListRef.current) return
    tabsListRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    setTimeout(checkScroll, 300)
  }

  const scrollToRight = () => {
    if (!tabsListRef.current) return
    tabsListRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    setTimeout(checkScroll, 300)
  }

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        tabsListRef,
        isDragging,
        handleMouseDown,
        handleMouseMove,
        handleMouseUpOrLeave,
        showLeftArrow,
        showRightArrow,
        scrollToLeft,
        scrollToRight,
      }}
    >
      {children}
    </TabsContext.Provider>
  )
}
