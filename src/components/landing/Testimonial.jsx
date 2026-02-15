"use client";

import { useRef } from "react";
import { Star, Users, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

const testimonials = [
  {
    quote:
      "Bunyan has fundamentally changed how we approach sustainable construction. We've reduced waste by 60% and saved millions in procurement costs.",
    name: "Mohamed El-Sayed",
    role: "VP of Operations",
    company: "New Capital Construction",
    rating: 5,
    initials: "ME",
    gradient: "from-primary to-blue-600",
  },
  {
    quote:
      "The AI-powered bill scanning alone saved us over EGP 800K in the first quarter. The environmental compliance reports are a game-changer for our audits.",
    name: "Nour El-Din",
    role: "Sustainability Director",
    company: "Palm Hills Developments",
    rating: 5,
    initials: "ND",
    gradient: "from-accent to-emerald-500",
  },
  {
    quote:
      "We integrated Bunyan across 12 active projects and saw a 45% reduction in material waste within three months. The ROI speaks for itself.",
    name: "Amr Hassan",
    role: "Chief Projects Officer",
    company: "Orascom Construction",
    rating: 5,
    initials: "AH",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    quote:
      "The marketplace for eco-certified materials cut our procurement cycle by half. Our teams now make data-driven decisions instead of guesswork.",
    name: "Layla Mahmoud",
    role: "Head of Procurement",
    company: "Talaat Moustafa Group",
    rating: 5,
    initials: "LM",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    quote:
      "Bunyan's analytics dashboard gives us real-time visibility into every project's carbon footprint. It's essential for meeting Egypt Vision 2030 sustainability targets.",
    name: "Youssef Ibrahim",
    role: "Environmental Compliance Lead",
    company: "Arabia Holding",
    rating: 5,
    initials: "YI",
    gradient: "from-violet-500 to-purple-600",
  },
];

export default function Testimonial() {
  const swiperRef = useRef(null);

  return (
    <section className="py-28 bg-gradient-to-b from-white via-background/40 to-white relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-4 bg-accent/5 px-4 py-1.5 rounded-full">
            <Quote size={15} /> What Our Clients Say
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
            Trusted by industry
            <br />
            <span className="gradient-text">leaders</span>
          </h2>
          <p className="text-secondary mt-5 text-lg leading-relaxed max-w-xl mx-auto">
            See how construction companies across the region are achieving remarkable results with Bunyan.
          </p>
        </div>

        {/* Swiper slider */}
        <div data-aos="fade-up" data-aos-delay="100" className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 24 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop={true}
            className="testimonial-swiper !pb-14"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <div className="group bg-white rounded-2xl border border-border/60 p-8 h-full flex flex-col transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.04] hover:-translate-y-1 hover:border-accent/20 relative overflow-hidden">
                  {/* Subtle gradient accent on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -translate-y-8 translate-x-8 bg-accent/5" />

                  <div className="relative flex-1 flex flex-col">
                    {/* Quote icon */}
                    <div className="mb-5">
                      <Quote size={32} className="text-accent/15" />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>

                    {/* Quote text */}
                    <blockquote className="text-[15px] text-secondary leading-relaxed flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="mt-7 pt-6 border-t border-border/50 flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
                      >
                        <span className="text-white text-xs font-bold">{t.initials}</span>
                      </div>
                      <div>
                        <div className="font-bold text-primary text-sm">{t.name}</div>
                        <div className="text-xs text-muted">
                          {t.role}, {t.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation arrows */}
          <div className="hidden lg:flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-11 h-11 rounded-full border border-border/60 bg-white flex items-center justify-center text-secondary hover:text-primary hover:border-accent/40 hover:shadow-md transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-11 h-11 rounded-full border border-border/60 bg-white flex items-center justify-center text-secondary hover:text-primary hover:border-accent/40 hover:shadow-md transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Swiper custom styles */}
      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #102a4e;
          opacity: 0.2;
          transition: all 0.3s ease;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #2e8c58;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
