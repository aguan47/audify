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

export const getLocalISOTime = (date) => {
    const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
    return new Date(new Date(date) - timezoneOffset).toISOString().slice(0, -1).split("T")[0];
}

export const loadProfileData = (state, profile) => {
    if (!profile) return;

    const keys = Object.keys(state);
    keys && keys.forEach(key => {
        let newValue = profile[key];

        if (key === "birthday") newValue = getLocalISOTime(profile[key]);
        state[key].value = newValue || ""; 
    }); 
    return state;
}

export const disableInput = (state, isDisabled) => {
    const keys = Object.keys(state);
    keys && keys.forEach(key => {
        state[key].disabled = isDisabled;
    });
    return state;
}

export const msToHumanTime = (ms) => {
    const seconds = Math.floor((ms/1000) % 60);
    const minutes = Math.floor((ms/1000/60) % 60);
    const hours = Math.floor((ms/1000/3600) % 24);
    
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export const loadPicture = (e, profile, setProfile) => {
    const uploadedImage = new Image();
    uploadedImage.src = URL.createObjectURL(e.target.files[0]);

    setProfile({...profile, profile_picture_path: uploadedImage.src});
}