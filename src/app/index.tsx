import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useMenu } from './_layout';

export default function HomeScreen() {
  const { menuItems } = useMenu();

  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All courses');
  const [showCourses, setShowCourses] = useState(false);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.dishName
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCourse =
        selectedCourse === 'All courses' ||
        item.course === selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }, [menuItems, search, selectedCourse]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>
          Chef's Menu
        </Text>

        <Text style={styles.subtitle}>
          Manage dishes quickly from your phone
        </Text>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push('/addmenuitems')}
        >
          <Text style={styles.plus}>+</Text>
          <Text style={styles.addButtonText}>
            Add Menu Item
          </Text>
        </Pressable>

        <TextInput
          style={styles.searchInput}
          placeholder="Search menu items"
          placeholderTextColor="#999999"
          value={search}
          onChangeText={setSearch}
        />

        <Text style={styles.filterLabel}>
          Course filter
        </Text>

        <Pressable
          style={styles.dropdown}
          onPress={() => setShowCourses(!showCourses)}
        >
          <Text style={styles.dropdownText}>
            {selectedCourse}
          </Text>

          <Text style={styles.arrow}>
            {showCourses ? '⌃' : '⌄'}
          </Text>
        </Pressable>

        {showCourses && (
          <View style={styles.courseList}>

            {[
              'All courses',
              'Starter',
              'Main Course',
              'Dessert',
            ].map((course) => (
              <Pressable
                key={course}
                style={styles.courseOption}
                onPress={() => {
                  setSelectedCourse(course);
                  setShowCourses(false);
                }}
              >
                <Text style={styles.courseOptionText}>
                  {course}
                </Text>
              </Pressable>
            ))}

          </View>
        )}

        <Text style={styles.menuTitle}>
          Menu items
        </Text>

        {filteredItems.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>
              No menu items
            </Text>

            <Text style={styles.emptyText}>
              No menu items have been added yet.
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <Pressable
              key={item.id}
              style={styles.menuCard}
              onPress={() =>
                router.push({
                  pathname: '/aditmenu',
                  params: { id: item.id },
                })
              }
            >

              <View style={styles.itemInfo}>

                <Text style={styles.dishName}>
                  {item.dishName}
                </Text>

                <Text style={styles.course}>
                  {item.course}
                </Text>

                <Text style={styles.description}>
                  {item.description}
                </Text>

              </View>

              <Text style={styles.price}>
                R{item.price}
              </Text>

            </Pressable>
          ))
        )}

        <View style={styles.bottomSpace} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#62658F',
    marginTop: 35,
  },

  subtitle: {
    fontSize: 15,
    color: '#8B8DA8',
    marginTop: 5,
    marginBottom: 28,
  },

  addButton: {
    height: 56,
    backgroundColor: '#756FE8',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 25,
    marginBottom: 20,
  },

  plus: {
    color: '#FFFFFF',
    fontSize: 23,
    marginRight: 8,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  searchInput: {
    height: 52,
    backgroundColor: '#F8F8FB',
    borderRadius: 8,
    paddingHorizontal: 18,
    fontSize: 14,
    color: '#444444',
    marginBottom: 20,
  },

  filterLabel: {
    fontSize: 13,
    color: '#8B8DA8',
    marginBottom: 7,
  },

  dropdown: {
    height: 52,
    backgroundColor: '#F8F8FB',
    borderRadius: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: 4,
  },

  courseOption: {
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEF5',
  },

  courseOptionText: {
    color: '#66687F',
    fontSize: 14,
  },

  menuTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#62658F',
    marginTop: 25,
    marginBottom: 15,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 8,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemInfo: {
    flex: 1,
  },

  dishName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#777990',
  },

  course: {
    fontSize: 12,
    color: '#7777C8',
    marginTop: 5,
  },

  description: {
    fontSize: 13,
    color: '#A0A0AC',
    marginTop: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#777990',
    marginRight: 15,
  },

  emptyBox: {
    padding: 25,
    backgroundColor: '#F8F8FB',
    borderRadius: 12,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#62658F',
  },

  emptyText: {
    color: '#999999',
    marginTop: 6,
  },

  bottomSpace: {
    height: 40,
  },
});