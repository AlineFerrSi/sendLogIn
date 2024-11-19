// Seletores
const checkbox = document.querySelector('.rememberPassword');
const formLogIn = document.querySelector('.formLogIn');

const createAcont = document.querySelector('.createAcont');
const returnLogIn = document.querySelectorAll('.returnLogIn');
const containerRegister = document.querySelector('.container-register');
const containerLogIn = document.querySelector('.container-logIn');

const containerRecover = document.querySelector('.container-recoverPassword');
const recoverPassword = document.querySelector('.recoverPassword');

const formRecoverPassword = document.querySelector('.formRecoverPassword');

const formCreateLogIn = document.querySelector('.formCreateLogIn');
const usuariosExistentes = JSON.parse(localStorage.getItem("usuarios")) || [];

// Recupera os dados do localStorage ao carregar a página
window.addEventListener('load', () => {
    const savedUser = JSON.parse(localStorage.getItem("remember"));

    if (savedUser) {
        formLogIn.elements[0].value = savedUser.userEmail; // Preenche o email
        formLogIn.elements[1].value = savedUser.userPassword; // Preenche a senha
        checkbox.checked = true; // Marca o checkbox
    }
});

// Fazer LogIn Na Conta
formLogIn.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const userEmail = event.target.elements[0].value;
    const userPassword = event.target.elements[1].value;

    const userInformationLogIn = {
        email: userEmail,
        password: userPassword,
    };

    userExiste(userInformationLogIn); // Verifica se o usuário existe

    // Se o checkbox estiver marcado, salva no localStorage
    if (checkbox.checked) {
        const rememberUser = {
            userEmail: userEmail,
            userPassword: userPassword,
        };

        localStorage.setItem("remember", JSON.stringify(rememberUser));
    }
});

// Monitorar mudanças no checkbox
checkbox.addEventListener("change", () => {
    if (!checkbox.checked) {
        // Remove os valores salvos do localStorage
        localStorage.removeItem("remember");

        // Limpa os valores dos inputs
        formLogIn.elements[0].value = "";
        formLogIn.elements[1].value = "";
    }
});

// Botão de Não Tenho Uma Conta Cadastrar-me
createAcont.addEventListener("click", () => {
    containerRegister.style.display = 'block';
    containerLogIn.style.display = 'none';
});

// Retornar ao Login Inicial
returnLogIn.forEach((element)=> {
    element.addEventListener("click", () => {
        containerRegister.style.display = 'none';
        containerLogIn.style.display = 'block';
        containerRecover.style.display = 'none';
    });
});


// Recuperar Senha
recoverPassword.addEventListener("click", () => {
    containerRecover.style.display = 'block';
    containerRegister.style.display = 'none';
    containerLogIn.style.display = 'none';
});

// Criar uma Conta
formCreateLogIn.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = event.target.elements[0].value;
    const user = event.target.elements[1].value;
    const email = event.target.elements[2].value;
    const password = event.target.elements[3].value;

    const createNewCont = {
        name: name,
        user: user,
        email: email,
        password: password,
    };

    usuariosExistentes.push(createNewCont); // Adiciona ao array
    localStorage.setItem("usuarios", JSON.stringify(usuariosExistentes)); // Salva no localStorage

    // Limpa os campos do formulário
    event.target.elements[0].value = "";
    event.target.elements[1].value = "";
    event.target.elements[2].value = "";
    event.target.elements[3].value = "";

    alert('Usuário cadastrado! Faça Login.');
});

// Verificar se o Usuário está cadastrado
function userExiste(userLogIn) {
    const usuarioEncontrado = usuariosExistentes.find(
        (el) => el.email === userLogIn.email && el.password === userLogIn.password
    );

    if (usuarioEncontrado) {
        alert("Parabéns, você fez LogIn na Página");
    } else {
        alert("Usuário ainda não cadastrado, clique em cadastrar.");
    }
}

// Esqueci A senha

formRecoverPassword.addEventListener("submit", (event) => {
    event.preventDefault();
    alert(`Nova Senha Enviada no Email`+ event.target.elements[0].value )
})
