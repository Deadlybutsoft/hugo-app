"use client"
import { useState, useRef } from "react"
import { Paperclip, Upload, FileText, Image } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerHeader, DrawerDescription } from "./ui/drawer"
import { useIsMobile } from "./ui/use-mobile"

export default function ComposerActionsPopover({ children, onFileUpload }) {
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const isMobile = useIsMobile()
  const fileInputRef = useRef(null)

  const handleAction = (action) => {
    action()
    setOpen(false)
  }

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    if (files.length > 0 && onFileUpload) {
      setUploading(true)
      onFileUpload(files).finally(() => {
        setUploading(false)
      })
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const mainActions = [
    {
      icon: Paperclip,
      label: "Add photos & files",
      action: triggerFileUpload,
      disabled: uploading,
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
            disabled={action.disabled}
            className="flex items-center gap-3 w-full p-2 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconComponent className="h-4 w-4 text-zinc-500" />
            <span className="font-medium">
              {action.disabled ? "Uploading..." : action.label}
            </span>
          </button>
        )
      })}
    </div>
  )

  if (isMobile) {
    return (
      <>
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
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls"
          onChange={handleFileSelect}
          className="hidden"
        />
      </>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start" side="top">
        <ActionList />
      </PopoverContent>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls"
        onChange={handleFileSelect}
        className="hidden"
      />
    </Popover>
  )

  // Add the hidden input to mobile version too
}
