import {
    Application, Container,
  } from 'pixi.js';
  
  import { preLoader } from './PreLoader';
  import assets from './assets';
  import { Card, cardFrames, CARD_WIDTH, CARD_HEIGHT } from './Card';
  import { shuffleArray } from './utils';
  import { gsap } from 'gsap';
  
  export class Game {
      private stage: Container;
  
      private readonly app: Application;
  
      private readonly game: Container;

      // private readonly start: Container;

      // private readonly end : Container;

      // private readonly bingo : Container;

      // private readonly oops :Container;
  
      private firstSelection: Card | undefined;
  
      private secondSelection: Card|undefined;

  
      private isInitialized = false;
  
      constructor(app:Application) {
        this.app = app;
        this.stage = app.stage;
        this.game = new Container();
        this.start=new Container();
        this.end= new Container();
        this.bingo=new Container();
        this.oops = new Container();
        

        // this.stage.addChild(this.game,this.start,this.bingo,this.oops,this.end);
        this.stage.addChild(this.game);
        //this.game.visible=false;
        preLoader(assets, () => {
          this.isInitialized = true;
          this.createCards();
          this.placeCards();
        });
        console.warn(this.app);
      }
      private next(): void {
        this.firstSelection = undefined;
        this.secondSelection = undefined;
        this.cardEnabled(true);
      }
      private checkResult(): void {
        if( this.firstSelection && this.secondSelection) {
          if (this.firstSelection.name === this.secondSelection.name) {
            gsap.to([this.firstSelection, this.secondSelection],
              // width:160, height:160,
              {width:130, height:130, alpha:0, duration:0.35, onComplete:()=>{
              this.game.removeChild(this.firstSelection as Card);
              this.game.removeChild(this.secondSelection as Card);
              this.next();
            }});
          } else {
            gsap.fromTo([this.firstSelection, this.secondSelection],
              {rotation:0.5},
              {
                rotation:0,
                ease: 'bounce',
                duration:1.5,
                onComplete:()=>{
                  (this.firstSelection as Card).back.visible = true;
                  (this.secondSelection as Card).back.visible = true;
                  this.next();
                }
              });
          }
        }
      }
  
      private createCards(): void {
          shuffleArray(cardFrames).forEach((cardFrame) => {
            const card = new Card('back', {id: 'coins', frame: cardFrame});
            card.on('pointerup', ()=>{
              card.interactive = false;
              gsap.to(card.back, {alpha:0, duration:0.5,ease: 'crc', onComplete:()=>{
                  card.back.visible = false;
                  card.back.alpha = 1;
                }});
              if(this.firstSelection) {
                this.secondSelection = card;
                this.cardEnabled(false);
                setTimeout(this.checkResult.bind(this), 1000);
              } else {
                this.firstSelection = card;
              }
            })
            this.game.addChild(card);
          });
      }
  
      private cardEnabled(value:boolean) {
        this.game.children.forEach((child) => child.interactive = value);
      }
  
      private placeCards(): void {
        let count = 0;
        const PADDING = 20;
        const OFFSET = 100;
        for (let r = 0; r < 6; r++) {
          for (let c = 0; c < 8; c++) {
            let card = this.game.getChildAt(count);
            card.x = c * (CARD_WIDTH + PADDING) + OFFSET;
            card.y = r * (CARD_HEIGHT + PADDING) + OFFSET;
            count++;
          }
        }
      }
  
      public update(delta:number):void {
        if (this.isInitialized) {
          // console.warn(delta);
          delta;
        }
      }
  }