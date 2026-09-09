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
import { router, useLocalSearchParams } from 'expo-router';
import { useMenu } from './_layout';

export default function EditMenuItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    menuItems,
    updateMenuItem,
    deleteMenuItem,
  } = useMenu();

  const item = menuItems.find(
    (menuItem) => menuItem.id === id
  );

  const [dishName, setDishName] = useState(
    item?.dishName || ''
  );

  const [description, setDescription] = useState(
    item?.description || ''
  );

  const [course, setCourse] = useState(
    item?.course || ''
  );

  const [price, setPrice] = useState(
    item?.price || ''
  );

  const [showCourses, setShowCourses] = useState(false);

  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>
          Menu item not found
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  const updateItem = () => {
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

    updateMenuItem({
      id: item.id,
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: price.trim(),
    });

    Alert.alert(
      'Success',
      'Menu item has been updated.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const deleteItem = () => {
    Alert.alert(
      'Delete Menu Item',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteMenuItem(item.id);
            router.back();
          },
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
        Edit Menu Item
      </Text>

      <Text style={styles.subtitle}>
        Update or remove a menu item
      </Text>

      <Text style={styles.label}>
        Dish name
      </Text>

      <TextInput
        style={styles.input}
        value={dishName}
        onChangeText={setDishName}
      />

      <Text style={styles.label}>
        Description
      </Text>

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>
        Course
      </Text>

      <Pressable
        style={styles.dropdown}
        onPress={() => setShowCourses(!showCourses)}
      >
        <Text style={styles.dropdownText}>
          {course}
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
          ].map((courseName) => (
            <Pressable
              key={courseName}
              style={styles.courseOption}
              onPress={() => {
                setCourse(courseName);
                setShowCourses(false);
              }}
            >
              <Text style={styles.courseText}>
                {courseName}
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
        value={`R${price}`}
        keyboardType="numeric"
        onChangeText={(text) =>
          setPrice(text.replace('R', ''))
        }
      />

      <View style={styles.buttonRow}>

        <Pressable
          style={styles.updateButton}
          onPress={updateItem}
        >
          <Text style={styles.updateText}>
            Update Item
          </Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={deleteItem}
        >
          <Text style={styles.deleteText}>
            Delete Item
          </Text>
        </Pressable>

      </View>

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
    height: 54,
    backgroundColor: '#F8F8FB',
    borderRadius: 8,
    paddingHorizontal: 18,
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

  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 5,
  },

  updateButton: {
    flex: 1,
    height: 54,
    backgroundColor: '#756FE8',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },

  updateText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  deleteButton: {
    flex: 1,
    height: 54,
    backgroundColor: '#71C9C4',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#62658F',
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: '#756FE8',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },

  backText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});