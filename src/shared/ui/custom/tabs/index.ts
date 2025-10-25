import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './tabs-components'

export { useTabs } from './tabs-context'

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
})
