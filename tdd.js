//345678901234567890123456789012345678901234567890123456789012345678901234567890
/// Just a scratch pad to test stuff out
/// contents of this file will change all the time.
const stack = require('callsite');
/////////////////////////////// SETUP ///////////////////////////////////////////

function showStack() {

	stack().forEach(function (site) {
		console.log('  \033[36m%s\033[90m in %s:%d\033[0m'
			, site.getFunctionName() || 'anonymous'
			, site.getFileName()
			, site.getLineNumber());
	});
	console.log();
}


showStack()