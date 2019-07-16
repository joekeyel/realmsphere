import React, { Component } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity,
    Platform, Image, Alert
} from "react-native";

const Realm = require('realm');

class TodoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
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
  }

  render() {
    const info = this.state.realm
      ? 'Number of Cat in this Realm: ' + this.state.realm.objects('Cat')[0].name
      : 'Loading...';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {info}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgb(224, 93, 144)',
        height: Platform.OS === 'ios' ? 100 : 80,
    }
})
export default TodoListComponent
