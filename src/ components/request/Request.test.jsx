import { useNavigate } from "react-router-dom";
import { Request } from "./Request";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockedNavigate
}))
jest.mock('../../services/login.service', () => ({
    checkUserLogged : () => {}
}))

test('renders Request component', () => {
    render(<Request/>)

})

test('Go to download', () => {
    render(<Request/>)
    
    userEvent.click(screen.getByText("GO TO MY DOWNLOADS"))

    expect(mockedNavigate).toHaveBeenCalledWith("/download")
})