export default class DetailsScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <Text>
                    Id: {this.props.item.id}
                </Text>
                <Text>
                    Title: {this.props.item.title}
                </Text>
                <Text>
                    Description: {this.props.item.description}
                </Text>
                <Text>
                    Genre: {this.props.item.genre}
                </Text>
                <Text>
                    Year: {this.props.item.Year }
                </Text>
                <Text>
                    Rating: {this.props.item.rating}
                </Text>
                <Text>
                    Length: {this.props.item.length}
                </Text>
            </View>
        )
    }
}