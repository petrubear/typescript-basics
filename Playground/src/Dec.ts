const someObject = {
    someProperty: 'initial',
};

class Manager {
    // @watchChange
    @linkValue(someObject)
    someProperty: string | undefined

};

//watchChange(Manager.prototype, 'someProperty')

function watchChange(target: any, key: string) {
    let property = target[key];

    const getter = () => {
        return property;
    }

    const setter = (newValue: any) => {
        console.log(`${key as string} changed from ${property} to ${newValue}`);
        property = newValue;
    }

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        configurable: true,
        enumerable: true,
    });
};

function linkValue(otherObject: any) {
    return function (target: any, key: string) {
        let property = target[key];

        const getter = () => {
            return property;
        }

        const setter = (newValue: any) => {
            property = newValue;
            otherObject[key] = newValue;
        }

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            configurable: true,
            enumerable: true,
        });
    }
};

const manager = new Manager();
manager.someProperty = '123';
console.log(someObject.someProperty);
manager.someProperty = '456';
console.log(someObject.someProperty);
