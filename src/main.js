const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');



// Validamos si el proyecto está en producción para no ejecutarse. En desarrollo revisa alguna actualización y recarga automáticamente.
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, { // refrescar el código de las ventanas
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron') // refrescar el código principal o proceso de electron

    })
}
//

let mainWindow
let nuevaConstanciaIndividual
let ventanaConstanciaIndividual;


app.on('ready', () => {
    mainWindow = new BrowserWindow({width: 1600, height: 900});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'view/index.html'),
        protocol: 'file',
        slashes: true
    }))

    // Crear menú a partir de un arreglo que vamos a diseñar
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu); // integramos el menú
    //

    // Cerrar todas las ventanas al cerrar la ventana principal
    mainWindow.on('closed', () => {
        app.quit();
    });
    //

});

// Creamos una ventana y mandamos a llamar a new BrowserWindow
function crearNuevaConstanciaIndividualWindow() {
    nuevaConstanciaIndividual = new BrowserWindow({
        width: 1280,
        height: 820,
        title: 'Generar constancia individual'
    });
    nuevaConstanciaIndividual.setMenu(null); // Eliminar el menú de esta ventana.
    nuevaConstanciaIndividual.loadURL(url.format({
        pathname: path.join(__dirname, 'view/constancia-individual.html'),
        protocol: 'file',
        slashes: true
    }))
    // Cerrar la ventana y limpiarlo dejandolo en blanco
    nuevaConstanciaIndividual.on('closed', () => {
        nuevaConstanciaIndividual = null;
    });
    //
}
//


// Creamos una ventana y mandamos a llamar a new BrowserWindow
function crearNuevaConstanciaMasivoWindow() {
    nuevaConstanciaMasivo = new BrowserWindow({
        width: 1280,
        height: 820,
        title: 'Generar constancia masiva'
    });
    nuevaConstanciaMasivo.setMenu(null); // Eliminar el menú de esta ventana.
    nuevaConstanciaMasivo.loadURL(url.format({
        pathname: path.join(__dirname, 'view/constancia-masivo.html'),
        protocol: 'file',
        slashes: true
    }))
    // Cerrar la ventana y limpiarlo dejandolo en blanco
    nuevaConstanciaMasivo.on('closed', () => {
        nuevaConstanciaMasivo = null;
    });
    //
}
//


const templateMenu = [
    {
        label: 'Sistema',
        submenu: [
            {
                label: 'Constancia individual',
                accelerator: 'Ctrl+1',
                click(){
                    crearNuevaConstanciaIndividualWindow();
                }
            },
            {
                label: 'Constancias masivas',
                accelerator: 'Ctrl+2',
                click() {
                    crearNuevaConstanciaMasivoWindow();                    
                }
            },
            {
                label: 'Salir',
                accelerator: 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]

    },
    {
        label: 'Salir',
        accelerator: 'Ctrl+Q',
        click() {
            app.quit();
        }
    }
];

// Mostrar Developer Tools en desarrollo. En producción se oculta.
if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
      label: 'DevTools',
      submenu: [
        {
          label: 'Mostrar/Ocultar Dev Tools',
          accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        },
        {
          role: 'reload'
        }
      ]
    })
  }


function btnVentanaConstanciaIndividual() {
    ventanaConstanciaIndividual = new BrowserWindow({
        alwaysOnTop: true,
        frame: false,
        resizable: false,
        show: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    ventanaConstanciaIndividual.loadURL(path.join('file://', __dirname, 'view/constancia-individual.html'));
    ventanaConstanciaIndividual.maximize();
}