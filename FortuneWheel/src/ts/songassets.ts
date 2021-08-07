export type songs = {
    baseUrl: string;
    songs: {key:string, url:string}[];
};
export default {
    baseUrl: './Audio/',
    images: [
        {
            key: 'lose',
            url: 'tweenjs_src_Audio_lose.mp3',
        },
        {
            key: 'won',
            url: 'tweenjs_src_Audio_won.mp3',
        },
        {
            key: 'normal',
            url: 'tweenjs_src_Audio_Normal.mp3',
        },
        {
            key: 'tick',
            url: 'tweenjs_src_Audio_Tick.mp3',
        },
    ],
   
    
};