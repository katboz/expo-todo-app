import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import { FlatList, Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



type ToDoType = {
  id:number;
  title: string;
  isDone: boolean;
};

export default function Index() {
    const todoData = [
      {
        id: 1,
        title:"Todo 1",
        isDone: false,
      },
      {
        id: 2,
        title:"Todo 2",
        isDone: false,
      },
      {
        id: 3,
        title:"Todo 3",
        isDone: false,
      },
      {
        id: 4,
        title:"Todo 4",
        isDone: false,
      },
      {
        id: 5,
        title:"Todo 5",
        isDone: true,
      },
      {
        id: 6,
        title:"Todo 6",
        isDone: false,
      },
    ];

    const [todos, setTodos] = useState<ToDoType[]>(todoData);
    const [todoText, setTodoText] = useState<string>('');
    const addTodo = async()=>{
      try{
      const newTodo ={
        id: Math.random(),
        title: todoText,
        isDone: false,
      };

      todos.push(newTodo);
      setTodos(todos);
      await AsyncStorage.setItem('my-todo', JSON.stringify(todos) );
      setTodoText('');
      Keyboard.dismiss
    }
    catch(error){
      console.log(error)
    }
    }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {alert('Clicked!')}}>
          <Ionicons name="menu" size={24} color={'333'}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
        <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}}
        style={{width:40, height:40, borderRadius:20}}/>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name='search' size={24} color={'#333'}/>
        <TextInput placeholder='Search'
        style={styles.searchInput}
        clearButtonMode='always'
        />
        
      </View>

      <FlatList
      data={[...todos].reverse()}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item})=>(
        <ToDoItem 
        todo={item}
        />
      )}
    />

    <KeyboardAvoidingView
    style={styles.footer}
    behavior='padding'
    keyboardVerticalOffset={10}
    >
      <TextInput 
      placeholder='Add New ToDo'
      value={todoText}
      onChangeText={(text)=> setTodoText(text)}
      style={styles.newTodoInput}
      autoCorrect={false}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
      <Ionicons name='add' size={34} color={'#fff'}/>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ToDoItem = ({todo}: {todo: ToDoType}) => (
  <View style={styles.todoContainer}>
          <View style={styles.todoInfoContainer}>
          <Checkbox value={todo.isDone} color={todo.isDone ? '#4630EB': undefined}/>
          <Text
           style={[
            styles.todoText,
            todo.isDone && {textDecorationLine:'line-through'}]
           }
            >
            {todo.title}
            </Text>
          </View>
          <TouchableOpacity
          onPress={()=> {
            alert('Deleted ' + todo.id );
          }}>
          <Ionicons name='trash' size={24} color={'red'}/>
          </TouchableOpacity>
        </View>
)

const styles = StyleSheet.create({
  container:{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor:'f5f5f5',
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:20,
  },
  searchBar:{
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    gap: 10,
    marginBottom: 10,
  },
  searchInput:{
    flex: 1,
    fontSize: 16,
    color:'#afaeae',
  },
  todoContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer:{
  flexDirection:'row',
  gap: 10,
  alignItems: 'center',
  },
  todoText:{
    fontSize: 16,
    color:'#333'
  },
 footer:{
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
 },
 newTodoInput:{
  flex: 1,
  backgroundColor: '#fff',
  padding: 16,
  borderRadius: 10,
  fontSize: 16,
  color: '#afaeae',
 },
 addButton:{
  backgroundColor:'#4630EB',
  padding:8,
  borderRadius: 10,
  marginLeft: 20,

 },
})