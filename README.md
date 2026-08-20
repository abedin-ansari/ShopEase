# ShopEase

A React e-commerce application with Firebase authentication, protected routes, product cards, and a Redux-powered shopping cart.

## Authentication

- Login and registration are handled in `Login.jsx`.
- `isSignInForm` switches between sign-in and sign-up modes.
- `useRef` reads the name, email, and password fields.
- `handleToggle` switches the form mode.
- `checkValidateData` validates email and password before Firebase is called.
- Validation messages are stored in `errorMessage` and displayed in the form.
- `if (message) return` stops invalid requests.

### Firebase Setup

- `src/utils/firebase.js` initializes Firebase with environment variables.
- `getAuth()` creates and exports the Firebase Auth service.
- `Login.jsx` uses `createUserWithEmailAndPassword` for registration.
- `signInWithEmailAndPassword` handles login.
- `updateProfile` saves the user's display name after registration.
- Firebase is the source of truth for authentication.

### Authentication Flow

Registration:

1. The user enters a name, email, and password.
2. `checkValidateData` validates the input.
3. `createUserWithEmailAndPassword(auth, email, password)` creates the account.
4. `updateProfile` adds the user's `displayName`.
5. User details are dispatched to Redux with `dispatch(addUser(...))`.
6. The user is navigated to the home page.

Login:

1. The user enters an email and password.
2. `checkValidateData` validates the input.
3. `signInWithEmailAndPassword(auth, email, password)` signs the user in.
4. Firebase updates the authentication session.
5. `onAuthStateChanged` in `App.jsx` dispatches `addUser`.
6. The user is navigated to the home page.

### `onAuthStateChanged`

`onAuthStateChanged` runs when the app starts and whenever the authentication state changes.

```js
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(addUser({ uid, email, displayName }));
    } else {
      dispatch(removeUser());
    }
  });
}, []);
```

- If Firebase returns a user, `addUser` stores the user's details in Redux.
- If Firebase returns `null`, `removeUser` clears the Redux user state.
- The listener keeps Redux synchronized with Firebase after refreshes and auth changes.
- The listener is registered when `App` loads.

## Redux Setup

Redux Toolkit keeps the authenticated user and shopping cart in one central store.

### `userSlice.js`

1. Import `createSlice` from `@reduxjs/toolkit`.
2. Set the slice name to `user`.
3. Set `initialState` to `null`.
4. `addUser` returns the authenticated user's data.
5. `removeUser` returns `null` after sign out.
6. Export the generated actions and reducer.
7. Register the reducer in the Redux store.

```js
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => action.payload,
    removeUser: () => null,
  },
});
```

Authentication state flow:

```text
Firebase login/register
        ↓
Firebase Auth changes
        ↓
onAuthStateChanged(auth, callback)
        ↓
dispatch(addUser(user)) or dispatch(removeUser())
        ↓
userSlice updates Redux state
        ↓
Components read the current user with useSelector()
```

### Add to Cart Workflow

1. `appStore.js` configures the Redux store with `configureStore`.
2. The `cart` reducer is added to the store.
3. `Provider` in `main.jsx` provides the Redux store to the application.
4. `cartSlice` is created with Redux Toolkit's `createSlice`.
5. The slice includes `initialState`, `addItems`, `removeItems`, and `clearCart`.
6. `useDispatch` dispatches `addItems` when Add to Cart is clicked.
7. The reducer updates the cart state.
8. `useSelector` in the Header and Cart components reads the updated state.
9. The cart UI re-renders when the state changes.

```text
ADD TO CART button
        ↓
useDispatch()
        ↓
dispatch(addItems(item))
        ↓
cartSlice reducer handles the action
        ↓
Redux Store updates
        ↓
useSelector() reads the cart
        ↓
Cart UI updates
```

Cart data currently exists in Redux memory only and resets after a page refresh. Use `localStorage` or a database if persistence is required.

## Project Setup

### Prerequisites

- Node.js v16 or higher
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd ecommerce
npm install
copy .env.example .env
npm start
```

Open `http://localhost:5173` and add your Firebase values to `.env`.

## Project Structure

```text
src/
├── components/       # Login, Cart, Home, and reusable UI
├── utils/             # Redux slices, Firebase config, and helpers
├── Images/            # Local image assets
├── App.jsx            # Auth state and protected routes
├── main.jsx           # React and Redux entry point
└── index.css          # Global styles
```

## Key Features

- Firebase login and registration with email validation
- Protected home and cart routes
- Redux Toolkit shopping cart state
- Add, remove, and clear cart actions
- Product cards from local JSON data
- Responsive Bootstrap and custom CSS UI
- Hero carousel and cart total calculation

## Product Data

Products are stored in `db.json` and imported by `src/components/Home.jsx`, so they are included in the Vite production bundle. `json-server` is not required after deployment.

For local API testing only:

```bash
npx json-server --watch db.json
```

Do not use `http://localhost:3000` in the deployed frontend because it points to the visitor's computer.

## Deploy to Vercel

1. Push the project to GitHub and import it into Vercel.
2. Use the Vite defaults: build command `npm run build`, output directory `dist`.
3. Add all variable names listed in `.env.example` to Vercel Project Settings > Environment Variables.
4. Redeploy after changing environment variables.
5. Add the Vercel domain to Firebase Authentication > Authorized domains.

`vercel.json` rewrites client-side routes such as `/home` and `/cart` to `index.html`, so direct navigation and refreshes work.

Never commit `.env` or real credentials. Keep placeholder values in `.env.example` only.

## Scripts

```bash
npm start       # Start development server
npm run build   # Create production build
npm run preview # Preview production build
npm run lint    # Run ESLint
```
