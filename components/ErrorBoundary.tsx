
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo?: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorInfo: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("DUHAVA System Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
          return this.props.fallback;
      }
      return (
        <div className="w-full min-h-[400px] py-20 bg-brand-black border border-gray-800 rounded-3xl flex flex-col items-center justify-center text-center p-8 relative overflow-hidden group">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-900/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center text-red-500 mb-6 border border-red-900/30 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                    <ShieldAlert size={40} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                    Gián Đoạn Tạm Thời
                </h3>
                
                <p className="text-gray-400 mb-8 max-w-md text-sm leading-relaxed">
                    Hệ thống đã ghi nhận một sự cố nhỏ tại khu vực này. Đội ngũ kỹ thuật DUHAVA đã được thông báo tự động.
                </p>

                <div className="flex gap-4">
                    <button 
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-yellow text-brand-black hover:bg-white rounded-lg transition-all duration-300 font-bold text-sm uppercase tracking-wide shadow-lg hover:shadow-brand-yellow/20"
                    >
                        <RefreshCw size={16} /> Tải Lại Trang
                    </button>
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white hover:bg-gray-700 rounded-lg transition-all duration-300 font-bold text-sm uppercase tracking-wide"
                    >
                        <Home size={16} /> Trang Chủ
                    </button>
                </div>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
