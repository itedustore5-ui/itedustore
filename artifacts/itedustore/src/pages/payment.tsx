import { useEffect } from "react";
import { useLocation } from "wouter";
import { getCurrentUser, markPaid } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, Lock, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Payment() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    } else if (user.hasPaid) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const handlePayment = () => {
    markPaid();
    toast({
      title: "Plaćanje uspešno",
      description: "Hvala na poverenju! Vaš nalog je sada aktivan.",
    });
    setLocation("/dashboard");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-primary/30">
      <div className="absolute inset-0 pointer-events-none z-[-1] bg-grid-pattern opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-[-1]"></div>

      <div className="mb-8 text-center">
        <div className="flex items-center gap-3 justify-center mb-6">
          <img src={import.meta.env.BASE_URL + 'itedu-logo.png'} alt="ITEduStore" className="h-10 object-contain" />
          <span className="font-bold text-2xl tracking-tight text-white">ITEduStore</span>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium mb-4 text-white/80">
          <Lock className="h-4 w-4" />
          Prijavljeni ste kao <strong className="text-white">{user.email}</strong>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden border-primary/50"
        style={{ boxShadow: '0 0 40px rgba(26, 107, 255, 0.15)' }}
      >
        <div className="absolute top-0 right-0 bg-primary text-white px-6 py-1.5 text-sm font-bold rounded-bl-2xl">
          JEDNOKRATNO
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">Maturski Kviz</h1>
        <p className="text-muted-foreground mb-8">Doživotni pristup platformi za pripremu mature.</p>
        
        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-5xl font-black text-white">999 RSD</span>
          <span className="text-xl text-muted-foreground line-through decoration-destructive decoration-2">1.499 RSD</span>
        </div>
        
        <div className="space-y-4 mb-10">
          {[
            "Pristup svim predmetima (Hardver, OS, Održavanje, Dokumentacija)",
            "Preko 250 zvaničnih pitanja sa prethodnih matura",
            "Sistem za praćenje napretka po oblastima",
            "Učešće na globalnom Scoreboard-u",
            "Detaljna rešenja i objašnjenja"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-white/90">{item}</span>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={handlePayment}
          size="lg" 
          className="w-full text-lg h-16 rounded-xl bg-primary hover:bg-primary/90 text-white glow-blue mb-4"
          data-testid="button-pay"
        >
          <CreditCard className="mr-2 h-6 w-6" />
          Plati 999 RSD
        </Button>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-white/5 p-3 rounded-lg">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <span>Simulacija plaćanja — u produkciji ovde bi bila prava platna forma</span>
        </div>
      </motion.div>
    </div>
  );
}
