import { supabase } from '../services/supabaseClient';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

/**
 * Upload an image file to Supabase Storage
 * @param file - The image file to upload
 * @param bucket - The storage bucket name (default: 'vehicle-images')
 * @returns The public URL of the uploaded image
 */
export const uploadImage = async (
    file: File,
    bucket: string = 'vehicle-images'
): Promise<{ url: string | null; error: string | null }> => {
    try {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            return { url: null, error: 'File must be an image' };
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return { url: null, error: 'Image must be less than 5MB' };
        }

        // Development Bypass: If Supabase connection fails or we want to bypass
        try {
            // Generate unique filename
            const fileExt = file.name.split('.').pop()?.toLowerCase();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `vehicles/${fileName}`;

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) {
                console.warn('Supabase upload failed, using persistent fallback:', error.message);
                // Fallback: Use Base64 string for persistence across reloads
                const base64 = await fileToBase64(file);
                return { url: base64, error: null };
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            return { url: publicUrl, error: null };
        } catch (err: any) {
            console.warn('Upload exception, using persistent fallback:', err.message);
            const base64 = await fileToBase64(file);
            return { url: base64, error: null };
        }
    } catch (err: any) {
        console.error('Final upload exception:', err);
        return { url: null, error: err.message || 'Upload failed' };
    }
};

/**
 * Delete an image from Supabase Storage
 * @param url - The public URL of the image to delete
 * @param bucket - The storage bucket name
 */
export const deleteImage = async (
    url: string,
    bucket: string = 'vehicle-images'
): Promise<{ error: string | null }> => {
    try {
        // Extract file path from URL
        const urlParts = url.split('/');
        const filePath = urlParts.slice(urlParts.indexOf('vehicles')).join('/');

        const { error } = await supabase.storage
            .from(bucket)
            .remove([filePath]);

        if (error) {
            return { error: error.message };
        }

        return { error: null };
    } catch (err: any) {
        return { error: err.message || 'Delete failed' };
    }
};
