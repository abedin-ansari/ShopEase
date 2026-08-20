Authentication

- Login/Register page
- Validate Data Logic
- Firebase Setup

### Authentication Completed

#### 1. Login/Register Page

- The `Login.jsx` component uses one form for both **Sign In** and **Sign Up**.
- `isSignInForm` decides which mode is active.
- `useRef` reads the name, email, and password values from the inputs.
- `handleToggle` switches between the Sign In and Sign Up forms.
- After successful authentication, `navigate("/")` sends the user to the home page.

#### 2. Validate Data Logic

- `checkValidateData` from `src/utils/validate.js` checks the email and password before Firebase is called.
- The returned validation message is stored in `errorMessage` and displayed below the inputs.
- `if (message) return` stops the request when the form data is invalid.
- This gives the user immediate feedback and avoids unnecessary Firebase requests.

#### 3. Firebase Setup

- `src/utils/firebase.js` imports `initializeApp` and `getAuth` from Firebase.
- `initializeApp(firebaseConfig)` connects the React app to the Firebase project.
- `getAuth()` creates the Firebase Authentication service, which is exported as `auth`.
- `Login.jsx` uses `createUserWithEmailAndPassword` for registration and `signInWithEmailAndPassword` for login.
- After registration, `updateProfile` saves the user's display name in Firebase.
- Firebase handles the authentication session and provides the authenticated `user` object.

### Authentication Flow

#### Registration

1. The user enters a name, email, and password.
2. `checkValidateData` validates the email and password.
3. `createUserWithEmailAndPassword(auth, email, password)` creates the Firebase account.
4. `updateProfile` adds the user's `displayName`.
5. The user details are dispatched to Redux with `dispatch(addUser(...))`.
6. The user is navigated to the home page.

#### Login

1. The user enters an email and password.
2. `checkValidateData` validates the form values.
3. `signInWithEmailAndPassword(auth, email, password)` signs the user in.
4. Firebase updates its authentication session.
5. `onAuthStateChanged` in `App.jsx` receives the signed-in user and dispatches `addUser`.
6. The user is navigated to the home page.

### `onAuthStateChanged` and Auth State Changes

`onAuthStateChanged` is Firebase's listener for authentication state changes. It runs once when the app starts and again whenever the user signs in or signs out.

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

- If Firebase returns a `user`, someone is authenticated, so `addUser` stores the user's details in Redux.
- If Firebase returns `null`, nobody is authenticated, so `removeUser` clears the Redux user state.
- This listener keeps Redux synchronized with Firebase, including after a page refresh.
- Firebase is the source of truth for authentication; Redux only makes the current user available to React components.
- The listener is placed inside `useEffect` so it is registered when `App` loads. The empty dependency array means it is registered once.

### How `userSlice` Was Created for Authentication

`userSlice.js` was created with Redux Toolkit's `createSlice` to keep the current authenticated user in one central place.

1. Import `createSlice` from `@reduxjs/toolkit`.
2. Give the slice the name `user`.
3. Set `initialState` to `null`, because there is no logged-in user initially.
4. Create an `addUser` reducer that returns the authenticated user's data.
5. Create a `removeUser` reducer that returns `null` when the user signs out.
6. Export the generated actions, `addUser` and `removeUser`.
7. Export the slice reducer and register it in the Redux store as the `user` reducer.

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

The complete authentication state flow is:

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
Components can read the current user with useSelector()
```

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

## Project Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ecommerce
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):

   ```bash
   cp .env.example .env
   ```

4. Add your Firebase credentials to `.env`

5. Start the development server:

   ```bash
   npm start
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/          # React components (Login, Cart, Home, etc.)
├── utils/              # Redux slices, Firebase config, helpers
├── Images/             # Image assets
├── App.jsx             # Main app with route protection
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Key Features

