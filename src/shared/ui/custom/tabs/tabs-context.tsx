'use client'

import { createContext, ReactNode, useContext, useRef, useState } from 'react'

interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
  tabsListRef: React.RefObject<HTMLDivElement | null>
  isDragging: boolean
  handleMouseDown: (e: React.MouseEvent) => void
  handleMouseMove: (e: React.MouseEvent) => void
  handleMouseUpOrLeave: () => void
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
      }}
    >
      {children}
    </TabsContext.Provider>
  )
}
