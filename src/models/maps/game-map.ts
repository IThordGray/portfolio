import { checkCollide, inputController, state } from "../../global-constants";
import { BackgroundSprite } from "../sprites/background.sprite";
import { BoundarySprite } from "../sprites/boundary.sprite";
import { CoordsSprite } from "../sprites/coords.sprite";
import { ForegroundSprite } from "../sprites/foreground.sprite";
import { NpcSprite } from "../sprites/npc.sprite";
import { PlayerSprite } from "../sprites/player.sprite";
import { Sprite } from "../sprites/sprite";

export abstract class GameMap {
  #animationFrameId: number;
  #playerSprite: PlayerSprite;
  #bgSprite: BackgroundSprite;
  #fgSprite: ForegroundSprite;
  #boundaries: BoundarySprite[] = [];
  #npcs: NpcSprite[] = [];
  #movableSprites: Sprite[];
  #coords = new CoordsSprite();
  moveSpeed = 5;
  offset;
  paused = true;

  get position() {
    return this.#bgSprite?.position;
  }

  constructor({ spawnCoordinate, direction }) {
    this.offset = { ...spawnCoordinate };
    this.#playerSprite = new PlayerSprite({ direction, speed: this.moveSpeed });
    this.#bgSprite = this.getBackground();
    this.#fgSprite = this.getForeground();
    this.#boundaries = this.getBoundaries();
    this.#npcs = this.getNPCs();

    const offset = position => {
      position.x = this.#playerSprite.position.x + (position.x - this.offset.x) * -1;
      position.y = this.#playerSprite.position.y + (position.y - this.offset.y) * -1;
    };

    this.#npcs.forEach(npc => {
      offset(npc.position);
      npc.path.forEach(path => offset(path));
    });

    this.#movableSprites = [ this.#bgSprite, this.#fgSprite, ...this.#boundaries, ...this.#npcs ];

    state.currentMap = this;
  }

  #animateNpcs() {
    this.#npcs.forEach(async npc => {
      if (!npc.path?.length) return;
      npc.spriteAnimation?.start();

      const currentPosition = npc.position;
      const destination = npc.path?.[0];
      const vDirection = destination.y - currentPosition.y;
      const hDirection = destination.x - currentPosition.x;

      const hOffset = hDirection === 0 ? 0 : npc.speed * (hDirection / Math.abs(hDirection));
      const vOffset = vDirection === 0 ? 0 : npc.speed * (vDirection / Math.abs(vDirection));

      if (checkCollide(npc, this.#playerSprite, hOffset, vOffset)) {
        npc.spriteAnimation?.stop();
        if (!npc.interacting) await npc.onInteractAsync?.();
        return;
      }

      if (vDirection !== 0) {
        npc.position.y += npc.speed * (vDirection / Math.abs(vDirection));
        npc.setSprite(vDirection > 1 ? "down" : "up");
        return;
      }

      if (hDirection !== 0) {
        npc.position.x += npc.speed * (hDirection / Math.abs(hDirection));
        npc.setSprite(hDirection > 1 ? "right" : "left");
        return;
      }

      npc.path.push(npc.path.shift());
    });
  }

  #animatePlayer() {
    this.#playerSprite.spriteAnimation?.stop();

    if (inputController.vertical !== 0) {

      let collidingBoundary: BoundarySprite | null = null;
      for (const boundary of this.#boundaries) {
        collidingBoundary = boundary.getCollide(this.#playerSprite, { vOffset: inputController.vertical * this.#playerSprite.speed });
        if (collidingBoundary) break;
      }

      if (collidingBoundary?.type === "collision") return;
      if (collidingBoundary?.type === "transition") {
        this.paused = true;
        const mapExpression = collidingBoundary.meta?.map;
        if (!mapExpression) return;
        new mapExpression();
        return;
      }
      this.#playerSprite.setSprite(inputController.vertical > 0 ? "up" : "down");
      this.#playerSprite.spriteAnimation?.start();
      this.#movableSprites.forEach(x => {
        x.position.y += inputController.vertical * this.#playerSprite.speed;
        if (x instanceof NpcSprite) x.path.forEach(p => p.y += inputController.vertical * this.#playerSprite.speed);
      });
    }

    if (inputController.horizontal !== 0) {
      const willCollide = this.#boundaries.some(x => x.type === "collision" && x.getCollide(this.#playerSprite, { hOffset: inputController.horizontal * this.#playerSprite.speed }));
      if (willCollide) return;

      this.#playerSprite.setSprite(inputController.horizontal > 0 ? "right" : "left");
      this.#playerSprite.spriteAnimation?.start();
      this.#movableSprites.forEach(x => {
        x.position.x -= inputController.horizontal * this.#playerSprite.speed;
        if (x instanceof NpcSprite) x.path.forEach(p => p.x -= inputController.horizontal * this.#playerSprite.speed);
      });
    }

  }

  #processBoundary(
    boundaryValue,
    multiplier,
    rowNumber,
    columnNumber,
    collection,
    type,
    transitionMapper?) {
    if (boundaryValue === 0) return;

    const meta = type === "transition" ? { map: transitionMapper?.(boundaryValue) } : undefined;
    const b = new BoundarySprite({ multiplier, type, meta });
    b.position.x = columnNumber * b.width + this.offset.x;
    b.position.y = rowNumber * b.height + this.offset.y;
    collection.push(b);
  }

  animate() {
    this.#animationFrameId = window.requestAnimationFrame(this.animate.bind(this));

    if (!this.#bgSprite) return;
    if (!this.#playerSprite) return;
    if (!this.#fgSprite) return;

    this.#bgSprite.draw();
    this.#playerSprite.draw();
    this.#fgSprite.draw();
    this.#boundaries?.forEach(boundary => boundary.draw());
    this.#npcs?.forEach(npc => npc.draw());
    if (state.showCoords) this.#coords.draw();

    if (this.paused) return;

    this.#animateNpcs();
    this.#animatePlayer();
  }

  convertCollisionsToBoundaries(
    boundaries,
    rowLength,
    transitionMapper,
    multiplier = 1
  ) {
    const collisions = [];
    const transitions = [];

    for (let i = 0; i < boundaries.collisions.length; i += rowLength) {
      const rowNumber = Math.floor(i / rowLength);
      // 0, 70, 140, 210
      const collisionRowData = boundaries.collisions.slice(i, i + rowLength);
      const transitionRowData = boundaries.transitions.slice(i, i + rowLength);

      for (let j = 0; j < rowLength; j++) {
        const collisionBoundary = collisionRowData[j];
        this.#processBoundary(collisionBoundary, multiplier, rowNumber, j, collisions, "collision");

        const transitionBoundary = transitionRowData[j];
        this.#processBoundary(transitionBoundary, multiplier, rowNumber, j, transitions, "transition", transitionMapper);
      }
    }

    return collisions.concat(transitions);
  }

  destroy() {
    if (!this.#animationFrameId) return;
    window.cancelAnimationFrame(this.#animationFrameId);
  }

  abstract getBackground();

  abstract getBoundaries();

  abstract getForeground();

  getNPCs() {
    return [];
  }
}

