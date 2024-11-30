// app.js
let recognition;
let recognizing = false;
let textOutput = document.getElementById("textOutput");
let correctionOutput = document.getElementById("correctionOutput");

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'uz-UZ'; // O'zbek tilida ishlash uchun
    recognition.continuous = true; // Nutqni davomiy ravishda tanish
    recognition.interimResults = true; // Oraliq natijalarni ko'rsatish

    recognition.onstart = function() {
        recognizing = true;
        console.log("Nutqni aniqlash boshlandi...");
    };

    recognition.onend = function() {
        recognizing = false;
        console.log("Nutqni aniqlash tugadi...");
    };

    recognition.onresult = function(event) {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        textOutput.value = finalTranscript || interimTranscript;
        correctSpelling(finalTranscript); // Xatoliklarni aniqlash va tuzatish
    };

} else {
    alert("Sizning brauzeringizda nutqni aniqlash xizmati mavjud emas.");
}

function startRecognition() {
    if (!recognizing) {
        recognition.start();
    }
}

function stopRecognition() {
    if (recognizing) {
        recognition.stop();
    }
}

// Xatoliklarni aniqlash va tuzatish uchun oddiy funksiya (maxsus algoritmlar uchun to'g'ri bo'ladi)
function correctSpelling(text) {
    // Masalan, oddiy "q" harfi bilan bog'liq xatoliklarni aniqlash
    let correctedText = text.replace(/\bq\b/g, 'қ');
    correctedText = correctedText.replace(/\bch\b/g, 'ч'); // Masalan "ch"ni "ч" ga almashtirish

    correctionOutput.value = correctedText; // Tuzatilgan matnni chiqarish
}
