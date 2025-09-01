import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizQuestion {
  id: number;
  question: string;
  options: [string, string];
  correct: 0 | 1;
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the most abundant gas in Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen"],
    correct: 1
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus"],
    correct: 0
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale"],
    correct: 1
  },
  {
    id: 4,
    question: "In which year did the Berlin Wall fall?",
    options: ["1989", "1991"],
    correct: 0
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Au"],
    correct: 1
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
                    Perfect score! The photo album awaits...
                  </p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">📚</div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Study More!
                  </h2>
                  <p className="text-muted-foreground">
                    You need all answers correct to proceed.
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
                  Choose the correct answer
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