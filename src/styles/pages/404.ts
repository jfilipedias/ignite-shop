import { styled } from '@styles/.'

export const NotFoundContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: 1180,
  height: 480,
  margin: '0 auto',

  h1: {
    marginTop: 64,
    fontSize: '$2xl',
    color: '$gray300',
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    color: '$green500',
    fontSize: '$lg',
    fontWeight: 'bold',
    textDecoration: 'none',

    '&:hover': {
      color: '$green300',
    },
  },
})
