import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-white py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/Logo.png" alt="Bunyan" width={36} height={36} className="rounded-xl" />
            <div>
              <span className="text-sm font-bold text-primary block">Bunyan</span>
              <span className="text-xs text-muted">AI Construction Intelligence</span>
            </div>
          </div>
          <div className="flex items-center gap-8 text-sm text-muted">
            <a href="#features" className="hover:text-primary transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors font-medium">How it Works</a>
            <a href="#impact" className="hover:text-primary transition-colors font-medium">Impact</a>
          </div>
          <p className="text-xs text-muted/70">
            © 2026 Bunyan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
