import * as THREE from 'three';
import { Ship } from './Ship';
import { ParticleSystem } from './ParticleSystem';
import { NavigationPoint } from './NavigationPoint';
import { BackgroundEffect } from './BackgroundEffect';

interface SceneOptions {
  particleCount: number;
  quality: 'low' | 'high';
}

export class Scene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private ship: Ship;
  private particles: ParticleSystem;
  private navPoints: NavigationPoint[];
  private background: BackgroundEffect;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private targetMouseX: number = 0;
  private targetMouseY: number = 0;
  private clock: THREE.Clock;
  private frameCount: number = 0;
  private quality: 'low' | 'high';
  private animationFrameId: number | null = null;
  private isDisposed: boolean = false;
  private mouseLerpFactor: number = 0.15;
  private lastMouseMoveTime: number = 0;
  private mouseUpdateThreshold: number = 16; // ~60fps

  constructor(container: HTMLDivElement, options: SceneOptions = { quality: 'high', particleCount: 1000 }) {
    this.quality = options.quality;
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    
    // Adjust FOV for mobile
    const fov = window.innerWidth < 768 ? 75 : 60;
    this.camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = window.innerWidth < 768 ? 25 : 20; // Move camera back on mobile

    this.renderer = new THREE.WebGLRenderer({
      antialias: this.quality === 'high',
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false
    });

    this.setupRenderer(container);
    this.setupLights();
    this.setupObjects(options.particleCount);
    
    this.background = new BackgroundEffect(this.quality);
    this.scene.add(this.background.getMesh());

    // Optimize render order
    this.background.getMesh().renderOrder = -1;
    this.ship.mesh.renderOrder = 1;
    this.particles.particles.renderOrder = 2;
    this.navPoints.forEach(point => point.mesh.renderOrder = 3);

    // Mobile optimizations
    if (window.innerWidth < 768) {
      this.mouseLerpFactor = 0.25; // Faster response on mobile
      this.mouseUpdateThreshold = 32; // Lower update rate for better performance
    }

    this.animate();
  }

  private setupRenderer(container: HTMLDivElement): void {
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);
  }

  private setupLights(): void {
    const ambientLight = new THREE.AmbientLight(0x5865F2, 0.3);
    const mainLight = new THREE.DirectionalLight(0x5865F2, 1);
    mainLight.position.set(0, 0, 10);
    
    this.scene.add(ambientLight, mainLight);
  }

  private setupObjects(particleCount: number): void {
    this.ship = new Ship();
    this.particles = new ParticleSystem(particleCount);
    
    this.navPoints = [
      new NavigationPoint(new THREE.Vector3(-8, 4, 0), 'services'),
      new NavigationPoint(new THREE.Vector3(8, 4, 0), 'about'),
      new NavigationPoint(new THREE.Vector3(0, -4, 0), 'contact')
    ];

    this.scene.add(this.ship.mesh);
    this.scene.add(this.particles.particles);
    this.navPoints.forEach(point => this.scene.add(point.mesh));
  }

  handleMouseMove(event: MouseEvent | Touch): void {
    const currentTime = performance.now();
    if (currentTime - this.lastMouseMoveTime < this.mouseUpdateThreshold) {
      return;
    }
    this.lastMouseMoveTime = currentTime;

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.targetMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.targetMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  handleResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;

    this.camera.aspect = width / height;
    this.camera.fov = isMobile ? 75 : 60;
    this.camera.position.z = isMobile ? 25 : 20;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private animate(): void {
    if (this.isDisposed) return;

    const deltaTime = this.clock.getDelta();
    const currentTime = performance.now();

    // Smooth mouse movement
    const mouseDeltaX = this.targetMouseX - this.mouseX;
    const mouseDeltaY = this.targetMouseY - this.mouseY;
    
    this.mouseX += mouseDeltaX * this.mouseLerpFactor;
    this.mouseY += mouseDeltaY * this.mouseLerpFactor;

    // Update scene with optimized frequency
    this.frameCount++;
    
    if (this.frameCount % (this.quality === 'low' ? 3 : 2) === 0) {
      this.background.update(currentTime * 0.001, this.mouseX, this.mouseY);
      this.navPoints.forEach((point, index) => {
        point.update(currentTime * 0.001, index, this.ship.mesh.position);
      });
    }

    this.ship.update(this.mouseX, this.mouseY, deltaTime);
    this.particles.update(this.ship.mesh.position);

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  dispose(): void {
    this.isDisposed = true;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.ship.dispose();
    this.particles.dispose();
    this.navPoints.forEach(point => point.dispose());
    this.background.dispose();
    
    this.renderer.dispose();
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
    
    this.scene.clear();
  }
}