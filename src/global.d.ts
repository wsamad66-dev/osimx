export { };

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  import { BufferGeometry, ShaderMaterial } from 'three';
  export class MeshLineGeometry extends BufferGeometry {}
  export class MeshLineMaterial extends ShaderMaterial {}
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      meshLineMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
