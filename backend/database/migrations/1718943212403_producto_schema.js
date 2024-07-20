'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoSchema extends Schema {
  up () {
    this.create('productos', (table) => {
      table.increments()
      table.string('nombre_producto').notNullable();
      table.string('description').notNullable();
      table.string('categoria').notNullable();
      table.integer('precio').notNullable();
      table.string('url_foto');
      table.timestamps()
    })
  }

  down () {
    this.drop('productos')
  }
}

module.exports = ProductoSchema
