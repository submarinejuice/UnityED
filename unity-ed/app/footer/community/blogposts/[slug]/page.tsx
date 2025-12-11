import Link from "next/link";

const posts: Record<
  string,
  { title: string; date: string; category: string; content: string }
> = {
  "future-of-gamified-learning": {
    title: "The Future of Gamified Learning",
    date: "March 15, 2024",
    category: "Education",
    content: `
      <p class="mb-4 text-slate-700">
        Game mechanics are revolutionizing the way we approach education, making learning more engaging and effective than ever before. As we look toward the future, the integration of game-based elements in education is not just a trend—it's becoming a fundamental shift in how we teach and learn.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">Why Gamification Works</h2>
      <p class="mb-4 text-slate-700">
        Research shows that gamified learning environments can increase student engagement significantly. This is because games tap into our natural desires for achievement, competition, and reward. When students are engaged, they're more likely to retain information and develop a genuine interest in the subject matter.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">Key Elements of Successful Gamification</h2>
      <p class="mb-4 text-slate-700">
        The most effective gamified learning platforms incorporate several key elements: clear goals and objectives, immediate feedback, progressive difficulty levels, and meaningful rewards. These elements work together to create an environment where students feel motivated to continue learning and improving.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">The Road Ahead</h2>
      <p class="mb-4 text-slate-700">
        As technology continues to evolve, we're seeing exciting developments in areas like virtual reality, artificial intelligence, and adaptive learning systems. These technologies will make gamified learning even more personalized and effective, helping each student learn at their own pace and in their own way.
      </p>
    `,
  },
  "5-ways-teachers-can-use-analytics": {
    title: "5 Ways Teachers Can Use Analytics",
    date: "March 10, 2024",
    category: "Teaching",
    content: `
      <p class="mb-4 text-slate-700">
        Real-time analytics have become an essential tool for modern educators. By leveraging data effectively, teachers can gain valuable insights into student performance and make informed decisions that improve learning outcomes.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">1. Identify Struggling Students Early</h2>
      <p class="mb-4 text-slate-700">
        Analytics can help you spot students who are falling behind before it becomes a serious problem. By monitoring engagement metrics and assessment scores, you can provide timely interventions.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">2. Personalize Learning Paths</h2>
      <p class="mb-4 text-slate-700">
        Use data to understand each student's strengths and weaknesses, then customize assignments and activities to meet their individual needs.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">3. Measure Engagement Levels</h2>
      <p class="mb-4 text-slate-700">
        Track how long students spend on different activities and which topics generate the most interest. This helps you adjust your teaching approach accordingly.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">4. Assess Content Effectiveness</h2>
      <p class="mb-4 text-slate-700">
        Analytics can show you which lessons and materials are most effective, allowing you to refine your curriculum over time.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">5. Track Progress Over Time</h2>
      <p class="mb-4 text-slate-700">
        Monitor long-term trends to see how students are developing throughout the semester or year, helping you celebrate successes and address challenges.
      </p>
    `,
  },
  "student-success-story-emilys-journey": {
    title: "Student Success Story: Emily's Journey",
    date: "March 5, 2024",
    category: "Success Stories",
    content: `
      <p class="mb-4 text-slate-700">
        When Emily first started using UnityEd, she was struggling with mathematics and feeling discouraged. Today, she's one of the top performers in her class, with grades that have improved by 40%. Here's how she did it.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">The Challenge</h2>
      <p class="mb-4 text-slate-700">
        Emily found traditional math classes overwhelming. The pace was too fast, and she felt embarrassed to ask questions in front of her peers. Her grades were suffering, and her confidence was at an all-time low.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">The Turning Point</h2>
      <p class="mb-4 text-slate-700">
        Everything changed when Emily's teacher introduced UnityEd's interactive learning platform. The gamified approach made math feel less intimidating, and the ability to learn at her own pace removed the pressure she had been feeling.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">The Transformation</h2>
      <p class="mb-4 text-slate-700">
        Within weeks, Emily was spending hours on the platform, not because she had to, but because she wanted to. The game mechanics made learning feel like play, and the immediate feedback helped her understand her mistakes and learn from them.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">The Results</h2>
      <p class="mb-4 text-slate-700">
        Six months later, Emily's grades had improved dramatically. More importantly, she had developed a genuine love for mathematics and newfound confidence in her abilities. She's now helping other students and considering a career in STEM.
      </p>
    `,
  },
  "making-math-fun-through-games": {
    title: "Making Math Fun Through Games",
    date: "February 28, 2024",
    category: "Education",
    content: `
      <p class="mb-4 text-slate-700">
        Mathematics doesn't have to be boring or intimidating. Through innovative game-based learning approaches, we can transform math education into an exciting adventure that students actually look forward to.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">The Problem with Traditional Math Education</h2>
      <p class="mb-4 text-slate-700">
        Too often, math is presented as a series of abstract rules and formulas to memorize. This approach fails to engage students emotionally and doesn't help them see the real-world applications of mathematical concepts.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">Game-Based Solutions</h2>
      <p class="mb-4 text-slate-700">
        By incorporating game mechanics into math education, we can create experiences where students solve real problems, compete with friends, and see immediate results. This makes abstract concepts concrete and engaging.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">Practical Implementation</h2>
      <p class="mb-4 text-slate-700">
        Teachers can start small by gamifying individual lessons or units. Create point systems, design challenges, or use digital platforms that incorporate game elements naturally into the curriculum.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-[#141b2f]">Measuring Success</h2>
      <p class="mb-4 text-slate-700">
        The proof is in the results. Schools that have adopted game-based math learning report higher test scores, increased engagement, and most importantly, students who are excited about mathematics.
      </p>
    `,
  },
};

// ⬇⬇⬇ THIS is the important change: params is now a Promise
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // unwrap the promise
  const { slug } = await params;

  const post = posts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f5f8ff]">
        <main className="w-full max-w-4xl mx-auto px-4 lg:px-0 py-10">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold text-[#141b2f]">
              Blog Post Not Found
            </h1>
            <Link
              href="/footer/community/blogs"
              className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-800 px-3 py-2 rounded-md hover:bg-slate-100 text-sm"
            >
              <span className="text-lg">←</span>
              Back to Blogs
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <main className="w-full max-w-4xl mx-auto px-4 lg:px-0 py-10">
        {/* Back link */}
        <Link
          href="/footer/community/blogs"
          className="inline-flex items-center gap-2 mb-6 border border-slate-300 bg-white text-slate-800 px-3 py-2 rounded-md hover:bg-slate-100 text-sm"
        >
          <span className="text-lg">←</span>
          Back to Blogs
        </Link>

        {/* Meta + title */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>{post.date}</span>
            <span>•</span>
            <span className="font-medium text-[#2563EB]">{post.category}</span>
          </div>
          <h1 className="text-4xl font-bold text-[#141b2f]">{post.title}</h1>
        </div>

        {/* Content */}
        <article
          className="prose prose-lg max-w-none text-slate-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </div>
  );
}
