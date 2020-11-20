import actions from './actions';
import initialState from '../../demoData/products.json';
import firebase from '../../config/database/firebase';
import { da } from 'date-fns/locale';
import * as JsSearch from 'js-search';

const db = firebase.firestore();

const {
  singleProductBegin,
  singleProductSuccess,
  singleProductErr,

  filterProductBegin,
  filterProductSuccess,
  filterProductErr,

  sortingProductBegin,
  sortingProductSuccess,
  sortingProductErr,

  init,
  searchProduct,
} = actions;

const getData = async () => {
  const arr = [];
  const snapshot = await db.collection('products').get();
  snapshot.docs.map(doc => {
    arr.push(doc.data());
  });
  return arr;
};

const search = text => {
  return async dispatch => {
    dispatch(sortingProductBegin());
    if (text.trim() === '') {
      console.log('JOPAAA');
      getData().then(data => {
        dispatch(init(data));
      });
    } else {
      getData().then(data => {
        var search = new JsSearch.Search('id');
        search.addIndex('brand');
        search.addIndex('description');
        search.addIndex('name');
        search.addDocuments(data);
        console.log(search.search(text));
        dispatch(searchProduct(search.search(text)));
      });
    }
  };
};

const initProduct = () => {
  return async dispatch => {
    dispatch(sortingProductBegin());
    const arr = [];
    const snapshot = await db.collection('products').get();
    snapshot.docs.map(doc => {
      arr.push(doc.data());
    });

    dispatch(init(arr));
  };
};

const filterSinglePage = paramsId => {
  return async dispatch => {
    try {
      dispatch(singleProductBegin());
      getData().then(data => {
        data.map(product => {
          if (product.id === paramsId) {
            console.log(product);
            dispatch(singleProductSuccess(product));
          }
        });
      });
    } catch (err) {
      dispatch(singleProductErr(err));
    }
  };
};

const sorting = (sortBy, products, sorted) => {
  return async dispatch => {
    try {
      dispatch(sortingProductBegin());
      setTimeout(() => {
        const data = products.sort((a, b) => {
          if (sorted === 1) {
            return a[sortBy] - b[sortBy];
          } else if (sorted === 0) {
            return b[sortBy] - a[sortBy];
          }
        });
        dispatch(sortingProductSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(sortingProductErr(err));
    }
  };
};

const filterByPriceRange = range => {
  return async dispatch => {
    dispatch(filterProductBegin());
    try {
      const data = initialState.filter(product => {
        return product.price >= range[0] && product.price <= range[1];
      });
      dispatch(filterProductSuccess(data));
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const filterByRating = range => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());
      setTimeout(() => {
        const data = initialState.filter(product => {
          if (range[0].length) {
            return range[0].includes(product.rate);
          }
          return initialState;
        });
        dispatch(filterProductSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const filterByBrand = brand => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());
      setTimeout(() => {
        const data = initialState.filter(product => {
          if (brand[0].length) {
            return brand[0].includes(product.brand);
          }
          return initialState;
        });
        dispatch(filterProductSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const filterByCategory = category => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());
      getData().then(data => {
        if (category !== 'all') {
          data = data.filter(product => {
            return product.category == category;
          });
        }
        dispatch(filterProductSuccess(data));
      });
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const updateWishList = id => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());

      initialState.map(product => {
        if (product.id === id) {
          return product.popular ? (product.popular = false) : (product.popular = true);
        }
        return dispatch(filterProductSuccess(initialState));
      });
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

export {
  filterSinglePage,
  sorting,
  filterByPriceRange,
  filterByRating,
  filterByBrand,
  filterByCategory,
  updateWishList,
  initProduct,
  search,
};
