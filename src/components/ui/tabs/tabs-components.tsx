'use client'

import { cn } from '@/lib/utils'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { ReactNode } from 'react'
import { TabsProvider, useTabs } from './tabs-context'

interface TabsRootProps {
  children: ReactNode
  defaultValue: string
  className?: string
}

export function TabsRoot({ children, defaultValue, className }: TabsRootProps) {
  return (
    <TabsProvider defaultValue={defaultValue}>
      <div className={cn('flex flex-col gap-6', className)}>{children}</div>
    </TabsProvider>
  )
}

interface TabsListProps {
  children: ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  const {
    tabsListRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
    showLeftArrow,
    showRightArrow,
    scrollToLeft,
    scrollToRight,
  } = useTabs()

  return (
    <div className="relative">
      {showLeftArrow && (
        <button
          type="button"
          onClick={scrollToLeft}
          className="bg-primary text-primary-foreground absolute top-1/2 left-0 z-10 flex -translate-y-1/2 items-center justify-center rounded-full p-1.5 opacity-50 hover:opacity-100"
          aria-label="Scroll left"
        >
          <ArrowBigLeft className="animate-slide-left h-5 w-5" />
        </button>
      )}
      <div
        ref={tabsListRef}
        className={cn(
          'scroll-hide border-y-muted flex w-full cursor-grab gap-1 overflow-x-auto border-y bg-inherit py-2 select-none active:cursor-grabbing',
          className,
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {children}
      </div>
      {showRightArrow && (
        <button
          type="button"
          onClick={scrollToRight}
          className="bg-primary text-primary-foreground absolute top-1/2 right-0 z-10 flex -translate-y-1/2 items-center justify-center rounded-full p-1.5 opacity-50 hover:opacity-100"
          aria-label="Scroll right"
        >
          <ArrowBigRight className="animate-slide-right h-5 w-5" />
        </button>
      )}
    </div>
  )
}

interface TabsTriggerProps {
  children: ReactNode
  value: string
  className?: string
}

export function TabsTrigger({ children, value, className }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabs()

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        'text-body-md flex shrink-0 items-center gap-1 p-2 transition-all select-none',
        activeTab === value
          ? 'border-b-primary border-b'
          : 'hover:bg-background/50',
        className,
      )}
    >
      {children}
    </button>
  )
}

interface TabsContentProps {
  children: ReactNode
  value: string
  className?: string
}

export function TabsContent({ children, value, className }: TabsContentProps) {
  const { activeTab } = useTabs()

  if (activeTab !== value) return null

  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>
}
