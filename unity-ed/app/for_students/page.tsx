import React from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title }) => (
  <div className="bg-white shadow-xl p-6 rounded-2xl border-t-4 border-blue-500 transition duration-300 hover:shadow-2xl h-full transform hover:-translate-y-1">
    <p className="text-gray-700 mb-4 text-sm italic">
        "{quote}"
    </p>
    {/* Kept pink for secondary accent color on name for visual interest */}
    <p className="font-bold text-base text-pink-600">{name}</p>
    <p className="text-gray-500 text-xs">{title}</p>
  </div>
);

// --- Section Components

const HeroSection = () => (
  // Hero: Changed to soft white background for a light header block
  <div className="bg-white pt-24 pb-32 lg:pt-36 lg:pb-40 relative overflow-hidden text-gray-900">
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      
      {/* Illustration Placeholder*/}
      <div className="mb-10 w-full max-w-sm mx-auto h-40 flex items-center justify-center">
        <span className="text-9xl transform rotate-3">🌱💖</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
        Build Your <span className="text-blue-600">Confidence</span> and Master Your Emotions
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 font-medium">
        Play our anti-bullying game to learn how to navigate tricky social situations, build powerful empathy, and discover your inner strength.
      </p>
      
      <div className="flex justify-center space-x-4">
        {/* Primary CTA (Vibrant Blue) */}
        <button className="bg-blue-600 text-white font-extrabold text-lg px-8 py-3 rounded-full shadow-2xl shadow-blue-300 hover:bg-blue-700 transition duration-300 transform active:scale-95">
          Start Your Journey
        </button>
        {/* Secondary CTA (Clean Outline, updated hover to Blue) */}
        <a href="#" className="text-gray-700 font-semibold text-lg px-8 py-3 rounded-full border-2 border-gray-300 bg-white shadow-md hover:border-blue-600 hover:text-blue-600 transition duration-300">
          Meet the Characters
        </a>
      </div>
    </div>
  </div>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  // Cards
  <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-xl transition duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer h-full border border-gray-100">
    {/* Icon background changed to light blue theme */}
    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-6 shadow-lg">
      {icon}
    </div>
    <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 flex-grow text-base">{description}</p>
  </div>
);

const FeaturesSection = () => (
  // Background matches overall page tint
  <div className="py-20 bg-blue-50"> 
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        {/* Subtitle color changed to strong blue */}
        <p className="text-base font-bold uppercase text-blue-700 mb-2 tracking-wider">
            SOCIAL EMOTIONAL GROWTH
        </p>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2">
          How the Game Builds Better Humans
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <FeatureCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 17l-1-1 3-3 1 1-3 3zM16 12l-1-1 3-3 1 1-3 3zM8 12l1-1-3-3-1 1 3 3zM8 17h8"/></svg>}
          title="Understand Perspectives"
          description="Experience real-world scenarios from different viewpoints to foster deep empathy and compassion."
        />
        <FeatureCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M10 9v4M14 9v4M9 18h6"/></svg>}
          title="Practice Responses"
          description="Try out safe, effective ways to handle conflict, stand up for others, and manage your own feelings."
        />
        <FeatureCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 6v6l4 2"/></svg>}
          title="Grow Confidently"
          description="Watch your emotional intelligence score rise and feel more prepared and confident in social situations."
        />
      </div>
    </div>
  </div>
);

interface FeatureHighlightProps {
  title: string;
  subtitle?: string;
  content: string;
  color: 'blue' | 'pink';
  reverse: boolean;
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({ title, subtitle, content, color, reverse }) => (
  // Alternating backgrounds between white and light blue
  <div className={`py-24 lg:py-32 ${color === 'blue' ? 'bg-white' : 'bg-blue-100'} text-gray-900 border-b border-gray-100`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`flex flex-col lg:flex-row items-center ${reverse ? 'lg:flex-row-reverse' : ''} lg:space-x-16`}>
        
        {/* Text Content */}
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          {subtitle && (
            // Subtitle text color updated for consistency
            <p className={`text-base font-bold uppercase mb-4 tracking-wider ${color === 'blue' ? 'text-blue-600' : 'text-blue-800'}`}>
              {subtitle}
            </p>
          )}
          <h2 className={`text-4xl sm:text-5xl font-extrabold leading-snug mb-6 text-gray-900`}>
            {title}
          </h2>
          <p className={`text-lg text-gray-700`}>
            {content}
          </p>
        </div>

        {/* Friendly Illustration Placeholder (SEL Focus) */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <div className="w-full max-w-md h-80 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-8 border-4 border-white ring-4 ring-blue-200">
            {color === 'blue' ? (
                <span className="text-8xl">🧠</span> // Emotional Intelligence
            ) : (
                <span className="text-8xl">🛡️</span> // Safety/Protection
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialSection = /*#__PURE__*/ () => (
    // Background changed to white for maximum contrast
    <div className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Real Impact, Real Growth</h2>
            <p className="text-lg text-gray-600 mb-12 font-medium">Hear how our game is changing lives for the better.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
                <TestimonialCard 
                    quote="This game gave me the tools to handle a tough situation at school. I learned how my actions affect others, and it made me feel much stronger and safer."
                    name="Ethan M."
                    title="7th Grade Student"
                />
                <TestimonialCard 
                    quote="The side effects of bullying are discussed with so much sensitivity and clarity. It's a fantastic, safe way for my child to explore complex emotions and behaviors."
                    name="Sarah P."
                    title="Parent, 4th Grader"
                />
                <TestimonialCard 
                    quote="I've gained a lot of insight into identifying my emotions and reacting calmly. The scenarios felt real and the feedback was always helpful and encouraging."
                    name="Chloe D."
                    title="9th Grade Student"
                />
            </div>
        </div>
    </div>
);


const CallToAction = /*#__PURE__*/ () => (
    // CTA: Simple light blue background
    <div className="py-20 bg-blue-100 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center bg-white p-12 rounded-3xl shadow-2xl transform hover:scale-[1.01] transition duration-300">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                Ready to Feel More Confident and Safe?
            </h2>
            <p className="text-lg text-gray-600 mb-8 font-medium">
                Start your journey of self-discovery and emotional strength today. It's free!
            </p>
            {/* CTA Button changed to Blue */}
            <button className="bg-blue-500 text-white font-extrabold text-lg px-8 py-3 rounded-full shadow-lg shadow-blue-300 hover:bg-blue-600 transition duration-300 transform active:scale-95">
                Play the Game Now
            </button>
        </div>
    </div>
);


// --- Main Page Component ---

const StudentsPage = () => {
  return (
    // Main wrapper is set to soft blue-50 for the light tint
    <div className="min-h-screen bg-blue-50 font-sans">
      <main>
        <HeroSection />
        <FeaturesSection />
        
        <FeatureHighlight
            title="Emotional Intelligence: The most powerful skill you can build."
            subtitle="SELF-AWARENESS"
            content="Our game uses interactive narratives to help you recognize and name tough emotions like sadness, anger, or fear. Understanding how you and others feel is the first step toward making safe choices."
            color="blue" // This maps to bg-white
            reverse={false}
        />

        <FeatureHighlight
            title="Learning how to be a protective friend and bystander."
            subtitle="RESPONSIBLE CHOICES"
            content="Practice responding to bullying and difficult social situations in a safe, risk-free environment. You'll learn to handle pressure, speak up kindly, and know when and how to ask an adult for help."
            color="pink" // This maps to bg-blue-100
            reverse={true}
        />
        
        <TestimonialSection />

        <CallToAction />
      </main>
    </div>
  );
};

export default StudentsPage;
