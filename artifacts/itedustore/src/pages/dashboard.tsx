import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { QuizNav } from "@/components/QuizNav";
import { getCurrentUser, Score } from "@/lib/auth";
import { SUBJECT_LABELS } from "@/data/questions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, Award, Target, ChevronRight, BookOpen } from "lucide-react";

export default function Dashboard() {
  const user = getCurrentUser();
  const [stats, setStats] = useState({
    attempts: 0,
    bestPercentage: 0,
    lastPercentage: 0,
  });
  const [subjectStats, setSubjectStats] = useState<Record<string, { correct: number, total: number, percentage: number }>>({});

  useEffect(() => {
    if (!user || !user.scores) return;

    const scores = user.scores;
    const attempts = scores.length;
    const best = attempts > 0 ? Math.max(...scores.map(s => s.percentage)) : 0;
    const last = attempts > 0 ? scores[scores.length - 1].percentage : 0;

    setStats({
      attempts,
      bestPercentage: best,
      lastPercentage: last,
    });

    // Calculate subject stats
    const subjStats: Record<string, { correct: number, total: number, percentage: number }> = {};
    
    // Initialize all subjects to 0
    Object.keys(SUBJECT_LABELS).forEach(key => {
      subjStats[key] = { correct: 0, total: 0, percentage: 0 };
    });

    // Aggregate best scores per subject
    scores.forEach(score => {
      if (score.subject !== 'all' && subjStats[score.subject]) {
        // Keep the best score for each subject
        if (score.percentage >= subjStats[score.subject].percentage) {
           subjStats[score.subject] = {
             correct: score.score,
             total: score.total,
             percentage: score.percentage
           };
        }
      }
    });

    setSubjectStats(subjStats);
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen w-full bg-background pt-20 pb-12 px-4 sm:px-6">
      <QuizNav />
      
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Dobro došli, {user.name}</h1>
          <p className="text-muted-foreground">Vaš dashboard za praćenje napretka i vežbanje.</p>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 sm:gap-6 mb-8"
        >
          <Card className="glass-panel border-white/10">
            <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-6 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground leading-tight">Pokušaji</CardTitle>
              <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-primary shrink-0" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-1 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-white">{stats.attempts}</div>
              <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">Ukupan broj rešenih testova</p>
            </CardContent>
          </Card>
          
          <Card className="glass-panel border-white/10">
            <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-6 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground leading-tight">Najbolji</CardTitle>
              <Award className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 shrink-0" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-1 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-white">{stats.bestPercentage}%</div>
              <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">Vaš lični rekord</p>
            </CardContent>
          </Card>
          
          <Card className="glass-panel border-white/10">
            <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-6 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground leading-tight">Poslednji</CardTitle>
              <Target className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 shrink-0" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-1 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-white">{stats.lastPercentage}%</div>
              <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">Procenat tačnosti na poslednjem testu</p>
            </CardContent>
          </Card>
        </motion.div>

        <h2 className="text-xl font-bold text-white mb-6">Rezultati po predmetima</h2>
        
        {/* Subject Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          {Object.entries(SUBJECT_LABELS).map(([key, label], index) => {
            const stat = subjectStats[key] || { correct: 0, total: 0, percentage: 0 };
            
            return (
              <Card key={key} className="glass-panel border-white/10 flex flex-col justify-between hover:border-primary/50 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg text-white">{label}</CardTitle>
                    <div className="text-xl font-bold text-primary">{stat.percentage}%</div>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    Najbolji rezultat: {stat.correct} od {stat.total || '?'} tačnih
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col justify-end">
                  <Progress value={stat.percentage} className="h-2 mb-6 bg-white/10" indicatorClassName="bg-primary" />
                  <Link href={`/quiz/${key}`}>
                    <Button variant="outline" className="w-full justify-between border-white/10 hover:bg-white/5 text-white">
                      Klikni za vežbanje ovog predmeta
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Global Quiz Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-panel border-primary/30 relative overflow-hidden bg-primary/5">
            <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[200%] rounded-full bg-primary/10 blur-[80px] pointer-events-none z-[-1]"></div>
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Kviz — sva pitanja
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Simulacija kompletnog maturskog ispita. Obuhvata pitanja iz svih 4 oblasti.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/quiz">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white glow-blue">
                  Počni kviz (sva pitanja)
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
