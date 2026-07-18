"use client";

import { useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Maximize2, Sparkles } from "lucide-react";
import type { BuildProgress } from "./models";

interface PreviewPaneProps { prompt: string; progress: BuildProgress; }

type SiteRecipe = {
  name: string;
  tagline: string;
  palette: [string, string, string, string];
  font: string;
  layout: "editorial" | "shop" | "community" | "dashboard";
};

const recipes: SiteRecipe[] = [
  { name: "Moss Club", tagline: "a better little internet", palette: ["#173b36", "#e8f0d5", "#ee6f57", "#fffdf8"], font: "Georgia, serif", layout: "editorial" },
  { name: "Tiny Department", tagline: "important things, smaller", palette: ["#3d2d62", "#f7e8ff", "#ffbe0b", "#fffaff"], font: "Arial, sans-serif", layout: "shop" },
  { name: "Side Quest", tagline: "for people with a spare Tuesday", palette: ["#0f3557", "#dcefff", "#ff5d8f", "#f8fcff"], font: "Trebuchet MS, sans-serif", layout: "community" },
  { name: "Pigeon Systems", tagline: "software for the mildly determined", palette: ["#2f302b", "#ece9dc", "#83b735", "#fffef9"], font: "Courier New, monospace", layout: "dashboard" },
];

