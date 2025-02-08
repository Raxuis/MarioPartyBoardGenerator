import React from 'react';
import {Text, View} from "react-native";
import {globalStyles} from "../styles/globalStyles";

/**
 * This is a simple 404 page that will be displayed when a user tries to access a page that does not exist.
 * In this case this page isn't quite necessary.
 */

const NotFound = () => {
    return (
        <View style={globalStyles.container}>
            <Text>Page not found</Text>
        </View>
    );
};

export default NotFound;
