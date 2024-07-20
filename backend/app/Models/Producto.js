'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Producto extends Model {
    static get table(){
        return 'productos';
    }

    static get hidden(){
        return ['created_at','updated_at']
    }
}

module.exports = Producto
