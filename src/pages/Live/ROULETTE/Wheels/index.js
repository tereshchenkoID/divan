import {useState, useRef, useEffect} from "react";

import anime from "animejs";

import style from './index.module.scss'
import {useSelector} from "react-redux";
import {getDifferent} from "helpers/getDifferent";

const Wheels = ({data}) => {
    // https://github.com/MemoryLeakHub/MultiplayerRoulette/blob/main/src/
    const {delta} = useSelector((state) => state.delta)
    const {progress} = useSelector((state) => state.progress)
    const [number, setNumber] = useState(null)
    const [current, setCurrent] = useState(0)
    const [duration, setDuration] = useState(18000)
    
    const layer_2 = useRef(null)
    const layer_4 = useRef(null)
    const ball = useRef(null)
    const ball_container = useRef(null)
    
    const totalNumbers = 37;
    const singleRotationDegree = 360 / totalNumbers;
    let lastNumber = 0;
    
    useEffect(() => {
        if (progress === 2) {
            setDuration(getDifferent(data.nextUpdate, delta, 1) * 1000)
            setNumber(data.round.result)
        }
        
    }, [progress])
    
    const rouletteWheelNumbers =  [
        0, 32, 15, 19, 4, 21, 2, 25,
        17, 34, 6, 27, 13, 36, 11,
        30, 8, 23,10, 5, 24, 16, 33,
        1, 20, 14, 31, 9, 22, 18, 29,
        7, 28, 12, 35, 3, 26
    ];

    const getRouletteIndexFromNumber = (number) => {
        return rouletteWheelNumbers.indexOf(number);
    };
    const nextNumber = (number) => {
        return number;
    };
    const getRotationFromNumber = (number) => {
        return singleRotationDegree * getRouletteIndexFromNumber(number);
    };
    
    // rotateTo randomizes the end outcome of the wheel
    // so it doesn't only end at 0 at the top
    const getRandomEndRotation = (minNumberOfSpins, maxNumberOfSpins) => {
        const rotateTo = anime.random(
            minNumberOfSpins * totalNumbers,
            maxNumberOfSpins * totalNumbers
        );
        
        return singleRotationDegree * rotateTo;
    };
    // calculating where the zero will be at the end of the spin
    // because we are spinning it counter clockwise we are substracting it of 360
    const getZeroEndRotation = (totalRotaiton) => {
        return 360 - Math.abs(totalRotaiton % 360)
    };
    // Where the ball end position should be
    // we are calculating this based on the zero rotation
    // and how much the wheel spins
    const getBallEndRotation = (zeroEndRotation, currentNumber) => {
        return Math.abs(zeroEndRotation) + getRotationFromNumber(currentNumber)
    };
    // randomizing the number of spins that the ball should make
    // so every spin is different
    const getBallNumberOfRotations = (minNumberOfSpins, maxNumberOfSpins) => {
        return 360 * anime.random(minNumberOfSpins, maxNumberOfSpins)
    };
    
    function spinWheel(win){
        console.log(win, duration)
        
        const bezier = [0.165, 0.84, 0.44, 1.005];
        const ballMinNumberOfSpins = 2
        const ballMaxNumberOfSpins = 4
        const wheelMinNumberOfSpins = 2
        const wheelMaxNumberOfSpins = 4
        const currentNumber = nextNumber(win)
        const lastNumberRotation = getRotationFromNumber(lastNumber.toString()); //anime.get(wheel, "rotate", "deg");
        const endRotation = - getRandomEndRotation(
            ballMinNumberOfSpins,
            ballMaxNumberOfSpins
        )
        
        const zeroFromEndRotation = getZeroEndRotation(endRotation);
        const ballEndRotation = getBallNumberOfRotations(wheelMinNumberOfSpins, wheelMaxNumberOfSpins) + getBallEndRotation(zeroFromEndRotation, currentNumber)
        
        anime.set([layer_2.current, layer_4.current], {
            rotate: () => {
                return lastNumberRotation
            }
        });
        anime.set(ball_container.current, {
            rotate: () => {
                return 0
            }
        });
        
        anime({
            targets: [layer_2.current, layer_4.current],
            update: (e) => {
                // console.log(e)
                // setCurrent(Math.floor(Math.random() * 37))
                // console.log(e.animations[0].currentValue)
            },
            rotate: () => {
                return endRotation
            },
            complete: (anim) => {
                setCurrent(currentNumber)
                lastNumber = currentNumber
            },
            duration: duration,
            easing: `cubicBezier(${bezier.join(",")})`,
        });
        anime({
            targets: ball_container.current,
            translateY: [
                { value: 0, duration: 2000 },
                { value: 20, duration: 1000 },
                { value: 25, duration: 900 },
                { value: 50, duration: 1000 }
            ],
            rotate: [{ value: ballEndRotation, duration: duration }],
            loop: 1,
            easing: `cubicBezier(${bezier.join(",")})`
        });
    }
    
    useEffect(() => {
        if (number) spinWheel(data.round.result)
    },[duration])
    
    return (
        <div className={style.block}>
            <div
                className={style.wheel}
                style={{
                    backgroundImage: "url('/img/roulette_1.png')"
                }}
            >
                <div
                    ref={layer_2}
                    className={style['layer-2']}
                    style={{
                        transform: "rotate(0deg)",
                        backgroundImage: "url('/img/roulette_2.png')"
                    }}
                />
                <div
                    className={style['layer-3']}
                    style={{
                        backgroundImage: "url('/img/roulette_3.png')"
                    }}
                />
                <div
                    ref={layer_4}
                    className={style['layer-4']}
                    style={{
                        transform: "rotate(0deg)",
                        backgroundImage: "url('/img/roulette_4.png')"
                    }}
                />
                <div
                    className={style['layer-5']}
                    style={{
                        backgroundImage: "url('/img/roulette_5.png')"
                    }}
                />
                <div
                    ref={ball_container}
                    className={style.container}
                    style={{ transform: "rotate(0deg)"}}
                >
                    <div
                        ref={ball}
                        className={style.ball}
                        style={{ transform: "translate(0, -163.221px)" }}
                    />
                </div>
            </div>
            <input
                type="text"
                onChange={(e) => {
                    setNumber(Number(e.currentTarget.value))
                }}
            />
            <button
                onClick={() => {
                    spinWheel(number)
                }}
            >
                Spin
            </button>
        </div>
    );
}

export default Wheels;
