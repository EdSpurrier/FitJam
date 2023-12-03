import create from 'zustand';

enum TrackingType {
    FACE = "face",
    HAND = "hand",
    SKELETON = "skeleton",
    OBJECT = "object"
}


// TrackingObject is the object that is tracked by the tracking engine
// All sizes and positions are relative to the source size
// For example, if the source size is 1000x1000, and the object is 100x100, then the object is 10% of the source size => (0.1)
// ObjectId is used to identify the object
// TrackingType is used to identify the type of object being tracked


export interface TrackedObject {
    objectId: string;
    trackingType: TrackingType;
    radius: number;
    boundingBox: {
        x: number; // x position of the object [0 -> 1.0]
        y: number; // x position of the object [0 -> 1.0]
        width: number; // width of the object [0 -> 1.0]
        height: number; // height of the object [0 -> 1.0]
    },
    position: {
        x: number; // x position of the object [0 -> 1.0]
        y: number; // x position of the object [0 -> 1.0]
    }
}


// TrackingEngineState is the state of the tracking engine
// TrackedObjects is an array of TrackedObjects
// TrackingType is the type of tracking that is being done
// Model is the model that is being used for tracking
// Source is the source of the tracking data



type TrackingEngineState = {
    trackedObjects: TrackedObject[];
    trackingType: TrackingType;
    model: any;
    source: {
        size: {
            x: number;
            y: number;
        },
    };
    // Define other state properties and types as needed
    init: () => void;
    start: () => void;
    loop: () => void;
    update: () => void;
    stop: () => void;
    // Other methods as needed
    addTrackedObject: (trackedObject: TrackedObject) => void;
    removeTrackedObject: (objectId: string) => void;
    updateTrackedObject: (trackedObject: TrackedObject) => void;
    getTrackedObject: (objectId: string) => TrackedObject | undefined;
    getTrackedObjects: () => TrackedObject[];
    setTrackingType: (trackingType: TrackingType) => void;
    getTrackingType: () => TrackingType;
    setModel: (model: any) => void;
    getModel: () => any;
    setSource: (source: TrackingProps) => void;
}

const useTrackingEngineStore = create<TrackingEngineState>((set, get) => ({
    trackedObjects: [],
    trackingType: TrackingType.FACE,
    model: null,
    source: {
        size: {
            x: 0,
            y: 0
        },
    },
    init: () => {
        // Implementation of Init function
    },
    start: () => {
        // Implementation of Start function
    },
    loop: () => {
        // Implementation of Loop function
    },
    update: () => {
        // Implementation of Update function
    },
    stop: () => {
        // Implementation of Stop function
    },
    addTrackedObject: (trackedObject: TrackedObject) => {
        // Implementation of addTrackedObject function
        
    },
    removeTrackedObject: (objectId: string) => {
        // Implementation of removeTrackedObject function
    },
    updateTrackedObject: (trackedObject: TrackedObject) => {
        // Implementation of updateTrackedObject function
    },
    getTrackedObject: (objectId: string) => {
        // Implementation of getTrackedObject function
    },
    getTrackedObjects: () => {
        // Implementation of getTrackedObjects function

    },
    setTrackingType: (trackingType: TrackingType) => {
        // Implementation of setTrackingType function
    },
    getTrackingType: () => {
        // Implementation of getTrackingType function
    },
    setModel: (model: any) => {
        // Implementation of setModel function
    },
    getModel: () => {
        // Implementation of getModel function
    },
    setSource: (source: TrackingProps) => {
        // Implementation of setSource function
    }
}));
  
export default useTrackingEngineStore;
