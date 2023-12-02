
class SceneEngine {
    fps = 0;


    constructor({
        sceneObjects,
        background,
        scene,
        debug,
    }) {

        this.background = background;
        this.sceneObjects = sceneObjects;
        this.scene = scene;
        this.debug = debug;

        const { canvas, ctx } = system.domEngine.getCanvas('scene');
        
        this.canvas = canvas;
        this.ctx = ctx;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        system.domEngine.onWindowResize(this.resizeCanvas);

        if (this.background.video) {
            this.background.videoStream = system.domEngine.getElement('tracking-engine-webcam-video');
            /* this.background.videoStream.addEventListener('play', function() {
                var $this = this; //cache
                (function loop() {
                    if (!$this.paused && !$this.ended) {
                        this.ctx.drawImage($this, 0, 0);
                        setTimeout(loop, 1000 / 30); // drawing at 30fps
                    }
                })();
            }, 0); */
        }

        system.debugConsoleLog(this.constructor.name, 'SceneEngine Constructed');
    }

    

    

    calculateFps =  () => {
        //  calculate fps
        this.now = Date.now();
        this.delta = this.now - this.then;
        this.then = this.now;
        this.interval = 1000 / this.delta;
        this.fps = Math.round(this.interval);
    }


    renderFpsCounter = () => {
        if (this.debug) {
            // Add black background to text
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(this.canvas.width - 100, this.canvas.height - 40, 100, 40);
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "green";
            this.ctx.textAlign = "center";            
            this.ctx.fillText(this.fps, this.canvas.width - 50, this.canvas.height - 10);
        } 
    }

    // On resize of canvas recalculate positions of objects
    resizeCanvas = () => {
        /* return; */
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.relativeSize = {
            width: this.canvas.width / 100,
            height: this.canvas.height / 100,
        }
        this.canvas.center = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
        }

        this.canvas.ratio = this.canvas.width / this.canvas.height;



       /*  this.sceneObjects.forEach(sceneObject => {
            sceneObject.calculateCanvasPosition();
        }) */


    }

    refreshSceneObjects = () => {
        this.orderSceneObjects();
    }


    orderSceneObjects = () => {
        this.sceneObjects.sort((a, b) => {
            return a.layer - b.layer;
        })
    }

    addSceneObject = (sceneObject) => {
        sceneObject.init(
            this.ctx,
            this.canvas,
        )
        this.sceneObjects.push(sceneObject);
        this.refreshSceneObjects();
    }

    destroyObject = (objectName) => {
        this.sceneObjects.forEach((sceneObject, index) => {
            if (sceneObject.name === objectName) {
                sceneObject.destroy();
                this.sceneObjects.splice(index, 1);
            }
        })
        this.refreshSceneObjects();
    }


    getTrackerPositionInBackgroundVideo = (motionTracker) => {
        const imageCoverSize = system.domEngine.getImageCoverSize(this.background.videoStream, this.canvas.width, this.canvas.height);
        const x = imageCoverSize.x + (imageCoverSize.width - motionTracker.x);
        const y = motionTracker.y - imageCoverSize.y;
        return { x, y };
    }

    renderBackground = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.background.color && this.background.color !== '') {
            this.ctx.fillStyle = this.background.color;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        };
        if (this.background.image && this.background.image !== '') {
            const imageCoverSize = system.domEngine.getImageCoverSize(this.background.image, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.background.image, imageCoverSize.x, imageCoverSize.y, imageCoverSize.width, imageCoverSize.height);
        };
        if (this.background.video && this.background.video !== '' && this.background.videoStream) {
            const imageCoverSize = system.domEngine.getImageCoverSize(this.background.videoStream, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.background.videoStream, imageCoverSize.x, imageCoverSize.y, imageCoverSize.width, imageCoverSize.height);
        };
    }



    updateSystem = () => {
        //  calculate fps
        this.calculateFps();

        //  update sceneObjects
        this.sceneObjects.forEach(sceneObject => {
            sceneObject.update(this.sceneObjects);
        });
    }

    renderFrame = () => {

        this.renderBackground();

        //  render sceneObjects in layer order
        this.sceneObjects.forEach(sceneObject => {
            sceneObject.render();
        });
        
        this.renderFpsCounter();
    }

    loop = () => {
        if (this.pause) return;

        this.resizeCanvas();
        this.updateSystem();
        
        this.renderFrame();
        this.scene.update();
        requestAnimationFrame(this.loop);
    }

    pause = false;

    stop = () => {
        this.pause = true;
    }

    init = (scene) => {
        
        this.scene = scene;
        this.sceneObjects.forEach(sceneObject => {
            sceneObject.init(
                this.ctx,
                this.canvas,
                this
            )
        });
        this.pause = false;
        this.loop();
        system.debugConsoleLog(this.constructor.name, 'SceneEngine Initiated');
    }
}



//  Check after everyting in the whole site has finished loading and initiating and see if the sceneEngine is present
/* setTimeout(() => {
    teacher.lessonCheckState('sceneEngine', sceneEngineCreated && sceneEngineInit);
}, 2500);
 */