function hash(input: string) {
  return [...input].reduce((value, character) => ((value << 5) - value + character.charCodeAt(0)) | 0, 0);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

function siteDocument(prompt: string) {
  const recipe = recipes[Math.abs(hash(prompt)) % recipes.length];
  const [ink, soft, accent, paper] = recipe.palette;
  const idea = escapeHtml(prompt.length > 82 ? `${prompt.slice(0, 82)}…` : prompt);
  const cards = recipe.layout === "shop"
    ? ["Starter kit", "Overachiever pack", "One weird add-on"]
    : recipe.layout === "dashboard"
      ? ["Things in motion", "Tiny victories", "Very real metrics"]
      : ["Make a little noise", "Find your people", "Begin poorly"];

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${recipe.name}</title><style>
  :root{--ink:${ink};--soft:${soft};--accent:${accent};--paper:${paper}}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:${recipe.font};line-height:1.35}button{font:inherit;cursor:pointer}.shell{max-width:960px;margin:auto;padding:20px}nav{display:flex;justify-content:space-between;align-items:center;padding:6px 0 22px;border-bottom:1px solid color-mix(in srgb,var(--ink) 18%,transparent)}.brand{font-weight:800;letter-spacing:-.06em;font-size:21px}.links{display:flex;gap:16px;font-size:12px}.links a{color:inherit;text-decoration:none}.hero{padding:74px 0 55px;display:grid;gap:26px;${recipe.layout === "dashboard" ? "grid-template-columns:1.25fr .75fr;align-items:end" : ""}}.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:10px;opacity:.65}.hero h1{font-size:clamp(40px,8vw,84px);letter-spacing:-.075em;line-height:.88;margin:12px 0 18px;max-width:730px}.hero p{font-family:Arial,sans-serif;font-size:15px;max-width:480px;opacity:.72}.cta{border:0;border-radius:999px;background:var(--ink);color:var(--paper);padding:12px 18px;margin-top:12px;font-size:13px}.orb{width:min(210px,34vw);aspect-ratio:1;border-radius:${recipe.layout === "shop" ? "18px" : "50%"};background:var(--accent);justify-self:end;transform:rotate(8deg);box-shadow:18px 18px 0 var(--soft)}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:16px 0 70px}.card{min-height:164px;padding:18px;border:1px solid color-mix(in srgb,var(--ink) 18%,transparent);border-radius:14px;background:${recipe.layout === "community" ? "var(--soft)" : "transparent"};display:flex;flex-direction:column;justify-content:space-between}.card strong{font-size:17px;letter-spacing:-.04em}.card span{font-family:Arial,sans-serif;font-size:12px;opacity:.66}.metric{font-size:36px;font-weight:800;letter-spacing:-.08em}.toast{position:fixed;right:16px;bottom:16px;background:var(--ink);color:var(--paper);padding:10px 13px;border-radius:10px;font:12px Arial,sans-serif;opacity:0;transform:translateY(10px);transition:.2s}.toast.show{opacity:1;transform:none}@media(max-width:560px){.shell{padding:15px}.links{display:none}.hero{padding:48px 0 34px;grid-template-columns:1fr!important}.orb{display:none}.grid{grid-template-columns:1fr}.hero h1{font-size:50px}}</style></head><body><div class="shell"><nav><span class="brand">${recipe.name}</span><div class="links"><a href="#about">about</a><a href="#good">good stuff</a><a href="#join">join in</a></div><button class="cta" style="margin:0;padding:8px 12px" onclick="celebrate()">say hello</button></nav><main><section class="hero"><div><div class="eyebrow">${recipe.tagline}</div><h1>${idea}</h1><p>We took a wildly specific idea and gave it a calm, unexpectedly competent home on the internet.</p><button class="cta" id="join" onclick="celebrate()">I’m intrigued →</button></div><div class="orb" aria-hidden="true"></div></section><section class="grid" id="good">${cards.map((card, index) => `<article class="card"><strong>${card}</strong>${recipe.layout === "dashboard" ? `<div class="metric">${["24", "98%", "∞"][index]}</div>` : `<span>${["A useful thing with a silly name.", "Made for the very particular crowd.", "No password required. Probably."][index]}</span>`}<button class="cta" style="align-self:flex-start;padding:8px 12px" onclick="celebrate()">open</button></article>`).join("")}</section><section id="about" style="padding-bottom:90px;max-width:570px"><div class="eyebrow">The fine print</div><h2 style="font-size:32px;letter-spacing:-.06em;margin:8px 0">Built for the idea nobody asked for.</h2><p style="font-family:Arial,sans-serif;opacity:.7">It’s playful, a little overconfident, and completely ready for a demo. Scroll around. Press things. It’s a real tiny site.</p></section></main></div><div class="toast" id="toast">Excellent choice. We have notified the tiny team.</div><script>function celebrate(){const toast=document.getElementById('toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}</script></body></html>`;
}

export function PreviewPane({ prompt, progress }: PreviewPaneProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const documentSource = useMemo(() => siteDocument(prompt), [prompt]);
  const isReady = progress.percent >= 18 || progress.isComplete;

  function openInNewTab() {
    const url = URL.createObjectURL(new Blob([documentSource], { type: "text/html" }));
    const tab = window.open(url, "_blank");
    if (tab) tab.opener = null;
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  function enterFullscreen() {
    iframeRef.current?.requestFullscreen?.();
  }

  return <div className="bg-[#20221f] p-3 sm:p-4">
    <div className="flex items-center gap-1.5 rounded-t-lg bg-[#30342f] px-3 py-2"><span className="h-2 w-2 rounded-full bg-[#d86868]" /><span className="h-2 w-2 rounded-full bg-[#d7aa43]" /><span className="h-2 w-2 rounded-full bg-[#74ae7a]" /><div className="ml-2 flex-1 truncate text-[10px] text-white/55">preview.prompt-olympics.test</div>{isReady && <div className="flex gap-1"><button type="button" onClick={enterFullscreen} aria-label="Open preview fullscreen" className="rounded p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"><Maximize2 size={15} /></button><button type="button" onClick={openInNewTab} aria-label="Open preview in new tab" className="rounded p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"><ExternalLink size={15} /></button></div>}</div>
    <div className="relative h-[500px] overflow-hidden rounded-b-lg bg-white sm:h-[570px]">
      <AnimatePresence mode="wait">{isReady ? <motion.iframe key="app" ref={iframeRef} title="Interactive generated website preview" srcDoc={documentSource} sandbox="allow-scripts allow-forms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full border-0" /> : <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col items-center justify-center bg-[#faf8f0] p-8 text-center"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }} className="grid h-14 w-14 place-items-center rounded-full bg-[#e7ddaa]"><Sparkles size={24} /></motion.div><h3 className="mt-5 text-lg font-medium">Making the little website…</h3><p className="mt-2 max-w-56 text-sm leading-5 text-black/55">The team is picking a personality, then pretending it was deliberate.</p><div className="mt-6 h-1.5 w-full max-w-56 overflow-hidden rounded-full bg-black/10"><motion.div className="h-full rounded-full bg-[#4d9c75]" animate={{ width: `${Math.max(8, progress.percent * 4.5)}%` }} /></div></motion.div>}</AnimatePresence>
    </div>
  </div>;
}
