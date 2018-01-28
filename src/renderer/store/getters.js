export const connections = (state) => {
  return state.connections
}

export const connectionById = (state) => (id) => {
  return state.connections.find(c => c._id === id)
}

export const connectionsEstablished = (state) => {
  return state.connections.filter(c => !!c.established)
}
