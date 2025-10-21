export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-balance font-sans text-3xl font-black tracking-tight text-foreground md:text-5xl">
            Built for Personal Trainers
          </h2>

          <div className="space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            <p>
              I'm a web developer who specializes in high-converting websites. After working with businesses across different industries, 
              I noticed personal trainers face a unique challenge: <span className="font-bold text-foreground">you need a professional online presence, but agencies charge £2,000-5,000.</span>
            </p>

            <p>
              Most PTs can't justify spending thousands on a website when you're just starting to scale. But without one, 
              you're stuck competing on Instagram where the algorithm controls your business. 
              <span className="font-bold text-foreground"> That's why I'm offering professional websites for just £39 — but only for the first 50 sites.</span>
            </p>

            <p className="text-xl font-bold text-foreground bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent">
              After 50 sites, the price goes to £299. This is a one-time opportunity to get in early.
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-orange-500/10 border-2 border-accent/30">
              <p className="text-base text-foreground font-semibold">
                🤝 <span className="font-black">My Promise:</span> Every site is built to convert visitors into clients. 
                If you're not happy, you get a full refund. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
