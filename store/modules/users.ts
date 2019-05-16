// interface User {
//   uid: string,
//   name: string
// }

interface State {
  uid: string,
  name: string
}

export default {
  state(): State {
    return {
      uid: 'abcde',
      name: 'ikuta'
    }
  },
}