document.addEventListener("DOMContentLoaded", function () {
  console.log("Script cargado correctamente.");
});

function crearPetalos() {
  const container = document.getElementById("petalos-container");

  for (let i = 0; i < 20; i++) {
    // Número de pétalos
    let petal = document.createElement("div");
    petal.classList.add("petal");

    // Posición aleatoria
    petal.style.left = Math.random() * window.innerWidth + "px";

    // Retraso aleatorio para que no caigan al mismo tiempo
    petal.style.animationDelay = Math.random() * 2 + "s";

    container.appendChild(petal);

    // Eliminar pétalos después de la animación
    setTimeout(() => petal.remove(), 10000);
  }
}

function calcularRegalo() {
  let relacion = document.getElementById("relacion").value;
  let personalidad = document.getElementById("personalidad").value;
  let resultado = document.getElementById("resultado");

  let mensaje = "";

  if (relacion === "pareja") {
    if (personalidad === "romantica") {
      mensaje =
        "❤️ Regálale un ramo de <strong>rosas rojas</strong> con una carta personalizada. 🌹";
    } else if (personalidad === "alegre") {
      mensaje =
        "🌻 Un <strong>ramo de girasoles</strong> y chocolates sería perfecto. 🍫";
    } else {
      mensaje =
        "🍽️ Una <strong>orquídea elegante</strong> junto con una cena especial. 🌺";
    }
  } else if (relacion === "amigo") {
    mensaje =
      "🎁 Un <strong>ramo colorido</strong> o una planta decorativa sería ideal. 🌿";
  } else {
    mensaje =
      "🎀 Para un familiar, una <strong>planta que pueda cuidar</strong> es una gran idea. 🌱";
  }

  // Crear efecto de pétalos antes de mostrar resultado
  crearPetalos();

  // Mostrar resultado con retraso para que los pétalos caigan primero
  setTimeout(() => {
    resultado.classList.remove("d-none", "fade", "show");
    resultado.innerHTML = `<p class="m-0">${mensaje}</p>`;
    resultado.classList.add("alert", "alert-success", "fade", "show");
  }, 1000); // 1 segundo de retraso
}
function generarTarjeta() {
  let nombre = document.getElementById("nombre").value || "Anónimo";
  let pareja = document.getElementById("pareja").value || "Mi amor";
  let mensaje = document.getElementById("mensaje").value || "Te amo mucho 💖";
  let cancion = document.getElementById("cancion").value;
  let fondoUrl = document.getElementById("fondo-url").value;
  let fondoFile = document.getElementById("fondo-file").files[0];

  if (!cancion) {
    alert("Por favor, ingresa un enlace de canción.");
    return;
  }

  document.getElementById("nombrePareja").innerText = pareja;
  document.getElementById("mensajeTexto").innerText = mensaje;
  document.getElementById("nombreRemitente").innerText = nombre;
  document.getElementById("tarjeta").classList.remove("d-none");
  document.getElementById("btn-descargar").classList.remove("d-none");

  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: cancion,
    width: 100,
    height: 100,
  });

  if (fondoFile) {
    let reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById(
        "tarjeta"
      ).style.backgroundImage = `url('${e.target.result}')`;
    };
    reader.readAsDataURL(fondoFile);
  } else if (fondoUrl) {
    document.getElementById(
      "tarjeta"
    ).style.backgroundImage = `url('${fondoUrl}')`;
  } else {
    document.getElementById("tarjeta").style.backgroundImage = "none";
  }
}

function descargarTarjeta() {
  let tarjeta = document.getElementById("tarjeta");

  html2canvas(tarjeta).then((canvas) => {
    let link = document.createElement("a");
    link.download = "tarjeta_amor.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
document.addEventListener("DOMContentLoaded", function () {
  let hoy = new Date();
  let mesActual = hoy.getMonth() + 1; // En JS los meses van de 0 a 11, por eso sumamos 1

  document.querySelectorAll(".fecha").forEach((card) => {
    let mesFecha = parseInt(card.getAttribute("data-mes"));

    if (mesFecha < mesActual) {
      card.classList.add("fecha-pasada");
      card.innerHTML += " ❌";
    } else if (mesFecha === mesActual) {
      card.classList.add("fecha-proxima");
    }
  });
});
