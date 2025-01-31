import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [filteredDays, setFilteredDays] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const threeRootRef = useRef(null);
  const sceneRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const dataJson = await response.json();
      setData(dataJson);
      setFilteredDays(dataJson.days);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (API_URL) {
      fetchData();
    } else {
      setError('API URL is not defined');
    }
  }, []);

  useEffect(() => {
    if (!data) return;
    
    const createRealisticClouds = () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(300, 300);
      threeRootRef.current.innerHTML = '';
      threeRootRef.current.appendChild(renderer.domElement);
    
      // Create multiple cloud layers
      const clouds = [];
      const cloudCount = 5;
    
      const cloudGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const cloudMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.7 
      });
    
      for (let i = 0; i < cloudCount; i++) {
        const cloudGroup = new THREE.Group();
        
        // Create cloud with multiple spheres
        const cloudSpheres = 3 + Math.floor(Math.random() * 3);
        for (let j = 0; j < cloudSpheres; j++) {
          const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
          
          // Randomize cloud sphere positions
          cloud.position.set(
            Math.random() * 2 - 1, 
            Math.random() * 0.5, 
            Math.random() * 2 - 1
          );
          
          // Vary sphere sizes
          const scale = 0.5 + Math.random() * 0.5;
          cloud.scale.set(scale, scale, scale);
          
          cloudGroup.add(cloud);
        }
    
        // Position entire cloud group
        cloudGroup.position.set(
          Math.random() * 6 - 3, 
          2 + Math.random() * 2, 
          -5 + Math.random() * 2
        );
    
        scene.add(cloudGroup);
        clouds.push(cloudGroup);
      }
    
      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      scene.add(ambientLight, directionalLight);
    
      camera.position.z = 5;
    
      // Cloud animation
      const animate = () => {
        requestAnimationFrame(animate);
    
        clouds.forEach((cloud, index) => {
          // Drift clouds horizontally and vertically
          cloud.position.x += Math.sin(Date.now() * 0.0005 + index) * 0.01;
          cloud.position.y += Math.cos(Date.now() * 0.0003 + index) * 0.005;
    
          // Gentle rotation
          cloud.rotation.y += 0.001;
        });
    
        renderer.render(scene, camera);
      };
    
      animate();
    };
    
    // Call the function
    createRealisticClouds();
  }, [data]);

  const filterDays = () => {
    if (!data) return;

    const filtered = data.days.filter(day => {
      const matchesSearch = day.description.toLowerCase().includes(searchTerm.toLowerCase());
      const aboveMinTemp = minTemp === '' || day.tempmax >= parseFloat(minTemp);
      const belowMaxTemp = maxTemp === '' || day.tempmin <= parseFloat(maxTemp);

      return matchesSearch && aboveMinTemp && belowMaxTemp;
    });

    setFilteredDays(filtered);
  };

  const getWeatherIcon = (iconName) => {
    const icons = {
      'clear-day': '☀️', 'partly-cloudy-day': '⛅',
      'cloudy': '☁️', 'rain': '🌧️', 'snow': '❄️'
    };
    return icons[iconName] || '🌈';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center p-6">
      <div className="App">
        <div ref={threeRootRef} className="threejs-container"></div>
      </div>
      <div className="bg-white shadow-2xl rounded-3xl max-w-2xl w-full p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-blue-600">Weather Dashboard</h1>
          <p className="text-gray-500 text-lg">Your personalized weather insights</p>
        </div>

        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Min Temp (°C)"
            value={minTemp}
            onChange={(e) => setMinTemp(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Max Temp (°C)"
            value={maxTemp}
            onChange={(e) => setMaxTemp(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={filterDays}
            className="sm:col-span-3 bg-blue-500 text-white p-3 rounded-lg shadow hover:bg-blue-600 transition transform hover:scale-105"
          >
            Apply Filters
          </button>
        </div>
              

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p>Error: {error}</p>
          </div>
        )}

        {data && (
          <div className="space-y-4">
            {filteredDays.map((day, index) => (
              <div
                key={index}
                className="bg-blue-50 p-4 rounded-xl shadow-md flex justify-between items-center hover:bg-blue-100 transition transform hover:scale-105"
              >
                <div>
                  <p className="font-bold text-blue-600">{day.datetime}</p>
                  <p className="text-gray-600">{day.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl">{getWeatherIcon(day.icon)}</p>
                  <p>
                    <span className="text-blue-700 font-bold">{day.tempmax}°C</span>
                    {' '} / {' '}
                    <span className="text-blue-500">{day.tempmin}°C</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
