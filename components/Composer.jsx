"use client"

import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react"
import { ArrowUp, Loader2, Plus, SendHorizontal } from "lucide-react"
import ComposerActionsPopover from "./ComposerActionsPopover"
import { cls } from "./utils"
import sendBtnStyles from "./SendButton.module.css"

const Composer = forwardRef(function Composer({ onSend, busy }, ref) {
  const [value, setValue] = useState("")
  const [sending, setSending] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [lineCount, setLineCount] = useState(1)
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      const textarea = inputRef.current
      const lineHeight = 20 // Approximate line height in pixels
      const minHeight = 40

      // Reset height to calculate scroll height
      textarea.style.height = "auto"
      const scrollHeight = textarea.scrollHeight
      const calculatedLines = Math.max(1, Math.floor((scrollHeight - 16) / lineHeight)) // 16px for padding

      setLineCount(calculatedLines)

      if (calculatedLines <= 12) {
        // Auto-expand for 1-12 lines
        textarea.style.height = `${Math.max(minHeight, scrollHeight)}px`
        textarea.style.overflowY = "hidden"
      } else {
        // Fixed height with scroll for 12+ lines
        textarea.style.height = `${minHeight + 11 * lineHeight}px` // 12 lines total
        textarea.style.overflowY = "auto"
      }
    }
  }, [value])

  useImperativeHandle(
    ref,
    () => ({
      insertTemplate: (templateContent) => {
        setValue((prev) => {
          const newValue = prev ? `${prev}\n\n${templateContent}` : templateContent
          setTimeout(() => {
            inputRef.current?.focus()
            const length = newValue.length
            inputRef.current?.setSelectionRange(length, length)
          }, 0)
          return newValue
        })
      },
      focus: () => {
        inputRef.current?.focus()
      },
    }),
    [],
  )

  async function handleSend() {
    if (!value.trim() || sending) return
    setSending(true)
    try {
      await onSend?.(value)
      setValue("")
      inputRef.current?.focus()
    } finally {
      setSending(false)
    }
  }

  const hasContent = value.length > 0

  return (
    <div className="p-4 dark:border-zinc-800 relative z-50">
      <div
        className={cls(
          "mx-auto flex flex-col rounded-2xl border bg-white shadow-sm dark:bg-black transition-all duration-200 relative group overflow-hidden",
          "max-w-xl border-zinc-300 dark:border-zinc-700 p-3",
        )}
      >
        <div className="absolute inset-x-0 -top-px mx-auto h-[2px] w-1/2 bg-gradient-to-r from-transparent via-[#D0FE17] to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
        <div className="absolute inset-x-0 -bottom-px mx-auto h-[2px] w-1/2 bg-gradient-to-r from-transparent via-[#D0FE17] to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="How can I help you today?"
            rows={1}
            className={cls(
              "w-full resize-none bg-transparent text-base outline-none placeholder:text-zinc-400 transition-all duration-200",
              "text-zinc-900 dark:text-zinc-100 px-1 py-2 min-h-[40px] text-left",
            )}
            style={{
              height: "auto",
              overflowY: lineCount > 12 ? "auto" : "hidden",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <ComposerActionsPopover>
            <button
              className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition-colors"
              title="Add attachment"
            >
              <Plus className="h-4 w-4" />
            </button>
          </ComposerActionsPopover>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleSend}
              disabled={sending || busy || !value.trim()}
              className={`${sendBtnStyles.btn} ${(sending || busy || !value.trim()) ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
            >
              <svg className={sendBtnStyles['btn-svg']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
              <div className={sendBtnStyles['txt-wrapper']}>
                <div className={sendBtnStyles['txt-1']}>
                  <span className={sendBtnStyles['btn-letter']}>S</span>
                  <span className={sendBtnStyles['btn-letter']}>e</span>
                  <span className={sendBtnStyles['btn-letter']}>n</span>
                  <span className={sendBtnStyles['btn-letter']}>d</span>
                </div>
                <div className={sendBtnStyles['txt-2']}>
                  <span className={sendBtnStyles['btn-letter']}>S</span>
                  <span className={sendBtnStyles['btn-letter']}>e</span>
                  <span className={sendBtnStyles['btn-letter']}>n</span>
                  <span className={sendBtnStyles['btn-letter']}>d</span>
                  <span className={sendBtnStyles['btn-letter']}>i</span>
                  <span className={sendBtnStyles['btn-letter']}>n</span>
                  <span className={sendBtnStyles['btn-letter']}>g</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Composer
