import React,{useState, useContext} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { Badge } from '@rneui/themed';

import { Context } from '../App';

import tema from './tema'

export default function Header ({props, title}){
    
    const { nomeProduto } = useContext (Context)
    const { navigate, goBack } = props
    return (
        <View style={tema.header}>
            { !title ?<Text style={tema.logoHeader}>Alimentos Store</Text>:(
                <View style={tema.headerBack}>
            <TouchableOpacity onPress={ () => goBack()}>
                <Icon name="chevron-back-outline" color="#fff" size={30} />
            </TouchableOpacity>
            <Text style={[tema.title, {color: '#fff', marginLeft: 10}]}>{title}</Text>
            </View>
            )
            }

            <TouchableOpacity onPress={ () => {
                navigate ('carrinho',{title: "Produtos no Carrinho"})
            } }>
                <Badge value={nomeProduto.length} status={Boolean(nomeProduto.length)?"primary":"warning"} badgeStyle={{ transform: [
                    { translateX: 10},
                    {translateY: 7}
                ], zIndex: 1000000}} />
                <Icon name="cart" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}