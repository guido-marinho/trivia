import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import Login from "../../pages/Login";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feedback from "../../pages/Feedback";

describe("Testando a página de feedback", () => {
    it('Teste se a página contém um heading h1 com uma mensagem de acordo com o numero de acertos', () => {
        const { history } = renderWithRouterAndRedux(<Feedback />);
        history.push('/feedback');
        const heading = screen.getByTestId('feedback-text');
        expect(heading).toBeInTheDocument();
    }
    );
    it('Teste se a página mostra a quantidade de acertos', () => {
        const { history } = renderWithRouterAndRedux(<Feedback />);
        history.push('/feedback');
        const assertions = screen.getByTestId('feedback-total-question');
        expect(assertions).toBeInTheDocument();
    }
    );
    it('Teste se a página mostra a quantidade total de pontos', () => {
        const { history } = renderWithRouterAndRedux(<Feedback />);
        history.push('/feedback');
        const score = screen.getByTestId('feedback-total-score');
        expect(score).toBeInTheDocument();
    }
    );
    it('Teste se a página contém um botão para jogar novamente', () => {
        const { history } = renderWithRouterAndRedux(<Feedback />);
        history.push('/feedback');
        const btnPlayAgain = screen.getByTestId('btn-play-again');
        expect(btnPlayAgain).toBeInTheDocument();
    }
    );
    it('Teste se a página contém um botão para visualizar a tela de ranking', () => {
        const { history } = renderWithRouterAndRedux(<Feedback />);
        history.push('/feedback');
        const btnRanking = screen.getByTestId('btn-ranking');
        expect(btnRanking).toBeInTheDocument();
    }
    );
    it('Teste se ao clicar no botão "Jogar novamente" a rota muda para a tela de login', () => {
        const { history } = renderWithRouterAndRedux(<Feedback />);
        history.push('/feedback');
        const btnPlayAgain = screen.getByTestId('btn-play-again');
        userEvent.click(btnPlayAgain);
        expect(history.location.pathname).toBe('/');
    }
    );
    it('Teste se ao clicar no botão "Ranking" a rota muda para a tela de ranking', () => {
        const { history } = renderWithRouterAndRedux(<Feedback />);
        history.push('/feedback');
        const btnRanking = screen.getByTestId('btn-ranking');
        userEvent.click(btnRanking);
        expect(history.location.pathname).toBe('/ranking');
    }
    );
});