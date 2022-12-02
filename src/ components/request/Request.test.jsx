import { useNavigate } from "react-router-dom";
import { Request } from "./Request";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockedNavigate
}))
jest.mock('../../services/login.service', () => ({
    checkUserLogged : () => true
}))
jest.mock('../../services/request.service', () => ({
    sendRequest : () => {}
}))

beforeEach(() => {
    render(<Request/>)
})

test('renders Request component', () => {
    

})

test('Go to download', () => {

    
    userEvent.click(screen.getByText("GO TO MY DOWNLOADS"))

    expect(mockedNavigate).toHaveBeenCalledWith("/download")
})

test('Input value', async () => {



    const input_element = screen.getAllByTestId("download-request-input")[0]
    userEvent.click(input_element)
    userEvent.type(input_element, "test_string")

    await waitFor(() => expect(input_element.textContent).toBe("test_string"))

    userEvent.click(screen.getByText("SOUNDCLOUD"))
    await new Promise(r => setTimeout(r, 1000))

    expect(screen.getAllByTestId("download-request-input").length).toBe(2)
    

})


test('Remove last', () => {
    const input_element = screen.getAllByTestId("download-request-input")[0]
    userEvent.click(input_element)
    userEvent.type(input_element, "test_string")

    expect(input_element.textContent).toBe("test_string")

    userEvent.click(screen.getByText("SOUNDCLOUD"))

    expect(screen.getAllByTestId("download-request-input").length).toBe(2)

    const remove_element = screen.getAllByTestId("download-request-delete")[0]
    userEvent.click(remove_element)

    expect(screen.getAllByTestId("download-request-input").length).toBe(1)
})