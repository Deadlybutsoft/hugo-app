"use client"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import ThemeToggle from "./ThemeToggle"

export default function SettingsPopover({ children, apiKey, setApiKey }) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start" side="top">
        <div className="p-2 space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <span className="text-sm font-medium">Appearance</span>
            <ThemeToggle />
          </div>

          <div className="p-2 pt-0 space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter Gemini API Key"
              className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p className="text-[10px] text-muted-foreground">
              Your API key is stored locally in your browser.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
