const isDevEnvironment = process.env.NODE_ENV === "development"

const socket = new WebSocket(`${isDevEnvironment ? "ws" :"wss"}://${isDevEnvironment ? "localhost:4000" : window.location.host}/graphql`, ['graphql-ws'])

let websocketConnected = false
const pendingQueue = []

socket.addEventListener("open", event => {
    socket.send(`{"type":"connection_init","payload":{"content-type":"application/json"}}`)

    websocketConnected = true

    console.log("Sending pending queue...")
    pendingQueue.forEach(message => {
        socket.send(message)
    })
})

socket.addEventListener("close", event => {
    console.log("Websocket closed.")
})

const subscriptionCallbacks = {}

socket.addEventListener("message", event => {
    let { type, id, payload } = JSON.parse(event.data)
    if (type === "data") {
        let callbacks = subscriptionCallbacks[id]

        callbacks.forEach(callback => {
            callback(payload)
        })
    }
})

const GraphqlWebsocket = {
    listen(operationId, payload, callback) {
        if (!subscriptionCallbacks[operationId]) {
            subscriptionCallbacks[operationId] = [callback]

            let message = JSON.stringify({
                id: operationId,
                type: "start",
                payload
            })

            if (!websocketConnected) {
                pendingQueue.push(message)
            } else {
                socket.send(message)
            }

        }
        
        subscriptionCallbacks[operationId].push(callback)
    }
}

export default GraphqlWebsocket