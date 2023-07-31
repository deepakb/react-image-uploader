"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios, { AxiosError } from "axios";
import { Upload } from "lucide-react";

interface UploadResponse {
  success: boolean;
  error?: string;
}

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          progress: 0,
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    multiple: true,
  });

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post<UploadResponse>("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          if (!total) return;
          const percent = Math.floor((loaded / total) * 100);
          setUploadProgress((prev) => ({
            ...prev,
            [files[0].name]: percent,
          }));
        },
      });
      if (response.data.success) {
        setUploadSuccess(true);
        setFiles([]);
        setUploadError(false);
      } else {
        setUploadError(true);
      }
    } catch (error) {
      console.log({ error });
      const axiosError = error as AxiosError<UploadResponse>;
      if (axiosError.response?.data?.error) {
        setUploadError(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-stripes-zinc">
      <div
        {...getRootProps()}
        className="mt-[100px] flex flex-row items-center justify-center w-[700px] h-96 border-4 border-dashed border-gray-400 rounded-lg cursor-pointer bg-gray-700/30"
      >
        <div>
          <input {...getInputProps()} />
          <Upload size={64} className="text-primary" />
          <p className="text-primary text-2xl text-black text-center">{`Click to upload pics or drag 'n' drop to begin.`}</p>
        </div>
        <div>
          {files.length > 0 && (
            <div className="mt-4 w-96 text-primary">
              {files.map((file) => (
                <div key={file.name} className="flex items-center justify-between">
                  <p>{file.name}</p>
                  <button onClick={() => setFiles(files.filter((f) => f !== file))}>Remove</button>
                </div>
              ))}
              <button onClick={handleUpload}>Upload</button>
            </div>
          )}
        </div>
      </div>
      {Object.keys(uploadProgress).length > 0 && (
        <div className="mt-4 w-96">
          {files.map((file) => (
            <div key={file.name} className="flex items-center justify-between">
              <p>{file.name}</p>
              <p>{uploadProgress[file.name]}%</p>
            </div>
          ))}
        </div>
      )}
      {uploadSuccess && <p>File uploaded successfully.</p>}
      {uploadError && <p>File upload failed.</p>}
    </div>
  );
};

export default FileUploader;
