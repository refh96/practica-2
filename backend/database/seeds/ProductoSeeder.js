'use strict'

/*
|--------------------------------------------------------------------------
| ProductoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
class ProductoSeeder {
  static async run () {
    await Database.table('productos').insert([
      {
        'nombre_producto' : 'cachupin',
        'description': '25 kilos',
        'categoria':'perro',
        'precio':32000,
        'url_foto':'1.jpg',
      },
      {
        'nombre_producto' : 'mastinAdulto',
        'description': '22 kilos',
        'categoria':'perro',
        'precio':32900,
        'url_foto':'2.jpg',
      },
      {
        'nombre_producto' : 'mastinCachorro',
        'description': '15 kilos',
        'categoria':'perro',
        'precio':32900,
        'url_foto':'3.jpg',
      },
      {
        'nombre_producto' : 'mastinSenior',
        'description': '22 kilos',
        'categoria':'perro',
        'precio':36000,
        'url_foto':'4.jpg',
      },
      {
        'nombre_producto' : 'ganacan',
        'description': 'bueno y economico',
        'categoria':'perro',
        'precio':28000,
        'url_foto':'5.jpg',
      },
      {
        'nombre_producto' : 'ganacan Cachorro',
        'description': '15 kilos',
        'categoria':'perro',
        'precio':25000,
        'url_foto':'6.jpg',
      },
      {
        'nombre_producto' : 'alfa Dog Adulto',
        'description': '20 kilos',
        'categoria':'perro',
        'precio':35000,
        'url_foto':'7.jpg',
      },
      {
        'nombre_producto' : 'alfa Dog Senior',
        'description': '20 kilos',
        'categoria':'perro',
        'precio':37000,
        'url_foto':'8.jpg',
      },
      {
        'nombre_producto' : 'alfa Dog Razas Pequeñas Adulto',
        'description': '10 kilos',
        'categoria':'perro',
        'precio':23000,
        'url_foto':'9.jpg',
      },
      {
        'nombre_producto' : 'alfa Dog Razas Pequeñas Senior',
        'description': '10 kilos',
        'categoria':'perro',
        'precio':25000,
        'url_foto':'10.jpg',
      },
      {
        'nombre_producto' : 'alfa Dog Razas Pequeñas Cachorro',
        'description': '10 kilos',
        'categoria':'perro',
        'precio':25000,
        'url_foto':'11.jpg',
      },
      {
        'nombre_producto' : 'Fit Formula Razas Pequeñas Adulto',
        'description': '10 kilos',
        'categoria':'perro',
        'precio':25000,
        'url_foto':'12.jpg',
      },
      {
        'nombre_producto' : 'Fit Formula Razas Pequeñas Senior',
        'description': '10 kilos',
        'categoria':'perro',
        'precio':27000,
        'url_foto':'13.jpg',
      },
      {
        'nombre_producto' : 'Fit Formula Adulto',
        'description': '20 kilos',
        'categoria':'perro',
        'precio':42000,
        'url_foto':'14.jpg',
      },
      {
        'nombre_producto' : 'Fit Formula Cachorro',
        'description': '10 kilos',
        'categoria':'perro',
        'precio':25000,
        'url_foto':'15.jpg',
      },
      {
        'nombre_producto' : 'Bokato Cachorro',
        'description': '10 kilos',
        'categoria':'perro',
        'precio':27000,
        'url_foto':'16.jpg',
      },
      {
        'nombre_producto' : 'Bokato Tradicional 10',
        'description': '10 kilos',
        'categoria':'perro',
        'precio':25000,
        'url_foto':'17.jpg',
      },
      {
        'nombre_producto' : 'Bokato tradicional 20',
        'description': '20 kilos',
        'categoria':'perro',
        'precio':45000,
        'url_foto':'18.jpg',
      },
      {
        'nombre_producto' : 'Bokato Gold 20',
        'description': '20 kilos',
        'categoria':'perro',
        'precio':47000,
        'url_foto':'19.jpg',
      },
      {
        'nombre_producto' : 'Bokato Gold 10',
        'description': '10 kilos',
        'categoria':'perro',
        'precio':27000,
        'url_foto':'20.jpg',
      },
      {
        'nombre_producto' : 'Bokato Petit 2.5',
        'description': '2.5 kilos',
        'categoria':'perro',
        'precio':12000,
        'url_foto':'21.jpg',
      },
      {
        'nombre_producto' : 'Bokato petit 10',
        'description': '10 kilos',
        'categoria':'perro',
        'precio':28900,
        'url_foto':'22.jpg',
      },
      {
        'nombre_producto' : 'Compinche',
        'description': '25 kilos',
        'categoria':'perro',
        'precio':27000,
        'url_foto':'23.jpg',
      },
      {
        'nombre_producto' : 'Sanson',
        'description': '25 kilos',
        'categoria':'perro',
        'precio':29000,
        'url_foto':'24.jpg',
      },
      {
        'nombre_producto' : 'Dog Buffet',
        'description': '25 kilos',
        'categoria':'perro',
        'precio':25000,
        'url_foto':'25.jpg',
      },
      {
        'nombre_producto' : 'Cool Dog',
        'description': '25 kilos',
        'categoria':'perro',
        'precio':25000,
        'url_foto':'26.jpg',
      },
      {
        'nombre_producto' : 'Champion Dog Carne y Pollo',
        'description': '18 kilos',
        'categoria':'perro',
        'precio':29900,
        'url_foto':'27.jpg',
      },
      {
        'nombre_producto' : 'Champion Dog Salmon y pollo',
        'description': '18 kilos',
        'categoria':'perro',
        'precio':29900,
        'url_foto':'28.jpg',
      },
      {
        'nombre_producto' : 'Champion Dog razas pequeñas',
        'description': '18 kilos',
        'categoria':'perro',
        'precio':29900,
        'url_foto':'29.jpg',
      },
      {
        'nombre_producto' : 'Nomade gato adulto',
        'description': '10 kilos',
        'categoria':'gato',
        'precio':29900,
        'url_foto':'30.jpg',
      },
      {
        'nombre_producto' : 'Vaporizador',
        'description': 'herramienta para quitar pelos',
        'categoria':'otros',
        'precio':7000,
        'url_foto':'31.jpg',
      },
      {
        'nombre_producto' : 'Advocate Gato 0 a 4 kilos',
        'description': 'Ddesparasitante para gatos Interno y externo',
        'categoria':'medicamentos',
        'precio':11800,
        'url_foto':'32.jpg',
      },
    ])
  }
}

module.exports = ProductoSeeder
