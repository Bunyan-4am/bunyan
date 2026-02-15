import { Building2 } from "lucide-react";

const brands = [
  { name: "NEOM" },
  { name: "Saudi Aramco" },
  { name: "Red Sea Global" },
  { name: "ROSHN" },
  { name: "Dar Al-Arkan" },
];

export default function TrustedBy() {
  return (
    <section className="py-14 bg-gradient-to-b from-white to-background/30 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p
          data-aos="fade-up"
          className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted/80 mb-10"
        >
          Trusted by leading construction firms across the region
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-5"
        >
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/60 border border-border/40 opacity-70 hover:opacity-100 transition-all duration-500 hover:shadow-md hover:border-primary/20 hover:bg-white group"
            >
              <Building2 size={22} className="text-primary/70 group-hover:text-primary transition-colors duration-500" />
              <span className="text-sm font-bold tracking-wider text-primary/90 group-hover:text-primary transition-colors duration-500">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
