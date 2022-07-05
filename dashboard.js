if(localStorage.getItem('login') == 'false'){
    location.replace('login.html')
}
else{
    async function getFetch(){
        const resp = await fetch("https://basic-server-one.vercel.app/users");
        const {data} = await resp.json();
        return data;
    }   
    async function registrarDatosEnTabla(){
        const registros = await getFetch();
        const tablaBody = document.getElementsByTagName('tbody')[0];
        registros.map((registro)=>{
            const tablaRow = document.createElement('tr');
            const tdId = document.createElement('td');
            const tdNombre = document.createElement('td');
            const tdUser = document.createElement('td');
            const tdEmail = document.createElement('td');
            tdId.innerHTML = registro.id;
            tdNombre.innerHTML = registro.name;
            tdUser.innerHTML = registro.username;
            tdEmail.innerHTML = registro.email;
            tablaRow.appendChild(tdId);
            tablaRow.appendChild(tdNombre);
            tablaRow.appendChild(tdUser);
            tablaRow.appendChild(tdEmail);
            tablaBody.appendChild(tablaRow)
        })
    }
    function logout(){
        localStorage.setItem('login' , false);
        const cartelLogout = document.getElementsByClassName('cartelLogout')[0];
        cartelLogout.classList.toggle('hidden');
        cartelLogout.style.pointerEvents = 'auto';
        setTimeout(() => {
            location.replace('login.html')
        }, 1500);
    }
    const btnLogout = document.getElementById('btnLogout');
    btnLogout.addEventListener('click', logout)
    registrarDatosEnTabla();
}