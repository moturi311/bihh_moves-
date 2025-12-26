import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadImage } from '../../utils/imageUpload';

interface ImageUploadProps {
    currentImageUrl?: string;
    onImageUploaded: (url: string) => void;
    onImageRemoved?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    currentImageUrl,
    onImageUploaded,
    onImageRemoved,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            await handleFileUpload(files[0]);
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            await handleFileUpload(files[0]);
        }
    };

    const handleFileUpload = async (file: File) => {
        setError(null);
        setIsUploading(true);
        setUploadProgress(0);

        // Simulate progress (since Supabase doesn't provide upload progress)
        const progressInterval = setInterval(() => {
            setUploadProgress((prev) => Math.min(prev + 10, 90));
        }, 200);

        const { url, error: uploadError } = await uploadImage(file);

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (uploadError) {
            setError(uploadError);
            setIsUploading(false);
            return;
        }

        if (url) {
            onImageUploaded(url);
        }

        setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
        }, 500);
    };

    const handleRemoveImage = () => {
        if (onImageRemoved) {
            onImageRemoved();
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-[#2C2A26] mb-2">
                Vehicle Image
            </label>

            {currentImageUrl ? (
                <div className="relative">
                    <img
                        src={currentImageUrl}
                        alt="Vehicle"
                        className="w-full h-48 object-cover rounded-lg border-2 border-[#D6D1C7]"
                    />
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
            ${isDragging
                            ? 'border-[#2C2A26] bg-[#F5F2EB]'
                            : 'border-[#D6D1C7] hover:border-[#2C2A26] hover:bg-[#F5F2EB]'
                        }
          `}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    {isUploading ? (
                        <div className="space-y-3">
                            <Upload className="w-12 h-12 mx-auto text-[#2C2A26] animate-pulse" />
                            <p className="text-sm text-[#2C2A26] font-medium">
                                Uploading... {uploadProgress}%
                            </p>
                            <div className="w-full bg-[#D6D1C7] rounded-full h-2">
                                <div
                                    className="bg-[#2C2A26] h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Upload className="w-12 h-12 mx-auto text-[#5D5A53]" />
                            <p className="text-sm text-[#2C2A26] font-medium">
                                Drag & drop an image here
                            </p>
                            <p className="text-xs text-[#5D5A53]">
                                or click to browse (max 5MB)
                            </p>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <p className="text-sm text-red-600 mt-2">
                    {error}
                </p>
            )}

            {!currentImageUrl && !isUploading && (
                <p className="text-xs text-[#5D5A53] mt-2">
                    Supported formats: JPEG, JPG, PNG, WebP, GIF
                </p>
            )}
        </div>
    );
};

export default ImageUpload;
