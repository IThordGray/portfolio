class MainMap extends GameMap {
	constructor(args = { spawnCoordinate: { x: -590, y: -330 }, direction: 'down' }) {
		super(args);
	}

	getBackground() {
		return new BackgroundSprite({
			src: 'assets/background.png',
			position: this.offset
		});
	}

	getBoundaries() {
		return this.convertCollisionsToBoundaries({
			collisions: MAIN_MAP_COLLISIONS,
			transitions: MAIN_MAP_TRANSITIONS
		}, 70, transitionValue => mapTransitions[transitionValue], 4);
	}

	getForeground() {
		return new ForegroundSprite({
			src: 'assets/foreground.png',
			position: this.offset
		});
	}

	getNPCs() {
		const position = { x: -1280, y: -340 };
		const path = [{ x: -1280, y: -340 }, { x: -1060, y: -340 }, { x: -1060, y: -440 }, {
			x: -1280,
			y: -440
		}];
		return [new OldManSprite({
			position, direction: 'down',
			speed: this.moveSpeed / 2,
			path,
			onInteractAsync: async () => {
				const value = await state.openPromptAsync('Want me to tell you more about Ivor?');
				if (value) await state.openDialogAsync(ABOUT);
			}
		})];
	}
}