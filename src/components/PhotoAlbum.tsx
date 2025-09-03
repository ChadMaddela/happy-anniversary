import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import photos
import photo1 from '../assets/photo1.jpg';
import photo2 from '../assets/photo2.jpg';
import photo3 from '../assets/photo3.jpg';
import photo4 from '../assets/photo4.jpg';
import photo5 from '../assets/photo5.jpg';
import photo6 from '../assets/photo6.jpg';
import photo7 from '../assets/photo7.jpg';
import photo8 from '../assets/photo8.jpg';
import photo9 from '../assets/photo9.jpg';
import photo10 from '../assets/photo10.jpg';
import photo11 from '../assets/photo11.jpg';
import photo12 from '../assets/photo12.jpg';
import photo13 from '../assets/photo13.jpg';
import photo14 from '../assets/photo14.jpg';
import photo15 from '../assets/photo15.jpg';
import photo16 from '../assets/photo16.jpg';
import photo17 from '../assets/photo17.jpg';
import photo18 from '../assets/photo18.jpg';
import photo19 from '../assets/photo19.jpg';
import photo20 from '../assets/photo20.jpg';

interface Photo {
  id: number;
  src: string;
  title: string;
  description: string;
}

const photos: Photo[] = [
  {
    id: 1,
    src: photo1,
    title: "Over the years, with you I’ve grown,",
    description: "A love so deep I’ve never known."
  },
  {
    id: 2,
    src: photo2,
    title: "You lit my heart, you set me free,",
    description: "The happiest I’ll ever be."
  },
  {
    id: 3,
    src: photo3,
    title: "Through laughter loud and nights of tears,",
    description: "We conquered doubts, we silenced fears."
  },
  {
    id: 4,
    src: photo4,
    title: "Through trials harsh and skies of gray,",
    description: "Your hand in mine showed me the way."
  },
  {
    id: 5,
    src: photo5,
    title: "We climbed the heights, we braved the sea,",
    description: "You gave your soul, you gave all of me."
  },
  {
    id: 6,
    src: photo6,
    title: "In darkest storms, your light would shine,",
    description: "A guiding star that made you mine."
  },
  {
    id: 7,
    src: photo7,
    title: "When nights were dark and hopes grew small,",
    description: "You stood beside me through it all."
  },
  {
    id: 8,
    src: photo8,
    title: "I saw your smile in moments bleak,",
    description: "A gentle touch when I felt weak."
  },
  {
    id: 9,
    src: photo9,
    title: "Through every glance, through every while,",
    description: "I live to never lose your smile."
  },
  {
    id: 10,
    src: photo10,
    title: "Even when you doubt your grace,",
    description: "I see the beauty on your face."
  },
  {
    id: 11,
    src: photo11,
    title: "No mirror shows the truth I know,",
    description: "You’re the most radiant soul I’ll ever hold."
  },
  {
    id: 12,
    src: photo12,
    title: "Though roads were rough and skies turned gray,",
    description: "Our hearts found light to lead the way."
  },
  {
    id: 13,
    src: photo13,
    title: "We built a bond no storm could break,",
    description: "A vow we’ll never choose to fake."
  },
  {
    id: 14,
    src: photo14,
    title: "Through every shadow, every while,",
    description: "I crave the magic in your smile."
  },
  {
    id: 15,
    src: photo15,
    title: "Through every storm, through skies of blue,",
    description: "I find my strength when I’m with you."
  },
  {
    id: 16,
    src: photo16,
    title: "Side by side, we’ve walked this way,",
    description: "Through nights of dark and brightest day."
  },
  {
    id: 17,
    src: photo17,
    title: "Now two years more, our tale has grown,",
    description: "A garden from the seeds we’ve sown."
  },
  {
    id: 18,
    src: photo18,
    title: "With every sunrise, every song,",
    description: "I’ve craved your love my whole life long."
  },
  {
    id: 19,
    src: photo19,
    title: "And as our story still unfolds,",
    description: "Through silver years and days of gold,"
  },
  {
    id: 20,
    src: photo20,
    title: "I promise you, come what may,",
    description: "Forever with you I will stay."
  }
];

