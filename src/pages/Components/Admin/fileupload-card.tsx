import { FileIcon, CheckCircle, Trash2 } from "lucide-react"

export default function FileUploadCard({ fileName, fileSize, onDelete}) {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <FileIcon className="w-6 h-6 text-red-500" />
          </div>
        </div>
        <div className="flex-grow min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {fileName}
          </p>
          <p className="text-sm text-gray-500">
            {fileSize} KB
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm text-green-500">Completed</span>
          <button className="text-gray-400 hover:text-gray-500" onClick={onDelete}>
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}