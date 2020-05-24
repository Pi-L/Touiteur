// Fisher-Yates array shuffle
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Verifying Inputs
// --------------------------------------------------------------

export function validateInput(nodePseudo, nodePseudoLabel, nodeMessage, nodeMessageLabel) {
    nodePseudoLabel.textContent = 'Ton pseudo';
    nodeMessageLabel.textContent = 'Ton message';
    let valid = true;

    nodePseudoLabel.classList.remove('alert');
    nodeMessageLabel.classList.remove('alert');

    if (nodePseudo.value.length < 3) {
        nodePseudoLabel.classList.add('alert');
        nodePseudoLabel.textContent = '⚠️ min 3 chars';
        valid = false;
    }
    if (nodeMessage.value.length < 5) {
        nodeMessageLabel.classList.add('alert');
        nodeMessageLabel.textContent = '⚠️ minimum 5 chars';
        valid = false;
    }

    return valid;
}

export function timeConverter(ts) {
    const unixTsToReadable = new Date(ts * 1000);
    return unixTsToReadable.toLocaleTimeString('fr-FR',
        { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}