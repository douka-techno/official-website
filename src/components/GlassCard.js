// src/components/GlassCard.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

export default GlassCard;