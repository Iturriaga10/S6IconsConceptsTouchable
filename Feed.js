import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Pressable,
  Alert,
  Modal,
} from "react-native";

import { Feather, AntDesign, Entypo } from "@expo/vector-icons";

export const Feed = (props) => {
  const [data, setData] = useState(props.data);

  const [like, setLike] = useState(props.data.like);

  const [modalVisible, setModalVisible] = useState(false);

  const [dataOnModal, setDataOnModal] = useState(data);

  const _sendData = (props) => {
    setDataOnModal(props);
    setModalVisible(!modalVisible);
  };

  const _onPressButton = () => {
    data.like = !data.like;
    setData(data);
    setLike(!like);
  };

  const getRandomColor = () => {
    return (
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")"
    );
  };

  const createThreeButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Ask me later",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>
                {dataOnModal.name} Hide Modal
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.headerContainer}>
        <Image source={{ uri: data.image }} style={styles.imageIcon} />
        <Text style={styles.text}>{data.name}</Text>
      </View>
      <Text style={styles.descriptionText}>{data.description}</Text>
      <View style={styles.imageReactionContainer}>
        <TouchableHighlight onPress={_onPressButton} underlayColor="white">
          <View style={styles.iconContainer}>
            {like ? (
              <Entypo name="baidu" size={20} color="rgb(110,110,110)" />
            ) : (
              <Entypo name="baidu" size={20} color="blue" />
            )}
          </View>
        </TouchableHighlight>
        <View style={styles.iconContainer}>
          <Feather name="share-2" size={20} color="rgb(110,110,110)" />
        </View>
        <Pressable
          onLongPress={() => {
            createThreeButtonAlert();
          }}
          delayLongPress={1000}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? getRandomColor() : "white",
            },
            styles.wrapperCustom,
          ]}
          onPress={() => _sendData(data)}
        >
          {({ pressed }) => (
            <AntDesign
              name="qrcode"
              size={pressed ? 25 : 20}
              color={pressed ? getRandomColor() : "black"}
            />
          )}
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
  },
  text: {
    fontFamily: "sans-serif-light",
    fontSize: 20,
    color: "black",
  },
  descriptionText: {
    margin: 8,
  },
  imageIcon: {
    marginTop: 5,
    marginLeft: 16,
    marginRight: 16,
    width: 30,
    height: 30,
    borderRadius: 40,
  },
  imageReactionContainer: {
    flexDirection: "row",
    borderBottomColor: "rgb(110,110,110)",
    borderBottomWidth: 7,
  },
  iconContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
  },
  imageReaction: {
    marginLeft: 16,
    width: 30,
    height: 30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
