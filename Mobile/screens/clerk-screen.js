
import React from 'react'
import {Button, View, Text} from 'react-native'
import {NavigationEvents} from 'react-navigation';

import { ScrollView } from 'react-native-gesture-handler';
import ListComponent from '../components/list-component';
import {getNetworkService} from '../network/network'
import {getRepo } from '../persistency/local-repo'


export default class ClerkScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            prods: []
        }

        this.networkService = getNetworkService();
    }

    async componentDidMount(){

        this.repo = await getRepo();
        const products = await this.networkService.getAllClerk();
        this.setState({
            prods: products.sort( (prod1, prod2) => prod1.quantity < prod2.quantity)
        })
        
       
    }
    onDelete(prod){
        console.log("To delete car", prod)
        if(this.repo.find(prod.id)){
            this.repo.delete(prod.id)
        }
    }

    render(){

        const {navigate} = this.props.navigation;

        return(
            <ScrollView>
                <NavigationEvents onDidFocus={() => this.componentDidMount()} />

                <View>
                    <ListComponent items={this.state.prods} forClerk={true} onDelete={this.onDelete.bind(this)}/>
                </View>
                <Button title="Go to add" onPress={() => navigate('Add')}/>

            </ScrollView>
        );

    }




}