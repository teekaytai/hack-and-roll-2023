const users = {};

export function getUser(user) {
    if (!(user in users)) {
        users[user] = {};
    }
    return users[user];
}

export function setUser(user, obj) {
    users[user] = obj;
}
