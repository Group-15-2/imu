import { faker } from '@faker-js/faker';
import { get, ref, set } from 'firebase/database';
import { auth, database } from '../../firebaseConfig';

export const userDataRef = ref(database, 'userData/' + auth.currentUser.uid);

export const updateBackEndUserData = () => {


    get(userDataRef).then((snapshot) => {
        if (snapshot.exists() == false) {
            set(userDataRef, {
                id: auth.currentUser.uid,
                userName: auth.currentUser.displayName,
                generatedName: faker.random.words(2),
                userImg: auth.currentUser.photoURL,
                moodlet: "require('../assets/moodlets/add.png')",
                mood: "How are you Feeling \ntoday?",
                anonimity: true
            });
        }
    })
};
