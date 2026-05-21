import { useEffect, useState } from "react";
import { QuizNav } from "@/components/QuizNav";
import { getUsers, resetScores, User } from "@/lib/auth";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Shield, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  const loadUsers = () => {
    setUsers(getUsers());
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleResetScores = (userId: string, userName: string) => {
    if (confirm(`Da li ste sigurni da želite da resetujete sve rezultate za korisnika ${userName}?`)) {
      resetScores(userId);
      loadUsers();
      toast({ title: "Rezultati resetovani", description: `Svi rezultati za korisnika ${userName} su obrisani.` });
    }
  };

  return (
    <div className="min-h-screen w-full bg-background pt-20 pb-12 px-4 sm:px-6">
      <QuizNav />
      
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            Admin Panel
          </h1>
          <p className="text-muted-foreground text-lg">Upravljanje korisnicima platforme.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl overflow-hidden border border-white/10"
        >
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/70">ID</TableHead>
                <TableHead className="text-white/70">Ime</TableHead>
                <TableHead className="text-white/70">Email</TableHead>
                <TableHead className="text-center text-white/70">Plaćeno</TableHead>
                <TableHead className="text-center text-white/70">Broj testova</TableHead>
                <TableHead className="text-right text-white/70">Akcije</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {user.id}
                  </TableCell>
                  <TableCell className="font-medium text-white flex items-center gap-2">
                    {user.name}
                    {user.isAdmin && <Shield className="h-3 w-3 text-primary" title="Admin" />}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-center">
                    {user.hasPaid ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center text-white font-medium">
                    {user.scores?.length || 0}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-white/10 text-white hover:bg-destructive/20 hover:text-destructive hover:border-destructive/30"
                      onClick={() => handleResetScores(user.id, user.name)}
                      disabled={!user.scores || user.scores.length === 0}
                    >
                      <RotateCcw className="h-3 w-3 mr-2" />
                      Resetuj
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}
