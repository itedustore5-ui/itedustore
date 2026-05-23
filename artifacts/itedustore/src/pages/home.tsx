import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Download, Code, Cpu, Database, Network, ChevronDown, CheckCircle2, ChevronRight, Star, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const DEMO_QUESTIONS = [
  { q: "1. Koji sastavni deo računara privremeno čuva podatke dok se obrađuju?", opts: ["(A) Hard disk", "(B) RAM memorija", "(C) Grafička kartica", "(D) Napajanje"], ans: "B" },
  { q: "2. Šta je CPU?", opts: ["(A) Centralna procesna jedinica", "(B) Vrsta memorije", "(C) Mrežna kartica", "(D) Ulazni uređaj"], ans: "A" },
  { q: "3. Koji priključak se najčešće koristi za povezivanje monitora?", opts: ["(A) USB", "(B) HDMI", "(C) RJ45", "(D) PS/2"], ans: "B" },
  { q: "4. Šta označava pojam 'bus' u arhitekturi računara?", opts: ["(A) Vrsta procesora", "(B) Skup provodnika za prenos podataka", "(C) Tip napajanja", "(D) Vrsta memorije"], ans: "B" },
  { q: "5. Koja vrsta memorije gubi podatke nakon gašenja računara?", opts: ["(A) ROM", "(B) Flash", "(C) RAM", "(D) SSD"], ans: "C" },
];

const TESTS = [
  { year: "2025", pdf: "ETRJUN2025.pdf", link: "https://testjun2025.vercel.app/" },
  { year: "2024", pdf: "ETRJUN2024.pdf", link: "https://testjun2024.vercel.app/" },
  { year: "2023", pdf: "ETRJUN2023.pdf", link: "https://testjun2023.vercel.app/" },
  { year: "2022", pdf: "ETRJUN2022.pdf", link: "https://testjun2022.vercel.app/" },
];

