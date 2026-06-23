/**********************************************************************
 * Human Nutrition Atlas
 * EventBus
 *********************************************************************/

export class EventBus {

    constructor() {
        this.events = new Map();
    }

    subscribe(eventName, callback) {

        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }

        this.events.get(eventName).push(callback);

    }

    unsubscribe(eventName, callback) {

        if (!this.events.has(eventName))
            return;

        const handlers = this.events.get(eventName);

        const index = handlers.indexOf(callback);

        if (index >= 0)
            handlers.splice(index, 1);

    }

    publish(eventName, payload = null) {

        if (!this.events.has(eventName))
            return;

        this.events.get(eventName)
            .forEach(handler => handler(payload));

    }

    clear() {
        this.events.clear();
    }

}