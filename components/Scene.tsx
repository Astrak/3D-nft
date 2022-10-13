import { Environment, Sky } from '@react-three/drei';

export const Scene = () => {
  return (
    <>
      <Sky distance={10000} />
      <Environment />
      <directionalLight position={[0, 40, 0]} rotation={[Math.PI / 4, 0, 0]} />
    </>
  );
};
