// stored data of clicked items
export const FETCH_DEVICE_TYPE = 'fetch_device_type';
// action creator
export const fetchDeviceType = (deviceType) => async (dispatch) => {
	const res = deviceType;

	dispatch({
		type: FETCH_DEVICE_TYPE,
		payload: res
	});
};
