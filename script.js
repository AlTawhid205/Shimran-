// ================= APP INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
    // Birthday date for Polaroid caption
    const dateEl = document.getElementById("current-date");
    if (dateEl) {
        dateEl.textContent = " ";
    }

    initSurpriseScreen();
    initEnvelope();
    initCandles();
    initBackgroundBalloons();
    initMusicBox();
    initClickSparkles();
    initVibeGenerator();
});

// ================= LUXURY FULJHURI (SPARKLER & FIREWORKS) EFFECTS =================
function triggerConfettiBurst() {
    // 1. Center Starburst of Golden & Diamond Sparks
    confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#ffd700', '#ffb703', '#ffffff', '#fff3b0'],
        shapes: ['star'],
        scalar: 1.3,
        startVelocity: 45,
        decay: 0.92,
        ticks: 180
    });

    // 2. High-speed Rose Gold & Ruby Streamers
    confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#ff4d6d', '#ff758f', '#e0aaff', '#ffd700', '#ffffff'],
        shapes: ['circle'],
        scalar: 1.0,
        startVelocity: 35,
        ticks: 200
    });

    // 3. Cascading Golden Rain (সোনার ফুলঝুরির বৃষ্টি)
    setTimeout(() => {
        confetti({
            particleCount: 70,
            spread: 120,
            origin: { y: 0.3 },
            colors: ['#ffd700', '#ffe57f', '#ffffff', '#ff99b3'],
            shapes: ['star', 'circle'],
            gravity: 0.6,
            scalar: 1.1,
            ticks: 240
        });
    }, 250);
}

function triggerConfettiMagical() {
    // Twin Side Fuljhuri Cannons (দুই পাশ থেকে স্বর্ণালী ফুলঝুরির ধারা)
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        // Left Cannon
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 60,
            origin: { x: 0, y: 0.7 },
            colors: ['#ffd700', '#ffb703', '#ff4d6d', '#ffffff', '#c084fc'],
            shapes: ['star', 'circle'],
            scalar: 1.2,
            ticks: 160
        });
        // Right Cannon
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 60,
            origin: { x: 1, y: 0.7 },
            colors: ['#ffd700', '#ffb703', '#ff4d6d', '#ffffff', '#c084fc'],
            shapes: ['star', 'circle'],
            scalar: 1.2,
            ticks: 160
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// ================= SURPRISE SCREEN =================
function initSurpriseScreen() {
    const surpriseScreen = document.getElementById("surprise-screen");
    const giftBoxBtn = document.getElementById("gift-box-btn");
    const openGiftBtn = document.getElementById("open-gift-btn");
    const mainContent = document.getElementById("main-content");

    let isOpened = false;

    function openGift() {
        if (isOpened) return;
        isOpened = true;

        // Animate gift box open
        const giftBox = document.querySelector(".gift-box");
        if (giftBox) giftBox.classList.add("open");

        // Play magical chime sound
        try {
            playMagicChimeChord();
        } catch(e) {}

        // Confetti burst right from the box
        triggerConfettiBurst();

        // Small delay for animation, then transition to main content
        setTimeout(() => {
            surpriseScreen.classList.add("fade-out");
            mainContent.classList.remove("hidden");
            
            // Fade-in main content smoothly
            setTimeout(() => {
                mainContent.classList.add("visible");
                // Secondary magical side confetti rain
                triggerConfettiMagical();
            }, 50);

        }, 1200);
    }

    if (giftBoxBtn) giftBoxBtn.addEventListener("click", openGift);
    if (openGiftBtn) openGiftBtn.addEventListener("click", openGift);
}

// ================= BACKGROUND BALLOONS =================
function initBackgroundBalloons() {
    const container = document.getElementById("balloon-container");
    if (!container) return;

    const balloonColors = [
        'rgba(255, 77, 109, 0.75)',   // Glowing Rose
        'rgba(255, 209, 102, 0.75)',  // Warm Candlelight Gold
        'rgba(192, 132, 252, 0.75)',  // Radiant Lavender
        'rgba(255, 117, 143, 0.75)',  // Soft Coral Peach
        'rgba(244, 63, 94, 0.75)'     // Deep Romantic Rose
    ];

    function createBalloon() {
        const balloon = document.createElement("div");
        balloon.className = "balloon";

        // Random attributes
        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        const leftPos = Math.random() * 90 + 5;
        const animDuration = Math.random() * 8 + 12;
        const scaleSize = Math.random() * 0.4 + 0.8;

        balloon.style.backgroundColor = color;
        balloon.style.left = `${leftPos}%`;
        balloon.style.animationDuration = `${animDuration}s`;
        balloon.style.transform = `scale(${scaleSize})`;

        // Add balloon string
        const string = document.createElement("div");
        string.className = "balloon-string";
        balloon.appendChild(string);

        // Remove balloon when animation ends
        balloon.addEventListener("animationend", () => {
            balloon.remove();
        });

        container.appendChild(balloon);
    }

    // Spawn initial balloons
    for (let i = 0; i < 6; i++) {
        setTimeout(createBalloon, Math.random() * 8000);
    }

    // Periodically spawn new balloons
    setInterval(createBalloon, 3500);
}

