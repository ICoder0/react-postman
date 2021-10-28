import { makeAutoObservable, runInAction } from 'mobx';

class postmanStore {
  data = [];

  constructor() {
    makeAutoObservable(this);
  }

  changeDataSource = async (params) => {
    runInAction(() => {
      this.data = [];
    });
  };
}

export default new postmanStore();
