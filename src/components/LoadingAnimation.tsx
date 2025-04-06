import { motion } from "framer-motion";
import { Code } from "lucide-react";

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      >
        <Code className="w-10 h-10 text-pink-500" />
      </motion.div>

      <motion.p
        className="mt-2 text-gray-600 text-sm font-medium"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        Analyzing code...
      </motion.p>
    </div>
  );
};

export default LoadingAnimation;
