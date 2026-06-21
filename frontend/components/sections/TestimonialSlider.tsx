import React from 'react';

interface Testimonial {
  name: string;
  handle: string;
  text: string;
  gradient: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Abhishek Tiwari',
    handle: 'Founder, Goom Hr',
    text: 'Working with Atulya IT Solutions was smooth and efficient. The team understood our goals quickly and delivered a reliable solution on time.',
    gradient: 'from-orange-600 to-white-600',
  },
  {
    name: 'Pavan Prajapati',
    handle: 'SEBI Reg. RA',
    text: 'Atulya IT Solutions provided excellent support throughout the project. Every requirement was handled professionally with great attention to detail.',
    gradient: 'from-green-600 to-indigo-600',
  },
  {
    name: 'Sudhakar Yadav',
    handle: 'Founder, One Resource HR Services',
    text: 'The project was completed exactly as discussed. Communication was clear, delivery was timely, and the final result exceeded expectations.',
    gradient: 'from-red-600 to-indigo-600',
  },
  {
    name: 'Pavan Choubey',
    handle: 'Founder, Investa X Research',
    text: 'Complex customizations were implemented without issues. The team remained responsive throughout and ensured every detail was addressed.',
    gradient: 'from-blue-600 to-indigo-600',
  },
  {
    name: 'Ahmet Apak',
    handle: 'Founder, Lessions For Life International',
     text: 'A highly professional experience from start to finish. The website performs well and reflects the vision we had for our business.',
    gradient: 'from-slate-600 to-indigo-600',
  },
  {
    name: 'Yash Agrawal',
    handle: 'Founder, Jersey Pride Store',
     text: 'Atulya IT Solutions delivered quality work with impressive speed. Their technical expertise and commitment made the process seamless.',
    gradient: 'from-orange-600 to-indigo-600',
  },
];

export  function TestimonialEmblaSlider() {
  // We double the data to create a seamless infinite rolling loop
const row1Data = testimonials.filter((_, index) => index % 2 === 0);
const row2Data = testimonials.filter((_, index) => index % 2 !== 0);

const row1 = [...row1Data, ...row1Data];
const row2 = [...row2Data, ...row2Data].reverse();

  return (
    <section className="w-full bg-muted/30 py-16 overflow-hidden select-none">
      
      {/* 1. Direct CSS Injection for absolute reliable cross-browser behavior */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-left {
          display: flex;
          width: max-content;
          gap: 16px;
          animation: marqueeLeft 90s linear infinite;
        }
        .marquee-track-right {
          display: flex;
          width: max-content;
          gap: 16px;
          animation: marqueeRight 90s linear infinite;
        }
        .marquee-track-left:hover, .marquee-track-right:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
                <div className="text-center mb-16">

         <span className="text-primary text-sm uppercase tracking-widest font-medium">
            Testimonials
          </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6">
          What Our Clients Say
        </h2>
      </div>
      </div>

      {/* 2. Slider Container with Faded Edges (Blur effect like Saasfly) */}
      <div
  className="
    relative w-full overflow-hidden
    before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32
    before:bg-gradient-to-r before:from-white before:to-transparent
    dark:before:from-[#0b0b0c]

    after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32
    after:bg-gradient-to-l after:from-white after:to-transparent
    dark:after:from-[#0b0b0c]
  "
>
        
        {/* Layout Wrapper: Spacing out Row 1 and Row 2 */}
        <div className="flex flex-col gap-4 w-full">
          
          {/* Row 1 Wrapper */}
          <div className="w-full overflow-hidden">
            <div className="marquee-track-left">
              {row1.map((item, index) => (
                <TestimonialCard key={`row1-${index}`} item={item} />
              ))}
            </div>
          </div>

          {/* Row 2 Wrapper (Offset layout tracking in reverse direction) */}
          <div className="w-full overflow-hidden">
            <div className="marquee-track-right">
              {row2.map((item, index) => (
                <TestimonialCard key={`row2-${index}`} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Reusable individual Card matching "image_be6c5c.jpg" visual weight
function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="w-[300px] sm:w-[350px] shrink-0  border hover:border-primary/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#3e3e42]">
      <div className="p-[10px]">
        <p className="text-black-400 text-md leading-relaxed font-normal mb-8">{item.text}</p>

        {/* Top Info Area */}
        <div className="flex items-center gap-3">
  <div
    className={`w-10 h-10 rounded-full shrink-0 bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-white text-sm font-bold`}
  >
    {item.name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase()}
  </div>

  <div className="truncate">
    <div className="text-black-900 text-sm font-semibold truncate tracking-wide">
      {item.name}
    </div>
    <div className="text-black-900 text-xs truncate mt-0.5">
      {item.handle}
    </div>
  </div>
</div>
        {/* Comment Text */}
      </div>
    </div>
  );
}