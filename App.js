import React, { useState, useRef } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard, ImageBackground} from 'react-native';
  import axios from 'axios'

export default function App(){
  const [moeda, setMoeda] = useState('');
  const inputRef = useRef(null);
  const [cotaMoeda, setcotaMoeda] = useState(null);

  async function buscar(){
    if(moeda == ''){
      alert('Digite uma moeda valida');
      setcotaMoeda('');
      return; 
    }

    try{
      const response = await axios.get(`http://economia.awesomeapi.com.br/json/last/${moeda}`);//${moeda} = TextInputS
      console.log(response.data);
        setcotaMoeda(response.data);
        Keyboard.dismiss();

    }catch(error){
      console.log('ERROR: ' + error);
    }

  }

  function limpar(){
    setMoeda('');
    inputRef.current.focus();
    setcotaMoeda(null);
  }

  return(
    <SafeAreaView style={styles.container}>
      
      <View style={styles.viewdif}>
      <View style={{alignItems: 'center'}}>
      <View style={styles.view1}>
        <Text style={styles.text}>Digite o código das moedas
             (USD=Dólar, BRL=Real)</Text>
        <TextInput
        style={styles.input}
        placeholder="Ex: USD-BRL"
        value={moeda}
        onChangeText={ (texto) => setMoeda(texto) }
        ref={inputRef}
        />
        
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity 
        style={[styles.botao, { backgroundColor: '#89FF87'}]}
        onPress={ buscar }
        >
            <Text style={styles.botaoText}>Consultar</Text>
        </TouchableOpacity> 

        <TouchableOpacity 
        style={[styles.botao, { backgroundColor: '#cd3e1d'}]}
        onPress={ limpar }
        >
            <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity> 
        </View>
        </View>
        </View>
        { cotaMoeda && //puxando .USDBRL.name pra conseguir pegar as informações da api (também limita só pra dólar)
          <View style={styles.resultado}>
            <Text style={styles.itemText}>Nomes: {cotaMoeda.USDBRL.name}</Text>   
            <Text style={styles.itemText}>Cotação: R${cotaMoeda.USDBRL.bid.slice( 0, 4)}</Text>
            <Text style={styles.itemText}>Data: {cotaMoeda.USDBRL.create_date.slice( 0, 10)}</Text>
            <Text style={styles.itemText}>Maior Valor: R${cotaMoeda.USDBRL.high.slice( 0, 4)}</Text>
            <Text style={styles.itemText}>Menor Valor: R${cotaMoeda.USDBRL.low.slice( 0, 4)}</Text>
            <Text style={styles.itemText}>Porcentagem de Mudança: {cotaMoeda.USDBRL.pctChange.slice( 0, 4)} Reais</Text>
          </View>
        }

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0198cd'
  },
  text:{
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color:"#fff"
  },
  input:{
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: 300,
    padding: 10,
    fontSize: 18
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    maginTop: 15,
    justifyContent: 'space-around'
  },
  botao:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30,
    marginTop: 15,
    marginRight: 20,
    width: 135,
    marginLeft:15
  },
  botaoText:{
    fontSize: 15,
    color: '#FFF',
    fontWeight: "bold"
  },
  resultado:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  itemText:{
    fontSize: 22,
    fontWeight:'bold',
    color:"#fff",
  
  },
  viewdif:{
    marginTop: 70,
    alignContent:"center",
    justifyContent: "center"
  },
  view1:{
    backgroundColor: "#063550",
    width: 350,
    height: 250,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 15
  }

});