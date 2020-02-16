const Realm = require('realm');

let realmObj = null;

//exact asa il iau
class Schema extends Realm.Object{}
Schema.schema = {
    name: 'Product',
    primaryKey: 'id', 
    properties: { 
            id : 'int',
            name: 'string',
            quantity: 'int',
            price: 'int',
            description: 'string',//if field can be empty, it must be defined as nullable
            status: 'string'
    }
};


export async function getRealm(){
    if(realmObj !== null){
        return realmObj;
    }
    realmObj = new Realm({schema : [Schema], schemaVersion:  6});
    return realmObj;
}




