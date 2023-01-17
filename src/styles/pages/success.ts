import { styled } from '@styles/.'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    color: '$gray100',
    fontSize: '$2xl',
  },

  p: {
    maxWidth: 560,
    marginTop: '2rem',
    color: '$gray300',
    fontSize: '$xl',
    lineHeight: 1.4,
    textAlign: 'center',
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

export const ImageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 130,
  height: 145,
  marginTop: '4rem',
  padding: '0.25rem',
  borderRadius: 8,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  img: {
    objectFit: 'cover',
  },
})
