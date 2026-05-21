import { useState } from "react";
import { useLocation } from "wouter";
import { login, register, getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Forms state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(loginEmail, loginPassword);
    if (user) {
      toast({ title: "Uspešna prijava", description: `Dobrodošli nazad, ${user.name}!` });
      if (!user.hasPaid) {
        setLocation("/payment");
      } else {
        setLocation("/dashboard");
      }
    } else {
      toast({ variant: "destructive", title: "Greška", description: "Pogrešan email ili lozinka." });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      toast({ variant: "destructive", title: "Greška", description: "Lozinke se ne poklapaju." });
      return;
    }
    if (regPassword.length < 6) {
      toast({ variant: "destructive", title: "Greška", description: "Lozinka mora imati bar 6 karaktera." });
      return;
    }
    
    const user = register(regName, regEmail, regPassword);
    if (user) {
      toast({ title: "Uspešna registracija", description: "Dobrodošli na Maturski Kviz!" });
      setLocation("/payment");
    } else {
      toast({ variant: "destructive", title: "Greška", description: "Korisnik sa ovim email-om već postoji." });
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 relative overflow-hidden bg-black/40 border-r border-white/10">
        <div className="absolute inset-0 pointer-events-none z-[-1] bg-grid-pattern opacity-30"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-primary/20 blur-[120px] pointer-events-none z-[-1]"></div>

        <div>
          <div className="flex items-center gap-3 mb-12">
            <img src={import.meta.env.BASE_URL + 'itedu-logo.png'} alt="ITEduStore" className="h-8 object-contain" />
            <span className="font-bold text-xl tracking-tight text-white">ITEduStore</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white">
            Položi maturu.<br/>
            <span className="text-gradient">Zablistaj na ispitu.</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-md">
            Dobrodošli na ultimativnu platformu za pripremu mature iz predmeta Elektrotehničar računara. Preko 250 pitanja iz zvaničnih testova.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-white">Kompletno gradivo</div>
              <div className="text-sm text-muted-foreground">Hardver, OS, Održavanje, Dokumentacija</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-white">Praćenje napretka</div>
              <div className="text-sm text-muted-foreground">Detaljna statistika i scoreboard</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-white">Zvanični testovi</div>
              <div className="text-sm text-muted-foreground">Pitanja sa pravih maturskih ispita</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 pointer-events-none z-[-1] bg-grid-pattern opacity-10 lg:hidden"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none z-[-1]"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass-panel p-8 rounded-2xl"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <img src={import.meta.env.BASE_URL + 'itedu-logo.png'} alt="ITEduStore" className="h-8 object-contain" />
            <span className="font-bold text-xl tracking-tight text-white">ITEduStore</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 text-center">Maturski Kviz</h2>
          <p className="text-muted-foreground text-center mb-8">Prijavite se ili kreirajte nalog za pristup</p>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/50 border border-white/10">
              <TabsTrigger value="login" data-testid="tab-login">Prijava</TabsTrigger>
              <TabsTrigger value="register" data-testid="tab-register">Registracija</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="vas@email.com" 
                    required 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="bg-black/50 border-white/10"
                    data-testid="input-login-email"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Lozinka</Label>
                  </div>
                  <Input 
                    id="login-password" 
                    type="password" 
                    required 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="bg-black/50 border-white/10"
                    data-testid="input-login-password"
                  />
                </div>
                <Button type="submit" className="w-full mt-6 bg-primary hover:bg-primary/90 text-white glow-blue" data-testid="button-login-submit">
                  Prijavi se
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Ime i prezime</Label>
                  <Input 
                    id="reg-name" 
                    placeholder="Petar Petrović" 
                    required 
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="bg-black/50 border-white/10"
                    data-testid="input-reg-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input 
                    id="reg-email" 
                    type="email" 
                    placeholder="vas@email.com" 
                    required 
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="bg-black/50 border-white/10"
                    data-testid="input-reg-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Lozinka</Label>
                  <Input 
                    id="reg-password" 
                    type="password" 
                    required 
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="bg-black/50 border-white/10"
                    data-testid="input-reg-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-confirm">Potvrdi lozinku</Label>
                  <Input 
                    id="reg-confirm" 
                    type="password" 
                    required 
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    className="bg-black/50 border-white/10"
                    data-testid="input-reg-confirm"
                  />
                </div>
                <Button type="submit" className="w-full mt-6 bg-primary hover:bg-primary/90 text-white glow-blue" data-testid="button-reg-submit">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Registruj se
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
