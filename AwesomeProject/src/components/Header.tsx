// import libraries
import React from 'react';
import {StyleSheet, Text , View} from 'react-native';

export interface Props {
    headerText: string;
}

// make a component
export default class Header extends React.Component<Props>{
    constructor(props: Props){
        super(props);

        if(!props.headerText){
            props.headerText = "Header";
        };
    };
    
    render(){
        const { textStyle, viewStyle } = styles;
        return (
            <View style={viewStyle}>
                <Text style={textStyle}>{this.props.headerText}</Text>
            </View>
        );
    };
    
};
const styles = StyleSheet.create({
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20
    }
});

// make the component available