

class Scene {
    sceneEngine
    state = {
        active: false,
    }
    sceneError = false;

    constructor({
        name,
        background,
        triggerZones = [],
        motionTrackers = [],
        debug,
    }) {
        this.name = name;
        this.triggerZones = triggerZones;
        this.motionTrackers = motionTrackers;
        this.background = background;
        this.debug = debug;

        if(
            !system.errorEngine.checkDefinedProperties({
                classObject: this,
                lesson: 'Scene',
                properties: ['name', 'background', 'triggerZones', 'motionTrackers', 'debug'],
            })
        ) {
            this.sceneError = true;
            return false;
        };

        if(
            !system.errorEngine.checkStates({
                classObject: null,
                lesson: 'TriggerZones',
                states: [(triggerZones !== 0)],
            }) ||
            !system.errorEngine.checkStates({
                classObject: null,
                lesson: 'MotionTrackers',
                states: [(motionTrackers !== 0)],
            })
        ) {
            this.sceneError = true;
            return false;
        }

        const sceneObjects = [...motionTrackers, ...triggerZones];

        this.sceneEngine = new SceneEngine({
            sceneObjects,
            background,
            scene: this,
            debug,
        });

        system.debugConsoleLog(this.constructor.name, `Scene ${this.name} Constructed`);
    }


    checkAllTriggersTriggered = () => {
        return this.triggerZones.every((triggerZone) => {
            return triggerZone.triggered;
        });
    }

    update = () => {
        if (!this.state.active) {
            return;
        }
        if (this.checkAllTriggersTriggered()) {
            this.state.active = false;
            this.complete();         
        }
    }

    complete = () => {
        system.debugConsoleLog(this.constructor.name, `Scene[${this.name}] Complete`)
        system.domEngine.hideScene(() => {
            this.timeline.next();
        });
    }
    
    render = () => {
        system.debugConsoleLog(this.constructor.name, `Scene[${this.name}] Render`)
        system.domEngine.showScene();
    }

    reset = () => {
        system.debugConsoleLog(this.constructor.name, `Scene[${this.name}] Reset`)
        this.triggerZones.forEach((triggerZone) => {
            triggerZone.reset();
        });
        this.motionTrackers.forEach((motionTracker) => {
            motionTracker.reset();
        });
        this.state.active = true;
    }

    connectTimeline = (timeline) => {
        this.timeline = timeline;
    }

    init = () => {
        if(this.sceneError) {
            return false;
        }

        system.debugConsoleLog(this.constructor.name, `Scene[${this.name}] Init`)
        this.render();
        this.sceneEngine.init(this);
    }


}



