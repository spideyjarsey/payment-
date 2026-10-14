import React, { useState } from 'react';
import { 
  Wallet, 
  Copy, 
  Check, 
  AlertCircle, 
  QrCode, 
  PhoneCall, 
  CheckCheck, 
  ShieldCheck 
} from 'lucide-react';

// Official bKash Logo Icon (White origami bird on pink square)
function BkashLogoSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="bKash Logo">
      <rect width="500" height="500" fill="#E2136E" rx="36"/>
      <g fill="#FFFFFF" stroke="#E2136E" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <polygon points="70,74 196,244 63,104" />
        <polygon points="70,74 240,94 196,244" />
        <polygon points="240,94 365,268 196,244" />
        <polygon points="320,190 408,184 365,268" />
        <polygon points="408,184 442,218 365,268" />
        <polygon points="196,244 365,268 224,348" />
        <polygon points="196,244 224,348 144,432" />
        <polygon points="196,244 144,432 174,272" />
      </g>
    </svg>
  );
}

// Official Nagad Emblem Logo (Matching User's Screenshot: Swirl + Runner + "নগদ" Wordmark)
function NagadEmblemSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Nagad Logo">
      <rect width="500" height="500" fill="#FFFFFF" rx="36"/>
      {/* Top Swirl Emblem */}
      <g transform="translate(250, 185)">
        {/* Outer Right Swirl (Bright Orange) */}
        <path d="M 0,-130 C 72,-130 130,-72 130,0 C 130,72 72,130 0,130 C -60,130 -110,88 -124,32 C -116,56 -86,88 -45,95 C 10,105 82,75 88,0 C 92,-60 40,-102 -5,-108 C 2,-115 0,-130 0,-130 Z" fill="#F37023"/>
        {/* Top-Middle Swoosh Petal (Golden Orange) */}
        <path d="M -45,-132 C -15,-142 35,-130 65,-95 L 30,-65 C 15,-80 -10,-88 -35,-82 Z" fill="#F99D1C"/>
        {/* Top-Right Swoosh Petal (Flame Red) */}
        <path d="M 40,-100 C 65,-85 105,-40 100,10 L 65,0 C 68,-30 48,-55 30,-65 Z" fill="#E02626"/>
        {/* Left Curved Swoosh (Signature Red) */}
        <path d="M -20,-115 C -75,-95 -125,-40 -125,20 C -125,75 -85,115 -35,120 C -70,95 -85,55 -80,10 C -75,-35 -40,-85 -20,-115 Z" fill="#ED1C24"/>
        {/* Central Aperture */}
        <circle cx="0" cy="5" r="54" fill="#FFFFFF"/>
        {/* Dak Harkara Runner Silhouette in Nagad Red */}
        <g transform="translate(-32, -28) scale(1.15)" fill="#ED1C24">
          <circle cx="28" cy="12" r="5.5" />
          <path d="M 23,18 L 33,18 C 36,22 38,28 35,33 L 25,33 C 22,28 20,22 23,18 Z" />
          <ellipse cx="33" cy="24" rx="4.5" ry="6" transform="rotate(25 33 24)" />
          <rect x="0" y="24" width="58" height="2.8" rx="1.4" />
          <path d="M 16,27 L 19,34 L 14,34 Z" />
          <path d="M 25,32 L 29,43 L 38,43" stroke="#ED1C24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M 23,32 L 14,40 L 7,37" stroke="#ED1C24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M 23,20 L 18,25" stroke="#ED1C24" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 28,21 L 38,25" stroke="#ED1C24" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      </g>
      {/* Bottom Bengali Wordmark "নগদ" */}
      <g fill="#ED1C24" transform="translate(68, 332)">
        <path d="M 0,25 C 0,11 11,0 25,0 L 95,0 C 109,0 120,11 120,25 L 120,125 L 90,125 L 90,40 C 90,32 84,26 76,26 L 30,26 L 30,55 C 40,55 50,60 55,70 C 60,80 58,95 48,105 C 38,115 22,118 10,110 C 2,104 -1,92 0,80 L 26,80 C 26,86 28,91 33,91 C 38,91 42,86 42,80 C 42,70 34,66 25,66 C 11,66 0,55 0,40 Z"/>
        <path d="M 150,45 C 150,18 172,0 200,0 C 228,0 250,18 250,45 L 250,125 L 222,125 L 222,45 C 222,33 212,25 200,25 C 188,25 178,33 178,45 L 178,125 L 150,125 Z"/>
        <path d="M 275,0 L 370,0 C 384,0 395,11 395,25 L 395,100 C 395,114 384,125 370,125 L 275,125 L 275,100 L 365,100 L 365,25 L 275,25 Z"/>
      </g>
    </svg>
  );
}

