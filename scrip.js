// Diccionario exacto con los nombres de tus archivos MP3 en orden
const songFiles = {
    1: "You_Rock_My_World.mp3",
    2: "La_Mujer_que_Bota_Fuego.mp3",
    3: "bésame_sin_sentir.mp3",
    4: "No_digas_nada.mp3",
    5: "Tienes_el_Don.mp3",
    6: "REINA_PEPIADA.mp3",
    7: "Eres.mp3",
    8: "Heaven_Can_Wait.mp3",
    9: "Labios_Rotos.mp3",
    10: "Can_t_Take_My_Eyes_Off_You.mp3",
    11: "Can_t_Help_Falling_in_Love.mp3",
    12: "SOLO_POR_VOS.mp3",
    13: "My_Kind_of_Woman.mp3",
    14: "this_is_what_falling_in_love_feels.mp3",
    15: "It_s_Been_a_Long_Long_Time.mp3"
};

let currentAudio = null;

// Reproductor de sonido estilo cómic para los clics
function playClickSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
    } catch(e) {}
}

// Control de navegación entre pantallas
function showSection(sectionId) {
    playClickSound();
    document.querySelectorAll('body > div').forEach(div => {
        div.classList.remove('active-screen');
    });

    const targetMap = {
        'main': 'main-screen',
        'canciones': 'canciones-section',
        'cosas-amo': 'cosas-amo-section',
        'personajes': 'personajes-section',
        'carta': 'carta-section'
    };

    const targetId = targetMap[sectionId];
    if (targetId) {
        const el = document.getElementById(targetId);
        if (el) el.classList.add('active-screen');
    }
}

// Configurar evento del botón inicial de forma segura al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    const entrarBtn = document.getElementById('entrar-btn');
    if (entrarBtn) {
        entrarBtn.addEventListener('click', () => {
            playClickSound();
            const inicioScreen = document.getElementById('inicio-screen');
            const mainScreen = document.getElementById('main-screen');
            if (inicioScreen) inicioScreen.classList.remove('active-screen');
            if (mainScreen) mainScreen.classList.add('active-screen');
        });
    }
});

// Secuencia de Salida con Animación y Transición de Spidey
function triggerExit() {
    playClickSound();
    const mainScreen = document.getElementById('main-screen');
    const exitScreen = document.getElementById('exit-screen');
    if (mainScreen) mainScreen.classList.remove('active-screen');
    if (exitScreen) exitScreen.classList.add('active-screen');

    const duo = document.getElementById('spidey-dp-duo');
    if (!duo) return;
    
    duo.style.top = '-400px';
    
    const spideySolo = document.getElementById('spidey-solo');
    const dpSolo = document.getElementById('dp-solo');
    const spideySentado = document.getElementById('spidey-sentado');
    const spideyBubble = document.getElementById('spidey-bubble');
    const dpBubble = document.getElementById('deadpool-bubble');

    if (spideySolo) spideySolo.style.display = 'none';
    if (dpSolo) dpSolo.style.display = 'none';
    if (spideySentado) spideySentado.style.display = 'none';
    if (spideyBubble) spideyBubble.style.display = 'none';
    if (dpBubble) dpBubble.style.display = 'none';
    
    duo.style.display = 'block';

    setTimeout(() => {
        duo.style.top = '25px'; 
    }, 100);

    setTimeout(() => {
        duo.style.display = 'none';
        if (spideySolo) spideySolo.style.display = 'block';
        if (dpSolo) dpSolo.style.display = 'block';
        if (spideyBubble) spideyBubble.style.display = 'block';
    }, 1900); 

    setTimeout(() => {
        if (spideySolo) spideySolo.style.display = 'none';
        if (spideyBubble) spideyBubble.style.display = 'none';
        
        if (spideySentado) spideySentado.style.display = 'block';
        if (dpBubble) dpBubble.style.display = 'block';
    }, 5500); 
}

// Abrir carta de Deadpool
function openLetter() {
    playClickSound();
    const letter = document.getElementById('letter-content');
    if (!letter) return;
    
    if (letter.style.display === 'block') {
        letter.style.display = 'none';
    } else {
        letter.style.display = 'block';
        letter.innerHTML = `<strong>Querida Hanna:</strong><br><br>
        Si estás leyendo esto, es porque quería plasmar en un lugar seguro algo que a veces los días rápidos no nos dejan decir con calma. Eres de esas personas que transforman todo lo que tocan, que hacen que la vida cotidiana tenga otra chispa y otro peso.<br><br>
        No te voy a decir que eres perfecta porque lo chido de ti es tu esencia real, tu forma genuina de ver el mundo, cómo defiendes lo tuyo con seguridad y cómo de la nada me haces sonreír con cualquier tontería. En este multiverso caótico, coincidir contigo ha sido de lo mejor que me ha pasado.<br><br>
        Te admiro un montón por cómo eres, por lo fuerte que andas siempre y por la paz que transmites sin darte cuenta. Pase lo que pase y vengan los retos que vengan, aquí voy a estar firme, apoyándote, aprendiendo de ti y celebrando cada logro que consigas.<br><br>
        Con todo mi cariño (y con el sello de aprobación de tu Spidey favorito detrás de esto):<br><br><b>¡Gracias por existir y por estar aquí, Hanna! ❤️</b>`;
    }
}

// Reproductor de canciones con soporte flexible de carpetas
function playSong(num) {
    playClickSound();

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    const fileName = songFiles[num];
    if (!fileName) return;

    currentAudio = new Audio(`audios/${fileName}`);
    
    currentAudio.play().catch(error => {
        console.log("Intentando ruta alternativa...", error);
        currentAudio = new Audio(`Audios/${fileName}`);
        currentAudio.play().catch(err => {
            console.log("No se pudo reproducir el archivo:", err);
        });
    });
}
