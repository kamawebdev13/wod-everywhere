interface HeroSectionProps {
  image: string;
}

export const HeroSection = ({ image }: HeroSectionProps) => (
  <section className="w-full max-w-md px-6 pt-12 pb-8 flex flex-col items-center text-center">
    <div className="w-full aspect-square rounded-lg overflow-hidden shadow-xl mb-10 bg-iron-800">
      <img
        src={image}
        alt="Kettlebell on the sand"
        className="w-full h-full object-cover opacity-90"
      />
    </div>

    <h1 className="font-display text-5xl font-bold text-iron-900 leading-tight uppercase tracking-tighter">
      TRAIN <br />
      <span className="text-brand-red">ANYWHERE</span>
    </h1>

    <p className="font-body text-gray-600 mt-5 max-w-70 leading-relaxed text-sm">
      The elite fitness engine for athletes who move. No gym required, just grit.
    </p>
  </section>
);