import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Input } from '.';

describe('Input', () => {
  it('renderiza um elemento input', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('exibe o placeholder passado via props', () => {
    render(<Input placeholder="Digite seu e-mail" />)
    expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument()
  })

  it('renderiza com type="password" quando passado', () => {
    render(<Input type="password" placeholder="Senha" />)
    expect(screen.getByPlaceholderText('Senha')).toHaveAttribute('type', 'password')
  })

  it('renderiza com type="email" quando passado', () => {
    render(<Input type="email" placeholder="E-mail" />)
    expect(screen.getByPlaceholderText('E-mail')).toHaveAttribute('type', 'email')
  })

  it('chama onChange ao digitar', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Input onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'abc')

    expect(onChange).toHaveBeenCalled()
  })

  it('fica desabilitado quando disabled=true', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('aceita e exibe um valor inicial via value', () => {
    render(<Input value="valor inicial" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('valor inicial')
  })
})