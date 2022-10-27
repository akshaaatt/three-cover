import * as THREE from 'three';
import { proxy } from 'valtio';

export const damp = THREE.MathUtils.damp;
export const state = proxy({
  clicked: null,
  urls: [
    'https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/25/7c/f2/257cf2e2-6c7a-3212-1b27-a684cf85a62c/196589083906.jpg/600x600bb.png',
    'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/31/0c/32/310c329e-996e-d505-335e-a488e4e68450/4050538854701.jpg/600x600bb.png',
    'https://is2-ssl.mzstatic.com/image/thumb/Music116/v4/ae/a6/bd/aea6bd15-6642-7568-d10b-99f77e4b29ff/093624874843.jpg/600x600bb.png',
    'https://is3-ssl.mzstatic.com/image/thumb/Music116/v4/a1/47/ba/a147ba91-31cd-ef4d-d785-040036d14598/12CMGIM34362.rgb.jpg/600x600bb.png',
    'https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/1c/4b/6d/1c4b6d25-32cc-978f-e166-aaf1926aa9e2/22BMR0003639.rgb.jpg/600x600bb.png',
    'https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/9c/63/30/9c63308f-0213-372c-456e-b76b135c47a9/196925187732.jpg/600x600bb.png',
    'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/91/03/14/9103142e-9c42-3658-4d89-5f786ec5fdf1/196589142092.jpg/600x600bb.png',
    'https://is4-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/600x600bb.png',
    'https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/55/dd/ab/55ddab67-26ec-e244-2c37-37f92b63bf19/196589366870.jpg/600x600bb.png'
  ]
});
