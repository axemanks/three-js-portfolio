import { useRef, useEffect } from 'react';

import birdScene from '../assets/3d/bird.glb';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Bird = ({}) => {
  const birdRef = useRef();
  const { scene, animations } = useGLTF(birdScene);
  const {actions} = useAnimations(animations, birdRef);

  useEffect(() => {    
    actions['Take 001'].play();
  }, [])

  useFrame(({clock, camera}) => {
    // update the y posistion to simulate the bird flying in a sine wave
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.25 + 2;

    // Check if the bird reached a certain endpoint relative to the camera
    if(birdRef.current.position.x > camera.position.x + 10){
      // change direction 180 degrees on the Y axis
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10){
      // Change direction to forward and reset birds location
      birdRef.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction the bird is facing
    if(birdRef.current.rotation.y === 0){
      birdRef.current.position.x += 0.01;
      birdRef.current.position.z -= 0.01;
    } else {
      birdRef.current.position.x -= 0.01;
      birdRef.current.position.z += 0.01;
    }

  });

  return (
    <mesh
      position={[-3, 2, 1]}
      scale={[0.003, 0.003, 0.003]}
      ref={birdRef}
    >
      <primitive object={scene} />
    </mesh>
  );
};

export default Bird;
