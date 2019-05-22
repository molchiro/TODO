import { db } from '~/plugins/firebaseApp.js'
const todosRef = db.collection('todos')

interface todo {
  key: string,
  uid: string,
  content: string,
  priority: number,
  done: boolean
}

interface State {
  todos: todo[]
}

class MyTodo implements todo {
  key: string
  uid: string
  content: string
  priority: number
  done: boolean
  constructor(
    key: string,
    uid: string,
    content: string,
    priority: number,
    done: boolean
  ) {
    this.key = key
    this.uid = uid
    this.content = content
    this.priority = priority
    this.done = done
  }
}

export default {
  namespaced: true,
  state(): State {
    return {
      todos: []
    }
  },
  mutations: {
    initialize(state: State) {
      state.todos = []
    },
    push(state: State, todo: todo) {
      state.todos.push(todo)
    },
  },
  actions: {
    startListener({ commit, rootState }) {
      commit('initialize')
      const samples: todo[] = [
        new MyTodo('123abc','abcde','hoge',1, true),
        new MyTodo('456bcd','abcde','huga',2, false)
      ]
      samples.forEach(todo => {
        commit('push', todo)
      })
    },
    stopListener({ commit }) {
      commit('initialize')
    },
    add({ commit, rootState }, content) {
      todosRef.add({
        content: content,
        uid: rootState.auth.authedUser.uid,
        priority: 0,
        done: false
      })
    },
  }
}