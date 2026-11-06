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
import StatCard from '../components/StatCard';

export default function HomeScreen() {
  const { menuItems } = useMenu();

  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All courses');
  const [showCourses, setShowCourses] = useState(false);

  // Calculate menu statistics
  const statistics = useMemo(() => {
    const total = menuItems.length;

    const prices = menuItems
      .map((item) =>
        Number.parseFloat(
          String(item.price).replace(/[^\d.]/g, '')
        )
      )
      .filter((price) => Number.isFinite(price));

    const average =
      prices.length > 0
        ? prices.reduce((sum, price) => sum + price, 0) /
          prices.length
        : 0;

    const starters = menuItems.filter(
      (item) => item.course === 'Starter'
    ).length;

    const mainCourses = menuItems.filter(
      (item) => item.course === 'Main Course'
    ).length;

    const desserts = menuItems.filter(
      (item) => item.course === 'Dessert'
    ).length;

    return {
      total,
      average,
      starters,
      mainCourses,
      desserts,
    };
  }, [menuItems]);

  // Search and filter menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.dishName
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCourse =
        selectedCourse === 'All courses' ||
        item.course === selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }, [menuItems, search, selectedCourse]);

  // Clear search and filters
  const clearFilters = () => {
    setSearch('');
    setSelectedCourse('All courses');
    setShowCourses(false);
  };

  const hasFilters =
    search.trim().length > 0 ||
    selectedCourse !== 'All courses';

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>
          Chef's Menu
        </Text>

        <Text style={styles.subtitle}>
          Manage dishes quickly from your phone
        </Text>

        {/* ADD MENU ITEM */}

        <Pressable
          style={styles.addButton}
          onPress={() => router.push('/addmenuitems')}
        >
          <Text style={styles.plus}>+</Text>

          <Text style={styles.addButtonText}>
            Add Menu Item
          </Text>
        </Pressable>

        {/* MENU STATISTICS */}

        <Text style={styles.sectionTitle}>
          Menu Statistics
        </Text>

        <View style={styles.statsContainer}>

         <View style={styles.statsContainer}>

  <StatCard
    title="Total Items"
    value={statistics.total}
  />

  <StatCard
    title="Average Price"
    value={`R${statistics.average.toFixed(2)}`}
  />

  <StatCard
    title="Starters"
    value={statistics.starters}
  />

  <StatCard
    title="Main Courses"
    value={statistics.mainCourses}
  />

  <StatCard
    title="Desserts"
    value={statistics.desserts}
  />

</View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              R{statistics.average.toFixed(2)}
            </Text>

            <Text style={styles.statLabel}>
              Average Price
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {statistics.starters}
            </Text>

            <Text style={styles.statLabel}>
              Starters
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {statistics.mainCourses}
            </Text>

            <Text style={styles.statLabel}>
              Main Courses
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {statistics.desserts}
            </Text>

            <Text style={styles.statLabel}>
              Desserts
            </Text>
          </View>

        </View>

        {/* SEARCH MENU ITEMS */}

        <Text style={styles.sectionTitle}>
          Search Menu
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search menu items by name..."
          placeholderTextColor="#999999"
          value={search}
          onChangeText={setSearch}
        />

        {/* COURSE FILTER */}

        <Text style={styles.filterLabel}>
          Filter by Course
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

        {/* CLEAR FILTERS */}

        {hasFilters && (
          <Pressable
            style={styles.clearButton}
            onPress={clearFilters}
          >
            <Text style={styles.clearText}>
              Clear Search and Filters ✕
            </Text>
          </Pressable>
        )}

        {/* DISPLAY MENU ITEMS */}

        <Text style={styles.menuTitle}>
          Menu Items ({filteredItems.length})
        </Text>

        {filteredItems.length === 0 ? (
          <View style={styles.emptyBox}>

            <Text style={styles.emptyTitle}>
              No menu items found
            </Text>

            <Text style={styles.emptyText}>
              Try another search or change your course filter.
            </Text>

            {hasFilters && (
              <Pressable onPress={clearFilters}>
                <Text style={styles.clearText}>
                  Clear Filters
                </Text>
              </Pressable>
            )}

            {menuItems.length === 0 && (
              <Pressable
                style={styles.emptyAddButton}
                onPress={() => router.push('/addmenuitems')}
              >
                <Text style={styles.emptyAddText}>
                  Add Your First Menu Item
                </Text>
              </Pressable>
            )}

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

                <Text style={styles.editHint}>
                  Tap to edit or delete
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

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#62658F',
    marginBottom: 12,
  },

  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  statCard: {
    width: '48%',
    backgroundColor: '#F8F8FB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#756FE8',
  },

  statLabel: {
    fontSize: 12,
    color: '#8B8DA8',
    marginTop: 5,
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

  clearButton: {
    alignSelf: 'flex-end',
    paddingVertical: 12,
  },

  clearText: {
    color: '#756FE8',
    fontSize: 13,
    fontWeight: '700',
  },

  menuTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#62658F',
    marginTop: 15,
    marginBottom: 15,
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EEEEF5',
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

  editHint: {
    fontSize: 11,
    color: '#756FE8',
    marginTop: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#777990',
    marginRight: 8,
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
    textAlign: 'center',
  },

  emptyAddButton: {
    backgroundColor: '#756FE8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
  },

  emptyAddText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  bottomSpace: {
    height: 40,
  },
});