import React from 'react'
import {View, Button, Text} from 'react-native'
import { Label, Input, FormValidationMessage } from 'react-native-elements'
import { getRepo} from '../persistency/local-repo';
import {getNetworkService} from '../network/network'

export default class AddScreen extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            name : '',
            quantity: 0,
            status: 'Available',
            price: 0,
            description: '',

            error: undefined
            
        }
        this.repo = undefined;
    }

    async componentDidMount(){
        this.repo = await getRepo();
    }

    changeName(name){
        this.setState({
            name: name
        })
    }
    
    changeStatus(name){
        this.setState({
            status: name
        })
    }

    changeDescription(model){
        this.setState({
            description: model
        })
    }

    changeQuantity(mileageStr){
        const mileage = parseInt(mileageStr);
        if (mileage === undefined){
            alert("Cannot update non integer value for mileage.")
            return;
        }
        this.setState({
            quantity : mileage
        })
    }

    changePrice(mileageStr){
        const mileage = parseInt(mileageStr);
        if (mileage === undefined){
            alert("Cannot update non integer value for mileage.")
            return;
        }
        this.setState({
            price : mileage
        })
    }

    async submit(){
       const network = getNetworkService();
       const {name, description, status, price, quantity} = this.state;
       await  network.add(name, description, quantity, price, status)
    }

    changeStatus(text){
        this.setState({
            status: text
        })
    }

    changePrice(text){
        this.setState({
            price: parseInt(text)
        })
    }

    render(){

        const {navigate} = this.props.navigation;

        return (  this.state.error ? this.state.error : <View>
            <Input onChangeText={this.changeName.bind(this)}  label={"Name"}/>
            <Input onChangeText={this.changeDescription.bind(this)} label={"Description"} />
            <Input onChangeText={this.changeQuantity.bind(this)} label={"Quantity"}/>
            <Input onChangeText={this.changePrice.bind(this)} label={"Price"}/>
            <Input onChangeText={this.changeStatus.bind(this)} label={"Status"}/>
            <Button onPress={this.submit.bind(this)}
            title={"Add product"}/>
            <Button onPress={() => navigate("Clerk")}
            title={"See clerk cars"}/>
            </View>
        )
    }
}