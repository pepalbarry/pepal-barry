import React from "react";
import { PiStarFourFill } from "react-icons/pi";

export default function PageLoader() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4 animate-in fade-in duration-500">
            <div className="relative">
                {/* Spinner ring */}
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <PiStarFourFill className="text-primary/40 text-sm animate-pulse" />
                </div>
            </div>
            <p className="text-sm font-medium text-subtle uppercase tracking-widest animate-pulse">
                Loading...
            </p>
        </div>
    );
}
