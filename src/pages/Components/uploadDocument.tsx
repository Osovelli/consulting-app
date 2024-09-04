//import React, { useState } from 'react';
import { Progress } from '../../components/ui/progress';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { simulateFileUpload } from '../../api/simulateupload';
//import { PdfIcon } from './icons';
import { getFileIcon } from './reviewDocument';

interface Document {
  id: string;
  serviceId: string;
  file: File;
  additionalInfo: string;
  uploadProgress: number;
  uploadStatus: 'uploading' | 'completed' | 'failed';
}

interface UploadedDocument {
  id: string;
  serviceId: string;
  file: File;
  uploadProgress: number;
  uploadStatus: 'uploading' | 'completed' | 'failed';
  additionalInfo: string;
}

interface ServiceInfo {
  serviceId: string;
  additionalInfo: string;
}

/*interface UploadFormProps {
  serviceName: string;
  serviceId: string;
  documents: Document[];
  serviceInfo: ServiceInfo;
  onUploadDocument: (document: Document) => void;
  onUpdateDocument: (document: Document) => void;
  onRemoveDocument: (documentId: string) => void;
  onUpdateServiceInfo: (serviceId: string, info: string) => void;
}*/

interface UploadFormProps {
  serviceName: string;
  serviceId: string;
  onUpdateDocuments: (documents: UploadedDocument[]) => void;
  onUpdateAdditionalInfo: (serviceId: string, info: string) => void;
}


