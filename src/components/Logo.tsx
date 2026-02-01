import React from 'react';

export const Logo = ({ className = "w-8 h-8", textColor = "currentColor" }: { className?: string, textColor?: string }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Outer Vault Ring */}
            <circle
                cx="50"
                cy="50"
                r="45"
                stroke={textColor}
                strokeWidth="2"
            />
            {/* Vault Dial Marks */}
            <path d="M50 5V15" stroke={textColor} strokeWidth="2" />
            <path d="M50 85V95" stroke={textColor} strokeWidth="2" />
            <path d="M5 50H15" stroke={textColor} strokeWidth="2" />
            <path d="M85 50H95" stroke={textColor} strokeWidth="2" />

            {/* JV Fusion Symbol */}
            <path
                d="M35 35H45V65C45 68.3 42.3 71 39 71C35.7 71 33 68.3 33 65"
                stroke={textColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M48 35L58 65L68 35"
                stroke={textColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Center Lock Point */}
            <circle cx="50" cy="50" r="2" fill={textColor} />
        </svg>
    );
};

export const BrandLogo = ({ showText = true, className = "" }: { showText?: boolean, className?: string }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <Logo className="w-10 h-10" />
            {showText && (
                <span className="text-2xl font-black uppercase tracking-tighter">
                    JACOB VAULT
                </span>
            )}
        </div>
    );
};