// 20 photos, 20 spreads (2 pages per spread)
const totalSpreads = photos.length; // 20 spreads

export const PhotoAlbum: React.FC = () => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

 const nextSpread = () => {
  if (currentSpread < totalSpreads && !isFlipping) {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentSpread(currentSpread + 1);
      setIsFlipping(false);
    }, 400);
  }
};

  const prevSpread = () => {
    if (currentSpread > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentSpread(currentSpread - 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  const renderCover = () => (
    <div className="flex h-full">
      {/* Left side - spine */}
      <div className="w-1/2 bg-gradient-book border-r-2 border-book-leather-dark flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-book-leather-dark/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-book-gold font-serif text-xl writing-mode-vertical transform rotate-180"
        >
          J ♡ C
        </motion.div>
      </div>
      {/* Right side - cover */}
      <div className="w-1/2 bg-gradient-book flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-book-leather-dark/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center z-10"
        >
          <h1 className="text-4xl font-serif text-book-gold mb-4">
            HAPPY 2nd ANNIVERSARY!
          </h1>
          <div className="w-24 h-px bg-book-gold mb-4" />
          <p className="text-book-gold/80 text-sm font-light">
            September 4, 2025
          </p>
        </motion.div>
        {/* Decorative corner elements */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-book-gold/40" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-book-gold/40" />
      </div>
    </div>
  );

  // Two pages per spread: left (title/desc), right (photo)
  const renderPhotoSpread = (spreadIndex: number) => {
    const photo = photos[spreadIndex];
    return (
      <div className="flex h-full">
        {/* Left page: title & description */}
        <div className="w-1/2 bg-gradient-paper border-r border-book-leather/20 p-8 flex flex-col justify-center">
          {photo ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col justify-center h-full"
            >
              <h2 className="text-2xl font-serif text-foreground mb-4 text-center">
                {photo.title}
              </h2>
              <div className="w-16 h-px bg-accent mx-auto mb-6" />
              <p className="text-muted-foreground text-center text-sm leading-relaxed">
                {photo.description}
              </p>
            </motion.div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground/50 text-center italic">
                ~ End of Collection ~
              </p>
            </div>
          )}
        </div>
        {/* Right page: photo, flips on navigation */}
        <div className="w-1/2 bg-gradient-paper p-8 flex items-center justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpread}
              initial={{ rotateY: isFlipping ? -90 : 0, opacity: isFlipping ? 0 : 1 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {photo ? (
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full max-w-sm max-h-80 object-cover rounded-lg shadow-2xl"
                />
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground/50 text-center italic">
                    ~ End of Collection ~
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-muted relative overflow-hidden">
      {/* Background photo reel */}
      <div className="absolute inset-0 w-full h-full">
        <div className="flex flex-wrap w-full h-full items-stretch">
          {[...photos, ...photos, ...photos].map((photo, index) => (
            <img
              key={index}
              src={photo.src}
              alt=""
              className="object-cover grayscale opacity-10 w-1/5 h-1/4"
              style={{ minWidth: '20%', minHeight: '25%' }}
            />
          ))}
        </div>
      </div>
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="relative">
          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSpread}
            disabled={currentSpread === 0 || isFlipping}
            className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 z-20 bg-card/80 hover:bg-card"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSpread}
            disabled={currentSpread === totalSpreads || isFlipping}
            className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-20 bg-card/80 hover:bg-card"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          {/* Book */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-[800px] h-[600px] relative"
          >
            {/* Book shadow */}
            <div className="absolute inset-0 bg-book-shadow/40 rounded-lg transform translate-x-2 translate-y-4 blur-xl" />
            {/* Book content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSpread}
                initial={{ opacity: isFlipping ? 0 : 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full bg-card border-2 border-book-leather rounded-lg overflow-hidden shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {currentSpread === 0 ? renderCover() : renderPhotoSpread(currentSpread - 1)}
              </motion.div>
            </AnimatePresence>
            {/* Page indicator */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: totalSpreads + 1 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSpread ? 'bg-accent' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};