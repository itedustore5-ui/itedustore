import { useEffect, useState } from "react";
import { QuizNav } from "@/components/QuizNav";
import { getScoreboard } from "@/lib/auth";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, Star } from "lucide-react";
import { SUBJECT_LABELS } from "@/data/questions";
import { motion } from "framer-motion";

export default function Scoreboard() {
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    setScores(getScoreboard().slice(0, 50)); // Top 50
  }, []);

  return (
    <div className="min-h-screen w-full bg-background pt-20 pb-12 px-4 sm:px-6">
      <QuizNav />
      
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              Globalni Scoreboard
            </h1>
            <p className="text-muted-foreground text-lg">Najbolji rezultati svih korisnika platforme.</p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl overflow-hidden border border-white/10"
        >
          {scores.length > 0 ? (
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="w-[50px] sm:w-[80px] text-center text-white/70">#</TableHead>
                  <TableHead className="text-white/70">Korisnik</TableHead>
                  <TableHead className="hidden sm:table-cell text-white/70">Predmet</TableHead>
                  <TableHead className="text-right text-white/70">Rezultat</TableHead>
                  <TableHead className="hidden md:table-cell text-right text-white/70">Datum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scores.map((score, index) => (
                  <TableRow key={`${score.userId}-${score.id}`} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium text-center">
                      {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />}
                      {index === 1 && <Medal className="h-5 w-5 text-gray-400 mx-auto" />}
                      {index === 2 && <Medal className="h-5 w-5 text-amber-600 mx-auto" />}
                      {index > 2 && <span className="text-muted-foreground text-sm">{index + 1}.</span>}
                    </TableCell>
                    <TableCell className="font-bold text-white text-sm sm:text-base">
                      {score.userName}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                      {score.subject === 'all' ? 'Sve oblasti' : SUBJECT_LABELS[score.subject as keyof typeof SUBJECT_LABELS]}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <span className={`font-bold text-sm sm:text-base ${score.percentage >= 60 ? 'text-green-500' : 'text-destructive'}`}>
                          {score.percentage}%
                        </span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                          ({score.score}/{score.total})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-right text-muted-foreground text-sm">
                      {new Date(score.date).toLocaleDateString('sr-RS')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-12 text-center text-muted-foreground">
              <Star className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Još uvek nema rezultata. Budite prvi!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
