# Appwrite Setup Guide

This guide will help you set up the Appwrite Database and Storage for the submission form application.

## Prerequisites
- Appwrite Cloud account or self-hosted Appwrite instance
- Project already created with the following details from your .env file:
  - Project ID: `68c42445002081ef4848`
  - Bucket ID: `68c4345a001914d709aa`

## Required Setup

### 1. Create Database
1. Go to your Appwrite Console
2. Navigate to "Databases" section
3. Create a new database with ID: `submissions_db`

### 2. Create Collection
1. Inside the `submissions_db` database
2. Create a new collection with ID: `submissions_collection`

### 3. Configure Collection Attributes
Add the following attributes to your collection:

| Attribute ID | Type | Size | Required | Array |
|-------------|------|------|----------|-------|
| `uniqueId` | String | 255 | Yes | No |
| `problemStatement` | String | 500 | Yes | No |
| `logoFileId` | String | 255 | Yes | No |
| `posterFileId` | String | 255 | Yes | No |
| `logoFileName` | String | 255 | No | No |
| `posterFileName` | String | 255 | No | No |
| `submittedAt` | String | 255 | Yes | No |

### 4. Configure Permissions
Set the following permissions for the collection:

#### Read Permissions:
- `users` (for authenticated users)
- `guests` (for public access if needed)

#### Write Permissions:
- `users` (for authenticated users)
- `guests` (for public submissions if needed)

#### Update Permissions:
- `users` (for authenticated users)

#### Delete Permissions:
- `users` (for authenticated users)

### 5. Configure Storage Bucket
1. Go to "Storage" section in Appwrite Console
2. Your existing bucket ID: `68c4345a001914d709aa`
3. Configure the following settings:
   - **File Security**: Enabled
   - **Maximum File Size**: 5MB (5242880 bytes)
   - **Allowed File Extensions**: jpg, jpeg, png, gif, webp
   - **Encryption**: Enabled (recommended)
   - **Antivirus**: Enabled (if available)

#### Bucket Permissions:
- **Read**: `users`, `guests` (for public access to images)
- **Create**: `users`, `guests` (for file uploads)
- **Delete**: `users` (for file deletion)

## Environment Variables
Make sure your `.env` file contains:

```env
VITE_APPWRITE_PROJECT_ID = "68c42445002081ef4848"
VITE_APPWRITE_PROJECT_NAME = "SmartDesignGAI"
VITE_APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1"
VITE_APPWRITE_BUCKET_ID = "68c4345a001914d709aa"
VITE_APPWRITE_DATABASE_ID = "submissions_db"
VITE_APPWRITE_COLLECTION_ID = "submissions_collection"
```

## Testing the Setup

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test form submission**:
   - Go to `http://localhost:5173/index.html`
   - Fill out the form with test data
   - Upload images (ensure they're under 5MB)
   - Submit the form

3. **Test data retrieval**:
   - Go to `http://localhost:5173/judging.html`
   - Click "Fetch Data" to load submissions
   - Verify images display correctly
   - Test search and filter functionality

## Features Implemented

### Form Submission (`index.html`)
- ✅ Upload images to Appwrite Storage
- ✅ Store metadata in Appwrite Database
- ✅ File size validation (5MB limit)
- ✅ Progress indicators during upload
- ✅ Error handling with user feedback
- ✅ Form validation

### Dashboard (`judging.html`)
- ✅ Fetch submissions from Appwrite Database
- ✅ Display images from Appwrite Storage
- ✅ Real-time search and filtering
- ✅ Image modal for full-size viewing
- ✅ Delete functionality (removes from both database and storage)
- ✅ Error handling for failed image loads
- ✅ Statistics dashboard

## API Endpoints Used

### Storage API
- `storage.createFile()` - Upload images
- `storage.getFileView()` - Get image URLs for display
- `storage.deleteFile()` - Delete images

### Database API
- `databases.createDocument()` - Create submission records
- `databases.listDocuments()` - Fetch all submissions
- `databases.deleteDocument()` - Delete submission records

## Security Considerations

1. **File Validation**: Client-side validation for file types and sizes
2. **Permissions**: Proper read/write permissions set on collection and bucket
3. **Error Handling**: Graceful handling of upload failures and network errors
4. **File Cleanup**: Automatic cleanup of storage files when documents are deleted

## Troubleshooting

### Common Issues:

1. **Images not displaying**: Check bucket permissions and file IDs
2. **Upload failures**: Verify file size limits and allowed extensions
3. **Database errors**: Ensure collection attributes are properly configured
4. **Network errors**: Check Appwrite endpoint and project ID

### Debug Tips:

1. Check browser console for error messages
2. Verify Appwrite Console for uploaded files and documents
3. Test with different image formats and sizes
4. Ensure environment variables are loaded correctly
