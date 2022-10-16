class Usuario {
    constructor (nombre, apellido,){
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = []
        this.libro = []
    }
 
    getFullName = () =>{
        console.log(`Hola soy ${this.nombre} ${this.apellido} `)
    }

    AddMascotas = (mascotas) =>{
        this.mascotas.push(mascotas)
       } 
       
     CountMascotas = () =>{
        console.log(`Tengo ${this.mascotas.length} mascotas`)
    } 
    
    AddBook = (nombre,autor) => {
        this.libro.push({nombre,autor})
    }
   
    getBooknames = () =>{
        console.log(this.libro.map(libro => libro.nombre))
    }
}

const Usuario1 = new Usuario ("Agustin", "Veliz")
Usuario1.getFullName ()

Usuario1.AddMascotas ("Perro")
Usuario1.AddMascotas ("Gato")
Usuario1.CountMascotas() 


Usuario1.AddBook("Frankenstein", "Mary Shelley")
Usuario1.AddBook("Don Quijote de La Mancha", "Miguel de Cervates")
Usuario1.getBooknames() 