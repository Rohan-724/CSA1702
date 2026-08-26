import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import {
  ShieldAlert,
  Heart,
  Pill,
  Activity,
  ArrowRight,
  Stethoscope,
  ClipboardList,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="text-xs tracking-[0.25em] uppercase text-brand-muted mb-6" data-testid="hero-eyebrow">
            An educational school project
          </div>
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-brand-forest mb-6"
            data-testid="hero-title"
          >
            Understand your symptoms.
            <br />
            <span className="italic text-brand-sage">Know your next step.</span>
          </h1>
          <p className="text-lg text-brand-muted max-w-xl mb-10 leading-relaxed" data-testid="hero-subtitle">
            MediSense is an AI-powered health assistant that helps you make sense of what you're feeling —
            with clear self-care guidance, educational OTC information, and honest advice about when to see a
            doctor.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/chat" data-testid="hero-start-btn">
              <Button
                size="lg"
                className="bg-brand-forest hover:bg-brand-forest/90 text-brand-cream h-12 px-6"
              >
                Start assessment <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="#how" data-testid="hero-how-btn">
              <Button size="lg" variant="outline" className="h-12 px-6 border-stone-300">
                How it works
              </Button>
            </a>
          </div>

          <div className="mt-10 flex items-start gap-3 text-sm text-brand-muted max-w-lg">
            <ShieldAlert className="w-4 h-4 text-brand-concerning shrink-0 mt-0.5" />
            <span>
              MediSense is not a doctor and does not diagnose or prescribe. In an emergency, contact your local
              emergency service immediately.
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-sage/20 rounded-md z-0" />
          <img
            src="https://images.pexels.com/photos/7005608/pexels-photo-7005608.jpeg"
            alt="Person using laptop at home"
            className="relative z-10 w-full h-[440px] object-cover rounded-md border border-stone-200"
            data-testid="hero-image"
          />
          <div className="absolute -bottom-6 -right-6 bg-white border border-stone-200 rounded-md p-4 shadow-sm z-20 max-w-[220px]">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-brand-forest" />
              <span className="text-xs tracking-[0.2em] uppercase text-brand-muted">Powered by AI</span>
            </div>
            <p className="text-sm text-brand-ink leading-snug">
              Claude Sonnet 5 with medical-safety guardrails
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-xs tracking-[0.25em] uppercase text-brand-muted mb-4">How MediSense works</div>
          <h2 className="font-display text-4xl sm:text-5xl text-brand-forest mb-14 max-w-2xl">
            Four calm steps between a symptom and a clear next step.
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: "01", t: "Tell MediSense your symptoms", i: ClipboardList },
              { n: "02", t: "Answer a few relevant questions", i: Stethoscope },
              { n: "03", t: "Get possible explanations & severity", i: Activity },
              { n: "04", t: "Receive a clear recommended next step", i: ChevronRight },
            ].map(({ n, t, i: Icon }) => (
              <div
                key={n}
                className="border border-stone-200 rounded-md p-6 hover:border-brand-forest transition-colors"
                data-testid={`how-step-${n}`}
              >
                <div className="text-xs tracking-[0.2em] text-brand-sage mb-4">{n}</div>
                <Icon className="w-6 h-6 text-brand-forest mb-4" />
                <p className="text-brand-ink leading-snug">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Activity}
            title="Symptom assessment"
            body="A calm, conversational triage that asks only what's relevant — no overwhelming forms."
            testId="feature-assessment"
          />
          <FeatureCard
            icon={ShieldAlert}
            title="Emergency detection"
            body="Serious warning signs (chest pain, stroke signs, severe bleeding, and more) are flagged immediately with clear next steps."
            testId="feature-emergency"
            emphasis
          />
          <FeatureCard
            icon={Heart}
            title="General self-care"
            body="Simple, evidence-informed suggestions — rest, fluids, warm compresses — tailored to your symptoms."
            testId="feature-selfcare"
          />
          <FeatureCard
            icon={Pill}
            title="OTC medication info"
            body="Educational information about common over-the-counter options. Never a prescription — always confirm with a pharmacist."
            testId="feature-otc"
          />
          <FeatureCard
            icon={Stethoscope}
            title="When to see a doctor"
            body="MediSense tells you honestly whether to monitor, book a consult, seek same-day care, or go to the ER."
            testId="feature-doctor"
          />
          <FeatureCard
            icon={ClipboardList}
            title="Educational disclaimer"
            body="A school project designed to demonstrate responsible AI in health — not a substitute for medical advice."
            testId="feature-disclaimer"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-brand-forest text-brand-cream rounded-md p-12 lg:p-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl mb-4">Ready to check in with yourself?</h2>
            <p className="text-brand-cream/80 max-w-md leading-relaxed">
              Start a private assessment. MediSense will ask a few gentle questions and help you understand
              what you can do next.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Link to="/chat" data-testid="cta-start-btn">
              <Button size="lg" className="bg-brand-cream text-brand-forest hover:bg-white h-12 px-6">
                Start assessment <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon: Icon, title, body, emphasis, testId }) {
  return (
    <div
      className={`border rounded-md p-8 bg-white transition-colors ${
        emphasis ? "border-brand-concerning/30" : "border-stone-200 hover:border-brand-forest"
      }`}
      data-testid={testId}
    >
      <Icon className={`w-6 h-6 mb-5 ${emphasis ? "text-brand-concerning" : "text-brand-forest"}`} />
      <h3 className="font-heading font-semibold text-lg text-brand-ink mb-2">{title}</h3>
      <p className="text-brand-muted leading-relaxed text-sm">{body}</p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 text-xs text-brand-muted leading-relaxed" data-testid="footer">
        MediSense is an educational school project and is not a substitute for professional medical advice,
        diagnosis, or treatment. Medication information shown by the system is for educational purposes only.
      </div>
    </footer>
  );
}
