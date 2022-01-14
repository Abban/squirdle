export const KEY_STATE = Object.freeze({
    UNUSED: 'UNUSED',
    PRESENT: 'PRESENT',
    ABSENT: 'ABSENT',
});

export interface KeyboardRow {
    keys: Array<Key>
}

export interface Key {
    character: String,
    state: String
}