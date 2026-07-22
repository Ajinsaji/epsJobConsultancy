import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUpload } from '../../hooks/useUpload';
import { cn } from '../../lib/cn';
import { FileIcon, UploadCloud, CheckCircle, XCircle } from 'lucide-react';

export function FileUploader({
  accept = {
    'application/pdf': ['.pdf'],
    'image/*': ['.jpg', '.jpeg', '.png'],
  },
  maxSize = 5 * 1024 * 1024, // 5MB default
  multiple = false,
  category = 'document',
  onUploadComplete,
  className,
}) {
  const { uploadFile, progress, isUploading, isSuccess, error, reset } = useUpload();

  const onDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      reset(); // clear previous state
      if (rejectedFiles?.length > 0) {
        // Validation caught an issue via react-dropzone
        return;
      }
      
      const file = acceptedFiles[0];
      if (!file) return;

      try {
        const metadata = await uploadFile(file, category);
        if (onUploadComplete) {
          onUploadComplete(metadata);
        }
      } catch (err) {
        // error state is handled by the hook
      }
    },
    [uploadFile, category, onUploadComplete, reset]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
    disabled: isUploading,
  });

  return (
    <div className={cn('w-full', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors',
          isDragActive
            ? 'border-[#CCA43B] bg-[#CCA43B]/10'
            : 'border-slate-300 hover:border-[#1F7BE5] bg-white',
          isUploading && 'pointer-events-none opacity-60'
        )}
      >
        <input {...getInputProps()} />
        
        {isSuccess ? (
          <div className="flex flex-col items-center text-[#25D366]">
            <CheckCircle className="h-10 w-10 mb-2" />
            <span className="text-sm font-semibold">Upload Complete</span>
          </div>
        ) : (
          <>
            <UploadCloud
              className={cn(
                'h-10 w-10 mb-3 transition-colors',
                isDragActive ? 'text-[#CCA43B]' : 'text-slate-400 group-hover:text-[#1F7BE5]'
              )}
            />
            <p className="text-sm font-semibold text-slate-700">
              {isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to browse'}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Supported formats: PDF, JPG, PNG (Max {Math.round(maxSize / 1024 / 1024)}MB)
            </p>
          </>
        )}
      </div>

      {/* Progress Bar */}
      {isUploading && (
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-gradient-to-r from-[#0B4C8C] to-[#1F7BE5] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-600">{progress}%</span>
        </div>
      )}

      {/* Error States */}
      {(error || fileRejections.length > 0) && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          <XCircle className="h-5 w-5" />
          <div className="flex flex-col">
            {error && <span>{error}</span>}
            {fileRejections.map(({ file, errors }) => (
              <span key={file.name}>
                {file.name}: {errors.map(e => e.message).join(', ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
