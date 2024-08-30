export const uploadFile = (file: File, onProgress: (progress: number) => void): Promise<void> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload-url'); // Replace with your actual upload URL
  
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      };
  
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(new Error('Upload failed'));
        }
      };
  
      xhr.onerror = () => {
        reject(new Error('Upload failed'));
      };
  
      const formData = new FormData();
      formData.append('file', file);
      xhr.send(formData);
    });
  };