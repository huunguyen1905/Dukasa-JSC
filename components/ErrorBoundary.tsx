import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
          return this.props.fallback;
      }
      return (
        <div className="w-full py-20 bg-gray-900 border border-red-900/30 rounded-xl flex flex-col items-center justify-center text-center p-6 m-4">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center text-red-500 mb-4">
                <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Đã xảy ra lỗi tại khu vực này</h3>
            <p className="text-gray-400 mb-6 max-w-md">Hệ thống đã ghi nhận sự cố. Vui lòng tải lại trang hoặc quay lại sau.</p>
            <button 
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-bold text-sm"
            >
                <RefreshCcw size={16} /> Tải Lại Trang
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;