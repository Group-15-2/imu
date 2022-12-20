import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native'
import { inStyle } from '../styles/instyle';

export default function Timer() {

    const [time, setTime] = useState(25);
    const { isStop, setIsStop } = useState(true);
    const timerRef = useRef(time);

    const timer = () => {
        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                clearInterval(timerId);
            } else {
                setTime(timerRef.current);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }

    return (
        <View>
            <Text>{time}</Text>
        </View>
    )
}