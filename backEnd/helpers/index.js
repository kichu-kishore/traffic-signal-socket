/** Helps to pick the random id */
async function pickTheRandomId(idList) {
    const keys = idList;
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return randomKey;
}

/** helps to pick the random id and null also */
async function pickTheRandomIdWithNull(idList) {
    // Create a new list with all the ids and add `null` as a potential outcome.
    const options = [...idList, null];
    const randomIndex = Math.floor(Math.random() * options.length);
    // Return the value at the randomly chosen index.
    return options[randomIndex];
}

export { pickTheRandomId, pickTheRandomIdWithNull };