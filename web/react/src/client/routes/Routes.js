import App from './../containers/App';
import HomePage from './../pages/home/HomePage';
import UsersListPage from './../pages/users-list/UsersListPage';
import NotFoundPage from './../pages/not-found/NotFoundPage';
import AdminsListPage from './../pages/admins-list/AdminsListPage';

export default [
	{
		...App,
		routes: [
			{
				...HomePage,
				path: '/',
				exact: true
			},{
				...AdminsListPage,
				path: '/admins',
			},{
				...UsersListPage,
				path: '/users',
			},
			{
				...NotFoundPage
			}
		]
	}
];