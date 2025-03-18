import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './config';

// Initialize Firebase Storage
const storage = getStorage(app);

/**
 * Upload a file to Firebase Storage
 * @param file The file to upload
 * @param path The path to store the file at (e.g., 'tokens/logo-123.png')
 * @returns Promise with the download URL
 */
export const uploadFile = async (file: File, path: string): Promise<string> => {
  try {
    // Create a storage reference
    const fileRef = storageRef(storage, path);
    
    // Upload the file
    const snapshot = await uploadBytes(fileRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Upload a token logo to Firebase Storage
 * @param file The logo file
 * @param tokenId Identifier for the token
 * @returns Promise with the download URL
 */
export const uploadTokenLogo = async (file: File, tokenId: string): Promise<string> => {
  // Create a unique file name with timestamp
  const timestamp = Date.now();
  const fileName = `${tokenId}-${timestamp}.${file.name.split('.').pop()}`;
  
  // Construct the storage path
  const path = `tokens/${fileName}`;
  
  // Upload and return the download URL
  return uploadFile(file, path);
};

/**
 * Generate a placeholder logo URL for tokens without a logo
 * @param symbol The token symbol
 * @returns URL to a placeholder logo
 */
export const generatePlaceholderLogo = (symbol: string): string => {
  // Use the static profile picture from public directory
  return '/profile.jpg';
  
  // Previous implementation (commented out for reference)
  /*
  // Use first two characters of the symbol
  const initials = symbol.substring(0, 2).toUpperCase();
  
  // Generate a random color based on the symbol (for consistency)
  const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  const color = `hsl(${hue}, 70%, 50%)`;
  
  // Create an SVG data URL
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="${color}" />
      <text x="50" y="50" font-family="Arial" font-size="40" fill="white" text-anchor="middle" dominant-baseline="central">
        ${initials}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
  */
}; 