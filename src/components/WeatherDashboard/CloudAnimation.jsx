// src/components/WeatherDashboard/CloudAnimation.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CloudAnimation = ({ data }) => {
  const threeRootRef = useRef(null);

  useEffect(() => {
    if (!data) return;
    
    const createRealisticClouds = () => {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(300, 300);
      
      // Clear and append renderer
      if (threeRootRef.current) {
        threeRootRef.current.innerHTML = '';
        threeRootRef.current.appendChild(renderer.domElement);
      }
    
      // Cloud creation helpers
      const createCloudSphere = () => {
        const cloudGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const cloudMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xffffff, 
          transparent: true, 
          opacity: 0.7 
        });
        return new THREE.Mesh(cloudGeometry, cloudMaterial);
      };

      const createCloudGroup = () => {
        const cloudGroup = new THREE.Group();
        const cloudSpheres = 3 + Math.floor(Math.random() * 3);
        
        for (let j = 0; j < cloudSpheres; j++) {
          const cloud = createCloudSphere();
          
          // Position within group
          cloud.position.set(
            Math.random() * 2 - 1, 
            Math.random() * 0.5, 
            Math.random() * 2 - 1
          );
          
          // Random scale
          const scale = 0.5 + Math.random() * 0.5;
          cloud.scale.set(scale, scale, scale);
          
          cloudGroup.add(cloud);
        }

        return cloudGroup;
      };
    
      // Create multiple cloud layers
      const clouds = [];
      const cloudCount = 5;
    
      for (let i = 0; i < cloudCount; i++) {
        const cloudGroup = createCloudGroup();
        
        // Position cloud group in scene
        cloudGroup.position.set(
          Math.random() * 6 - 3, 
          2 + Math.random() * 2, 
          -5 + Math.random() * 2
        );
    
        scene.add(cloudGroup);
        clouds.push(cloudGroup);
      }
    
      // Lighting
      const addLighting = () => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(ambientLight, directionalLight);
      };

      addLighting();
      camera.position.z = 5;
    
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
    
        clouds.forEach((cloud, index) => {
          // Horizontal drift
          cloud.position.x += Math.sin(Date.now() * 0.0005 + index) * 0.01;
          // Vertical drift
          cloud.position.y += Math.cos(Date.now() * 0.0003 + index) * 0.005;
          // Gentle rotation
          cloud.rotation.y += 0.001;
        });
    
        renderer.render(scene, camera);
      };
    
      animate();

      // Cleanup function
      return () => {
        renderer.dispose();
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            object.material.dispose();
          }
        });
      };
    };
    
    const cleanup = createRealisticClouds();
    return cleanup;
  }, [data]);

  return (
    <div className="App">
      <div ref={threeRootRef} className="threejs-container"></div>
    </div>
  );
};

export default CloudAnimation;