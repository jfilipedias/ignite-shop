import { styled } from '@styles/.'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  h1: {
    marginTop: '3rem',
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
  flex: 'none',
  order: 1,
  margin: '0px -1.75rem',
  width: 145,
  height: 145,
  padding: '0.25rem',
  borderRadius: 9999,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',

  img: {
    objectFit: 'cover',
  },
})
