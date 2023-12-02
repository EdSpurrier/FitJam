
class TriggerZone {
    name = 'TriggerZone'
    triggered = false

    constructor({
            name,
            percentageX,
            percentageY,
            radius,
            inactiveColor,
            activeColor,
            triggerType
        }) {
        this.name = name? name : this.name
        this.percentageX = percentageX
        this.percentageY = percentageY
        this.radius = radius
        this.inactiveColor = inactiveColor
        this.color = inactiveColor
        this.activeColor = activeColor
        this.triggerType = triggerType

        if (
            !system.errorEngine.checkDefinedProperties({
                classObject: this,
                lesson: 'TriggerZone',
                properties: [
                    'percentageX',
                    'percentageY',
                    'radius',
                    'inactiveColor',
                    'activeColor',
                    'triggerType'
                ],
            }) 
        ) {
            return false;
        };

        system.debugConsoleLog(this.constructor.name, `TriggerZone ${this.name} Constructed`);

    }

    calculateCanvasPosition = () => {
        this.x = ((this.canvas.width/100) * this.percentageX) + this.radius/2
        this.y = ((this.canvas.height/100) * this.percentageY) + this.radius/2
    }

    storePercentagePosition = () => {
        this.percentageX = this.x / (this.canvas.width/100)
        this.percentageY = this.y / (this.canvas.height/100)
    }

    reset = () => {
        this.triggered = false
        this.color = this.inactiveColor
    }

    trigger = () => {
        this.color = this.activeColor
        this.triggered = true
    }

    checkCollisions = (sceneObjects) => {
        if (this.triggered) return

        sceneObjects.forEach((sceneObject) => {
            if (sceneObject instanceof MotionTracker && sceneObject.trackingType === this.triggerType) {
                let dx = sceneObject.x - this.x
                let dy = sceneObject.y - this.y
                let distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < sceneObject.radius + this.radius) {
                    this.trigger();
                } else {
                    this.color = this.inactiveColor
                }
            }
        })
    }


    update = (sceneObjects) => {
        this.checkCollisions(sceneObjects)
        this.storePercentagePosition()
    }


    render = () => {
        this.draw()
    }

    draw = () => {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.ctx.closePath()
    }

    init = (ctx, canvas) => {
        this.ctx = ctx
        this.canvas = canvas
        this.reset()
        this.calculateCanvasPosition()
    }
}
