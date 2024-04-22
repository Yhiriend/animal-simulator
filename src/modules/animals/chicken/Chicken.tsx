import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CuadroContainer = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.color};
  position: absolute;
`;

const NumeroContainer = styled.div<{ opacity: number, background: string }>`
  position: absolute;
  opacity: ${(props) => props.opacity};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background: ${(props) => props.background};
`;

const HambreBarra = styled.div<{ ancho: number }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: ${(props) => props.ancho}px;
  height: 20px;
  background-color: green;
`;
const Player: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [color, setColor] = useState('blue');
    const [counterMap, setCounterMap] = useState<{ [key: string]: number }>({});
    const [anchoHambre, setAnchoHambre] = useState(200);
    const [alimentoEncontrado, setAlimentoEncontrado] = useState(false);
    const [alimentoPosX, setAlimentoPosX] = useState<number | null>(null);
    const [alimentoPosY, setAlimentoPosY] = useState<number | null>(null);

    useEffect(() => {
        const hayAlimento = () => {
            if (counterMap[`${position.x},${position.y}`] && counterMap[`${position.x},${position.y}`] >= 0.7) {
                if (!alimentoEncontrado && Math.random() <= 0.8) {
                    setAlimentoEncontrado(true);
                    setAlimentoPosX(position.x);
                    setAlimentoPosY(position.y);
                    return true;
                }
            }
            return false;
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - 10 }));
                    break;
                case 'ArrowDown':
                    setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + 10 }));
                    break;
                case 'ArrowLeft':
                    setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - 10 }));
                    break;
                case 'ArrowRight':
                    setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + 10 }));
                    break;
                case ' ':
                    const key = `${position.x},${position.y}`;
                    const newCounterMap = { ...counterMap };
                    newCounterMap[key] = (newCounterMap[key] || 0) + 0.1;
                    setCounterMap(newCounterMap);
                    setColor('red');
                    if (hayAlimento()) {
                        setColor('green');
                    }
                    break;
                default:
                    break;
            }
        };
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === ' ') {
                setColor('blue');
            }
        };

        const timerId = setInterval(() => {
            setAnchoHambre((prevAncho) => prevAncho - 1);
        }, 2000);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            clearInterval(timerId);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [position, counterMap, alimentoEncontrado]);

    return (
        <>
            <CuadroContainer color={color} style={{ top: position.y, left: position.x }} />
            {Object.entries(counterMap).map(([key, count]) => {
                const [x, y] = key.split(',').map(Number);
                return (
                    <NumeroContainer key={key} style={{ top: y, left: x }} opacity={count} background={(x === alimentoPosX && y === alimentoPosY && alimentoEncontrado) ? 'green' : 'saddlebrown'}>
                        {count.toFixed(1)}
                    </NumeroContainer>
                );
            })}
            <HambreBarra ancho={anchoHambre} />
        </>
    );};

export default Player;
