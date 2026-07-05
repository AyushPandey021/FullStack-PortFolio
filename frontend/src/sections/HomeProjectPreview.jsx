import { HiArrowRight } from "react-icons/hi2";
import { projects } from "../data/portfolio.js";
import SectionHeader from "../components/SectionHeader.jsx";
import MagneticButton from "../components/MagneticButton.jsx";

export default function HomeProjectPreview() {
  const featured = projects.slice(0, 3);

  return (
    <section className="section-pad home-project-preview" id="projects">
      <div className="container">
        <div className="preview-heading">
          <SectionHeader
            eyebrow="Featured Projects"
            title="A quick look before the full project room."
            copy="Three signature builds on the homepage, with the complete project showcase moved to its own dedicated page."
          />
          <MagneticButton href="/projects" variant="secondary">
            Open Projects
            <HiArrowRight />
          </MagneticButton>
        </div>
        <div className="preview-project-grid" data-stagger>
          {featured.map((project, index) => (
            <a
              className="preview-project-card tilt-card"
              href="/projects"
              key={project.title}
            >
              <div
                className={`preview-project-image bg-gradient-to-br ${project.tone}`}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
              </div>
              <div>
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
