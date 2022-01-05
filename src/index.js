import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { App } from './components';
import { ToastProvider } from 'react-toast-notifications';
import { AuthProvider, PostsProvider } from './providers/';

ReactDOM.render(
  <React.StrictMode>
		<ToastProvider autoDismiss autoDismissTimeout={5000} placement='top-right'>
			<AuthProvider>
				<PostsProvider>
    			<App />
				</PostsProvider>
			</AuthProvider>
		</ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
