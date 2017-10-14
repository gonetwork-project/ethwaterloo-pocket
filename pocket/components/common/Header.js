
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';



class Header extends Component {

    componentDidMount() {
    }

    componentWillUnmount() {
    }



    renderBackButton() {
        //Not showing back button in andorid since its handeled by system buttons 
        // if (this.props.showBackButton && Platform.OS !== 'android') {
        //     return (
        //         <View style={[styles.backButton, { paddingBottom: 5 }]} >
        //             <TouchableOpacity onPress={this.props.onPressBack} style={styles.rotateForLeft}>
        //                 <RightArrowIcon />
        //             </TouchableOpacity>
        //         </View>
        //     );
        // }
        // else {
        //     return (
        //         <View />
        //     );
        // }
    }
    render() {
        const { container,
            titleBox, titleText, nextButton,
            progress, progressBox, progresEmptyBox, infoBox } = styles;
        return (
            <View style={[container]} >
                <View style={[titleBox]} >
                    {this.renderBackButton()}
                    <Text style={[globalStyle.gloabalFontStyle_H2, titleText]} >
                        {this.props.title}
                    </Text>
                    <TouchableOpacity onPress={this.props.onPressDown} style={nextButton}>
                    </TouchableOpacity>
                </View>
                <View style={[progressBox]}>
                    <View style={[progress, this.props.progressStyle]} >
                    </View>
                    <View style={[progresEmptyBox, this.props.progressEmptyStyle]} >
                    </View>
                </View>
                <View style={[infoBox, this.props.infoBoxStyle]} >
                    <Text style={[globalStyle.gloabalFontStyle_H3, { color: 'black', textAlign: 'center' }]}  >
                        {this.props.desc}
                        {'\n'}
                        {this.props.descLine2}
                    </Text>
                </View>
            </View>
        );
    }

}


const globalStyle = require('./GlobalStyleSheet');

const styles = {
    container: {
        height: 130,
        flexDirection: 'column',
    },
    titleBox: {
        flex: 1,
        alignItems: 'center',//y
        justifyContent: 'center',
        flexDirection: 'row',
    },
    progressBox: {
        flex: 0.1,
        paddingBottom: 25,
        flexDirection: 'row'
    },
    infoBox: {
        flex: 1.5,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#BD071C',
        paddingBottom: 5,
    },
    titleText: {
        paddingLeft: 30,
        flex: 10,
        textAlign: 'center'
    },
    nextButton: {
        flex: 1,
        paddingRight: 12
    },
    rotateForLeft: {
        transform: [{ rotate: '180deg' }]
    },
    backButton: {
        paddingTop: 5,
        width: 40,
        alignItems: 'center', //--> x allign
        justifyContent: 'center',//--> y allign
    },
    progress: {
        flex: 0.3,
        backgroundColor: 'green'
    },
    progresEmptyBox: {
        flex: 1,
    }
};

export default Header;
