import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handlePress = (value) => {
    if (value === '=') {
      try {
        setResult(eval(input)); // Caution: Avoid eval() in production apps
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '%') {
      setInput((prev) => prev + '/100'); // Convert percentage to fraction
    } else if (value === '10^') {
      setInput((prev) => prev + '10^');
    } else {
      setInput((prev) => prev + value);
    }
  };

  const themeStyles = isDarkTheme ? styles.dark : styles.light;

  return (
    <View style={[styles.container, themeStyles.container]}>
      {/* Theme Toggle */}
      <View style={styles.themeToggle}>
        <Text style={[styles.themeText, themeStyles.text]}>
          {isDarkTheme ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <Switch
          value={isDarkTheme}
          onValueChange={() => setIsDarkTheme(!isDarkTheme)}
          thumbColor={isDarkTheme ? '#fff' : '#000'}
          trackColor={{ false: '#ccc', true: '#555' }}
        />
      </View>

      {/* Input Display */}
      <TextInput
        style={[styles.input, themeStyles.input]}
        value={input}
        editable={false}
        placeholder="0"
        placeholderTextColor={isDarkTheme ? '#888' : '#aaa'}
      />
      <Text style={[styles.result, themeStyles.text]}>{result}</Text>

      {/* Basic Buttons */}
      <View style={styles.buttonContainer}>
        {[
          '1',
          '2',
          '3',
          'C',
          '4',
          '5',
          '6',
          '+',
          '7',
          '8',
          '9',
          '-',
          '.',
          '0',
          '=',
          '*',
          '(',
          ')',
          '%',
          '/',
        ].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.button, themeStyles.button]}
            onPress={() => handlePress(item)}
          >
            <Text style={[styles.buttonText, themeStyles.text]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Toggle Advanced Functions */}
      <TouchableOpacity
        style={[styles.advancedToggle, themeStyles.button]}
        onPress={() => setShowAdvanced(!showAdvanced)}
      >
        <Text style={[styles.buttonText, themeStyles.text]}>
          {showAdvanced ? 'Basic' : 'Advanced'}
        </Text>
      </TouchableOpacity>

      {/* Advanced Buttons */}
      {showAdvanced && (
        <View style={styles.advancedContainer}>
          {['x²', '√', 'log', '10^'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.button, themeStyles.button]}
              onPress={() => handlePress(item)}
            >
              <Text style={[styles.buttonText, themeStyles.text]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  themeText: {
    fontSize: 12, // Reduced text size for light/dark mode
  },
  input: {
    fontSize: 32,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'right',
  },
  result: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  advancedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  advancedToggle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
    padding: 15,
    borderRadius: 10,
  },
  button: {
    width: '22%',
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  light: {
    container: {
      backgroundColor: '#f9f9f9',
    },
    text: {
      color: '#333',
    },
    input: {
      backgroundColor: '#ffffff',
      borderColor: '#ddd',
      borderWidth: 1,
    },
    button: {
      backgroundColor: '#e0e0e0', // Light faint grey for buttons
    },
  },
  dark: {
    container: {
      backgroundColor: '#1a1a1a',
    },
    text: {
      color: '#f5f5f5',
    },
    input: {
      backgroundColor: '#333333',
      borderColor: '#555555',
      borderWidth: 1,
    },
    button: {
      backgroundColor: '#666666', // Dark faint grey for buttons
    },
  },
});
