import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quiz } from '@/components/Quiz';
import { PhotoAlbum } from '@/components/PhotoAlbum';

const Index = () => {
  const [showAlbum, setShowAlbum] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const handleQuizComplete = (passed: boolean) => {
    setQuizPassed(passed);
    if (passed) {
      setTimeout(() => setShowAlbum(true), 1000);
    } else {
      // Reset quiz after 3 seconds if failed
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  if (showAlbum) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <PhotoAlbum />
      </motion.div>
    );
  }

  return <Quiz onComplete={handleQuizComplete} />;
};

export default Index;
