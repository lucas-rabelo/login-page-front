import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Label } from '.';

describe('Label', () => {
  it('renderiza o texto passado via prop label', () => {
    render(<Label label="E-mail" />)
    expect(screen.getByText('E-mail')).toBeInTheDocument()
  })

  it('renderiza como um elemento span', () => {
    render(<Label label="Senha" />)
    const el = screen.getByText('Senha')
    expect(el.tagName).toBe('SPAN')
  })

  it('renderiza textos longos sem truncar', () => {
    const texto = 'Confirme sua nova senha'
    render(<Label label={texto} />)
    expect(screen.getByText(texto)).toBeInTheDocument()
  })
})
