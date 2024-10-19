import instance from './axios';

export const UserLoginApi = (user) => {
  return instance.post('/login', user);
};

export const getUserProfile = () => {
    return instance.get('/user-profile');
  };

  export const getUsersList = () => {
    return instance.get('/users-list');
  };

  export const updateUser  = (userId, user) => {
    return instance.post(`/users-update/${userId}`, user);
  };

  export const editUser  = (userId, user) => {
    return instance.post(`/users-edit/${userId}`, user);
  };

  export const deleteUser  = (userId) => {
    return instance.get(`users-delete/${userId}`);
  };

  export const logoutUserProfile = () => {
    return instance.post('/logout');
  };

  export const showMetaTag = () => {
    return instance.get('/meta-tags');
  };

  export const createMetaTag  = (metaDataObj) => {
    return instance.post('/meta-tags-add',metaDataObj);
  };

  export const editMetaTag = (metaId) => {
    return instance.get(`/meta-tags-edit/${metaId}`);
  };

  export const updateMetaTag = (metaId, metaDataObj) => {
    return instance.post(`/meta-tags-update/${metaId}`, metaDataObj);
};

  export const deleteMetaTag  = (metaId) => {
    return instance.delete(`/meta-tags-delete/${metaId}`);
  };
