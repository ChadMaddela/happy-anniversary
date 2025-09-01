import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import photos
import photo1 from '@/assets/photo1.jpg';
import photo2 from '@/assets/photo2.jpg';
import photo3 from '@/assets/photo3.jpg';
import photo4 from '@/assets/photo4.jpg';
import photo5 from '@/assets/photo5.jpg';
import photo6 from '@/assets/photo6.jpg';

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
    title: "Mountain Serenity",
    description: "Golden hour reflections at pristine alpine lake"
  },
  {
    id: 2,
    src: photo2,
    title: "Parisian Charm",
    description: "Evening warmth at a classic sidewalk café"
  },
  {
    id: 3,
    src: photo3,
    title: "Enchanted Forest",
    description: "Ancient pathways through mystical woodlands"
  },
  {
    id: 4,
    src: photo4,
    title: "Coastal Drama",
    description: "Sunset fire over rugged ocean cliffs"
  },
  {
    id: 5,
    src: photo5,
    title: "Literary Haven",
    description: "Timeless wisdom in leather-bound collections"
  },
  {
    id: 6,
    src: photo6,
    title: "Zen Garden",
    description: "Cherry blossoms and peaceful contemplation"
  }
];

export const PhotoAlbum: React.FC = () => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // Calculate total spreads (cover + photo spreads)
  const totalSpreads = Math.ceil(photos.length / 2) + 1; // +1 for cover

  const nextSpread = () => {
    if (currentSpread < totalSpreads - 1 && !isFlipping) {
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
          MEMORIES
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
            Private Collection
          </h1>
          <div className="w-24 h-px bg-book-gold mb-4" />
          <p className="text-book-gold/80 text-sm font-light">
            A curated journey through moments
          </p>
        </motion.div>
        
        {/* Decorative corner elements */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-book-gold/40" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-book-gold/40" />
      </div>
    </div>
  );

  const renderPhotoSpread = (spreadIndex: number) => {
    const leftPhotoIndex = (spreadIndex - 1) * 2;
    const rightPhotoIndex = leftPhotoIndex + 1;
    const leftPhoto = photos[leftPhotoIndex];
    const rightPhoto = photos[rightPhotoIndex];

    return (
      <div className="flex h-full">
        {/* Left page */}
        <div className="w-1/2 bg-gradient-paper border-r border-book-leather/20 p-8 flex flex-col">
          {leftPhoto ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 flex flex-col justify-center"
              >
                <h2 className="text-2xl font-serif text-foreground mb-4 text-center">
                  {leftPhoto.title}
                </h2>
                <div className="w-16 h-px bg-accent mx-auto mb-6" />
                <p className="text-muted-foreground text-center text-sm leading-relaxed">
                  {leftPhoto.description}
                </p>
              </motion.div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground/50 text-center italic">
                ~ End of Collection ~
              </p>
            </div>
          )}
        </div>

        {/* Right page */}
        <div className="w-1/2 bg-gradient-paper p-8 flex items-center justify-center">
          {rightPhoto ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full h-full max-w-sm max-h-80 relative"
            >
              <img
                src={rightPhoto.src}
                alt={rightPhoto.title}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-book-shadow/20 rounded-lg -z-10" />
            </motion.div>
          ) : (
            leftPhoto && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full h-full max-w-sm max-h-80 relative"
              >
                <img
                  src={leftPhoto.src}
                  alt={leftPhoto.title}
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-book-shadow/20 rounded-lg -z-10" />
              </motion.div>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-muted relative overflow-hidden">
      {/* Background photo reel */}
      <div className="absolute inset-0 opacity-10">
        <div className="flex animate-scroll-reel">
          {[...photos, ...photos, ...photos].map((photo, index) => (
            <img
              key={index}
              src={photo.src}
              alt=""
              className="w-64 h-40 object-cover flex-shrink-0 grayscale"
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
            disabled={currentSpread === totalSpreads - 1 || isFlipping}
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
                initial={{ rotateY: isFlipping ? -90 : 0, opacity: isFlipping ? 0 : 1 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full bg-card border-2 border-book-leather rounded-lg overflow-hidden shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {currentSpread === 0 ? renderCover() : renderPhotoSpread(currentSpread)}
              </motion.div>
            </AnimatePresence>

            {/* Page indicator */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Array.from({ length: totalSpreads }).map((_, index) => (
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