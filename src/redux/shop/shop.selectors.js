import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectDirectory = (state) => state.shop;

export const selectCollections = createSelector(
   [selectDirectory],
   (shop) => shop.collections
);

export const selectCollection = memoize((collectionUrlParam) =>
   createSelector([selectCollections], (collections) =>
      collections ? collections[collectionUrlParam] : null
   )
);

export const selectCollectionsForPreview = createSelector(
   [selectCollections],
   (collections) =>
      collections ? Object.keys(collections).map((key) => collections[key]) : []
);