// ============================================================
// Jacky Flores y Detalles — Google Apps Script Backend
// ============================================================
// INSTRUCCIONES DE CONFIGURACIÓN:
//   1. Abrí este script desde tu Google Sheet
//   2. Ejecutá la función  inicializar()  una sola vez
//   3. Ejecutá testDrive() para autorizar Drive y crear la carpeta
//   4. Publicá como Web App → "Anyone" puede acceder
// ============================================================

// ── Menú personalizado en el Spreadsheet ────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🌸 Jacky Flores')
    .addItem('▶ Inicializar hojas',          'inicializar')
    .addItem('📁 Configurar Drive',          'testDrive')
    .addSeparator()
    .addItem('🔑 Crear usuario admin',       'crearAdminDesdeMenu')
    .addItem('📦 Cargar catálogo completo',  'cargarCatalogo')
    .addItem('🗑  Limpiar catálogo',          'limpiarCatalogo')
    .addSeparator()
    .addItem('🌐 Ver URL del Web App',       'mostrarUrl')
    .addToUi();
}

// ── Carpeta de Drive para imágenes (hardcodeada como fallback) ─
var JACKY_FOLDER_ID = '1zgSzpcpQBqhXX7Ga3m6MEAa0Wl8UO44m';

// ── Propiedades del script ───────────────────────────────────
var Props = PropertiesService.getScriptProperties();

function getSpreadsheetId() {
  var id = Props.getProperty('SPREADSHEET_ID');
  if (!id) {
    id = SpreadsheetApp.getActiveSpreadsheet().getId();
    Props.setProperty('SPREADSHEET_ID', id);
  }
  return id;
}

function getFolderId() {
  return Props.getProperty('FOLDER_ID');
}

function getSheet(name) {
  return SpreadsheetApp.openById(getSpreadsheetId()).getSheetByName(name);
}

// ============================================================
// INICIALIZACIÓN — crea todas las hojas y cabeceras
// ============================================================
function inicializar() {
  var ss  = SpreadsheetApp.openById(getSpreadsheetId());
  var ui  = SpreadsheetApp.getUi();

  var hojas = {
    'productos': ['id', 'nombre', 'descripcion', 'precio', 'categoria',
                  'imagenUrl', 'disponible', 'destacado', 'fechaCreacion'],
    'redes':     ['plataforma', 'url', 'activo'],
    'config':    ['clave', 'valor'],
    'admin':     ['usuario', 'passwordHash', 'email', 'ultimoAcceso']
  };

  var creadas   = [];
  var existentes = [];

  Object.keys(hojas).forEach(function(nombre) {
    var sheet = ss.getSheetByName(nombre);

    if (!sheet) {
      sheet = ss.insertSheet(nombre);
      creadas.push(nombre);
    } else {
      existentes.push(nombre);
    }

    // Asegurarse de que las cabeceras estén en la fila 1
    var headers = hojas[nombre];
    var primerFila = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    var faltanHeaders = primerFila[0] !== headers[0];

    if (faltanHeaders) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#c73b77')
        .setFontColor('#ffffff')
        .setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Auto-ajustar ancho de columnas
    sheet.autoResizeColumns(1, headers.length);
  });

  // Poblar hoja config con valores por defecto si está vacía
  var configSheet = ss.getSheetByName('config');
  var configData  = configSheet.getDataRange().getValues();
  if (configData.length <= 1) {
    var defaults = [
      ['nombreTienda',   'Jacky Flores y Detalles'],
      ['whatsapp',       '+50249200595'],
      ['descripcionSeo', 'Arreglos florales artesanales hechos con amor para cada ocasión especial.'],
      ['horarios',       'Lun–Sáb: 8:00–18:00\nDom: 9:00–14:00'],
      ['ciudad',         'Aldea San Marcos, El Palmar, Quetzaltenango'],
      ['emailContacto',  '']
    ];
    configSheet.getRange(2, 1, defaults.length, 2).setValues(defaults);
  }

  var msg = '✅ Inicialización completada.\n\n';
  if (creadas.length)   msg += '➕ Hojas creadas: '    + creadas.join(', ')    + '\n';
  if (existentes.length) msg += '✔ Hojas existentes: ' + existentes.join(', ') + '\n';
  msg += '\nSiguiente paso: ejecutá "Configurar Drive" para autorizar Google Drive.';

  ui.alert('Jacky Flores — Setup', msg, ui.ButtonSet.OK);
}

