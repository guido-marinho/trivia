import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import Login from '../../pages/Login';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testando a página de login', () => {
    it('Teste se a página contém um heading h1 com o texto "Login"', () => {
        renderWithRouterAndRedux(<Login />);
        const heading = screen.getByRole('heading', { name: /Login/i });
        expect(heading).toBeInTheDocument();
    }
    );
    it('Teste se a página contém um input com o atributo data-testid="input-gravatar-email"', () => {
        renderWithRouterAndRedux(<Login />);
        const inputEmail = screen.getByTestId('input-gravatar-email');
        expect(inputEmail).toBeInTheDocument();
    }
    );
    it('Teste se a página contém um input com o atributo data-testid="input-player-name"', () => {
        renderWithRouterAndRedux(<Login />);
        const inputName = screen.getByTestId('input-player-name');
        expect(inputName).toBeInTheDocument();
    }
    );
    it('Teste se a página contém um botão com o texto "Play"', () => {
        renderWithRouterAndRedux(<Login />);
        const button = screen.getByRole('button', { name: /Play/i });
        expect(button).toBeInTheDocument();
    }
    );
    it('Teste se a página contém um botão com o texto "Settings"', () => {
        renderWithRouterAndRedux(<Login />);
        const button = screen.getByRole('button', { name: /Settings/i });
        expect(button).toBeInTheDocument();
    }
    );
    it('Teste se o botão "Play" está desabilitado', () => {
        renderWithRouterAndRedux(<Login />);
        const button = screen.getByRole('button', { name: /Play/i });
        expect(button).toBeDisabled();
    }
    );
    it('Teste se o botão "Play" está habilitado', () => {
        renderWithRouterAndRedux(<Login />);
        const inputEmail = screen.getByTestId('input-gravatar-email');
        const inputName = screen.getByTestId('input-player-name');
        const button = screen.getByRole('button', { name: /Play/i });
        userEvent.type(inputEmail, 'example@email.com');
        userEvent.type(inputName, 'example');
        expect(button).toBeEnabled();
    }
    );
    it('Teste se o botão "Settings" redireciona para a página de configurações', () => {
        const { history } = renderWithRouterAndRedux(<Login />);
        const button = screen.getByRole('button', { name: /Settings/i });
        userEvent.click(button);
        const { pathname } = history.location;
        expect(pathname).toBe('/settings');
    }
    );
    it('Teste se o botão "Play" redireciona para a página de jogo', () => {
        const { history } = renderWithRouterAndRedux(<Login />);
        const inputEmail = screen.getByTestId('input-gravatar-email');
        const inputName = screen.getByTestId('input-player-name');
        const button = screen.getByRole('button', { name: /Play/i });
        userEvent.type(inputEmail, 'example@mail.com');
        userEvent.type(inputName, 'example');
        userEvent.click(button);
        const { pathname } = history.location;
        expect(pathname).toBe('/game');
    }
    );
    it('Testa se ao digitar nos inputs salva as informações no estado local', () => {
        renderWithRouterAndRedux(<Login />);
        const inputEmail = screen.getByTestId('input-gravatar-email');
        const inputName = screen.getByTestId('input-player-name');
        userEvent.type(inputEmail, 'email@example.com');
        userEvent.type(inputName, 'example');
        expect(inputEmail).toHaveValue('email@example.com');
        expect(inputName).toHaveValue('example');
    }
    );
    it('Testa se o placeholder contém o texto correto', () => {
        renderWithRouterAndRedux(<Login />);
        const inputEmail = screen.getByTestId('input-gravatar-email');
        const inputName = screen.getByTestId('input-player-name');
        expect(inputEmail).toHaveAttribute('placeholder', 'Digite seu Email');
        expect(inputName).toHaveAttribute('placeholder', 'Digite seu Nome');
    }
    );
    it('Testa se é salvo no localStorage o token', async () => {
        renderWithRouterAndRedux(<Login />);
        const requestToken = 'https://opentdb.com/api_token.php?command=request'
        const response = await fetch(requestToken)
        const data = await response.json()

        const inputEmail = screen.getByTestId('input-gravatar-email');
        const inputName = screen.getByTestId('input-player-name');
        const button = screen.getByRole('button', { name: /Play/i });
        userEvent.type(inputEmail, 'mailex@ample.com');
        userEvent.type(inputName, 'example');
        userEvent.click(button);
        localStorage.setItem('token', data.token)
        const token = localStorage.getItem('token');
        expect(token).toBe(data.token);
    }
    );
});