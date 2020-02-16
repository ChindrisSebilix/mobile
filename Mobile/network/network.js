import  NetInfo  from "@react-native-community/netinfo"
import { colors } from "react-native-elements";

//asta se copiaza exact asa
export async function isOnline(){

    return await NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        return state.isConnected;
      });
}//pana aici

let networkService = null;
const baseUrl = 'http://192.168.0.115:2024';


class NetworkService{

    async getAllClient(){
        const prod = await fetch(baseUrl+'/products').then(resp => resp.json());
        console.log("PRo info ...", prod)
        return prod;
    }

    async getAllClerk(){
        const prods = await fetch(baseUrl+'/all').then(resp => resp.json());
        console.log("Prods ", prods)
        return prods;
    }

    async buyProduct(id, quantity){
        const newProd = await fetch(baseUrl + "/buyProduct", {
            method : 'POST',
            body: JSON.stringify({
                id : id,
                quantity: quantity
            }),
            headers: {
                'Content-Type': 'application/json',
              },
        }).then(resp => resp.json());
        console.log('newProd', newProd)
        return newProd;
    }

    async add(name, description, quantity, price, status){
        const newProd = await fetch(baseUrl + "/product", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                quantity: quantity,
                price: price, 
                description: description,
                status: status

            }),
            headers: {
                'Content-Type': 'application/json',
              },

        })
        return newProd;
    }
    // }
    // async buyCar(id, quantity){
    //     const newCar = await fetch(baseUrl+'/buyCar', {
    //         method : 'POST',
    //         body: JSON.stringify({
    //             id : id,
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //           },
    //     }).then(resp => resp.json())
    //     console.log('newCar', newCar)
    //     return newCar;
        
    // }
    // async addCar(name, type, quantity, status){
    //     await fetch(baseUrl + "/addCar", {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             name: name, 
    //             type: type, 
    //             quantity: parseInt(quantity),
    //             status: status
    //         }),
    //         method: 'POST'
    //     })
    // }
}
//si asta ii exact la fel
export function getNetworkService(){
    if (networkService === null){
        networkService = new NetworkService();
    }
    return networkService
}