// ================= ENVELOPE / LETTER =================
function initEnvelope() {
    const envelope = document.getElementById("envelope-card");
    if (!envelope) return;

    envelope.addEventListener("click", (e) => {
        envelope.classList.toggle("open");
        e.stopPropagation();
    });
}

// ================= INTERACTIVE CANDLES =================
function initCandles() {
    const candles = document.querySelectorAll(".candle");
    const blowBtn = document.getElementById("blow-btn");
    const wishModal = document.getElementById("wish-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");

    let candlesBlown = [false, false, false];

    function checkAllBlown() {
        if (candlesBlown.every(state => state === true)) {
            setTimeout(() => {
                triggerConfettiBurst();
                triggerConfettiMagical();

                if (wishModal) {
                    wishModal.classList.add("visible");
                }
            }, 600);
        }
    }

    function blowCandle(index, element) {
        if (candlesBlown[index]) return;
        candlesBlown[index] = true;

        const flame = element.querySelector(".flame");
        if (flame) {
            flame.classList.remove("animate-flicker");
            flame.classList.add("blown");
        }
        element.classList.add("blown-smoke");

        playBlowSound();
        checkAllBlown();
    }

    // Add click listeners to individual candles
    candles.forEach((candle, index) => {
        candle.addEventListener("click", () => {
            blowCandle(index, candle);
        });
    });

    // Blow button triggers all candles sequentially
    if (blowBtn) {
        blowBtn.addEventListener("click", () => {
            candles.forEach((candle, index) => {
                setTimeout(() => {
                    blowCandle(index, candle);
                }, index * 250);
            });
        });
    }

    // Modal close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            wishModal.classList.remove("visible");
        });
    }

    // Microphone Blowing Logic
    const micBtn = document.getElementById("mic-btn");
    const micStatus = document.getElementById("mic-status");
    let micStream = null;
    let micAnalyser = null;
    let isMicActive = false;
    let micAnimationFrameId = null;

    function stopMicrophone() {
        isMicActive = false;
        if (micAnimationFrameId) {
            cancelAnimationFrame(micAnimationFrameId);
        }
        if (micStream) {
            micStream.getTracks().forEach(track => track.stop());
            micStream = null;
        }
        if (micBtn) {
            micBtn.classList.remove("active");
            micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> মাইকে ফু দিয়ে নেভাও';
        }
        if (micStatus) {
            micStatus.textContent = "";
        }
    }

    function startMicrophone() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            if (micStatus) micStatus.textContent = "আপনার ব্রাউজারে মাইক্রোফোন সাপোর্ট নেই।";
            return;
        }

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                micStream = stream;
                isMicActive = true;
                if (micBtn) {
                    micBtn.classList.add("active");
                    micBtn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i> শুনছি... এখন জোরে ফু দাও! 🎙️';
                }
                if (micStatus) {
                    micStatus.textContent = "মাইক্রোফোনের কাছে মুখ নিয়ে জোরে ফু দেও 💨";
                }

                if (!audioCtx) initAudioContext();
                const source = audioCtx.createMediaStreamSource(stream);
                micAnalyser = audioCtx.createAnalyser();
                micAnalyser.fftSize = 256;
                source.connect(micAnalyser);

                const dataArray = new Uint8Array(micAnalyser.frequencyBinCount);

                let blowSequence = 0;
                let lastBlowTime = 0;

                function detectBlow() {
                    if (!isMicActive) return;

                    micAnalyser.getByteFrequencyData(dataArray);

                    // Average volume
                    let sum = 0;
                    for (let i = 0; i < dataArray.length; i++) {
                        sum += dataArray[i];
                    }
                    const averageVolume = sum / dataArray.length;

                    // Blow detection threshold
                    const now = Date.now();
                    if (averageVolume > 48 && now - lastBlowTime > 350) {
                        lastBlowTime = now;
                        if (blowSequence < candles.length) {
                            blowCandle(blowSequence, candles[blowSequence]);
                            blowSequence++;
                        }
                    }

                    if (blowSequence >= candles.length) {
                        if (micStatus) micStatus.textContent = "সব মোমবাতি নিভে গেল! 🎂💨";
                        setTimeout(stopMicrophone, 1500);
                    } else {
                        micAnimationFrameId = requestAnimationFrame(detectBlow);
                    }
                }

                detectBlow();
            })
            .catch(err => {
                console.error("Mic error:", err);
                if (micStatus) micStatus.textContent = "মাইক্রোফোন অনুমতি দেওয়া হয়নি বা পাওয়া যায়নি। 'ক্লিকে মোমবাতি নেভাও' বাটনে ক্লিক করতে পারো!";
                if (micBtn) micBtn.classList.remove("active");
            });
    }

    if (micBtn) {
        micBtn.addEventListener("click", () => {
            if (isMicActive) {
                stopMicrophone();
            } else {
                startMicrophone();
            }
        });
    }
}

