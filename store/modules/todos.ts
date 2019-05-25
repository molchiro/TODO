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
  constructor(
    public key: string,
    public  uid: string,
    public content: string,
    public priority: number,
    public done: boolean
  ) {}
}

let unsubscribe: any = null

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
    update(state: State, todo: todo) {
      const targetIndex = state.todos.findIndex(
        x => x.key === todo.key
      )
      state.todos.splice(targetIndex, 1, todo)
    },
  },
  actions: {
    startListener({ commit, rootState }) {
      commit('initialize')
      unsubscribe = todosRef
        .where('uid', '==', rootState.auth.authedUser.uid)
        .orderBy('priority', 'asc')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              const data: any = { ...change.doc.data() }
              commit('push', new MyTodo(
                change.doc.id,
                data.uid,
                data.content,
                data.priority,
                data.done)
              )
            } else if (change.type === 'modified') {
              commit('update', {
                key: change.doc.id,
                ...change.doc.data(),
              })
            } else if (change.type === 'removed') {
              commit('pop', change.doc)
            }
          })
        })
    },
    stopListener({ commit }) {
      unsubscribe()
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
    update({ state, rootState }, todo: todo) {
      todosRef.doc(todo.key).set(
        {
          uid: todo.uid,
          content: todo.content,
          priority: todo.priority,
          done: todo.done
        },
        {
          merge: true,
        }
      )
    },
  }
}