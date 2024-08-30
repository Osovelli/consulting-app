export const simulateFileUpload = (file: File, onProgress: (progress: number) => void): Promise<void> => {
  return new Promise((resolve) => {
    let progress = 0;
    const totalSize = file.size;
    const chunkSize = totalSize / 100; // Simulate 100 chunks

    const simulateChunkUpload = () => {
      progress += chunkSize;
      const progressPercentage = Math.min((progress / totalSize) * 100, 100);
      onProgress(progressPercentage);

      if (progressPercentage < 100) {
        setTimeout(simulateChunkUpload, 50); // Simulate network delay
      } else {
        resolve();
      }
    };

    simulateChunkUpload();
  });
};