/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { AppRegistry, Component, StyleSheet, Text, NavigatorIOS, ListView, Image, View, TouchableHighlight } from 'react-native'

class AwesomeProject extends Component {
  render () {
    return (
    <NavigatorIOS style={styles.container} initialRoute={{  component: MyListView,  title: 'My View Title',  passProps: { myProp: 'foo' }}} />
    )
  }
}

class MyListView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount () {
    fetch('https://api.fieldbook.com/v1/5676d9a0be5b1f03002f63e9/ga_students_wdi_sg_discussions')
      .then((res) => res.json())
      .then((resData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(resData)
        })
      })
      .done()
  }

  render () {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <UserBox {...rowData} navigator={this.props.navigator}/>}
      />
    )
  }
}

class UserBox extends Component {
  render () {
    return (
      <TouchableHighlight
        onPress = { () => {
          this.props.navigator.push({
            title: this.props.displayname,
            component: UserProfileScreen,
            passProps: this.props
          })
        }
      }>
        <View style={styles.userBox}>
          <Text>{this.props.username}</Text>
          <Text>{this.props.displayname}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

class UserProfileScreen extends Component {
  render () {
    return (
      <View style={styles.userBox}>
        <Image
        style={styles.profilePic}
        source={{uri: this.props.avatarurlmedium}}
        />
        <Text>{this.props.username}</Text>
        <Text>{this.props.displayname}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listViewContainer: {
    flex: 1
  },
  userBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'white'
  },
  profilePic: {
    marginTop: 200,
    width: 100,
    height: 100
  }
})
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