// ================= WEB AUDIO API MUSIC BOX =================
let audioCtx = null;
let delayNode = null;
let isPlaying = false;
let melodyIndex = 0;
let playTimeout = null;

const notes = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00,
    'AS4': 466.16, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46,
    'G5': 783.99, 'A5': 880.00
};

const birthdayMelody = [
    { note: 'C4', dur: 350 }, { note: 'C4', dur: 150 }, { note: 'D4', dur: 500 },
    { note: 'C4', dur: 500 }, { note: 'F4', dur: 500 }, { note: 'E4', dur: 1000 },
    
    { note: 'C4', dur: 350 }, { note: 'C4', dur: 150 }, { note: 'D4', dur: 500 },
    { note: 'C4', dur: 500 }, { note: 'G4', dur: 500 }, { note: 'F4', dur: 1000 },
    
    { note: 'C4', dur: 350 }, { note: 'C4', dur: 150 }, { note: 'C5', dur: 500 },
    { note: 'A4', dur: 500 }, { note: 'F4', dur: 500 }, { note: 'E4', dur: 500 }, { note: 'D4', dur: 1000 },
    
    { note: 'AS4', dur: 350 }, { note: 'AS4', dur: 150 }, { note: 'A4', dur: 500 },
    { note: 'F4', dur: 500 }, { note: 'G4', dur: 500 }, { note: 'F4', dur: 1200 }
];

function initAudioContext() {
    if (audioCtx) return;
    
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    delayNode = audioCtx.createDelay(1.0);
    delayNode.delayTime.value = 0.35;
    
    const feedbackGain = audioCtx.createGain();
    feedbackGain.gain.value = 0.35;
    
    delayNode.connect(feedbackGain);
    feedbackGain.connect(delayNode);
    delayNode.connect(audioCtx.destination);
}

function playBlowSound() {
    if (!audioCtx) initAudioContext();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const bufferSize = audioCtx.sampleRate * 0.35;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = buffer;

    const filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'bandpass';
    filterNode.Q.value = 2.0;
    
    filterNode.frequency.setValueAtTime(900, audioCtx.currentTime);
    filterNode.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseNode.start();
}

function playChime(freq, durationMs) {
    if (!audioCtx) initAudioContext();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (durationMs / 1000) * 1.5);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    gainNode.connect(delayNode);
    
    osc.start();
    osc.stop(audioCtx.currentTime + (durationMs / 1000) * 2.0);
}

function playNextNote() {
    if (!isPlaying) return;

    const noteObj = birthdayMelody[melodyIndex];
    const freq = notes[noteObj.note];
    
    playChime(freq, noteObj.dur);

    const totalDelay = noteObj.dur + 120;
    melodyIndex = (melodyIndex + 1) % birthdayMelody.length;
    
    playTimeout = setTimeout(playNextNote, totalDelay);
}

function initMusicBox() {
    const musicBtn = document.getElementById("music-btn");
    
    if (!musicBtn) return;

    musicBtn.addEventListener("click", () => {
        initAudioContext();

        if (isPlaying) {
            isPlaying = false;
            clearTimeout(playTimeout);
            musicBtn.innerHTML = '<i class="fa-solid fa-play"></i> <span id="music-btn-text">Play Music</span>';
            musicBtn.classList.remove("playing");
        } else {
            isPlaying = true;
            musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i> <span id="music-btn-text">Pause Music</span>';
            musicBtn.classList.add("playing");
            playNextNote();
        }
    });
}

