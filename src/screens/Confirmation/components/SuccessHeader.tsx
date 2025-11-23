import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { successCircleVariants, successCheckmarkVariants, slideUpVariants } from '@/config/animations';

export function SuccessHeader() {
  return (
    <div className="flex flex-col items-center text-center mb-6">
      <div className="mb-6">
        <motion.div
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
          variants={successCircleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={successCheckmarkVariants}
            initial="hidden"
            animate="visible"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
        </motion.div>
      </div>

      <motion.h1
        className="text-gray-900 mb-2"
        variants={slideUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        Reserva Confirmada!
      </motion.h1>
      <motion.p
        className="text-gray-500"
        variants={slideUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        A sua reserva foi confirmada com sucesso
      </motion.p>
    </div>
  );
}
