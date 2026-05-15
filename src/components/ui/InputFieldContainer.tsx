import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren } from "react";

interface InputFieldContainerProps extends PropsWithChildren {
  label: string;
  htmlFor: string;
  error?: string;
}

export default function InputFieldContainer({
  label,
  htmlFor,
  error,
  children,
}: InputFieldContainerProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={htmlFor}
        className="text-sm text-text-primary leading-[150%] tracking-[-1%] md:text-lg"
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-xs italic text-red-500 font-medium text-right"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}


