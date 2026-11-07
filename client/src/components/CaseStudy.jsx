import { caseStudy, isPlaceholder } from '../content.js'
import Icon from './Icon.jsx'
import { Button, Eyebrow, Placeholder, Section, Tag } from './ui.jsx'

function Block({ label, children }) {
  return (
    <div className="reveal">
      <h3 className="mb-2 text-xs font-light uppercase tracking-[0.3em] text-accent">{label}</h3>
      <div className="text-muted">{children}</div>
    </div>
  )
}

export default function CaseStudy() {
  const { title, problem, solution, tech, result, screenshots, video } = caseStudy
  return (
    <Section id="case-study">
      <Eyebrow>Featured case study</Eyebrow>
      <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-[2.6rem]">{title}</h2>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.25fr]">
        <div className="space-y-8">
          <Block label="Problem">{problem}</Block>
          <Block label="Solution">{solution}</Block>
          <Block label="Tech">
            <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
              {tech.map((t) => (
                <li key={t}><Tag>{t}</Tag></li>
              ))}
            </ul>
          </Block>
          <div className="reveal rounded-2xl border border-accent/40 bg-accent-strong/10 p-5">
            <h3 className="mb-1 flex items-center gap-2 font-semibold text-fg">
              <Icon name="check" className="h-5 w-5 text-accent" /> Result
            </h3>
            <p className="text-muted">{result}</p>
          </div>
          <Button href="#contact" icon="arrow" className="reveal">Get a system like this</Button>
        </div>

        <div className="space-y-4">
          {isPlaceholder(video) ? (
            <Placeholder label="Walkthrough video" icon="play" className="reveal aspect-video" />
          ) : (
            <div className="reveal aspect-video overflow-hidden rounded-2xl border border-line">
              <iframe
                src={video}
                title={`${title}: walkthrough video`}
                className="h-full w-full"
                loading="lazy"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            {screenshots.map((shot, i) =>
              isPlaceholder(shot?.src) ? (
                <Placeholder key={i} label={`Screenshot ${i + 1}`} className="reveal aspect-[8/5] !p-3" />
              ) : (
                <figure key={shot.src} className="reveal">
                  <a
                    href={shot.src}
                    target="_blank"
                    rel="noopener"
                    aria-label={`Open full-size screenshot: ${shot.caption}`}
                    className="group block overflow-hidden rounded-xl border border-line"
                  >
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width="2000"
                      height="1250"
                      loading="lazy"
                      className="aspect-[8/5] w-full object-cover object-left-top transition duration-500 group-hover:scale-[1.03]"
                    />
                  </a>
                  <figcaption className="mt-2 text-sm text-muted">{shot.caption}</figcaption>
                </figure>
              ),
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
