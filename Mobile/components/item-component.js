
import React from 'react'
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { getNetworkService } from '../network/network';


export default class ItemComponent extends React.Component {

    constructor(props) {
        super(props);
        this.networkService = getNetworkService();
    }

    changeQuantity(newQuant) {
        const newQuantity = parseInt(newQuant);
        if (newQuantity == undefined) {
            alert("Cannot change quantity, provide int!")
            return;
        }

        this.setState({
            quantity: newQuantity
        })
    }

    buy() {
        if (this.state.quantity > this.props.item.quantity || this.props.item.quantity === 0) {

            alert("Cannot change quantity, insufficient stock!");
            this.setState({
                quantity: 0
            })
            return;
        }
        this.props.onBuy(this.props.item, this.state.quantity)
    }
    delete() {
        this.props.onDelete(this.props.item)
    }


    // mapForClientComponents(){
    //     if(this.props.isOnline &&this.props.item.quantity > 0){
    //         return (                
    //             <View>
    //             <Icon
    //             name='smoke_free'
    //             type='ionicon'
    //             color='#510fa4'
    //             style={{justifySelf: 'flex-end', padding: 10, height: 30, width: 30}}
    //             onPress = {this.buy.bind(this)}
    //             />
    //             <Input onChangeText={this.changeQuantity.bind(this)} label={"How many?"}/>
    //             </View>
    //         );
    //     }
    //     return null;
    // }

    mapForClerkComponents() {
        if (this.props.forClerk) {
            return (
                <View>
                    <Text>{this.props.item.status}</Text>
                    <View>
                        <Icon
                            name='sc-telegram'
                            type='evilicon'
                            color='#510fa4'
                            style={{ justifySelf: 'flex-end', padding: 10, height: 30, width: 30 }}
                            onPress={this.delete.bind(this)}
                        />
                    </View>
                </View>
            )
        }
    }
    async openDetails() {
        console.log("eeeeeeee");
        console.log(this.props.isOnline);
        if (this.props.isOnline === true) {
            console.log("e"),this.props.item;
            const movie =await this.networkService.getDetails(this.props.item.id);
            console.log(movie);
        }
    }

    render() {

        const movie = this.props.item;
        //console.log("item", this.props)

        return (
            <TouchableOpacity onPress={this.openDetails.bind(this)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, marginHorizontal: 20, backgroundColor: "#123456", padding: 5, paddingHorizontal: 10 }}>
                    <View>
                        <View>
                            <Text>
                                Title: {movie.title}
                            </Text>
                            <Text>
                                Year: {movie.year}
                            </Text>
                        </View>

                        {/* <View>
                    <Text>
                       Quantity: {prod.quantity}
                    </Text>
                </View>

                <View>
                    <Text>
                        Price: {prod.price}
                    </Text>
                </View> */}

                    </View>
                    {/* <View style={{ flexGrow: 10 }} />
                {this.mapForClientComponents()}
                {this.mapForClerkComponents()} */}

                </View>
            </TouchableOpacity>
        );

    }
}