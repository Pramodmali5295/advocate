import { useEffect, useCallback, useState } from 'react';
import { Star, Quote, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';

export const TestimonialsSection = () => {
  const { content } = useContent();
  const { testimonials } = content;
  const items = testimonials.items;

  // ─── Embla Carousel Hook ──────────────────────────────
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // ─── Manual Autoplay (Running Effect) with Pause on Hover ───
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000); // 4 seconds interval

    return () => clearInterval(intervalId);
  }, [emblaApi, isPaused]);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <section className="section-padding bg-cream-dark scroll-mt-20 overflow-hidden" id="testimonials">
      <div className="container-legal">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
            {testimonials.badge}
          </span>
          <h2 className="heading-section text-foreground mb-4">{testimonials.heroTitle}</h2>
          <div className="accent-line-center mb-6" />
          <p className="text-body max-w-2xl mx-auto px-4">
            {testimonials.heroSubtitle}
          </p>
        </div>

        {/* ─── Carousel Wrapper ────────────────────────────── */}
        <div className="relative px-4 sm:px-12">
          {/* Viewport */}
          <div 
            className="overflow-hidden" 
            ref={emblaRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Container */}
            <div className="flex">
              {items.map((t) => (
                <div 
                  key={t.id} 
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
                >
                  <div className="h-full relative flex flex-col bg-background rounded-2xl border border-border shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-6 sm:p-8 group overflow-hidden">
                    {/* Subtle gold corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-3xl rounded-tr-2xl pointer-events-none" />

                    {/* Quote Icon */}
                    <div className="mb-6">
                      <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <Quote className="w-5 h-5 text-accent" />
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-muted-foreground text-base leading-relaxed flex-1 mb-6 italic">
                      "{t.content}"
                    </p>

                    {/* Divider */}
                    <div className="border-t border-border mb-6" />

                    {/* Footer Info */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy to-charcoal flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-accent/20">
                          <span className="text-accent font-bold text-sm tracking-tighter">{getInitials(t.name)}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-foreground text-sm sm:text-base truncate">{t.name}</div>
                          <div className="text-muted-foreground text-xs sm:text-sm truncate">{t.role}</div>
                        </div>
                      </div>
                      
                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs font-medium text-accent bg-accent/5 px-3 py-1.5 rounded-full">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span>{t.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Navigation Controls ───────────────────────── */}
          <div className="absolute top-1/2 -left-2 -right-2 -translate-y-1/2 hidden sm:flex justify-between pointer-events-none">
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border-accent/20 text-accent hover:bg-accent hover:text-white pointer-events-auto shadow-lg -translate-x-2"
              onClick={scrollPrev}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border-accent/20 text-accent hover:bg-accent hover:text-white pointer-events-auto shadow-lg translate-x-2"
              onClick={scrollNext}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-10">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex 
                    ? 'w-8 bg-accent' 
                    : 'bg-accent/20 hover:bg-accent/40'
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
