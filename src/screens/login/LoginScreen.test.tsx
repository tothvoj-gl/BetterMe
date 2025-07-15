import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {LoginScreen} from './LoginScreen';
import {I18nextProvider} from 'react-i18next';
import i18n from '../../locales/i18n';

const mockLoginMutation = jest.fn();
let mockLoginError: string | undefined;
jest.mock('../../api/auth/useAuth', () => ({
  useLogin: () => ({mutate: mockLoginMutation, error: mockLoginError}),
}));

describe('LoginScreen', () => {
  const setup = () => {
    return render(
      <I18nextProvider i18n={i18n}>
        <LoginScreen />
      </I18nextProvider>,
    );
  };

  it('shows error on invalid email', async () => {
    setup();

    fireEvent.changeText(screen.getByTestId('email-input'), 'userexample.com');
    fireEvent.changeText(screen.getByTestId('password-input'), '12345678');
    fireEvent.press(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email.')).toBeOnTheScreen();
    });
    expect(mockLoginMutation).not.toHaveBeenCalled();
  });

  it('shows error on invalid password', async () => {
    setup();

    fireEvent.changeText(screen.getByTestId('email-input'), 'user@example.com');
    fireEvent.changeText(screen.getByTestId('password-input'), '1234');
    fireEvent.press(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(
        screen.getByText('Password has to be at least 8 characters long.'),
      ).toBeOnTheScreen();
    });

    expect(mockLoginMutation).not.toHaveBeenCalled();
  });

  it('shows error on invalid login', async () => {
    mockLoginError = 'error';
    setup();

    fireEvent.changeText(screen.getByTestId('email-input'), 'user@example.com');
    fireEvent.changeText(screen.getByTestId('password-input'), '12345678');
    fireEvent.press(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(mockLoginMutation).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: '12345678',
      });
    });
    expect(screen.getByText('Invalid credentials.')).toBeOnTheScreen();
  });
});