const UploadForm = ({
  serviceId,
  serviceName,
  onUpdateDocuments,
  onUpdateAdditionalInfo}: UploadFormProps) => {

  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');

  useEffect(() => {
    onUpdateDocuments(uploadedDocuments);
  }, [uploadedDocuments, onUpdateDocuments]);

  const handleFileUpload = async (file: File) => {
    const allowedExtensions = ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'png', 'jpeg'];
    const documentId = uuidv4();
    const newDocument: Document = {
      id: documentId,
      serviceId,
      file,
      additionalInfo: '',
      uploadProgress: 0,
      uploadStatus: 'uploading'
    };

    setUploadedDocuments(prev => [...prev, newDocument]);

    const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
    
    if (!allowedExtensions.includes(fileExt)) {
      setUploadedDocuments(prev => 
        prev.map(doc => doc.id === documentId ? {...doc, uploadStatus: 'failed'} : doc)
      );
    } else {
      try {
        await simulateFileUpload(file, (progress) => {
          setUploadedDocuments(prev => 
            prev.map(doc => doc.id === documentId ? {...doc, uploadProgress: progress} : doc)
          );
        });
        setUploadedDocuments(prev => 
          prev.map(doc => doc.id === documentId ? {...doc, uploadStatus: 'completed'} : doc)
        );
      } catch (error) {
        setUploadedDocuments(prev => 
          prev.map(doc => doc.id === documentId ? {...doc, uploadStatus: 'failed'} : doc)
        );
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach(handleFileUpload);
    }
  };

  const handleRetry = (docId: string) => {
    const docToRetry = uploadedDocuments.find(doc => doc.id === docId);
    if (docToRetry) {
      handleFileUpload(docToRetry.file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      Array.from(event.dataTransfer.files).forEach(handleFileUpload);
    }
  };

  const handleAdditionalInfoChange = (info: string) => {
    setAdditionalInfo(info);
    onUpdateAdditionalInfo(serviceId, info);
  };

  const handleRemoveDocument = (docId: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{serviceName}</h3>
        <button className="text-red-500">&times;</button>
      </div>
      {uploadedDocuments.length === 0 &&
      (<div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <svg className="mx-auto mb-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <p className="mb-2">Choose file(s) or drag & drop them here.</p>
        <p className="text-sm text-gray-500 mb-4">JPEG, PNG, PDF, DOCX, DOC, TXT, XLSX and MP4 formats, up to 50 MB.</p>
        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Browse File(s)
          <input type="file" className="hidden" onChange={handleFileChange} accept=".jpeg,.jpg,.png,.pdf,.docx,.doc,.txt,.xlsx,.mp4" />
        </label>
      </div>)
      }
      <div className="mt-4">
        {uploadedDocuments.map((doc) => (
          <div key={doc.id} className="mb-2">
            {doc.uploadStatus === 'uploading' && (
              <div className='space-y-2'>
                <div className='space-y-2 flex'>
                  {getFileIcon(doc.file.name)}
                  <div className='space-y-1'>
                    <p>{doc.file.name}</p>
                    <div className="flex gap-1 items-end leading-none text-sm">
                      <p className='text-xs leading-none'>0 KB of 120 KB.</p>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M8 2C8.15913 2 8.31174 2.06321 8.42426 2.17574C8.53679 2.28826 8.6 2.44087 8.6 2.6V4.4C8.6 4.55913 8.53679 4.71174 8.42426 4.82426C8.31174 4.93679 8.15913 5 8 5C7.84087 5 7.68826 4.93679 7.57574 4.82426C7.46321 4.71174 7.4 4.55913 7.4 4.4V2.6C7.4 2.44087 7.46321 2.28826 7.57574 2.17574C7.68826 2.06321 7.84087 2 8 2ZM8 11C8.15913 11 8.31174 11.0632 8.42426 11.1757C8.53679 11.2883 8.6 11.4409 8.6 11.6V13.4C8.6 13.5591 8.53679 13.7117 8.42426 13.8243C8.31174 13.9368 8.15913 14 8 14C7.84087 14 7.68826 13.9368 7.57574 13.8243C7.46321 13.7117 7.4 13.5591 7.4 13.4V11.6C7.4 11.4409 7.46321 11.2883 7.57574 11.1757C7.68826 11.0632 7.84087 11 8 11ZM14 8C14 8.15913 13.9368 8.31174 13.8243 8.42426C13.7117 8.53679 13.5591 8.6 13.4 8.6H11.6C11.4409 8.6 11.2883 8.53679 11.1757 8.42426C11.0632 8.31174 11 8.15913 11 8C11 7.84087 11.0632 7.68826 11.1757 7.57574C11.2883 7.46321 11.4409 7.4 11.6 7.4H13.4C13.5591 7.4 13.7117 7.46321 13.8243 7.57574C13.9368 7.68826 14 7.84087 14 8ZM5 8C5 8.15913 4.93679 8.31174 4.82426 8.42426C4.71174 8.53679 4.55913 8.6 4.4 8.6H2.6C2.44087 8.6 2.28826 8.53679 2.17574 8.42426C2.06321 8.31174 2 8.15913 2 8C2 7.84087 2.06321 7.68826 2.17574 7.57574C2.28826 7.46321 2.44087 7.4 2.6 7.4H4.4C4.55913 7.4 4.71174 7.46321 4.82426 7.57574C4.93679 7.68826 5 7.84087 5 8ZM12.2426 12.2426C12.1301 12.3551 11.9775 12.4183 11.8184 12.4183C11.6593 12.4183 11.5067 12.3551 11.3942 12.2426L10.1216 10.97C10.0123 10.8568 9.95183 10.7053 9.9532 10.548C9.95456 10.3906 10.0177 10.2402 10.1289 10.1289C10.2402 10.0177 10.3906 9.95456 10.548 9.9532C10.7053 9.95183 10.8568 10.0123 10.97 10.1216L12.2426 11.3936C12.2984 11.4493 12.3426 11.5155 12.3728 11.5883C12.403 11.6612 12.4186 11.7393 12.4186 11.8181C12.4186 11.8969 12.403 11.975 12.3728 12.0479C12.3426 12.1207 12.2984 12.1869 12.2426 12.2426ZM5.8784 5.8784C5.76588 5.99088 5.6133 6.05407 5.4542 6.05407C5.2951 6.05407 5.14252 5.99088 5.03 5.8784L3.758 4.6064C3.64542 4.4939 3.58213 4.34127 3.58208 4.18211C3.58202 4.02295 3.6452 3.87028 3.7577 3.7577C3.8702 3.64512 4.02283 3.58183 4.18199 3.58178C4.34115 3.58172 4.49382 3.6449 4.6064 3.7574L5.8784 5.03C5.99088 5.14252 6.05407 5.2951 6.05407 5.4542C6.05407 5.6133 5.99088 5.76588 5.8784 5.8784ZM3.758 12.2426C3.64552 12.1301 3.58233 11.9775 3.58233 11.8184C3.58233 11.6593 3.64552 11.5067 3.758 11.3942L5.0306 10.1216C5.08595 10.0643 5.15216 10.0186 5.22536 9.98714C5.29856 9.95569 5.37729 9.93914 5.45696 9.93845C5.53663 9.93776 5.61563 9.95294 5.68937 9.98311C5.76311 10.0133 5.8301 10.0578 5.88644 10.1142C5.94277 10.1705 5.98732 10.2375 6.01749 10.3112C6.04766 10.385 6.06284 10.464 6.06215 10.5436C6.06146 10.6233 6.04491 10.702 6.01346 10.7752C5.98202 10.8484 5.93631 10.9147 5.879 10.97L4.607 12.2426C4.55128 12.2984 4.4851 12.3426 4.41226 12.3728C4.33943 12.403 4.26135 12.4186 4.1825 12.4186C4.10365 12.4186 4.02557 12.403 3.95274 12.3728C3.8799 12.3426 3.81372 12.2984 3.758 12.2426ZM10.1216 5.8784C10.0091 5.76588 9.94593 5.6133 9.94593 5.4542C9.94593 5.2951 10.0091 5.14252 10.1216 5.03L11.3936 3.7574C11.5061 3.64482 11.6587 3.58153 11.8179 3.58148C11.977 3.58142 12.1297 3.6446 12.2423 3.7571C12.3549 3.86961 12.4182 4.02223 12.4182 4.18139C12.4183 4.34055 12.3551 4.49322 12.2426 4.6058L10.97 5.8784C10.8575 5.99088 10.7049 6.05407 10.5458 6.05407C10.3867 6.05407 10.2341 5.99088 10.1216 5.8784Z" fill="#C1FA6B"/>
                      </svg>
                      <p>Uploading...</p>
                    </div>
                  </div>
                </div>
                <Progress value={doc.uploadProgress} className="w-1/4" />             
              </div>
            )}
            {doc.uploadStatus === 'completed' && (
              <div className='space-y-2 flex'>
                {getFileIcon(doc.file.name)}
                <div className='space-y-1'>
                  <p>{doc.file.name}</p>
                  <div className="flex gap-1 items-end leading-none text-sm">
                    <p className='text-xs leading-none'>0 KB of 120 KB.</p>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z" fill="#1C7F4E"/>
                    </svg>
                    <p>completed</p>
                    <div className='ml-20'>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleRemoveDocument(doc.id)}>
                        <path d="M13.75 5.5H17.5V7H16V16.75C16 16.9489 15.921 17.1397 15.7803 17.2803C15.6397 17.421 15.4489 17.5 15.25 17.5H4.75C4.55109 17.5 4.36032 17.421 4.21967 17.2803C4.07902 17.1397 4 16.9489 4 16.75V7H2.5V5.5H6.25V3.25C6.25 3.05109 6.32902 2.86032 6.46967 2.71967C6.61032 2.57902 6.80109 2.5 7 2.5H13C13.1989 2.5 13.3897 2.57902 13.5303 2.71967C13.671 2.86032 13.75 3.05109 13.75 3.25V5.5ZM14.5 7H5.5V16H14.5V7ZM7.75 9.25H9.25V13.75H7.75V9.25ZM10.75 9.25H12.25V13.75H10.75V9.25ZM7.75 4V5.5H12.25V4H7.75Z" fill="#525866"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {doc.uploadStatus === 'failed' && (
              <div className='space-y-2 flex'>
                {getFileIcon(doc.file.name)}
                <div className='space-y-1 w-1/3'>
                  <p className='text-red-500'>{doc.file.name}</p>
                  <div className="flex gap-1 items-end leading-none text-sm justify-between">
                    <div className='flex items-center gap-1'>
                    <p className='text-xs leading-none'>0 KB of 120 KB.</p>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z" fill="#FF0000"/>
                    </svg>
                    <p>failed</p>
                    </div>
                    <button className='' onClick={() => handleRemoveDocument(doc.id)}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.75 5.5H17.5V7H16V16.75C16 16.9489 15.921 17.1397 15.7803 17.2803C15.6397 17.421 15.4489 17.5 15.25 17.5H4.75C4.55109 17.5 4.36032 17.421 4.21967 17.2803C4.07902 17.1397 4 16.9489 4 16.75V7H2.5V5.5H6.25V3.25C6.25 3.05109 6.32902 2.86032 6.46967 2.71967C6.61032 2.57902 6.80109 2.5 7 2.5H13C13.1989 2.5 13.3897 2.57902 13.5303 2.71967C13.671 2.86032 13.75 3.05109 13.75 3.25V5.5ZM14.5 7H5.5V16H14.5V7ZM7.75 9.25H9.25V13.75H7.75V9.25ZM10.75 9.25H12.25V13.75H10.75V9.25ZM7.75 4V5.5H12.25V4H7.75Z" fill="#FF0000"/>
                      </svg>
                    </button>
                  </div>
                  <span  className='underline text-red-500 hover:cursor-pointer' onClick={()=>handleRetry(doc.id)}>Try Again</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Additional information</h4>
        <textarea 
          className="w-full border rounded-lg p-2"
          placeholder="Kindly input additional information if any"
          rows={3}
          value={additionalInfo || ''}
          onChange={(e) => handleAdditionalInfoChange(e.target.value)}
        ></textarea>
        <p className="text-right text-sm text-gray-500">{(additionalInfo.length || 0)}/200</p>
      </div>
    </div>
  );
};

interface UploadDocumentProps {
  selectedServices: string[];
  services: { id: string; name: string }[];
  onUpdateDocuments: (documents: UploadedDocument[]) => void;
  onUpdateAdditionalInfo: (serviceId: string, info: string) => void;
}

// UploadDocument component that uses UploadForm for each selected service
const UploadDocument = ({
  selectedServices=[],
  services,
  onUpdateDocuments,
  onUpdateAdditionalInfo
}: UploadDocumentProps) => {

  /*const handleFileUpload = (serviceId: number, file: File) => {
    console.log(`File uploaded for ${serviceId}:`, file.name);
    // Here you would typically handle the file upload, perhaps sending it to a server
  };*/

  return (
    <div className='font-hubot'>
      <h2 className="text-2xl font-bold mb-6">Upload Supporting Documents</h2>
      {selectedServices.map((serviceId) => {
        const service = services.find(s => s.id === serviceId);
        if (!service) return null; // Skip if service not found
        return (
          <UploadForm
            key={serviceId} 
            serviceId={serviceId}
            serviceName={service.name}
            onUpdateDocuments={onUpdateDocuments}
            onUpdateAdditionalInfo={onUpdateAdditionalInfo}
          />
        );
      })}
    </div>
  );
};

export default UploadDocument;