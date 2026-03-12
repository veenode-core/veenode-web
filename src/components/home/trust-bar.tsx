import { credentials } from "../../data/home";

export default function TrustBar() {
  return (
    <section className="bg-primary py-10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-medium tracking-[0.06em] uppercase text-white/60 mb-8">
          Trusted by organisations across Nigeria, Ghana, the UK, and beyond
        </p>
        <div
          className="grid grid-cols-2 md:grid-cols-5 rounded-xl overflow-hidden"
          style={{ gap: "1px", background: "rgba(255,255,255,0.1)" }}
        >
          {credentials.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="bg-primary flex flex-col items-center justify-center gap-3 px-4 py-6 text-center"
            >
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} weight="regular" className="text-white" />
              </div>
              <div>
                <p className="text-[0.8125rem] font-semibold text-white leading-snug">
                  {label}
                </p>
                <p className="text-[0.75rem] text-white/60 mt-0.5">
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
