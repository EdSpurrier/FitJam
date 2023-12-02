



class ErrorEngine {
    errors = []

    constructor() {
        system.debugConsoleLog(this.constructor.name, 'ErrorEngine Constructed')
    }

    checkStates = ({
        classObject,
        lesson,
        states
    }) => {
        let className = '';
        if (classObject === null) {
            className = lesson;
        } else {
            className = classObject.constructor.name;
        }
         
        system.log(this.constructor.name,`Checking States 🠪 (${className} ⇋ ${lesson})`)

        let noErrors = true;

        states.forEach((state) => {
            if (!state) {
                system.error(className, 'Incorrect Setup', lesson);
                noErrors = false;
            }
        });

        if (!noErrors) {
            system.classError(className, 'checkStates')
        }
        return noErrors;
    }


    checkDefinedProperties = ({
        classObject,
        lesson,
        properties
    }) => {
        const className = classObject.constructor.name;
        system.log(this.constructor.name,`Checking Defined Properties 🠪 (${className} ⇋ ${lesson})`)

        let noErrors = true;

        properties.forEach((property) => {
            const definedState = classObject[property] !== undefined;
            
            if (!definedState) {

                system.log(this.constructor.name,`[ErrorEngine] Property (${property} ⇋ ${definedState})`);

                system.error(className, property, lesson);
                noErrors = false;
            }
        });

        if (!noErrors) {
            system.classError(classObject, 'checkDefinedProperties')
        }

        return noErrors;
    }

}