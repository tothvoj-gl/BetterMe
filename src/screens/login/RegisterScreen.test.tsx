import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {I18nextProvider} from 'react-i18next';
import i18n from '../../locales/i18n';
import {RegisterScreen} from './RegisterScreen';

const mockRegsiterMutation = jest.fn();
let mockRegisterError: string | undefined;
jest.mock('../../api/auth/useAuth', () => ({
  useRegister: () => ({mutate: mockRegsiterMutation, error: mockRegisterError}),
}));

describe('RegisterScreen', () => {
  const setup = () => {
    return render(
      <I18nextProvider i18n={i18n}>
        <RegisterScreen />
      </I18nextProvider>,
    );
  };

  it('shows error on invalid email', async () => {
    setup();

    fireEvent.changeText(screen.getByTestId('email-input'), 'userexample.com');
    fireEvent.changeText(screen.getByTestId('password-input'), '12345678');
    fireEvent.press(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email.')).toBeOnTheScreen();
    });
    expect(mockRegsiterMutation).not.toHaveBeenCalled();
  });

  it('shows error on invalid password', async () => {
    setup();

    fireEvent.changeText(screen.getByTestId('email-input'), 'user@example.com');
    fireEvent.changeText(screen.getByTestId('password-input'), '1234');
    fireEvent.changeText(screen.getByTestId('confirm-password-input'), '1234');
    fireEvent.press(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(
        screen.getAllByText('Password has to be at least 8 characters long.'),
      ).toHaveLength(2);
    });

    expect(mockRegsiterMutation).not.toHaveBeenCalled();
  });

  it('shows error on mismatched passwords', async () => {
    setup();

    fireEvent.changeText(screen.getByTestId('email-input'), 'user@example.com');
    fireEvent.changeText(screen.getByTestId('password-input'), '12345678');
    fireEvent.changeText(
      screen.getByTestId('confirm-password-input'),
      '123456789',
    );
    fireEvent.press(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(screen.getByText("Passwords don't match")).toBeOnTheScreen();
    });

    expect(mockRegsiterMutation).not.toHaveBeenCalled();
  });

  it('shows error on invalid login', async () => {
    mockRegisterError = 'error';
    setup();

    fireEvent.changeText(screen.getByTestId('email-input'), 'user@example.com');
    fireEvent.changeText(screen.getByTestId('password-input'), '12345678');
    fireEvent.changeText(
      screen.getByTestId('confirm-password-input'),
      '12345678',
    );
    fireEvent.press(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(mockRegsiterMutation).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: '12345678',
      });
    });
    expect(screen.getByText('Invalid credentials.')).toBeOnTheScreen();
  });
});
