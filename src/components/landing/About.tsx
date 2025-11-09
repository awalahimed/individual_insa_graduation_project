import { Scissors, Heart, Zap, Users } from "lucide-react";
import { CheckCircle } from "lucide-react";

const values = [
  {
    icon: Scissors,
    title: "Crafted for Tailors",
    description: "Built by understanding the unique needs of tailoring businesses.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Helping you deliver exceptional service to your customers.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Lightning-fast performance with 99.9% uptime guarantee.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Constantly improving based on feedback from real tailor shops.",
  },
];

const images = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((src, index) => (
              <div key={index} className={`rounded-lg overflow-hidden shadow-elegant ${index === 0 || index === 3 ? "col-span-1 row-span-1" : "col-span-1 row-span-1"}`}>
                <img src={src} alt={`Tailoring work showcase ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Empowering Tailors with Technology
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              TailorPro is dedicated to providing modern solutions for tailoring businesses. We understand the craftsmanship and dedication that goes into every garment, and our platform is designed to support that artistry.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span>Streamline your workflow from order to delivery.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span>Enhance customer communication and satisfaction.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span>Gain valuable insights with our analytics dashboard.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

{values.map((value, index) => {
  const Icon = value.icon;
  return (
    <div
      key={index}
      className="p-6 bg-card rounded-lg border border-border hover:shadow-elegant transition-smooth"
    >
      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold mb-2">{value.title}</h3>
      <p className="text-sm text-muted-foreground">{value.description}</p>
    </div>
  );
})}
