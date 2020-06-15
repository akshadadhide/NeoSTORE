import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import {styles, WINDOW_HEIGHT, WINDOW_WIDTH} from '../styles/Styles';

const Loader = () => (
    <View style={[styles.loaderContainer,StyleSheet.absoluteFillObject]}>
        <View style={styles.loaderView}>
            <ActivityIndicator size={60} color='white' />
        </View>
    </View>
);

export default Loader;
