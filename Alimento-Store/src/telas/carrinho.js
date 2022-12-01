import React,{useState, useContext} from 'react'
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Icon from 'react-native-vector-icons/Ionicons'

import Header from '../header'
import tema from '../tema'

import { Context } from '../../App'

export default function Carrinho ({navigation, route}) {
    const { nomeProduto, setNomeProduto } = useContext (Context)

    const { params } = route

    const finalizarCompra = async () => {
        try {
            const produtosComprados = nomeProduto
            await AsyncStorage.setItem ('produtos', JSON.stringify(produtosComprados))
            alert ('Compra feita!')
        } catch (error) {
            
        }
    }
    const limparCarrinho = async () => {
        setNomeProduto([])
    }

    const removerProduto = ({produto}) => {
        const produtosCarrinho = nomeProduto.filter (produtoCar => produtoCar.produto.id !== produto.id)
        setNomeProduto (produtosCarrinho)
    } 

    

    return (
        <View style={tema.container}>
            <Header props={navigation} title={params.title} />
            {Boolean (nomeProduto.length)?
            <FlatList
            style={tema.defaultFlatStyle}
            data={nomeProduto}
            numColumns={2}
            renderItem = { ({ item }) => (
                <TouchableOpacity activeOpacity={.5} style={tema.produtoNoCarrinho}>
                   <Image source={{uri: item.produto.url}} style={tema.imageProdutoCarrinho} />
                    <Text numberOfLines={1} style={tema.titleCarrrinho}>{item.produto.nomeCompleto}</Text>
                    <Text style={tema.textCarrinho}>{item.produto.quantidade}</Text>
                    <Text style={tema.textCarrinho}>{item.produto.valor} Kz</Text>

                    <TouchableOpacity
                    onPress={()=> {removerProduto ({produto: item.produto})}} 
                    style={[tema.buttonMaisMenus, {width: '50%', marginBottom: 7}]}>
                        <Text style={{color: "#fff"}}>Remover</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            )}

            />
            :<Text style={tema.text}>Sem produtos no carrinho</Text>
            
        }

            {Boolean (nomeProduto.length)?
                <TouchableOpacity style={tema.button} onPress={finalizarCompra}>
                    <Text style={[tema.text, { color: "#fff" }]}>Finalizar Compra</Text>
                </TouchableOpacity>
                :console.log (null)
            }

            {Boolean (nomeProduto.length)?<TouchableOpacity
            onPress={limparCarrinho} 
            style={[tema.button]}>
                <Text style={[tema.text, tema.quantidade]}>Limpar Carrinho</Text>
            </TouchableOpacity>
            :console.log (null)}

        </View>
    )
}