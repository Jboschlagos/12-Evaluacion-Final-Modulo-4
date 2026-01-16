class UserManager {
  constructor() {
    this.users = [];
    this.tabla = document.getElementById("tablaUsuarios");
    this.detalle = document.getElementById("detalle");
    this.busqueda = document.getElementById("busqueda");
    this.orden = document.getElementById("orden");
    this.botones = document.querySelectorAll("button");
    this.desactivarBotones();

    this.cargarUsuarios();
    this.eventos();
  }

  cargarUsuarios() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

    xhr.onload = () => {
      if (xhr.status === 200) {
        this.users = JSON.parse(xhr.responseText);

        // quitar mensaje de carga
        this.detalle.innerHTML = `
            <p class="text-muted">Datos cargados. Seleccione una acción.</p>
        `;

        this.activarBotones();
      }
    };

    xhr.send();
  }

  eventos() {
    document.getElementById("btnListar").onclick = () =>
      this.listarUsuarios(this.users);
    document.getElementById("btnBasica").onclick = () => this.infoBasica();
    document.getElementById("btnDireccion").onclick = () => this.direccion();
    document.getElementById("btnAvanzada").onclick = () => this.infoAvanzada();
    document.getElementById("btnCompanias").onclick = () => this.companias();
    document.getElementById("btnOrdenar").onclick = () => this.ordenar();
    document.getElementById("btnLimpiar").onclick = () => this.limpiarDetalle();

    this.busqueda.addEventListener("input", () => this.filtrar());
  }

  desactivarBotones() {
    this.botones.forEach((b) => (b.disabled = true));
  }

  activarBotones() {
    this.botones.forEach((b) => (b.disabled = false));
  }

  pedirUsuario() {
    const nombre = prompt("Ingrese el nombre del usuario");
    if (!nombre) return null;

    const user = this.users.find(
      (u) => u.name.toLowerCase() === nombre.toLowerCase()
    );

    if (!user) {
      alert("Usuario no encontrado");
      return null;
    }
    return user;
  }

  // 1
  listarUsuarios(lista) {
    this.tabla.innerHTML = "";
    lista.forEach((u) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td><span class="id-badge">${u.id}</span></td>
                <td>${u.name}</td>
            `;
      this.tabla.appendChild(tr);
    });
  }

  // 2
  infoBasica() {
    const u = this.pedirUsuario();
    if (!u) return;

    console.log(u.username, u.email);
    this.detalle.innerHTML = `
            <h5>${u.name}</h5>
            <p><strong>Username:</strong> ${u.username}</p>
            <p><strong>Email:</strong> ${u.email}</p>
        `;
  }

  // 3
  direccion() {
    const u = this.pedirUsuario();
    if (!u) return;

    console.log(u.address);
    this.detalle.innerHTML = `
            <h5>Dirección</h5>
            <p>${u.address.street}, ${u.address.suite}</p>
            <p>${u.address.city}</p>
            <p>${u.address.zipcode}</p>
        `;
  }

  // 4
  infoAvanzada() {
    const u = this.pedirUsuario();
    if (!u) return;

    console.log(u.phone, u.website, u.company);
    this.detalle.innerHTML = `
            <h5>Información avanzada</h5>
            <p><strong>Teléfono:</strong> ${u.phone}</p>
            <p><strong>Web:</strong> ${u.website}</p>
            <p><strong>Compañía:</strong> ${u.company.name}</p>
            <small>${u.company.catchPhrase}</small>
        `;
  }

  // 5
  companias() {
    this.detalle.innerHTML = "<h5>Compañías</h5>";
    this.users.forEach((u) => {
      console.log(u.company.name, u.company.catchPhrase);
      this.detalle.innerHTML += `
                <p><strong>${u.company.name}</strong><br>
                <small>${u.company.catchPhrase}</small></p>
            `;
    });
  }

  // 6
  ordenar() {
    const ordenados = [...this.users].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    this.listarUsuarios(ordenados);
  }

  limpiarDetalle() {
    this.detalle.innerHTML = `
        <p class="text-muted">Seleccione una opción</p>
    `;
  }

  filtrar() {
    const texto = this.busqueda.value.toLowerCase();
    const filtrados = this.users.filter((u) =>
      u.name.toLowerCase().includes(texto)
    );
    this.listarUsuarios(filtrados);
  }
}

new UserManager();
