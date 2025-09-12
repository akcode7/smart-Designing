# User Roles Setup for Authentication

This document explains how to set up the user roles collection for the simplified authentication system.

## Appwrite Database Setup

### 1. Create User Roles Collection

1. Go to your Appwrite Console
2. Navigate to **Databases** → **submissions_db** (or your database)
3. Click **Create Collection**
4. Set the following:
   - **Collection ID**: `user_roles` (as specified in your .env file)
   - **Name**: `user_roles`

### 2. Add Attributes

Add the following attributes to the user_roles collection:

#### Username Attribute
- **Key**: `unique_user_name`
- **Type**: String
- **Size**: 255
- **Required**: Yes
- **Array**: No
- **Default**: (leave empty)

#### User Role Attribute
- **Key**: `user_role`
- **Type**: String
- **Size**: 50
- **Required**: Yes
- **Array**: No
- **Default**: (leave empty)



Configure collection permissions:

#### Create Documents
- **Role**: `any` (for admin setup)
- **Permission**: `create`

#### Read Documents  
- **Role**: `any` (for authentication)
- **Permission**: `read`

#### Update Documents
- **Role**: `any` (for admin management)
- **Permission**: `update`

#### Delete Documents
- **Role**: `any` (for admin management)  
- **Permission**: `delete`

### 4. Add Indexes (Recommended)

1. Go to **Indexes** tab in the collection
2. Click **Create Index**
3. Set:
   - **Key**: `username_role_index`
   - **Type**: `key`
   - **Attributes**: `unique_user_name`, `user_role`
   - **Order**: `ASC`

This will improve query performance during authentication.

### 5. Environment Variables

Ensure the user roles collection ID is in your environment variables:

```bash
# In your .env file (already configured)
VITE_APPWRITE_USER_ROLES_COLLECTION_ID=user_roles
```

## Authentication System

### How It Works

#### Simplified Authentication Flow
1. User enters only their **username** (no password required)
2. System checks `user_roles` collection for:
   - `unique_user_name` matches entered username
   - `user_role` matches required role ("judge" or "administrator")
3. If both conditions are met, user is authenticated
4. Dashboard content is revealed

#### Supported Roles
- **judge** - Access to submissions dashboard (`judging.html`)
- **administrator** - Access to admin dashboard (`Admin_dash.html`)

### Creating Test Users

Use the setup utility to create test users:

1. Navigate to: `http://localhost:3000/setup-users.html`
2. Click "Create Test Users"
3. This creates:
   - **judge1** with role "judge"
   - **admin1** with role "administrator"

### Manual User Creation

To manually add users via Appwrite Console:

```json
{
  "unique_user_name": "judge1",
  "user_role": "judge",
  "full_name": "Test Judge",
  "email": "judge@example.com"
}
```

```json
{
  "unique_user_name": "admin1",
  "user_role": "administrator", 
  "full_name": "Test Administrator",
  "email": "admin@example.com"
}
```

## Testing the Authentication

### Test Judge Access
1. Go to: `http://localhost:3000/judging.html`
2. Enter username: `judge1`
3. Click "Sign in as Judge"
4. Should access submissions dashboard

### Test Admin Access
1. Go to: `http://localhost:3000/Admin_dash.html`
2. Enter username: `admin1`
3. Click "Sign in as Administrator"
4. Should access admin dashboard

### Test Invalid Access
1. Try entering a non-existent username
2. Try entering a username with wrong role (e.g., "admin1" on judge page)
3. Should receive "Invalid username or insufficient permissions" error

## Database Queries for Debugging

You can use Appwrite Console to run these queries:

```javascript
// Check if judge exists
databases.listDocuments(
    'your-database-id',
    'user_roles',
    [
        Query.equal('unique_user_name', 'judge1'),
        Query.equal('user_role', 'judge')
    ]
)

// Check if admin exists
databases.listDocuments(
    'your-database-id',
    'user_roles', 
    [
        Query.equal('unique_user_name', 'admin1'),
        Query.equal('user_role', 'administrator')
    ]
)

// List all users
databases.listDocuments(
    'your-database-id',
    'user_roles'
)
```

## Security Considerations

### Current Implementation
- **Username-only authentication** for simplicity
- **Role-based access control** ensures proper permissions
- **No password complexity** required

### Production Enhancements (Recommended)
- Add password fields with proper hashing
- Implement session tokens or JWT
- Add rate limiting for login attempts
- Implement account lockout after failed attempts
- Add audit logging for authentication events
- Use HTTPS in production
- Implement CSRF protection

## Troubleshooting

### Common Issues

1. **"user_roles collection not found"**
   - Make sure collection exists with exact ID
   - Check environment variables

2. **Authentication not working**
   - Verify usernames exist in collection
   - Check user_role values match exactly ("judge" or "administrator")
   - Check collection permissions

3. **Setup utility not working**
   - Verify database connection
   - Check collection permissions allow document creation
   - Ensure no duplicate usernames

### Debugging Steps

1. Check browser console for errors
2. Verify collection exists in Appwrite Console
3. Check document count in user_roles collection
4. Test queries manually in Appwrite Console
5. Verify environment variables are loaded correctly