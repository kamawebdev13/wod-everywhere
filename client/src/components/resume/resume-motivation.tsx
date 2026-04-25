import { resume_photo_url  } from '@/const/images';

export const ResumeMotivation = () => (
  <section className="px-6 mt-6">
    <div className="w-full h-48 rounded-xl overflow-hidden shadow-md bg-zinc-200">
      <img 
        src={resume_photo_url } 
        alt="Motivation"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover grayscale contrast-125"
      />
    </div>
  </section>
);