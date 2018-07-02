import App from './../containers/App';
import HomePage from './../pages/home/HomePage';
import NotFoundPage from './../pages/not-found/NotFoundPage';

export default [
	{
		...App,
		routes: [
			{
				...HomePage,
				path: '/',
				exact: true
			},
			{
				...NotFoundPage
			}
		]
	}
];