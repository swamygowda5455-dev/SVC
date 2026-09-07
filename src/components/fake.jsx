import React from "react";
import { ServerCrash, Mail, ShieldAlert, RefreshCw } from "lucide-react";

export default function App() {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden select-none">
            {/* Background Decorative Gradients */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-lg w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 shadow-2xl relative z-10 text-center">
                {/* Status Icon */}
                <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center relative">
                    <ServerCrash className="w-10 h-10 text-red-500 animate-pulse" />
                    <span className="absolute top-2 right-2 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 mb-4">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Error 503 • Service Unavailable</span>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
                    Server Down
                </h1>

                {/* Description */}
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                    The server is currently unreachable or undergoing maintenance. Access to this application has been temporarily suspended.
                </p>

                {/* Admin Contact Box */}
                <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-4 mb-6 text-left space-y-2.5">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Required Action
                    </div>
                    <p className="text-sm text-slate-200 font-medium">
                        Please contact the administrator to restore access.
                    </p>
                    <div className="pt-2 border-t border-slate-800/60 flex items-center gap-1.5 text-xs text-slate-400">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>Contact Administrator</span>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleReload}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-red-900/20 cursor-pointer active:scale-[0.98]"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retry Connection</span>
                </button>

                {/* Footer info */}
                <p className="mt-6 text-xs text-slate-500">
                    If you believe this is an error, please reach out to your system administrator.
                </p>
            </div>
        </div>
    );
}
