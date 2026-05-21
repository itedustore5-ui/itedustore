import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { QuizNav } from "@/components/QuizNav";
import { questions, Question, SUBJECT_LABELS } from "@/data/questions";
import { addScore } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Quiz() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const subjectFilter = params.subject;
  
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // Initialize quiz
  useEffect(() => {
    let filtered = questions;
    if (subjectFilter) {
      filtered = questions.filter(q => q.subject === subjectFilter);
      if (filtered.length === 0) {
        toast({ variant: "destructive", title: "Greška", description: "Predmet nije pronađen." });
        setLocation("/dashboard");
        return;
      }
    }
    
    // Shuffle questions
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    // Limit to 20 max for "all", or keep all for specific subject
    const limited = subjectFilter ? shuffled : shuffled.slice(0, 20);
    
    setQuizQuestions(limited);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsConfirmed(false);
    setScore(0);
    setIsFinished(false);
  }, [subjectFilter, setLocation, toast]);

  const handleConfirm = () => {
    if (selectedOption === null) return;
    
    setIsConfirmed(true);
    
    const currentQ = quizQuestions[currentIndex];
    const isCorrect = selectedOption === currentQ.answer;
    
    if (isCorrect) {
      setScore(prev => prev + currentQ.points);
    }
    
    // Automatically proceed after short delay
    setTimeout(() => {
      if (currentIndex < quizQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsConfirmed(false);
      } else {
        finishQuiz(score + (isCorrect ? currentQ.points : 0));
      }
    }, 1500);
  };
  
  const finishQuiz = (finalScore: number) => {
    setIsFinished(true);
    addScore(subjectFilter || 'all', finalScore, quizQuestions.length);
  };

  if (quizQuestions.length === 0) return null;

  if (isFinished) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const passed = percentage >= 60;
    
    return (
      <div className="min-h-screen w-full bg-background pt-24 pb-12 px-6 flex flex-col items-center justify-center">
        <QuizNav />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl glass-panel p-10 rounded-3xl text-center relative overflow-hidden"
        >
          <div className={`absolute top-0 left-0 right-0 h-2 ${passed ? 'bg-green-500' : 'bg-destructive'}`}></div>
          
          <div className="mb-8">
            {passed ? (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-500 mb-6">
                <Trophy className="h-10 w-10" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/20 text-destructive mb-6">
                <XCircle className="h-10 w-10" />
              </div>
            )}
            
            <h2 className="text-3xl font-bold text-white mb-2">
              {passed ? 'Čestitamo! Položili ste.' : 'Niste položili. Više sreće sledeći put.'}
            </h2>
            <p className="text-muted-foreground text-lg">
              Vaš rezultat za {subjectFilter ? SUBJECT_LABELS[subjectFilter as keyof typeof SUBJECT_LABELS] : 'sve oblasti'}
            </p>
          </div>
          
          <div className="text-6xl font-black text-white mb-4">{percentage}%</div>
          <div className="text-xl text-muted-foreground mb-10">
            {score} od {quizQuestions.length} tačnih odgovora
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white"
              onClick={() => window.location.reload()}
            >
              Pokušaj ponovo
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg h-14 px-8 rounded-xl border-white/20 hover:bg-white/5 text-white"
              onClick={() => setLocation("/dashboard")}
            >
              Nazad na dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentIndex];
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen w-full bg-background pt-20 pb-28 px-4 sm:px-6 flex flex-col">
      <QuizNav />
      
      <div className="container mx-auto max-w-3xl flex-1 flex flex-col">
        {/* Header & Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-3 font-medium">
            <span>Pitanje {currentIndex + 1} od {quizQuestions.length}</span>
            <span>{Math.round(progress)}% završeno</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/10" indicatorClassName="bg-primary" />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-muted-foreground">
                #{currentQ.id}
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
                {currentQ.subjectLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-muted-foreground">
                {currentQ.points} bod
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
              {currentQ.text}
            </h2>
            
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectAnswer = currentQ.answer === idx;
                
                let buttonClass = "w-full text-left p-3 sm:p-5 rounded-2xl border-2 transition-all flex items-center gap-3 group";
                
                if (!isConfirmed) {
                  buttonClass += isSelected 
                    ? " border-primary bg-primary/10 text-white" 
                    : " border-white/10 bg-white/5 text-muted-foreground hover:border-white/30 hover:bg-white/10";
                } else {
                  if (isCorrectAnswer) {
                    buttonClass += " border-green-500 bg-green-500/10 text-white";
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonClass += " border-destructive bg-destructive/10 text-white opacity-80";
                  } else {
                    buttonClass += " border-white/5 bg-transparent text-muted-foreground/50 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isConfirmed}
                    onClick={() => setSelectedOption(idx)}
                    className={buttonClass}
                    data-testid={`option-${idx}`}
                  >
                    <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold transition-colors ${
                      !isConfirmed && isSelected ? "border-primary bg-primary text-white" :
                      isConfirmed && isCorrectAnswer ? "border-green-500 bg-green-500 text-white" :
                      isConfirmed && isSelected && !isCorrectAnswer ? "border-destructive bg-destructive text-white" :
                      "border-muted-foreground/30 text-muted-foreground group-hover:border-muted-foreground/60"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-lg flex-1">{option}</span>
                    
                    {isConfirmed && isCorrectAnswer && (
                      <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                    )}
                    {isConfirmed && isSelected && !isCorrectAnswer && (
                      <XCircle className="h-6 w-6 text-destructive shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-5 glass-panel border-t border-white/10 bg-background/90 backdrop-blur-md">
        <div className="container mx-auto max-w-3xl flex items-center justify-between gap-3">
          <Button 
            variant="outline" 
            size="icon"
            className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-xl border-white/10 text-white hover:bg-white/10"
            onClick={() => setLocation("/dashboard")}
            disabled={isConfirmed}
            title="Nazad na dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <Button 
            size="lg"
            className={`flex-1 h-12 sm:h-14 rounded-xl text-base sm:text-lg font-bold transition-all ${
              selectedOption !== null && !isConfirmed 
                ? "bg-primary hover:bg-primary/90 text-white glow-blue" 
                : "bg-white/10 text-muted-foreground cursor-not-allowed"
            }`}
            onClick={handleConfirm}
            disabled={selectedOption === null || isConfirmed}
            data-testid="button-confirm"
          >
            {isConfirmed ? 'Sledeće...' : 'Potvrdi odgovor'}
          </Button>
          
          <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-xl border border-white/5 flex items-center justify-center text-muted-foreground/30">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
