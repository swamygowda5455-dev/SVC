import React, { useState, useEffect } from "react";

export default function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [hostname, setHostname] = useState("srividyachetana.edu.in");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname || "srividyachetana.edu.in");
      document.title = `${window.location.hostname || "srividyachetana.edu.in"} - This site can’t be reached`;
    }
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white text-[#3c4043] font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif] flex flex-col items-center justify-start pt-16 md:pt-24 px-6 select-text">
      <div className="w-full max-w-[600px] text-left">
        
        {/* Chrome Error Page Icon (Folded document with sad frown) */}
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-[#5f6368]"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Paper outline */}
            <path
              d="M18 10C15.7909 10 14 11.7909 14 14V58C14 60.2091 15.7909 62 18 62H54C56.2091 62 58 60.2091 58 58V24L44 10H18Z"
              stroke="#5F6368"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Folded corner */}
            <path
              d="M44 10V24H58"
              stroke="#5F6368"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Sad Eyes */}
            <circle cx="28" cy="36" r="2.5" fill="#5F6368" />
            <circle cx="44" cy="36" r="2.5" fill="#5F6368" />
            {/* Sad Mouth / Frown */}
            <path
              d="M29 48C31.5 44.5 40.5 44.5 43 48"
              stroke="#5F6368"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-[22px] md:text-[24px] font-medium text-[#202124] tracking-normal mb-3 leading-tight">
          This site can’t be reached
        </h1>

        {/* Subtitle with Hostname */}
        <p className="text-[15px] text-[#5f6368] mb-4 leading-normal">
          <strong className="text-[#202124] font-medium">{hostname}</strong> refused to connect.
        </p>

        {/* Suggestions */}
        <div className="text-[14px] text-[#5f6368] mb-6 leading-relaxed">
          <p className="mb-2">Try:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Checking the connection</li>
            <li>Checking the proxy and the firewall</li>
          </ul>
        </div>

        {/* Error Code */}
        <div className="text-[12px] font-mono text-[#5f6368] tracking-wider mb-8 uppercase">
          ERR_CONNECTION_REFUSED
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-2 mb-8">
          <button
            onClick={handleReload}
            className="px-6 py-2.25 bg-[#1a73e8] hover:bg-[#1557b0] active:bg-[#174ea6] text-white text-[14px] font-medium rounded-[4px] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-2 cursor-pointer"
          >
            Reload
          </button>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2.25 bg-white hover:bg-[#f1f3f4] active:bg-[#e8eaed] text-[#1a73e8] border border-[#dadce0] text-[14px] font-medium rounded-[4px] transition-colors focus:outline-none cursor-pointer"
          >
            {showDetails ? "Hide details" : "Details"}
          </button>
        </div>

        {/* Expandable Technical Details */}
        {showDetails && (
          <div className="text-[13px] text-[#5f6368] space-y-4 pt-4 border-t border-[#dadce0] leading-relaxed animate-fadeIn">
            <div>
              <p className="font-semibold text-[#3c4043] mb-1">Check your internet connection</p>
              <p>Check any cables and reboot any routers, modems, or other network devices you may be using.</p>
            </div>

            <div>
              <p className="font-semibold text-[#3c4043] mb-1">Allow Chrome to access the network in your firewall or antivirus settings.</p>
              <p>
                If it is already listed as a program allowed to access the network, try removing it from the list and adding it again.
              </p>
            </div>

            <div>
              <p className="font-semibold text-[#3c4043] mb-1">If you use a proxy server…</p>
              <p>
                Check your proxy settings or contact your network administrator to make sure the proxy server is working. If you don't believe you should be using a proxy server: Go to the Chrome menu &gt; Settings &gt; Show advanced settings… &gt; Change proxy settings… &gt; LAN Settings and deselect "Use a proxy server for your LAN".
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
