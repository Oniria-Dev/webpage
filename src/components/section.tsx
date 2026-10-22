import { cn } from "../lib/utils";

// For t.rich(): titles mark the idea with <em>, rendered grey by globals.css.
export const em = { em: (chunks: React.ReactNode) => <em>{chunks}</em> };

type Props = {
  id?: string;
  title: React.ReactNode;
  intro?: string;
  className?: string;
  children: React.ReactNode;
};

/* A chapter: its title, an optional intro and the content, set apart from the
   previous one by space alone (half on each side: 120–220px between two). */
export function Section({ id, title, intro, className, children }: Props) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 px-[calc(clamp(4px,1.5vw,16px)+24px)] py-[clamp(60px,7.5vw,110px)]", className)}
    >
      <h2 data-reveal className="font-editorial text-[clamp(40px,5vw,88px)] leading-[0.98] font-bold tracking-normal">
        {title}
      </h2>
      {intro && <p data-reveal className="mt-6 max-w-[60ch] text-[clamp(18px,1.5vw,22px)] leading-snug">{intro}</p>}
      <div className="mt-[clamp(40px,5vw,80px)]">{children}</div>
    </section>
  );
}
