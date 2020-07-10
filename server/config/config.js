// =============================================
// Puerto
// =============================================

process.env.PORT = process.env.PORT || 3003;

// =============================================
// Entorno
// =============================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =============================================
// Base de datos
// =============================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/prueba';
} else {
    urlDB = 'mongodb+srv://prueba_user:ujvLEJ5daT7qERiw@prueba.onses.mongodb.net/prueba'
}

process.env.URLDB = urlDB;