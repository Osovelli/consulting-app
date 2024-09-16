import { useState, useRef } from 'react'
<<<<<<< HEAD:src/pages/Admin/newsletter/newsletter-editor.tsx
import { Button } from '../../../components/ui/button'
import { Input } from "../../../components/ui/input"
import { Card, CardContent } from "../../../components/ui/card"
=======
import { Button } from '../../../../components/ui/button'
import { Input } from "../../../../components/ui/input"
import { Card, CardContent } from "../../../../components/ui/card"
>>>>>>> 89b62c0236ef745e0252f38f35eeaba26d610da7:src/pages/Components/Admin/newsletter/newsletter-editor.tsx
import { ArrowLeft, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link, Plus, Undo, Redo, MoreHorizontal, SaveIcon } from 'lucide-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { NewsletterPreview } from './newsletter-preview'

//import FileUploadCard from '../fileupload-card'
//import { Progress } from '../../../../components/ui/progress'
<<<<<<< HEAD:src/pages/Admin/newsletter/newsletter-editor.tsx
import { DeleteLineIcon, SaveLineIcon,  SendPlaneLineIcon } from '../../Components/icons'
=======
import { DeleteLineIcon, SaveLineIcon,  SendPlaneLineIcon } from '../../icons'
>>>>>>> 89b62c0236ef745e0252f38f35eeaba26d610da7:src/pages/Components/Admin/newsletter/newsletter-editor.tsx

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

export function NewsletterEditor({onClose}) {
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const quillRef = useRef<ReactQuill>(null)

  const handleSend = () => {
    setIsPreview(true)
  }

  const handleBackFromPreview = () => {
    setIsPreview(false)
  }

  const handleFinalSend = () => {
    // Implement the logic to actually send the newsletter
    console.log('Sending newsletter:', { subject, content })
    onClose()
  }

  if (isPreview) {
    return (
      <NewsletterPreview
        subject={subject}
        content={content}
        onBack={handleBackFromPreview}
        onSend={handleFinalSend}
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-[#F6F8FA] min-h-dvh font-hubot">
      <div className="flex items-center mb-4 bg-white -mx-4 px-4">
        <ArrowLeft className="w-4 h-4 mr-2" onClick={onClose} />
        <h1 className="text-lg font-medium">Create newsletter</h1>
      </div>
      <Card>
        <CardContent className="p-6">
          <Input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mb-1"
          />
          <ReactQuill 
          value={content} 
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="mb-20 h-80 "
        />
          <div className="flex items-center justify-between space-x-4">
            <Button variant="outline"><Link className="h-4 w-4 mr-2" />Attach files</Button>
            <div className='space-x-2'>
            <Button variant={'destructive'} className='border-[#FF0000] hover:text-white border text-[#FF0000] gap-1 bg-white'>
              <DeleteLineIcon />
              Delete
            </Button>
            <Button variant="outline" className='border-0'>Schedule for later</Button>
            <Button className='gap-1' variant="outline">
              <SaveLineIcon />
              Save as draft
            </Button>
            <Button className='gap-1 bg-[#C1FA6B] text-black hover:bg-[#d8eca0]' onClick={handleSend}>
              <SendPlaneLineIcon />
              Send
            </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}