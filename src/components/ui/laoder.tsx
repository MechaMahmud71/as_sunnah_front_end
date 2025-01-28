'use-client'
import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white rounded-2xl p-6 shadow-xl flex items-center justify-center"
      >
        <Loader2 className="animate-spin text-gray-600 w-8 h-8" />
      </motion.div>
    </div>
  );
};

export default LoadingModal;