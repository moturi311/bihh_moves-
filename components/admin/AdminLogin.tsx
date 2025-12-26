import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Lock, Mail, Loader2, UserPlus, LogIn } from 'lucide-react';

interface AdminLoginProps {
    onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        // Development Bypass: Allow 'admin' or 'admin@bihh.com' with 'admin123'
        if ((email === 'admin' || email === 'admin@bihh.com') && password === 'admin123') {
            console.log('Logging in with development bypass');
            setTimeout(() => {
                onLoginSuccess();
                setLoading(false);
            }, 500);
            return;
        }

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                onLoginSuccess();
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage('Signup successful! Please check your email to confirm your account, or try logging in if email confirmation is disabled.');
                setIsLogin(true);
            }
        } catch (err: any) {
            setError(err.message || `Failed to ${isLogin ? 'login' : 'sign up'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F2EB] flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#D6D1C7]">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif text-[#2C2A26] mb-2">Bihh Admin</h2>
                    <p className="text-[#5D5A53]">
                        {isLogin ? 'Sign in to manage the platform' : 'Create an admin account'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                        <span>⚠️</span> {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                        <span>✅</span> {message}
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#2C2A26] mb-2">Username or Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8A29E]" />
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none transition-colors"
                                placeholder="admin"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#2C2A26] mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8A29E]" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none transition-colors"
                                placeholder="admin123"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2C2A26] text-[#F5F2EB] py-3 rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {isLogin ? 'Signing in...' : 'Signing up...'}
                            </>
                        ) : (
                            <>
                                {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError(null);
                            setMessage(null);
                        }}
                        className="text-[#2C2A26] hover:underline text-sm font-medium"
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
