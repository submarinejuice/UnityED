"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Maximize2, Minimize2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function GamePlay() {
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const router = useRouter();

  // Container that holds the game + fullscreen button
  const gameContainerRef = useRef<HTMLDivElement | null>(null);

  const handleBackClick = () => setShowQuitDialog(true);
  const handleConfirmQuit = () => router.push("/dashboard/student");

  const handleToggleFullscreen = async () => {
    if (!gameContainerRef.current) return;

    if (!document.fullscreenElement) {
      await gameContainerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  // Keep isFullscreen in sync if user presses Esc, etc.
  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // In normal view: fill the blue rectangle (100% width + height).
  // In fullscreen: fill the whole screen.
  const containerHeightClass = isFullscreen ? "h-screen" : "h-full";

  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <main className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-10">
        {/* Back + title */}
        <div className="mb-6 flex items-center gap-4">
          <Button
            onClick={handleBackClick}
            variant="outline"
            className="gap-2 text-[#141b2f] font-semibold border-2 border-[#313131] bg-transparent hover:bg-[#141b2f] hover:text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4 text-[#141b2f] group-hover:text-white" />
            Back to Dashboard
          </Button>

          <div>
            <h1 className="text-3xl font-bold mb-1 text-[#141b2f]">
              UnityEd Game
            </h1>
            <p className="text-sm text-gray-700">
              Continue your learning adventure
            </p>
          </div>
        </div>

        {/* Game window (blue rectangle) */}
        <div className="w-full h-[640px] bg-gradient-to-br from-[#e5f0ff] to-[#f5fbff] border-2 border-[#2563EB] rounded-2xl shadow-md overflow-hidden">
          {/* This container will go fullscreen */}
          <div
            ref={gameContainerRef}
            className={`relative w-full ${containerHeightClass} bg-black`}
          >
            {/* Fullscreen toggle button */}
            <button
              type="button"
              onClick={handleToggleFullscreen}
              className="absolute z-20 top-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/80 hover:bg-white px-3 py-1.5 text-xs font-semibold text-[#141b2f] shadow"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3 h-3" />
                  Exit Fullscreen
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3" />
                  Fullscreen
                </>
              )}
            </button>

            {/* Game iframe – fills entire blue window */}
            <iframe
              src="/unity/index.html"
              title="UnityED WebGL Game"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h3 className="font-bold mb-2 text-[#141b2f]">Current Mission</h3>
            <p className="text-sm text-gray-800">
              Complete Chapter 3: The Great Discovery
            </p>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h3 className="font-bold mb-2 text-[#141b2f]">Controls</h3>
            <p className="text-sm text-gray-800">
              Use arrow keys to move, Space to interact
            </p>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <h3 className="font-bold mb-2 text-[#141b2f]">Progress</h3>
            <p className="text-sm text-gray-800">Level 12 – 65% Complete</p>
          </div>
        </div>
      </main>

      {/* Quit dialog */}
      <AlertDialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to quit the game?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Any unsaved progress will be lost. Make sure you&apos;ve saved
              your game before exiting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmQuit}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
