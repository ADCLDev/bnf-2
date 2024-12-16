// lib/firebase/auth.ts
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    User,
    UserCredential
  } from 'firebase/auth';
  import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
  import { auth, db } from './config';
  
  export interface AuthError {
    code: string;
    message: string;
  }
  
  export const authService = {
    // Sign up with email and password
    async signUp(email: string, password: string): Promise<UserCredential> {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Create user document in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          role: 'user',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
  
        return userCredential;
      } catch (error) {
        throw error;
      }
    },
  
    // Sign in with email and password
    async signIn(email: string, password: string): Promise<UserCredential> {
      return signInWithEmailAndPassword(auth, email, password);
    },
  
    // Sign in with Google
    async signInWithGoogle(): Promise<UserCredential> {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Check if user document exists, if not create it
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          role: 'user',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
  
      return userCredential;
    },
  
    // Sign out
    async signOut(): Promise<void> {
      return signOut(auth);
    },
  
    // Reset password
    async resetPassword(email: string): Promise<void> {
      return sendPasswordResetEmail(auth, email);
    },
  
    // Get current user
    getCurrentUser(): User | null {
      return auth.currentUser;
    },
  
    // Listen to auth state changes
    onAuthStateChanged(callback: (user: User | null) => void): () => void {
      return auth.onAuthStateChanged(callback);
    }
  };
  
  export default authService;