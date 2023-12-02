/*
 * Timeline Module
 * Actions:
 * - Manage Timeline
 * - Manage Timeline Events
 * - Manage Timeline State
 * - Manage Timeline Data
*/


class Timeline {
    timeline = [];
    timelineStep = 0;
    state = {
        active: false,
        complete: false,
    }
    clickState = false;

    constructor() {
        system.debugConsoleLog(this.constructor.name, 'Timeline Constructed')


    }


    clickNext = () => {
        if (this.clickState) {
            return;
        }
        if (this.timelineStep >= (this.timeline.length-1)) {
            return;
        };

        this.clickState = true;
        this.timeline[this.timelineStep].complete(() => {
            this.next();
        });
    }

    clickPrevious = () => {
        if (this.clickState) {
            return;
        }
        if (this.timelineStep === 0) {
            return;
        };

        this.clickState = true;
        this.timeline[this.timelineStep].complete(() => {
            this.previous();
        });
    }


    addTimelineStep(step) {
        step.timeline = this;
        this.timeline.push(step);
        if(step instanceof Scene) {
            system.debugConsoleLog(this.constructor.name, `Timeline Add Scene ${step.name}}`)
            step.connectTimeline(this)
        } else if (step instanceof Screen) {
            system.debugConsoleLog(this.constructor.name, `Timeline Add Screen ${step.name}}`)
        }
        
    }


    setTimelineStepActive = () => {

        system.domEngine.timelineTitleUpdate(`${this.timelineStep+1}: ${this.timeline[this.timelineStep].name}`);
        this.timeline[this.timelineStep].reset();
        this.timeline[this.timelineStep].init();
    }

    previous() {
        this.clickState = false;
        if (this.timelineStep === 0) {
            return;
        }
        system.debugConsoleLog(this.constructor.name, 'Timeline Previous Step ' + this.timelineStep + ' of ' + (this.timeline.length-1))
        this.timelineStep--;
        this.setTimelineStepActive();
    }


    next() {

        this.clickState = false;
        
        if (this.timelineStep >= (this.timeline.length-1)) {
            system.debugConsoleLog(this.constructor.name, 'Timeline Complete')
            return;
        };

        this.timelineStep++;

        system.debugConsoleLog(this.constructor.name, 'Timeline Next Step ' + this.timelineStep + ' of ' + (this.timeline.length-1))

        this.setTimelineStepActive();

    }

    start() {
        system.debugConsoleLog(this.constructor.name, 'Timeline Start')
        if(
            !system.errorEngine.checkStates({
                classObject: this,
                lesson: 'Timeline',
                states: [(this.timeline.length !== 0)],
            })
        ) {
            return false;
        }

        this.timelineStep = 0;
        this.setTimelineStepActive();
    }

}

