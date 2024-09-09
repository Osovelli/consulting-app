import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "../../../../components/ui/dialog"
import { Button } from '../../../../components/ui/button'
import { Input } from "../../../../components/ui/input"
import { Progress } from '../../../../components/ui/progress'
import { CheckCircle2, Upload } from 'lucide-react'

import FileUploadCard from '../fileupload-card'
import FilePreviewOverlay from './application-file-preveiw-overlay'

export default function ApproveModal({ open, onOpenChange, onApprove }) {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setIsUploading(true)
      setUploadProgress(0)
    }
  }

  useEffect(() => {
    if (isUploading) {
      const timer = setInterval(() => {
        setUploadProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer)
            setIsUploading(false)
            setUploadComplete(true)
            return 100
          }
          const diff = Math.random() * 10
          return Math.min(oldProgress + diff, 100)
        })
      }, 500)

      return () => {
        clearInterval(timer)
      }
    }
  }, [isUploading])

  const handleSubmit = () => {
    onApprove(file)
    setFile(null)
    setUploadComplete(false)
  }

  const handleDelete = () => {
    setFile(null)
    setUploadComplete(false)
  }

  const handlePreviewClick = () => {
    setIsPreviewOpen(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg font-semibold">
            <CheckCircle2 className="w-6 h-6 mr-2 text-green-500" />
            Mark Application as Completed
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mt-2">
          Please upload the required document to mark this entry as completed.
        </p>
        {!uploadComplete ? (
          <div className="mt-4 border-2 border-dashed rounded-lg p-4 text-center">
            <Input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf,.mp4"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm font-medium">
                {file ? file.name : "Choose a file or drag & drop it here."}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
              </span>
            </label>
            {isUploading && (
              <div className="mt-4">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">
                  Uploading... {Math.round(uploadProgress)}%
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className=' cursor-pointer' onClick={handlePreviewClick}>
            <FileUploadCard
              fileName={file.name}
              fileSize={Math.round(file.size / 1024)}
              onDelete={handleDelete}
            />
          </div>
        )}
        {!file && !uploadComplete && (
          <Button variant="secondary" className="mt-2 w-full" onClick={() => document.getElementById('file-upload')?.click()}>
            Browse File
          </Button>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!uploadComplete}>
            Submit
          </Button>
        </div>
      </DialogContent>
      <FilePreviewOverlay
        file={file}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </Dialog>
  )
}