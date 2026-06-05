import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { LoginForm } from './index'

vi.mock('../../../services/auth.service', () => ({
  signIn: vi.fn(),
}))

vi.mock('../../../services/api', () => ({
  api: {
    post: vi.fn(),
  },
}))

import { signIn } from '../../../services/auth.service'
const mockedSignIn = vi.mocked(signIn)

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={client}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    )
  }
}

const mockSetChangeTypeForm = vi.fn()

function renderLoginForm() {
  return render(
    <LoginForm setChangeTypeForm={mockSetChangeTypeForm} />,
    { wrapper: createWrapper() }
  )
}

describe('LoginForm', () => {

  beforeEach(() => {
    vi.clearAllMocks()
    window.localStorage.clear()
  })


  describe('renderização', () => {
    it('exibe o título e subtítulo corretamente', () => {
      renderLoginForm()

      expect(screen.getByText('Faça login na sua conta')).toBeInTheDocument()
      expect(screen.getByText('Bem vindo de volta')).toBeInTheDocument()
    })

    it('exibe os campos de e-mail e senha', () => {
      renderLoginForm()

      expect(screen.getByPlaceholderText('exemplo@gmail.com')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
    })

    it('exibe o botão de entrar', () => {
      renderLoginForm()

      expect(
        screen.getByRole('button', { name: /entrar na conta/i })
      ).toBeInTheDocument()
    })

    it('exibe o botão de login com Google', () => {
      renderLoginForm()

      expect(
        screen.getByRole('button', { name: /login com o google/i })
      ).toBeInTheDocument()
    })

    it('exibe o checkbox "Lembre de mim"', () => {
      renderLoginForm()

      expect(screen.getByText('Lembre de mim')).toBeInTheDocument()
    })

    it('exibe o link "Esqueceu a senha?"', () => {
      renderLoginForm()

      expect(screen.getByText('Esqueceu a senha?')).toBeInTheDocument()
    })

    it('campo de senha começa com type="password" (texto oculto)', () => {
      renderLoginForm()

      const senhaInput = screen.getByPlaceholderText('Senha')
      expect(senhaInput).toHaveAttribute('type', 'password')
    })
  })

  // ── Validação de e-mail ────────────────────────────────────────────────────

  describe('validação do campo e-mail', () => {
    it('exibe erro quando o e-mail é enviado vazio', async () => {
      const user = userEvent.setup()
      renderLoginForm()

      await user.click(screen.getByRole('button', { name: /entrar na conta/i }))

      expect(
        await screen.findByText('Informe seu e-mail atual')
      ).toBeInTheDocument()
    })

    it('exibe erro quando o e-mail tem formato inválido', async () => {
      const user = userEvent.setup()
      renderLoginForm()

      await user.type(screen.getByPlaceholderText('exemplo@gmail.com'), 'nao-e-um-email')
      await user.click(screen.getByRole('button', { name: /entrar na conta/i }))

      expect(
        await screen.findByText('Insira um e-mail válido')
      ).toBeInTheDocument()
    })

    it('não exibe erro de e-mail quando o formato é válido', async () => {
      const user = userEvent.setup()
      renderLoginForm()

      await user.type(screen.getByPlaceholderText('exemplo@gmail.com'), 'valido@email.com')
      await user.click(screen.getByRole('button', { name: /entrar na conta/i }))

      // Aguarda o ciclo de validação terminar
      await waitFor(() => {
        expect(screen.queryByText('Insira um e-mail válido')).not.toBeInTheDocument()
        expect(screen.queryByText('Informe seu e-mail atual')).not.toBeInTheDocument()
      })
    })
  })

  // ── Validação de senha ─────────────────────────────────────────────────────

  describe('validação do campo senha', () => {
    it('exibe erro quando a senha é enviada vazia', async () => {
      const user = userEvent.setup()
      renderLoginForm()

      await user.click(screen.getByRole('button', { name: /entrar na conta/i }))

      expect(
        await screen.findByText('Senha incorreta')
      ).toBeInTheDocument()
    })

    it('exibe erro quando a senha tem menos de 8 caracteres', async () => {
      const user = userEvent.setup()
      renderLoginForm()

      await user.type(screen.getByPlaceholderText('Senha'), 'Ab1!')
      await user.click(screen.getByRole('button', { name: /entrar na conta/i }))

      expect(
        await screen.findByText('A senha tem que ter no mínimo 8 caracteres.')
      ).toBeInTheDocument()
    })

    it('exibe erro quando a senha não tem letra maiúscula', async () => {
      const user = userEvent.setup()
      renderLoginForm()

      await user.type(screen.getByPlaceholderText('Senha'), 'minhasenha1!')
      await user.click(screen.getByRole('button', { name: /entrar na conta/i }))

      expect(
        await screen.findByText('A senha deve conter pelo menos 1 letra maiúscula')
      ).toBeInTheDocument()
    })

    it('exibe erro quando a senha não tem letra minúscula', async () => {
      const user = userEvent.setup()
      renderLoginForm()

      await user.type(screen.getByPlaceholderText('Senha'), 'MINHASENHA1!')
      await user.click(screen.getByRole('button', { name: /entrar na conta/i }))

      expect(
        await screen.findByText('A senha deve conter pelo menos 1 letra minúscula')
      ).toBeInTheDocument()
    })

    it('exibe erro quando a senha não tem caractere especial', async () => {
      const user = userEvent.setup()
      renderLoginForm()

      await user.type(screen.getByPlaceholderText('Senha'), 'MinhaSenha1')
      await user.click(screen.getByRole('button', { name: /entrar na conta/i }))

      expect(
        await screen.findByText('A senha deve conter pelo menos 1 caracter especial')
      ).toBeInTheDocument()
    })
  })

  // ── Visibilidade da senha ──────────────────────────────────────────────────

  describe('toggle de visibilidade da senha', () => {
    it('alterna para text quando clica no botão de mostrar senha', async () => {
      const user = userEvent.setup()
      const { container } = renderLoginForm()

      const senhaInput = screen.getByPlaceholderText('Senha')
      expect(senhaInput).toHaveAttribute('type', 'password')

      const toggleBtn = container.querySelector('button[type="button"]') as HTMLElement
      await user.click(toggleBtn)

      expect(senhaInput).toHaveAttribute('type', 'text')
    })

    it('volta para password ao clicar novamente', async () => {
      const user = userEvent.setup()
      const { container } = renderLoginForm()

      const senhaInput = screen.getByPlaceholderText('Senha')
      const toggleBtn = container.querySelector('button[type="button"]') as HTMLElement

      await user.click(toggleBtn)
      expect(senhaInput).toHaveAttribute('type', 'text')

      await user.click(toggleBtn)
      expect(senhaInput).toHaveAttribute('type', 'password')
    })
  })

  // ── Navegação ──────────────────────────────────────────────────────────────

  describe('navegação entre formulários', () => {
    it('chama setChangeTypeForm com "forget" ao clicar em "Esqueceu a senha?"', async () => {
      const user = userEvent.setup()
      renderLoginForm()

      await user.click(screen.getByText('Esqueceu a senha?'))

      expect(mockSetChangeTypeForm).toHaveBeenCalledWith('forget')
    })

    it('chama setChangeTypeForm com "register" ao clicar em "Cadastre-se"', async () => {
      const user = userEvent.setup()
      renderLoginForm()

      await user.click(screen.getByText('Cadastre-se'))

      expect(mockSetChangeTypeForm).toHaveBeenCalledWith('register')
    })
  })

  // ── Submissão ──────────────────────────────────────────────────────────────

  describe('submissão do formulário', () => {
    const emailValido = 'usuario@email.com'
    const senhaValida = 'MinhaSenha1!'

    async function preencherESubmeter(user: ReturnType<typeof userEvent.setup>) {
      await user.type(screen.getByPlaceholderText('exemplo@gmail.com'), emailValido)
      await user.type(screen.getByPlaceholderText('Senha'), senhaValida)
      await user.click(screen.getByRole('button', { name: /entrar na conta/i }))
    }

    it('desabilita o botão durante o carregamento', async () => {
      const user = userEvent.setup()

      mockedSignIn.mockImplementation(() => new Promise(() => {}))
      renderLoginForm()

      await preencherESubmeter(user)

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /entrar na conta/i })
        ).toBeDisabled()
      })
    })

    it('chama signIn com email e senha corretos', async () => {
      const user = userEvent.setup()

      mockedSignIn.mockResolvedValueOnce({ access_token: 'fake-token' })
      renderLoginForm()

      await preencherESubmeter(user)

      await waitFor(() => {
        expect(mockedSignIn).toHaveBeenCalledWith(emailValido, senhaValida)
      })
    })

    it('salva o token no localStorage após login com sucesso', async () => {
      const user = userEvent.setup()

      mockedSignIn.mockResolvedValueOnce({ access_token: 'fake-jwt-token' })
      renderLoginForm()

      await preencherESubmeter(user)

      await waitFor(() => {
        expect(window.localStorage.getItem('token')).toBe('fake-jwt-token')
      })
    })

    it('exibe alert com mensagem de erro quando a API retorna erro', async () => {
      const user = userEvent.setup()

      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

      mockedSignIn.mockRejectedValueOnce({
        response: { data: { message: 'Credenciais inválidas' } },
      })

      renderLoginForm()
      await preencherESubmeter(user)

      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith('Ops... Credenciais inválidas')
      })

      alertMock.mockRestore()
    })

    it('não chama signIn quando o formulário tem erros de validação', async () => {
      const user = userEvent.setup()
      renderLoginForm()

      await user.click(screen.getByRole('button', { name: /entrar na conta/i }))

      await waitFor(() => {
        expect(mockedSignIn).not.toHaveBeenCalled()
      })
    })
  })
})
