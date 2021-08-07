import {
    Application, Container,Text,Sprite,TextStyle, Texture,DEG_TO_RAD
} from 'pixi.js';
import { sound } from '@pixi/sound';
import { gsap } from 'gsap';
import { preLoader } from './PreLoader';
import assets from './assets';
import { getTexture } from './Textures';
let flag:number=0;

var x:number[]=[380,580,640,540,350,160,90,150];
var y:number[]=[80,190,380,570,620,540,360,150];
var text1:Text[]=[];

export class Game {
    
    private stage: Container;
    private readonly app: Application;
    private game_container: Container;
    private prize_container: Container;
    private prize_won: string = "None";
    private prize_display: Container;
    private pointer:any;
    private isInitialized = false;

    //prize array 

    private prizes = ['Zero', '100', '200', '500', '1000', '2000', '3000','Jackpot'];
    private wheel: any;
    private segmentangle:number=360/this.prizes.length;
    private stopAngle: number=0;
    constructor(app: Application) {
        this.app = app;
        this.stage = app.stage;
        const centerX = app.view.width / 2;
        const centerY = app.view.height / 2;
        this.game_container = new Container
        this.prize_container = new Container
        this.prize_display = new Container

        //game audio
    
        sound.add('my-sound', 'src/Audio/Tick.wav');
        sound.add('win','src/Audio/won.wav');
        sound.add('lose','src/Audio/lose.wav');
        sound.add('normal','src/Audio/normal.wav');


      this.stage.addChild(this.game_container, this.prize_container,this.prize_display);
      this.prize_display.visible=false;
        preLoader(assets, () => {

            this.isInitialized = true;
            const wheel = new Sprite(getTexture('wheel') as Texture);
            wheel.anchor.set(0.5);
            wheel.position.set(centerX, centerY);
            this.wheel = wheel;
            this.game_container.addChild(this.wheel)


            const pointer = new Sprite(getTexture('pointer') as Texture);
            pointer.scale.set(0.025);
            
            pointer.position.set(this.app.view.width / 2 - 10, 20);
            this.pointer = pointer;
            this.game_container.addChild(this.pointer);
           
            this.addTxt(); 

           this.prize_container.pivot.x = this.app.view.width / 2;
           this.prize_container.pivot.y = this.app.view.height / 2;
           this.prize_container.x = this.app.view.width / 2;
           this.prize_container.y = this.app.view.height / 2;
           this.game_container.addChild(this.prize_container)
           
            wheel.interactive = true;
            wheel.on('click', () => {
                  const stopAngle= Math.floor(Math.random()*360);
                  this.stopAngle=stopAngle;
                  const rotationangle=- DEG_TO_RAD*(360*10+stopAngle);
                flag=1;
                sound.play('my-sound');
                gsap.to(this.wheel, {
                    x: centerX, y: centerY, duration: 2, rotation:rotationangle,
                    onComplete:()=>{
                       
                        console.log("pointer rotation "+ this.pointer.rotation);
                        flag=0;
                        sound.pause('my-sound');
                     this.prizeWin();
                    }
                })
                gsap.to(this.prize_container, {
                    rotation: rotationangle,
                    duration:2
                })

            });
        });

        console.warn(this.app);
    }  
private prizeWin()
{
    if(this.stopAngle>360-this.segmentangle/2||this.stopAngle<=this.segmentangle/2 ){
        this.prize_won = this.prizes[0]
        
    }
    else if(this.stopAngle<=3*this.segmentangle/2){
        this.prize_won = this.prizes[1]
        
    }
    else if(this.stopAngle<=5*this.segmentangle/2){
        this.prize_won = this.prizes[2]
        
    }
    else if(this.stopAngle<=7*this.segmentangle/2){
        this.prize_won = this.prizes[3]
        
    }
    else if(this.stopAngle<=9*this.segmentangle/2){
       this.prize_won = this.prizes[4]
        
    }
    else if(this.stopAngle<=11*this.segmentangle/2){
        this.prize_won = this.prizes[5]            
    }
    else if(this.stopAngle<=13*this.segmentangle/2){
        this.prize_won = this.prizes[6]            
    }
    else {
        this.prize_won = this.prizes[7]
        
    }
if (this.prize_display) {
    this.game_container.addChild(this.WinTxt())
}

this.game_container.interactive = true;
this.game_container.on('click', () => {
    location.reload()
})

}


private WinTxt(): Text {
    const winMsg = new Text(`Congrats!!! You Won ${this.prize_won}`, {
        fontFamily: 'Bebas Neue',
        fill: 'black',
        fontSize: '50px',
        align: 'center'
    })
    if(this.prize_won=='Zero')
    {
        winMsg.position.set(this.app.view.width / 2, this.app.view.height / 2);
    winMsg.anchor.set(0.5)
        sound.play('lose');
    }
    else if(this.prize_won=='Jackpot')
    {
        const jackpot= new Sprite(getTexture('jackpot') as Texture);
      
      jackpot.scale.set(0.5);
      jackpot.position.set(this.wheel.width / 2-270, this.wheel.height/2-90);
      winMsg.visible=false;
      gsap.to(jackpot,{rotation:0,duration:0.1})
      this.game_container.addChild(jackpot);

        sound.play('win');

    }
    else{
        
    winMsg.position.set(this.app.view.width / 2, this.app.view.height / 2);
    winMsg.anchor.set(0.5)
        sound.play('normal');
    }
return winMsg;
}

private addTxt()
{

    let textStyle = new TextStyle({
        fill: 'white',
        fontFamily: 'Bebas Neue',
       
        fontSize: 30,
        
      });
     
     
      for(let i=0;i<this.prizes.length;i++)
      {
          var text=  new Text(this.prizes[i], textStyle);
           text.position.set(x[i],y[i]);
            text1.push(text);
            console.log("text rotation "+ text.rotation);
            this.prize_container.addChild(text);
        
       }
            
      }
 public update(delta: number): void {
        if (this.isInitialized && this.wheel && flag) {
            this.wheel.rotation += delta *DEG_TO_RAD ;
        }
    }
}