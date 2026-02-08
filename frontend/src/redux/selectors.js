export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIslogin = (state) => state.auth.isLogin;
export const selectError = (state) => state.auth.error;

export const selectContacts = (state) => state.contact.contacts;
export const selectErrorContact = (state) => state.contact.error;
export const selectSelectedId = (state) => state.contact.selectedId;
export const selectAddPutPage = (state) => state.contact.AddPutPage;
