import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updatePassword,
  User 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  sendResetEmail: (email: string) => Promise<{ success: boolean; message: string }>;
  changePassword: (email: string, oldPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return { success: true, message: "Welcome back!" };
    } catch (error: any) {
      console.error("Login error:", error);
      let message = "Invalid email or password.";
      if (error.code === 'auth/user-not-found') message = "No admin account found with this email.";
      if (error.code === 'auth/wrong-password') message = "Incorrect password.";
      return { success: false, message };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const sendResetEmail = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: "A secure password reset link has been sent to your email." };
    } catch (error: any) {
      console.error("Reset error:", error);
      return { success: false, message: error.message || "Failed to send reset email." };
    }
  };

  const changePassword = async (email: string, oldPass: string, newPass: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, oldPass);
      if (userCredential.user) {
        await updatePassword(userCredential.user, newPass);
        return { success: true, message: "Password updated successfully! Please login with your new password." };
      }
      return { success: false, message: "Failed to verify credentials." };
    } catch (error: any) {
      console.error("Change password error:", error);
      let message = "Failed to update password.";
      if (error.code === 'auth/wrong-password') message = "Incorrect current password.";
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout, 
      sendResetEmail,
      changePassword,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
