


const SceneEventType = {
    SoundEffect: 'SoundEffect',
    AddScore: 'AddScore',
};


class SceneEvent {
    constructor(
        type,
        scene,
        eventData,
    ) {
        this.type = type;
        this.scene = scene;
        this.eventData = eventData;

        if (
            !system.errorEngine.checkDefinedProperties({
                classObject: this,
                lesson: 'SceneEvent',
                properties: ['type', 'scene', 'eventData'],
            }) 
        ) {
            return false;
        };

        system.debugConsoleLog(this.constructor.name, 'SceneEvent Constructed');
    }

    playSoundEffect = () => {
        system.debugConsoleLog(this.constructor.name, 'Play Sound Effect');
        const soundEffect = new Audio(this.eventData);
        soundEffect.play();
    }

    triggerEvent = () => {
        switch (this.type) {
            case SceneEventType.SoundEffect:
                this.playSoundEffect();
                break;
            case SceneEventType.AddScore:
                this.scene.addScore(this.eventData);
                break;
            default:
                break;
        }
    }

}