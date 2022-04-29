import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, Image, View, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Name from '../../data/name.json';
import Store from '../redux/store';
const KittenList = ({ navigation }) => {
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [number, setNumber] = useState(0);
    const [store, setStore] = useState(true);
    const [isConnect, setConnect] = useState(false);
    useEffect(() => {
        setLoading(true);
        setNumber(10);
        fetchKitten();
        const unsubscribe = NetInfo.addEventListener(state => {
            if(!state.isConnected){
                setConnect(false);
                AsyncStorage.getItem('@kitten').then((val) => {
                    setData(val);
                })
            } setConnect(state.isConnected);
        });
        unsubscribe();
    },[number]);

    const fetchKitten = async() => {
        await Store.dispatch({type: 'KITTER_LIST' , data: newData});
        const maxNumber = 10;
        const maxNameNumber = 50;
        let _image = [];
    
        for (let i=0; i < number; i++) {
            const randomNumber = Math.floor(Math.random() * maxNumber + 1);
            const randomNameNumber = Math.floor(Math.random() * maxNameNumber + 1);
            _image.push(`https://placekitten.com/300/300?image=${randomNumber}` );
            setNewData(newData => [...newData,
                {
                    image: _image[i], 
                    kitten: Name[randomNameNumber],
                    num: randomNumber,
                    numName: randomNameNumber,
                }
            ]);
        }
        if(store) {
            AsyncStorage.setItem('@kitten', JSON.stringify(newData));
            setStore(false);
        }
        setLoading(false);
        setData(newData);
    };

    const handleRefresh = () => {
        fetchKitten();
    };
    handleLoadMore = () => {
        setNumber(10);
        setLoading(false);
    };
    const filter = async(val) => {
        await Store.dispatch({ type: 'DELETE_KITTER' });
        setNumber(val);
        setData([]);
        setNewData([]);
    };
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', padding: 10, top: 10 }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() =>  filter(val=30)}>
                    <View style={{ borderRadius: 10, backgroundColor: '#DCDCDC', padding: 20, alignItems: 'flex-start', marginRight: 15 }}>
                        <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center' }}>30</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }} onPress={() =>  filter(val=50)}>
                    <View style={{ flex: 1, borderRadius: 10, backgroundColor: '#DCDCDC', padding: 20, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center' }}>50</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }} onPress={() =>  filter(val=100)}>
                    <View style={{ flex: 1, borderRadius: 10, backgroundColor: '#DCDCDC', padding: 20, alignItems: 'flex-end', marginLeft: 15 }}>
                        <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center' }}>100</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
                data={newData}
                extraData={data}
                ListHeaderComponent={() => {
                    return(
                        !isConnect ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                                <Text style={{ fontSize: 17, fontWeight: '700', color: 'red', }}>Couldn't connect to the internet.</Text>
                            </View>
                        :
                            null  
                    )
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity onPress={() => 
                                navigation.navigate('KittenView', { num: item.num, numName: item.numName })
                            }>
                                <View style={{ padding: 10, backgroundColor: '#DCDCDC', margin: 10, borderRadius: 9 }}>
                                    <Image source={{ uri: item.image }} style={{ width: '100%', height: 230 }} />
                                    <Text style={{ 
                                        textAlign: 'center',
                                        fontSize: 15,
                                        fontWeight: '600',
                                        color: 'black',
                                        top: 5,
                                        padding: 8
                                    }}>{item.kitten}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => handleRefresh()}
                    />
                }
                onEndReached={() => handleLoadMore()}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => {
                    return(
                        loading ? 
                            <View style={{ padding: 10 }}>
                                <ActivityIndicator size={'small'}/>
                            </View>
                        :
                        null
                    )
                }}
            />
        </SafeAreaView>
    )
};
Store.subscribe(()=> {})
export { KittenList };