import React,{useEffect, useState, useContext} from 'react'
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from "react-native-vector-icons/Ionicons"

import Header from '../header'
import tema from '../tema'

//contexto global do app

import { Context } from '../../App'

//produtos na loja
import { produtos } from '../stock.json'

export default function Home ({navigation}) {

    const { nomeProduto, setNomeProduto } = useContext (Context)

    useEffect (() => {
        async function pegarProdutosArmazenados () {
            try {
                const produdosArmazenados = await AsyncStorage.getItem ("produtos")
        
                if (Boolean(produdosArmazenados.length)){
                    const produtosDec = JSON.parse (produdosArmazenados)
                    setNomeProduto (produtosDec)
                }else{
                    console.log ('Sem produtos Armazenados')
                }
            } catch (error) {
                console.log ('Erro')
            }
            
        }

        pegarProdutosArmazenados ()

    }, [])

    const { navigate } = navigation

    return (
        <View style={tema.container}>
            <Header props={navigation}/>
            <FlatList
             style={{width: '100%', height: '100%'}} 
             data={produtos}
             renderItem = {({item, index})=> (
               <TouchableOpacity 
               key={index}
               onPress={ () => navigate ('detalhes', item) }
               style={tema.containerProdutos}>
                   <Image
                       style={[tema.logo, tema.radius]} 
                       source={{uri: item.url }} />
                        <Text style={tema.title}>{item.nome}</Text>
                        <Text style={tema.text}>Preço: {item.valor} kz</Text>
               </TouchableOpacity>
            )}
        />
        <Text style={tema.text}>@ 2022 Alimentos Store.</Text>
        <TouchableOpacity style={tema.info} onPress={()=> alert ('Programador: Welzimar Chris')}>
            <Icon name='information-circle-outline' color="rgba(0,0,255,0.5)" size={30} />
            <Text style={[tema.text, {margin: 7, color: "rgba(0,0,255,0.5)"}]}>Informações</Text>
        </TouchableOpacity>
        
        </View>
    )
}