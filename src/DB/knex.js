import knex from "knex";

const sqliteOptions = {
    client:"sqlite3",
    connection:{
        filename: "./Dbs/ecomerce.sqlite"
    },
    useNullAsDefault: true
}

const db = knex(sqliteOptions)

try{
    let exists = await db.schema.hasTable("productos")
    if(!exists){
        await db.schema.createTable("productos",table =>{
            table.increments("id").primary()
            table.string("titulo", 30).notNullable()
            table.float("precio").notNullable()
            table.string("img",1024)
            console.log("tabla de productos creada")
        })
    }
}
catch (error) {
console.log(error)
}

