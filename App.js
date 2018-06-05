import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      text: '',
      result: 0
    }
  }

  calculate(num1, num2, operand) {
    let calc;

    switch(operand) {
      case '+': calc = num1 + num2; break;
      case '-': calc = num1 - num2; break;
      case '*': calc = num1 * num2; break;
      case '/': calc = num1 / num2; break;
      case '%': calc = num1 % num2; break;
      case '^': calc = Math.pow(num1, num2); break;
    }

    return calc;
  }

  show(text) {
    if (text.length > 0) {
      if (text[text.length - 1].match(/\s/)) {
        this.setState({text: text, result: this.state.result});
      } else {
        const textArr = text.split(' ');
        let index = 0;

        while (index < textArr.length - 2) {
          let num1 = textArr[index];
          let operand = textArr[index + 1];
          let num2 = textArr[index + 2];
          let calc = this.calculate(Number(num1), Number(num2), operand);
          textArr[index + 2] = String(calc);
          index = index + 2;
        }

        let newResult;
        if (!isNaN(Number(textArr[textArr.length - 1]))) {
          newResult = Number(textArr[textArr.length - 1]);
          this.setState({text: text, result: newResult});
        }
      }
    }else {
      let emptyResult = 0;
      this.setState({text: text, result: emptyResult});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Calculator</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.show(text)}
        />
        <Text style={styles.result}>{this.state.result}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  input: {
    height: 40, 
    width: 280,
    fontSize: 18,
    padding: 10,
    borderColor: 'gray', 
    borderWidth: 1,
    marginBottom: 10
  },
  result: {
    fontSize: 18
  }
});
