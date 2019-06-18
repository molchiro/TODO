import firebase from 'firebase/app'
import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebaseApp.js'
const todosRef = db.collection('todos')

interface todo {
  id: string,
  uid: string,
  content: string,
  priority: number,
  done: boolean,
  doneAt: Date
}

interface State {
  todos: todo[]
}

export default {
  namespaced: true,
  state(): State {
    return {
      todos: []
    }
  },
  getters: {
    maxPriority: state => {
      return Math.max(0, ...state.todos.map(todo => todo.priority))
    }
  },
  actions: {
    bind: firestoreAction(({ bindFirestoreRef, rootGetters }) => {
      return bindFirestoreRef(
        'todos',
        todosRef
          .where('uid', '==', rootGetters['auth/authedUserUid'])
          .orderBy('done', 'asc')
          .orderBy('doneAt', 'desc')
          .orderBy('priority', 'desc')
      )
    }),
    add({ rootState, getters }, content) {
      todosRef.add({
        content: content,
        uid: rootState.auth.authedUser.uid,
        priority: getters['maxPriority'] + 1,
        done: false,
        doneAt: null
      })
    },
    updateDone({}, todo: todo) {
      todosRef.doc(todo.id).set(
        {
          done: todo.done,
          doneAt: todo.done ? firebase.firestore.FieldValue.serverTimestamp() : null
        },
        {
          merge: true,
        }
      )
    },
    delete({}, id) {
      todosRef.doc(id).delete()
    },
  }
}