// ============================================================
// CONFIGURAR DRIVE — autoriza permisos y crea carpeta
// ============================================================
function testDrive() {
  var ui = SpreadsheetApp.getUi();

  try {
    // Listar archivos en Drive para forzar la autorización OAuth
    DriveApp.getRootFolder().getName();

    var folderId = Props.getProperty('FOLDER_ID');
    var folder;

    if (folderId) {
      // Verificar que la carpeta aún existe
      try {
        folder = DriveApp.getFolderById(folderId);
        var msg = '✅ Drive ya está autorizado.\n\n'
          + '📁 Carpeta existente: ' + folder.getName() + '\n'
          + '🔑 Folder ID: ' + folderId + '\n\n'
          + 'No necesitás hacer nada más.';
        ui.alert('Drive — OK', msg, ui.ButtonSet.OK);
        return;
      } catch (e) {
        // La carpeta fue eliminada, crear una nueva
        folderId = null;
      }
    }

    // Crear carpeta nueva en Drive
    folder   = DriveApp.createFolder('Jacky Flores — Imágenes');
    folderId = folder.getId();
    Props.setProperty('FOLDER_ID', folderId);

    // Hacer la carpeta accesible con link
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    var msg = '✅ Drive autorizado y carpeta creada.\n\n'
      + '📁 Carpeta: Jacky Flores — Imágenes\n'
      + '🔑 Folder ID: ' + folderId + '\n\n'
      + 'Este ID ya fue guardado en las propiedades del script.\n'
      + 'Copialo también en tus variables de entorno si lo necesitás.';

    ui.alert('Drive — Configurado', msg, ui.ButtonSet.OK);

  } catch (e) {
    ui.alert('Error Drive', '❌ ' + e.toString()
      + '\n\nAsegurate de ejecutar esto desde el editor de Apps Script '
      + 'para que aparezca la pantalla de autorización de Google.',
      SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

// ============================================================
// CARGAR CATÁLOGO COMPLETO (95 productos originales)
// ============================================================
function cargarCatalogo() {
  var ui    = SpreadsheetApp.getUi();
  var sheet = getSheet('productos');

  if (!sheet) {
    ui.alert('Error', 'Primero ejecutá "Inicializar hojas".', ui.ButtonSet.OK);
    return;
  }

  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    var resp = ui.alert(
      '⚠ Ya existen productos',
      'La hoja "productos" ya tiene ' + (lastRow - 1) + ' filas.\n\n'
      + '¿Querés agregar los productos igual? (no se borran los existentes)',
      ui.ButtonSet.YES_NO
    );
    if (resp !== ui.Button.YES) return;
  }

  var productos = getCatalogoOriginal();
  var ahora     = new Date().toISOString();
  var filas     = productos.map(function(p) {
    return [
      Utilities.getUuid(),
      p.titulo,
      p.descripcion,
      p.precio,
      p.categoria,
      '',        // imagenUrl vacío — subir desde panel admin
      true,      // disponible
      false,     // destacado
      ahora
    ];
  });

  sheet.getRange(lastRow + 1, 1, filas.length, 9).setValues(filas);

  ui.alert(
    '✅ Catálogo cargado',
    'Se cargaron ' + filas.length + ' productos.\n\n'
    + 'Las imágenes están vacías — subílas desde el panel admin '
    + 'editando cada producto.',
    ui.ButtonSet.OK
  );
}

function limpiarCatalogo() {
  var ui    = SpreadsheetApp.getUi();
  var sheet = getSheet('productos');
  var resp  = ui.alert(
    '⚠ ¿Limpiar catálogo?',
    'Se eliminarán TODOS los productos. ¿Estás seguro?',
    ui.ButtonSet.YES_NO
  );
  if (resp !== ui.Button.YES) return;

  var lastRow = sheet.getLastRow();
  if (lastRow > 1) sheet.deleteRows(2, lastRow - 1);
  ui.alert('✅ Catálogo limpiado', 'La hoja productos quedó vacía.', ui.ButtonSet.OK);
}

function getCatalogoOriginal() {
  return [
    { titulo: 'Ramo Romántico 12 Rosas y 1 Girasol',            descripcion: 'Combina la pasión de 12 rosas rojas con la alegría radiante de un girasol dorado.',                          precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Corazón de Amor 36 Rosas con Chocolates Ferrero', descripcion: 'Impresionante arreglo en forma de corazón con 36 rosas y deliciosos chocolates Ferrero Rocher.',              precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Arreglo Floral Mixto con Chocolates',             descripcion: 'Hermosa combinación de 24 rosas, girasoles, claveles y chocolates para ocasiones especiales.',                precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Arreglo Tierno con Oso de Peluche',               descripcion: 'Rosas frescas acompañadas de un adorable oso de peluche, galletas y globo festivo.',                         precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Canasta Elegante Rosas Eternas',                  descripcion: 'Canasta refinada con rosas preservadas que duran para siempre y chocolates gourmet.',                        precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Canasta Premium Rosas Eternas II',                descripcion: 'Segunda versión de nuestra canasta premium con rosas eternas y chocolates selectos.',                        precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Canasta Deluxe Rosas Eternas III',                descripcion: 'Tercera variante de nuestra exclusiva canasta con rosas preservadas y chocolates.',                          precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Gardenias Rosadas Delicadas',                     descripcion: 'Exquisitas gardenias en tono rosado que transmiten pureza y elegancia natural.',                             precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Vibrante 10 Gerberas y 24 Rosas',            descripcion: 'Explosión de color con 10 gerberas alegres, 24 rosas y chocolates dulces.',                                  precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Espectacular 11 Gerberas Premium',           descripcion: '11 gerberas vibrantes con 24 rosas y 12 chocolates Ferrero Rocher de lujo.',                                 precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Fresco 12 Gerberas Aromático',               descripcion: '12 gerberas coloridas con claveles y eucalipto para un aroma natural único.',                                precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Celebración 12 Girasoles Majestuosos',       descripcion: '12 girasoles radiantes con 24 rosas rojas, chocolates y globo personalizado.',                               precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Clásico 12 Rosas y Girasol',                 descripcion: 'Arreglo tradicional de 12 rosas perfectamente combinadas con un girasol brillante.',                        precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Graduación Personalizado',                   descripcion: '12 rosas, girasol y birrete de graduación personalizado para celebrar el éxito académico.',                  precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Solidago Aromático',                         descripcion: '12 rosas frescas con girasol, chocolates y solidago para un toque campestre.',                               precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Romántico Rosadas con Lirios',               descripcion: '12 rosas rosadas delicadas con lirios blancos y eucalipto aromático.',                                       precio: 0, categoria: 'Bodas' },
    { titulo: 'Ramo Solidago con Tarjeta',                       descripcion: '12 rosas elegantes con solidago dorado y tarjeta personalizada incluida.',                                   precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Pasión 18 Rosas Ferrero',                    descripcion: '18 rosas rojas intensas acompañadas de 15 chocolates Ferrero Rocher premium.',                               precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Silvestre 24 Gerberas',                      descripcion: '24 gerberas multicolor con lloviznas y solidago para un estilo natural y fresco.',                          precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Celebración Globo Personalizado',            descripcion: '24 rosas con 6 girasoles, chocolates y globo personalizado para ocasiones especiales.',                     precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Elegante Blancas y Rosadas',                 descripcion: '24 rosas en tonos blanco y rosado con clavel y eucalipto para máxima elegancia.',                           precio: 0, categoria: 'Bodas' },
    { titulo: 'Ramo Baby con Oso y Globos',                      descripcion: '24 rosas rojas con adorable oso de peluche, 3 globos y chocolates Ferrero Rocher.',                         precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Corona Metal Solidago',                      descripcion: '24 rosas rojas con solidago dorado y elegante corona de metal decorativa.',                                  precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Dulce 24 Rosas con Chocolates',              descripcion: '24 rosas frescas acompañadas de deliciosos chocolates para endulzar el momento.',                           precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Primaveral 30 Tulipanes',                    descripcion: '30 tulipanes frescos en colores primaverales que evocan renovación y esperanza.',                            precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Majestuoso 36 Rosas Premium',                descripcion: '36 rosas rojas con 12 girasoles y 24 chocolates Ferrero Rocher para gran impacto.',                         precio: 0, categoria: 'Bodas' },
    { titulo: 'Ramo Delicado 5 Tulipanes',                       descripcion: '5 tulipanes selectos en un arreglo minimalista y elegante perfecto para gestos sutiles.',                   precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Dulce 9 Gerberas con Tarjeta',               descripcion: '9 gerberas vibrantes con chocolates artesanales y tarjeta personalizada incluida.',                         precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Mixto 9 Girasoles Alegres',                  descripcion: '9 girasoles radiantes con 12 rosas y chocolates para transmitir alegría pura.',                             precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Impresionante 36 Rosas Baby',                descripcion: '36 rosas rojas con decoración baby y chocolates para celebraciones importantes.',                           precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Dulce de Gomitas',                           descripcion: 'Original y divertido ramo hecho completamente con gomitas de colores para endulzar.',                       precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Caja Elegante con Tulipanes',                     descripcion: 'Tulipanes frescos presentados en una elegante caja decorativa de lujo.',                                    precio: 0, categoria: 'Bodas' },
    { titulo: 'Caja Premium Tulipanes II',                       descripcion: 'Segunda versión de nuestra caja premium con tulipanes en presentación sofisticada.',                        precio: 0, categoria: 'Bodas' },
    { titulo: 'Girasol Individual Radiante',                     descripcion: 'Hermoso girasol individual perfecto para gestos sencillos pero significativos.',                            precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Girasol Individual Brillante II',                 descripcion: 'Segunda variante de nuestro girasol individual con presentación especial.',                                 precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Girasol Individual Dorado III',                   descripcion: 'Tercera versión del girasol individual con toque dorado y elegante.',                                       precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Girasol Individual Especial IV',                  descripcion: 'Cuarta variante de girasol individual con decoración especial única.',                                      precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Girasol Individual Premium V',                    descripcion: 'Quinta versión premium de nuestro girasol individual con acabado de lujo.',                                 precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Clásico 10 Rosas',                           descripcion: 'Arreglo tradicional de 10 rosas rojas, símbolo eterno de amor y pasión.',                                  precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Elegante 10 Rosas II',                       descripcion: 'Segunda versión del ramo de 10 rosas con presentación elegante y sofisticada.',                            precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Romántico 10 Rosas III',                     descripcion: 'Tercera variante del ramo de 10 rosas con toque romántico especial.',                                      precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Delicado 10 Rosas IV',                       descripcion: 'Cuarta versión del ramo de 10 rosas con presentación delicada y refinada.',                                precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Premium 10 Rosas V',                         descripcion: 'Quinta variante premium del ramo de 10 rosas con acabado de lujo.',                                        precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Especial 10 Rosas VI',                       descripcion: 'Sexta versión especial del ramo de 10 rosas con decoración única.',                                        precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Exclusivo 10 Rosas VII',                     descripcion: 'Séptima versión exclusiva del ramo de 10 rosas con diseño innovador.',                                     precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Temático Cenicienta con Luces LED',          descripcion: '12 rosas temáticas de Cenicienta con corona y luces LED mágicas.',                                         precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Temático Princesas con Luces LED',           descripcion: '12 rosas temáticas de princesas con corona y luces LED encantadoras.',                                     precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Dulce 12 Tulipanes con Chocolates',          descripcion: '12 tulipanes frescos acompañados de deliciosos chocolates gourmet.',                                        precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Sencillo 6 Rosas',                           descripcion: 'Arreglo minimalista de 6 rosas perfectas para gestos sutiles y elegantes.',                                precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Temático Frozen',                            descripcion: '7 rosas temáticas de Frozen en tonos azules y blancos para fans de Elsa.',                                 precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Corazón Romántico con Chocolates',           descripcion: 'Ramo en forma de corazón con chocolates para expresar amor verdadero.',                                    precio: 0, categoria: 'Bodas' },
    { titulo: 'Ramo Tradicional 10 Rosas',                       descripcion: 'Ramo clásico de 10 rosas rojas en presentación tradicional y elegante.',                                   precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Personalizado con Listón',                   descripcion: '10 rosas con listón personalizado y chocolates para ocasiones especiales.',                                 precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Mágico 13 Rosas con Luces LED',              descripcion: '13 rosas con luces LED y corona de mariposas para un toque mágico.',                                       precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Brillante 15 Rosas con LED',                 descripcion: '15 rosas con luces LED y chocolates para iluminar momentos especiales.',                                   precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Espectacular 20 Rosas',                      descripcion: 'Impresionante ramo de 20 rosas rojas para ocasiones memorables.',                                          precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Tierno 20 Rosas con Stitch',                 descripcion: '20 rosas con adorable osito Stitch y chocolates para fans de Disney.',                                     precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Dulce 20 Rosas con Stitch Rosado',           descripcion: '20 rosas con osito Stitch rosado y chocolates en presentación tierna.',                                    precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Corona Metal con Chocolates',                descripcion: '20 rosas con elegante corona de metal y chocolates gourmet.',                                              precio: 0, categoria: 'Bodas' },
    { titulo: 'Ramo Cumpleaños Corona y Listón',                 descripcion: '20 rosas con corona de metal y listón personalizado para cumpleaños.',                                     precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Clásico 20 Rosas con Chocolates',            descripcion: '20 rosas en presentación clásica acompañadas de chocolates selectos.',                                     precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Elegante 20 Rosas Corona Metal',             descripcion: '20 rosas con corona de metal decorativa para máxima elegancia.',                                           precio: 0, categoria: 'Bodas' },
    { titulo: 'Ramo Baby 20 Rosas con Corona',                   descripcion: '20 rosas con decoración baby y corona para celebraciones especiales.',                                     precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Mariposas 20 Rosas',                         descripcion: '20 rosas decoradas con mariposas para un toque de fantasía y delicadeza.',                                 precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Impactante 30 Rosas',                        descripcion: 'Ramo impresionante de 30 rosas rojas para declaraciones de amor inolvidables.',                            precio: 0, categoria: 'Bodas' },
    { titulo: 'Ramo Festivo 35 Rosas con Globos',                descripcion: '35 rosas con chocolates y globos para celebraciones grandes y festivas.',                                  precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Majestuoso 50 Rosas',                        descripcion: 'Ramo majestuoso de 50 rosas rojas para ocasiones verdaderamente especiales.',                              precio: 0, categoria: 'Bodas' },
    { titulo: 'Ramo Espectacular 50 Rosas II',                   descripcion: 'Segunda versión del ramo de 50 rosas con presentación espectacular.',                                      precio: 0, categoria: 'Bodas' },
    { titulo: 'Ramo Girasoles Corona Metal',                     descripcion: '7 girasoles radiantes con corona de metal y chocolates dulces.',                                           precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Delicado 7 Rosas',                           descripcion: 'Arreglo perfecto de 7 rosas rojas para gestos románticos sutiles.',                                        precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Encantador 7 Rosas II',                      descripcion: 'Segunda versión del ramo de 7 rosas con presentación encantadora.',                                        precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Elegante 7 Rosas III',                       descripcion: 'Tercera variante del ramo de 7 rosas con toque elegante y refinado.',                                      precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Especial 7 Rosas IV',                        descripcion: 'Cuarta versión especial del ramo de 7 rosas con decoración única.',                                        precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Temático Corona Metal',                      descripcion: '7 rosas temáticas con corona de metal decorativa especial.',                                               precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Aurora Corona Metal',                        descripcion: '7 rosas temáticas de Aurora con corona de metal y acabado de princesa.',                                   precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Aurora Premium II',                          descripcion: 'Segunda versión premium del ramo Aurora con corona de metal exclusiva.',                                   precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Campanita Corona Metal',                     descripcion: '7 rosas temáticas de Campanita con corona de metal y magia de hadas.',                                     precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Rapunzel Corona Metal',                      descripcion: '7 rosas temáticas de Rapunzel con corona de metal y cabello dorado.',                                      precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Rapunzel Premium II',                        descripcion: 'Segunda versión premium del ramo Rapunzel con corona de metal especial.',                                  precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Temático Corona Especial',                   descripcion: '7 rosas temáticas con corona de metal en diseño especial único.',                                          precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Temático Corona Premium II',                 descripcion: 'Segunda versión del ramo temático con corona de metal premium.',                                           precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Extraordinario 80 Rosas',                    descripcion: 'Ramo extraordinario de 80 rosas para gestos grandiosos e inolvidables.',                                   precio: 0, categoria: 'Bodas' },
    { titulo: 'Ramo Grandioso 80 Rosas II',                      descripcion: 'Segunda versión del ramo grandioso de 80 rosas con presentación épica.',                                   precio: 0, categoria: 'Bodas' },
    { titulo: 'Ramo Graduación 8 Rosas con Birrete',             descripcion: '8 rosas con girasol y birrete de graduación para celebrar el éxito académico.',                            precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Graduación Premium II',                      descripcion: 'Segunda versión premium del ramo de graduación con 8 rosas y birrete.',                                    precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Graduación Especial III',                    descripcion: 'Tercera versión especial del ramo de graduación con decoración única.',                                    precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Graduación Elegante IV',                     descripcion: 'Cuarta versión elegante del ramo de graduación con acabado refinado.',                                     precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Tinkerbell Corona Metal',                    descripcion: '8 rosas temáticas de Tinkerbell con hojas y corona de metal mágica.',                                      precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Tinkerbell Premium II',                      descripcion: 'Segunda versión premium del ramo Tinkerbell con hojas y corona especial.',                                 precio: 0, categoria: 'Cumpleaños' },
    { titulo: 'Ramo Primaveral Tulipanes',                       descripcion: 'Hermoso ramo de tulipanes frescos que evocan la belleza de la primavera.',                                 precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Tulipanes Elegante II',                      descripcion: 'Segunda versión elegante del ramo de tulipanes con presentación sofisticada.',                             precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Tulipanes Premium III',                      descripcion: 'Tercera versión premium del ramo de tulipanes con acabado de lujo.',                                       precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Arreglo Fresas Ferrero con Baby',                 descripcion: 'Deliciosa combinación de fresas, chocolates Ferrero Rocher y decoración baby.',                            precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Clásico Rosas Tradicional',                  descripcion: 'Ramo tradicional de rosas en presentación clásica y atemporal.',                                           precio: 0, categoria: 'Ocasiones especiales' },
    { titulo: 'Ramo Pasión Rosas Rojas',                         descripcion: 'Ramo apasionado de rosas rojas intensas para expresar amor verdadero.',                                    precio: 0, categoria: 'Bodas' }
  ];
}

// ============================================================
// CREAR USUARIO ADMIN desde el menú
// ============================================================
function crearAdminDesdeMenu() {
  var ui = SpreadsheetApp.getUi();

  var respUsuario = ui.prompt('Nuevo admin', 'Nombre de usuario:', ui.ButtonSet.OK_CANCEL);
  if (respUsuario.getSelectedButton() !== ui.Button.OK) return;

  var respPass = ui.prompt('Nuevo admin', 'Contraseña:', ui.ButtonSet.OK_CANCEL);
  if (respPass.getSelectedButton() !== ui.Button.OK) return;

  var respEmail = ui.prompt('Nuevo admin', 'Email:', ui.ButtonSet.OK_CANCEL);
  if (respEmail.getSelectedButton() !== ui.Button.OK) return;

  var usuario = respUsuario.getResponseText().trim();
  var pass    = respPass.getResponseText().trim();
  var email   = respEmail.getResponseText().trim();

  if (!usuario || !pass) {
    ui.alert('Error', 'Usuario y contraseña son requeridos.', ui.ButtonSet.OK);
    return;
  }

  var hash  = sha256Hex(pass);
  var sheet = getSheet('admin');
  sheet.appendRow([usuario, hash, email, '']);

  ui.alert('✅ Admin creado',
    'Usuario: ' + usuario + '\nEmail: ' + email + '\nHash guardado en la hoja "admin".',
    ui.ButtonSet.OK);
}

// ============================================================
// MOSTRAR URL del Web App
// ============================================================
function mostrarUrl() {
  var ui  = SpreadsheetApp.getUi();
  var url = ScriptApp.getService().getUrl();
  if (!url) {
    ui.alert('URL no disponible',
      'El script aún no ha sido publicado como Web App.\n'
      + 'Andá a: Implementar → Nueva implementación → Web App.',
      ui.ButtonSet.OK);
    return;
  }
  ui.alert('URL del Web App', url + '\n\nCopiá esta URL en tu .env.local como NEXT_PUBLIC_APPS_SCRIPT_URL', ui.ButtonSet.OK);
}

// ============================================================
// HELPERS
// ============================================================
function jsonResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function sheetToObjects(sheet) {
  var data    = sheet.getDataRange().getValues();
  var headers = data[0];
  return data.slice(1).map(function(row) {
    var obj = {};
    headers.forEach(function(h, i) { obj[h] = row[i]; });
    return obj;
  });
}

function sha256Hex(input) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, input);
  return bytes.map(function(b) {
    var hex = (b & 0xFF).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function isTruthy(val) {
  return val === true || val === 'TRUE' || val === 'true' || val === 1 || val === '1';
}

// ============================================================
// doGet — rutas GET
// ============================================================
function doGet(e) {
  var action = e.parameter.action;
  var result;

  try {
    switch (action) {
      case 'ping':              result = { ok: true, message: 'Apps Script funcionando' }; break;
      case 'getProductos':      result = getProductos();               break;
      case 'getProductosAdmin': result = getProductosAdmin();          break;
      case 'getProducto':       result = getProducto(e.parameter.id);  break;
      case 'getRedes':          result = getRedes();                   break;
      case 'getConfig':         result = getConfig();                  break;
      default:
        result = { error: 'Acción GET no reconocida: ' + action };
    }
  } catch (err) {
    result = { error: err.toString() };
  }

  return jsonResponse(result);
}

// ============================================================
// doPost — rutas POST
// ============================================================
function doPost(e) {
  var result;

  try {
    var body   = JSON.parse(e.postData.getDataAsString());
    var action = body.action;

    switch (action) {
      case 'login':              result = login(body);              break;
      case 'crearProducto':      result = crearProducto(body);      break;
      case 'actualizarProducto': result = actualizarProducto(body); break;
      case 'eliminarProducto':   result = eliminarProducto(body);   break;
      case 'subirImagen':        result = subirImagen(body);        break;
      case 'updateRedes':        result = updateRedes(body);        break;
      case 'updateConfig':       result = updateConfig(body);       break;
      default:
        result = { error: 'Acción POST no reconocida: ' + action };
    }
  } catch (err) {
    result = { error: err.toString() };
  }

  return jsonResponse(result);
}

// ============================================================
// ACCIONES GET
// ============================================================
function getProductos() {
  return sheetToObjects(getSheet('productos'))
    .filter(function(p) { return isTruthy(p.disponible); })
    .map(normalizeProducto);
}

function getProductosAdmin() {
  return sheetToObjects(getSheet('productos')).map(normalizeProducto);
}

function getProducto(id) {
  var p = sheetToObjects(getSheet('productos')).find(function(r) { return r.id === id; });
  if (!p) return { error: 'Producto no encontrado' };
  return normalizeProducto(p);
}

function getRedes() {
  return sheetToObjects(getSheet('redes'))
    .filter(function(r) { return isTruthy(r.activo); });
}

function getConfig() {
  var config = {};
  sheetToObjects(getSheet('config')).forEach(function(row) {
    config[row.clave] = row.valor;
  });
  return config;
}

// ============================================================
// ACCIONES POST
// ============================================================
function login(body) {
  var sheet         = getSheet('admin');
  var rows          = sheetToObjects(sheet);
  var providedHash  = body.passwordHash;

  var user = rows.find(function(u) {
    return String(u.usuario) === String(body.usuario)
        && String(u.passwordHash) === String(providedHash);
  });

  if (!user) return { ok: false };

  // Actualizar ultimoAcceso
  var data       = sheet.getDataRange().getValues();
  var headers    = data[0];
  var colUltimo  = headers.indexOf('ultimoAcceso');
  var colUsuario = headers.indexOf('usuario');
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][colUsuario]) === String(body.usuario)) {
      sheet.getRange(i + 1, colUltimo + 1).setValue(new Date().toISOString());
      break;
    }
  }

  return { ok: true, email: user.email };
}

function crearProducto(body) {
  var sheet = getSheet('productos');
  var id    = Utilities.getUuid();
  var ahora = new Date().toISOString();

  sheet.appendRow([
    id,
    body.nombre      || '',
    body.descripcion || '',
    Number(body.precio) || 0,
    body.categoria   || '',
    body.imagenUrl   || '',
    body.disponible !== undefined ? body.disponible : true,
    body.destacado  !== undefined ? body.destacado  : false,
    ahora
  ]);

  return { ok: true, id: id };
}

function actualizarProducto(body) {
  var sheet   = getSheet('productos');
  var data    = sheet.getDataRange().getValues();
  var headers = data[0];
  var colId   = headers.indexOf('id');

  for (var i = 1; i < data.length; i++) {
    if (data[i][colId] === body.id) {
      var campos = ['nombre', 'descripcion', 'precio', 'categoria',
                    'imagenUrl', 'disponible', 'destacado'];
      campos.forEach(function(campo) {
        if (body[campo] !== undefined) {
          var col = headers.indexOf(campo);
          if (col >= 0) {
            var val = campo === 'precio' ? Number(body[campo]) : body[campo];
            sheet.getRange(i + 1, col + 1).setValue(val);
          }
        }
      });
      return { ok: true };
    }
  }
  return { error: 'Producto no encontrado: ' + body.id };
}

function eliminarProducto(body) {
  var sheet   = getSheet('productos');
  var data    = sheet.getDataRange().getValues();
  var headers = data[0];
  var colId   = headers.indexOf('id');

  for (var i = 1; i < data.length; i++) {
    if (data[i][colId] === body.id) {
      sheet.deleteRow(i + 1);
      return { ok: true };
    }
  }
  return { error: 'Producto no encontrado: ' + body.id };
}

function subirImagen(body) {
  var folderId = getFolderId() || JACKY_FOLDER_ID;
  if (!folderId) {
    return { error: 'Drive no configurado. Ejecutá testDrive() primero.' };
  }

  var folder   = DriveApp.getFolderById(folderId);
  var decoded  = Utilities.base64Decode(body.base64);
  var nombre   = body.nombreArchivo || ('imagen_' + Date.now() + '.jpg');
  var mimeType = body.mimeType      || 'image/jpeg';
  var blob     = Utilities.newBlob(decoded, mimeType, nombre);
  var file     = folder.createFile(blob);

  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return {
    ok:        true,
    imagenUrl: 'https://drive.google.com/uc?export=view&id=' + file.getId()
  };
}

function updateRedes(body) {
  var sheet = getSheet('redes');
  var redes = body.redes;

  // Limpiar datos pero conservar cabecera
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) sheet.deleteRows(2, lastRow - 1);

  redes.forEach(function(red) {
    sheet.appendRow([red.plataforma, red.url, red.activo]);
  });

  return { ok: true };
}

function updateConfig(body) {
  var sheet   = getSheet('config');
  var data    = sheet.getDataRange().getValues();
  var config  = body.config;

  Object.keys(config).forEach(function(clave) {
    var encontrado = false;
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === clave) {
        sheet.getRange(i + 1, 2).setValue(config[clave]);
        encontrado = true;
        break;
      }
    }
    if (!encontrado) {
      sheet.appendRow([clave, config[clave]]);
      // Actualizar data local para no insertar duplicados
      data.push([clave, config[clave]]);
    }
  });

  return { ok: true };
}

// ============================================================
// NORMALIZACIÓN
// ============================================================
function normalizeProducto(p) {
  return {
    id:            String(p.id            || ''),
    nombre:        String(p.nombre        || ''),
    descripcion:   String(p.descripcion   || ''),
    precio:        Number(p.precio)        || 0,
    categoria:     String(p.categoria     || ''),
    imagenUrl:     String(p.imagenUrl     || ''),
    disponible:    isTruthy(p.disponible),
    destacado:     isTruthy(p.destacado),
    fechaCreacion: String(p.fechaCreacion || '')
  };
}
