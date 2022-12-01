import React,{useState, useContext} from 'react'
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

    const maisProduto = () => {
        setQuantidadeDoProduto (quantidadeDoProduto+1)
    }

    const menosProduto = () => {
        if (quantidadeDoProduto>1)
            setQuantidadeDoProduto (quantidadeDoProduto-1)
        else
            alert ('Leve pelo menos 1 item!')
    }

    /*const adicionarProdutosCarrinho = ({produto}) => {
        produto.quantidade = quantidadeDoProduto
        armazenarProdutosCarrinho ({produtos: produto})
    } */

    const adicionarProdutosCarrinho = () => {
        params.quantidade = quantidadeDoProduto
        setNomeProduto ([...nomeProduto, {produto: params}])
        alert ('Produto Adicionado com sucesso !')
    }

    //AsyncStorage

    const armazenarProdutosCarrinho = async ({produtos}) => {
        
        try {
            await AsyncStorage.setItem(produtos.nome, JSON.stringify (produtos))
            alert ('Produto Adicionado com sucesso!')
        } catch (e) {
            console.log ('Falha', JSON.stringify(e))
        }
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
                }]}>Preço: {params.valor} kz</Text>

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