# Firebase Setup Guide for IMBOKODO

## 🚀 What's Been Set Up

Your IMBOKODO project now has Firebase integration with:
- ✅ Firebase SDK installed
- ✅ Firebase configuration file (`lib/firebase.ts`)
- ✅ Custom authentication hook (`hooks/useFirebase.ts`)
- ✅ Updated authentication guard (`components/AuthGuard.tsx`)
- ✅ Firebase authentication component (`components/FirebaseAuth.tsx`)
- ✅ Dashboard page (`app/dashboard/page.tsx`)
- ✅ Server running on port 3004

## 🔧 Next Steps to Complete Firebase Setup

### 1. Get Your Firebase Configuration Values

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create one if you haven't)
3. Click on the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. Click on your web app (or create one if needed)
7. Copy the configuration values

### 2. Create Environment Variables

**Great news!** Most of your Firebase configuration is already set up. You only need to add your API key.

Create a `.env.local` file in your project root with just this one variable:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB8pveRiKbJZShCVnW5WlxNbsTOAIFhsq4
```

**Already configured in `lib/firebase.ts`:**
- ✅ Project ID: `myweb-c4c25`
- ✅ Auth Domain: `myweb-c4c25.firebaseapp.com`
- ✅ Storage Bucket: `myweb-c4c25.appspot.com`
- ✅ Messaging Sender ID: `413167663570`
- ✅ App ID: `1:413167663570:web:d755c70c18babd728b700b`

**Your API key is:** `AIzaSyB8pveRiKbJZShCVnW5WlxNbsTOAIFhsq4`

### 3. Enable Authentication in Firebase

1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable "Email/Password" authentication
3. Optionally enable Google, Facebook, or other providers

### 4. Set Up Firestore Database

1. Go to "Firestore Database" in Firebase Console
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location close to your users
5. Create the following collections:
   - `users` - for user profiles
   - `health_records` - for health data
   - `cycle_data` - for menstrual cycle tracking

### 5. Set Up Security Rules

In Firestore Database → Rules, add these basic security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Health records - users can only access their own
    match /health_records/{recordId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Cycle data - users can only access their own
    match /cycle_data/{recordId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## 🎯 How to Use

### Authentication Flow
1. Users visit `/auth` page
2. They can sign up with email/password or sign in
3. After successful authentication, they're redirected to `/dashboard`
4. The dashboard shows their profile and quick access to all features

### Using Firebase in Components

```tsx
import { useFirebase } from '../hooks/useFirebase';

export default function MyComponent() {
  const { user, loading, createDocument, getDocument } = useFirebase();
  
  // Create a new document
  const handleCreate = async () => {
    const result = await createDocument('health_records', {
      userId: user?.uid,
      type: 'blood_pressure',
      value: '120/80',
      date: new Date()
    });
    
    if (result.success) {
      console.log('Document created with ID:', result.id);
    }
  };
  
  // Get a document
  const handleGet = async (docId: string) => {
    const result = await getDocument('health_records', docId);
    if (result.success) {
      console.log('Document data:', result.data);
    }
  };
}
```

## 🔒 Security Features

- **Authentication Guard**: Protects routes from unauthorized access
- **User-specific Data**: Users can only access their own data
- **Secure Rules**: Firestore security rules prevent unauthorized access
- **Environment Variables**: Sensitive config is stored securely

## 🚨 Important Notes

1. **Never commit `.env.local`** to version control
2. **Restart your dev server** after adding environment variables
3. **Test authentication** in incognito mode
4. **Monitor Firebase usage** in the console to avoid unexpected charges

## 🆘 Troubleshooting

### Common Issues:

1. **"Firebase not initialized" error**
   - Check that all environment variables are set correctly
   - Restart your development server

2. **Authentication not working**
   - Verify Email/Password is enabled in Firebase Console
   - Check browser console for error messages

3. **Database access denied**
   - Ensure Firestore security rules are set correctly
   - Check that users are authenticated before accessing data

## 📱 Testing

1. Visit `http://localhost:3004/auth`
2. Create a new account or sign in
3. You should be redirected to `/dashboard`
4. Test the logout functionality
5. Try accessing protected routes without authentication

## 🎉 You're All Set!

Your IMBOKODO project now has a complete Firebase backend with:
- User authentication
- Secure database access
- Protected routes
- User dashboard
- Scalable architecture

The app is ready for development and can handle real users with secure data storage! 