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
    },
    lastNotYetTodoIndex: state => {
      return state.todos.filter(el => el.done === false).length - 1
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
    add({ rootState, getters }, content): void {
      todosRef.add({
        content: content,
        uid: rootState.auth.authedUser.uid,
        priority: getters['maxPriority'] + 1,
        done: false,
        doneAt: null
      })
    },
    updateDone({}, { done, id }): void {
      todosRef.doc(id).update(
        {
          done: done,
          doneAt: done ? firebase.firestore.FieldValue.serverTimestamp() : null
        }
      )
    },
    updatePriority({ state, getters }, { oldIndex,  newIndex }): void {
      let newPriority: number = 0
      if (newIndex === 0) {
        newPriority = state.todos[0].priority + 1
      } else if (newIndex >= getters['lastNotYetTodoIndex']) {
        newPriority = state.todos[getters['lastNotYetTodoIndex']].priority * 0.9
      } else {
        if (newIndex > oldIndex) newIndex++
        newPriority = (state.todos[newIndex].priority + state.todos[newIndex - 1].priority) / 2
      }
      const targetId = state.todos[oldIndex].id
      todosRef.doc(targetId).update({ priority: newPriority })
    },
    delete({}, id): void {
      todosRef.doc(id).delete()
    },
  }
}