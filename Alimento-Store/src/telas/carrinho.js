import React,{useState, useContext, useEffect} from 'react'
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Icon from 'react-native-vector-icons/Ionicons'

import Header from '../header'
import tema from '../tema'

import { Context } from '../../App'

export default function Carrinho ({navigation, route}) {
    const { nomeProduto, setNomeProduto } = useContext (Context)
    const [ custoTotal, setCustoTotal ] = useState (0)

    const { params } = route

    const finalizarCompra = async () => {
        try {
            const produtosComprados = nomeProduto
            await AsyncStorage.setItem ('produtos', JSON.stringify(produtosComprados))
            alert (`Obrigado, total de: ${custoTotal},00 kz`)
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
    
    useEffect ( () => {

        var copitaCusto = 0

        nomeProduto.map ( ({produto: {custo}}) => {
            copitaCusto= copitaCusto+custo
        }) 

        setCustoTotal (copitaCusto)
    }, [nomeProduto] )

    

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
                    <Text style={[tema.textCarrinho,{ color: 'green'}]}>{item.produto.custo},00 Kz</Text>
                    <Text style={tema.textCarrinho}>{item.produto.quantidade}</Text>
                    <Text style={tema.textCarrinho}>{item.produto.valor},00 Kz</Text>
                    

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

        <Text style={{fontSize: 24, color: 'green'}}>Total: {custoTotal},00 kz</Text>

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