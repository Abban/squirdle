import {Preferences} from "@/entities/Preferences";

const ITEM_NAME = 'preferences';

const getPreferences = (defaults: Preferences): Preferences => {
    let preferences = loadPreferences();

    if(!preferences) {
        preferences = defaults;
        storePreferences(preferences);
    }

    return preferences;
}

const loadPreferences = (): Preferences|null => {
    const preferencesString = localStorage.getItem(ITEM_NAME);
    if(preferencesString === null) return null;
    return JSON.parse(preferencesString);
}

const storePreferences = (preferences: Preferences): void => {
    localStorage.setItem(ITEM_NAME, JSON.stringify(preferences));
}

export default {
    getPreferences,
    storePreferences
}