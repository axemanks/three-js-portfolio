import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';


const Home = () => {
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    console.log("Inner width",window.innerWidth)
    if (window.innerWidth < 768) {
      screenScale = [0.09, 0.09, 0.09];
    } else {
      screenScale = [.07, .07, .07];
    }
    return [screenScale, screenPosition, rotation];
  };

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  console.log(islandScale, islandPosition, islandRotation);

  return (
    <section      
      className='w-full h-screen relative'
    >
      {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        PopUp
      </div> */}

      <Canvas
        className='w-full h-screen bg-transparent'
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
          <Plane />
          <Sky />

          <Island
            postion={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
          />

        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
