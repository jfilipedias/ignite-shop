import { styled } from '@styles/.'
export const Button = styled('button', {
  marginTop: 'auto',
  padding: '1.25rem',
  background: '$green500',
  border: 0,
  borderRadius: 8,
  color: '$white',
  fontSize: '$md',
  fontWeight: 'bold',
  cursor: 'pointer',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    background: '$green300',
  },
})
