import App from './../containers/App';
import HomePage from './../pages/Home/HomePage';
import ServicesPage from './../pages/Services/ServicesPage';
import ARboutPage from './../pages/ARbout/ARboutPage';
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
				...ServicesPage,
				path: '/services'
			}, {
				...ARboutPage,
				path: '/arbout'
			}, {
				...NotFoundPage
			}
		]
	}
];
