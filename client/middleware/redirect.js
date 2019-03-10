export default ({ store, redirect }) => {
  if (store.getters.users && store.getters.users.isAuthed) {
    redirect('/');
  }
};
