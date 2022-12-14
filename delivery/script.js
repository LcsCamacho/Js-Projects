
const andamentoCards = document.querySelector('.andamentoCards')
const entregueCards = document.querySelector('.entregueCards')
const inputEndereco = document.querySelector('#inputEndereco')
const inputClient = document.querySelector('#inputClient')
const inputProduct = document.querySelector('#productsOptions option')
const userId = {
    userId: ''
}
const listaPedidosAndamento = []
const listaPedidosEntregue = []
var id = 0;
const firebaseConfig = {
    apiKey: "AIzaSyCRFxXX6kNg1xZ6Vi3BrfyvKcTMCO85UHY",
    authDomain: "delivery-4ac2a.firebaseapp.com",
    projectId: "delivery-4ac2a",
    storageBucket: "delivery-4ac2a.appspot.com",
    messagingSenderId: "640690523731",
    appId: "1:640690523731:web:39c2eccf971a6f6cd980a6",
    measurementId: "G-3HBGF5H04G"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

//logar
function signIn() {
    auth.signInWithPopup(provider);
    auth.onAuthStateChanged((doc) => {
        if (doc) {
            userId.userId = doc.uid
            meusPedidos()
            mostraPedidosAndamento()
            pedidosEntregues()
            const btnPedido = document.querySelector('#btnPedido')
            btnPedido.addEventListener('click', lancaPedido)
        }
    })
}

async function meusPedidos() {
    const meusPedidos = await firebase.firestore()
        .collection('EntregasAndamento')
        .where('userId', '==', userId.userId)
        .orderBy('createdAt', 'asc')
        .get()
    console.log("id", userId.userId)
    console.log(meusPedidos.docs)
}


//envia pedido ao firestore
function lancaPedido() {
    const data = {
        id: id++,
        endereco: inputEndereco.value,
        nome: inputClient.value,
        produto: inputProduct.value,
        createdAt: new Date(),
        userId: userId.userId
    }
    firestore.collection("EntregasAndamento").add(data)
};

//recebe os pedidos do firestore em tempo real sempre que atualiza o bd
async function mostraPedidosAndamento() {
    await firestore.collection("EntregasAndamento").onSnapshot((data) => {
        andamentoCards.innerText = ''
        var newListaPedidosAndamento = listaPedidosAndamento.splice(0)
        data.docs.map((doc) => {
            const data = {
                id: id++,
                endereco: doc.data().endereco,
                nome: doc.data().nome,
                produto: doc.data().produto,
                createdAt: doc.data().createdAt,
                userId: userId.userId
            }
            newListaPedidosAndamento.push(data)
            const idPedido = doc.id
            const card = document.createElement('div')
            card.className = 'cardEntrega'
            const cardContent = document.createElement('div')
            cardContent.className = 'cardContent'
            cardContent.innerHTML = `
            <div class="del" onclick="removePedido('${idPedido}','EntregasAndamento')">X</div>
            <p id="address">${doc.data().endereco}</p>
            <hr>
            <p id="nome">${doc.data().nome}</p>
            <hr>
            <p id="prod">${doc.data().produto}</p>
            <hr>
            <button id="btnEntregue" 
            onclick="removeCard(this)
            addToPedidosEntregues(this)">Entregue</button>
            `
            card.appendChild(cardContent)
            andamentoCards.appendChild(card)
        })
    });

}


function addToPedidosEntregues(e) {
    const data = {
        id: id++,
        endereco: e.parentNode.childNodes[3].textContent,
        nome: e.parentNode.childNodes[7].textContent,
        produto: e.parentNode.childNodes[11].textContent,
        createdAt: new Date(),
        userId: userId.userId
    }
    listaPedidosEntregue.push(data)
    firestore.collection("EntregasFeitas")
        .add(data)
        .catch((err) => {
            console.log("erro:", err)
        })
}

async function pedidosEntregues() {
    await firestore.collection("EntregasFeitas").onSnapshot((data) => {
        let clearList = ''
        entregueCards.innerText = clearList
        var newListaPedidosEntregue = listaPedidosEntregue.splice(0)
        data.docs.map((doc) => {
            const dadosPedido = {
                id: id++,
                endereco: doc.data().endereco,
                nome: doc.data().nome,
                produto: doc.data().produto,
                createdAt: doc.data().createdAt,
                userId: userId.userId
            }
            newListaPedidosEntregue.push(dadosPedido)
            const idPedido = doc.id
            const card = document.createElement('div')
            card.className = 'cardEntrega'
            const cardContent = document.createElement('div')
            cardContent.className = 'cardContent'
            cardContent.innerHTML = `
            <div class="del" onclick="removePedido('${doc.id}','EntregasFeitas')">X</div>
            <p id="address">Endereço: ${doc.data().endereco}</p>
            <hr>
            <p id="nome">Nome: ${doc.data().nome}</p>
            <hr>
            <p id="prod">Produto: ${doc.data().produto}</p>
            <hr>
            <button id="btnEntregue" 
            onclick="removeCard(this)
            finalizarPedido()">Entregue
            </button>
            `
            card.appendChild(cardContent)
            entregueCards.appendChild(card)
        })
    })
}


async function removePedido(id, collection) {
    await firestore.collection(collection).doc(id)
        .delete()
        .then(() => {
            alert("Deletado com sucesso")
        })
        .catch(err => console.log("erro :", err))
}

//utils
function removeCard(e) {
    e.parentNode
        .parentNode
        .parentNode
        .removeChild(e.parentNode.parentNode)
}
