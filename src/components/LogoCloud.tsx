const logos = [
  "Al Habtoor Group",
  "Emaar Properties",
  "Damac Properties",
  "Sobha Realty",
  "Nakheel",
  "Azizi Developments",
];

const LogoCloud = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-center text-muted-foreground text-sm tracking-widest uppercase mb-10 font-body">
          Trusted by forward-thinking Dubai agencies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {logos.map((name) => (
            <div
              key={name}
              className="px-6 py-3 rounded-lg bg-secondary text-muted-foreground font-semibold text-sm tracking-wide font-body"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
