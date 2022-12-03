import React,{useState, useContext, useEffect} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'

import Header from '../header'
import tema from '../tema'
import { Context } from '../../App'

export default function Detalhesdoproduto ({navigation, route}) {
    const { nomeProduto, setNomeProduto } = useContext (Context)
    const { params } = route
    const [ quantidadeDoProduto, setQuantidadeDoProduto ] = useState (params.quantidade)
    const [ totalProduto, setTotalProduto ] = useState (params.quantidade*params.valor)
    const { valor } = params

    useEffect ( () => {
        setTotalProduto (quantidadeDoProduto*valor) 
         
    },[quantidadeDoProduto])

    const maisProduto = () => {
        setQuantidadeDoProduto (quantidadeDoProduto+1)
    }

    const menosProduto = () => {
        if (quantidadeDoProduto>1)
            {
                setQuantidadeDoProduto (quantidadeDoProduto-1)
            }
        else
            alert ('Leve pelo menos 1 item!')
    }

    const adicionarProdutosCarrinho = () => {
        params.quantidade = quantidadeDoProduto
        params.custo = totalProduto
        setNomeProduto ([...nomeProduto, {produto: params}])
        alert ('Produto Adicionado com sucesso !')
    }

    return (
        <View style={tema.container}>
            <Header props={navigation} title={params.nome} />
            
            <Image
            source={{uri: params.url}}
            style={tema.imagemCompleta}
            />
            <View style={tema.hr} />
            <Text 
            style={[tema.title, {
                alignSelf: 'flex-start', 
                marginLeft: 7, 
                marginTop: 7
                }]}>{params.nomeCompleto}</Text>
            <Text 
            style={[tema.title, {
                alignSelf: 'flex-start', 
                marginLeft: 7, 
                marginTop: 7,
                fontSize: 18
                }]}>Preço: {params.valor},00 kz</Text>

            <Text 
            style={[tema.title, {
                alignSelf: 'center', 
                marginLeft: 7, 
                marginTop: 0,
                fontSize: 18,
                color: "green"
                }]}>Custo:{totalProduto},00 kz</Text>
                
            <View style={tema.buttonMaisMenus}>
                <TouchableOpacity onPress={menosProduto}>
                    <Icon name="remove-circle-outline" size={30} color={tema.quantidade.color} />
                </TouchableOpacity>

                <Text style={[tema.title, tema.quantidade]}>{quantidadeDoProduto}</Text>

                <TouchableOpacity onPress={maisProduto}>
                    <Icon name="add-circle-outline" size={30} color={tema.quantidade.color} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
            onPress={() => {
                nomeProduto.find (({produto}) =>  produto.id === params.id) ?
                alert ("Produto ja adicionado no Carrinho!"): adicionarProdutosCarrinho ()
            }} 
            style={tema.buttonMaisMenus}>
                <Text style={[tema.text, tema.quantidade]}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    )
}