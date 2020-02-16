
import {getRealm} from './realm'

let repo = null;

class LocalRepo {

    constructor(realmObject){
        this.realmObject = realmObject;
    }


    save(id, name, quantity, status, price , description){
        this.realmObject.write(() => {
            
 
            this.realmObject.create('Product', 
            {
                name: name,
                quantity: quantity,
                price: price,
                description: description,
                status: status,
                id: id
                
            });
          });
    }

//     upgrade(id, quantity){
//         this.realmObject.write(() => {
            
//             this.realmObject.create('Cars', { id: id, quantity: quantity}, 'modified')
            
//           });
//     }
//     deleteAll(){
//         this.realmObject.write( () => {
//             this.realmObject.deleteAll();
//         })
//     }

    getAllClient(){
        
        const dbCars = this.realmObject.objects('Product');
        const cars =Object.keys(dbCars).map( e => dbCars[e]);
        return cars;
    }

//     delete(id){
//         this.realmObject.write( () => {
//             const obj = this.realmObject.objects("Cars").filtered('id = ' + id)[0]
//             if(obj){
//                 this.realmObject.delete(obj);
//             }
//         })
//     }

    find(id){
        const carAsList = this.realmObject.objects("Product").filtered(`id == ${id} `)
        if (carAsList['0'] !== undefined){
            return true;
        }
        return false;

    }


}

export async function getRepo(){
    if(repo === null){
        const realm = await getRealm();
        repo = new LocalRepo(realm);
    }
    return repo;
}