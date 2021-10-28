import { MobXProviderContext } from 'mobx-react';
import React from 'react';

// 函数声明，重载
function useStores();
function useStores(storeName);

/**
 * 获取根 store 或者指定 store 名称数据
 * @param storeName 指定子 store 名称
 * @returns typeof StoreType[storeName]
 */
function useStores(storeName) {
  const rootStore = React.useContext(MobXProviderContext);
  const { stores } = rootStore;
  return storeName ? stores[storeName] : stores;
}

export { useStores };
