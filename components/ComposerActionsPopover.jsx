"use client"
import { useState } from "react"
import { Paperclip } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerHeader, DrawerDescription } from "./ui/drawer"
import { useIsMobile } from "./ui/use-mobile"

export default function ComposerActionsPopover({ children }) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  const handleAction = (action) => {
    action()
    setOpen(false)
  }

  const mainActions = [
    {
      icon: Paperclip,
      label: "Add photos & files",
      action: () => console.log("Add photos & files"),
    },
  ]

  const ActionList = () => (
    <div className="p-1 flex flex-col gap-1">
      {mainActions.map((action, index) => {
        const IconComponent = action.icon
        return (
          <button
            key={index}
            onClick={() => handleAction(action.action)}
            className="flex items-center gap-3 w-full p-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <IconComponent className="h-4 w-4 text-zinc-500" />
            <span className="font-medium">{action.label}</span>
          </button>
        )
      })}
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {children}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Actions</DrawerTitle>
            <DrawerDescription>Choose an action to perform</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-8">
            <ActionList />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start" side="top">
        <ActionList />
      </PopoverContent>
    </Popover>
  )
}
