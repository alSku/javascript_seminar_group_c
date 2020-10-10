import compression from 'compression';
import { parse, URL } from 'url';

const isValidUrl = (s, protocols) => {
	try {
		new URL(s);
		const parsed = parse(s);
		return protocols
			? parsed.protocol
				? protocols.map(x => `${x.toLowerCase()}:`).includes(parsed.protocol)
				: false
			: true;
	} catch (err) {
		return false;
	}
};

const isEmpty = (obj) => {
	return !Object.keys(obj).length > 0;
};

const shouldCompress = (req, res) => {
	if (req.headers['x-no-compression'])
		return false;

	return compression.filter(req, res);
};

export { isValidUrl, isEmpty, shouldCompress };
