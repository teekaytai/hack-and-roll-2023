const users = {};

export function getUser(user) {
    return users[user];
}

export function setUser(user, obj) {
    users[user] = obj;
}
