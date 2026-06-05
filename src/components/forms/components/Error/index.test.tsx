import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Error } from '.';

describe('Error', () => {
  it('não renderiza nada quando error é undefined', () => {
    const { container } = render(<Error />)
    expect(container).toBeEmptyDOMElement()
  })

  it('não renderiza nada quando error é string vazia', () => {
    const { container } = render(<Error error="" />)
    // string vazia é falsy — o componente retorna null
    expect(container).toBeEmptyDOMElement()
  })

  it('renderiza a mensagem de erro quando error é passado', () => {
    render(<Error error="Campo obrigatório" />)
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
  })

  it('renderiza mensagens de erro do Zod corretamente', () => {
    render(<Error error="A senha deve conter pelo menos 1 letra maiúscula" />)
    expect(
      screen.getByText('A senha deve conter pelo menos 1 letra maiúscula')
    ).toBeInTheDocument()
  })

  it('aplica a cor vermelha na mensagem de erro', () => {
    render(<Error error="Erro qualquer" />)
    expect(screen.getByText('Erro qualquer')).toHaveClass('text-red-500')
  })
})