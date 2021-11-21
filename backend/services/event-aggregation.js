class EventAggregation {
    constructor() {
        this.publishHandlers = {}
        this.subscribeHandlers = {}
    }

    addHandler({ topics, publishHandler, subscribeHandler }) {
        topics.forEach(topic => {
            if (topic.handler) {
                throw new Error(`Topic handler for ${topic} has already been registered.`)
            }  

            this.publishHandlers[topic] = publishHandler
            this.subscribeHandlers[topic] = subscribeHandler
        })
    }

    publish(topic, payload) {
        this.publishHandlers[topic](topic, payload)
    }

    subscribe(topic) {
        return this.subscribeHandlers[topic](topic)
    }
}

export default EventAggregation