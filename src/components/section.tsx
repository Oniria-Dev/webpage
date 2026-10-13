import { cn } from "../lib/utils";

// For t.rich(): titles mark the idea with <em>, rendered grey by globals.css.
export const em = { em: (chunks: React.ReactNode) => <em>{chunks}</em> };

type Props = {
  id?: string;
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: string;
  className?: string;
  children: React.ReactNode;
};

/* A chapter of the manual: number and name on a left rail, cut from the previous one by a thin rule. */
export function Section({ id, index, label, title, intro, className, children }: Props) {
  return (
    <section id={id} className={cn("scroll-mt-20 border-t border-border py-20 md:py-28", className)}>
      <div className="wrap grid gap-8 md:grid-cols-[180px_1fr]">
        <p className="mono-label text-muted-foreground">
          <span className="text-foreground">{index}</span> · {label}
        </p>
        <div>
          <h2 className="max-w-[20ch] text-4xl md:text-5xl">{title}</h2>
          {intro && <p className="mt-5 max-w-[60ch] text-lg text-muted-foreground">{intro}</p>}
          <div className="mt-12">{children}</div>
        </div>
      </div>
    </section>
  );
}
