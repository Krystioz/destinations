import { getApp, initializeApp, getApps } from 'firebase/app';
import {
	getAuth,
	inMemoryPersistence,
	isSignInWithEmailLink,
	sendSignInLinkToEmail,
	setPersistence,
	signInWithEmailLink
} from 'firebase/auth';
// import dotenv from 'dotenv';
// dotenv.config();

if (
	!import.meta.env.VITE_FIREBASE_API_KEY ||
	!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
	!import.meta.env.VITE_FIREBASE_PROJECT_ID ||
	!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
	!import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
	!import.meta.env.VITE_FIREBASE_APP_ID ||
	!import.meta.env.VITE_FIREBASE_MEASURMENT_ID ||
	!import.meta.env.VITE_FIREBASE_DATABASE_URL
) {
	throw new Error('Firebase client enviroment variables not set!');
} else {
	console.log(import.meta.env.VITE_FIREBASE_API_KEY);
	console.log(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
	console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);
	console.log(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
	console.log(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
	console.log(import.meta.env.VITE_FIREBASE_APP_ID);
	console.log(import.meta.env.VITE_FIREBASE_MEASURMENT_ID);
	console.log(import.meta.env.VITE_FIREBASE_DATABASE_URL);
}

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASURMENT_ID,
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

export const getClientApp = () => {
	if (getApps().length) return getApp();
	const app = initializeApp(firebaseConfig);

	const auth = getAuth(app);
	setPersistence(auth, inMemoryPersistence);

	return app;
};

export const sendMagicLink = (email: string, redirectUrl: string) => {
	const auth = getAuth(getClientApp());
	const actionCodeSettings = {
		url: redirectUrl,
		handleCodeInApp: true
	};
	return sendSignInLinkToEmail(auth, email, actionCodeSettings);
};

export const isMagicLink = (link: string) => {
	const auth = getAuth(getClientApp());
	return isSignInWithEmailLink(auth, link);
};

export const signInWithMagicLink = (email: string, link: string) => {
	const auth = getAuth(getClientApp());
	return 	signInWithEmailLink(auth, email,link);
};
