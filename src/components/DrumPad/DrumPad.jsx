import React, { useEffect, useState } from 'react';

import { bankOne, bankTwo } from '../../helpers/banks';


export default function DrumPad() {

    const [ bank, setBank ] = useState(bankOne);
    const [ volume, setVolume ] = useState("75");
    const [ pressed, setPressed ] = useState('');

    const handleBank = () => {
        bank === bankOne ? setBank(bankTwo) : setBank(bankOne);
    }

    const playSound = (sound) => {
        const audio = document.querySelector(`#${sound.keyTrigger}`);
        audio.currentTime = 0;
        audio.volume = parseInt(volume) / 100;
        audio.play();
    }

    const handleKey = (e, key) => {
        e.preventDefault();
        for (const item in bank) {
            if (Object.hasOwnProperty.call(bank, item)) {
                const element = bank[item];
                if (element.keyCode === e.keyCode) {
                    if (e.type === "keydown") {
                        document.querySelector(`[name="${e.keyCode}"]`).classList.add('btn--pad--active');
                        playSound(element)
                        setPressed(element);
                    }
                    if (e.type === "keyup") {
                        document.querySelector(`[name="${e.keyCode}"]`).classList.remove('btn--pad--active');
                    }
                }
            }
        }
        if (e.type === "click") {
            playSound(key);
            setPressed(key);

        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKey)
        document.addEventListener("keyup", handleKey)
    })

    return (
        <div id="drum-machine" className="c-drum">
            <div className="c-drum__pad">
                {bank && bank.map((key, i) => 
                <div 
                key={i} 
                name={key.keyCode} 
                id={key.id}
                onClick={(e) => handleKey(e, key)} 
                className="btn btn--pad drum-pad">
                    {key.keyTrigger}
                    <audio 
                    id={key.keyTrigger}
                    className="clip"
                    src={key.url}></audio>
                </div>)}
            </div>
            <div className="c-drum__menu">
                <div className="c-drum__menu__switch">
                    <span>Bank One</span>
                    <label className="switch">
                        <input type="checkbox" onChange={handleBank} />
                        <span className="slider"></span>
                    </label>
                    <span>Bank Two</span>
                </div>

                <div id="display" className="c-drum__menu__display">{pressed.id}</div>
                
                <div className="c-drum__menu__volume">
                    <input onChange={e => setVolume(e.target.value)} type="range" min="0" max="100" defaultValue={volume} className="c-drum__menu__volume__slider" />
                </div>
            </div>
        </div>
    )
}