export default function Home() {
  const { toast } = useToast();
  const [activeTestYear, setActiveTestYear] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = import.meta.env.BASE_URL + 'prirucnik.pdf';
    link.download = 'prirucnik.pdf';
    link.click();
    toast({
      title: "Preuzimanje započeto",
      description: "Vaš PDF se preuzima.",
    });
  };

  const handleTestDownload = (pdf: string) => {
    const link = document.createElement('a');
    link.href = import.meta.env.BASE_URL + pdf;
    link.download = pdf;
    link.click();
    toast({
      title: "Preuzimanje započeto",
      description: "Vaš PDF se preuzima.",
    });
  };

  const openPreview = (year: string) => {
    setActiveTestYear(year);
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-grid-pattern opacity-30"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none z-[-1]"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-[-1]"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-x-0 border-t-0 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={import.meta.env.BASE_URL + 'itedu-logo.png'} alt="ITEduStore" className="h-7 sm:h-8 object-contain" />
            <span className="font-bold text-lg sm:text-xl tracking-tight hidden sm:block">ITEduStore</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#materijal" className="hover:text-primary transition-colors">Materijal za učenje</a>
            <a href="#testovi" className="hover:text-primary transition-colors">Testovi</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 glow-blue rounded-full px-6" onClick={() => setIsContactOpen(true)}>
              Kontakt
            </Button>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Meni"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-md"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
                {[
                  { href: '#materijal', label: 'Materijal za učenje' },
                  { href: '#testovi', label: 'Testovi' },
                  { href: '#faq', label: 'FAQ' },
                ].map(({ href, label }) => (
                  <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-muted-foreground hover:text-white hover:bg-white/5 transition-colors font-medium">
                    {label}
                  </a>
                ))}
                <div className="pt-2 pb-1">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl" onClick={() => { setMobileMenuOpen(false); setIsContactOpen(true); }}>
                    Kontakt
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

    {/* Hero */}
<section className="relative pt-28 pb-16 sm:pt-40 sm:pb-20 md:pt-52 md:pb-32 px-4 sm:px-6">
  <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12">

    {/* Tekst levo */}
    <motion.div initial="hidden" animate="visible" variants={STAGGER} className="text-center md:text-left max-w-2xl">
      <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium mb-8 text-primary">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        Smer: Elektrotehničar računara
      </motion.div>
      <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
        Sve što ti treba za maturu.<br/>
        <span className="text-gradient">Na jednom mestu.</span>
      </motion.h1>
      <motion.p variants={FADE_UP} className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto md:mx-0">
        Sve što ti treba za maturski ispit — priručnik Zavoda za unapređivanje obrazovanja, zvanični testovi i interaktivna priprema.
      </motion.p>
      <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
        <a href="https://elektrotehnicari.onrender.com/demo" target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white glow-blue">
           Pogledaj demo
          </Button>
        </a>
        <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-border hover:bg-white/5"
          onClick={() => document.getElementById('materijal')?.scrollIntoView({ behavior: 'smooth' })}>
          <BookOpen className="mr-2 h-5 w-5" />
          Vidi Materijale
        </Button>
      </motion.div>
    </motion.div>

    {/* Slika desno */}
    <motion.div
      initial={{ opacity: 1, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      className="hidden md:block w-[360px] lg:w-[420px] shrink-0 self-center md:mt-0"
      style={{ marginLeft: 'auto' }}
     
    >
      
      <img
        src={import.meta.env.BASE_URL + 'knjige.png'}
        alt="Knjige"
       className="w-full object-contain opacity-80 drop-shadow-2xl hover:opacity-100 transition-all duration-500"
      />
    </motion.div>

  </div>
</section>

      {/* Materijal */}
      <section id="materijal" className="py-24 px-6 bg-white/5 border-y border-white/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Materijal za učenje</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Izaberi šta ti odgovara — besplatni priručnik za štampu ili interaktivna aplikacija sa svim pitanjima.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col border-primary/50"
              style={{ boxShadow: '0 0 40px rgba(26, 107, 255, 0.15)' }}>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Priručnik</h3>
              <p className="text-muted-foreground mb-6">O polaganju maturskog ispita u obrazovnom profilu elektrotehničar računara.</p>
              <ul className="space-y-3 mb-10 flex-1">
                {["Ocenjivanje zasnovano na kompetencijama — šta i kako se ocenjuje", "Procedure za organizaciju i izvođenje maturskog ispita", "Pripremljeno uz učešće nastavnika"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full text-lg h-14 rounded-xl bg-primary hover:bg-primary/90 text-white glow-blue" onClick={handleDownload}>
                <Download className="mr-2 h-5 w-5" />
                Preuzmi priručnik
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }} className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Aplikacija</h3>
              <p className="text-muted-foreground mb-6">Svih 250 pitanja sa tačnim odgovorima. Za pristup kontaktiraj admina radi lozinke.</p>
              <ul className="space-y-3 mb-6 flex-1">
                {["250 pitanja po godini", "Trenutna provera odgovora", "Filtriranje po oblastima", "Scoreboard-vidljiv napredak"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
   <a href="https://elektrotehnicari.onrender.com/" target="_blank" rel="noopener noreferrer" className="w-full">
  <Button size="lg" className="w-full text-lg h-14 rounded-xl bg-primary hover:bg-primary/90 text-white">
    Uloguj se uz admin pristup
  </Button>
              </a>
            </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Testovi */}
      <section id="testovi" className="py-24 px-6 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Testovi iz prethodnih godina</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">Vežbaj na zvaničnim testovima Ministarstva prosvete. 50 pitanja po godini — sa tačnim odgovorima i objašnjenjima.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTS.map((test, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                key={test.year}
                className="glass-panel p-6 rounded-2xl cursor-pointer hover:bg-white/5 transition-all group border-border hover:border-primary/50"
                onClick={() => window.open(test.link, '_blank')}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold text-white">Matura {test.year}</div>
                  <ChevronRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <div className="space-y-2 text-sm text-muted-foreground mb-6">
                  <div className="flex justify-between"><span>Broj pitanja:</span> <span className="text-white">50</span></div>
                  <div className="flex justify-between"><span>Smer:</span> <span className="text-white text-right">Elektrotehničar računara</span></div>
                  <div className="flex justify-between"><span>Format:</span> <span className="text-white"></span></div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full bg-transparent border-white/20 hover:bg-white/10"
                    onClick={(e) => { e.stopPropagation(); handleTestDownload(test.pdf); }}>
                    <Download className="mr-2 h-4 w-4" />
                    Preuzmi test
                  </Button>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={(e) => { e.stopPropagation(); window.open(test.link, '_blank'); }}>
                    Reši online
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-t border-white/10 bg-black/40">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center divide-x divide-white/10">
           
            <div>
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">250</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Pitanja po testu</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Gradivo po standardu Ministarstva prosvete</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">4.9</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold flex items-center justify-center gap-1">
                Ocena <Star className="h-4 w-4 fill-primary text-primary inline" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 relative max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Često postavljana pitanja</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b-white/10">
            <AccordionTrigger className="text-left text-lg hover:text-primary">Da li je priručnik stvarno besplatan?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              Da, Priručnik je javni dokument namenjen učenicima koji se pripremaju za maturski ispit obrazovnog profila Elektrotehničar računara. Potpuno besplatan.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b-white/10">
            <AccordionTrigger className="text-left text-lg hover:text-primary">Kako da dobijem pristup aplikaciji?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              Sva pitanja maturskog ispita u interaktivnom formatu, sa tačnim odgovorima i trenutnom proverom. Za pristup kontaktiraj admina — lozinka važi do kraja ispitnog roka.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b-white/10">
            <AccordionTrigger className="text-left text-lg hover:text-primary">Da li su testovi ažurirani za tekuću godinu?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              Da, priručnik prati aktuelni plan i program Ministarstva prosvete za obrazovni profil Elektrotehničar računara.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 mt-12 bg-black/60">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src={import.meta.env.BASE_URL + 'itedu-logo.png'} alt="ITEduStore" className="h-6 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
            <span className="font-semibold text-muted-foreground">ITEduStore</span>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} ITEduStore. Sva prava zadržana.<br/>
            Napravljeno za učenike profila Elektrotehničar računara.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">TikTok</a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); setIsContactOpen(true); }}>Kontakt</a>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
        <DialogContent className="sm:max-w-2xl glass-panel border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Demo — Računarski hardver
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              5 primera pitanja iz oblasti Računarski hardver. Aplikacija sadrži svih 250 pitanja.
            </DialogDescription>
          </DialogHeader>
          <div className="my-6 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
            {DEMO_QUESTIONS.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="font-medium text-lg mb-3">{item.q}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {item.opts.map((opt, j) => (
                    <div key={j} className="text-muted-foreground">{opt}</div>
                  ))}
                </div>
                <div className="text-sm font-semibold text-primary mt-2">Tačan odgovor: {item.ans}</div>
              </div>
            ))}
          </div>
          <DialogFooter className="sm:justify-between items-center border-t border-white/10 pt-4">
            <div className="text-sm text-muted-foreground mb-4 sm:mb-0">Svih 250 pitanja dostupno u aplikaciji.</div>
            <a href="https://elektrotehnicari.onrender.com/demo" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => setIsDemoOpen(false)}>
                Probaj u aplikaciji
              </Button>
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-2xl glass-panel border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Primer pitanja - Test {activeTestYear}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Ovo su primeri pitanja iz zvaničnog testa. Kompletan test sadrži 250 pitanja.
            </DialogDescription>
          </DialogHeader>
          <div className="my-6 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
            {[
              { q: "1. Koji protokol se koristi za slanje e-pošte?", opts: ["(A) HTTP", "(B) SMTP", "(C) FTP", "(D) DNS"], ans: "B" },
              { q: "2. Šta je RAM memorija?", opts: ["(A) Trajna memorija", "(B) Privremena memorija", "(C) Grafička kartica", "(D) Procesor"], ans: "B" },
              { q: "3. Koji od navedenih nije operativni sistem?", opts: ["(A) Windows", "(B) Linux", "(C) MySQL", "(D) macOS"], ans: "C" },
              { q: "4. Šta je IP adresa?", opts: ["(A) Naziv fajla", "(B) Jedinstvena adresa uređaja na mreži", "(C) Vrsta procesora", "(D) Tip ekrana"], ans: "B" },
              { q: "5. Koja komanda prikazuje sadržaj direktorijuma u Linux-u?", opts: ["(A) dir", "(B) show", "(C) ls", "(D) list"], ans: "C" }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="font-medium text-lg mb-3">{item.q}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {item.opts.map((opt, j) => (
                    <div key={j} className="text-muted-foreground">{opt}</div>
                  ))}
                </div>
                <div className="text-sm font-semibold text-primary mt-2">Tačan odgovor: {item.ans}</div>
              </div>
            ))}
          </div>
          <DialogFooter className="sm:justify-between items-center border-t border-white/10 pt-4">
            <div className="text-sm text-muted-foreground mb-4 sm:mb-0">Želiš svih 250 pitanja?</div>
            <Button onClick={() => { setIsPreviewOpen(false); handleDownload(); }} className="bg-primary hover:bg-primary/90 text-white">
              <Download className="mr-2 h-4 w-4" />
              Preuzmi kompletan test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

     {/* Kontakt Modal */}
<Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
  <DialogContent className="sm:max-w-md glass-panel border-white/10 text-white">
    <DialogHeader>
      <DialogTitle className="text-xl font-bold">Kontaktiraj nas</DialogTitle>
      <DialogDescription className="text-muted-foreground">
        Pošalji poruku ili nas pronađi na društvenim mrežama.
      </DialogDescription>
    </DialogHeader>

    {/* Email forma */}
    <form
      action="https://formspree.io/f/mojbdjog"
      method="POST"
      className="flex flex-col gap-3 mt-2"
    >
      <input
        type="text"
        name="name"
        placeholder="Tvoje ime"
        required
        className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Tvoj email"
        required
        className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="message"
        placeholder="Poruka...(Molim admina za odobrenje pristupa…)"
        rows={3}
        required
        className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white">
        ✉️ Pošalji poruku
      </Button>
    </form>

    {/* Separator */}
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-white/10" />
      <span className="text-white/40 text-sm">ili</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>

    {/* Društvene mreže */}
    <div className="flex flex-col gap-2">
      <a href="https://wa.me/381TVOJ_BROJ" target="_blank" rel="noopener noreferrer" className="w-full">
        <Button variant="outline" className="w-full h-11 text-sm border-white/20 hover:bg-green-500/20 hover:border-green-400/40">
          💬 WhatsApp
        </Button>
      </a>
      <div className="flex gap-2">
        <a href="https://instagram.com/TVOJ_PROFIL" target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="outline" className="w-full h-11 text-sm border-white/20 hover:bg-pink-500/20 hover:border-pink-400/40">
            📸 Instagram
          </Button>
        </a>
        <a href="https://tiktok.com/@TVOJ_PROFIL" target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="outline" className="w-full h-11 text-sm border-white/20 hover:bg-white/10">
            🎵 TikTok
          </Button>
        </a>
      </div>
    </div>
  </DialogContent>
</Dialog>

   </div>
  );
}
