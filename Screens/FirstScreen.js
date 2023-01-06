import { useEffect, useState } from 'react'
import { storeData, getItemFor } from '../components/services/StorageHelper';


const HAS_LAUNCHED = 'HAS_LAUNCHED';

export default function FirstScreen({ navigation }) {

    useEffect(() => {
        const getData = async () => {
            const hasLaunched = await getItemFor(HAS_LAUNCHED);
            if (hasLaunched) {
                navigation.navigate('CheckAuthScreen');
            }
            else {
                await storeData(HAS_LAUNCHED, 'true');
                navigation.navigate('Onboard');
            }
        };

        getData().catch((error) => { console.log(error) })
    }, []);



}