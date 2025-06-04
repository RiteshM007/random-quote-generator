import React from 'react';
import { motion } from 'framer-motion';

const floatingQuotes = [
  "Dream big",
  "Stay curious",
  "Be kind",
  "Create",
  "Inspire",
  "Believe",
  "Grow",
  "Learn",
  "Explore",
  "Imagine"
];

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, #4f46e5 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, #4f46e5 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, #4f46e5 0%, transparent 50%)',
            'radial-gradient(circle at 0% 100%, #4f46e5 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, #4f46e5 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Secondary gradient layer */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, #7c3aed 0%, transparent 70%)',
            'radial-gradient(circle at 30% 70%, #7c3aed 0%, transparent 70%)',
            'radial-gradient(circle at 70% 30%, #7c3aed 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, #7c3aed 0%, transparent 70%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Main rotating circles */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] border border-white/5 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] border border-white/5 rounded-full"
        animate={{
          rotate: -360,
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          rotate: {
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      {/* Additional decorative circles */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full"
          style={{
            width: `${60 + i * 10}vmin`,
            height: `${60 + i * 10}vmin`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: {
              duration: 30 + i * 5,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      ))}

      {/* Floating particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Glowing orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating quotes */}
      {floatingQuotes.map((quote, index) => {
        const angle = (index * 360) / floatingQuotes.length;
        const radius = 35; // vmin units
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={quote}
            className="absolute top-1/2 left-1/2 text-white/10 text-sm md:text-base font-light"
            style={{
              transform: `translate(-50%, -50%) translate(${x}vmin, ${y}vmin)`,
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + index * 2,
              repeat: Infinity,
              ease: "linear",
              opacity: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              },
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {quote}
          </motion.div>
        );
      })}

      {/* Additional floating quotes with different radius */}
      {floatingQuotes.map((quote, index) => {
        const angle = (index * 360) / floatingQuotes.length;
        const radius = 25; // vmin units
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={`inner-${quote}`}
            className="absolute top-1/2 left-1/2 text-white/10 text-sm md:text-base font-light"
            style={{
              transform: `translate(-50%, -50%) translate(${x}vmin, ${y}vmin)`,
            }}
            animate={{
              rotate: [360, 0],
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + index * 2,
              repeat: Infinity,
              ease: "linear",
              opacity: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              },
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {quote}
          </motion.div>
        );
      })}

      {/* Animated lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground; 