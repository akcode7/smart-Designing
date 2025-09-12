# Participant Login System Setup

This document explains how to set up the participant ID database collection for the login system.

## Appwrite Database Setup

### 1. Create Participants Collection

1. Go to your Appwrite Console
2. Navigate to **Databases** → **submissions_db** (or your database)
3. Click **Create Collection**
4. Set the following:
   - **Collection ID**: `participants` (as specified in your .env file)
   - **Name**: `Participants`

### 2. Add Attributes

Add the following attribute to the participants collection:

#### Unique ID Attribute
- **Key**: `uniqueId`
- **Type**: String
- **Size**: 255
- **Required**: Yes
- **Array**: No
- **Default**: (leave empty)

### 3. Set Permissions

Configure collection permissions:

#### Create Documents
- **Role**: `any` (for admin bulk upload)
- **Permission**: `create`

#### Read Documents  
- **Role**: `any` (for login validation)
- **Permission**: `read`

#### Update Documents
- **Role**: `any` (for admin management)
- **Permission**: `update`

#### Delete Documents
- **Role**: `any` (for admin management)  
- **Permission**: `delete`

### 4. Add Index (Optional but Recommended)

1. Go to **Indexes** tab in the collection
2. Click **Create Index**
3. Set:
   - **Key**: `uniqueId_index`
   - **Type**: `key`
   - **Attributes**: `uniqueId`
   - **Order**: `ASC`

This will improve query performance when checking login credentials.

### 5. Update Environment Variables

Add the participants collection ID to your environment variables:

```bash
# In your .env file (already configured)
VITE_APPWRITE_PARTICIPANTS_COLLECTION_ID=participants
```

Then update your `index.html` to use this environment variable:

```javascript
const PARTICIPANTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PARTICIPANTS_COLLECTION_ID || 'participants';
```

## How the System Works

### 1. Admin Workflow
1. Admin clicks "Admin Login" on the login screen
2. Admin uploads participant IDs via:
   - **Text input**: One ID per line
   - **CSV file**: One ID per line or CSV with uniqueId column
3. System validates and stores unique IDs in the participants collection
4. Admin can view/manage existing participant IDs

### 2. Participant Workflow
1. Participant enters their assigned unique ID on login screen
2. System validates ID against participants collection
3. If valid, participant is logged in and can access submission form
4. Form submission uses the logged-in unique ID automatically
5. System prevents duplicate submissions (one per participant)

### 3. Security Features
- Only pre-registered IDs can log in
- No duplicate submissions allowed
- Session management prevents unauthorized access
- Admin interface for ID management

## CSV Upload Format

### Option 1: Simple text file (one ID per line)
```
participant001
participant002
participant003
student-john-doe
team-alpha-2024
```

### Option 2: CSV with header
```csv
unique_id
participant001
participant002
participant003
student-john-doe
team-alpha-2024
```

### Option 3: CSV without header
```csv
participant001
participant002
participant003
student-john-doe
team-alpha-2024
```

## Testing the Setup

1. **Test Admin Upload**:
   - Go to admin panel
   - Upload a few test participant IDs
   - Verify they appear in the participant list

2. **Test Participant Login**:
   - Try logging in with a valid participant ID
   - Try logging in with an invalid ID
   - Verify form access is properly controlled

3. **Test Form Submission**:
   - Submit a form while logged in
   - Try to submit again (should be prevented)
   - Verify submission uses correct participant ID

## Troubleshooting

### Common Issues

1. **"participants_collection not found"**
   - Make sure you created the collection with the exact ID
   - Check your environment variables

2. **Login not working**
   - Verify participant IDs are uploaded correctly
   - Check collection permissions
   - Check browser console for errors

3. **Admin upload failing**
   - Verify database and collection permissions
   - Check file format (CSV should be UTF-8)
   - Ensure no special characters in IDs

### Database Queries for Debugging

You can use Appwrite Console to run these queries:

```javascript
// Check if participant exists
databases.listDocuments(
    'your-database-id',
    'participants',
    [Query.equal('uniqueId', 'test-participant')]
)

// List all participants
databases.listDocuments(
    'your-database-id', 
    'participants'
)
```