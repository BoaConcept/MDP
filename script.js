function encryptText() {
    const text = document.getElementById('textInput').value;
    const password = document.getElementById('passwordInput').value;
    const encrypted = CryptoJS.AES.encrypt(text, password).toString();
    document.getElementById('output').value = encrypted;
}

function decryptText() {
    const encryptedText = document.getElementById('textInput').value;
    const password = document.getElementById('passwordInput').value;
    const decrypted = CryptoJS.AES.decrypt(encryptedText, password).toString(CryptoJS.enc.Utf8);
    if (decrypted === '') {
        alert('Mot de passe incorrect');
    } else {
        document.getElementById('output').value = decrypted;
    }
}

function generateSecureLink() {
    const text = document.getElementById('textInput').value;
    const password = document.getElementById('passwordInput').value;
    const encryptedText = CryptoJS.AES.encrypt(text, password).toString();
    const link = `https://BoaConcept.github.io/MDP/decrypt.html?text=${encodeURIComponent(encryptedText)}`;
    document.getElementById('output').value = link;

    const existingButtons = document.querySelectorAll('.link-button');
    existingButtons.forEach(button => button.remove());

    const accessButton = document.createElement('button');
    accessButton.className = 'btn btn-primary link-button';
    accessButton.textContent = 'Accéder';
    accessButton.onclick = function() {
        window.location.href = link;
    };

    const copyButton = document.createElement('button');
    copyButton.className = 'btn btn-secondary link-button';
    copyButton.textContent = 'Copier le lien';
    copyButton.onclick = function() {
        navigator.clipboard.writeText(link).then(function() {
            alert('Lien copié dans le presse-papiers !');
        }).catch(function(err) {
            console.error('Erreur lors de la copie du lien : ', err);
        });
    };

    const container = document.querySelector('.container');
    container.appendChild(accessButton);
    container.appendChild(copyButton);
}