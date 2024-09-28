import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import axios from 'axios';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const APP_ID = 'c7c1a493'; // Replace with your Edamam APP_ID
  const APP_KEY = '59ce5f1a731ef7a57afed5f9823938d8	'; // Replace with your Edamam APP_KEY

  const fetchRecipes = async () => {
    if (!search.trim()) return; // Don't fetch if search input is empty
    setLoading(true);
    try {
      const response = await axios.get(`https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      setRecipes(response.data.hits);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    }
  };

  const renderRecipe = ({ item }) => (
    <View style={styles.recipeContainer}>
      <Image source={{ uri: item.recipe.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.recipe.label}</Text>
        <Text>Calories: {Math.round(item.recipe.calories)}</Text>
        <Text>Ingredients: {item.recipe.ingredients.length}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(item.recipe.url)}>
          <Text style={styles.recipeLink}>View Recipe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a recipe..."
        value={search}
        onChangeText={setSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={fetchRecipes}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.recipe.uri}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recipeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  recipeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeLink: {
    color: '#FF6347',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default App;
