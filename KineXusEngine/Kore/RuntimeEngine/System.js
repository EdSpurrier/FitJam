/*
 * System is used to manage the System
 * Actions:
 * - Manage Debug
 * - Manage Loading Screen
*/

const debugConsoleOutput = {
    System: true,
    ErrorEngine: true,
    TeacherEngine: true,
    App: true,
    DomEngine: true,
    Object: true,
    Timeline: true,
    Screen: true,
    Scene: true,
    MotionTracker: true,
    TriggerZone: true,
    SceneEngine: true,
}


class System {
    settings = {
        debug: true,
        trackingEngineActive: false
    };
    consoleLog = [];
    errorLog = [];
    time = {
        start: new Date(),
        current: new Date(),
        elapsed: 0,
        deltaTime: 0,
    };
    active = false;


    constructor() {
        this.time.start = new Date();


        this.debugConsoleLog(this.constructor.name, 'System Constructed')
    }

    calculateTime = () => {
        this.time.current = new Date();
        this.time.elapsed = this.time.current - this.time.start;
        this.time.deltaTime = this.time.elapsed / 1000;
    }

    debugConsoleLog = (className, message) => {
        this.consoleLog.push({
            className: className,
            message: message
        });
        this.log(className, message);
        if (this.domEngine) {
            this.domEngine.consoleLogUpdate(this.consoleLog);
        }
    }

    log = (className, message) => {

        if (debugConsoleOutput[className] === false) {
            return;
        }

        // get the name of the function that called log
        console.log(`%c[${className}] %c${message}`, "color:#18d6d6;", "color:#d69d18;");
    }

    classError = (className, message) => {
        let errorColor = "color:#d63118; font-weight:bold;";
        let classColor = "color:#18d6d6;";
        let messageColor = "color:#d69d18;";
        console.log(`%cERROR  %c${className} %c${message}`, errorColor, classColor, messageColor);

    }

    error = (name, message, lesson) => {
        this.errorLog.push({
            name: name,
            message: message,
            lesson: lesson,
        })
        this.log(`ERROR: ${name} - ${message}`)

        if (lesson) {
            this.teacherEngine.activateLessonByClassName(lesson);
        }

        this.domEngine.showError(name, message, lesson);

    }

    start = () => {
        app.start();
    }

    trySystemStart = () => {
        if (this.active && this.appReady) {
            this.teacherEngine.checkStage();
            this.log(this.constructor.name, '-----------------------------');
            this.start();
        }
    }

    systemReady = () => {
        this.debugConsoleLog(this.constructor.name, 'System Ready');
        this.active = true;
        this.domEngine.loading(false, this.trySystemStart());
    }

    

    isSystemReady = () => {

        let ready = false;

        if (this.settings.trackingEngineActive) {
            if (this.domEngine &&
                this.teacherEngine &&
                this.errorEngine && 
                this.trackingEngine) {
                if (this.trackingEngine.isLoaded()) {
                    ready = true;
                }
            }
        } else {
            if (this.domEngine &&
                this.teacherEngine &&
                this.errorEngine) {
                    ready = true;
            }
        }
        

        if (ready) {
            this.systemReady();
        } else {
            setTimeout(() => {
                this.isSystemReady();
            }, 100);
        }
    }

    setAppReady = (app) => {
        this.debugConsoleLog(this.constructor.name, 'App Ready');
        this.app = app;
        this.appReady = true;
        this.settings.debug = this.app.debug;
        this.domEngine.setDebugState(this.app.debug);
        this.trySystemStart();
    }


    init = () => {
        this.domEngine = new DomEngine();
        this.teacherEngine = new TeacherEngine({
            course: courseData,
        });

        
        
        this.errorEngine = new ErrorEngine();
        system.debugConsoleLog(this.constructor.name, 'System Initialized');

        if (this.settings.trackingEngineActive) {
            this.trackingEngine = new TrackingEngine({
                modelType: 'handTrack',
            });

            this.trackingEngine.init();
        }
        
        this.isSystemReady();

        this.log(this.constructor.name, '-----------------------------');
    }



}

system = new System();
system.init();