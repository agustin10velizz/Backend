import {faker} from "@faker-js/faker";

faker.locale = "es"

export const generateProduct = () =>{
    return {
        nombre: faker.commerce.product(),
        precio: faker.commerce.precio(),
        img: faker.image.image()
    }
}