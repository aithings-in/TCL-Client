"use client";

import { AnimatePresence } from "framer-motion";
import RegisterPage from "@/pages/RegisterPage";

export default function Register() {
  return (
    <AnimatePresence mode="wait">
      <RegisterPage />
    </AnimatePresence>
  );
}
