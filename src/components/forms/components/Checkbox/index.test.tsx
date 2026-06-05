import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Checkbox } from '.';

describe('Checkbox', () => {
  it('renderiza o input do tipo checkbox', () => {
    render(<Checkbox label="Lembre de mim" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('exibe o label passado via prop', () => {
    render(<Checkbox label="Lembre de mim" />)
    expect(screen.getByText('Lembre de mim')).toBeInTheDocument()
  })

  it('começa desmarcado por padrão', () => {
    render(<Checkbox label="Lembre de mim" />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('começa marcado quando defaultChecked=true', () => {
    render(<Checkbox label="Lembre de mim" defaultChecked />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('chama onChange ao clicar', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Checkbox label="Lembre de mim" onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('fica desabilitado quando disabled=true', () => {
    render(<Checkbox label="Lembre de mim" disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('marca e desmarca ao clicar', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Aceito os termos" />)

    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })
})