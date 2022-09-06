import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    selectedItem: {},
    todoId: 1,
    show: false,
  },
  getters: {
    items: state => state.items,
    selectedItem: state => state.selectedItem,
    show: state => state.show,
    todoId: state => state.todoId
  },
  mutations: {
    ADD_NEW_TASK(state, task) {
      state.items = [...state.items, task];
      state.todoId++;
    },
    SELECT_ITEM(state, item) {
      state.selectedItem = state.items.find(todo => todo.id === item);
    },
    REMOVE_TASK(state, index) {
      state.items.splice(index, 1);
    },
    SHOW_AND_HIDE_MODAL(state, modal) {
      state.show = modal;
    },
    EDIT_ITEM(state, item) {
      let changedItem = {...state.selectedItem, ...item}
      state.items.splice(state.items.indexOf(state.selectedItem), 1, changedItem)
    }
  },
  actions: {
    addNewTask({commit}, task) {
      commit('ADD_NEW_TASK', task)
    },
    removeTask({commit}, index) {
      commit('REMOVE_TASK', index)
    },
    showAndHideModal({commit}, modal) {
      commit('SHOW_AND_HIDE_MODAL', modal)
    },
    selectItem({commit}, item) {
      commit('SELECT_ITEM', item)
    },
    editItem({commit}, item) {
      commit('EDIT_ITEM', item)
    }
  },
  modules: {
  }
})
