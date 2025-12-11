import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is UnityEd?",
    answer:
      "UnityEd is an innovative educational platform that combines interactive gameplay with curriculum-based learning to make education more engaging and effective for students.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply sign up for an account, choose your role (student or teacher), and start exploring our platform. Teachers can create classes and invite students, while students can start playing educational games right away.",
  },
  {
    question: "Is UnityEd suitable for all age groups?",
    answer:
      "Yes! UnityEd is designed to be adaptable for various age groups and learning levels. Our content spans from elementary to high school curriculum.",
  },
  {
    question: "How do teachers track student progress?",
    answer:
      "Teachers have access to a comprehensive analytics dashboard that shows real-time data on student performance, engagement, time spent on activities, and areas that may need additional support.",
  },
  {
    question: "Can I use UnityEd on mobile devices?",
    answer:
      "Yes, UnityEd is fully responsive and works on tablets and smartphones, making learning accessible anywhere, anytime.",
  },
  {
    question: "What subjects does UnityEd cover?",
    answer:
      "Currently, UnityEd covers Mathematics, Science, Language Arts, and Social Studies, with more subjects being added regularly.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 30-day free trial for both individual teachers and schools. No credit card required to start.",
  },
  {
    question: "How is student data protected?",
    answer:
      "We take data privacy seriously. All student data is encrypted, COPPA compliant, and we never share personal information with third parties.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <main className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Heading */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-[#141b2f]">
              Frequently Asked Questions
            </h1>
            <p className="text-base text-slate-600">
              Find answers to common questions about UnityEd
            </p>
          </div>

          {/* FAQ accordion */}
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-slate-200 rounded-2xl bg-white px-4"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-[#141b2f]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-700 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Footer note */}
          <div className="text-center pt-6 space-y-2">
            <h2 className="text-2xl font-bold text-[#141b2f]">
              Still have questions?
            </h2>
            <p className="text-sm text-slate-600">
              Can&apos;t find the answer you&apos;re looking for? Please reach
              out to us.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
