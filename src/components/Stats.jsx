import useCountUp from "../hooks/useCountUp";
import { stats } from "../data/content";

function StatItem({ stat }) {
  const { ref, value } = useCountUp(stat.value);
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl md:text-5xl font-semibold text-ink">
        {value}
        <span className="text-gold">{stat.suffix}</span>
      </p>
      <p className="mt-2 font-mono text-xs text-muted uppercase tracking-wide">
        {stat.label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 px-6 border-y border-line">
      <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <StatItem key={s.label} stat={s} />
        ))}
      </div>
    </section>
  );
}
