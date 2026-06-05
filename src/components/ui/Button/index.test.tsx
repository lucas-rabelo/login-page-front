import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Button } from '.';

describe('Button', () => {
  it('renderiza o label passado via prop', () => {
    render(<Button label="Entrar na conta" />)
    expect(screen.getByRole('button', { name: /entrar na conta/i })).toBeInTheDocument()
  })

  it('chama onClick ao clicar', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button label="Salvar" onClick={onClick} />)
    await user.click(screen.getByRole('button', { name: /salvar/i }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('fica desabilitado quando disabled=true', () => {
    render(<Button label="Entrar" disabled />)
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()
  })

  it('não chama onClick quando está desabilitado', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button label="Entrar" disabled onClick={onClick} />)
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('exibe o spinner quando disabled=true', () => {
    render(<Button label="Entrar" disabled />)
    // O SpinnerGap do Phosphor renderiza um SVG com animate-spin
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('não exibe o spinner quando disabled=false', () => {
    render(<Button label="Entrar" disabled={false} />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).not.toBeInTheDocument()
  })

  it('exibe a imagem do Google quando isGoogleButton=true', () => {
    render(<Button label="Entrar com Google" isGoogleButton />)
    expect(screen.getByAltText('Logo do google')).toBeInTheDocument()
  })

  it('não exibe a imagem do Google quando isGoogleButton=false', () => {
    render(<Button label="Entrar na conta" />)
    expect(screen.queryByAltText('Logo do google')).not.toBeInTheDocument()
  })

  it('renderiza com variant="primary" por padrão', () => {
    render(<Button label="Entrar" disabled={false} />)
    expect(screen.getByRole('button')).toHaveClass('bg-green-700')
  })

  it('renderiza com variant="google" quando passado', () => {
    render(<Button label="Google" variant="google" disabled={false} />)
    expect(screen.getByRole('button')).toHaveClass('bg-slate-800')
  })

  it('aplica classe bg-gray-600 quando disabled=true', () => {
    render(<Button label="Entrar" disabled />)
    expect(screen.getByRole('button')).toHaveClass('bg-gray-600')
  })
})