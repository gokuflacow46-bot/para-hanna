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

    if (sectionId === 'main') {
        document.getElementById('main-screen').classList.add('active-screen');
    } else if (sectionId === 'canciones') {
        document.getElementById('canciones-section').classList.add('active-screen');
    } else if (sectionId === 'cosas-amo') {
        document.getElementById('cosas-amo-section').classList.add('active-screen');
    } else if (sectionId === 'personajes') {
        document.getElementById('personajes-section').classList.add('active-screen');
    } else if (sectionId === 'carta') {
        document.getElementById('carta-section').classList.add('active-screen');
    }
}

// Botón Entrar inicial
document.getElementById('entrar-btn').addEventListener('click', () => {
    playClickSound();
    document.getElementById('inicio-screen').classList.remove('active-screen');
    document.getElementById('main-screen').classList.add('active-screen');
});

// Secuencia de Salida con Animación y Transición de Spidey
function triggerExit() {
    playClickSound();
    document.getElementById('main-screen').classList.remove('active-screen');
    document.getElementById('exit-screen').classList.add('active-screen');

    const duo = document.getElementById('spidey-dp-duo');
    
    duo.style.top = '-400px';
    document.getElementById('spidey-solo').style.display = 'none';
    document.getElementById('dp-solo').style.display = 'none';
    document.getElementById('spidey-sentado').style.display = 'none';
    document.getElementById('spidey-bubble').style.display = 'none';
    document.getElementById('deadpool-bubble').style.display = 'none';
    duo.style.display = 'block';

    setTimeout(() => {
        duo.style.top = '25px'; 
    }, 100);

    setTimeout(() => {
        duo.style.display = 'none';
        document.getElementById('spidey-solo').style.display = 'block';
        document.getElementById('dp-solo').style.display = 'block';
        document.getElementById('spidey-bubble').style.display = 'block';
    }, 1900); 

    setTimeout(() => {
        document.getElementById('spidey-solo').style.display = 'none';
        document.getElementById('spidey-bubble').style.display = 'none';
        
        document.getElementById('spidey-sentado').style.display = 'block';
        document.getElementById('deadpool-bubble').style.display = 'block';
    }, 5500); 
}

// Abrir carta de Deadpool
function openLetter() {
    playClickSound();
    const letter = document.getElementById('letter-content');
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

// Reproductor de canciones con la ruta exacta a la carpeta "Audios"
function playSong(num) {
    playClickSound();

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    const fileName = songFiles[num];
    if (!fileName) return;

    currentAudio = new Audio(`Audios/${fileName}`);
    
    currentAudio.play().catch(error => {
        console.log("No se pudo reproducir automáticamente:", error);
        alert(`No se encontró el archivo '${fileName}' en la carpeta Audios.`);
    });
      }
      
