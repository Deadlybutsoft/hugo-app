import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react"
import { ArrowUp, Loader2, Plus, SendHorizontal } from "lucide-react"
import ComposerActionsPopover from "./ComposerActionsPopover"
import { cls } from "./utils"
import styles from "./Composer.module.css"

const Composer = forwardRef(function Composer({ onSend, onFileUpload, busy }, ref) {
  const [value, setValue] = useState("")
  const [sending, setSending] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [lineCount, setLineCount] = useState(1)
  const inputRef = useRef(null)
  const [uploadedFiles, setUploadedFiles] = useState([])

  useEffect(() => {
    if (inputRef.current) {
      const textarea = inputRef.current
      const lineHeight = 20 // Approximate line height in pixels
      const minHeight = 50

      // Reset height to calculate scroll height
      textarea.style.height = "auto"
      const scrollHeight = textarea.scrollHeight
      const calculatedLines = Math.max(1, Math.floor((scrollHeight - 16) / lineHeight))

      setLineCount(calculatedLines)

      if (calculatedLines <= 12) {
        // Auto-expand for 1-12 lines
        textarea.style.height = `${Math.max(minHeight, scrollHeight)}px`
        textarea.style.overflowY = "hidden"
      } else {
        // Fixed height with scroll for 12+ lines
        textarea.style.height = `${minHeight + 11 * lineHeight}px`
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

  async function handleFileUpload(files) {
    // Process uploaded files
    const fileList = Array.from(files)
    const processedFiles = fileList.map(file => ({
      id: Math.random().toString(36).slice(2),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }))

    setUploadedFiles(prev => [...prev, ...processedFiles])

    // If there's a file upload handler from parent, call it
    if (onFileUpload) {
      await onFileUpload(processedFiles)
    }

    // For now, add file info to the message
    const fileInfo = processedFiles.map(f => `📎 ${f.name} (${(f.size / 1024).toFixed(1)}KB)`).join('\n')
    setValue(prev => prev ? `${prev}\n\n${fileInfo}` : fileInfo)
  }

  const hasContent = value.length > 0

  return (
    <div className="p-4 relative z-50 w-full flex justify-center">
      <div className={styles.container_chat_bot} style={{ maxWidth: '600px' }}>
        <div className={styles['container-chat-options']}>
          <div className={styles.chat}>
            <div className={styles['chat-bot']}>
              <textarea
                ref={inputRef}
                name="chat_bot"
                placeholder="Register something...✦˚"
                className={styles.textarea}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                disabled={busy || sending}
              />
            </div>
            <div className={styles.options}>
              <div className={styles['btns-add']}>
                <ComposerActionsPopover onFileUpload={handleFileUpload}>
                  <button>
                    <Plus width={24} height={24} />
                  </button>
                </ComposerActionsPopover>

              </div>
              <button
                className={styles['btn-submit']}
                onClick={handleSend}
                disabled={sending || busy || !value.trim()}
              >
                <i>
                  {sending || busy ? (
                    <Loader2 className="animate-spin" width={20} height={20} />
                  ) : (
                    <ArrowUp />
                  )}
                </i>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div >
  )
})

export default Composer