interface PaymentItem {
  id: 'bkash' | 'nagad';
  brandEn: string;
  brandBn: string;
  accountType: string;
  accountNumber: string;
  methodNote: string;
  themeColor: string;
  borderColor: string;
  badgeBg: string;
  numberColor: string;
  renderLogo: () => React.ReactNode;
}

export default function App() {
  const [copiedId, setCopiedId] = useState<'bkash' | 'nagad' | null>(null);
  const [activeQr, setActiveQr] = useState<'bkash' | 'nagad' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const paymentMethods: PaymentItem[] = [
    {
      id: 'bkash',
      brandEn: 'bKash',
      brandBn: 'বিকাশ',
      accountType: 'Personal Account',
      accountNumber: '01715123766',
      methodNote: 'পেমেন্টের মাধ্যম: Send Money',
      themeColor: '#E2136E',
      borderColor: 'border-[#E2136E]/40 hover:border-[#E2136E]/80 focus-within:border-[#E2136E]',
      badgeBg: 'bg-[#E2136E]/15 text-[#E2136E] border border-[#E2136E]/20',
      numberColor: 'text-[#E2136E]',
      renderLogo: () => (
        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shrink-0 shadow-lg shadow-[#E2136E]/20 bg-[#E2136E] border-2 border-white/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
          <BkashLogoSvg />
        </div>
      )
    },
    {
      id: 'nagad',
      brandEn: 'Nagad',
      brandBn: 'নগদ',
      accountType: 'Personal Account',
      accountNumber: '01759727963', // Corrected Nagad number as requested: 01759727963
      methodNote: 'পেমেন্টের মাধ্যম: Send Money',
      themeColor: '#ED1C24',
      borderColor: 'border-[#ED1C24]/40 hover:border-[#ED1C24]/80 focus-within:border-[#ED1C24]',
      badgeBg: 'bg-[#ED1C24]/15 text-[#ED1C24] border border-[#ED1C24]/20',
      numberColor: 'text-[#ED1C24]',
      renderLogo: () => (
        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shrink-0 shadow-lg shadow-[#ED1C24]/20 bg-white border-2 border-white/10 flex items-center justify-center p-0.5 transition-transform duration-200 group-hover:scale-105">
          <NagadEmblemSvg />
        </div>
      )
    }
  ];

  const handleCopy = async (id: 'bkash' | 'nagad', numberToCopy: string) => {
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(numberToCopy);
        success = true;
      } catch {
        success = false;
      }
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = numberToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        textArea.remove();
      } catch {
        success = false;
      }
    }

    if (success) {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(40);
        } catch {
          // ignore
        }
      }

      setCopiedId(id);
      setToastMessage(`${numberToCopy} কপি করা হয়েছে`);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);

      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="fixed top-1/4 -left-32 w-80 h-80 rounded-full bg-[#E2136E]/12 blur-[110px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="fixed bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#ED1C24]/12 blur-[110px] pointer-events-none" 
      />

      {/* Main Payment Floating Card Container */}
      <main className="w-full max-w-[420px] bg-[#121217]/95 border border-white/10 rounded-3xl p-6 sm:p-7 glow-card relative z-10 backdrop-blur-xl">
        
        {/* Header Section */}
        <header className="text-center mb-6">
          {/* Minimalist Wallet/Payment Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 text-white mb-3.5 shadow-inner transition-transform duration-200 hover:scale-105">
            <Wallet className="w-6 h-6 stroke-[1.8]" />
          </div>

          {/* Subdued Brand Tag */}
          <div className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 mb-1 flex items-center justify-center gap-1.5">
            <span>Spidery Jersey</span>
            <span className="w-1 h-1 rounded-full bg-neutral-600" />
            <span className="text-emerald-400 flex items-center gap-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> ভেরিফাইড
            </span>
          </div>

          {/* Bengali Title */}
          <h1 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-snug">
            পেমেন্ট ইনফরমেশন
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-neutral-400 font-medium mt-0.5">
            Payment Information
          </p>
        </header>

        {/* Hardcoded Payment Cards Section */}
        <div className="space-y-4 mb-6">
          {paymentMethods.map((method) => {
            const isCopied = copiedId === method.id;

            return (
              <article
                key={method.id}
                className={`group bg-neutral-900/90 border ${method.borderColor} rounded-2xl p-4 sm:p-4.5 transition-all duration-200 shadow-xl shadow-black/50 relative overflow-hidden`}
              >
                {/* Brand header with Official Logo */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-3">
                    {/* Render Logo */}
                    {method.renderLogo()}
                    
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-lg tracking-wide">
                          {method.brandEn}
                        </span>
                        <span className="text-xs text-neutral-400 font-medium">
                          ({method.brandBn})
                        </span>
                      </div>
                      <span className={`text-xs font-semibold block mt-0.5 ${method.numberColor}`}>
                        {method.accountType}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* QR Code Quick View Trigger */}
                    <button
                      type="button"
                      onClick={() => setActiveQr(activeQr === method.id ? null : method.id)}
                      className="text-xs px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors flex items-center gap-1"
                      title={`${method.brandEn} QR কোড দেখুন`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span className="text-[11px] hidden xs:inline">QR</span>
                    </button>

                    {/* Direct dial call trigger for mobile */}
                    <a
                      href={`tel:${method.accountNumber}`}
                      className="text-xs p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors flex items-center"
                      title={`${method.brandEn} নম্বরে কল করুন`}
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                    </a>

                    {/* Send Money note badge */}
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${method.badgeBg}`}>
                      Send Money
                    </span>
                  </div>
                </div>

                {/* Account details and Copy button */}
                <div className="flex items-center justify-between gap-3 bg-black/55 rounded-xl p-3.5 border border-white/5">
                  <div className="min-w-0 flex-1">
                    <div 
                      className={`font-mono text-xl sm:text-[23px] font-bold tracking-wider select-all cursor-pointer ${method.numberColor}`}
                      onClick={() => handleCopy(method.id, method.accountNumber)}
                      title="ক্লিক করে কপি করুন"
                    >
                      {method.accountNumber}
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1">
                      <span>{method.methodNote.split(':')[0]}:</span>
                      <span className="text-neutral-200 font-medium">Send Money</span>
                    </p>
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopy(method.id, method.accountNumber)}
                    className={`shrink-0 min-h-[44px] min-w-[76px] px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-500 text-neutral-950 font-bold border border-emerald-400 shadow-md shadow-emerald-500/30'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/10 shadow-sm'
                    }`}
                    aria-label={`${method.brandEn} নম্বর কপি করুন`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>ডান</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 stroke-[2.2]" />
                        <span>কপি</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Expandable QR Code Drawer */}
                {activeQr === method.id && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-150">
                    <div className="bg-white p-3 rounded-xl shadow-md">
                      <svg viewBox="0 0 100 100" className="w-36 h-36">
                        <rect width="100" height="100" fill="#ffffff" />
                        <rect x="10" y="10" width="24" height="24" fill="#000000" rx="3" />
                        <rect x="14" y="14" width="16" height="16" fill="#ffffff" rx="2" />
                        <rect x="18" y="18" width="8" height="8" fill="#000000" rx="1" />
                        
                        <rect x="66" y="10" width="24" height="24" fill="#000000" rx="3" />
                        <rect x="70" y="14" width="16" height="16" fill="#ffffff" rx="2" />
                        <rect x="74" y="18" width="8" height="8" fill="#000000" rx="1" />

                        <rect x="10" y="66" width="24" height="24" fill="#000000" rx="3" />
                        <rect x="14" y="70" width="16" height="16" fill="#ffffff" rx="2" />
                        <rect x="18" y="74" width="8" height="8" fill="#000000" rx="1" />

                        <rect x="40" y="12" width="6" height="6" fill="#000000" />
                        <rect x="52" y="12" width="6" height="6" fill="#000000" />
                        <rect x="44" y="24" width="6" height="6" fill="#000000" />
                        <rect x="12" y="44" width="6" height="6" fill="#000000" />
                        <rect x="24" y="48" width="6" height="6" fill="#000000" />
                        <rect x="38" y="38" width="8" height="8" fill={method.themeColor} />
                        <rect x="52" y="42" width="6" height="6" fill="#000000" />
                        <rect x="68" y="44" width="6" height="6" fill="#000000" />
                        <rect x="80" y="40" width="8" height="8" fill="#000000" />
                        <rect x="40" y="58" width="6" height="6" fill="#000000" />
                        <rect x="52" y="66" width="6" height="6" fill="#000000" />
                        <rect x="68" y="60" width="6" height="6" fill="#000000" />
                        <rect x="80" y="72" width="8" height="8" fill="#000000" />
                        <rect x="44" y="78" width="6" height="6" fill="#000000" />
                      </svg>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-2">
                      {method.brandEn} অ্যাপ দিয়ে স্ক্যান করুন অথবা নম্বর কপি করুন
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Footer & Disclaimer (Clean & Minimalist, No Developer HTML export button) */}
        <footer className="pt-2 border-t border-white/5 text-center">
          <p className="text-xs text-neutral-400 leading-relaxed flex items-center justify-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400/90 shrink-0" />
            <span>পেমেন্ট করার আগে নম্বরটি ভালোভাবে যাচাই করে নিন।</span>
          </p>

          <div className="mt-3 text-[11px] text-neutral-500">
            <span>Spidery Jersey · Secure Payment</span>
          </div>
        </footer>

      </main>

      {/* Floating Copy Feedback Toast */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900 border border-white/20 text-white px-4 py-2.5 rounded-full text-xs font-medium shadow-2xl z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150"
          role="status"
        >
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
