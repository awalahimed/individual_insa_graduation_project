import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          Modern Tailoring Management
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          The Future of Tailoring is Here
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Everything you need to run your shop, manage orders, and delight customers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" className="bg-gradient-to-r from-primary to-accent px-8 py-3 rounded-lg font-bold hover:from-primary/90 hover:to-accent/90 transition-colors shadow-lg">
            Get Started for Free
          </Link>
          <Link to="#features" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition-colors shadow-lg">
            Explore Features
          </Link>
        </div>
      </div>
    </section>
  );
}
