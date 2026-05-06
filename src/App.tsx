import { useState, useCallback } from "react"
import QRCode from "qrcode"
import { QrCode, Download, Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  const [text, setText] = useState("")
  const [qrDataURL, setQrDataURL] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateQR = useCallback(async () => {
    if (!text.trim()) {
      setError("Please enter some text or a URL")
      return
    }

    setGenerating(true)
    setError(null)

    try {
      const dataURL = await QRCode.toDataURL(text.trim(), {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
      setQrDataURL(dataURL)
    } catch {
      setError("Failed to generate QR code. Input may be too long.")
    } finally {
      setGenerating(false)
    }
  }, [text])

  const downloadQR = useCallback(() => {
    if (!qrDataURL) return
    const link = document.createElement("a")
    link.download = "qrcode.png"
    link.href = qrDataURL
    link.click()
  }, [qrDataURL])

  const pasteFromClipboard = useCallback(async () => {
    try {
      const clipText = await navigator.clipboard.readText()
      setText(clipText)
    } catch {
      setError("Unable to read clipboard")
    }
  }, [])

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-muted/40 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <QrCode className="size-5" />
            <CardTitle className="text-xl">QR Code Generator</CardTitle>
          </div>
          <CardDescription>
            Enter text or a URL to generate a QR code you can download.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="qr-input">Text or URL</Label>
            <Textarea
              id="qr-input"
              placeholder="Paste or type your content here..."
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                setError(null)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  generateQR()
                }
              }}
              className="min-h-16 resize-none"
            />
            <Button
              variant="ghost"
              size="sm"
              className="self-start"
              onClick={pasteFromClipboard}
            >
              <Clipboard />
              Paste from clipboard
            </Button>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button onClick={generateQR} disabled={generating} size="lg">
            <QrCode />
            {generating ? "Generating..." : "Generate QR Code"}
          </Button>

          {qrDataURL && (
            <div className="flex flex-col items-center gap-3 pt-1">
              <div className="rounded-lg border bg-white p-2">
                <img
                  src={qrDataURL}
                  alt="Generated QR Code"
                  className="size-40"
                />
              </div>
              <Button variant="outline" onClick={downloadQR} className="w-full">
                <Download />
                Download as PNG
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default App
