import App from './../containers/App';
import HomePage from './../pages/Home/HomePage';
import TechPage from './../pages/Tech/TechPage';
import NotFoundPage from './../pages/NotFound/NotFoundPage';

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
				...TechPage,
				path: '/tech'
			},
			{
				...NotFoundPage
			}
		]
	}
];
