export const connections = (state) => {
  return state.connections
}

export const connectionsEstablished = (state) => {
  return state.connections.filter(c => !!c.established)
}
