if(localStorage.getItem('login') == 'false'){
    location.replace('login.html')
}
else{
    async function getFetch(){
        try {
            const resp = await fetch("https://basic-server-one.vercel.app/users");
            const data = await resp.json();
            if(data.error != false){
                throw new Error('Error en la peticion fetch');
            }
            const {data: registros} = data; 
            return registros;
        } catch (error) {
            console.log('Error en Fetch:' , error);
        }
    }   

    async function registrarDatosEnTabla(){
        try {
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
        } catch (error) {
            console.log('Error Registrar en Tabla:', error);
        }
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