- ✅ **Authentication** - Firebase login/register with email validation
- ✅ **Protected Routes** - Users must login before accessing home/cart
- ✅ **Add to Cart** - Redux state management for shopping cart
- ✅ **Remove Items** - Remove specific items from cart by ID
- ✅ **Responsive Design** - Bootstrap + custom CSS styling
- ✅ **Hero Carousel** - Beautiful image carousel on home page
- ✅ **Clean Cart UI** - Professional cart page with total calculation

## Deployment Guide

### ❓ Cart Data Question: Will It Be Saved?

**Question: Will my cart data be deployed and visible if I deploy?**

**Answer: No, cart data is NOT persisted between sessions. Here's why:**

- Cart data is stored in **Redux (client-side memory only)**
- Redux state only exists while the browser tab is open
- When user refreshes the page → cart empties ✅ (normal behavior)
- When user closes browser → cart data disappears ✅ (normal behavior)
- Each user starts with empty cart ✅ (this is correct)

**This is EXPECTED behavior** - shopping cart items are temporary per session.

**If you want to make cart data persistent in the future:**

- Save cart to browser's `localStorage` (survives page refresh)
- Or save to backend database (survives all sessions)
- For this project, current behavior is perfect ✅

---

### 🚀 Deploy to Vercel - Complete Step-by-Step Guide

#### **Step 1: Prepare Your Code (5 minutes)**

