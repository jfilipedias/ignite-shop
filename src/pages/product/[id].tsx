import { useRouter } from 'next/router'
import {
  ImageContainer,
  ProductContainer,
  ProductDetail,
} from '../../styles/pages/product'

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>
      <ProductDetail>
        <h1>Camiseta X</h1>
        <span>R$ 79,00</span>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
          corrupti accusamus deserunt temporibus animi. Neque veniam voluptatem
          veritatis eius qui. Sequi, aut? At et, obcaecati fugiat in quae
          incidunt molestiae?
        </p>

        <button>Comprar agora</button>
      </ProductDetail>
    </ProductContainer>
  )
}
