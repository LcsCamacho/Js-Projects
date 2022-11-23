//funcoes para as teclas digitadas
const teclas = {
    KeyQ: () => { 
        const key01 = new Audio('./sounds/key01.ogg');
        playSound(key01);
    },
    KeyW: () => { 
        const key02 = new Audio('./sounds/key02.ogg');
        playSound(key02);
    },
    KeyE: () => { 
        const key03 = new Audio('./sounds/key03.ogg');
        playSound(key03);
    },
    KeyR: () => { 
        const key04 = new Audio('./sounds/key04.ogg');
        playSound(key04);
    },
    KeyT: () => { 
        const key05 = new Audio('./sounds/key05.ogg');
        playSound(key05);
    },
    KeyY: () => { 
        const key06 = new Audio('./sounds/key06.ogg');
        playSound(key06);
    },
    KeyU: () => { 
        const key07 = new Audio('./sounds/key07.ogg');
        playSound(key07);
    },
    KeyI: () => { 
        const key08 = new Audio('./sounds/key08.ogg');
        playSound(key08);
    },
    KeyO: () => { 
        const key09 = new Audio('./sounds/key09.ogg');
        playSound(key09);
    },
    KeyP: () => { 
        const key10 = new Audio('./sounds/key10.ogg');
        playSound(key10);
    },
    KeyA: () => { 
        const key11 = new Audio('./sounds/key11.ogg');
        playSound(key11);
    },
    KeyS: () => { 
        const key12 = new Audio('./sounds/key12.ogg');
        playSound(key12);
    },
    KeyD: () => { 
        const key13 = new Audio('./sounds/key13.ogg');
        playSound(key13);
    },
    KeyF: () => { 
        const key14 = new Audio('./sounds/key14.ogg');
        playSound(key14);
    },
    KeyG: () => { 
        const key15 = new Audio('./sounds/key15.ogg');
        playSound(key15);
    },
    KeyH: () => { 
        const key16 = new Audio('./sounds/key16.ogg');
        playSound(key16);
    },
    KeyJ: () => { 
        const key18 = new Audio('./sounds/key18.ogg');
        playSound(key18);
    },
    KeyK: () => { 
        const key19 = new Audio('./sounds/key19.ogg');
        playSound(key19);
    },

}

//executa o som
function playSound(sound) {
    sound.play();
}

//evento para buscar a tecla pressionada e executar ao som
document.body.addEventListener('keyup', (e) => {
    //busca a tecla no objeto e executa a funcao
    const keypress = teclas[e.code];
    if(keypress){
        keypress(e.code);
    }
    const keyActive = document.querySelector(`#${e.code.toLowerCase()}`)
    keyActive.classList.add('active')
    setTimeout(()=>{
        keyActive.classList.remove('active')
    },100)

})

//executar a composicao
const btnTocar = document.querySelector('#tocar');
btnTocar.addEventListener('click' , () => {

    //guarda a composição
    const composition = document.querySelector('#composicao').value.split('');
    console.log(composition);
    playComposition(composition);
})

//faz referencia das letras digitadas com o objeto que contem os audios para execução das funcoes
function playComposition(vetorTeclas) {
    let delay = 0;

    for(let i = 0; i < vetorTeclas.length ; i++) {
        setTimeout(()=>{
            const comp = teclas[vetorTeclas[i].replace(vetorTeclas[i],`Key${vetorTeclas[i].toUpperCase()}` )]
            if(comp){
                comp(vetorTeclas[i].replace(vetorTeclas[i],`Key${vetorTeclas[i].toUpperCase()}`))
            }          
            const keyActive = document.querySelector(`#key${vetorTeclas[i].toLowerCase()}`)
            keyActive.classList.add('active')
            setTimeout(()=>{
                keyActive.classList.remove('active')
            },100)
        }, delay);

        delay += 350;
    }
}

//evento de clique para tocar som e animação
teclado = document.querySelectorAll('.key').forEach(tecla => {
    tecla.addEventListener('click', () =>{
        const comp =  teclas[ `Key${tecla.innerText}` ]
        if(comp){
            comp(`Key${tecla.innerText}`)
        }
        const keyActive = document.querySelector(`#key${tecla.innerText.toLowerCase()}`)
        keyActive.classList.add('active')
        setTimeout(()=>{
            keyActive.classList.remove('active')
        },100)
    });
});

