import { getUsers } from "./llamados.js"

const usuario = document.getElementById("usuario")
const contrasena = document.getElementById("contrasena")
const btnIngresar = document.getElementById("btnIngresar")
const btnRegistrarse = document.getElementById("btnRegistrarse")



async function ingresar() {
    const datosUsuarios= await getUsers("usuarios")
    datosUsuarios.forEach(item => {
       console.log(item);
       btnIngresar.addEventListener("click", async function () {
          if (item.id ===  usuario.value &&  item.contrasena === contrasena.value && item.rol != "admin") {
            Swal.fire({
              title: "Usuario y Contraseña correctos!",
              icon: "success",
              draggable: true
            });
            localStorage.setItem("idUsuario",item.id)
            localStorage.setItem("nombreUsuario",item.nombre)
            setTimeout(() => {
              window.location.href= "consultas.html"
            }, 2000);
            return
         }else if (item.id ===  usuario.value &&  item.contrasena === contrasena.value && item.rol === "admin") {
          Swal.fire({
            title: "Usuario y Contraseña correctos!",
            icon: "success",
            draggable: true
          });
          setTimeout(() => {
            window.location.href= "admin.html"
          }, 2000);
          return
         }else{
          Swal.fire({
            title: "Usuario y Contraseña incorrectos!",
            icon: "error",
            draggable: true
          });
         }
       })
      
    });
}
btnRegistrarse.addEventListener("click", async function () {
    const { value: formValues } = await Swal.fire({
        title: "Registrarse",
        html: `
            <label>Nombre de usuario</label>
          <input id="swal-input1" class="swal2-input"><br>
          <label>Contraseña</label><br>

          <input id="swal-input2" class="swal2-input">
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ];
        }
      });
      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
      }
})
ingresar()