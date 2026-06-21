import { Star, Shield, Award } from "lucide-react";

export function TrustBadges() {
  return (
  <section className="py-12 bg-secondary/30">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">

      {/* Google Reviews */}
      <div className="flex items-center gap-4 px-8 py-4 bg-card rounded-2xl border border-border min-w-[250px]">
        <div className="text-4xl">G</div>

        <div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-green-500 fill-green-500"
              />
            ))}
          </div>

          <p className="text-muted-foreground">
            Google Reviews{" "}
            <span className="font-bold text-foreground">5.0</span>
          </p>
           <p className="text-muted-foreground">
            Total Reviews Count{" "}
            <span className="font-bold text-foreground">2</span>
          </p>
        </div>
      </div>

      {/* Clutch */}
      <div className="flex items-center gap-4 px-8 py-4 bg-card rounded-2xl border border-border min-w-[250px]">
        <div className="font-bold text-2xl text-foreground">
          Clutch
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-green-500 fill-green-500"
              />
            ))}
          </div>

          <p className="text-muted-foreground">
            Clutch{" "}
            <span className="font-bold text-foreground">5.0</span>
          </p>
        </div>
      </div>

      {/* GoodFirms */}
      <div className="flex items-center gap-4 px-8 py-4 bg-card rounded-2xl border border-border min-w-[250px]">
        <div className="font-bold text-xl text-foreground">
          GoodFirms
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-green-500 fill-green-500"
              />
            ))}
          </div>

          <p className="text-muted-foreground">
            GoodFirms{" "}
            <span className="font-bold text-foreground">5.0</span>
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
  );
}
