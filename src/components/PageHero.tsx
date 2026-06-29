interface Props {
  title: string;
  subtitle?: string;
}

const PageHero = ({ title, subtitle }: Props) => (
  <section className="bg-beige-soft">
    <div className="container py-16 md:py-20 text-center animate-fade-in">
      <h1 className="font-display text-5xl md:text-6xl mb-4">{title}</h1>
      {subtitle && <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>}
    </div>
  </section>
);

export default PageHero;
