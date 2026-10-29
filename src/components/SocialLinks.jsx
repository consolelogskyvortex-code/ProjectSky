import { useEffect } from "react";
import { Github, Instagram, Music2, ExternalLink } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const socialLinks = [
  { name: "GitHub", displayName: "GitHub", subText: "@SkyVortex", icon: Github, url: "https://github.com/SkyVortex", color: "#ffffff", gradient: "from-[#333] to-[#24292e]" },
  { name: "Instagram", displayName: "Instagram", subText: "@skyvortex2011", icon: Instagram, url: "https://www.instagram.com/skyvortex2011/", color: "#E4405F", gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]" },
  { name: "TikTok", displayName: "TikTok", subText: "@skyvortex2011", icon: Music2, url: "https://www.tiktok.com/@skyvortex2011", color: "#25F4EE", gradient: "from-[#000000] via-[#25F4EE] to-[#FE2C55]" },
];

export default function SocialLinks() {
  useEffect(() => { AOS.init({ offset: 10, once: true }); }, []);
  return (
    <div className="w-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-8 backdrop-blur-xl">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2" data-aos="fade-down">
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full" />Socials &amp; Links
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialLinks.map((link, index) => { const Icon = link.icon; return (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500" data-aos="fade-up" data-aos-delay={100 + index * 100}>
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`} />
            <div className="relative flex items-center justify-center"><div className="relative p-2 rounded-lg"><Icon className="w-5 h-5 transition-all duration-500 group-hover:scale-110" style={{ color: link.color }} /></div></div>
            <div className="relative flex flex-col min-w-0"><span className="text-sm font-bold text-gray-200 group-hover:text-white">{link.displayName}</span><span className="text-xs text-gray-400 truncate">{link.subText}</span></div>
            <ExternalLink className="relative w-4 h-4 text-gray-500 group-hover:text-white ml-auto" />
          </a>
        ); })}
      </div>
    </div>
  );
}
