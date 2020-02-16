
import React from 'react';
import {onPress, Vibration} from 'react-native'
import { View, Button, Text, ScrollView } from 'react-native';
import {getRepo} from '../persistency/local-repo.js';
import ListComponent from '../components/list-component'
import {NavigationEvents} from 'react-navigation';
import {getNetworkService, isOnline} from '../network/network';


export default class HomeScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isOnline: false,
            allProducts: [],
            ownProducts: []
        }
        this.networkService = getNetworkService();
        this.handleWebSocket()

    }

    async componentDidMount(){// = ngOnInit

        this.repo = await getRepo();
        const own = this.repo.getAllClient();

        let checkOnline = false;
        try{
            checkOnline = await isOnline()
            console.log("Online status", checkOnline)

        }
        catch(excp){
            console.log("NOT ONLINE")
        }

        if(checkOnline){
            const products = await this.networkService.getAllClient();
            this.setState({
                isOnline: checkOnline,
                allProducts: products,
                ownProducts: own
            })

        }
        else{
            this.setState({
                allProducts: [],
                isOnline: false
            })
        }
        this.setState({
            ownProducts: own
        })


       
    }




    // componentWillUnmount(){
    //     this.ws.close(200, 'done')
    // }

    async verifyConnection(){
        let checkOnline = false;
        let allCars = [];
        try{
            checkOnline = await isOnline();
            console.log("BATA_L VINA", checkOnline)
            allCars = await this.networkService.getAll();

        }
        catch(Excp){

        }
        this.setState({
            isOnline: checkOnline,
            allCars : allCars
        })
    }

    // delete(id){
    //     const newCars = JSON.parse(JSON.stringify(this.state.carList)).filter( car => car.id != id);
    //     this.setState({
    //         carList: newCars
    //     }, () => this.repo.delete(id))
    // }

    // async buy(car, quantity){
    //     console.log('id', car.id, quantity)
    //     this.networkService.buyCar(car.id, quantity);
    //     const newCarList = this.state.carList.map( _car => {
    //         if(_car.id === car.id){
    //             _car.quantity -= 1;
    //         }
    //         return _car
    //     });
    //     if(! this.repo.find(car)){
    //         this.repo.save(car.id, car.name, car.type, car.quantity , car.status)
    //     }
    //     else{

    //     }
    //     this.setState({
    //         carList: newCarList,
    //         ownCars : this.repo.getAll()

    //     })

        
    // }

    async onBuy(product, quantity){
        this.networkService.buyProduct(product.id, quantity);

        const newProds = this.state.allProducts.filter(prod => prod.id !== product.id);
        const newProduct = JSON.parse(JSON.stringify(product))
        newProduct.quantity -= quantity;
        newProds.push(newProduct);
        this.setState({
            allProducts: newProds
        });
        if(this.repo.find(product.id)){
            return;
        }
        this.repo.save(product.id, product.name, quantity, product.status, product.price, product.description);
        this.setState({
            ownCars: this.repo.getAllClient()
        })
    }

    messageReceived(e){
        console.log("Web socket message received", e)
        const newList = JSON.parse(JSON.stringify(this.state.allProducts))
        newList.push(JSON.parse(e.data));
        this.setState({
            allProducts: newList
        })
    
        
    }

    componentWillUnmount(){
        this.ws = null
    }

    handleWebSocket(){
        let ws = new WebSocket('http://192.168.0.115:2024');
        this.ws = ws;

        ws.onopen = () => {
        //connection opened
        console.log("Web socket connected"); // send a message
        };

        ws.onmessage = this.messageReceived.bind(this)
        ws.onclose = (e) => {
    // connection closed
        console.log("Web socket closed" , e.code, e.reason);
        };
        ws.onerror = (err => {
            console.log("Web socket error", err);
        })
    }    



    // delete(){
    //     this.repo.deleteAll();
    //     this.setState({
    //         ownCars : []
    //     })
    // }

    mapOnlineComponents(){
        const {navigate} = this.props.navigation;

        if(this.state.isOnline === true){
            return (
                <View>
                <Button
            title="Go to Clerk"
            onPress={() => navigate('Clerk')}
            />
                <View style={{maxHeight: 250}}>
                    <Text>All prods</Text>
                <ListComponent items={this.state.allProducts} onBuy={this.onBuy.bind(this)} isOnline={true}/>
                </View>
                </View>
            
            )
        }
        else{
            return <Button title="Try reloading" onPress= {this.verifyConnection.bind(this)}/>
        }
    }

    render(){

        return (
            <View>
            <NavigationEvents onDidFocus={() => this.componentDidMount()} />
            {this.mapOnlineComponents()}
            <View style={{maxHeight: 250, marginTop: 30}}>
            <Text>My items</Text>
            <ListComponent  items = {this.state.ownProducts}  isOnline={false} />
            {/* <Button onPress={this.delete.bind(this) } title="Delete all my" style={{margin: 30}} /> */}
            </View>
            </View>
        )
    }
}