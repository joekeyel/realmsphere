import React, { Component } from 'react';
import {
    StyleSheet, View, Text,
    Platform, Image, Alert,FlatList,ActivityIndicator,TouchableOpacity
} from "react-native";
import axios from 'axios';
const Realm = require('realm');

class TodoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null,
      isLoading: true };
  }

  componentDidMount() {
    Realm.open({
      schema: [{name: 'Cat', properties: {name: 'string'}}]
    }).then(realm => {
      realm.write(() => {
        realm.create('Cat', {name: 'Rex'});
      });
      this.setState({ realm });
    });

    axios.get('https://reactnativecode.000webhostapp.com/FruitsList.php')
  .then(response => {
    console.log(response.data);
    this.setState({
      dataSource: response.data,
      isLoading: false,
    }, function() {
      // In this block you can do something with new state.
    });
  })
  .catch(error => {
    console.log(error);
  });

  axios.get('http://58.27.84.166/mcconline/sphere_test/project_list.php?username=S12760')
  .then(response => {
    console.log(response.data.masterlist);

    this.setState({
      dataSourcesphere: response.data.masterlist,
      isLoading: false,
    }, function() {
      // In this block you can do something with new state.
    });
  })
  .catch(error => {
    console.log(error);
  });

  

const dataForm = new FormData();
dataForm.append('username', 'S12760');
dataForm.append('password', 'Joekey79');

    axios.post('http://58.27.84.166/mcconline/sphere_test/loginprocess.php', dataForm,
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}  

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  GetFlatListItem (fruit_name) {
   
    Alert.alert(fruit_name);
   
    }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
 
    return (
 
<View style={styles.MainContainer}>
  
       <FlatList
       
          data={ this.state.dataSourcesphere }
          
          ItemSeparatorComponent = {this.FlatListItemSeparator}
 
          renderItem={
            
        ({item}) => <View><Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this,item.PROJECT_NAME)} > {item.PROJECT_NAME} </Text>
        <Text>{item.PROJECT_ID}</Text>
        <TouchableOpacity
        style = {styles.button}
         onPress={this.onPress}
         >
         <Text> Touch Here </Text>
       </TouchableOpacity>
        </View>
        
      }
 
          keyExtractor={(item, index) => index}

          
          
         />
    
    
</View>
            
    );
  }
}

const styles = StyleSheet.create({
 
  MainContainer :{
   
  justifyContent: 'center',
  flex:1,
  margin: 10,
  paddingTop: (Platform.OS === 'ios') ? 20 : 0,
   
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
   
  FlatListItemStyle: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
   
  });
  
export default TodoListComponent
