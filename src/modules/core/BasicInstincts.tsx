import React from 'react';
import styled from "styled-components";

const InstinctsContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  background-color: white;
  padding: 10px;
  border: 1px solid black;
`;

interface InstinctsProps {
    instincts: {
        vida: number;
        fatiga: number;
        hambre: number;
        sed: number;
    };
}

const BasicInstincts: React.FC<InstinctsProps> = ({ instincts }) => {
    const { vida, fatiga, hambre, sed } = instincts;

    return (
        <InstinctsContainer>
            <p>Life: {vida}</p>
            <p>Fatigue: {fatiga}</p>
            <p>Hunger: {hambre}</p>
            <p>Thirst: {sed}</p>
        </InstinctsContainer>
    );
};

export default BasicInstincts;