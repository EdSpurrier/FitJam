
const trackingTypes = [
    'mouse',
    'face',
    'hand',
    'body',
]

class MotionTracker {
    name = 'MotionTracker'
    tracked = false

    constructor({
        radius,
        color,
        trackingType,
        settings,
        
    }) {
        this.radius = radius,
        this.color = color,
        this.trackingType = trackingType,
        this.settings = settings;

        if (
            !system.errorEngine.checkDefinedProperties({
                classObject: this,
                lesson: 'MotionTracker',
                properties: ['radius', 'color', 'trackingType', 'settings'],
            }) 
        ) {
            return false;
        };

        system.debugConsoleLog(this.constructor.name, 'MotionTracker Constructed');
    }

    

    calculateCanvasPosition = () => {
        this.x = (((this.canvas.width/100) * this.percentageX) + this.radius/2)
        this.y = ((this.canvas.height/100) * this.percentageY) + this.radius/2
    }


    calculateCanvasPosition = () => {
        this.x = (((this.canvas.width/100) * this.percentageX) + this.radius/2)
        this.y = ((this.canvas.height/100) * this.percentageY) + this.radius/2
    }


    storePercentagePosition = () => {
        this.percentageX = this.x / (this.canvas.width/100)
        this.percentageY = this.y / (this.canvas.height/100)
    }


    setPosition = (
        x,
        y,
    ) => {
        console.log(x, y, this.trackingType);
        this.x = x
        this.y = y
        this.tracked = true
    }

    getBodyPartTracking = () => {

        if (this.trackingType === 'hand') {
            
            if (system.trackingEngine.trackedBodyParts['hand-1'].tracked) {
                const trackerPositionInBackgroundVideo = this.sceneEngine.getTrackerPositionInBackgroundVideo(system.trackingEngine.trackedBodyParts['hand-1'].centerPoint)

                this.setPosition(
                    trackerPositionInBackgroundVideo.x,
                    trackerPositionInBackgroundVideo.y,
                )
                system.trackingEngine.trackedBodyParts['hand-1'].tracked = false;
            } else if (system.trackingEngine.trackedBodyParts['hand-2'].tracked) {
                const trackerPositionInBackgroundVideo = this.sceneEngine.getTrackerPositionInBackgroundVideo(system.trackingEngine.trackedBodyParts['hand-2'].centerPoint)

                this.setPosition(
                    trackerPositionInBackgroundVideo.x,
                    trackerPositionInBackgroundVideo.y,
                )
                system.trackingEngine.trackedBodyParts['hand-2'].tracked = false;
            }

        }
    }


    update = () => {
        this.getBodyPartTracking()
        this.render();
        this.storePercentagePosition()
    }


    render = () => {
        if (this.x === null || this.y === null || !this.tracked) {
            return;
        };
        this.draw()
    }


    draw = () => {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.ctx.closePath()
        /* this.tracked = false */
    }

    initialized = false;

    reset = () => {
        this.tracked = false
        this.x = -1000;
        this.y = -1000;
        this.initialized = false;
    }

    init = (ctx, canvas, sceneEngine) => {
        this.sceneEngine = sceneEngine
        this.canvas = canvas
        this.ctx = ctx
        this.initialized = true;

        if(this.trackingType === 'mouse') {
            window.addEventListener('pointermove', (event) => {
                if (!this.initialized) {
                    return;
                }
                this.setPosition(
                    event.clientX,
                    event.clientY
                )
            })
        } 
            
    }
}
