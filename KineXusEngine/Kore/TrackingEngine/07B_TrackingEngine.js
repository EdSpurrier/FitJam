// Manages all the tracking logic



// preset scenesettings for being added to in constructor
const presetTrackingSettings = {
    modelType : 'handTrack',
};

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

let trackingEngineCreated = false;
let trackingEngineInit = false;




class TrackingEngine {
    model = null
    running = false
    trackedPredictions = []
    handTrack = null

    trackedBodyParts = {
        'hand-1': {
            bbox: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
            centerPoint: {
                x: 0,
                y: 0,
            },
            canvasSize: {
                width: 0,
                height: 0,
            },
            tracked: false,
            pose: '',
    
        },
        'hand-2': {
            bbox: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
            centerPoint: {
                x: 0,
                y: 0,
            },
            canvasSize: {
                width: 0,
                height: 0,
            },
            tracked: false,
            pose: '',
        },
        'face': {
            bbox: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
            centerPoint: {
                x: 0,
                y: 0,
            },
            canvasSize: {
                width: 0,
                height: 0,
            },
            tracked: false,
            pose: '',
        },
    };

    constructor(
        trackingSettings
    ) {
        app.trackingEngine = this;
        trackingEngineCreated = true;
        //  merge the presetTrackingSettings with the trackingSettings passed in
        this.trackingSettings = Object.assign(presetTrackingSettings, trackingSettings);
        
        this.modelType = this.trackingSettings.modelType;

        this.video              = system.domEngine.getElement('tracking-engine-webcam-video');
        const { canvas, ctx }   = system.domEngine.getCanvas('tracking-engine-canvas');
        this.canvas = canvas;
        this.ctx = ctx;


        this.handData = document.getElementById("handData");
        this.handTrack = handTrack;
    }

    isLoaded = () => {
        return this.model !== null;
    }

    checkIfWebcamBlocked = () => {
        if (this.video.paused) {
            system.log(this.constructor.name,'Webcam blocked');
            system.domEngine.showWebcamBlocked();
        } else {
            system.log(this.constructor.name,'Webcam not blocked');
        }
    }

    assignTrackedBodyParts = () => {
/*         this.trackedBodyParts['face'].tracked = false;
        this.trackedBodyParts['hand-1'].tracked = false;
        this.trackedBodyParts['hand-2'].tracked = false; */
        this.trackedBodyParts['hand-1'].updated = false;
        this.trackedBodyParts['hand-2'].updated = false;
        this.trackedPredictions.forEach((prediction) => {

            if (prediction.label === 'face') {

                this.trackedBodyParts['face'].bbox = prediction.bbox;
                this.trackedBodyParts['face'].centerPoint = {
                    x: prediction.bbox[0] + (prediction.bbox[2] / 2),
                    y: prediction.bbox[1] + (prediction.bbox[3] / 2),
                };
                this.trackedBodyParts['face'].canvasSize = {
                    width: this.canvas.width,
                    height: this.canvas.height,
                };
                this.trackedBodyParts['face'].tracked = true;
                
            }
            if (prediction.label === 'open' || prediction.label === 'point' || prediction.label === 'closed') {
                if (!this.trackedBodyParts['hand-1'].updated) {
                    this.trackedBodyParts['hand-1'].bbox = prediction.bbox;
                    this.trackedBodyParts['hand-1'].centerPoint = {
                        x: prediction.bbox[0] + (prediction.bbox[2] / 2),
                        y: prediction.bbox[1] + (prediction.bbox[3] / 2),
                    };
                    this.trackedBodyParts['hand-1'].canvasSize = {
                        width: this.canvas.width,
                        height: this.canvas.height,
                    };
                    this.trackedBodyParts['hand-1'].tracked = true;
                    this.trackedBodyParts['hand-1'].updated = true;
                } else if (!this.trackedBodyParts['hand-2'].updated) {
                    this.trackedBodyParts['hand-2'].bbox = prediction.bbox;
                    this.trackedBodyParts['hand-2'].centerPoint = {
                        x: prediction.bbox[0] + (prediction.bbox[2] / 2),
                        y: prediction.bbox[1] + (prediction.bbox[3] / 2),
                    };
                    this.trackedBodyParts['hand-2'].canvasSize = {
                        width: this.canvas.width,
                        height: this.canvas.height,
                    };
                    this.trackedBodyParts['hand-2'].tracked = true;
                    this.trackedBodyParts['hand-2'].updated = true;
                }
            }
        });

    }


    loadHandTrackModel = () => {
        this.handTrack.load(modelParams).then(lmodel => {
            // detect objects in the image.
            this.model = lmodel
            system.log(
                this.constructor.name,
                'Handtrack model loaded');
            this.startVideo();
        });
    }


    loadModel = () => {
        if (this.modelType === 'handTrack') {
            this.loadHandTrackModel();
        }
    }

    runDetection = () => {
        this.model.detect(this.video).then(predictions => {
            this.model.renderPredictions(predictions, this.canvas, this.ctx, this.video);
            this.trackedPredictions = predictions;
            this.assignTrackedBodyParts();
            requestAnimationFrame(this.loop);
        });
    }

    startVideo = () => {
        console.log(this.video)
        
        this.handTrack.startVideo(this.video).then((status) => {
            system.log(this.constructor.name,`Webcam Stream: ${status?'true':'false'}`);

            this.checkIfWebcamBlocked();

            if (status) {
                system.log(this.constructor.name,'Running detection loop')
                this.runDetection();
                this.running = true
            }
        });
    }

   
    stopVideo() {
        this.handTrack.stopVideo(video)
        this.running = false;
        system.log(this.constructor.name,'Video stopped')
    }

    init = () => {
        system.domEngine.showTrackingEngine();
        this.loadModel();
    }

    updateSystem = () => {
        if (this.running) {
            this.runDetection();
        }
    }


    loop = () => {
        this.updateSystem();
    }
}


