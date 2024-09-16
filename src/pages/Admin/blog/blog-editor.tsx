import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, MoreVertical, Upload } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
//import { Textarea } from "../../../../components/ui/textarea"
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import FileUploadCard from '../fileupload-card'
import { Progress } from '../../../components/ui/progress'
import { UploadCloudIcon } from '../../Components/icons'

export default function BlogEditor({onClose}) {
  const [tags, setTags] = useState<string[]>([])
  const [permalink, setPermalink] = useState('https://debusinessconsulting.com/blog/[Blog title]')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const quillRef = useRef<ReactQuill>(null)

  const navigate = useNavigate()


  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value) {
      setTags([...tags, event.currentTarget.value])
      event.currentTarget.value = ''
    }
  }

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

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0]
        const reader = new FileReader()

        reader.onload = (e) => {
          const quill = quillRef.current?.getEditor()
          if (quill) {
            const range = quill.getSelection(true)
            const imageUrl = e.target?.result as string
            quill.insertEmbed(range.index, 'image', imageUrl)
            setImages(prevImages => [...prevImages, imageUrl])
          }
        }

        reader.readAsDataURL(file)
      }
    }
  }

  const deleteImage = (imageUrl: string) => {
    const quill = quillRef.current?.getEditor()
    if (quill) {
      const delta = quill.getContents()
      const newDelta = delta.ops?.filter(op => op.insert?.image !== imageUrl)
      quill.setContents(newDelta)
      setImages(prevImages => prevImages.filter(img => img !== imageUrl))
    }
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
    }

  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <div className="w-full sm:max-w-6xl mx-auto px-8 py-12">
      <div className="flex justify-between items-center -mx-8 sm:-mx-0 mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate('/blog')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">Create new blog post</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">Archive</Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Publish</Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>   
          <Input
            placeholder="Add tags..."
            onKeyPress={handleAddTag}
            className="mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Permalink:</span>
            <Button variant="ghost" size="sm" className="text-blue-500">
              Edit
            </Button>
          </div>
          <Input
            value={permalink}
            onChange={(e) => setPermalink(e.target.value)}
            className="mt-1 text-[#1C7F4E]"
          />
        </div>
        <div className="flex justify-start">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select author" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="author1">Author 1</SelectItem>
              <SelectItem value="author2">Author 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 items-center border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <UploadCloudIcon  />
          {!uploadComplete ? (
          <div className="">
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
          <div className=' cursor-pointer'>
            <FileUploadCard
              fileName={file.name}
              fileSize={Math.round(file.size / 1024)}
              onDelete={handleDelete}
            />
          </div>
        )}
        {!file && !uploadComplete && (
          <Button variant="secondary" className="mt-2" onClick={() => document.getElementById('file-upload')?.click()}>
            Browse File
          </Button>
        )}
        </div>

        <ReactQuill 
          value={content} 
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="h-64 "
        />
        {images.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Inserted Images:</h3>
          <div className="flex flex-wrap gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt={`Inserted image ${index + 1}`} className="w-24 h-24 object-cover" />
                <button
                  onClick={() => deleteImage(img)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  )
}