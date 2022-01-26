export const getKeyValueFromState = (state) => {
    const keys = Object.keys(state);
    return keys && keys.reduce((prev, curr) => { 
        return {...prev, [curr]: state[curr].value}
    }, {});
}

export const saveKeyValueToLocalStorage = (state, name, blocklist) => {
    // name is the name of the page to provide a unique name
    const keys = Object.keys(state);
    keys && keys.forEach(key => {
        if (!blocklist.includes(key)) {
            localStorage.setItem(`${key}-${name}`, state[key].value);
        }
    });
}

export const clearKeyValueLocalStorage = (state, name) => {
    const keys = Object.keys(state);
    keys && keys.forEach(key => {
        localStorage.removeItem(`${key}-${name}`); 
    });
}

export const importKeyValueLocalStorage = (state, name) => {
    const keys = Object.keys(state);
    keys && keys.forEach(key => {
        state[key].value = localStorage.getItem(`${key}-${name}`) || "";
    });
    return state;
}

export const storeCookie = (name, value, lifespan) => {
    document.cookie = `${name}=${value}; max-age=${lifespan}; SameSite=Lax`;
}

export const searchCookie = (cookieName) => {
    const foundCookie = document.cookie.split(";").filter(cookie => cookie.includes(cookieName));

    if (foundCookie.length === 0) return null;
    return foundCookie[0].split("=")[1];
}

export const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}