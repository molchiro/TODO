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

class MyTodo implements todo {
  constructor(
    public id: string,
    public uid: string,
    public content: string,
    public priority: number,
    public done: boolean,
    public doneAt: Date
  ) {}
}

export default {
  namespaced: true,
  state(): State {
    return {
      todos: []
    }
  },
  actions: {
    bind: firestoreAction(({ bindFirestoreRef, rootGetters }) => {
      return bindFirestoreRef(
        'todos',
        todosRef.where('uid', '==', rootGetters['auth/authedUserUid']).orderBy('priority', 'asc')
      )
    }),
    add({ rootState }, content) {
      todosRef.add({
        content: content,
        uid: rootState.auth.authedUser.uid,
        priority: 0,
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