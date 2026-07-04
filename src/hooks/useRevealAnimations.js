import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export function useRevealAnimations(key) {
  useEffect(() => {
    const context = gsap.context(() => {
      document.querySelectorAll('[data-split]').forEach((element) => {
        const split = new SplitType(element, { types: 'words, chars' })
        gsap.from(split.chars, {
          yPercent: 110,
          opacity: 0,
          rotateX: -35,
          stagger: 0.015,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
          },
        })
      })

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 42, opacity: 0, filter: 'blur(14px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
            },
          },
        )
      })

      gsap.utils.toArray('[data-stagger]').forEach((group) => {
        gsap.fromTo(
          group.children,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 86%',
            },
          },
        )
      })
    })

    return () => context.revert()
  }, [key])
}
