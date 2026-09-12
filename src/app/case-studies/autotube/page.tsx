import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "AutoTube Case Study",
  description: "An AI-assisted desktop workflow for YouTube Shorts: 64 videos, 16,114 channel views, and 27 net subscribers in a one-month pilot.",
  alternates: { canonical: "/case-studies/autotube/" },
};

const examples = [
  ["Apple's New Siri AI", "1,541 views", "https://www.youtube.com/watch?v=h9ysOjB7v64"],
  ["Forbidden City Secrets", "1,323 views", "https://www.youtube.com/watch?v=GwK6FpS3tto"],
  ["ChatGPT and AI", "1,139 views", "https://www.youtube.com/watch?v=IgtK_7Hb8ug"],
] as const;

export default function AutoTubeCaseStudy() {
  return (
    <>
      <a className="skip-link" href="#case-study-content">Skip to case study</a>
      <div className="page-shell case-study-shell">
        <header className="site-header case-study-header">
          <Link aria-label="Akabir Abbas portfolio" className="wordmark" href="/" prefetch={false}>
            <span className="wordmark__text">AAs</span>
          </Link>
          <nav aria-label="Case study navigation" className="site-nav">
            <Link href="/#work" prefetch={false}>Portfolio</Link>
            <a href="#system">Overview</a><a href="#results">Results</a>
          </nav>
          <details className="mobile-nav">
            <summary>Menu</summary>
            <nav aria-label="Case study navigation" className="mobile-nav__panel">
              <Link href="/#work" prefetch={false}>Portfolio</Link>
              <a href="#system">Overview</a><a href="#results">Results</a>
            </nav>
          </details>
          <a className="header-link" href="https://github.com/akabirabbasnaqvi" rel="noreferrer" target="_blank">GitHub <ArrowUpRight className="icon" /></a>
        </header>
        <main className="case-study case-study--brief" id="case-study-content">
          <section className="case-hero" id="top">
            <div className="case-hero__copy">
              <p className="section-kicker">AI automation · Desktop application</p>
              <h1>AutoTube</h1>
              <p className="case-hero__dek">From a topic to a published YouTube Short, in one desktop workflow.</p>
              <p className="case-stack">Windows / Python / FFmpeg / YouTube API</p>
            </div>
          </section>
          <section className="brief-overview" id="system" aria-label="Project overview">
            <div><h2>The problem</h2><p>Creating Shorts meant switching between tools for research, scripts, voiceover, footage, captions, and publishing.</p></div>
            <div><h2>What I built</h2><p>A Windows application that connects those steps in one workflow, with automated video assembly, upload handling, and retries.</p></div>
            <div><h2>How it works</h2><p>Choose a topic. Generate a script and narration. Combine footage and captions with FFmpeg, then publish through YouTube.</p></div>
          </section>
          <section className="brief-results" id="results">
            <div className="brief-section-title"><h2>Tested on a real channel.</h2><p>August–September 2026 pilot</p></div>
            <div className="case-metrics" aria-label="Case study headline results">
              {[["64", "Shorts produced"], ["16,114", "Channel views"], ["42.97 h", "Watch time"], ["27", "Net subscribers"]].map(([value, label]) => (
                <div className="case-metric" key={label}><strong>{value}</strong><span>{label}</span></div>
              ))}
            </div>
            <p className="brief-note">Reported in the supplied case study and YouTube Analytics export. Pilot results, not a performance guarantee.</p>
            <div className="brief-examples">
              <h3>Watch the output</h3>
              {examples.map(([title, views, href]) => (
                <a href={href} key={title} rel="noreferrer" target="_blank"><span>{title}</span><span>{views} <ArrowUpRight className="icon" /></span></a>
              ))}
            </div>
          </section>
          <section className="brief-takeaway">
            <div><p className="section-kicker">What I learned</p><h2>Automation solves production.<br />Good content still drives results.</h2></div>
            <div><p>Six Shorts passed 1,000 views, but the median was 72. In this pilot, 25–34 second videos performed best. The next priorities are stronger opening hooks and a dedicated preview and approval step.</p>
              <a className="text-link" href="mailto:abbasakabir@gmail.com?subject=AutoTube%20case%20study">Discuss the project <ArrowUpRight className="icon" /></a>
            </div>
          </section>
        </main>
        <footer className="site-footer"><span>© {new Date().getFullYear()} Akabir Abbas</span><Link href="/" prefetch={false}>Return to portfolio</Link></footer>
      </div>
    </>
  );
}
