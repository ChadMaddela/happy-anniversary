import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizQuestion {
  id: number;
  question: string;
  options: [string, string];
  correct: 0 | 1;
  description: string;
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is my nickname",
    options: ["Baby Love", "Baby mo"],
    correct: 0,
    description: "Sana alam mo to :( !"
  },
  {
    id: 2,
    question: "Where did we first met?",
    options: ["ADF", "Somewhere down the road"],
    correct: 0,
    description: "Saan nga ba?"
  },
  {
    id: 3,
    question: "When did we first met?",
    options: ["August 21", "September 4"],
    correct: 1,
    description: "Kapag eto talaga mali"
  },
  {
    id: 4,
    question: "First kiss",
    options: ["Hardin", "Mt. Ulap"],
    correct: 1,
    description: "Nako po feeling ko malilito"
  },
  {
    id: 5,
    question: "How much do you Love me?",
    options: ["Humigit kumulang di mabilang", "Kulangot sa pader"],
    correct: 0,
    description: "Yung totoo!"
  }
];

interface QuizProps {
  onComplete: (passed: boolean) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(0 | 1)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<0 | 1 | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAnswer = (answerIndex: 0 | 1) => {
    setSelectedAnswer(answerIndex);
    
    setTimeout(() => {
      const newAnswers = [...answers, answerIndex];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Check if all answers are correct
        const allCorrect = newAnswers.every((answer, index) => 
          answer === questions[index].correct
        );
        setShowResult(true);
        
        // Play music if all correct
        if (allCorrect && audioRef.current) {
          audioRef.current.play().catch(console.error);
        }
        
        setTimeout(() => onComplete(allCorrect), 2000);
      }
    }, 800);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const allCorrect = answers.every((answer, index) => 
      answer === questions[index].correct
    );

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center bg-background p-4"
      >
        <Card className="w-full max-w-md text-center bg-card border-border shadow-xl">
          <CardContent className="pt-8 pb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {allCorrect ? (
                <>
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Congratulations!
                  </h2>
                  <p className="text-muted-foreground">
                    I love you ˵˘ ³˘˵
                  </p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">📚</div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Di mo na ko love T.T
                  </h2>
                  <p className="text-muted-foreground">
                    Hmp!
                  </p>
                </>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-background p-4"
    >
      {/* Audio element - Add your music file to public folder */}
      <audio 
        ref={audioRef} 
        preload="auto"
        autoPlay
        loop
      >
        <source src="/public/music.mp3" type="audio/mpeg" />
        {/* Add your music file here - replace with path to your Ben&Ben song */}
      </audio>
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className="bg-accent h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-card border-border shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {currentQ.question}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {currentQ.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={selectedAnswer === index ? "default" : "secondary"}
                      className="w-full p-6 text-lg justify-start h-auto"
                      onClick={() => handleAnswer(index as 0 | 1)}
                      disabled={selectedAnswer !== null}
                    >
                      <span className="w-8 h-8 rounded-full border-2 border-current mr-4 flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};