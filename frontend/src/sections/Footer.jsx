import { HiArrowUp } from 'react-icons/hi2'
import { navItems, socials } from '../data/portfolio.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <a href="#home" className="brand">
            <span>AP</span>
            <strong>Ayush Pandey</strong>
          </a>
          <p>Full Stack Developer building premium MERN, Python, and AI product experiences.</p>
        </div>
        <nav>
          {navItems.slice(0, 6).map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="footer-socials">
          {socials.map(([name, Icon, href]) => (
            <a key={name} href={href} aria-label={name}>
              <Icon />
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom container">
        <span>Copyright 2026 Ayush Pandey. All rights reserved.</span>
        <a href="#home" aria-label="Back to top">
          <HiArrowUp />
        </a>
      </div>
    </footer>
  )
}
