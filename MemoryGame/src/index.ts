// import * as PIXI from 'pixi.js';
import './css/main.scss';
import { Application, Ticker } from 'pixi.js';

// eslint-disable-next-line import/extensions,import/no-unresolved
import { Game } from './ts/game.ts';

window.onload = () => {
  const app = new Application({
    width: 1400,
    height: 1050,
    // width: 980,
    // height: 650,
    backgroundColor: 0x000000,
    //  resizeTo:window,
    sharedTicker: true,
    sharedLoader: true,
    // resolution: window.devicePixelRatio
  });

  document.body.appendChild(app.view);

  const game = new Game(app);
  const ticker = Ticker.shared;
  ticker.add(game.update.bind(game));
};