import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const geometry = new THREE.IcosahedronGeometry(1.7, 2)
    const material = new THREE.MeshStandardMaterial({
      color: 0xff6a00,
      roughness: 0.35,
      metalness: 0.58,
      wireframe: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    group.add(mesh)

    const dotsGeometry = new THREE.BufferGeometry()
    const positions = []
    for (let index = 0; index < 420; index += 1) {
      const radius = 2.4 + Math.random() * 1.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      )
    }
    dotsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const dots = new THREE.Points(
      dotsGeometry,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, transparent: true, opacity: 0.75 }),
    )
    group.add(dots)

    scene.add(new THREE.AmbientLight(0xffffff, 1.1))
    const light = new THREE.PointLight(0xff8a2a, 38, 8)
    light.position.set(3, 3, 4)
    scene.add(light)

    const resize = () => {
      const rect = mount.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      camera.aspect = rect.width / rect.height
      camera.updateProjectionMatrix()
    }

    let pointerX = 0
    let pointerY = 0
    const onPointerMove = (event) => {
      const rect = mount.getBoundingClientRect()
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.55
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.55
    }

    let frame
    const animate = () => {
      group.rotation.y += 0.004
      group.rotation.x += 0.002
      group.rotation.y += (pointerX - group.rotation.y * 0.08) * 0.01
      group.rotation.x += (-pointerY - group.rotation.x * 0.08) * 0.01
      dots.rotation.y -= 0.0015
      renderer.render(scene, camera)
      frame = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)
    mount.addEventListener('pointermove', onPointerMove)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      mount.removeEventListener('pointermove', onPointerMove)
      geometry.dispose()
      dotsGeometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-lg border border-black/10 bg-white/70 shadow-premium backdrop-blur-xl dark:border-white/10 dark:bg-panel/70 [&_canvas]:h-full [&_canvas]:w-full"
      ref={mountRef}
      aria-hidden="true"
    />
  )
}
