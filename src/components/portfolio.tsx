import { ArrowUpRight, Mark } from "@/components/icons";
import { featuredProjects, projects, type Project } from "@/content/projects";

const githubProfile = "https://github.com/akabirabbasnaqvi";
const linkedInProfile = "https://www.linkedin.com/in/akabir-abbas/";

function ProjectLink({ project }: Readonly<{ project: Project }>) {
  if (project.visibility === "private") {
    return <span className="project-access">Private case study</span>;
  }

  return (
    <a aria-label={`Open ${project.title} on GitHub`} className="project-access project-access--link" href={project.repository} rel="noreferrer" target="_blank">
      Repository <ArrowUpRight className="icon" />
    </a>
  );
}

function ProjectTags({ project }: Readonly<{ project: Project }>) {
  return (
    <ul aria-label={`Technologies used in ${project.title}`} className="tag-list">
      {project.technologies.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  );
}

function SignalMap() {
  return (
    <div aria-hidden="true" className="signal-map-shell">
      <div className="signal-map">
        <div className="signal-map__axis signal-map__axis--x" />
        <div className="signal-map__axis signal-map__axis--y" />
        <div className="signal-map__ring signal-map__ring--one" />
        <div className="signal-map__ring signal-map__ring--two" />
        <div className="signal-map__path" />
        {projects.map((project, index) => (
          <span
            className={`signal-map__point signal-map__point--${index + 1}`}
            key={project.id}
            style={{ "--project-tone": project.tone } as React.CSSProperties}
          >
            <span>{project.id}</span>
          </span>
        ))}
        <span className="signal-map__note">12 active projects</span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a aria-label="Akabir Abbas - back to top" className="wordmark" href="#top">
        <Mark className="wordmark__mark" />
        <span>SAAN</span>
      </a>
      <nav aria-label="Primary navigation" className="site-nav">
        <a href="#work">Work</a>
        <a href="#approach">Approach</a>
        <a href="#contact">Contact</a>
      </nav>
      <details className="mobile-nav">
        <summary>Menu</summary>
        <nav aria-label="Primary navigation" className="mobile-nav__panel">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>
      </details>
      <a className="header-link" href={githubProfile} rel="noreferrer" target="_blank">
        GitHub <ArrowUpRight className="icon" />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <h1>
          <span className="hero__name">Akabir Abbas</span>
          <span className="hero__role">AI &amp; Software Engineer</span>
        </h1>
        <p className="hero__lede">I build pragmatic AI, data, and web systems for complex operational work.</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#work">
            View work <ArrowUpRight className="icon" />
          </a>
          <a className="text-link" href="#approach">
            Engineering approach <ArrowUpRight className="icon" />
          </a>
        </div>
      </div>
      <SignalMap />
      <div aria-label="Portfolio evidence" className="hero__proof">
        <span>12 verified projects</span>
        <span>Public and confidential work</span>
      </div>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section className="section section--work" id="work">
      <div className="section-heading">
        <h2>Selected systems built for daily use.</h2>
        <p>Four projects that show practical engineering across operations, machine learning, and product software.</p>
      </div>
      <div className="featured-grid">
        {featuredProjects.map((project, index) => (
          <article className={`featured-project featured-project--${index + 1}`} key={project.id} style={{ "--project-tone": project.tone } as React.CSSProperties}>
            <div className="featured-project__topline">
              <span>{project.id}</span>
              <span>{project.category}</span>
            </div>
            <div className="featured-project__body">
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </div>
            <div className="featured-project__bottom">
              <ProjectTags project={project} />
              <ProjectLink project={project} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectIndex() {
  return (
    <section aria-labelledby="project-index-heading" className="section project-index">
      <div className="section-heading section-heading--index">
        <h2 id="project-index-heading">A working index of real software.</h2>
        <p>Private work is intentionally described at a high level and never links to a restricted repository.</p>
      </div>
      <ol className="project-list">
        {projects.map((project) => (
          <li className="project-row" key={project.id} style={{ "--project-tone": project.tone } as React.CSSProperties}>
            <span aria-hidden="true" className="project-row__number">{project.id}</span>
            <div className="project-row__main">
              <div className="project-row__titleline">
                <h3>{project.title}</h3>
                <span>{project.category}</span>
              </div>
              <p>{project.detail}</p>
            </div>
            <div className="project-row__meta">
              <ProjectTags project={project} />
              <ProjectLink project={project} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Approach() {
  return (
    <section className="section approach" id="approach">
      <div className="approach__intro">
        <p className="section-kicker">How I work</p>
        <h2>From a real workflow to a dependable system.</h2>
        <p>I focus on the signal a person needs, then choose the smallest capable system that can deliver it.</p>
      </div>
      <div className="principle-list">
        <article>
          <span>Discover</span>
          <h3>Start with the real workflow.</h3>
          <p>Operations, reporting, assessment, and monitoring are designed around the actual decisions people need to make.</p>
        </article>
        <article>
          <span>Engineer</span>
          <h3>Choose the smallest capable stack.</h3>
          <p>From offline SQLite apps to queue-backed services, the architecture fits the environment rather than chasing novelty.</p>
        </article>
        <article>
          <span>Clarify</span>
          <h3>Make the important state visible.</h3>
          <p>Good interfaces surface priorities, drift, stock, deadlines, and report-ready outcomes before users need to ask.</p>
        </article>
      </div>
      <div className="capability-strip" role="list">
        <span role="listitem">Product systems</span>
        <span role="listitem">AI &amp; machine learning</span>
        <span role="listitem">Data workflows</span>
        <span role="listitem">Desktop software</span>
        <span role="listitem">Web engineering</span>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div>
        <p className="section-kicker">Let&apos;s connect</p>
        <h2>Build the next useful system.</h2>
      </div>
      <div className="contact-links">
        <a className="contact-link" href={linkedInProfile} rel="noreferrer" target="_blank">
          <span>Connect on LinkedIn</span>
          <ArrowUpRight className="contact-link__icon" />
        </a>
        <a className="contact-link" href={githubProfile} rel="noreferrer" target="_blank">
          <span>Find me on GitHub</span>
          <ArrowUpRight className="contact-link__icon" />
        </a>
      </div>
    </section>
  );
}

export function Portfolio() {
  return (
    <>
      <a className="skip-link" href="#work">Skip to project index</a>
      <div className="page-shell">
        <Header />
        <main>
          <Hero />
          <FeaturedWork />
          <ProjectIndex />
          <Approach />
          <Contact />
        </main>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Akabir Abbas</span>
          <span>AI and software engineering</span>
        </footer>
      </div>
    </>
  );
}
