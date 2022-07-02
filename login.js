if(localStorage.getItem('login'))
{
    location.replace('dashboard.html')
}
else{
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const cartelError = document.getElementById('cartelError');
    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.addEventListener('click' ,async(e)=>{
        e.preventDefault()
        localStorage.setItem('login' , true)
;        if(await peticionFetch()){      
            cartelError.classList = "correcto";
            setTimeout(() => {
                location.replace('dashboard.html')
            }, 1500);
        }
        else{
            cartelError.classList = "error";
            setTimeout(() => {
                cartelError.classList = "hidden";
            }, 1200);
        }
    })
    async function peticionFetch(){
        try {    
            const resp = await fetch("https://basic-server-one.vercel.app/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: `${txtEmail.value}`,
                    password: `${txtPassword.value}`
                })
            })
            const data =await resp.json();
            if(data.success == false)throw new Error('Los datos no son validos');        
            cartelError.innerHTML = "INICIANDO";
            return true;
        } catch (error) {
            cartelError.innerHTML = error;
            return false;
        }
    }
}