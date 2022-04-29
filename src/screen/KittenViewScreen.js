import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image } from 'react-native';
import Name from '../../data/name.json';
import Description from '../../data/description.json';
const KittenView = ({ route }) => {
    const { num, numName } = route.params;
    const [random, setRandom] = useState(0)
    useEffect(() => {
        const maxNumber = 9;
        setRandom(Math.floor(Math.random() * maxNumber + 1))
    },[random])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: `https://placekitten.com/200/300?image=${num}` }} 
                        style={{ width: '100%', height: 280 }} 
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 23, fontWeight: '600', color: 'black', padding: 10 }}>{Name[numName]}</Text>
                        <Text style={{ margin: 8, textAlign: 'justify', color: 'black', fontSize: 15, lineHeight: 28 }}>{Description[random]}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export { KittenView };