"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { AgentMessage, AgentRole, AgentRun } from "../agents/types";

const roleStyles: Record<AgentRole, { emoji: string; color: string }> = {
  Planner: { emoji: "🧠", color: "bg-[#e9e3ff]" }, Designer: { emoji: "🎨", color: "bg-[#ffe1ee]" }, Frontend: { emoji: "🧩", color: "bg-[#dbf9ef]" }, Backend: { emoji: "⚙️", color: "bg-[#fff0b5]" }, QA: { emoji: "🔎", color: "bg-[#dceaff]" }, Judge: { emoji: "🏅", color: "bg-[#ffe0bd]" },
};

export function AgentFeed({ run }: { run: AgentRun }) {
  const [messages, setMessages] = useState<AgentMessage[]>(() => run.getSnapshot().messages);
  const [isComplete, setIsComplete] = useState(() => run.getSnapshot().progress.isComplete);

  useEffect(() => {
    setMessages(run.getSnapshot().messages);
    setIsComplete(run.getSnapshot().progress.isComplete);
    return run.subscribe((event) => {
      if (event.type === "message") setMessages(run.getSnapshot().messages);
      if (event.type === "progress") setIsComplete(event.payload.isComplete);
    });
  }, [run]);

  return <div className="max-h-[510px] min-h-[360px] space-y-3 overflow-y-auto p-4 [scrollbar-width:thin]">
    <AnimatePresence initial={false}>
      {messages.map((message) => <FeedMessage key={message.id} message={message} />)}
    </AnimatePresence>
    <div className="flex items-center gap-2 px-2 pt-1 text-xs text-[#777186]"><span className={`h-2 w-2 rounded-full ${isComplete ? "bg-[#4d9c75]" : "animate-pulse bg-[#e36883]"}`} /> {isComplete ? "Build complete. The agents have left the arena." : "Agents are typing theatrically…"}</div>
  </div>;
}

function FeedMessage({ message }: { message: AgentMessage }) {
  const style = roleStyles[message.role];
  return <motion.article layout initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: -12 }} className="flex gap-3 rounded-2xl border-2 border-[#16132b]/10 bg-[#fffdfb] p-3">
    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border-2 border-[#16132b] text-base ${style.color}`}>{style.emoji}</span>
    <div className="min-w-0"><div className="flex items-baseline gap-2"><h3 className="text-sm font-black">{message.role}</h3><time className="text-[10px] font-bold text-[#898397]">{message.timestamp}</time></div><p className="mt-0.5 text-sm font-medium leading-5 text-[#585267]">{message.text}</p></div>
  </motion.article>;
}
