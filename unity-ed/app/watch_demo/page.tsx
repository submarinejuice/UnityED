    import React from 'react';

// --- Main Page Component ---

const GameDemoPage = () => {
  return (
    // Changed background to bg-blue-900 for a darker, brand-consistent cinematic feel
    <div className="min-h-screen bg-blue-100 font-sans flex items-center justify-center py-16">
      
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Title/Context above the video window - Text remains white for contrast */}
        <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-blue">UnityEd Game Demo Window</h1>
            <p className="mt-2 text-lg text-blue-300">View a concise demonstration of our interactive SEL modules.</p>
        </div>

        {/* The Video "Window" Card: Clean white, centered, with a strong shadow for a defined layout */}
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-200">
          <div className="max-w-3xl mx-auto">
            
            {/* Responsive 16:9 Aspect Ratio Container for Video */}
            <div className="relative pt-[56.25%] w-full rounded-lg overflow-hidden"> 
                {/* The iframe is absolutely positioned to perfectly fill the aspect-ratio container */}
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" 
                    title="Game Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDemoPage;