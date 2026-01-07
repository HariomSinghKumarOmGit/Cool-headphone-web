import HeadphoneScroll from "@/components/HeadphoneScroll";
import SpecsTabs from "@/components/SpecsTabs";
import ShowcaseSection from "@/components/ShowcaseSection";

export const metadata = {
  title: "AIOVA | Pure Sound",
  description: "Experience the next level of acoustic precision with AIOVA headphones.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
      {/* Navigation - Minimalist */}
      <nav className="fixed top-0 left-0 w-full p-8 z-100 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter text-white">AIOVA.</div>
        <div className="flex gap-8 text-[12px] uppercase tracking-widest text-white/60">
          <a href="#" className="hover:text-white transition-colors">Technology</a>
          <a href="#" className="hover:text-white transition-colors">Design</a>
          <a href="#" className="hover:text-white transition-colors">Store</a>
        </div>
      </nav>

      {/* Hero / Scrollytelling Section */}
      <HeadphoneScroll />

      {/* New Content Section */}
      <SpecsTabs />

      {/* Showcase / Parallax Section */}
      <ShowcaseSection />

      {/* Footer - Socials / Links */}
      <footer className="relative bg-black py-40 px-10 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div className="md:col-span-2">
              <div className="text-4xl font-bold tracking-tighter text-white mb-8">AIOVA.</div>
              <p className="text-white/40 max-w-sm text-lg">
                Crafting the future of sound through precision engineering and minimalist design.
              </p>
            </div>
            
            <div>
              <h6 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Explore</h6>
              <ul className="space-y-4 text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Technology</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Acoustics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              </ul>
            </div>

            <div>
              <h6 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Social</h6>
              <ul className="space-y-4 text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-xs text-white/20 uppercase tracking-[0.4em]">© 2026 AIOVA ACOUSTICS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-10 text-[10px] uppercase tracking-widest text-white/20">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
