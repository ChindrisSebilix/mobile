const Realm = require('realm');

let realmObj = null;

//exact asa il iau
class Schema extends Realm.Object{}
Schema.schema = {
    name: 'Movie',
    primaryKey: 'id', 
    properties: { 
            id : 'int',
            title: 'string',
            description: 'string',//if field can be empty, it must be defined as nullable
            genre: 'string',
            year: 'int',
            rating: 'int',
            length: 'string'
    }
};


export async function getRealm(){
    if(realmObj !== null){
        return realmObj;
    }
    realmObj = new Realm({schema : [Schema], schemaVersion:  6});
    return realmObj;
}




