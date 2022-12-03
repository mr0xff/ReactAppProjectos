import { StyleSheet, Dimensions } from "react-native"

const { width, height } = Dimensions.get ('screen')
import { text, title, container , border, primary } from './tema_config.json'

export default StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: container.background
    },
    header: {
        width: width,
        marginBottom: width/20,
        paddingVertical: width/20,
        backgroundColor: "#292524",
        paddingHorizontal: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    radius: {
        borderRadius: 100000
    },
    containerProdutos: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        margin: 7,
        backgroundColor: "rgba(0,0,0,0.2)",
        alignSelf: 'center',
        borderRadius: border.radius
    },
    title: {
        fontSize: title.fontsize,
        fontWeight: title.fontbold,
        color: title.color,
        fontFamily: title.family
    },
    text: {
        fontSize: text.fontsize,
        fontWeight: text.fontbold
    },
    headerBack: {
        flexDirection: 'row',
    },
    imagemCompleta: {
        resizeMode: 'cover',
        width: width,
        height: 300,
        marginTop: -width/20
    },
    hr: {
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        width: width/1.1,
        marginVertical: 10
    },
    buttonMaisMenus: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width: width/2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: primary.background,
        borderRadius: border.radius,
        marginTop: '15%'
    },
    quantidade: {
        color: primary.color
    },
    titleCarrrinho: {
        fontSize: 16,
        color: text.color,
    },
    textCarrinho: {
        fontSize: 15,
    },
    produtoNoCarrinho: {
        borderColor: "rgba(0,0,0,.3)",
        borderWidth: 2,
        width: '47%',
        margin: width/70,
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: border.radius,
    },
    imageProdutoCarrinho: {
        resizeMode: 'contain',
        borderRadius: 10000,
        width: 100,
        height: 100,
    },
    defaultFlatStyle: {
        width: width,
        height: height,
    },
    logoHeader: {
        fontFamily: "Roboto",
        fontSize: 24,
        color: "rgba(255,255,255,0.9)",
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth:  2.5, 
        padding: 7,
        marginLeft: 7,
        textAlign: 'center',
        borderRadius: border.radius
    },
    button: {
        flexDirection: 'row',
        width: width/2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: primary.background,
        borderRadius: border.radius,
        justifyContent: 'center',
        margin: 7
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        justifyContent: 'center'
    }
})