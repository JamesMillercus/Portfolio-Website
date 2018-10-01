/*eslint no-param-reassign: ["error", { "props": false }]*/

import React from 'react';
import Error from './../../components/locs/Error/Error';

const NotFoundPage = ({ staticContext = {} }) => {
	staticContext.notFound = true;

	const htext = '404 page not found.';
	const ptext = 'Please visit the home page.';
	return <Error header={htext} paragraph={ptext} />;
};

export default {
	component: NotFoundPage
};
