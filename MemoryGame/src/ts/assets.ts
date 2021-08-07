export type Assets = {
    baseUrl: string;
    images:{ key:string, url:string }[];
  };
  export default {
    baseUrl: './assets/img',
    images: [
      
      {
        key: 'back',
        url: 'cardback.jpg',
      },
      {
        key: 'front',
        url: 'customspritesheet.png',
      },
    ],
  };