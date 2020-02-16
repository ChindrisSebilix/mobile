import React from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    View,
  } from 'react-native';

import CarItem from './item-component';

export default class ListComponent extends React.Component{

    render(){

        const items = this.props.items;
        return (
        <View>
        <FlatList
        data={items}
        renderItem={ bigItem => (
          <CarItem
            item = {bigItem.item}
            onBuy= {this.props.onBuy}
            onDelete={this.props.onDelete}
            forClerk={this.props.forClerk}
            // forClient={this.props.forClient}
            isOnline={this.props.isOnline}
          />
        )}
        keyExtractor={item => item.id}
      />
      </View>);
    }

  }