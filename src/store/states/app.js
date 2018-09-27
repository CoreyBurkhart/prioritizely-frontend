import Cookies from 'js-cookie';

export default {
  authenticated: Cookies.get('authenticated') === 'true',
};

// {
//   charts: {
//     [chartId]: {
//       name: String,
//       quadrants: [...quadrantId],
//       id: String
//     }
//   },
//   quadrants: {
//     [quadrantId]: {
//       name: String,
//       items: [...todoId]
//       id: String,
//     }
//   },
//   todos: {
//     [todoId]: {
//       value: String,
//       checked: Boolean,
//       id: String
//     }
//   },
// }
