// components/ValidationSummaryPanel.tsx
// import { Card, CardContent } from "../components/ui/card";
// import { AlertTriangle } from "lucide-react";
// import type { FormErrors } from "../models/errors";
// import { AnimatePresence, motion } from "framer-motion";

// interface ValidationSummaryPanelProps {
//   errors: FormErrors;
//   title?: string;
// }

// export default function ValidationSummaryPanel({
//   errors,
//   title = "Please fix the following errors:",
// }: ValidationSummaryPanelProps) {
//   const errorEntries = Object.entries(errors) as [string, string | undefined][];
//   const filteredErrors = errorEntries.filter(([, msg]) => Boolean(msg));

//   if (errorEntries.length === 0) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.4 }}
//       >
//         <Card className="border-red-300 bg-red-50 shadow-md rounded-2xl mb-6">
//           <CardContent className="p-4">
//             <div className="flex items-center mb-2">
//               <AlertTriangle className="text-red-600 w-5 h-5 mr-2" />
//               <h3 className="text-red-700 font-semibold">{title}</h3>
//             </div>

//             {/* wrap ul in a div for accessibility */}
//             <div role="alert" aria-live="assertive">
//               <ul className="list-disc list-inside space-y-1 text-red-600 text-sm">
//                 {filteredErrors.map(([field, message]) => (
//                   <li key={field}>{message}</li>
//                 ))}
//               </ul>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// components/ValidationSummaryPanel.tsx
import { Card, CardContent } from "../components/ui/card";
import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FormErrors } from "../models/errors";

interface ValidationSummaryPanelProps {
  errors: FormErrors;
  title?: string;
  variant?: "error" | "warning" | "success";
}

export default function ValidationSummaryPanel({
  errors,
  title = "Please fix the following errors:",
  variant = "error",
}: ValidationSummaryPanelProps) {
  // Convert errors into typed entries
  const errorEntries = Object.entries(errors) as [string, string | undefined][];
  const filteredErrors = errorEntries.filter(([, msg]) => Boolean(msg));

  if (filteredErrors.length === 0) return null;

  // Variant styles (reusable for warning/success in future)
  const variantStyles = {
    error: {
      border: "border-red-300",
      bg: "bg-red-50",
      text: "text-red-600",
      title: "text-red-700",
      icon: "text-red-600",
    },
    warning: {
      border: "border-yellow-300",
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      title: "text-yellow-700",
      icon: "text-yellow-600",
    },
    success: {
      border: "border-green-300",
      bg: "bg-green-50",
      text: "text-green-600",
      title: "text-green-700",
      icon: "text-green-600",
    },
  }[variant];

  return (
    <AnimatePresence>
      <motion.div
        key="validation-panel"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Card
          className={`${variantStyles.border} ${variantStyles.bg} shadow-md rounded-2xl mb-6`}
        >
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              <AlertTriangle className={`${variantStyles.icon} w-5 h-5 mr-2`} />
              <h3 className={`${variantStyles.title} font-semibold`}>
                {title}
              </h3>
            </div>
            <div role="alert" aria-live="assertive">
              <ul
                className={`list-disc list-inside space-y-1 ${variantStyles.text} text-sm`}
              >
                {filteredErrors.map(([field, message]) => (
                  <li key={field}>{message}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
