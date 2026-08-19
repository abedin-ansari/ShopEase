## Add to Cart Feature Workflow

1. Created `store.js` and configured the Redux store using `configureStore`.
2. Added the `cart` reducer to the store.
3. Provided the Redux store to the application using `<Provider>` in `main.jsx`.
4. Created `cartSlice` using `createSlice`.
5. Added `name`, `initialState`, and reducers such as `addItems`, `removeItems`, and `clearCart`.
6. Used `useDispatch` to dispatch the `addItems` action when the user clicks the **Add to Cart** button.
7. The reducer updates the cart state in the Redux store.
8. Used `useSelector` in the Header to subscribe to and read the updated cart state.
9. When the state changes, the cart component re-renders with the updated data.

ADD TO CART button
↓
useDispatch()
↓
dispatch(addItems(item))
↓
cartSlice reducer handles the action
↓
Redux Store updates the state
↓
useSelector() reads/subscribes to the updated state
↓
Cart UI updates