// ================= LUXURY REAL FULJHURI (CLICK SPARKLER) EFFECT =================
function initClickSparkles() {
    const sparklerColors = ['#ffd700', '#ffb703', '#ffffff', '#ff4d6d', '#ff758f', '#ffe082', '#c084fc'];
    const sparkSymbols = ['✦', '★', '✨', '•', '⋆'];

    document.addEventListener("click", (e) => {
        const surprise = document.getElementById("surprise-screen");
        if (surprise && !surprise.classList.contains("fade-out")) return;
        
        if (e.target.closest("button") || e.target.closest("#envelope-card") || e.target.closest(".gift-box-wrapper")) return;

        const x = e.pageX;
        const y = e.pageY;

        // 1. Center Flash Light Core
        const core = document.createElement("div");
        core.className = "sparkler-core";
        core.style.left = `${x}px`;
        core.style.top = `${y}px`;
        document.body.appendChild(core);
        setTimeout(() => core.remove(), 550);

        // 2. Realistic Radiating Fuljhuri Sparks (14 sparks bursting in 360 degrees)
        const sparkCount = 14;
        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement("span");
            spark.className = "real-sparkler-spark";
            
            // Random angle and realistic deceleration distance
            const angle = (i * (360 / sparkCount) + (Math.random() * 24 - 12)) * (Math.PI / 180);
            const distance = Math.random() * 50 + 35; // 35px - 85px outward
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            
            const color = sparklerColors[Math.floor(Math.random() * sparklerColors.length)];
            const symbol = sparkSymbols[Math.floor(Math.random() * sparkSymbols.length)];
            
            spark.textContent = symbol;
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            spark.style.color = color;
            spark.style.fontSize = (Math.random() * 8 + 12) + 'px';
            spark.style.setProperty('--dx', `${dx}px`);
            spark.style.setProperty('--dy', `${dy}px`);
            
            document.body.appendChild(spark);

            setTimeout(() => {
                spark.remove();
            }, 850);
        }
    });
}

// ================= COMPLIMENT / VIBE GENERATOR =================
function initVibeGenerator() {
    const vibeBtn = document.getElementById("vibe-btn");
    const vibeDisplay = document.getElementById("vibe-display");
    
    if (!vibeBtn || !vibeDisplay) return;

    const messages = [
        "তুমি যেখানেই যাও, তোমার হাসির মাধ্যমে আলো ছড়িয়ে দাও। সবসময় এভাবে হাসতে থেকো! 😊🌸",
        "তোমার মতো একজন সুন্দর মনের মানুষ জীবনে থাকা আসলেই ভাগ্যের ব্যাপার। শুভ জন্মদিন শিমরান! 💖",
        "নতুন এই বছরটি তোমার জীবনে নিয়ে আসুক অফুরন্ত আনন্দ, সাফল্য আর চমৎকার সব স্মৃতি! 🌟",
        "তোমার সরলতা আর ব্যক্তিত্ব সত্যিই প্রশংসনীয়। সবসময় নিজের মতো মিষ্টি ও অনন্য থেকো! ✨",
        "আজকের এই বিশেষ দিনে তোমার সব সুন্দর ইচ্ছেগুলো সত্যি হয়ে উঠুক! 🎂🎈",
        "তোমার জীবন হোক রঙধনুর মতো রঙিন আর অফুরন্ত সুখে ভরপুর। শুভ জন্মদিন শিমরান! 🌈",
        "শিমরান, তোমার ভেতরের সৌন্দর্য তোমার বাইরের রূপের মতোই অতুলনীয়। Happy Birthday, My Love! 💫"
    ];

    let lastIndex = -1;

    vibeBtn.addEventListener("click", () => {
        let randomIndex = Math.floor(Math.random() * messages.length);
        while (randomIndex === lastIndex) {
            randomIndex = Math.floor(Math.random() * messages.length);
        }
        lastIndex = randomIndex;

        vibeDisplay.textContent = messages[randomIndex];
        vibeDisplay.style.animation = 'none';
        void vibeDisplay.offsetWidth;
        vibeDisplay.style.animation = 'fadeInScale 0.5s ease-out forwards';
        
        confetti({
            particleCount: 15,
            spread: 45,
            origin: { y: 0.85 },
            colors: ['#ffb7b2', '#ffd5c2', '#e8c5ff']
        });
    });
}
