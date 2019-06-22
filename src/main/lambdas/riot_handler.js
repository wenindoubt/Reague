import bottle from '../bootstrap';

export const theMessenger = async (event, context, callback) => bottle.container.RiotFactory.theMessenger();
export const reague = async (event, context, callback) => bottle.container.RiotFactory.reague();