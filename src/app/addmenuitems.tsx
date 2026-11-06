import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useMenu } from './_layout';

export default function AddMenuItemScreen() {
  const { addMenuItem } = useMenu();

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [showCourses, setShowCourses] = useState(false);

  // Save menu item with validation
  const saveMenuItem = () => {
    if (
      dishName.trim() === '' ||
      description.trim() === '' ||
      course.trim() === '' ||
      price.trim() === ''
    ) {
      Alert.alert(
        'Error',
        'Please complete all required fields.'
      );
      return;
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      Alert.alert(
        'Invalid Price',
        'Please enter a valid price greater than R0.'
      );
      return;
    }

    addMenuItem({
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course: course,
      price: numericPrice.toFixed(2),
    });

    Alert.alert(
      'Success',
      'Menu item has been successfully added.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      <Text style={styles.title}>
        Add Menu Item
      </Text>

      <Text style={styles.subtitle}>
        Enter the details for a new dish
      </Text>

      <Text style={styles.label}>
        Dish name
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Dish name"
        placeholderTextColor="#999999"
        value={dishName}
        onChangeText={setDishName}
      />

      <Text style={styles.label}>
        Description
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#999999"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>
        Course
      </Text>

      <Pressable
        style={styles.dropdown}
        onPress={() => setShowCourses(!showCourses)}
      >
        <Text style={styles.dropdownText}>
          {course || 'Select course'}
        </Text>

        <Text style={styles.arrow}>
          {showCourses ? '⌃' : '⌄'}
        </Text>
      </Pressable>

      {showCourses && (
        <View style={styles.courseList}>
          {[
            'Starter',
            'Main Course',
            'Dessert',
          ].map((item) => (
            <Pressable
              key={item}
              style={styles.courseOption}
              onPress={() => {
                setCourse(item);
                setShowCourses(false);
              }}
            >
              <Text style={styles.courseText}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      <Text style={styles.label}>
        Price
      </Text>

      <TextInput
        style={styles.input}
        placeholder="R85.00"
        placeholderTextColor="#999999"
        keyboardType="decimal-pad"
        value={price}
        onChangeText={(text) => {
          if (/^\d*\.?\d{0,2}$/.test(text)) {
            setPrice(text);
          }
        }}
      />

      <Pressable
        style={styles.saveButton}
        onPress={saveMenuItem}
      >
        <Text style={styles.saveText}>
          Save Menu Item
        </Text>
      </Pressable>

      <Pressable
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelText}>
          Cancel
        </Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    padding: 24,
    paddingBottom: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#62658F',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 15,
    color: '#8B8DA8',
    marginTop: 5,
    marginBottom: 35,
  },

  label: {
    fontSize: 13,
    color: '#8B8DA8',
    marginBottom: 7,
  },

  input: {
    minHeight: 54,
    backgroundColor: '#F8F8FB',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 14,
    color: '#555555',
    marginBottom: 23,
  },

  dropdown: {
    height: 54,
    backgroundColor: '#F8F8FB',
    borderRadius: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 23,
  },

  dropdownText: {
    fontSize: 14,
    color: '#777990',
  },

  arrow: {
    fontSize: 20,
    color: '#777990',
  },

  courseList: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEF5',
    borderRadius: 8,
    marginTop: -18,
    marginBottom: 23,
  },

  courseOption: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEF5',
  },

  courseText: {
    color: '#66687F',
  },

  saveButton: {
    height: 54,
    backgroundColor: '#756FE8',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  cancelButton: {
    alignItems: 'center',
    padding: 18,
  },

  cancelText: {
    color: '#756FE8',
    fontWeight: '600',
  },
});