1. Check that everything is ready:

   ```bash
   git status
   ```

   - You should NOT see `.env` (✅ it's in .gitignore)
   - You SHOULD see `.env.example` (✅ template for others)

2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

---

#### **Step 2: Create Vercel Account (5 minutes)**

1. Go to **[https://vercel.com](https://vercel.com)**
2. Click **"Sign Up"** at top right
3. Choose **"Continue with GitHub"**
4. Click **"Authorize Vercel"** when GitHub asks
5. Complete the signup process
6. You'll see Vercel dashboard

---

#### **Step 3: Import Your Project (3 minutes)**

1. On Vercel dashboard, click **"New Project"** button
2. Click **"Import Git Repository"**
3. Search for your repository: `ecommerce`
4. Click **"Import"** next to your repo

---

#### **Step 4: Configure Build Settings (1 minute)**

Vercel should auto-detect everything, but verify:

| Setting          | Should Be           |
| ---------------- | ------------------- |
| Framework        | `Vite` ✅           |
| Build Command    | `npm run build` ✅  |
| Output Directory | `dist` ✅           |
| Node.js Version  | `18.x` or higher ✅ |

All should be correct. Just click **"Continue"**

---

#### **Step 5: Add Environment Variables (5 minutes) ⚠️ CRITICAL**

This step is **most important** - without it, Firebase login won't work!

1. You'll see **"Environment Variables"** section
2. Click **"Add New"** and enter each variable:

   **First Variable:**
   - Key: `VITE_FIREBASE_API_KEY`
   - Value: `AIzaSyCGOv8f91I45toRpFiToDIwC4VDWwWKKGo`
   - Click **"Add"**

   **Second Variable:**
   - Key: `VITE_FIREBASE_AUTH_DOMAIN`
   - Value: `shopease-fa278.firebaseapp.com`
   - Click **"Add"**

   **Third Variable:**
   - Key: `VITE_FIREBASE_PROJECT_ID`
   - Value: `shopease-fa278`
   - Click **"Add"**

   **Fourth Variable:**
   - Key: `VITE_FIREBASE_STORAGE_BUCKET`
   - Value: `shopease-fa278.firebasestorage.app`
   - Click **"Add"**

   **Fifth Variable:**
   - Key: `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - Value: `733452779404`
   - Click **"Add"**

   **Sixth Variable:**
   - Key: `VITE_FIREBASE_APP_ID`
   - Value: `1:733452779404:web:e7782846802e2c649960a9`
   - Click **"Add"**

   **Seventh Variable:**
   - Key: `VITE_FIREBASE_MEASUREMENT_ID`
   - Value: `G-LTQYE5G3X3`
   - Click **"Add"**

All 7 variables added? ✅ Click **"Deploy"**

---

#### **Step 6: Deploy & Wait! (2 minutes)**

1. Click the big **"Deploy"** button
2. Vercel will start building your app
3. Watch the build process (it takes 1-2 minutes)
4. You'll see ✅ **"Deployment Successful!"**
5. Click the URL to open your live app 🎉

Your URL will look like: `https://ecommerce-xxxxx.vercel.app`

---

#### **Step 7: Test Your Deployed App (5 minutes)**

1. **Test Registration:**
   - Click "Sign Up Now"
   - Enter name, email, password
   - Click "Sign Up"
   - Should see home page ✅

2. **Test Login:**
   - Click "Sign Out"
   - You're back at login page ✅
   - Enter email and password from Step 1
   - Click "Sign In"
   - Should see home page again ✅

3. **Test Cart:**
   - Click on product
   - Click "Add to Cart"
   - Click Cart icon (top right)
   - Should see your item ✅
   - Click "Remove"
   - Item should disappear ✅

4. **Test Cart Persistence:**
   - Add item to cart
   - Refresh page (Ctrl+R)
   - Cart should be empty ✅ (this is normal!)

---

### ✅ Deployment Checklist

- ✅ Code pushed to GitHub (without .env)
- ✅ `.env.example` exists in repo (for reference)
- ✅ All 7 environment variables added to Vercel
- ✅ Build completed successfully
- ✅ App opened and tested
- ✅ Registration works
- ✅ Login works
- ✅ Cart works
- ✅ Products load
- ✅ Images display correctly

---

### 🔍 Vercel Environment Variables Explained

**Why do we add env variables to Vercel?**

1. Your `.env` file is NOT pushed to GitHub (it's in .gitignore)
2. Vercel can't access your local `.env` file
3. So you tell Vercel what the values should be
4. When Vercel builds your app, it injects these values
5. Your code accesses them via `import.meta.env.VITE_*`
6. Everything works! ✅

**Analogy:**

- `.env` file = Your personal recipe book (stays at home)
- Vercel env vars = Recipe instructions you give to the restaurant
- Result = Delicious food (working app) 🍽️

---

### 🚨 If Deployment Fails

**"Build failed"**

- Check Node.js version in Vercel settings (use 18+)
- Check build logs for specific errors
- Try running `npm run build` locally first

**"Blank white page"**

- Check browser console for errors (F12)
- Verify Firebase credentials are correct
- Make sure all 7 env variables are set

**"Login not working"**

- Verify Firebase credentials in Vercel env vars
- Check Firebase project is active
- Look at browser console for errors

---

### 📱 Your Live App Is Now Public!

- Share the Vercel URL with anyone
- They can register new accounts
- They can login and shop
- Firebase handles everything on backend ✅

**Congratulations! 🎉 Your ecommerce app is deployed!**

## Important Notes

### .env.example File

- ✅ **KEEP IT** - This file should be committed to GitHub
- Shows other developers what environment variables are needed
- Developers copy it to create their own `.env` file
- Never put real credentials in `.env.example`

### .env File

- ❌ **DO NOT COMMIT** - Already in `.gitignore`
- Contains your real Firebase credentials
- Only exists on your local machine
- Each developer has their own `.env` file

### db.json File

- Contains mock product data
- Can be kept as is or expanded with more products
- Not needed for deployment (Firebase auth is the backend)
- Useful for local development testing

## Troubleshooting

**Error: `VITE_FIREBASE_* is undefined`**

- Make sure your `.env` file exists locally
- Restart dev server after adding `.env`
- On deployment, verify environment variables are set in platform settings

**Login not working**

- Check Firebase credentials in `.env`
- Verify Firebase project is enabled
- Check browser console for errors

**Images not loading**

- Verify image paths in `src/utils/constants.js`
- Check that image files exist in `src/Images/` folder

## Contributing

Feel free to fork and submit pull requests!

## License

This project is open source and available under the MIT License.
