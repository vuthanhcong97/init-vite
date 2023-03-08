/* eslint-disable import/export */
import store from '@redux/index';
import { cleanup, render } from '@testing-library/react'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { afterEach } from 'vitest'

afterEach(() => {
    cleanup()
})

const Wrapper = ({ children }) => {
	return (
		<Provider store={store}>
			<MemoryRouter>{children}</MemoryRouter>
		</Provider>
	);
};

const customRender = (ui, options) => render(ui, { wrapper: Wrapper, ...options });


export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }
