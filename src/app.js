// src/App.js
import React from 'react';
import styled from 'styled-components';
import GlassCard from './components/GlassCard';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(45deg, #8e2de2, #4a00e0);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

function App() {
  return (
    <Container>
      <GlassCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Welcome to Our Website</h1>
        <p>This is a glassmorphism design example</p>
      </GlassCard>
    </Container>
  );
}

export default App;