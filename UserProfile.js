import React, {useReducer, useState} from 'react';
import { StyleSheet, View, Image, TextInput, Button,FlatList, useColorScheme } from 'react-native';
import {Feed} from './Feed';


export const UserProfile = (props) => {
  
  const data = props.data; 
  const _lista = props.lista;
  const user=props.userD;

  const [text, onChangeText] = React.useState("");
  
  const [isFocus, setIsFocus] = useState(false);
  const onFocus = () =>{
      setIsFocus(!isFocus);
  }
  function pushData()
  {
    if(text==""){
      alert("Post vacio");

    }else{
    _lista.push({
      "_id": _lista.length+1,
      "name": user.name,
      "image": user.image,
      "description": text,
      "like": true,
    },)
    onChangeText("");
  }

  }
  
  return(
    <>
    <View style={styles.container}>
      <Image 
        source={{ uri: data.image }}
        style={styles.imageIcon}
      />
      <TextInput 
        style={styles.textInput}
        placeholder="What's your doggo doing?"
        clearTextOnFocus={true}
        multiline
        numberOfLines={2}
        maxLength={80}
        textBreakStrategy='balanced'
        onChangeText={onChangeText}
        value={text}
        onFocus={() => onFocus()}
        onBlur={()=>onFocus()}
        on
      />
    </View>
    <View style={styles.button}>
      { isFocus ? <Button title="POST" onPress={()=>{pushData()}} />  
                :null}
    </View>

    <FlatList 
      keyExtractor={ (item) => String(item['_id']) }
      data = {_lista}
      renderItem = { ({item}) =>(
        <Feed data={item}/>
      )}
    />

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  textInput:{
    fontFamily: 'Georgia',
    fontSize: 15,
    width: 330,
    color: 'black', 
  },
  imageIcon:{
    marginLeft: 5,
    marginRight: 5,
    width: 30, 
    height:30,
    borderRadius: 40,
  },
  button: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  }
});