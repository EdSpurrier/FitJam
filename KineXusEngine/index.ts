import useKineXusStore from "./KineXusStore";
import useSceneEngineStore from "./Scene/sceneEngineStore";

const KineXusEngine = {
    sceneEngine: useSceneEngineStore,
    state: useKineXusStore
};

export default KineXusEngine;
