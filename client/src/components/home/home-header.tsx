interface HomeHeaderProps {
  name: string;
  dayName: string;
  dateString: string;
}

export const HomeHeader = ({ name, dayName, dateString }: HomeHeaderProps) => (
  <section className="px-8 pt-12 pb-10 bg-white">
    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
      {dayName}S ARE FOR INTENSITY • {dateString}
    </p>
    <h1 className="text-4xl font-black text-black leading-tight">
      Welcome back, {name}
    </h1>
    <p className="text-lg text-gray-600 font-medium tracking-tight">Ready for today's challenge?</p>
  </section>
);