import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";
import sunnyPhoto from "@/assets/sunny-basak.jpg";
import akashPhoto from "@/assets/akash-shah.jpg.asset.json";


const team = [
  {
    name: "Sunny Basak",
    role: "Founder & Creative Director",
    bio: "The visionary behind Click Vision. Sunny leads every project from first call to final cut — ensuring each story is captured with intention, artistry, and heart.",
    initials: "SB",
    photo: sunnyPhoto,
    instagram: "https://www.instagram.com/_itssunnytime",
    handle: "@_itssunnytime",
  },
  {
    name: "Akash Shah",
    role: "Co-Founder & Lead Photographer",
    bio: "The eye behind the lens. Akash brings years of wedding and portrait experience — with a signature style that blends candid emotion and editorial elegance.",
    initials: "AS",
    photo: null as string | null,
    instagram: "https://www.instagram.com/fotografakash",
    handle: "@fotografakash",
  },
];

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="team" className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label-tag mb-5"
          >
            Meet the Team
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-light text-foreground"
          >
            The people behind
            <br />
            <span className="italic text-gradient-gold">every frame.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className="bg-surface border border-border p-8 lg:p-10 group hover:border-gold/40 transition-all duration-500"
            >
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full border border-gold/40 flex items-center justify-center mb-6 group-hover:bg-gold/5 transition-colors overflow-hidden">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-display text-3xl text-gradient-gold font-light">
                    {member.initials}
                  </span>
                )}
              </div>

              <p className="label-tag text-foreground/40 mb-2">{member.role}</p>
              <h3 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
                {member.name}
              </h3>
              <div
                className="gold-line mb-5 group-hover:w-16 transition-all duration-500"
                style={{ width: "48px" }}
              />
              <p className="text-foreground/55 text-sm font-body leading-relaxed mb-6">
                {member.bio}
              </p>

              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-sans-alt tracking-widest uppercase text-gold/80 hover:text-gold transition-colors"
              >
                <Instagram size={12} />
                {member.handle}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
