import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';


const Home = () => {
  const [isRotating, setIsRotating] = useState(false);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }
    return [screenScale, screenPosition, rotation];
  };
  
  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustBiplaneForScreenSize();

  return (
    <section      
      className='w-full h-screen relative'
    >
      {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        PopUp
      </div> */}

      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }} // items close or farther than these values will not be rendered
      >
        {/* Suspense renders the loading screen */}
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          {/* directional ligthing is light from a source, like sunlight */}
          <directionalLight position={[1, 1, 1]} intensity={2} /> 
          {/* illuminates all objects in the scene equally without casting shadows */}
          <ambientLight intensity={0.5}/>
          {/* Point Light emits light in all directions from a single point */}
          {/* Spotlight emits light from one direction in the shape of a cone */}
          {/* Hemisphere illuminates the scene with a gradient */}
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <Bird />
          <Plane 
          scale={planeScale}
          position={planePosition}
          isRotating={isRotating}
          rotation={[0, 20.1, 0]} // rotaion of the plane
          />
          <Sky />

          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            // setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />

        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
