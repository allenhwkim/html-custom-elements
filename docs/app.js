/** ****/ (function(modules) { // webpackBootstrap
/** ****/ 	function hotDisposeChunk(chunkId) {
    /** ****/ 		delete installedChunks[chunkId];
    /** ****/}
  /** ****/ 	const parentHotUpdateCallback = window['webpackHotUpdate'];
  /** ****/ 	window['webpackHotUpdate'] = // eslint-disable-next-line no-unused-vars
    /** ****/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
      /** ****/ 		hotAddUpdateChunk(chunkId, moreModules);
      /** ****/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
      /** ****/};
  /** ****/
  /** ****/ 	// eslint-disable-next-line no-unused-vars
  /** ****/ 	function hotDownloadUpdateChunk(chunkId) {
    /** ****/ 		const script = document.createElement('script');
    /** ****/ 		script.charset = 'utf-8';
    /** ****/ 		script.src = __webpack_require__.p + '' + chunkId + '.' + hotCurrentHash + '.hot-update.js';
    /** ****/ 		if (null) script.crossOrigin = null;
    /** ****/ 		document.head.appendChild(script);
    /** ****/}
  /** ****/
  /** ****/ 	// eslint-disable-next-line no-unused-vars
  /** ****/ 	function hotDownloadManifest(requestTimeout) {
    /** ****/ 		requestTimeout = requestTimeout || 10000;
    /** ****/ 		return new Promise(function(resolve, reject) {
      /** ****/ 			if (typeof XMLHttpRequest === 'undefined') {
        /** ****/ 				return reject(new Error('No browser support'));
        /** ****/}
      /** ****/ 			try {
        /** ****/ 				var request = new XMLHttpRequest();
        /** ****/ 				var requestPath = __webpack_require__.p + '' + hotCurrentHash + '.hot-update.json';
        /** ****/ 				request.open('GET', requestPath, true);
        /** ****/ 				request.timeout = requestTimeout;
        /** ****/ 				request.send(null);
        /** ****/} catch (err) {
        /** ****/ 				return reject(err);
        /** ****/}
      /** ****/ 			request.onreadystatechange = function() {
        /** ****/ 				if (request.readyState !== 4) return;
        /** ****/ 				if (request.status === 0) {
          /** ****/ 					// timeout
          /** ****/ 					reject(
              /** ****/ 						new Error('Manifest request to ' + requestPath + ' timed out.')
              /** ****/ 					);
          /** ****/} else if (request.status === 404) {
          /** ****/ 					// no update available
          /** ****/ 					resolve();
          /** ****/} else if (request.status !== 200 && request.status !== 304) {
          /** ****/ 					// other failure
          /** ****/ 					reject(new Error('Manifest request to ' + requestPath + ' failed.'));
          /** ****/} else {
          /** ****/ 					// success
          /** ****/ 					try {
            /** ****/ 						var update = JSON.parse(request.responseText);
            /** ****/} catch (e) {
            /** ****/ 						reject(e);
            /** ****/ 						return;
            /** ****/}
          /** ****/ 					resolve(update);
          /** ****/}
        /** ****/};
      /** ****/});
    /** ****/}
  /** ****/
  /** ****/ 	let hotApplyOnUpdate = true;
  /** ****/ 	// eslint-disable-next-line no-unused-vars
  /** ****/ 	var hotCurrentHash = '7ff10daff3bd763afabc';
  /** ****/ 	const hotRequestTimeout = 10000;
  /** ****/ 	const hotCurrentModuleData = {};
  /** ****/ 	let hotCurrentChildModule;
  /** ****/ 	// eslint-disable-next-line no-unused-vars
  /** ****/ 	let hotCurrentParents = [];
  /** ****/ 	// eslint-disable-next-line no-unused-vars
  /** ****/ 	let hotCurrentParentsTemp = [];
  /** ****/
  /** ****/ 	// eslint-disable-next-line no-unused-vars
  /** ****/ 	function hotCreateRequire(moduleId) {
    /** ****/ 		const me = installedModules[moduleId];
    /** ****/ 		if (!me) return __webpack_require__;
    /** ****/ 		const fn = function(request) {
      /** ****/ 			if (me.hot.active) {
        /** ****/ 				if (installedModules[request]) {
          /** ****/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
            /** ****/ 						installedModules[request].parents.push(moduleId);
            /** ****/}
          /** ****/} else {
          /** ****/ 					hotCurrentParents = [moduleId];
          /** ****/ 					hotCurrentChildModule = request;
          /** ****/}
        /** ****/ 				if (me.children.indexOf(request) === -1) {
          /** ****/ 					me.children.push(request);
          /** ****/}
        /** ****/} else {
        /** ****/ 				console.warn(
            /** ****/ 					'[HMR] unexpected require(' +
            /** ****/ 						request +
            /** ****/ 						') from disposed module ' +
            /** ****/ 						moduleId
            /** ****/ 				);
        /** ****/ 				hotCurrentParents = [];
        /** ****/}
      /** ****/ 			return __webpack_require__(request);
      /** ****/};
    /** ****/ 		const ObjectFactory = function ObjectFactory(name) {
      /** ****/ 			return {
        /** ****/ 				configurable: true,
        /** ****/ 				enumerable: true,
        /** ****/ 				get: function() {
          /** ****/ 					return __webpack_require__[name];
          /** ****/},
        /** ****/ 				set: function(value) {
          /** ****/ 					__webpack_require__[name] = value;
          /** ****/}
        /** ****/ 			};
      /** ****/};
    /** ****/ 		for (const name in __webpack_require__) {
      /** ****/ 			if (
      /** ****/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
        /** ****/ 				name !== 'e' &&
        /** ****/ 				name !== 't'
      /** ****/ 			) {
        /** ****/ 				Object.defineProperty(fn, name, ObjectFactory(name));
        /** ****/}
      /** ****/}
    /** ****/ 		fn.e = function(chunkId) {
      /** ****/ 			if (hotStatus === 'ready') hotSetStatus('prepare');
      /** ****/ 			hotChunksLoading++;
      /** ****/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
        /** ****/ 				finishChunkLoading();
        /** ****/ 				throw err;
        /** ****/});
      /** ****/
      /** ****/ 			function finishChunkLoading() {
        /** ****/ 				hotChunksLoading--;
        /** ****/ 				if (hotStatus === 'prepare') {
          /** ****/ 					if (!hotWaitingFilesMap[chunkId]) {
            /** ****/ 						hotEnsureUpdateChunk(chunkId);
            /** ****/}
          /** ****/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
            /** ****/ 						hotUpdateDownloaded();
            /** ****/}
          /** ****/}
        /** ****/}
      /** ****/};
    /** ****/ 		fn.t = function(value, mode) {
      /** ****/ 			if (mode & 1) value = fn(value);
      /** ****/ 			return __webpack_require__.t(value, mode & ~1);
      /** ****/};
    /** ****/ 		return fn;
    /** ****/}
  /** ****/
  /** ****/ 	// eslint-disable-next-line no-unused-vars
  /** ****/ 	function hotCreateModule(moduleId) {
    /** ****/ 		var hot = {
      /** ****/ 			// private stuff
      /** ****/ 			_acceptedDependencies: {},
      /** ****/ 			_declinedDependencies: {},
      /** ****/ 			_selfAccepted: false,
      /** ****/ 			_selfDeclined: false,
      /** ****/ 			_disposeHandlers: [],
      /** ****/ 			_main: hotCurrentChildModule !== moduleId,
      /** ****/
      /** ****/ 			// Module API
      /** ****/ 			active: true,
      /** ****/ 			accept: function(dep, callback) {
        /** ****/ 				if (dep === undefined) hot._selfAccepted = true;
        /** ****/ 				else if (typeof dep === 'function') hot._selfAccepted = dep;
        /** ****/ 				else if (typeof dep === 'object')
        /** ****/ 					{
          for (let i = 0; i < dep.length; i++)
          /** ****/ 						{
            hot._acceptedDependencies[dep[i]] = callback || function() {};
          }
        }
        /** ****/ 				else hot._acceptedDependencies[dep] = callback || function() {};
        /** ****/},
      /** ****/ 			decline: function(dep) {
        /** ****/ 				if (dep === undefined) hot._selfDeclined = true;
        /** ****/ 				else if (typeof dep === 'object')
        /** ****/ 					{
          for (let i = 0; i < dep.length; i++)
          /** ****/ 						{
            hot._declinedDependencies[dep[i]] = true;
          }
        }
        /** ****/ 				else hot._declinedDependencies[dep] = true;
        /** ****/},
      /** ****/ 			dispose: function(callback) {
        /** ****/ 				hot._disposeHandlers.push(callback);
        /** ****/},
      /** ****/ 			addDisposeHandler: function(callback) {
        /** ****/ 				hot._disposeHandlers.push(callback);
        /** ****/},
      /** ****/ 			removeDisposeHandler: function(callback) {
        /** ****/ 				const idx = hot._disposeHandlers.indexOf(callback);
        /** ****/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
        /** ****/},
      /** ****/
      /** ****/ 			// Management API
      /** ****/ 			check: hotCheck,
      /** ****/ 			apply: hotApply,
      /** ****/ 			status: function(l) {
        /** ****/ 				if (!l) return hotStatus;
        /** ****/ 				hotStatusHandlers.push(l);
        /** ****/},
      /** ****/ 			addStatusHandler: function(l) {
        /** ****/ 				hotStatusHandlers.push(l);
        /** ****/},
      /** ****/ 			removeStatusHandler: function(l) {
        /** ****/ 				const idx = hotStatusHandlers.indexOf(l);
        /** ****/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
        /** ****/},
      /** ****/
      /** ****/ 			// inherit from previous dispose call
      /** ****/ 			data: hotCurrentModuleData[moduleId]
      /** ****/ 		};
    /** ****/ 		hotCurrentChildModule = undefined;
    /** ****/ 		return hot;
    /** ****/}
  /** ****/
  /** ****/ 	var hotStatusHandlers = [];
  /** ****/ 	var hotStatus = 'idle';
  /** ****/
  /** ****/ 	function hotSetStatus(newStatus) {
    /** ****/ 		hotStatus = newStatus;
    /** ****/ 		for (let i = 0; i < hotStatusHandlers.length; i++)
    /** ****/ 			{
      hotStatusHandlers[i].call(null, newStatus);
    }
    /** ****/}
  /** ****/
  /** ****/ 	// while downloading
  /** ****/ 	var hotWaitingFiles = 0;
  /** ****/ 	var hotChunksLoading = 0;
  /** ****/ 	var hotWaitingFilesMap = {};
  /** ****/ 	let hotRequestedFilesMap = {};
  /** ****/ 	let hotAvailableFilesMap = {};
  /** ****/ 	let hotDeferred;
  /** ****/
  /** ****/ 	// The update info
  /** ****/ 	let hotUpdate; let hotUpdateNewHash;
  /** ****/
  /** ****/ 	function toModuleId(id) {
    /** ****/ 		const isNumber = +id + '' === id;
    /** ****/ 		return isNumber ? +id : id;
    /** ****/}
  /** ****/
  /** ****/ 	function hotCheck(apply) {
    /** ****/ 		if (hotStatus !== 'idle') {
      /** ****/ 			throw new Error('check() is only allowed in idle status');
      /** ****/}
    /** ****/ 		hotApplyOnUpdate = apply;
    /** ****/ 		hotSetStatus('check');
    /** ****/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
      /** ****/ 			if (!update) {
        /** ****/ 				hotSetStatus('idle');
        /** ****/ 				return null;
        /** ****/}
      /** ****/ 			hotRequestedFilesMap = {};
      /** ****/ 			hotWaitingFilesMap = {};
      /** ****/ 			hotAvailableFilesMap = update.c;
      /** ****/ 			hotUpdateNewHash = update.h;
      /** ****/
      /** ****/ 			hotSetStatus('prepare');
      /** ****/ 			const promise = new Promise(function(resolve, reject) {
        /** ****/ 				hotDeferred = {
          /** ****/ 					resolve: resolve,
          /** ****/ 					reject: reject
          /** ****/ 				};
        /** ****/});
      /** ****/ 			hotUpdate = {};
      /** ****/ 			const chunkId = 'app';
      /** ****/ 			// eslint-disable-next-line no-lone-blocks
      /** ****/ 			{
        /** ****/ 				/* globals chunkId */
        /** ****/ 				hotEnsureUpdateChunk(chunkId);
        /** ****/}
      /** ****/ 			if (
      /** ****/ 				hotStatus === 'prepare' &&
        /** ****/ 				hotChunksLoading === 0 &&
        /** ****/ 				hotWaitingFiles === 0
      /** ****/ 			) {
        /** ****/ 				hotUpdateDownloaded();
        /** ****/}
      /** ****/ 			return promise;
      /** ****/});
    /** ****/}
  /** ****/
  /** ****/ 	// eslint-disable-next-line no-unused-vars
  /** ****/ 	function hotAddUpdateChunk(chunkId, moreModules) {
    /** ****/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
    /** ****/ 			{
      return;
    }
    /** ****/ 		hotRequestedFilesMap[chunkId] = false;
    /** ****/ 		for (const moduleId in moreModules) {
      /** ****/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        /** ****/ 				hotUpdate[moduleId] = moreModules[moduleId];
        /** ****/}
      /** ****/}
    /** ****/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
      /** ****/ 			hotUpdateDownloaded();
      /** ****/}
    /** ****/}
  /** ****/
  /** ****/ 	function hotEnsureUpdateChunk(chunkId) {
    /** ****/ 		if (!hotAvailableFilesMap[chunkId]) {
      /** ****/ 			hotWaitingFilesMap[chunkId] = true;
      /** ****/} else {
      /** ****/ 			hotRequestedFilesMap[chunkId] = true;
      /** ****/ 			hotWaitingFiles++;
      /** ****/ 			hotDownloadUpdateChunk(chunkId);
      /** ****/}
    /** ****/}
  /** ****/
  /** ****/ 	function hotUpdateDownloaded() {
    /** ****/ 		hotSetStatus('ready');
    /** ****/ 		const deferred = hotDeferred;
    /** ****/ 		hotDeferred = null;
    /** ****/ 		if (!deferred) return;
    /** ****/ 		if (hotApplyOnUpdate) {
      /** ****/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
      /** ****/ 			// avoid triggering uncaught exception warning in Chrome.
      /** ****/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
      /** ****/ 			Promise.resolve()
      /** ****/ 				.then(function() {
            /** ****/ 					return hotApply(hotApplyOnUpdate);
            /** ****/})
      /** ****/ 				.then(
              /** ****/ 					function(result) {
                /** ****/ 						deferred.resolve(result);
                /** ****/},
              /** ****/ 					function(err) {
                /** ****/ 						deferred.reject(err);
                /** ****/}
              /** ****/ 				);
      /** ****/} else {
      /** ****/ 			const outdatedModules = [];
      /** ****/ 			for (const id in hotUpdate) {
        /** ****/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
          /** ****/ 					outdatedModules.push(toModuleId(id));
          /** ****/}
        /** ****/}
      /** ****/ 			deferred.resolve(outdatedModules);
      /** ****/}
    /** ****/}
  /** ****/
  /** ****/ 	function hotApply(options) {
    /** ****/ 		if (hotStatus !== 'ready')
    /** ****/ 			{
      throw new Error('apply() is only allowed in ready status');
    }
    /** ****/ 		options = options || {};
    /** ****/
    /** ****/ 		let cb;
    /** ****/ 		let i;
    /** ****/ 		let j;
    /** ****/ 		let module;
    /** ****/ 		let moduleId;
    /** ****/
    /** ****/ 		function getAffectedStuff(updateModuleId) {
      /** ****/ 			const outdatedModules = [updateModuleId];
      /** ****/ 			const outdatedDependencies = {};
      /** ****/
      /** ****/ 			const queue = outdatedModules.slice().map(function(id) {
        /** ****/ 				return {
          /** ****/ 					chain: [id],
          /** ****/ 					id: id
          /** ****/ 				};
        /** ****/});
      /** ****/ 			while (queue.length > 0) {
        /** ****/ 				const queueItem = queue.pop();
        /** ****/ 				const moduleId = queueItem.id;
        /** ****/ 				const chain = queueItem.chain;
        /** ****/ 				module = installedModules[moduleId];
        /** ****/ 				if (!module || module.hot._selfAccepted) continue;
        /** ****/ 				if (module.hot._selfDeclined) {
          /** ****/ 					return {
            /** ****/ 						type: 'self-declined',
            /** ****/ 						chain: chain,
            /** ****/ 						moduleId: moduleId
            /** ****/ 					};
          /** ****/}
        /** ****/ 				if (module.hot._main) {
          /** ****/ 					return {
            /** ****/ 						type: 'unaccepted',
            /** ****/ 						chain: chain,
            /** ****/ 						moduleId: moduleId
            /** ****/ 					};
          /** ****/}
        /** ****/ 				for (let i = 0; i < module.parents.length; i++) {
          /** ****/ 					const parentId = module.parents[i];
          /** ****/ 					const parent = installedModules[parentId];
          /** ****/ 					if (!parent) continue;
          /** ****/ 					if (parent.hot._declinedDependencies[moduleId]) {
            /** ****/ 						return {
              /** ****/ 							type: 'declined',
              /** ****/ 							chain: chain.concat([parentId]),
              /** ****/ 							moduleId: moduleId,
              /** ****/ 							parentId: parentId
              /** ****/ 						};
            /** ****/}
          /** ****/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
          /** ****/ 					if (parent.hot._acceptedDependencies[moduleId]) {
            /** ****/ 						if (!outdatedDependencies[parentId])
            /** ****/ 							{
              outdatedDependencies[parentId] = [];
            }
            /** ****/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
            /** ****/ 						continue;
            /** ****/}
          /** ****/ 					delete outdatedDependencies[parentId];
          /** ****/ 					outdatedModules.push(parentId);
          /** ****/ 					queue.push({
            /** ****/ 						chain: chain.concat([parentId]),
            /** ****/ 						id: parentId
            /** ****/ 					});
          /** ****/}
        /** ****/}
      /** ****/
      /** ****/ 			return {
        /** ****/ 				type: 'accepted',
        /** ****/ 				moduleId: updateModuleId,
        /** ****/ 				outdatedModules: outdatedModules,
        /** ****/ 				outdatedDependencies: outdatedDependencies
        /** ****/ 			};
      /** ****/}
    /** ****/
    /** ****/ 		function addAllToSet(a, b) {
      /** ****/ 			for (let i = 0; i < b.length; i++) {
        /** ****/ 				const item = b[i];
        /** ****/ 				if (a.indexOf(item) === -1) a.push(item);
        /** ****/}
      /** ****/}
    /** ****/
    /** ****/ 		// at begin all updates modules are outdated
    /** ****/ 		// the "outdated" status can propagate to parents if they don't accept the children
    /** ****/ 		const outdatedDependencies = {};
    /** ****/ 		const outdatedModules = [];
    /** ****/ 		const appliedUpdate = {};
    /** ****/
    /** ****/ 		const warnUnexpectedRequire = function warnUnexpectedRequire() {
      /** ****/ 			console.warn(
          /** ****/ 				'[HMR] unexpected require(' + result.moduleId + ') to disposed module'
          /** ****/ 			);
      /** ****/};
    /** ****/
    /** ****/ 		for (const id in hotUpdate) {
      /** ****/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
        /** ****/ 				moduleId = toModuleId(id);
        /** ****/ 				/** @type {TODO} */
        /** ****/ 				var result;
        /** ****/ 				if (hotUpdate[id]) {
          /** ****/ 					result = getAffectedStuff(moduleId);
          /** ****/} else {
          /** ****/ 					result = {
            /** ****/ 						type: 'disposed',
            /** ****/ 						moduleId: id
            /** ****/ 					};
          /** ****/}
        /** ****/ 				/** @type {Error|false} */
        /** ****/ 				let abortError = false;
        /** ****/ 				let doApply = false;
        /** ****/ 				let doDispose = false;
        /** ****/ 				let chainInfo = '';
        /** ****/ 				if (result.chain) {
          /** ****/ 					chainInfo = '\nUpdate propagation: ' + result.chain.join(' -> ');
          /** ****/}
        /** ****/ 				switch (result.type) {
          /** ****/ 					case 'self-declined':
            /** ****/ 						if (options.onDeclined) options.onDeclined(result);
            /** ****/ 						if (!options.ignoreDeclined)
            /** ****/ 							{
              abortError = new Error(
                  /** ****/ 								'Aborted because of self decline: ' +
                  /** ****/ 									result.moduleId +
                  /** ****/ 									chainInfo
                  /** ****/ 							);
            }
            /** ****/ 						break;
            /** ****/ 					case 'declined':
            /** ****/ 						if (options.onDeclined) options.onDeclined(result);
            /** ****/ 						if (!options.ignoreDeclined)
            /** ****/ 							{
              abortError = new Error(
                  /** ****/ 								'Aborted because of declined dependency: ' +
                  /** ****/ 									result.moduleId +
                  /** ****/ 									' in ' +
                  /** ****/ 									result.parentId +
                  /** ****/ 									chainInfo
                  /** ****/ 							);
            }
            /** ****/ 						break;
            /** ****/ 					case 'unaccepted':
            /** ****/ 						if (options.onUnaccepted) options.onUnaccepted(result);
            /** ****/ 						if (!options.ignoreUnaccepted)
            /** ****/ 							{
              abortError = new Error(
                  /** ****/ 								'Aborted because ' + moduleId + ' is not accepted' + chainInfo
                  /** ****/ 							);
            }
            /** ****/ 						break;
            /** ****/ 					case 'accepted':
            /** ****/ 						if (options.onAccepted) options.onAccepted(result);
            /** ****/ 						doApply = true;
            /** ****/ 						break;
            /** ****/ 					case 'disposed':
            /** ****/ 						if (options.onDisposed) options.onDisposed(result);
            /** ****/ 						doDispose = true;
            /** ****/ 						break;
            /** ****/ 					default:
            /** ****/ 						throw new Error('Unexception type ' + result.type);
/** ****/}
        /** ****/ 				if (abortError) {
          /** ****/ 					hotSetStatus('abort');
          /** ****/ 					return Promise.reject(abortError);
          /** ****/}
        /** ****/ 				if (doApply) {
          /** ****/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
          /** ****/ 					addAllToSet(outdatedModules, result.outdatedModules);
          /** ****/ 					for (moduleId in result.outdatedDependencies) {
            /** ****/ 						if (
            /** ****/ 							Object.prototype.hasOwnProperty.call(
                  /** ****/ 								result.outdatedDependencies,
                  /** ****/ 								moduleId
                  /** ****/ 							)
            /** ****/ 						) {
              /** ****/ 							if (!outdatedDependencies[moduleId])
              /** ****/ 								{
                outdatedDependencies[moduleId] = [];
              }
              /** ****/ 							addAllToSet(
                  /** ****/ 								outdatedDependencies[moduleId],
                  /** ****/ 								result.outdatedDependencies[moduleId]
                  /** ****/ 							);
              /** ****/}
            /** ****/}
          /** ****/}
        /** ****/ 				if (doDispose) {
          /** ****/ 					addAllToSet(outdatedModules, [result.moduleId]);
          /** ****/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
          /** ****/}
        /** ****/}
      /** ****/}
    /** ****/
    /** ****/ 		// Store self accepted outdated modules to require them later by the module system
    /** ****/ 		const outdatedSelfAcceptedModules = [];
    /** ****/ 		for (i = 0; i < outdatedModules.length; i++) {
      /** ****/ 			moduleId = outdatedModules[i];
      /** ****/ 			if (
      /** ****/ 				installedModules[moduleId] &&
        /** ****/ 				installedModules[moduleId].hot._selfAccepted
      /** ****/ 			)
      /** ****/ 				{
        outdatedSelfAcceptedModules.push({
        /** ****/ 					module: moduleId,
          /** ****/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
        /** ****/ 				});
      }
      /** ****/}
    /** ****/
    /** ****/ 		// Now in "dispose" phase
    /** ****/ 		hotSetStatus('dispose');
    /** ****/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
      /** ****/ 			if (hotAvailableFilesMap[chunkId] === false) {
        /** ****/ 				hotDisposeChunk(chunkId);
        /** ****/}
      /** ****/});
    /** ****/
    /** ****/ 		let idx;
    /** ****/ 		const queue = outdatedModules.slice();
    /** ****/ 		while (queue.length > 0) {
      /** ****/ 			moduleId = queue.pop();
      /** ****/ 			module = installedModules[moduleId];
      /** ****/ 			if (!module) continue;
      /** ****/
      /** ****/ 			const data = {};
      /** ****/
      /** ****/ 			// Call dispose handlers
      /** ****/ 			const disposeHandlers = module.hot._disposeHandlers;
      /** ****/ 			for (j = 0; j < disposeHandlers.length; j++) {
        /** ****/ 				cb = disposeHandlers[j];
        /** ****/ 				cb(data);
        /** ****/}
      /** ****/ 			hotCurrentModuleData[moduleId] = data;
      /** ****/
      /** ****/ 			// disable module (this disables requires from this module)
      /** ****/ 			module.hot.active = false;
      /** ****/
      /** ****/ 			// remove module from cache
      /** ****/ 			delete installedModules[moduleId];
      /** ****/
      /** ****/ 			// when disposing there is no need to call dispose handler
      /** ****/ 			delete outdatedDependencies[moduleId];
      /** ****/
      /** ****/ 			// remove "parents" references from all children
      /** ****/ 			for (j = 0; j < module.children.length; j++) {
        /** ****/ 				const child = installedModules[module.children[j]];
        /** ****/ 				if (!child) continue;
        /** ****/ 				idx = child.parents.indexOf(moduleId);
        /** ****/ 				if (idx >= 0) {
          /** ****/ 					child.parents.splice(idx, 1);
          /** ****/}
        /** ****/}
      /** ****/}
    /** ****/
    /** ****/ 		// remove outdated dependency from module children
    /** ****/ 		let dependency;
    /** ****/ 		let moduleOutdatedDependencies;
    /** ****/ 		for (moduleId in outdatedDependencies) {
      /** ****/ 			if (
      /** ****/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
      /** ****/ 			) {
        /** ****/ 				module = installedModules[moduleId];
        /** ****/ 				if (module) {
          /** ****/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /** ****/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
            /** ****/ 						dependency = moduleOutdatedDependencies[j];
            /** ****/ 						idx = module.children.indexOf(dependency);
            /** ****/ 						if (idx >= 0) module.children.splice(idx, 1);
            /** ****/}
          /** ****/}
        /** ****/}
      /** ****/}
    /** ****/
    /** ****/ 		// Not in "apply" phase
    /** ****/ 		hotSetStatus('apply');
    /** ****/
    /** ****/ 		hotCurrentHash = hotUpdateNewHash;
    /** ****/
    /** ****/ 		// insert new code
    /** ****/ 		for (moduleId in appliedUpdate) {
      /** ****/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
        /** ****/ 				modules[moduleId] = appliedUpdate[moduleId];
        /** ****/}
      /** ****/}
    /** ****/
    /** ****/ 		// call accept handlers
    /** ****/ 		let error = null;
    /** ****/ 		for (moduleId in outdatedDependencies) {
      /** ****/ 			if (
      /** ****/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
      /** ****/ 			) {
        /** ****/ 				module = installedModules[moduleId];
        /** ****/ 				if (module) {
          /** ****/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
          /** ****/ 					const callbacks = [];
          /** ****/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
            /** ****/ 						dependency = moduleOutdatedDependencies[i];
            /** ****/ 						cb = module.hot._acceptedDependencies[dependency];
            /** ****/ 						if (cb) {
              /** ****/ 							if (callbacks.indexOf(cb) !== -1) continue;
              /** ****/ 							callbacks.push(cb);
              /** ****/}
            /** ****/}
          /** ****/ 					for (i = 0; i < callbacks.length; i++) {
            /** ****/ 						cb = callbacks[i];
            /** ****/ 						try {
              /** ****/ 							cb(moduleOutdatedDependencies);
              /** ****/} catch (err) {
              /** ****/ 							if (options.onErrored) {
                /** ****/ 								options.onErrored({
                  /** ****/ 									type: 'accept-errored',
                  /** ****/ 									moduleId: moduleId,
                  /** ****/ 									dependencyId: moduleOutdatedDependencies[i],
                  /** ****/ 									error: err
                  /** ****/ 								});
                /** ****/}
              /** ****/ 							if (!options.ignoreErrored) {
                /** ****/ 								if (!error) error = err;
                /** ****/}
              /** ****/}
            /** ****/}
          /** ****/}
        /** ****/}
      /** ****/}
    /** ****/
    /** ****/ 		// Load self accepted modules
    /** ****/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
      /** ****/ 			const item = outdatedSelfAcceptedModules[i];
      /** ****/ 			moduleId = item.module;
      /** ****/ 			hotCurrentParents = [moduleId];
      /** ****/ 			try {
        /** ****/ 				__webpack_require__(moduleId);
        /** ****/} catch (err) {
        /** ****/ 				if (typeof item.errorHandler === 'function') {
          /** ****/ 					try {
            /** ****/ 						item.errorHandler(err);
            /** ****/} catch (err2) {
            /** ****/ 						if (options.onErrored) {
              /** ****/ 							options.onErrored({
                /** ****/ 								type: 'self-accept-error-handler-errored',
                /** ****/ 								moduleId: moduleId,
                /** ****/ 								error: err2,
                /** ****/ 								originalError: err
                /** ****/ 							});
              /** ****/}
            /** ****/ 						if (!options.ignoreErrored) {
              /** ****/ 							if (!error) error = err2;
              /** ****/}
            /** ****/ 						if (!error) error = err;
            /** ****/}
          /** ****/} else {
          /** ****/ 					if (options.onErrored) {
            /** ****/ 						options.onErrored({
              /** ****/ 							type: 'self-accept-errored',
              /** ****/ 							moduleId: moduleId,
              /** ****/ 							error: err
              /** ****/ 						});
            /** ****/}
          /** ****/ 					if (!options.ignoreErrored) {
            /** ****/ 						if (!error) error = err;
            /** ****/}
          /** ****/}
        /** ****/}
      /** ****/}
    /** ****/
    /** ****/ 		// handle errors in accept handlers and self accepted module load
    /** ****/ 		if (error) {
      /** ****/ 			hotSetStatus('fail');
      /** ****/ 			return Promise.reject(error);
      /** ****/}
    /** ****/
    /** ****/ 		hotSetStatus('idle');
    /** ****/ 		return new Promise(function(resolve) {
      /** ****/ 			resolve(outdatedModules);
      /** ****/});
    /** ****/}
  /** ****/
  /** ****/ 	// The module cache
  /** ****/ 	var installedModules = {};
  /** ****/
  /** ****/ 	// The require function
  /** ****/ 	function __webpack_require__(moduleId) {
    /** ****/
    /** ****/ 		// Check if module is in cache
    /** ****/ 		if (installedModules[moduleId]) {
      /** ****/ 			return installedModules[moduleId].exports;
      /** ****/}
    /** ****/ 		// Create a new module (and put it into the cache)
    /** ****/ 		const module = installedModules[moduleId] = {
      /** ****/ 			i: moduleId,
      /** ****/ 			l: false,
      /** ****/ 			exports: {},
      /** ****/ 			hot: hotCreateModule(moduleId),
      /** ****/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
      /** ****/ 			children: []
      /** ****/ 		};
    /** ****/
    /** ****/ 		// Execute the module function
    /** ****/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
    /** ****/
    /** ****/ 		// Flag the module as loaded
    /** ****/ 		module.l = true;
    /** ****/
    /** ****/ 		// Return the exports of the module
    /** ****/ 		return module.exports;
    /** ****/}
  /** ****/
  /** ****/
  /** ****/ 	// expose the modules object (__webpack_modules__)
  /** ****/ 	__webpack_require__.m = modules;
  /** ****/
  /** ****/ 	// expose the module cache
  /** ****/ 	__webpack_require__.c = installedModules;
  /** ****/
  /** ****/ 	// define getter function for harmony exports
  /** ****/ 	__webpack_require__.d = function(exports, name, getter) {
    /** ****/ 		if (!__webpack_require__.o(exports, name)) {
      /** ****/ 			Object.defineProperty(exports, name, {enumerable: true, get: getter});
      /** ****/}
    /** ****/};
  /** ****/
  /** ****/ 	// define __esModule on exports
  /** ****/ 	__webpack_require__.r = function(exports) {
    /** ****/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /** ****/ 			Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
      /** ****/}
    /** ****/ 		Object.defineProperty(exports, '__esModule', {value: true});
    /** ****/};
  /** ****/
  /** ****/ 	// create a fake namespace object
  /** ****/ 	// mode & 1: value is a module id, require it
  /** ****/ 	// mode & 2: merge all properties of value into the ns
  /** ****/ 	// mode & 4: return value when already ns object
  /** ****/ 	// mode & 8|1: behave like require
  /** ****/ 	__webpack_require__.t = function(value, mode) {
    /** ****/ 		if (mode & 1) value = __webpack_require__(value);
    /** ****/ 		if (mode & 8) return value;
    /** ****/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    /** ****/ 		const ns = Object.create(null);
    /** ****/ 		__webpack_require__.r(ns);
    /** ****/ 		Object.defineProperty(ns, 'default', {enumerable: true, value: value});
    /** ****/ 		if (mode & 2 && typeof value != 'string') {
      for (const key in value) {
        __webpack_require__.d(ns, key, function(key) {
          return value[key];
        }.bind(null, key));
      }
    }
    /** ****/ 		return ns;
    /** ****/};
  /** ****/
  /** ****/ 	// getDefaultExport function for compatibility with non-harmony modules
  /** ****/ 	__webpack_require__.n = function(module) {
    /** ****/ 		const getter = module && module.__esModule ?
/** ****/ 			function getDefault() {
    return module['default'];
  } :
/** ****/ 			function getModuleExports() {
    return module;
  };
    /** ****/ 		__webpack_require__.d(getter, 'a', getter);
    /** ****/ 		return getter;
    /** ****/};
  /** ****/
  /** ****/ 	// Object.prototype.hasOwnProperty.call
  /** ****/ 	__webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /** ****/
  /** ****/ 	// __webpack_public_path__
  /** ****/ 	__webpack_require__.p = '';
  /** ****/
  /** ****/ 	// __webpack_hash__
  /** ****/ 	__webpack_require__.h = function() {
    return hotCurrentHash;
  };
  /** ****/
  /** ****/
  /** ****/ 	// Load entry module and return exports
  /** ****/ 	return hotCreateRequire('./demo/index.js')(__webpack_require__.s = './demo/index.js');
/** ****/ })
/** **********************************************************************/
/** ****/ ({

  /** */ './demo/index.js':
  /* !***********************!*\
  !*** ./demo/index.js ***!
  \***********************/
  /* ! no exports provided */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! ../src */ './src/index.js');
    /* harmony import */ const prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! prismjs */ './node_modules/prismjs/prism.js');
    /* harmony import */ const prismjs__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);


    window.prettify = function(selector, type, highlight) {
      const el = document.querySelector(selector);
      const html = type === 'html' ? el.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>') : el.innerHTML;
      const prettyOne = prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.highlight(html, prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.languages[type], type);
      el.innerHTML = prettyOne.replace(highlight, function(_) {
        return '<b>'.concat(_, '</b>');
      });
    };

    window.showCode = function(htmlId, jsId, cssId, highlight) {
      const el = document.createElement('div');
      el.insertAdjacentHTML('beforeend', '\n    <hce-tabs class="code">\n      <div class="tabs">\n        <i tab-for="html">html</i>\n        <i tab-for="js">js</i>\n        <i tab-for="css">css</i>\n      </div>\n      <div class="contents" style="background:#f8f8f8"> \n        <div contents-for="html"><pre></pre></div>\n        <div contents-for="js"><pre></pre></div>\n        <div contents-for="css"><pre></pre></div>\n      </div>\n    </hce-tabs>');
      document.currentScript.insertAdjacentElement('afterend', el);

      function fillCode(id, type) {
        let srcEl; let dstEl; let html;

        if (id) {
          srcEl = document.getElementById(id);
          dstEl = el.querySelector('[contents-for='.concat(type, '] pre'));
          const lang = type === 'js' ? 'javascript' : type;
          html = prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.highlight(srcEl.innerHTML.replace(/^\n(\s+)/, '$1'), prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.languages[lang], lang);
          html = html.replace(/hce-[\w-]+/g, function($0) {
            return '<b>'.concat($0, '</b>');
          });
          highlight && (html = html.replace(highlight, function($0) {
            return '<b>'.concat($0, '</b>');
          }));
          dstEl.innerHTML = html;
        } else {
          el.querySelector('[tab-for='.concat(type, ']')).remove();
          el.querySelector('[contents-for='.concat(type, ']')).remove();
        }
      }

      fillCode(htmlId, 'html');
      fillCode(jsId, 'js');
      fillCode(cssId, 'css');
    };

    window.highlight = function() {
      const lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'javascript';
      const codeEl = document.currentScript.previousElementSibling;
      const html = prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.highlight(codeEl.innerHTML, prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.languages[lang], lang);
      codeEl.innerHTML = html;
    };
    /** */}),

  /** */ './node_modules/html-custom-element/dist/html-custom-element.umd.js':
  /* !**************************************************************************!*\
  !*** ./node_modules/html-custom-element/dist/html-custom-element.umd.js ***!
  \**************************************************************************/
  /* ! no static exports found */
  /** */ (function(module, exports, __webpack_require__) {
    !function(t, e) {
 true?module.exports=e():undefined;
    }(window, function() {
      return function(n) {
        const r={}; function o(t) {
          if (r[t]) return r[t].exports; const e=r[t]={i: t, l: !1, exports: {}}; return n[t].call(e.exports, e, e.exports, o), e.l=!0, e.exports;
        } return o.m=n, o.c=r, o.d=function(t, e, n) {
          o.o(t, e)||Object.defineProperty(t, e, {enumerable: !0, get: n});
        }, o.r=function(t) {
          'undefined'!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t, Symbol.toStringTag, {value: 'Module'}), Object.defineProperty(t, '__esModule', {value: !0});
        }, o.t=function(e, t) {
          if (1&t&&(e=o(e)), 8&t) return e; if (4&t&&'object'==typeof e&&e&&e.__esModule) return e; const n=Object.create(null); if (o.r(n), Object.defineProperty(n, 'default', {enumerable: !0, value: e}), 2&t&&'string'!=typeof e) {
            for (const r in e) {
              o.d(n, r, function(t) {
                return e[t];
              }.bind(null, r));
            }
          } return n;
        }, o.n=function(t) {
          const e=t&&t.__esModule?function() {
            return t.default;
          }:function() {
            return t;
          }; return o.d(e, 'a', e), e;
        }, o.o=function(t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        }, o.p='', o(o.s=41);
      }([function(t, e, n) {
        const v=n(3); const m=n(8); const y=n(10); const b=n(29); const g=n(25); const E='prototype'; var T=function(t, e, n) {
          let r; let o; let i; let u; const a=t&T.F; const c=t&T.G; const l=t&T.S; const s=t&T.P; const f=t&T.B; const p=c?v:l?v[e]||(v[e]={}):(v[e]||{})[E]; const h=c?m:m[e]||(m[e]={}); const d=h[E]||(h[E]={}); for (r in c&&(n=e), n)i=((o=!a&&p&&void 0!==p[r])?p:n)[r], u=f&&o?g(i, v):s&&'function'==typeof i?g(Function.call, i):i, p&&b(p, r, i, t&T.U), h[r]!=i&&y(h, r, u), s&&d[r]!=i&&(d[r]=i);
        }; v.core=m, T.F=1, T.G=2, T.S=4, T.P=8, T.B=16, T.W=32, T.U=64, T.R=128, t.exports=T;
      }, function(t, e, n) {
        'use strict'; const r=n(5); t.exports=function(t, e) {
          return !!t&&r(function() {
e?t.call(null, function() {}, 1):t.call(null);
          });
        };
      }, function(t, e, n) {
        const r=n(32)('wks'); const o=n(24); const i=n(3).Symbol; const u='function'==typeof i; (t.exports=function(t) {
          return r[t]||(r[t]=u&&i[t]||(u?i:o)('Symbol.'+t));
        }).store=r;
      }, function(t, e) {
        const n=t.exports='undefined'!=typeof window&&window.Math==Math?window:'undefined'!=typeof self&&self.Math==Math?self:Function('return this')(); 'number'==typeof __g&&(__g=n);
      }, function(t, e, n) {
        const r=n(20); const o=Math.min; t.exports=function(t) {
          return 0<t?o(r(t), 9007199254740991):0;
        };
      }, function(t, e) {
        t.exports=function(t) {
          try {
            return !!t();
          } catch (t) {
            return !0;
          }
        };
      }, function(t, e, n) {
        const r=n(26); t.exports=function(t) {
          return Object(r(t));
        };
      }, function(t, e, n) {
        const g=n(25); const E=n(18); const T=n(6); const M=n(4); const r=n(68); t.exports=function(f, t) {
          const p=1==f; const h=2==f; const d=3==f; const v=4==f; const m=6==f; const y=5==f||m; const b=t||r; return function(t, e, n) {
            for (var r, o, i=T(t), u=E(i), a=g(e, n, 3), c=M(u.length), l=0, s=p?b(t, c):h?b(t, 0):void 0; l<c; l++) {
              if ((y||l in u)&&(o=a(r=u[l], l, i), f)) {
                if (p)s[l]=o; else if (o) {
                  switch (f) {
                    case 3: return !0; case 5: return r; case 6: return l; case 2: s.push(r);
                  }
                } else if (v) return !1;
              }
            } return m?-1:d||v?v:s;
          };
        };
      }, function(t, e) {
        const n=t.exports={version: '2.6.3'}; 'number'==typeof __e&&(__e=n);
      }, function(t, e) {
        t.exports=function(t) {
          return 'object'==typeof t?null!==t:'function'==typeof t;
        };
      }, function(t, e, n) {
        const r=n(11); const o=n(23); t.exports=n(13)?function(t, e, n) {
          return r.f(t, e, o(1, n));
        }:function(t, e, n) {
          return t[e]=n, t;
        };
      }, function(t, e, n) {
        const r=n(12); const o=n(44); const i=n(45); const u=Object.defineProperty; e.f=n(13)?Object.defineProperty:function(t, e, n) {
          if (r(t), e=i(e, !0), r(n), o) {
            try {
              return u(t, e, n);
            } catch (t) {}
          } if ('get'in n||'set'in n) throw TypeError('Accessors not supported!'); return 'value'in n&&(t[e]=n.value), t;
        };
      }, function(t, e, n) {
        const r=n(9); t.exports=function(t) {
          if (!r(t)) throw TypeError(t+' is not an object!'); return t;
        };
      }, function(t, e, n) {
        t.exports=!n(5)(function() {
          return 7!=Object.defineProperty({}, 'a', {get: function() {
            return 7;
          }}).a;
        });
      }, function(t, e) {
        t.exports=function(t) {
          if ('function'!=typeof t) throw TypeError(t+' is not a function!'); return t;
        };
      }, function(t, e, n) {
        const r=n(18); const o=n(26); t.exports=function(t) {
          return r(o(t));
        };
      }, function(t, e, n) {
        const r=n(2)('unscopables'); const o=Array.prototype; null==o[r]&&n(10)(o, r, {}), t.exports=function(t) {
          o[r][t]=!0;
        };
      }, function(t, e) {
        const n={}.hasOwnProperty; t.exports=function(t, e) {
          return n.call(t, e);
        };
      }, function(t, e, n) {
        const r=n(19); t.exports=Object('z').propertyIsEnumerable(0)?Object:function(t) {
          return 'String'==r(t)?t.split(''):Object(t);
        };
      }, function(t, e) {
        const n={}.toString; t.exports=function(t) {
          return n.call(t).slice(8, -1);
        };
      }, function(t, e) {
        const n=Math.ceil; const r=Math.floor; t.exports=function(t) {
          return isNaN(t=+t)?0:(0<t?r:n)(t);
        };
      }, function(t, e, n) {
        const r=n(20); const o=Math.max; const i=Math.min; t.exports=function(t, e) {
          return (t=r(t))<0?o(t+e, 0):i(t, e);
        };
      }, function(t, e) {
        t.exports={};
      }, function(t, e) {
        t.exports=function(t, e) {
          return {enumerable: !(1&t), configurable: !(2&t), writable: !(4&t), value: e};
        };
      }, function(t, e) {
        let n=0; const r=Math.random(); t.exports=function(t) {
          return 'Symbol('.concat(void 0===t?'':t, ')_', (++n+r).toString(36));
        };
      }, function(t, e, n) {
        const i=n(14); t.exports=function(r, o, t) {
          if (i(r), void 0===o) return r; switch (t) {
            case 1: return function(t) {
              return r.call(o, t);
            }; case 2: return function(t, e) {
              return r.call(o, t, e);
            }; case 3: return function(t, e, n) {
              return r.call(o, t, e, n);
            };
          } return function() {
            return r.apply(o, arguments);
          };
        };
      }, function(t, e) {
        t.exports=function(t) {
          if (null==t) throw TypeError('Can\'t call method on  '+t); return t;
        };
      }, function(t, e, n) {
        const r=n(32)('keys'); const o=n(24); t.exports=function(t) {
          return r[t]||(r[t]=o(t));
        };
      }, function(t, e, n) {
        const r=n(9); const o=n(3).document; const i=r(o)&&r(o.createElement); t.exports=function(t) {
          return i?o.createElement(t):{};
        };
      }, function(t, e, n) {
        const i=n(3); const u=n(10); const a=n(17); const c=n(24)('src'); const r='toString'; const o=Function[r]; const l=(''+o).split(r); n(8).inspectSource=function(t) {
          return o.call(t);
        }, (t.exports=function(t, e, n, r) {
          const o='function'==typeof n; o&&(a(n, 'name')||u(n, 'name', e)), t[e]!==n&&(o&&(a(n, c)||u(n, c, t[e]?''+t[e]:l.join(String(e)))), t===i?t[e]=n:r?t[e]?t[e]=n:u(t, e, n):(delete t[e], u(t, e, n)));
        })(Function.prototype, r, function() {
          return 'function'==typeof this&&this[c]||o.call(this);
        });
      }, function(t, e, r) {
        const o=r(12); const i=r(46); const u=r(34); const a=r(27)('IE_PROTO'); const c=function() {}; const l='prototype'; var s=function() {
          let t; const e=r(28)('iframe'); let n=u.length; for (e.style.display='none', r(35).appendChild(e), e.src='javascript:', (t=e.contentWindow.document).open(), t.write('<script>document.F=Object<\/script>'), t.close(), s=t.F; n--;) delete s[l][u[n]]; return s();
        }; t.exports=Object.create||function(t, e) {
          let n; return null!==t?(c[l]=o(t), n=new c, c[l]=null, n[a]=t):n=s(), void 0===e?n:i(n, e);
        };
      }, function(t, e, n) {
        const c=n(15); const l=n(4); const s=n(21); t.exports=function(a) {
          return function(t, e, n) {
            let r; const o=c(t); const i=l(o.length); let u=s(n, i); if (a&&e!=e) {
              for (;u<i;) if ((r=o[u++])!=r) return !0;
            } else for (;u<i; u++) if ((a||u in o)&&o[u]===e) return a||u||0; return !a&&-1;
          };
        };
      }, function(t, e, n) {
        const r=n(8); const o=n(3); const i='__core-js_shared__'; const u=o[i]||(o[i]={}); (t.exports=function(t, e) {
          return u[t]||(u[t]=void 0!==e?e:{});
        })('versions', []).push({version: r.version, mode: n(33)?'pure':'global', copyright: '© 2019 Denis Pushkarev (zloirock.ru)'});
      }, function(t, e) {
        t.exports=!1;
      }, function(t, e) {
        t.exports='constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
      }, function(t, e, n) {
        const r=n(3).document; t.exports=r&&r.documentElement;
      }, function(t, e, n) {
        'use strict'; const g=n(33); const E=n(0); const T=n(29); const M=n(10); const L=n(22); const H=n(54); const w=n(37); const _=n(55); const x=n(2)('iterator'); const A=!([].keys&&'next'in[].keys()); const O='values'; const C=function() {
          return this;
        }; t.exports=function(t, e, n, r, o, i, u) {
          H(n, e, r); let a; let c; let l; const s=function(t) {
            if (!A&&t in d) return d[t]; switch (t) {
              case 'keys': case O: return function() {
                return new n(this, t);
              };
            } return function() {
              return new n(this, t);
            };
          }; const f=e+' Iterator'; const p=o==O; let h=!1; var d=t.prototype; const v=d[x]||d['@@iterator']||o&&d[o]; let m=v||s(o); const y=o?p?s('entries'):m:void 0; const b='Array'==e&&d.entries||v; if (b&&(l=_(b.call(new t)))!==Object.prototype&&l.next&&(w(l, f, !0), g||'function'==typeof l[x]||M(l, x, C)), p&&v&&v.name!==O&&(h=!0, m=function() {
            return v.call(this);
          }), g&&!u||!A&&!h&&d[x]||M(d, x, m), L[e]=m, L[f]=C, o) if (a={values: p?m:s(O), keys: i?m:s('keys'), entries: y}, u) for (c in a)c in d||T(d, c, a[c]); else E(E.P+E.F*(A||h), e, a); return a;
        };
      }, function(t, e, n) {
        const r=n(11).f; const o=n(17); const i=n(2)('toStringTag'); t.exports=function(t, e, n) {
          t&&!o(t=n?t:t.prototype, i)&&r(t, i, {configurable: !0, value: e});
        };
      }, function(t, e, n) {
        const r=n(19); t.exports=Array.isArray||function(t) {
          return 'Array'==r(t);
        };
      }, function(t, e, n) {
        'use strict'; const r=n(11); const o=n(23); t.exports=function(t, e, n) {
e in t?r.f(t, e, o(0, n)):t[e]=n;
        };
      }, function(t, e, n) {
        const s=n(14); const f=n(6); const p=n(18); const h=n(4); t.exports=function(t, e, n, r, o) {
          s(e); const i=f(t); const u=p(i); const a=h(i.length); let c=o?a-1:0; const l=o?-1:1; if (n<2) {
            for (;;) {
              if (c in u) {
                r=u[c], c+=l; break;
              } if (c+=l, o?c<0:a<=c) throw TypeError('Reduce of empty array with no initial value');
            }
          } for (;o?0<=c:c<a; c+=l)c in u&&(r=e(r, u[c], c, i)); return r;
        };
      }, function(t, e, n) {
        n(42), n(51), t.exports=n(88);
      }, function(t, e, n) {
        n(43), t.exports=n(8).Reflect.construct;
      }, function(t, e, n) {
        const r=n(0); const a=n(30); const c=n(14); const l=n(12); const s=n(9); const o=n(5); const f=n(49); const p=(n(3).Reflect||{}).construct; const h=o(function() {
          function t() {} return !(p(function() {}, [], t)instanceof t);
        }); const d=!o(function() {
          p(function() {});
        }); r(r.S+r.F*(h||d), 'Reflect', {construct: function(t, e) {
          c(t), l(e); const n=arguments.length<3?t:c(arguments[2]); if (d&&!h) return p(t, e, n); if (t==n) {
            switch (e.length) {
              case 0: return new t; case 1: return new t(e[0]); case 2: return new t(e[0], e[1]); case 3: return new t(e[0], e[1], e[2]); case 4: return new t(e[0], e[1], e[2], e[3]);
            } const r=[null]; return r.push.apply(r, e), new(f.apply(t, r));
          } const o=n.prototype; const i=a(s(o)?o:Object.prototype); const u=Function.apply.call(t, i, e); return s(u)?u:i;
        }});
      }, function(t, e, n) {
        t.exports=!n(13)&&!n(5)(function() {
          return 7!=Object.defineProperty(n(28)('div'), 'a', {get: function() {
            return 7;
          }}).a;
        });
      }, function(t, e, n) {
        const o=n(9); t.exports=function(t, e) {
          if (!o(t)) return t; let n; let r; if (e&&'function'==typeof(n=t.toString)&&!o(r=n.call(t))) return r; if ('function'==typeof(n=t.valueOf)&&!o(r=n.call(t))) return r; if (!e&&'function'==typeof(n=t.toString)&&!o(r=n.call(t))) return r; throw TypeError('Can\'t convert object to primitive value');
        };
      }, function(t, e, n) {
        const u=n(11); const a=n(12); const c=n(47); t.exports=n(13)?Object.defineProperties:function(t, e) {
          a(t); for (var n, r=c(e), o=r.length, i=0; i<o;)u.f(t, n=r[i++], e[n]); return t;
        };
      }, function(t, e, n) {
        const r=n(48); const o=n(34); t.exports=Object.keys||function(t) {
          return r(t, o);
        };
      }, function(t, e, n) {
        const u=n(17); const a=n(15); const c=n(31)(!1); const l=n(27)('IE_PROTO'); t.exports=function(t, e) {
          let n; const r=a(t); let o=0; const i=[]; for (n in r)n!=l&&u(r, n)&&i.push(n); for (;e.length>o;)u(r, n=e[o++])&&(~c(i, n)||i.push(n)); return i;
        };
      }, function(t, e, n) {
        'use strict'; const i=n(14); const u=n(9); const a=n(50); const c=[].slice; const l={}; t.exports=Function.bind||function(e) {
          const n=i(this); const r=c.call(arguments, 1); var o=function() {
            const t=r.concat(c.call(arguments)); return this instanceof o?function(t, e, n) {
              if (!(e in l)) {
                for (var r=[], o=0; o<e; o++)r[o]='a['+o+']'; l[e]=Function('F,a', 'return new F('+r.join(',')+')');
              } return l[e](t, n);
            }(n, t.length, t):a(n, t, e);
          }; return u(n.prototype)&&(o.prototype=n.prototype), o;
        };
      }, function(t, e) {
        t.exports=function(t, e, n) {
          const r=void 0===n; switch (e.length) {
            case 0: return r?t():t.call(n); case 1: return r?t(e[0]):t.call(n, e[0]); case 2: return r?t(e[0], e[1]):t.call(n, e[0], e[1]); case 3: return r?t(e[0], e[1], e[2]):t.call(n, e[0], e[1], e[2]); case 4: return r?t(e[0], e[1], e[2], e[3]):t.call(n, e[0], e[1], e[2], e[3]);
          } return t.apply(n, e);
        };
      }, function(t, e, n) {
        n(52), n(56), n(57), n(63), n(64), n(65), n(66), n(67), n(70), n(71), n(72), n(73), n(74), n(75), n(76), n(77), n(78), n(80), n(82), n(83), n(84), n(86), t.exports=n(8).Array;
      }, function(t, e, n) {
        'use strict'; const r=n(53)(!0); n(36)(String, 'String', function(t) {
          this._t=String(t), this._i=0;
        }, function() {
          let t; const e=this._t; const n=this._i; return n>=e.length?{value: void 0, done: !0}:(t=r(e, n), this._i+=t.length, {value: t, done: !1});
        });
      }, function(t, e, n) {
        const c=n(20); const l=n(26); t.exports=function(a) {
          return function(t, e) {
            let n; let r; const o=String(l(t)); const i=c(e); const u=o.length; return i<0||u<=i?a?'':void 0:(n=o.charCodeAt(i))<55296||56319<n||i+1===u||(r=o.charCodeAt(i+1))<56320||57343<r?a?o.charAt(i):n:a?o.slice(i, i+2):r-56320+(n-55296<<10)+65536;
          };
        };
      }, function(t, e, n) {
        'use strict'; const r=n(30); const o=n(23); const i=n(37); const u={}; n(10)(u, n(2)('iterator'), function() {
          return this;
        }), t.exports=function(t, e, n) {
          t.prototype=r(u, {next: o(1, n)}), i(t, e+' Iterator');
        };
      }, function(t, e, n) {
        const r=n(17); const o=n(6); const i=n(27)('IE_PROTO'); const u=Object.prototype; t.exports=Object.getPrototypeOf||function(t) {
          return t=o(t), r(t, i)?t[i]:'function'==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null;
        };
      }, function(t, e, n) {
        const r=n(0); r(r.S, 'Array', {isArray: n(38)});
      }, function(t, e, n) {
        'use strict'; const p=n(25); const r=n(0); const h=n(6); const d=n(58); const v=n(59); const m=n(4); const y=n(39); const b=n(60); r(r.S+r.F*!n(62)(function(t) {
          Array.from(t);
        }), 'Array', {from: function(t) {
          let e; let n; let r; let o; const i=h(t); const u='function'==typeof this?this:Array; const a=arguments.length; let c=1<a?arguments[1]:void 0; const l=void 0!==c; let s=0; const f=b(i); if (l&&(c=p(c, 2<a?arguments[2]:void 0, 2)), null==f||u==Array&&v(f)) for (n=new u(e=m(i.length)); s<e; s++)y(n, s, l?c(i[s], s):i[s]); else for (o=f.call(i), n=new u; !(r=o.next()).done; s++)y(n, s, l?d(o, c, [r.value, s], !0):r.value); return n.length=s, n;
        }});
      }, function(t, e, n) {
        const i=n(12); t.exports=function(e, t, n, r) {
          try {
            return r?t(i(n)[0], n[1]):t(n);
          } catch (t) {
            const o=e.return; throw void 0!==o&&i(o.call(e)), t;
          }
        };
      }, function(t, e, n) {
        const r=n(22); const o=n(2)('iterator'); const i=Array.prototype; t.exports=function(t) {
          return void 0!==t&&(r.Array===t||i[o]===t);
        };
      }, function(t, e, n) {
        const r=n(61); const o=n(2)('iterator'); const i=n(22); t.exports=n(8).getIteratorMethod=function(t) {
          if (null!=t) return t[o]||t['@@iterator']||i[r(t)];
        };
      }, function(t, e, n) {
        const o=n(19); const i=n(2)('toStringTag'); const u='Arguments'==o(function() {
          return arguments;
        }()); t.exports=function(t) {
          let e; let n; let r; return void 0===t?'Undefined':null===t?'Null':'string'==typeof(n=function(t, e) {
            try {
              return t[e];
            } catch (t) {}
          }(e=Object(t), i))?n:u?o(e):'Object'==(r=o(e))&&'function'==typeof e.callee?'Arguments':r;
        };
      }, function(t, e, n) {
        const i=n(2)('iterator'); let u=!1; try {
          const r=[7][i](); r.return=function() {
            u=!0;
          }, Array.from(r, function() {
            throw 2;
          });
        } catch (t) {}t.exports=function(t, e) {
          if (!e&&!u) return !1; let n=!1; try {
            const r=[7]; const o=r[i](); o.next=function() {
              return {done: n=!0};
            }, r[i]=function() {
              return o;
            }, t(r);
          } catch (t) {} return n;
        };
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(39); r(r.S+r.F*n(5)(function() {
          function t() {} return !(Array.of.call(t)instanceof t);
        }), 'Array', {of: function() {
          for (var t=0, e=arguments.length, n=new('function'==typeof this?this:Array)(e); t<e;)o(n, t, arguments[t++]); return n.length=e, n;
        }});
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(15); const i=[].join; r(r.P+r.F*(n(18)!=Object||!n(1)(i)), 'Array', {join: function(t) {
          return i.call(o(this), void 0===t?',':t);
        }});
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(35); const l=n(19); const s=n(21); const f=n(4); const p=[].slice; r(r.P+r.F*n(5)(function() {
          o&&p.call(o);
        }), 'Array', {slice: function(t, e) {
          const n=f(this.length); const r=l(this); if (e=void 0===e?n:e, 'Array'==r) return p.call(this, t, e); for (var o=s(t, n), i=s(e, n), u=f(i-o), a=new Array(u), c=0; c<u; c++)a[c]='String'==r?this.charAt(o+c):this[o+c]; return a;
        }});
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(14); const i=n(6); const u=n(5); const a=[].sort; const c=[1, 2, 3]; r(r.P+r.F*(u(function() {
          c.sort(void 0);
        })||!u(function() {
          c.sort(null);
        })||!n(1)(a)), 'Array', {sort: function(t) {
          return void 0===t?a.call(i(this)):a.call(i(this), o(t));
        }});
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(7)(0); const i=n(1)([].forEach, !0); r(r.P+r.F*!i, 'Array', {forEach: function(t) {
          return o(this, t, arguments[1]);
        }});
      }, function(t, e, n) {
        const r=n(69); t.exports=function(t, e) {
          return new(r(t))(e);
        };
      }, function(t, e, n) {
        const r=n(9); const o=n(38); const i=n(2)('species'); t.exports=function(t) {
          let e; return o(t)&&('function'!=typeof(e=t.constructor)||e!==Array&&!o(e.prototype)||(e=void 0), r(e)&&null===(e=e[i])&&(e=void 0)), void 0===e?Array:e;
        };
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(7)(1); r(r.P+r.F*!n(1)([].map, !0), 'Array', {map: function(t) {
          return o(this, t, arguments[1]);
        }});
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(7)(2); r(r.P+r.F*!n(1)([].filter, !0), 'Array', {filter: function(t) {
          return o(this, t, arguments[1]);
        }});
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(7)(3); r(r.P+r.F*!n(1)([].some, !0), 'Array', {some: function(t) {
          return o(this, t, arguments[1]);
        }});
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(7)(4); r(r.P+r.F*!n(1)([].every, !0), 'Array', {every: function(t) {
          return o(this, t, arguments[1]);
        }});
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(40); r(r.P+r.F*!n(1)([].reduce, !0), 'Array', {reduce: function(t) {
          return o(this, t, arguments.length, arguments[1], !1);
        }});
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(40); r(r.P+r.F*!n(1)([].reduceRight, !0), 'Array', {reduceRight: function(t) {
          return o(this, t, arguments.length, arguments[1], !0);
        }});
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(31)(!1); const i=[].indexOf; const u=!!i&&1/[1].indexOf(1, -0)<0; r(r.P+r.F*(u||!n(1)(i)), 'Array', {indexOf: function(t) {
          return u?i.apply(this, arguments)||0:o(this, t, arguments[1]);
        }});
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(15); const i=n(20); const u=n(4); const a=[].lastIndexOf; const c=!!a&&1/[1].lastIndexOf(1, -0)<0; r(r.P+r.F*(c||!n(1)(a)), 'Array', {lastIndexOf: function(t) {
          if (c) return a.apply(this, arguments)||0; const e=o(this); const n=u(e.length); let r=n-1; for (1<arguments.length&&(r=Math.min(r, i(arguments[1]))), r<0&&(r=n+r); 0<=r; r--) if (r in e&&e[r]===t) return r||0; return -1;
        }});
      }, function(t, e, n) {
        const r=n(0); r(r.P, 'Array', {copyWithin: n(79)}), n(16)('copyWithin');
      }, function(t, e, n) {
        'use strict'; const l=n(6); const s=n(21); const f=n(4); t.exports=[].copyWithin||function(t, e) {
          const n=l(this); const r=f(n.length); let o=s(t, r); let i=s(e, r); const u=2<arguments.length?arguments[2]:void 0; let a=Math.min((void 0===u?r:s(u, r))-i, r-o); let c=1; for (i<o&&o<i+a&&(c=-1, i+=a-1, o+=a-1); 0<a--;)i in n?n[o]=n[i]:delete n[o], o+=c, i+=c; return n;
        };
      }, function(t, e, n) {
        const r=n(0); r(r.P, 'Array', {fill: n(81)}), n(16)('fill');
      }, function(t, e, n) {
        'use strict'; const a=n(6); const c=n(21); const l=n(4); t.exports=function(t) {
          for (var e=a(this), n=l(e.length), r=arguments.length, o=c(1<r?arguments[1]:void 0, n), i=2<r?arguments[2]:void 0, u=void 0===i?n:c(i, n); o<u;)e[o++]=t; return e;
        };
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(7)(5); const i='find'; let u=!0; i in[]&&Array(1)[i](function() {
          u=!1;
        }), r(r.P+r.F*u, 'Array', {find: function(t) {
          return o(this, t, 1<arguments.length?arguments[1]:void 0);
        }}), n(16)(i);
      }, function(t, e, n) {
        'use strict'; const r=n(0); const o=n(7)(6); const i='findIndex'; let u=!0; i in[]&&Array(1)[i](function() {
          u=!1;
        }), r(r.P+r.F*u, 'Array', {findIndex: function(t) {
          return o(this, t, 1<arguments.length?arguments[1]:void 0);
        }}), n(16)(i);
      }, function(t, e, n) {
        n(85)('Array');
      }, function(t, e, n) {
        'use strict'; const r=n(3); const o=n(11); const i=n(13); const u=n(2)('species'); t.exports=function(t) {
          const e=r[t]; i&&e&&!e[u]&&o.f(e, u, {configurable: !0, get: function() {
            return this;
          }});
        };
      }, function(t, e, n) {
        'use strict'; const r=n(16); const o=n(87); const i=n(22); const u=n(15); t.exports=n(36)(Array, 'Array', function(t, e) {
          this._t=u(t), this._i=0, this._k=e;
        }, function() {
          const t=this._t; const e=this._k; const n=this._i++; return !t||n>=t.length?(this._t=void 0, o(1)):o(0, 'keys'==e?n:'values'==e?t[n]:[n, t[n]]);
        }, 'values'), i.Arguments=i.Array, r('keys'), r('values'), r('entries');
      }, function(t, e) {
        t.exports=function(t, e) {
          return {value: e, done: !!t};
        };
      }, function(t, e, n) {
        'use strict'; Object.defineProperty(e, '__esModule', {value: !0}); const r=n(89); Object.defineProperty(e, 'HTMLCustomElement', {enumerable: !0, get: function() {
          return r.HTMLCustomElement;
        }}); const o=n(92); Object.defineProperty(e, 'createCustomEvent', {enumerable: !0, get: function() {
          return o.createCustomEvent;
        }}), Element.prototype.closest||(Element.prototype.closest=function(t) {
          let e=this; do {
            if (e.matches(t)) return e; e=e.parentElement||e.parentNode;
          } while (null!==e&&1===e.nodeType);return null;
        });
      }, function(t, e, n) {
        'use strict'; Object.defineProperty(e, '__esModule', {value: !0}), e.HTMLCustomElement=void 0; const r=function() {
          function r(t, e) {
            for (let n=0; n<e.length; n++) {
              const r=e[n]; r.enumerable=r.enumerable||!1, r.configurable=!0, 'value'in r&&(r.writable=!0), Object.defineProperty(t, r.key, r);
            }
          } return function(t, e, n) {
            return e&&r(t.prototype, e), n&&r(t, n), t;
          };
        }(); const c=function(t, e) {
          if (Array.isArray(t)) return t; if (Symbol.iterator in Object(t)) {
            return function(t, e) {
              const n=[]; let r=!0; let o=!1; let i=void 0; try {
                for (var u, a=t[Symbol.iterator](); !(r=(u=a.next()).done)&&(n.push(u.value), !e||n.length!==e); r=!0);
              } catch (t) {
                o=!0, i=t;
              } finally {
                try {
                  !r&&a.return&&a.return();
                } finally {
                  if (o) throw i;
                }
              } return n;
            }(t, e);
          } throw new TypeError('Invalid attempt to destructure non-iterable instance');
        }; e.setStyleEl=s, e.getPropsFromAttributes=f, e.bindEvent=p, e.bindExpression=h, n(90); const l=n(91); function o() {
          return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
        } function s(t) {
          const e=function(t) {
            for (var e=0, n=0, r=t.length; n<r; n++)e=(e<<5)-e+t.charCodeAt(n), e&=e; return 'hce'+Math.abs(e).toString(16);
          }(t=t.replace(/,\s*?[\r\n]\s*?/gm, ', ')); const n=t.replace(/\s?([^@][\:\>\*\~\[\]\-\(\)a-z\.\, ])+\{/gm, function(t) {
            return '\n'+t.split(/,\s*/).map(function(t) {
              return ('.'+e+' '+t).replace(/\s*:root/g, '');
            }).join(', ');
          }); let r=document.querySelector('style#'+e); return r?r.numEl++:((r=document.createElement('style')).appendChild(document.createTextNode(n)), r.setAttribute('id', e), r.numEl=1, document.head.appendChild(r)), r;
        } function f(t) {
          const r=/^(on.*|aria-.*|data-.*|class|dir|hidden|id|is|lang|style|tabindex|title)$/; const o={}; const e=t.closest('.hce'); return e&&e.hcePropKeys.forEach(function(t) {
            return o[t]=e[t];
          }), Array.from(t.attributes).forEach(function(e) {
            if (!e.name.match(r)) {
              const n=e.name.match(/^\(.*\)$/)?e.name:e.name.replace(/-([a-z])/gi, function(t) {
                return t[1].toUpperCase();
              }); if (!t[n]) {
                try {
                  o[n]=JSON.parse(e.value);
                } catch (t) {
                  o[n]=e.value;
                }
              }
            }
          }), o;
        } function p(t, e, n) {
          e=e.replace(/[\(\)]/g, ''); const r=n.match(/^(\w+)(\(*.*?\))?$/); const o=c(r, 3); const i=(o[0], o[1]); let u=[]; u=((o[2]||'').replace(/[()]/g, '')||'event').split(',').map(function(t) {
            const e=t.trim(); return 'event'===e?'event':e.match(/^[\-\.0-9]/)?e:e.match(/^(true|false)$/)?e:e.match(/^['"].*['"]$/)?e:'this.'+e;
          }); const a=new Function('event', 'return '+i+'('+u.join(',')+')'); t.addEventListener(e, a.bind(t));
        } function h(t, e, n) {
          e=e.replace(/[\[\]]/g, ''); const r=new Function('return '+n+';'); try {
            t[e]=r();
          } catch (t) {
            console.error(t), console.log('Invalid expression, "'+n+'" '+t.message);
          }
        }Object.setPrototypeOf(o.prototype, HTMLElement.prototype), Object.setPrototypeOf(o, HTMLElement); e.HTMLCustomElement=function(t) {
          function e() {
            return function(t, e) {
              if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            }(this, e), function(t, e) {
              if (!t) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called'); return !e||'object'!=typeof e&&'function'!=typeof e?t:e;
            }(this, (e.__proto__||Object.getPrototypeOf(e)).apply(this, arguments));
          } return function(t, e) {
            if ('function'!=typeof e&&null!==e) throw new TypeError('Super expression must either be null or a function, not '+typeof e); t.prototype=Object.create(e&&e.prototype, {constructor: {value: t, enumerable: !1, writable: !0, configurable: !0}}), e&&(Object.setPrototypeOf?Object.setPrototypeOf(t, e):t.__proto__=e);
          }(e, o), r(e, [{key: 'disconnectedCallback', value: function() {
            this.styleEl&&(this.styleEl.numEl--, !this.styleEl.numEl&&this.styleEl.remove());
          }}, {key: 'renderWith', value: function(o, i, u) {
            const a=this; return new Promise(function(r) {
              setTimeout(function(t) {
                const e=f(a); for (const n in a.hcePropKeys=Object.keys(e), e)n.match(/^\[.*\]$/)?h(a, n, e[n]):n.match(/^\(.*\)$/)&&e[n]?p(a, n, e[n]):a[n]=e[n]; o&&(o.indexOf('<hce-content></hce-content>')&&(o=o.replace(/<hce-content><\/hce-content>/, a.innerHTML)), a.binding=new l.OneWayBinding(o), a.innerHTML=a.binding.newHtml, a.binding.setBindingDOMElements(a), a.detectChanges(), (0, l.bindEvents)(a, a.binding.events)), i&&(a.styleEl=s(i), a.classList.add(a.styleEl.id), u&&a.styleEl.appendChild(document.createTextNode(u))), a.classList.add('hce'), r(a);
              });
            });
          }}, {key: 'detectChanges', value: function() {
            (0, l.bindExpressions)(this, this.binding.expressions);
          }}], [{key: 'define', value: function(t, e) {
            !customElements.get(t)&&customElements.define(t, e);
          }}]), e;
        }();
      }, function(t, e) {
      /* ! (C) Andrea Giammarchi - @WebReflection - ISC Style License */
        !function(o, t) {
          'use strict'; function n() {
            const t=w.splice(0, w.length); for (Yt=0; t.length;)t.shift().call(null, t.shift());
          } function c(t, e) {
            for (let n=0, r=t.length; n<r; n++)v(t[n], e);
          } function l(e) {
            return function(t) {
              Rt(t)&&(v(t, e), ct.length&&c(t.querySelectorAll(ct), e));
            };
          } function i(t) {
            const e=qt.call(t, 'is'); const n=t.nodeName.toUpperCase(); const r=st.call(ut, e?rt+e.toUpperCase():nt+n); return e&&-1<r&&!a(n, e)?-1:r;
          } function a(t, e) {
            return -1<ct.indexOf(t+'[is="'+e+'"]');
          } function s(t) {
            const e=t.currentTarget; const n=t.attrChange; const r=t.attrName; const o=t.target; const i=t[Q]||2; const u=t[Y]||3; !ie||o&&o!==e||!e[z]||'style'===r||t.prevValue===t.newValue&&(''!==t.newValue||n!==i&&n!==u)||e[z](r, n===i?null:t.prevValue, n===u?null:t.newValue);
          } function f(t) {
            const e=l(t); return function(t) {
              w.push(e, t.target), Yt&&clearTimeout(Yt), Yt=setTimeout(n, 1);
            };
          } function p(t) {
            oe&&(oe=!1, t.currentTarget.removeEventListener(et, p)), ct.length&&c((t.target||M).querySelectorAll(ct), t.detail===q?q:U), It&&function() {
              for (var t, e=0, n=Vt.length; e<n; e++)t=Vt[e], lt.contains(t)||(n--, Vt.splice(e--, 1), v(t, q));
            }();
          } function r(t, e) {
            Gt.call(this, t, e), _.call(this, {target: this});
          } function h(t, e, n) {
            const r=e.apply(t, n); const o=i(r); return -1<o&&N(r, at[o]), n.pop()&&ct.length&&function(t) {
              for (var e, n=0, r=t.length; n<r; n++)e=t[n], N(e, at[i(e)]);
            }(r.querySelectorAll(ct)), r;
          } function u(t, e) {
            St(t, e), O?O.observe(t, Jt):(re&&(t.setAttribute=r, t[V]=A(t), t[B]('DOMSubtreeModified', _)), t[B](tt, s)), t[X]&&ie&&(t.created=!0, t[X](), t.created=!1);
          } function d(t) {
            throw new Error('A '+t+' type is already registered');
          } function v(t, e) {
            let n; let r; let o=i(t); -1<o&&(P(t, at[o]), o=0, e!==U||t[U]?e!==q||t[q]||(t[U]=!1, t[q]=!0, r='disconnected', o=1):(t[q]=!1, t[U]=!0, r='connected', o=1, It&&st.call(Vt, t)<0&&Vt.push(t)), o&&(n=t[e+$]||t[r+$])&&n.call(t));
          } function m() {} function y(t, e, n) {
            const r=n&&n[W]||''; const o=e.prototype; const i=Nt(o); const u=e.observedAttributes||vt; const a={prototype: i}; Dt(i, X, {value: function() {
              if (xt)xt=!1; else if (!this[Tt]) {
                this[Tt]=!0, new e(this), o[X]&&o[X].call(this); const t=At[Ct.get(e)]; (!Lt||1<t.create.length)&&g(this);
              }
            }}), Dt(i, z, {value: function(t) {
              -1<st.call(u, t)&&o[z]&&o[z].apply(this, arguments);
            }}), o[Z]&&Dt(i, G, {value: o[Z]}), o[K]&&Dt(i, J, {value: o[K]}), r&&(a[W]=r), t=t.toUpperCase(), At[t]={constructor: e, create: r?[r, Pt(t)]:[t]}, Ct.set(e, t), M[R](t.toLowerCase(), a), E(t), Ot[t].r();
          } function e(t) {
            const e=At[t.toUpperCase()]; return e&&e.constructor;
          } function b(t) {
            return 'string'==typeof t?t:t&&t.is||'';
          } function g(t) {
            for (var e, n=t[z], r=n?t.attributes:vt, o=r.length; o--;)e=r[o], n.call(t, e.name||e.nodeName, null, e.value||e.nodeValue);
          } function E(e) {
            return (e=e.toUpperCase())in Ot||(Ot[e]={}, Ot[e].p=new _t(function(t) {
              Ot[e].r=t;
            })), Ot[e].p;
          } function T() {
            Mt&&delete o.customElements, dt(o, 'customElements', {configurable: !0, value: new m}), dt(o, 'CustomElementRegistry', {configurable: !0, value: m}); for (let t=H.get(/^HTML[A-Z]*[a-z]/), e=t.length; e--; function(e) {
              const r=o[e]; if (r) {
                o[e]=function(t) {
                  let e; let n; return t||(t=this), t[Tt]||(xt=!0, e=At[Ct.get(t.constructor)], (t=(n=Lt&&1===e.create.length)?Reflect.construct(r, vt, e.constructor):M.createElement.apply(M, e.create))[Tt]=!0, xt=!1, n||g(t)), t;
                }, o[e].prototype=r.prototype; try {
                  r.prototype.constructor=o[e];
                } catch (t) {
                  !0, dt(r, Tt, {value: o[e]});
                }
              }
            }(t[e]));M.createElement=function(t, e) {
              const n=b(e); return n?Xt.call(this, t, Pt(n)):Xt.call(this, t);
            }, te||(ne=!0, M[R](''));
          } var M=o.document; const L=o.Object; var H=function(t) {
            let e; let n; let r; let o; const i=/^[A-Z]+[a-z]/; const u=function(t, e) {
              (e=e.toLowerCase())in a||(a[t]=(a[t]||[]).concat(e), a[e]=a[e.toUpperCase()]=t);
            }; var a=(L.create||L)(null); const c={}; for (n in t) for (o in t[n]) for (r=t[n][o], a[o]=r, e=0; e<r.length; e++)a[r[e].toLowerCase()]=a[r[e].toUpperCase()]=o; return c.get=function(t) {
              return 'string'==typeof t?a[t]||(i.test(t)?[]:''):function(t) {
                let e; const n=[]; for (e in a)t.test(e)&&n.push(e); return n;
              }(t);
            }, c.set=function(t, e) {
              return i.test(t)?u(t, e):u(e, t), c;
            }, c;
          }({collections: {HTMLAllCollection: ['all'], HTMLCollection: ['forms'], HTMLFormControlsCollection: ['elements'], HTMLOptionsCollection: ['options']}, elements: {Element: ['element'], HTMLAnchorElement: ['a'], HTMLAppletElement: ['applet'], HTMLAreaElement: ['area'], HTMLAttachmentElement: ['attachment'], HTMLAudioElement: ['audio'], HTMLBRElement: ['br'], HTMLBaseElement: ['base'], HTMLBodyElement: ['body'], HTMLButtonElement: ['button'], HTMLCanvasElement: ['canvas'], HTMLContentElement: ['content'], HTMLDListElement: ['dl'], HTMLDataElement: ['data'], HTMLDataListElement: ['datalist'], HTMLDetailsElement: ['details'], HTMLDialogElement: ['dialog'], HTMLDirectoryElement: ['dir'], HTMLDivElement: ['div'], HTMLDocument: ['document'], HTMLElement: ['element', 'abbr', 'address', 'article', 'aside', 'b', 'bdi', 'bdo', 'cite', 'code', 'command', 'dd', 'dfn', 'dt', 'em', 'figcaption', 'figure', 'footer', 'header', 'i', 'kbd', 'mark', 'nav', 'noscript', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'small', 'strong', 'sub', 'summary', 'sup', 'u', 'var', 'wbr'], HTMLEmbedElement: ['embed'], HTMLFieldSetElement: ['fieldset'], HTMLFontElement: ['font'], HTMLFormElement: ['form'], HTMLFrameElement: ['frame'], HTMLFrameSetElement: ['frameset'], HTMLHRElement: ['hr'], HTMLHeadElement: ['head'], HTMLHeadingElement: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], HTMLHtmlElement: ['html'], HTMLIFrameElement: ['iframe'], HTMLImageElement: ['img'], HTMLInputElement: ['input'], HTMLKeygenElement: ['keygen'], HTMLLIElement: ['li'], HTMLLabelElement: ['label'], HTMLLegendElement: ['legend'], HTMLLinkElement: ['link'], HTMLMapElement: ['map'], HTMLMarqueeElement: ['marquee'], HTMLMediaElement: ['media'], HTMLMenuElement: ['menu'], HTMLMenuItemElement: ['menuitem'], HTMLMetaElement: ['meta'], HTMLMeterElement: ['meter'], HTMLModElement: ['del', 'ins'], HTMLOListElement: ['ol'], HTMLObjectElement: ['object'], HTMLOptGroupElement: ['optgroup'], HTMLOptionElement: ['option'], HTMLOutputElement: ['output'], HTMLParagraphElement: ['p'], HTMLParamElement: ['param'], HTMLPictureElement: ['picture'], HTMLPreElement: ['pre'], HTMLProgressElement: ['progress'], HTMLQuoteElement: ['blockquote', 'q', 'quote'], HTMLScriptElement: ['script'], HTMLSelectElement: ['select'], HTMLShadowElement: ['shadow'], HTMLSlotElement: ['slot'], HTMLSourceElement: ['source'], HTMLSpanElement: ['span'], HTMLStyleElement: ['style'], HTMLTableCaptionElement: ['caption'], HTMLTableCellElement: ['td', 'th'], HTMLTableColElement: ['col', 'colgroup'], HTMLTableElement: ['table'], HTMLTableRowElement: ['tr'], HTMLTableSectionElement: ['thead', 'tbody', 'tfoot'], HTMLTemplateElement: ['template'], HTMLTextAreaElement: ['textarea'], HTMLTimeElement: ['time'], HTMLTitleElement: ['title'], HTMLTrackElement: ['track'], HTMLUListElement: ['ul'], HTMLUnknownElement: ['unknown', 'vhgroupv', 'vkeygen'], HTMLVideoElement: ['video']}, nodes: {Attr: ['node'], Audio: ['audio'], CDATASection: ['node'], CharacterData: ['node'], Comment: ['#comment'], Document: ['#document'], DocumentFragment: ['#document-fragment'], DocumentType: ['node'], HTMLDocument: ['#document'], Image: ['img'], Option: ['option'], ProcessingInstruction: ['node'], ShadowRoot: ['#shadow-root'], Text: ['#text'], XMLDocument: ['xml']}}); 'object'!=typeof t&&(t={type: t||'auto'}); let w; let _; let x; let A; let O; let C; let P; let N; let S; let j; let F; let k; let I; let D; var R='registerElement'; var V='__'+R+(1e5*o.Math.random()>>0); var B='addEventListener'; var U='attached'; var $='Callback'; var q='detached'; var W='extends'; var z='attributeChanged'+$; var G=U+$; var Z='connected'+$; var K='disconnected'+$; var X='created'+$; var J=q+$; var Q='ADDITION'; var Y='REMOVAL'; var tt='DOMAttrModified'; var et='DOMContentLoaded'; var nt='<'; var rt='='; const ot=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/; const it=['ANNOTATION-XML', 'COLOR-PROFILE', 'FONT-FACE', 'FONT-FACE-SRC', 'FONT-FACE-URI', 'FONT-FACE-FORMAT', 'FONT-FACE-NAME', 'MISSING-GLYPH']; var ut=[]; var at=[]; var ct=''; var lt=M.documentElement; var st=ut.indexOf||function(t) {
            for (var e=this.length; e--&&this[e]!==t;);return e;
          }; const ft=L.prototype; const pt=ft.hasOwnProperty; const ht=ft.isPrototypeOf; var dt=L.defineProperty; var vt=[]; const mt=L.getOwnPropertyDescriptor; const yt=L.getOwnPropertyNames; const bt=L.getPrototypeOf; const gt=L.setPrototypeOf; const Et=!!L.__proto__; var Tt='__dreCEv1'; var Mt=o.customElements; var Lt=!/^force/.test(t.type)&&!!(Mt&&Mt.define&&Mt.get&&Mt.whenDefined); const Ht=L.create||L; const wt=o.Map||function() {
            let n; const r=[]; const o=[]; return {get: function(t) {
              return o[st.call(r, t)];
            }, set: function(t, e) {
(n=st.call(r, t))<0?o[r.push(t)-1]=e:o[n]=e;
            }};
          }; var _t=o.Promise||function(t) {
            function e(t) {
              for (r=!0; n.length;)n.shift()(t);
            } var n=[]; var r=!1; var o={catch: function() {
              return o;
            }, then: function(t) {
              return n.push(t), r&&setTimeout(e, 1), o;
            }}; return t(e), o;
          }; var xt=!1; var At=Ht(null); var Ot=Ht(null); var Ct=new wt; var Pt=function(t) {
            return t.toLowerCase();
          }; var Nt=L.create||function t(e) {
            return e?(t.prototype=e, new t):this;
          }; var St=gt||(Et?function(t, e) {
            return t.__proto__=e, t;
          }:yt&&mt?function() {
            function n(t, e) {
              for (var n, r=yt(e), o=0, i=r.length; o<i; o++)n=r[o], pt.call(t, n)||dt(t, n, mt(e, n));
            } return function(t, e) {
              for (;n(t, e), (e=bt(e))&&!ht.call(e, t););return t;
            };
          }():function(t, e) {
            for (const n in e)t[n]=e[n]; return t;
          }); const jt=o.MutationObserver||o.WebKitMutationObserver; const Ft=o.HTMLAnchorElement; const kt=(o.HTMLElement||o.Element||o.Node).prototype; var It=!ht.call(kt, lt); var Dt=It?function(t, e, n) {
            return t[e]=n.value, t;
          }:dt; var Rt=It?function(t) {
            return 1===t.nodeType;
          }:function(t) {
            return ht.call(kt, t);
          }; var Vt=It&&[]; const Bt=kt.attachShadow; const Ut=kt.cloneNode; const $t=kt.dispatchEvent; var qt=kt.getAttribute; const Wt=kt.hasAttribute; const zt=kt.removeAttribute; var Gt=kt.setAttribute; const Zt=M.createElement; const Kt=M.importNode; var Xt=Zt; var Jt=jt&&{attributes: !0, characterData: !0, attributeOldValue: !0}; var Qt=jt||function(t) {
            re=!1, lt.removeEventListener(tt, Qt);
          }; var Yt=0; var te=R in M&&!/^force-all/.test(t.type); let ee=!0; var ne=!1; var re=!0; var oe=!0; var ie=!0; if (jt&&((S=M.createElement('div')).innerHTML='<div><div></div></div>', new jt(function(t, e) {
            if (t[0]&&'childList'==t[0].type&&!t[0].removedNodes[0].childNodes.length) {
              const n=(S=mt(kt, 'innerHTML'))&&S.set; n&&dt(kt, 'innerHTML', {set: function(t) {
                for (;this.lastChild;) this.removeChild(this.lastChild); n.call(this, t);
              }});
            }e.disconnect(), S=null;
          }).observe(S, {childList: !0, subtree: !0}), S.innerHTML=''), te||(N=gt||Et?(P=function(t, e) {
            ht.call(e, t)||u(t, e);
          }, u):P=function(t, e) {
            t[V]||(t[V]=L(!0), u(t, e));
          }, It?(re=!1, j=mt(kt, B), F=j.value, k=function(t) {
            const e=new CustomEvent(tt, {bubbles: !0}); e.attrName=t, e.prevValue=qt.call(this, t), e.newValue=null, e[Y]=e.attrChange=2, zt.call(this, t), $t.call(this, e);
          }, I=function(t, e) {
            const n=Wt.call(this, t); const r=n&&qt.call(this, t); const o=new CustomEvent(tt, {bubbles: !0}); Gt.call(this, t, e), o.attrName=t, o.prevValue=n?r:null, o.newValue=e, n?o.MODIFICATION=o.attrChange=1:o[Q]=o.attrChange=0, $t.call(this, o);
          }, D=function(t) {
            let e; const n=t.currentTarget; let r=n[V]; const o=t.propertyName; r.hasOwnProperty(o)&&(r=r[o], (e=new CustomEvent(tt, {bubbles: !0})).attrName=r.name, e.prevValue=r.value||null, e.newValue=r.value=n[o]||null, null==e.prevValue?e[Q]=e.attrChange=0:e.MODIFICATION=e.attrChange=1, $t.call(n, e));
          }, j.value=function(t, e, n) {
            t===tt&&this[z]&&this.setAttribute!==I&&(this[V]={className: {name: 'class', value: this.className}}, this.setAttribute=I, this.removeAttribute=k, F.call(this, 'propertychange', D)), F.call(this, t, e, n);
          }, dt(kt, B, j)):jt||(lt[B](tt, Qt), lt.setAttribute(V, 1), lt.removeAttribute(V), re&&(_=function(t) {
            let e; let n; let r; const o=this; if (o===t.target) {
              for (r in e=o[V], o[V]=n=A(o), n) {
                if (!(r in e)) return x(0, o, r, e[r], n[r], Q); if (n[r]!==e[r]) return x(1, o, r, e[r], n[r], 'MODIFICATION');
              } for (r in e) if (!(r in n)) return x(2, o, r, e[r], n[r], Y);
            }
          }, x=function(t, e, n, r, o, i) {
            const u={attrChange: t, currentTarget: e, attrName: n, prevValue: r, newValue: o}; u[i]=t, s(u);
          }, A=function(t) {
            for (var e, n, r={}, o=t.attributes, i=0, u=o.length; i<u; i++)'setAttribute'!==(n=(e=o[i]).name)&&(r[n]=e.value); return r;
          })), M[R]=function(t, e) {
            if (n=t.toUpperCase(), ee&&(ee=!1, jt?(O=function(u, a) {
              function c(t, e) {
                for (let n=0, r=t.length; n<r; e(t[n++]));
              } return new jt(function(t) {
                for (var e, n, r, o=0, i=t.length; o<i; o++)'childList'===(e=t[o]).type?(c(e.addedNodes, u), c(e.removedNodes, a)):(n=e.target, ie&&n[z]&&'style'!==e.attributeName&&(r=qt.call(n, e.attributeName))!==e.oldValue&&n[z](e.attributeName, e.oldValue, r));
              });
            }(l(U), l(q)), (C=function(t) {
              return O.observe(t, {childList: !0, subtree: !0}), t;
            })(M), Bt&&(kt.attachShadow=function() {
              return C(Bt.apply(this, arguments));
            })):(w=[], M[B]('DOMNodeInserted', f(U)), M[B]('DOMNodeRemoved', f(q))), M[B](et, p), M[B]('readystatechange', p), M.importNode=function(t, e) {
              switch (t.nodeType) {
                case 1: return h(M, Kt, [t, !!e]); case 11: for (var n=M.createDocumentFragment(), r=t.childNodes, o=r.length, i=0; i<o; i++)n.appendChild(M.importNode(r[i], !!e)); return n; default: return Ut.call(t, !!e);
              }
            }, kt.cloneNode=function(t) {
              return h(this, Ut, [!!t]);
            }), ne) return ne=!1; if (-2<st.call(ut, rt+n)+st.call(ut, nt+n)&&d(t), !ot.test(n)||-1<st.call(it, n)) throw new Error('The type '+t+' is invalid'); let n; let r; const o=function() {
              return u?M.createElement(a, n):M.createElement(a);
            }; const i=e||ft; var u=pt.call(i, W); var a=u?e[W].toUpperCase():n; return u&&-1<st.call(ut, nt+a)&&d(a), r=ut.push((u?rt:nt)+n)-1, ct=ct.concat(ct.length?',':'', u?a+'[is="'+t.toLowerCase()+'"]':a), o.prototype=at[r]=pt.call(i, 'prototype')?i.prototype:Nt(kt), ct.length&&c(M.querySelectorAll(ct), U), o;
          }, M.createElement=Xt=function(t, e) {
            let n=b(e); const r=n?Zt.call(M, t, Pt(n)):Zt.call(M, t); const o=''+t; const i=st.call(ut, (n?rt:nt)+(n||o).toUpperCase()); let u=-1<i; return n&&(r.setAttribute('is', n=n.toLowerCase()), u&&(u=a(o.toUpperCase(), n))), ie=!M.createElement.innerHTMLHelper, u&&N(r, at[i]), r;
          }), m.prototype={constructor: m, define: Lt?function(t, e, n) {
            if (n)y(t, e, n); else {
              const r=t.toUpperCase(); At[r]={constructor: e, create: [r]}, Ct.set(e, r), Mt.define(t, e);
            }
          }:y, get: Lt?function(t) {
            return Mt.get(t)||e(t);
          }:e, whenDefined: Lt?function(t) {
            return _t.race([Mt.whenDefined(t), E(t)]);
          }:E}, !Mt||/^force/.test(t.type))T(); else if (!t.noBuiltIn) {
            try {
              !function(t, e, n) {
                const r=new RegExp('^<a\\s+is=(\'|")'+n+'\\1></a>$'); if (e[W]='a', (t.prototype=Nt(Ft.prototype)).constructor=t, o.customElements.define(n, t, e), !r.test(M.createElement('a', {is: n}).outerHTML)||!r.test((new t).outerHTML)) throw e;
              }(function t() {
                return Reflect.construct(Ft, [], t);
              }, {}, 'document-register-element-a');
            } catch (t) {
              T();
            }
          } if (!t.noBuiltIn) {
            try {
              if (Zt.call(M, 'a', 'a').outerHTML.indexOf('is')<0) throw {};
            } catch (t) {
              Pt=function(t) {
                return {is: t.toLowerCase()};
              };
            }
          }
        }(window);
      }, function(t, e, n) {
        'use strict'; Object.defineProperty(e, '__esModule', {value: !0}); const c=function(t, e) {
          if (Array.isArray(t)) return t; if (Symbol.iterator in Object(t)) {
            return function(t, e) {
              const n=[]; let r=!0; let o=!1; let i=void 0; try {
                for (var u, a=t[Symbol.iterator](); !(r=(u=a.next()).done)&&(n.push(u.value), !e||n.length!==e); r=!0);
              } catch (t) {
                o=!0, i=t;
              } finally {
                try {
                  !r&&a.return&&a.return();
                } finally {
                  if (o) throw i;
                }
              } return n;
            }(t, e);
          } throw new TypeError('Invalid attempt to destructure non-iterable instance');
        }; const r=function() {
          function r(t, e) {
            for (let n=0; n<e.length; n++) {
              const r=e[n]; r.enumerable=r.enumerable||!1, r.configurable=!0, 'value'in r&&(r.writable=!0), Object.defineProperty(t, r.key, r);
            }
          } return function(t, e, n) {
            return e&&r(t.prototype, e), n&&r(t, n), t;
          };
        }(); e.bindExpressions=function(r, t) {
          t.forEach(function(t) {
            const e=new Function('return this.'+t.expression+';'); const n=e.bind(r)(); t.value!==n&&(t.value=n||'', t.bindings.forEach(function(t) {
              switch (t.type) {
                case 'innerHTML': var e=void 0===n?'':n; t.el.innerHTML=''+e; break; case 'attribute': t.el.setAttribute(t.attrName, n); break; case 'property': t.el[t.propName]=n;
              }
            }));
          });
        }, e.bindEvents=function(r, t) {
          t.forEach(function(t) {
            const n=t.el; t.bindings.forEach(function(t) {
              const e=new Function('event', 'return '+t.funcName+'('+t.args.join(',')+')'); n.addEventListener(t.eventName, e.bind(r));
            });
          });
        }; e.OneWayBinding=function() {
          function e(t) {
            !function(t, e) {
              if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
            }(this, e), this.expressions=[], this.events=[], this.html=t, this.newHtml=this.__getNewHtml();
          } return r(e, [{key: 'setBindingDOMElements', value: function(n) {
            const e=[]; this.expressions.forEach(function(t) {
              t.bindings.forEach(function(t) {
                e.push(t.el), t.el=n.querySelector('['+t.el+']');
              });
            }), this.events.forEach(function(t) {
              e.push(t.el), t.el=n.querySelector('['+t.el+']');
            }), e.forEach(function(t) {
              const e=n.querySelector('['+t+']'); e&&e.removeAttribute(t);
            });
          }}, {key: '__setExprBindings', value: function(e, t) {
            const n=this.expressions.find(function(t) {
              return t.expression===e;
            }); n?n.bindings.push(t):this.expressions.push({expression: e, value: null, bindings: [t]});
          }}, {key: '__getNewHtml', value: function() {
            const t=(new DOMParser).parseFromString(this.html, 'text/html'); return this.__runChildren(t.body), this.__replaceBINDToSPAN(t), t.body.innerHTML;
          }}, {key: '__eventParsed', value: function(t) {
            const e=t.match(/^(\w+)(\(*.*?\))?$/); const n=c(e, 3); const r=n[0]; const o=n[1]; const i=n[2]; if (r) {
              return ['this.'+o, ((i||'').replace(/[()]/g, '')||'event').split(',').map(function(t) {
                const e=t.trim(); return 'event'===e?'event':e.match(/^[\-\.0-9]/)?e:e.match(/^(true|false)$/)?e:e.match(/^['"].*['"]$/)?e:'this.'+e;
              })];
            }
          }}, {key: '__runChildren', value: function(t) {
t.nodeType===Node.ELEMENT_NODE?this.__bindElement(t):t.nodeType===Node.TEXT_NODE&&t.nodeValue.match(/{{(.*?)}}/)&&this.__bindInnerHTML(t); for (let e=t.childNodes, n=0; n<e.length; n++) {
  const r=e[n]; r.hasAttribute&&r.hasAttribute('ce-no-bind')?console.log('found ce-no-bind. skipping binding'):r.childNodes&&this.__runChildren(r);
}
          }}, {key: '__bindElement', value: function(t) {
            for (let e=0; e<t.attributes.length; e++) {
              const n=t.attributes[e]; n.name.match(/^\[(.*?)\]$/)&&this.__bindElementProperty(t, n), n.value.match(/{{(.*?)}}/)&&this.__bindAttribute(t, n), (n.name.match(/^\(.*?\)$/)||n.name.match(/^on-(.*?)/))&&this.__bindElementEvent(t, n);
            }
          }}, {key: '__replaceBINDToSPAN', value: function(t) {
            t.body.innerHTML=t.body.innerHTML.replace(/BIND-(x[\w]+)/g, '<span $1></span>');
          }}, {key: '__getHash', value: function() {
            const t=61440*Math.random()+4095; return 'x'+Math.floor(t).toString(16);
          }}, {key: '__bindInnerHTML', value: function(t) {
            const r=this; t.nodeValue=t.nodeValue.replace(/{{(.*?)}}/g, function(t, e) {
              const n=r.__getHash(); return r.__setExprBindings(e, {el: n, type: 'innerHTML', orgHtml: t}), 'BIND-'+n;
            });
          }}, {key: '__bindElementProperty', value: function(t, e) {
            t.bindingHash=t.bindingHash||this.__getHash(), t.setAttribute(t.bindingHash, ''); const n=e.name.match(/^\[(.*?)\]$/); this.__setExprBindings(e.value, {el: t.bindingHash, type: 'property', propName: n[1], orgHtml: e.name+'="'+e.value+'"'});
          }}, {key: '__bindAttribute', value: function(t, e) {
            t.bindingHash=t.bindingHash||this.__getHash(), t.setAttribute(t.bindingHash, ''); const n=e.value.match(/{{(.*?)}}/); this.__setExprBindings(n[1], {el: t.bindingHash, type: 'attribute', attrName: e.name, orgHtml: e.name+'="'+e.value+'"'});
          }}, {key: '__bindElementEvent', value: function(e, t) {
            e.bindingHash=e.bindingHash||this.__getHash(), e.setAttribute(e.bindingHash, ''), this.events.find(function(t) {
              return t.el===e.bindingHash;
            })||this.events.push({el: e.bindingHash, bindings: []}); const n=this.events.find(function(t) {
              return t.el===e.bindingHash;
            }); if (this.__eventParsed(t.value)) {
              const r=this.__eventParsed(t.value); const o=c(r, 2); const i=o[0]; const u=o[1]; let a=void 0; t.name.match(/^\((.*?)\)$/)?a=t.name.match(/^\((.*?)\)$/)[1]:t.name.match(/^on-(.*?)/)&&(a=t.name.replace('on-', '')), n.bindings.push({eventName: a, funcName: i, args: u});
            }
          }}]), e;
        }();
      }, function(t, e, n) {
        'use strict'; Object.defineProperty(e, '__esModule', {value: !0}), e.createCustomEvent=function(t, e) {
          let n=void 0; 'function'==typeof CustomEvent?n=new CustomEvent(t, e):(n=document.createEvent('CustomEvent')).initCustomEvent(t, e.bubbles, e.cancelable, e.detail); return n;
        };
      }]);
    });
    // # sourceMappingURL=html-custom-element.umd.js.map
    /** */}),

  /** */ './node_modules/prismjs/prism.js':
  /* !***************************************!*\
  !*** ./node_modules/prismjs/prism.js ***!
  \***************************************/
  /* ! no static exports found */
  /** */ (function(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */(function(global) {
      /* **********************************************
     Begin prism-core.js
********************************************** */

      const _self = (typeof window !== 'undefined')
	? window // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {} // if in node js
	);

      /**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

      const Prism = (function() {
        // Private helper vars
        const lang = /\blang(?:uage)?-([\w-]+)\b/i;
        let uniqueId = 0;

        var _ = _self.Prism = {
          manual: _self.Prism && _self.Prism.manual,
          disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
          util: {
            encode: function(tokens) {
              if (tokens instanceof Token) {
                return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
              } else if (_.util.type(tokens) === 'Array') {
                return tokens.map(_.util.encode);
              } else {
                return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
              }
            },

            type: function(o) {
              return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
            },

            objId: function(obj) {
              if (!obj['__id']) {
                Object.defineProperty(obj, '__id', {value: ++uniqueId});
              }
              return obj['__id'];
            },

            // Deep clone a language definition (e.g. to extend it)
            clone: function(o, visited) {
              const type = _.util.type(o);
              visited = visited || {};

              switch (type) {
                case 'Object':
                  if (visited[_.util.objId(o)]) {
                    return visited[_.util.objId(o)];
                  }
                  var clone = {};
                  visited[_.util.objId(o)] = clone;

                  for (const key in o) {
                    if (o.hasOwnProperty(key)) {
                      clone[key] = _.util.clone(o[key], visited);
                    }
                  }

                  return clone;

                case 'Array':
                  if (visited[_.util.objId(o)]) {
                    return visited[_.util.objId(o)];
                  }
                  var clone = [];
                  visited[_.util.objId(o)] = clone;

                  o.forEach(function(v, i) {
                    clone[i] = _.util.clone(v, visited);
                  });

                  return clone;
              }

              return o;
            }
          },

          languages: {
            extend: function(id, redef) {
              const lang = _.util.clone(_.languages[id]);

              for (const key in redef) {
                lang[key] = redef[key];
              }

              return lang;
            },

            /**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need anobject and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before. If not provided, the function appends instead.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
            insertBefore: function(inside, before, insert, root) {
              root = root || _.languages;
              const grammar = root[inside];

              if (arguments.length == 2) {
                insert = arguments[1];

                for (var newToken in insert) {
                  if (insert.hasOwnProperty(newToken)) {
                    grammar[newToken] = insert[newToken];
                  }
                }

                return grammar;
              }

              const ret = {};

              for (const token in grammar) {
                if (grammar.hasOwnProperty(token)) {
                  if (token == before) {
                    for (var newToken in insert) {
                      if (insert.hasOwnProperty(newToken)) {
                        ret[newToken] = insert[newToken];
                      }
                    }
                  }

                  ret[token] = grammar[token];
                }
              }

              // Update references in other language definitions
              _.languages.DFS(_.languages, function(key, value) {
                if (value === root[inside] && key != inside) {
                  this[key] = ret;
                }
              });

              return root[inside] = ret;
            },

            // Traverse a language definition with Depth First Search
            DFS: function(o, callback, type, visited) {
              visited = visited || {};
              for (const i in o) {
                if (o.hasOwnProperty(i)) {
                  callback.call(o, i, o[i], type || i);

                  if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
                    visited[_.util.objId(o[i])] = true;
                    _.languages.DFS(o[i], callback, null, visited);
                  } else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
                    visited[_.util.objId(o[i])] = true;
                    _.languages.DFS(o[i], callback, i, visited);
                  }
                }
              }
            }
          },
          plugins: {},

          highlightAll: function(async, callback) {
            _.highlightAllUnder(document, async, callback);
          },

          highlightAllUnder: function(container, async, callback) {
            const env = {
              callback: callback,
              selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };

            _.hooks.run('before-highlightall', env);

            const elements = env.elements || container.querySelectorAll(env.selector);

            for (var i=0, element; element = elements[i++];) {
              _.highlightElement(element, async === true, env.callback);
            }
          },

          highlightElement: function(element, async, callback) {
            // Find language
            let language; let grammar; let parent = element;

            while (parent && !lang.test(parent.className)) {
              parent = parent.parentNode;
            }

            if (parent) {
              language = (parent.className.match(lang) || [, ''])[1].toLowerCase();
              grammar = _.languages[language];
            }

            // Set language on the element, if not present
            element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

            if (element.parentNode) {
              // Set language on the parent, for styling
              parent = element.parentNode;

              if (/pre/i.test(parent.nodeName)) {
                parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
              }
            }

            const code = element.textContent;

            const env = {
              element: element,
              language: language,
              grammar: grammar,
              code: code
            };

            _.hooks.run('before-sanity-check', env);

            if (!env.code || !env.grammar) {
              if (env.code) {
                _.hooks.run('before-highlight', env);
                env.element.textContent = env.code;
                _.hooks.run('after-highlight', env);
              }
              _.hooks.run('complete', env);
              return;
            }

            _.hooks.run('before-highlight', env);

            if (async && _self.Worker) {
              const worker = new Worker(_.filename);

              worker.onmessage = function(evt) {
                env.highlightedCode = evt.data;

                _.hooks.run('before-insert', env);

                env.element.innerHTML = env.highlightedCode;

                callback && callback.call(env.element);
                _.hooks.run('after-highlight', env);
                _.hooks.run('complete', env);
              };

              worker.postMessage(JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true
              }));
            } else {
              env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

              _.hooks.run('before-insert', env);

              env.element.innerHTML = env.highlightedCode;

              callback && callback.call(element);

              _.hooks.run('after-highlight', env);
              _.hooks.run('complete', env);
            }
          },

          highlight: function(text, grammar, language) {
            const env = {
              code: text,
              grammar: grammar,
              language: language
            };
            _.hooks.run('before-tokenize', env);
            env.tokens = _.tokenize(env.code, env.grammar);
            _.hooks.run('after-tokenize', env);
            return Token.stringify(_.util.encode(env.tokens), env.language);
          },

          matchGrammar: function(text, strarr, grammar, index, startPos, oneshot, target) {
            const Token = _.Token;

            for (const token in grammar) {
              if (!grammar.hasOwnProperty(token) || !grammar[token]) {
                continue;
              }

              if (token == target) {
                return;
              }

              let patterns = grammar[token];
              patterns = (_.util.type(patterns) === 'Array') ? patterns : [patterns];

              for (let j = 0; j < patterns.length; ++j) {
                let pattern = patterns[j];
                const inside = pattern.inside;
                const lookbehind = !!pattern.lookbehind;
                const greedy = !!pattern.greedy;
                let lookbehindLength = 0;
                const alias = pattern.alias;

                if (greedy && !pattern.pattern.global) {
                  // Without the global flag, lastIndex won't work
                  const flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
                  pattern.pattern = RegExp(pattern.pattern.source, flags + 'g');
                }

                pattern = pattern.pattern || pattern;

                // Don’t cache length as it changes during the loop
                for (let i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {
                  let str = strarr[i];

                  if (strarr.length > text.length) {
                    // Something went terribly wrong, ABORT, ABORT!
                    return;
                  }

                  if (str instanceof Token) {
                    continue;
                  }

                  if (greedy && i != strarr.length - 1) {
                    pattern.lastIndex = pos;
                    var match = pattern.exec(text);
                    if (!match) {
                      break;
                    }

                    var from = match.index + (lookbehind ? match[1].length : 0);
						    var to = match.index + match[0].length;
						    let k = i;
						    let p = pos;

                    for (let len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
                      p += strarr[k].length;
                      // Move the index i to the element in strarr that is closest to from
                      if (from >= p) {
                        ++i;
                        pos = p;
                      }
                    }

                    // If strarr[i] is a Token, then the match starts inside another Token, which is invalid
                    if (strarr[i] instanceof Token) {
                      continue;
                    }

                    // Number of tokens to delete and replace with the new match
                    delNum = k - i;
                    str = text.slice(pos, p);
                    match.index -= pos;
                  } else {
                    pattern.lastIndex = 0;

                    var match = pattern.exec(str);
                    var delNum = 1;
                  }

                  if (!match) {
                    if (oneshot) {
                      break;
                    }

                    continue;
                  }

                  if (lookbehind) {
                    lookbehindLength = match[1] ? match[1].length : 0;
                  }

                  var from = match.index + lookbehindLength;
					    var match = match[0].slice(lookbehindLength);
					    var to = from + match.length;
					    const before = str.slice(0, from);
					    const after = str.slice(to);

                  const args = [i, delNum];

                  if (before) {
                    ++i;
                    pos += before.length;
                    args.push(before);
                  }

                  const wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

                  args.push(wrapped);

                  if (after) {
                    args.push(after);
                  }

                  Array.prototype.splice.apply(strarr, args);

                  if (delNum != 1) {
                    _.matchGrammar(text, strarr, grammar, i, pos, true, token);
                  }

                  if (oneshot) {
                    break;
                  }
                }
              }
            }
          },

          tokenize: function(text, grammar, language) {
            const strarr = [text];

            const rest = grammar.rest;

            if (rest) {
              for (const token in rest) {
                grammar[token] = rest[token];
              }

              delete grammar.rest;
            }

            _.matchGrammar(text, strarr, grammar, 0, 0, false);

            return strarr;
          },

          hooks: {
            all: {},

            add: function(name, callback) {
              const hooks = _.hooks.all;

              hooks[name] = hooks[name] || [];

              hooks[name].push(callback);
            },

            run: function(name, env) {
              const callbacks = _.hooks.all[name];

              if (!callbacks || !callbacks.length) {
                return;
              }

              for (var i=0, callback; callback = callbacks[i++];) {
                callback(env);
              }
            }
          }
        };

        var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
          this.type = type;
          this.content = content;
          this.alias = alias;
          // Copy of the full string this token was created from
          this.length = (matchedStr || '').length|0;
          this.greedy = !!greedy;
        };

        Token.stringify = function(o, language, parent) {
          if (typeof o == 'string') {
            return o;
          }

          if (_.util.type(o) === 'Array') {
            return o.map(function(element) {
              return Token.stringify(element, language, o);
            }).join('');
          }

          const env = {
            type: o.type,
            content: Token.stringify(o.content, language, parent),
            tag: 'span',
            classes: ['token', o.type],
            attributes: {},
            language: language,
            parent: parent
          };

          if (o.alias) {
            const aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
            Array.prototype.push.apply(env.classes, aliases);
          }

          _.hooks.run('wrap', env);

          const attributes = Object.keys(env.attributes).map(function(name) {
            return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
          }).join(' ');

          return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
        };

        if (!_self.document) {
          if (!_self.addEventListener) {
            // in Node.js
            return _self.Prism;
          }

          if (!_.disableWorkerMessageHandler) {
            // In worker
            _self.addEventListener('message', function(evt) {
              const message = JSON.parse(evt.data);
              const lang = message.language;
              const code = message.code;
              const immediateClose = message.immediateClose;

              _self.postMessage(_.highlight(code, _.languages[lang], lang));
              if (immediateClose) {
                _self.close();
              }
            }, false);
          }

          return _self.Prism;
        }

        // Get current script and highlight
        const script = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();

        if (script) {
          _.filename = script.src;

          if (!_.manual && !script.hasAttribute('data-manual')) {
            if (document.readyState !== 'loading') {
              if (window.requestAnimationFrame) {
                window.requestAnimationFrame(_.highlightAll);
              } else {
                window.setTimeout(_.highlightAll, 16);
              }
            } else {
              document.addEventListener('DOMContentLoaded', _.highlightAll);
            }
          }
        }

        return _self.Prism;
      })();

      if ( true && module.exports) {
        module.exports = Prism;
      }

      // hack for components to work correctly in node.js
      if (typeof global !== 'undefined') {
        global.Prism = Prism;
      }


      /* **********************************************
     Begin prism-markup.js
********************************************** */

      Prism.languages.markup = {
        'comment': /<!--[\s\S]*?-->/,
        'prolog': /<\?[\s\S]+?\?>/,
        'doctype': /<!DOCTYPE[\s\S]+?>/i,
        'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
        'tag': {
          pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
          greedy: true,
          inside: {
            'tag': {
              pattern: /^<\/?[^\s>\/]+/i,
              inside: {
                'punctuation': /^<\/?/,
                'namespace': /^[^\s>\/:]+:/
              }
            },
            'attr-value': {
              pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
              inside: {
                'punctuation': [
                  /^=/,
                  {
                    pattern: /(^|[^\\])["']/,
                    lookbehind: true
                  }
                ]
              }
            },
            'punctuation': /\/?>/,
            'attr-name': {
              pattern: /[^\s>\/]+/,
              inside: {
                'namespace': /^[^\s>\/:]+:/
              }
            }

          }
        },
        'entity': /&#?[\da-z]{1,8};/i
      };

      Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];

      // Plugin to make entity title show the real entity, idea by Roman Komarov
      Prism.hooks.add('wrap', function(env) {
        if (env.type === 'entity') {
          env.attributes['title'] = env.content.replace(/&amp;/, '&');
        }
      });

      Prism.languages.xml = Prism.languages.markup;
      Prism.languages.html = Prism.languages.markup;
      Prism.languages.mathml = Prism.languages.markup;
      Prism.languages.svg = Prism.languages.markup;


      /* **********************************************
     Begin prism-css.js
********************************************** */

      Prism.languages.css = {
        'comment': /\/\*[\s\S]*?\*\//,
        'atrule': {
          pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
          inside: {
            'rule': /@[\w-]+/
            // See rest below
          }
        },
        'url': /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
        'selector': /[^{}\s][^{};]*?(?=\s*\{)/,
        'string': {
          pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
        'important': /\B!important\b/i,
        'function': /[-a-z0-9]+(?=\()/i,
        'punctuation': /[(){};:]/
      };

      Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

      if (Prism.languages.markup) {
        Prism.languages.insertBefore('markup', 'tag', {
          'style': {
            pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
            lookbehind: true,
            inside: Prism.languages.css,
            alias: 'language-css',
            greedy: true
          }
        });

        Prism.languages.insertBefore('inside', 'attr-value', {
          'style-attr': {
            pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
            inside: {
              'attr-name': {
                pattern: /^\s*style/i,
                inside: Prism.languages.markup.tag.inside
              },
              'punctuation': /^\s*=\s*['"]|['"]\s*$/,
              'attr-value': {
                pattern: /.+/i,
                inside: Prism.languages.css
              }
            },
            alias: 'language-css'
          }
        }, Prism.languages.markup.tag);
      }

      /* **********************************************
     Begin prism-clike.js
********************************************** */

      Prism.languages.clike = {
        'comment': [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        'string': {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        'class-name': {
          pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
          lookbehind: true,
          inside: {
            punctuation: /[.\\]/
          }
        },
        'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
        'boolean': /\b(?:true|false)\b/,
        'function': /[a-z0-9_]+(?=\()/i,
        'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
        'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
        'punctuation': /[{}[\];(),.:]/
      };


      /* **********************************************
     Begin prism-javascript.js
********************************************** */

      Prism.languages.javascript = Prism.languages.extend('clike', {
        'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
        'number': /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
        // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
        'function': /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
        'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
      });

      Prism.languages.insertBefore('javascript', 'keyword', {
        'regex': {
          pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
          lookbehind: true,
          greedy: true
        },
        // This must be declared before keyword because we use "function" inside the look-forward
        'function-variable': {
          pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
          alias: 'function'
        },
        'constant': /\b[A-Z][A-Z\d_]*\b/
      });

      Prism.languages.insertBefore('javascript', 'string', {
        'template-string': {
          pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
          greedy: true,
          inside: {
            'interpolation': {
              pattern: /\${[^}]+}/,
              inside: {
                'interpolation-punctuation': {
                  pattern: /^\${|}$/,
                  alias: 'punctuation'
                },
                'rest': null // See below
              }
            },
            'string': /[\s\S]+/
          }
        }
      });
      Prism.languages.javascript['template-string'].inside['interpolation'].inside.rest = Prism.languages.javascript;

      if (Prism.languages.markup) {
        Prism.languages.insertBefore('markup', 'tag', {
          'script': {
            pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
            lookbehind: true,
            inside: Prism.languages.javascript,
            alias: 'language-javascript',
            greedy: true
          }
        });
      }

      Prism.languages.js = Prism.languages.javascript;


      /* **********************************************
     Begin prism-file-highlight.js
********************************************** */

      (function() {
        if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
          return;
        }

        self.Prism.fileHighlight = function() {
          const Extensions = {
            'js': 'javascript',
            'py': 'python',
            'rb': 'ruby',
            'ps1': 'powershell',
            'psm1': 'powershell',
            'sh': 'bash',
            'bat': 'batch',
            'h': 'c',
            'tex': 'latex'
          };

          Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function(pre) {
            const src = pre.getAttribute('data-src');

            let language; let parent = pre;
            const lang = /\blang(?:uage)?-([\w-]+)\b/i;
            while (parent && !lang.test(parent.className)) {
              parent = parent.parentNode;
            }

            if (parent) {
              language = (pre.className.match(lang) || [, ''])[1];
            }

            if (!language) {
              const extension = (src.match(/\.(\w+)$/) || [, ''])[1];
              language = Extensions[extension] || extension;
            }

            const code = document.createElement('code');
            code.className = 'language-' + language;

            pre.textContent = '';

            code.textContent = 'Loading…';

            pre.appendChild(code);

            const xhr = new XMLHttpRequest();

            xhr.open('GET', src, true);

            xhr.onreadystatechange = function() {
              if (xhr.readyState == 4) {
                if (xhr.status < 400 && xhr.responseText) {
                  code.textContent = xhr.responseText;

                  Prism.highlightElement(code);
                } else if (xhr.status >= 400) {
                  code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
                } else {
                  code.textContent = '✖ Error: File does not exist or is empty';
                }
              }
            };

            xhr.send(null);
          });

          if (Prism.plugins.toolbar) {
            Prism.plugins.toolbar.registerButton('download-file', function(env) {
              const pre = env.element.parentNode;
              if (!pre || !/pre/i.test(pre.nodeName) || !pre.hasAttribute('data-src') || !pre.hasAttribute('data-download-link')) {
                return;
              }
              const src = pre.getAttribute('data-src');
              const a = document.createElement('a');
              a.textContent = pre.getAttribute('data-download-link-label') || 'Download';
              a.setAttribute('download', '');
              a.href = src;
              return a;
            });
          }
        };

        document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);
      })();
      /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/* ! ./../webpack/buildin/global.js */ './node_modules/webpack/buildin/global.js')));
    /** */}),

  /** */ './node_modules/webpack/buildin/global.js':
  /* !***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
  /* ! no static exports found */
  /** */ (function(module, exports) {
    let g;

    // This works in non-strict mode
    g = (function() {
      return this;
    })();

    try {
      // This works if eval is allowed (see CSP)
      g = g || new Function('return this')();
    } catch (e) {
      // This works if the window reference is available
      if (typeof window === 'object') g = window;
    }

    // g can still be undefined, but nothing to do about it...
    // We return undefined, instead of nothing here, so it's
    // easier to handle this case. if(!global) { ...}

    module.exports = g;
    /** */}),

  /** */ './src/calendar/calendar.js':
  /* !**********************************!*\
  !*** ./src/calendar/calendar.js ***!
  \**********************************/
  /* ! exports provided: HCECalendar */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'HCECalendar', function() {
      return HCECalendar;
    });
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _utils_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! ../utils/time */ './src/utils/time.js');
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    function __getWeekdays() {
      const firstDayOfWeek = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      const ret = [];

      for (let i = firstDayOfWeek; i < firstDayOfWeek + 7; i++) {
        ret.push(i % 7);
      }

      return ret;
    }

    function __getLeadingDays(curDate) {
      const staDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      const ret = [];
      const year = curDate.getFullYear();
      const month = curDate.getMonth();
      const firstWeekday = new Date(year, month, 1).getDay();
      const days = firstWeekday + 7 - (staDay + 7) - 1; // 2 days become 1 for [1, 0]

      for (let i = days * -1; i <= 0; i++) {
        ret.push(new Date(year, month, i).getDate());
      }

      return ret;
    }

    function __getMonthDays(curDate) {
      const ret = [];
      const year = curDate.getFullYear();
      const month = curDate.getMonth();
      const lastDay = new Date(year, month + 1, 0).getDate();

      for (let i = 1; i <= lastDay; i++) {
        ret.push(i);
      }

      return ret;
    }

    function __getTrailingDays(leadingDays, monthDays) {
      const ret = [];
      const days = 42 - (leadingDays.length + monthDays.length);

      for (let i = 1; i <= days; i++) {
        ret.push(i);
      }

      return ret;
    }

    function __addDate(parent, date, klass) {
      const el = document.createElement('button');
      const elDate = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), date);
      el.innerHTML = date;
      el.className = klass;

      if (elDate > this.maxDate || elDate < this.minDate) {
        el.disabled = true;
      }

      parent.appendChild(el);
    }

    function __getI18n(lang, key, indexes) {
      // type:week, wk, month, mon
      indexes = indexes instanceof Array ? indexes : [indexes];
      const t = Object(_utils_time__WEBPACK_IMPORTED_MODULE_1__['time'])();
      const ret = indexes.map(function(ndx) {
        return t.i18n[lang][key][ndx];
      });
      return ret.length === 1 ? ret[0] : ret;
    }

    function __getMonthEls(lang, monthNum) {
      const t = Object(_utils_time__WEBPACK_IMPORTED_MODULE_1__['time'])();
      const months = t.i18n[lang].monthNamesShort;
      return months.map(function(month, ndx) {
        const optEl = document.createElement('option');
        optEl.value = ndx;
        optEl.innerHTML = month;
        monthNum === ndx && (optEl.selected = true);
        return optEl;
      });
    }

    function __getYearEls(lang, year, minYear, maxYear) {
      minYear = Math.max(minYear, year - 10);
      maxYear = Math.min(maxYear, year + 10);
      const years = [];

      for (let i = minYear; i <= maxYear; i++) {
        const optEl = document.createElement('option');
        optEl.value = i;
        optEl.innerHTML = i;
        year === i && (optEl.selected = true);
        years.push(optEl);
      }

      return years;
    }

    const html = '\n  <div class="calendar">\n    <div class="title">\n      <button class="prev" (click)="setMonth(-1)">&lt;</button>\n      <div>\n        <select class="month" (change)="setMonth(event)"></select>\n        <select class="year" (change)="setYear(event)"></select>\n      </div>\n      <button class="next" (click)="setMonth(1)">&gt;</button>\n    </div>\n    <div class="days"></div>\n    <div class="dates" (click)="fireDateSelected(event)"></div>\n  </div>\n  <div class="blocker"></div>\n';
    const css = '\n  :root.overlay:before {            /* Needed to check click outside of overlay */\n    content: \' \';\n    position: fixed;\n    top: 0; left: 0; right: 0; bottom: 0;\n    background: transparent;\n  }\n  .calendar {           /* overlay contents on thetop of blocker */\n    position: relative;\n    background: #fff;\n  }\n  .calendar.shadow {\n    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.14),\n      0px 1px 1px 0px rgba(0, 0, 0, 0.12), \n      0px 2px 1px -1px rgba(0, 0, 0, .4) ;\n  }\n\n  .title {              /* e.g. \'< Mar 2019 >\' */\n    display: flex;\n    justify-content: space-between;\n    position: relative;\n    background: #fff;\n  }\n  .title select {        /* Jan, Feb .. */ /* 2017, 2018, ... */\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    padding: 0;\n    border: none;\n  }\n  .days > span {          /* Mon, Tue, Wed ... */\n    display: inline-block;\n    text-align: center;\n    width: calc(100% / 7);\n  }\n  .dates button {          /* 1, 2, ... 31 */\n    padding: 0;\n    width: calc(100% / 7);\n  }\n  .dates button.leading { \n    color: #eee; border: none;\n  }\n  .dates button.trailing {\n    color: #eee; border: none;\n  }\n';
    var HCECalendar =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCECalendar, _HTMLCustomElement);

  function HCECalendar() {
    _classCallCheck(this, HCECalendar);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCECalendar).apply(this, arguments));
  }

  _createClass(HCECalendar, [{
    key: 'connectedCallback',
    // curDate, minDate, maxDate
    // language, firstDayOfWeek
    // weekdayFormat e.g. 2-letter, full, default 3-letter
    value: function connectedCallback() {
      const _this = this;

      this.renderWith(html, css).then(function(_) {
        _this.curDate = _this.selected ? new Date(_this.selected) : new Date();
        _this.minDate = _this.minDate ? new Date(_this.minDate) : new Date(null);
        _this.maxDate = new Date(_this.maxDate || '2099-12-31');
        _this.firstDayOfWeek = _this.firstDayOfWeek || 0;
        _this.weekdayFormat = _this.weekdayFormat || '2-letter'; // 2-letter, 3-letter, or full

        _this.language = _this.language || 'en';

        _this.setBehaviourOfVisibleBy();

        _this.setWeekdays();

        _this.setCalendar();
      });
    }
  }, {
    key: 'setBehaviourOfVisibleBy',
    value: function setBehaviourOfVisibleBy() {
      const _this2 = this;

      const inputEl = document.querySelector(this.visibleBy);

      if (inputEl) {
        inputEl.parentElement.style.position = 'relative';
        this.classList.add('overlay');
        this.querySelector('.calendar').classList.add('shadow');
        this.style.position = 'absolute';
        this.style.display = 'none';
        this.addEventListener('click', function(event) {
          _this2.isEqualNode(event.target) && (_this2.style.display = 'none');
        });
        inputEl.addEventListener('focus', function(_) {
          return _this2.style.display = 'block';
        });
        this.addEventListener('date-selected', function(e) {
          inputEl.value = e.detail;
          _this2.style.display = 'none';
        });
      }
    }
  }, {
    key: 'setWeekdays',
    value: function setWeekdays() {
      const _this3 = this;

      const weekdays = __getWeekdays(this.firstDayOfWeek);

      const format = this.weekdayFormat === 'full' ? 'dayNames' : 'dayNamesShort';

      __getI18n(this.language, format, weekdays).forEach(function(str) {
        str = _this3.weekdayFormat === '2-letter' ? str.substr(0, 2) : str;
        const spanEl = document.createElement('span');
        spanEl.innerHTML = str;
        spanEl.className = 'wk';

        _this3.querySelector('.days').appendChild(spanEl);
      });
    }
  }, {
    key: 'setYear',
    value: function setYear(year) {
      if (year instanceof Event) {
        year = year.target.value;
      }

      this.curDate.setYear(year);
      this.setCalendar();
    }
  }, {
    key: 'setMonth',
    value: function setMonth(mon) {
      if (mon instanceof Event) {
        this.curDate.setMonth(parseInt(mon.target.value));
      } else {
        this.curDate.setMonth(this.curDate.getMonth() + mon);
      }

      this.setCalendar();
    }
  }, {
    key: 'setCalendar',
    value: function setCalendar() {
      const _this4 = this;

      const leadingDays = __getLeadingDays(this.curDate, this.firstDayOfWeek);

      const monthDays = __getMonthDays(this.curDate);

      const trailingDays = __getTrailingDays(leadingDays, monthDays);

      const monthEls = __getMonthEls(this.language, this.curDate.getMonth());

      const yearEls = __getYearEls(this.language, this.curDate.getFullYear(), this.minDate.getFullYear(), this.maxDate && this.maxDate.getFullYear());

      this.querySelector('.title .month').innerHTML = '';
      this.querySelector('.title .year').innerHTML = '';
      monthEls.forEach(function(el) {
        return _this4.querySelector('.title .month').appendChild(el);
      });
      yearEls.forEach(function(el) {
        return _this4.querySelector('.title .year').appendChild(el);
      });
      const prevMonLastDay = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), 0);
      const nextMon1stDay = new Date(this.curDate.getFullYear(), this.curDate.getMonth() + 1, 1);
      this.querySelector('.title .prev').disabled = prevMonLastDay < this.minDate;
      this.querySelector('.title .next').disabled = nextMon1stDay > this.maxDate;
      const datesEl = this.querySelector('.dates');
      datesEl.innerHTML = '';
      leadingDays.forEach(function(num) {
        return __addDate.bind(_this4)(datesEl, num, 'leading');
      });
      monthDays.forEach(function(num) {
        return __addDate.bind(_this4)(datesEl, num, 'day');
      });
      trailingDays.forEach(function(num) {
        return __addDate.bind(_this4)(datesEl, num, 'trailing');
      });
      Array.from(this.querySelector('.dates').children).forEach(function(el, ndx) {
        ndx % 7 === 0 && ndx !== 0 && datesEl.insertBefore(document.createElement('br'), el);
      });
    }
  }, {
    key: 'fireDateSelected',
    value: function fireDateSelected(event) {
      const map = {
        leading: -1,
        day: 0,
        trailing: 1
      };
      const month = this.curDate.getMonth() + map[event.target.className];
      const day = parseInt(event.target.innerHTML, 0);
      const selectedDate = new Date(this.curDate.getFullYear(), month, day);
      const formatted = Object(_utils_time__WEBPACK_IMPORTED_MODULE_1__['time'])(selectedDate).format(this.format || 'long');
      const custEvent = Object(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['createCustomEvent'])('date-selected', {
        detail: formatted
      });
      this.dispatchEvent(custEvent);
    }
  }]);

  return HCECalendar;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);
    HCECalendar.define('hce-calendar', HCECalendar);
    /** */}),

  /** */ './src/carousel/carousel.css':
  /* !***********************************!*\
  !*** ./src/carousel/carousel.css ***!
  \***********************************/
  /* ! no static exports found */
  /** */ (function(module, exports) {
    module.exports = ':root {\n  display: block;\n  position: relative;\n  width: 100%;\n  min-width: 320px;\n  min-height: 200px;\n}\n\n.button-container {\n  display: flex;\n  position: absolute;\n  align-items: center;\n  height: 100%;\n  z-index: 1;\n}\n\n.prev.button-container { \n  left: 0; \n}\n\n.next.button-container {\n right: 0; \n}\n\n.button-container > button {\n  display: block;\n  border: 0;\n  padding: 0;\n  font-size: 32px;\n  color: #FFF;\n  background-color: #CCC;\n  border-radius: 50%;\n  width: 44px;\n  height: 44px;\n  line-height: 44px;\n  opacity: .5;\n  text-align: center;\n  text-decoration: none;\n}\n\n.button-container > button:hover {\n  opacity: .9;\n}\n\n.button-container > button:focus {\n  opacity: .9;\n}\n\n.carousel-list {\n  display: flex;\n  margin: 0;\n  position: absolute;\n  padding: 0;\n  overflow: hidden;\n  /*overflow-x: auto;*/\n  width: 100%;\n}\n\n.carousel-list > * {\n  display: block;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  opacity: 0.6;\n}\n\n.carousel-list > li[tabindex] {\n  opacity: 1;\n  outline: none;\n  border-color: #9ecaed;\n  box-shadow: 0 0 10px #9ecaed;\n}\n\n.shortcuts {\n  display: block;\n  margin: 0;\n  position: absolute;\n  bottom: 12px;\n  padding: 0;\n  width: 100%;\n  text-align: center;\n}\n\n.shortcuts > * {\n  display: inline-block;\n  margin: 0 1px;\n  list-style: none;\n  color: #FFF;\n  border-radius: 50%;\n  background: #FFF;\n  width: 12px;\n  height: 12px;\n  opacity: .5;\n}\n\n.shortcuts > *.active {\n  opacity: .9;\n}';
    /** */}),

  /** */ './src/carousel/carousel.js':
  /* !**********************************!*\
  !*** ./src/carousel/carousel.js ***!
  \**********************************/
  /* ! exports provided: HCECarousel */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'HCECarousel', function() {
      return HCECarousel;
    });
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _carousel_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! ./carousel.css */ './src/carousel/carousel.css');
    /* harmony import */ const _carousel_css__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__*/__webpack_require__.n(_carousel_css__WEBPACK_IMPORTED_MODULE_1__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    const html = '\n  <div class="prev button-container">\n    <button (click)="show(index-1)">&lt;</button>\n  </div>\n  <hce-content></hce-content>\n  <div class="next button-container">\n    <button (click)="show(index+1)">&gt;</button>\n  </div>\n\n  <!-- shortcuts for each item -->\n  <ul class="shortcuts"></ul>';

    function __addShortcuts(shortcutsEl, listEl) {
      const _this = this;

      const _loop = function _loop(i) {
        const liEl = listEl.children[i];
        liEl.addEventListener('click', function(_) {
          return _this.show(liEl);
        });
        const shortcut = document.createElement('li');
        shortcut.innerHTML = '&nbsp;';
        shortcut.setAttribute('tabindex', 0);
        shortcutsEl.appendChild(shortcut);
        shortcut.addEventListener('click', function(_) {
          return _this.show(i);
        });
        shortcut.addEventListener('keydown', function(event) {
          event.key === 'Enter' && _this.show(i);
          event.key === 'ArrowRight' && _this.show(_this.index + 1);
          event.key === 'ArrowLeft' && _this.show(_this.index - 1);
        });
      };

      for (let i = 0; i < listEl.children.length; i++) {
        _loop(i);
      }
    }

    function __getIndex(all, item) {
      let index;

      for (let i = 0; i < all.length; i++) {
        if (all[i].isEqualNode(item)) {
          index = i;
          break;
        }
      }

      return index;
    }

    var HCECarousel =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCECarousel, _HTMLCustomElement);

  function HCECarousel() {
    _classCallCheck(this, HCECarousel);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCECarousel).apply(this, arguments));
  }

  _createClass(HCECarousel, [{
    key: 'connectedCallback',
    // selected                  // default selected index
    // listEl: HTMLElement       // list to scroll
    // shortcutsEl: HTMLElement  // list of shortcuts
    // inviewEl: Element         // currently visible element
    // index: number             // currently selected index
    value: function connectedCallback() {
      const _this2 = this;

      this.renderWith(html, _carousel_css__WEBPACK_IMPORTED_MODULE_1___default.a).then(function(_) {
        _this2.listEl = _this2.querySelector('ul:not(.shortcuts), ol, .list');

        _this2.listEl.classList.add('carousel-list');

        _this2.shortcutsEl = _this2.querySelector('ul.shortcuts');

        __addShortcuts.bind(_this2)(_this2.shortcutsEl, _this2.listEl);

        _this2.listEl && setTimeout(function(_) {
          return _this2.show(_this2.selected || 0);
        }, 1000);
      });
    }
  }, {
    key: 'show',
    value: function show(what) {
      // index, or element
      const prevTabIndexedEl = this.listEl.querySelector('[tabindex]');
      let scrollToEl = what;

      if (typeof what === 'number') {
        this.index = (this.listEl.children.length + what) % this.listEl.children.length;
        scrollToEl = this.listEl.children[this.index];
      }

      this.index = __getIndex(this.listEl.children, scrollToEl); // setTimeout(_ => scrollToEl.scrollIntoView({behavior: 'smooth'}) ); // this moves page to scroll

      this.listEl.scrollLeft = Math.max(0, scrollToEl.offsetLeft - (this.listEl.offsetWidth - scrollToEl.offsetWidth) / 2); // set shortcuts

      if (this.shortcutsEl.offsetParent) {
        // if visible
        const prevActiveShortcut = this.shortcutsEl.querySelector('.active');
        const shortcutEl = this.shortcutsEl.children[this.index];
        prevActiveShortcut && prevActiveShortcut.classList.remove('active');
        shortcutEl.classList.add('active'); // shortcutEl.focus();
      } // set tabindex for accessibility


      prevTabIndexedEl && prevTabIndexedEl.removeAttribute('tabindex');
      scrollToEl.setAttribute('tabindex', 0);
      this.inviewEl = scrollToEl;
    }
  }]);

  return HCECarousel;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);
    HCECarousel.define('hce-carousel', HCECarousel);
    /** */}),

  /** */ './src/collapsible/collapsible.css':
  /* !*****************************************!*\
  !*** ./src/collapsible/collapsible.css ***!
  \*****************************************/
  /* ! no static exports found */
  /** */ (function(module, exports) {
    module.exports = ':root {\n  border: 1px solid #ccc;\n  display: block;\n}\n:root * {\n  box-sizing: border-box;\n}\n.hce-header {\n  padding: 12px;\n  cursor: pointer;\n  color: #FFF;\n  background: #333;\n}\n:not(.expanded) .hce-body {\n  max-height: 1px; \n  overflow: hidden;\n}\n.expanded .hce-body {\n  transition: max-width .25s ease-in-out, max-height .25s ease-in-out;\n  max-height: 2000px; \n  padding: 12px;\n}\n\n:root.horizontal {\n  display: flex;\n  border-radius: 4px;\n  border: 1px solid #ccc;\n  overflow: hidden;\n}\n:root.horizontal > * {\n  display: flex;\n}\n:root.horizontal .hce-header {\n  word-wrap: break-word;\n  height: 100%;\n  padding: 12px;\n  writing-mode: vertical-rl;\n  text-orientation: upright;\n}\n:root.horizontal .hce-header:empty {\n  padding: 4px;\n}\n:root.horizontal :not(.expanded) .hce-body {\n  height: 100%;\n  max-width: 1px;\n}\n:root.horizontal .expanded {\n  width: 100%;\n}\n:root.horizontal .expanded .hce-body {\n  width: 100%;\n  max-width: 2000px;\n  flex: 1;\n}\n\n:root.horizontal :not(.expanded).sidebar {\n  max-width: 10px;\n}\n:root.horizontal .expanded.sidebar {\n  max-width: 280px;\n}\n';
    /** */}),

  /** */ './src/collapsible/collapsible.js':
  /* !****************************************!*\
  !*** ./src/collapsible/collapsible.js ***!
  \****************************************/
  /* ! exports provided: HCECollapsible */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'HCECollapsible', function() {
      return HCECollapsible;
    });
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _collapsible_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! ./collapsible.css */ './src/collapsible/collapsible.css');
    /* harmony import */ const _collapsible_css__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__*/__webpack_require__.n(_collapsible_css__WEBPACK_IMPORTED_MODULE_1__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    var HCECollapsible =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCECollapsible, _HTMLCustomElement);

  function HCECollapsible() {
    _classCallCheck(this, HCECollapsible);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCECollapsible).apply(this, arguments));
  }

  _createClass(HCECollapsible, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      const _this = this;

      this.renderWith(null, _collapsible_css__WEBPACK_IMPORTED_MODULE_1___default.a).then(function(_) {
        _this.init();
      });
    }
  }, {
    key: 'init',
    value: function init() {
      Array.from(this.querySelectorAll('.hce-header')).forEach(function(header) {
        header.setAttribute('tabindex', 0);
        header.addEventListener('click', function(_) {
          header.parentElement.classList.toggle('expanded');
        });
        header.addEventListener('keydown', function(event) {
          if (event.keyCode === 32) {
            header.parentElement.classList.toggle('expanded');
            event.preventDefault();
          }
        });
      });
    }
  }]);

  return HCECollapsible;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);
    HCECollapsible.define('hce-collapsible', HCECollapsible);
    /** */}),

  /** */ './src/dialog/dialog.css':
  /* !*******************************!*\
  !*** ./src/dialog/dialog.css ***!
  \*******************************/
  /* ! no static exports found */
  /** */ (function(module, exports) {
    module.exports = ':root {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n:root.visible {\n  display: block;\n  z-index: 24;\n}\n\n:root:not(.visible) {\n  display: none;\n}\n\n> .page-blocker {\n  position: absolute; /* fixed */\n  background-color: #000;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: .5;\n  top: 0;\n}\n\n> .dialog {\n  padding: 24px;\n  position: absolute; /* fixed */\n  left: 50%;\n  top: 50%;\n  -ms-transform: translate(-50%,-50%);\n  -moz-transform:translate(-50%,-50%);\n  -webkit-transform: translate(-50%,-50%);\n  transform: translate(-50%,-50%);\n  min-width: 280px; /* 56 x 5 */\n  max-width: calc(100% - 80px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0  6px  6px rgba(0,0,0,0.23);\n  border: 1px solid #eeeeee;\n  border-radius: 2px;\n  background-color: #ffffff;\n}\n\n> .dialog > .close {\n  border: none;\n  font-size: 1.5em;\n  position: absolute;\n  top: 0;\n  right: 0;\n  color: #999;\n}\n\n> .dialog > .divider {\n  display: block;\n  margin: 0px -24px;\n  height: 1px;\n  border: 1px solid #ccc;\n  border-width: 0 0 1px 0;\n}\n\n> .dialog > .title {\n  color: #212121;\n  padding-bottom: 20px;\n  font-size: 20px;\n  font-weight: 500;\n  margin: 0;\n}\n\n> .dialog > .content {\n  padding-bottom: 24px;\n  color: #9e9e9e;\n}\n\n> .dialog > .actions {\n  padding: 8px;\n  margin-right: -16px;\n  margin-bottom: -16px;\n  text-align: center;\n}\n\n> .dialog > .actions:empty {\n  display: none;\n}\n\n> .dialog > .actions > * {\n  height: 32px;\n}\n  ';
    /** */}),

  /** */ './src/dialog/dialog.js':
  /* !******************************!*\
  !*** ./src/dialog/dialog.js ***!
  \******************************/
  /* ! exports provided: HCEDialog */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'HCEDialog', function() {
      return HCEDialog;
    });
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _dialog_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! ./dialog.css */ './src/dialog/dialog.css');
    /* harmony import */ const _dialog_css__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__*/__webpack_require__.n(_dialog_css__WEBPACK_IMPORTED_MODULE_1__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    const html = '\n  <div class="page-blocker" (click)="close()"></div>\n\n  <div class="dialog">\n    <button class="close" (click)="close()">&times;</button>\n    <div class="title">{{title}}</div>\n    <hce-content></hce-content>\n    <div class="actions"></div>\n  </div>\n';
    var HCEDialog =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCEDialog, _HTMLCustomElement);

  function HCEDialog() {
    _classCallCheck(this, HCEDialog);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEDialog).apply(this, arguments));
  }

  _createClass(HCEDialog, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.renderWith(html, _dialog_css__WEBPACK_IMPORTED_MODULE_1___default.a).then(function(_) {// console.log(this.title, this.options);
      });
    }
  }, {
    key: 'open',
    value: function open() {
      const _this = this;

      this.querySelector('.title').innerHTML = this.dialogTitle || '';

      if (this.actions !== undefined) {
        const actionsEl = this.querySelector('.actions');
        actionsEl.innerHTML = '';
        this.actions.forEach(function(action) {
          const buttonEl = document.createElement('button');
          buttonEl.innerHTML = action.text;
          buttonEl.addEventListener('click', action.handler.bind(_this));
          actionsEl.appendChild(buttonEl);
        });
      }

      this.classList.add('visible');
    }
  }, {
    key: 'close',
    value: function close() {
      this.classList.remove('visible');
    }
  }]);

  return HCEDialog;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);
    HCEDialog.define('hce-dialog', HCEDialog);
    /** */}),

  /** */ './src/draggable/draggable.js':
  /* !************************************!*\
  !*** ./src/draggable/draggable.js ***!
  \************************************/
  /* ! exports provided: HCEDraggable */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'HCEDraggable', function() {
      return HCEDraggable;
    });
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _get(target, property, receiver) {
      if (typeof Reflect !== 'undefined' && Reflect.get) {
        _get = Reflect.get;
      } else {
        _get = function _get(target, property, receiver) {
          const base = _superPropBase(target, property); if (!base) return; const desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) {
            return desc.get.call(receiver);
          } return desc.value;
        };
      } return _get(target, property, receiver || target);
    }

    function _superPropBase(object, property) {
      while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object); if (object === null) break;
      } return object;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    var HCEDraggable =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCEDraggable, _HTMLCustomElement);

  function HCEDraggable() {
    _classCallCheck(this, HCEDraggable);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEDraggable).apply(this, arguments));
  }

  _createClass(HCEDraggable, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      const _this = this;

      this.dragStart; // properties when drag started e.g. {el, el, x: 120, y: 80} in pixel

      this.dropTo; // dropaable element selector. e.g. #drop-to

      this.dropEl; // drop enabled element. default document.body

      this.setAttribute('draggable', 'true'); // this allows to drag

      this._dragoverHandler = this.onDragover.bind(this);
      this._dragleaveHandler = this.onDragleave.bind(this);
      this._dropHandler = this.onDrop.bind(this);
      this.renderWith().then(function(_) {
        // set user-given properties
        _this.addEventListener('dragstart', _this.onDragstart.bind(_this));

        _this.dropTo = _this.dropTo || _this.parentElement.getAttribute('drop-to');
        _this.dropEl = _this.dropTo ? document.querySelector(_this.dropTo) : document.body;

        _this.dropEl.addEventListener('drop', _this._dropHandler);

        _this.dropEl.addEventListener('dragover', _this._dragoverHandler);

        _this.dropEl.addEventListener('dragleave', _this._dragleaveHandler);
      });
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      _get(_getPrototypeOf(HCEDraggable.prototype), 'disconnectedCallback', this).call(this);

      this.dropEl.removeEventListener('drop', this._dropHandler);
      this.dropEl.removeEventListener('dragover', this._dragoverHandler);
      this.dropEl.removeEventListener('dragleave', this._dragleaveHandler);
    }
  }, {
    key: 'onDragstart',
    value: function onDragstart(event) {
      event.dataTransfer.setData('Text', event.target.id); // id of dropping element

      this.dragStart = {
        el: this,
        x: event.clientX,
        y: event.clientY
      };
      const bcr = this.getBoundingClientRect();
      this.dispatchEvent(Object(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['createCustomEvent'])('drag-start'));
    }
  }, {
    key: 'onDragover',
    value: function onDragover(event) {
      event.preventDefault ? event.preventDefault() : event.returnValue = false; // MUST! allows it to drop

      this.dropTo && this.dropEl.classList.add('on-dragover');
    }
  }, {
    key: 'onDragleave',
    value: function onDragleave(event) {
      this.dropTo && this.dropEl.classList.remove('on-dragover');
    }
  }, {
    key: 'onDrop',
    value: function onDrop(event) {
      // this happens on body
      if (this.dropTo) {
        this.dropEl.classList.remove('on-dragover');
      } else if (this.dragStart && this.dragStart.el.isEqualNode(this)) {
        // in case of multiple draggables
        this.move(event);
      }

      this.dragStart = undefined;
    }
  }, {
    key: 'move',
    value: function move(event) {
      const move = {
        x: event.clientX - this.dragStart.x,
        y: event.clientY - this.dragStart.y
      };
      const bcr = this.getBoundingClientRect();
      this.style.position = 'absolute';
      this.style.top = window.scrollY + parseInt(bcr.top) + move.y + 'px';
      this.style.left = window.scrollX + parseInt(bcr.left) + move.x + 'px';
    }
  }]);

  return HCEDraggable;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);
    HCEDraggable.define('hce-draggable', HCEDraggable);
    /** */}),

  /** */ './src/drawer/drawer.css':
  /* !*******************************!*\
  !*** ./src/drawer/drawer.css ***!
  \*******************************/
  /* ! no static exports found */
  /** */ (function(module, exports) {
    module.exports = ':root {\n  display: block;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 13;\n}\n\n:root.visible {\n  visibility: visible;\n}\n\n:root:not(.visible) {\n  visibility: hidden;\n}\n\n:root.visible .contents {\n  left: 0;\n  transform: translateX(0);\n  transition: all .3s ease-in;\n}\n\n:root:not(.visible) .contents {\n  left: -241px;\n  transform: translateX(0);\n  transition: all .2s ease-out;\n}\n\n.page-blocker {\n  position: fixed;\n  background-color: #000;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: .5;\n  top: 0;\n  z-index: 13;\n}\n\n.contents {\n  background-color: #ffffff;\n  box-shadow: 0   3px  6px rgba(0,0,0,0.18), 0  3px  6px rgba(0,0,0,0.23);\n  color: #212121;\n  display: block;\n  height: 100%; \n  left: 0;\n  max-width: 280px;\n  overflow: auto;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: calc(100vw - 56px);\n  z-index: 16;\n}';
    /** */}),

  /** */ './src/drawer/drawer.js':
  /* !******************************!*\
  !*** ./src/drawer/drawer.js ***!
  \******************************/
  /* ! exports provided: HCEDrawer */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'HCEDrawer', function() {
      return HCEDrawer;
    });
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _drawer_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! ./drawer.css */ './src/drawer/drawer.css');
    /* harmony import */ const _drawer_css__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__*/__webpack_require__.n(_drawer_css__WEBPACK_IMPORTED_MODULE_1__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    const html = '\n  <div class="page-blocker"></div>\n  <div class="contents"><hce-content></hce-content></div>\n';
    var HCEDrawer =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCEDrawer, _HTMLCustomElement);

  function HCEDrawer() {
    _classCallCheck(this, HCEDrawer);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEDrawer).apply(this, arguments));
  }

  _createClass(HCEDrawer, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      const _this = this;

      this.renderWith(html, _drawer_css__WEBPACK_IMPORTED_MODULE_1___default.a).then(function(_) {
        _this.querySelector('.page-blocker').addEventListener('click', function(_) {
          return _this.hide();
        });
      });
    }
  }, {
    key: 'show',
    value: function show() {
      this.classList.add('visible');
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.classList.remove('visible');
    }
  }]);

  return HCEDrawer;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);
    HCEDrawer.define('hce-drawer', HCEDrawer);
    /** */}),

  /** */ './src/dyn-contents/dyn-contents.js':
  /* !******************************************!*\
  !*** ./src/dyn-contents/dyn-contents.js ***!
  \******************************************/
  /* ! exports provided: HCEDynamicContents */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'HCEDynamicContents', function() {
      return HCEDynamicContents;
    });
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    function getRoutesFromChildren(el) {
      const routes = [];
      Array.from(el.children).forEach(function(child) {
        const match = child.getAttribute('url-match');
        const url = child.getAttribute('import');
        const isDefault = child.getAttribute('default') !== null;

        if (match && url) {
          routes.push({
            match: new RegExp(match),
            import: url,
            default: isDefault
          });
        }
      });
      return routes;
    }

    function getRoute(routes, url) {
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];

        if (url.match(route.match)) {
          return route;
        }
      }

      const defaultRoute = routes.filter(function(el) {
        return el.default;
      })[0] || routes[0];
      return defaultRoute;
    }

    function setInnerHTML(elm, html) {
      elm.innerHTML = html;
      Array.from(elm.querySelectorAll('script')).forEach(function(el) {
        const newEl = document.createElement('script');
        Array.from(el.attributes).forEach(function(el) {
          newEl.setAttribute(el.name, el.value);
        });
        newEl.appendChild(document.createTextNode(el.innerHTML));
        el.parentNode.replaceChild(newEl, el);
      });
    }

    var HCEDynamicContents =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCEDynamicContents, _HTMLCustomElement);

  function HCEDynamicContents() {
    _classCallCheck(this, HCEDynamicContents);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEDynamicContents).apply(this, arguments));
  }

  _createClass(HCEDynamicContents, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.routes = getRoutesFromChildren(this);
      const supportsPopState = window.navigator.userAgent.indexOf('Trident') === -1;
      const popstate = supportsPopState ? 'popstate' : 'hashchange';
      this.popStateHandler(); // load the contents

      window.addEventListener(popstate, this.popStateHandler.bind(this));
    }
  }, {
    key: 'popStateHandler',
    value: function popStateHandler(event) {
      const _this = this;

      const route = getRoute(this.routes, window.location.href);

      if (route) {
        window.fetch(route.import).then(function(response) {
          if (!response.ok) {
            throw Error('[hce-dyn-contents] import url: '.concat(route.import, ', status: ').concat(response.statusText));
          }

          return response.text();
        }).then(function(html) {
          setInnerHTML(_this, html);
          setTimeout(function(_) {
            return window.scrollTo(0, 0);
          });
        });
      }
    }
  }]);

  return HCEDynamicContents;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);
    html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement'].define('hce-dyn-contents', HCEDynamicContents);
    /** */}),

  /** */ './src/dyn-list/dyn-list.js':
  /* !**********************************!*\
  !*** ./src/dyn-list/dyn-list.js ***!
  \**********************************/
  /* ! exports provided: HCEDynList */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'HCEDynList', function() {
      return HCEDynList;
    });
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }

    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }


    function __objectToArray(obj) {
      const ret = [];

      for (const key in obj) {
        const item = _typeof(obj[key]) === 'object' ? Object.assign(obj[key], {
          key: key
        }) : {
          key: key,
          value: obj[key]
        };
        ret.push(item);
      }

      return ret;
    }

    const html = '\n  <div class="list"></div>\n';
    const css = '\n  :root.overlay:before {            /* Needed to check click outside of overlay */\n    content: \' \';\n    position: fixed;\n    top: 0; left: 0; right: 0; bottom: 0;\n    background: transparent;\n  }\n  :root.overlay .list {\n    background: #fff;\n    position: absolute;\n    padding: 4px;\n    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, .14),\n      0px 1px 1px 0px rgba(0, 0, 0, .12), \n      0px 2px 1px -1px rgba(0, 0, 0, .4);\n    z-index: 1;\n  }\n';
    var HCEDynList =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCEDynList, _HTMLCustomElement);

  function HCEDynList() {
    _classCallCheck(this, HCEDynList);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEDynList).apply(this, arguments));
  }

  _createClass(HCEDynList, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      const _this = this;

      const templateEl = this.children[0];
      this.template = templateEl && templateEl.outerHTML;
      templateEl.style.display = 'none';
      this.renderWith(html, css).then(function(_) {
        if (_this.visibleBy) {
          const source = _this.getAttribute('[source]') || _this.getAttribute('source');

          const expression = source.match(/[^\(]+/)[0];
          _this.sourceFunc = new Function('return '.concat(expression, ';'));
        }

        _this.visibleBy && _this.setBehaviourOfVisibleBy(_this.visibleBy, _this);
      });
    }
  }, {
    key: 'setBehaviourOfVisibleBy',
    value: function setBehaviourOfVisibleBy(visibleBy) {
      const _this2 = this;

      if (visibleBy && !document.querySelector(visibleBy)) {
        console.error('[hce-dyn-list] element not found by selector', visibleBy);
        return false;
      }

      const inputEl = document.querySelector(visibleBy);
      inputEl.setAttribute('autocomplete', 'off');
      inputEl.parentElement.style.position = 'relative';
      let timeout = null;
      inputEl.addEventListener('keyup', function(_) {
        const result = _this2.sourceFunc()();

        if (result) {
          clearTimeout(timeout);
          timeout = setTimeout(function(_) {
            _this2.classList.add('overlay');

            result.then(function(src) {
              _this2.source = src;
              _this2.style.display = 'block';
            });
          }, 100); // keyboard delay for .5 second
        } else {
          _this2.source = [];
        }
      });
      this.style.display = 'none';
      this.addEventListener('click', function(_) {
        if (_this2.isEqualNode(event.target)) {
          _this2.style.display = 'none';
        }
      });
    }
  }, {
    key: '__setList',
    value: function __setList() {
      const _this3 = this;

      const promise = this.source.then ? this.source : Promise.resolve(this.source);
      promise.then(function(src) {
        src = src instanceof Array ? src : __objectToArray(src);
        src.forEach(function(item) {
          const html = _this3.template.replace(/{{(.*?)}}/g, function($0, expr) {
            const func = new Function('return this.'.concat(expr)).bind(item);
            return func();
          });

          const frag = document.createRange().createContextualFragment(html);
          const itemEl = frag.querySelector('*');

          const listSelected = function listSelected(event) {
            const custEvent = Object(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['createCustomEvent'])('selected', {
              detail: item
            });

            _this3.dispatchEvent(custEvent);

            _this3.visibleBy && (_this3.style.display = 'none');
          };

          itemEl.addEventListener('click', listSelected);
          itemEl.addEventListener('keydown', function(event) {
            return event.key === 'Enter' && listSelected(event);
          });
          itemEl.setAttribute('tabindex', 0);

          _this3.querySelector('.list').appendChild(itemEl);
        });
      });
    }
  }, {
    key: 'source',
    get: function get() {
      return this.__source;
    },
    set: function set(source) {
      this.__source = source;
      this.querySelector('.list') && (this.querySelector('.list').innerHTML = '');

      if (source) {
        this.__setList();
      }
    }
  }]);

  return HCEDynList;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);
    HCEDynList.define('hce-dyn-list', HCEDynList);
    /** */}),

  /** */ './src/file/file.js':
  /* !**************************!*\
  !*** ./src/file/file.js ***!
  \**************************/
  /* ! exports provided: HCEFile */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'HCEFile', function() {
      return HCEFile;
    });
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    const fileSVG = 'data:image/svg+xml;utf8,\n  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52">\n    <path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625\n      2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z ">\n    </path>\n    <text x="10" y="35" class="small">SVG</text>\n  </svg>';
    const html = '\n  <label class="file-zone" tabindex="0">\n    {{placeholder}}\n    <input type="file" multiple="{{multiple}}"/>\n  </label>\n  <hce-content></hce-content>\n  <ul class="preview"></ul>\n';
    const css = '\n  :root {\n    text-align: center;\n    display: inline-block;\n    margin: 24px;\n    padding: 24px;\n    background: #ccc;\n  }\n  :root:hover { background: #eee; }\n  :root.ready {background: rgba(255, 255, 0, 0.5)}\n  .file-zone {cursor: pointer; padding: 4px}\n  .file-zone input {display: none;}\n  .preview { display: flex; align-items: center; justify-content: center; }\n  .preview:empty { display: none;}\n';

    function __setReady(ready) {
      return function(event) {
        event.preventDefault();
        this.classList[ready ? 'add' : 'remove']('ready');
      };
    }

    ;
    var HCEFile =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCEFile, _HTMLCustomElement);

  function HCEFile() {
    _classCallCheck(this, HCEFile);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEFile).apply(this, arguments));
  }

  _createClass(HCEFile, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      const _this = this;

      this.placeholder = 'Drag, Paste, or Select a File Here';
      this.fileTypes;
      this.renderWith(html, css).then(function(_) {
        _this.setEventListener();
      });
    }
  }, {
    key: 'setEventListener',
    value: function setEventListener() {
      this.addEventListener('dragover', __setReady(1).bind(this));
      this.addEventListener('dragleave', __setReady(0).bind(this));
      this.addEventListener('drop', this.onFilesChange);
      this.addEventListener('paste', this.onFilesChange);
      this.querySelector('.file-zone input').addEventListener('change', this.onFilesChange.bind(this));
    }
  }, {
    key: 'onFilesChange',
    value: function onFilesChange(event) {
      event.preventDefault();
      this.classList.remove('ready');

      if (event.clipboardData) {
        const files = [];

        for (let i = 0; i < event.clipboardData.items.length; i++) {
          const file = event.clipboardData.items[i].getAsFile();
          file && files.push(file);
        }

        this.files = files;
      } else if (event.dataTransfer) {
        this.files = Array.from(event.dataTransfer.files);
      } else {
        this.files = Array.from(event.target.files);
      }
    }
  }, {
    key: 'showPreview',
    value: function showPreview() {
      const _this2 = this;

      const preview = this.querySelector('.preview');
      preview.innerHTML = '';

      const _loop = function _loop(i) {
        const file = _this2.files[i];
        const li = document.createElement('li');
        const img = document.createElement('img');

        if (file.type.match(/image/)) {
          img.src = window.URL.createObjectURL(file);

          img.onload = function() {
            img.width = this.width;
            img.height = this.height;
            window.URL.revokeObjectURL(this.src);
          };
        } else {
          img.src = fileSVG.replace('SVG', file.name.match(/\.(.*)$/)[1].toUpperCase());
        }

        li.appendChild(img);
        const info = document.createElement('span');
        info.innerHTML = file.name + ': ' + file.size + ' bytes';
        li.appendChild(info);
        preview.appendChild(li);
      };

      for (let i = 0; i < this.files.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'files',
    get: function get() {
      return this.__files;
    },
    set: function set(files) {
      if (files.length > 0) {
        this.__files = files;
        const custEvent = Object(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['createCustomEvent'])('files-change', {
          detail: files
        });
        this.dispatchEvent(custEvent);
        this.preview !== false && this.showPreview();
      }
    }
  }]);

  return HCEFile;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);
    HCEFile.define('hce-file', HCEFile);
    /** */}),

  /** */ './src/index.js':
  /* !**********************!*\
  !*** ./src/index.js ***!
  \**********************/
  /* ! exports provided: time */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const _dyn_contents_dyn_contents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! ./dyn-contents/dyn-contents */ './src/dyn-contents/dyn-contents.js');
    /* harmony import */ const _tooltip_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! ./tooltip/tooltip */ './src/tooltip/tooltip.js');
    /* harmony import */ const _tabs_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/* ! ./tabs/tabs */ './src/tabs/tabs.js');
    /* harmony import */ const _loading_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/* ! ./loading/loading */ './src/loading/loading.js');
    /* harmony import */ const _carousel_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/* ! ./carousel/carousel */ './src/carousel/carousel.js');
    /* harmony import */ const _snackbar_snackbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/* ! ./snackbar/snackbar */ './src/snackbar/snackbar.js');
    /* harmony import */ const _drawer_drawer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/* ! ./drawer/drawer */ './src/drawer/drawer.js');
    /* harmony import */ const _dialog_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/* ! ./dialog/dialog */ './src/dialog/dialog.js');
    /* harmony import */ const _calendar_calendar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/* ! ./calendar/calendar */ './src/calendar/calendar.js');
    /* harmony import */ const _dyn_list_dyn_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/* ! ./dyn-list/dyn-list */ './src/dyn-list/dyn-list.js');
    /* harmony import */ const _overlay_overlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/* ! ./overlay/overlay */ './src/overlay/overlay.js');
    /* harmony import */ const _menu_menu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/* ! ./menu/menu */ './src/menu/menu.js');
    /* harmony import */ const _file_file__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/* ! ./file/file */ './src/file/file.js');
    /* harmony import */ const _sticky_sticky__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/* ! ./sticky/sticky */ './src/sticky/sticky.js');
    /* harmony import */ const _draggable_draggable__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/* ! ./draggable/draggable */ './src/draggable/draggable.js');
    /* harmony import */ const _collapsible_collapsible__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/* ! ./collapsible/collapsible */ './src/collapsible/collapsible.js');
    /* harmony import */ const _utils_show_overlay__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/* ! ./utils/show-overlay */ './src/utils/show-overlay.js');
    /* harmony import */ const _utils_time__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/* ! ./utils/time */ './src/utils/time.js');
    /* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, 'time', function() {
      return _utils_time__WEBPACK_IMPORTED_MODULE_17__['time'];
    });


    // time formatter e.g. time().format('yyyy-mm-dd')
    /** */}),

  /** */ './src/loading/loading.js':
  /* !********************************!*\
  !*** ./src/loading/loading.js ***!
  \********************************/
  /* ! no exports provided */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }

    // from https://icons8.com/preloaders/

    const svg = '\n  <svg width="64px" height="64px" viewBox="0 0 128 128"  xml:space="preserve"><g>\n    <circle cx="16" cy="64" r="16" fill="%23000000" fill-opacity="1"/>\n    <circle cx="16" cy="64" r="16" fill="%23555555" fill-opacity="0.67" transform="rotate(45,64,64)"/>\n    <circle cx="16" cy="64" r="16" fill="%23949494" fill-opacity="0.42" transform="rotate(90,64,64)"/>\n    <circle cx="16" cy="64" r="16" fill="%23cccccc" fill-opacity="0.2" transform="rotate(135,64,64)"/>\n    <animateTransform attributeName="transform" type="rotate" \n      calcMode="discrete" dur="720ms" repeatCount="indefinite"\n      values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64">\n    </animateTransform>\n  </g></svg>';
    const css = '\n  :root {\n    display: flex; \n    position: absolute;\n    align-items: center; \n    justify-content: center;\n    background: #fff;\n    opacity: 0.5;\n    width: 100%; height: 100%;\n    top:0; left: 0;\n  }\n  :root > *:first-child {\n    width: 100%;\n    height: 100%;\n    max-width: 64px;\n  }\n';

    const HCELoading =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCELoading, _HTMLCustomElement);

  function HCELoading() {
    _classCallCheck(this, HCELoading);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCELoading).apply(this, arguments));
  }

  _createClass(HCELoading, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      const _this = this;

      this.timer;
      this.renderWith(null, css).then(function(_) {
        !_this.innerHTML.trim() && (_this.innerHTML = svg);
        typeof _this.loading === 'string' ? _this.show() : _this.hide();
        console.log('....................', _this.timeout);
      });
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, oldValue, newValue) {
      name === 'loading' && typeof newValue === 'string' ? this.show() : this.hide();
    }
  }, {
    key: 'show',
    value: function show() {
      const _this2 = this;

      this.style.display = 'flex';
      this.timer = this.timeout && setTimeout(function(_) {
        _this2.dispatchEvent(Object(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['createCustomEvent'])('timedout'));

        _this2.hide();
      }, this.timeout * 1000);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.removeAttribute('loading');
      clearTimeout(this.timer);
      this.style.display = 'none';
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['loading'];
    }
  }]);

  return HCELoading;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);

    HCELoading.define('hce-loading', HCELoading);
    /** */}),

  /** */ './src/menu/menu.css':
  /* !***************************!*\
  !*** ./src/menu/menu.css ***!
  \***************************/
  /* ! no static exports found */
  /** */ (function(module, exports) {
    module.exports = '  a { text-decoration: none; white-space: nowrap; text-transform: uppercase }\n  li[disabled] {opacity: 0.5;}\n\n  /* submenu */\n  li > ul { display: none; } /* hide all submenus in default */\n  li:not([disabled]).has-submenu:hover > ul { display: block;}\n  li:not([disabled]).has-submenu:focus > ul { display: block;}\n  li:not([disabled]).has-submenu.submenu-open > ul { display: block;}\n\n  /* basic styles */\n  :root.basic a { transition: all .2s; color: inherit }\n  :root.basic a:hover { color: #fff }\n  :root.basic ul { margin: 0; padding: 0; list-style: none; background: #333; color: #fff }\n  :root.basic li { padding: 8px; position: relative; color: #aaa; }\n\n  :root.basic > ul > li { padding: 15px; }   \n  :root.basic > ul > li:after, :root.basic > ul > li:after { \n    content: \' \'; display: block; position: absolute; bottom: 4px; left: 0;\n    width: 100%; height: 2px; opacity: 0; background: #0FF; \n  }\n  :root.basic > ul > li:hover:after, :root.basic > ul > li:focus:after { \n    opacity: 1; transition:all .5s;\n  }\n  :root.basic > ul > li.selected  { color: #fff; }\n  :root.basic li ul{ position: absolute; }  /* submenu items */\n\n  :root.top > ul { display: flex; justify-content: space-around }\n  :root.top li > ul ul { top: 1px; left: calc(100% + 1px); } /* submenu items */\n  :root.top li > ul { top: calc(100% + 1px); left: 0;}\n\n  :root.bottom > ul { display: flex; justify-content: space-around }\n  :root.bottom li > ul ul { bottom: 0; left: calc(100% + 1px); } /* submenu items */\n  :root.bottom li > ul { bottom: calc(100% + 1px); left: 0;}     /* submenu items */\n\n  :root.left > ul { display: inline-block; }       \n  :root.left li > ul {top: 0; left: calc(100% + 1px);}   /* submenu items */\n\n  :root.right > ul { display: inline-block; }\n  :root.right li > ul {top: 0; right: calc(100% + 1px);} /* submenu items */';
    /** */}),

  /** */ './src/menu/menu.js':
  /* !**************************!*\
  !*** ./src/menu/menu.js ***!
  \**************************/
  /* ! no exports provided */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _menu_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! ./menu.css */ './src/menu/menu.css');
    /* harmony import */ const _menu_css__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__*/__webpack_require__.n(_menu_css__WEBPACK_IMPORTED_MODULE_1__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    const html = '\n<nav role="navigation">\n  <hce-content></hce-content>\n</nav>\n';

    const HCEMenu =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCEMenu, _HTMLCustomElement);

  function HCEMenu() {
    _classCallCheck(this, HCEMenu);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEMenu).apply(this, arguments));
  }

  _createClass(HCEMenu, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      const _this = this;

      this.renderWith(null, _menu_css__WEBPACK_IMPORTED_MODULE_1__).then(function(_) {
        _this.setAccessibility();
      });
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, oldValue, newValue) {
      name === 'selected-index' && (this.selectedIndex = parseInt(newValue));
    }
  }, {
    key: 'setAccessibility',
    value: function setAccessibility() {
      const liEls = this.querySelectorAll('li');
      Array.from(liEls).forEach(function(liEl) {
        if (liEl.querySelector('ul')) {
          // if submenu exists
          liEl.classList.add('has-submenu');
          liEl.setAttribute('tabindex', 0); // make it as an action item

          const aEls = liEl.querySelectorAll('a'); // control show/hide by class 'submenu-open'

          liEl.addEventListener('blur', function(_) {
            return liEl.classList.remove('submenu-open');
          });
          Array.from(aEls).forEach(function(aEl) {
            aEl.addEventListener('focus', function(_) {
              return liEl.classList.add('submenu-open');
            });
            aEl.addEventListener('blur', function(_) {
              setTimeout(function(_) {
                // next focus needs time
                const focused = liEl.querySelector(':focus');
                !focused && liEl.classList.remove('submenu-open');
              }, 10);
            });
          });
        }
      });
    }
  }, {
    key: 'selectedIndex',
    get: function get() {
      return this.__selectedIndex;
    },
    set: function set(selectedIndex) {
      this.__selectedIndex = selectedIndex;
      Array.from(this.querySelectorAll('ul > li')).forEach(function(liEl, ndx) {
        const func = ndx === selectedIndex ? 'add' : 'remove';
        liEl.classList[func]('selected');
      });
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['selected-index'];
    }
  }]);

  return HCEMenu;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);

    HCEMenu.define('hce-menu', HCEMenu);
    /** */}),

  /** */ './src/overlay/overlay.js':
  /* !********************************!*\
  !*** ./src/overlay/overlay.js ***!
  \********************************/
  /* ! no exports provided */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _utils_show_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! ../utils/show-overlay */ './src/utils/show-overlay.js');
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    const css = '\n  :root:before {\n    content: \' \';\n    position: fixed;\n    top: 0; left: 0; right: 0; bottom: 0;\n    background: transparent;\n  }\n  .overlay {\n    background: #fff;\n    padding: 4px;\n    border: 1px solid #ccc;\n    z-index: 1;\n    box-sizing: border-box;\n  }\n';
    const html = '\n  <div class="overlay">\n    <hce-content></hce-content>\n  </div>\n';

    const HCEOverlay =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCEOverlay, _HTMLCustomElement);

  function HCEOverlay() {
    _classCallCheck(this, HCEOverlay);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEOverlay).apply(this, arguments));
  }

  _createClass(HCEOverlay, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      const _this = this;

      this.style.display = 'none';
      this.renderWith(html, css).then(function(_) {
        _this.visibleBy && _this.setBehaviourOfVisibleBy();

        _this.addEventListener('click', function(event) {
          _this.isEqualNode(event.target) && (_this.style.display = 'none');
        });
      });
    }
  }, {
    key: 'setBehaviourOfVisibleBy',
    value: function setBehaviourOfVisibleBy() {
      const actorEl = document.querySelector(this.visibleBy);

      if (actorEl) {
        actorEl.parentElement.style.position = 'relative';
        actorEl.addEventListener('click', this.show.bind(this));
        actorEl.addEventListener('focus', this.show.bind(this));
        actorEl.addEventListener('blur', this.hide.bind(this));
      }
    }
  }, {
    key: 'show',
    value: function show() {
      const _this2 = this;

      // hide all overlays
      Array.from(document.querySelectorAll('hce-overlay')).forEach(function(el) {
        return el.style.display = 'none';
      });
      this.style.display = 'block';
      this.position = this.getAttribute('position') || 'top';
      this.distance = parseInt(this.getAttribute('distance') || 12);
      this.arrow = this.getAttribute('arrow') !== 'false'; // console.log('......', this.position, this.distance, this.arrow)

      setTimeout(function(_) {
        Object(_utils_show_overlay__WEBPACK_IMPORTED_MODULE_1__['showOverlay'])(_this2.querySelector('.overlay'), _this2.position, {
          distance: _this2.distance,
          arrow: _this2.arrow
        });
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      console.log('xxxxxxxxxxxxxxxxxx');
      this.style.display = 'none;';
    }
  }]);

  return HCEOverlay;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);

    HCEOverlay.define('hce-overlay', HCEOverlay);
    /** */}),

  /** */ './src/snackbar/snackbar.css':
  /* !***********************************!*\
  !*** ./src/snackbar/snackbar.css ***!
  \***********************************/
  /* ! no static exports found */
  /** */ (function(module, exports) {
    module.exports = ':root {\n  visibility: hidden;\n  display: block;\n  position: fixed;\n  padding: 14px 24px;\n  min-width: 288px;\n  max-width: 568px;\n  background-color: #323232;\n  font-size: 14px;\n  border-radius: 2px; /* Rounded borders */\n  color: #fff; /* White text color */\n  z-index: 6;\n  text-align: center;\n  transform: translate(-50%);\n  left: 50%;\n  bottom: 0;\n}';
    /** */}),

  /** */ './src/snackbar/snackbar.js':
  /* !**********************************!*\
  !*** ./src/snackbar/snackbar.js ***!
  \**********************************/
  /* ! exports provided: HCESnackbar */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'HCESnackbar', function() {
      return HCESnackbar;
    });
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _snackbar_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! ./snackbar.css */ './src/snackbar/snackbar.css');
    /* harmony import */ const _snackbar_css__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__*/__webpack_require__.n(_snackbar_css__WEBPACK_IMPORTED_MODULE_1__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    const customCss = '\n  @keyframes slideInUp {\n    from { transform: translate3d(0,100%,0)  translate(-50%); opacity: 0; }\n    to { opacity: 1; transform: translateZ(0) translate(-50%); }\n  }\n  @keyframes slideOutDown {\n    from { opacity: 1; transform: translateZ(0) translate(-50%); }\n    to { opacity: 0; transform: translate3d(0,100%,0) translate(-50%); }\n  }';
    var HCESnackbar =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCESnackbar, _HTMLCustomElement);

  function HCESnackbar() {
    _classCallCheck(this, HCESnackbar);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCESnackbar).apply(this, arguments));
  }

  _createClass(HCESnackbar, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.renderWith(null, _snackbar_css__WEBPACK_IMPORTED_MODULE_1___default.a, customCss);
    }
  }, {
    key: 'message',
    set: function set(msg) {
      const _this = this;

      this.innerHTML = this.__message = msg;
      this.style.visibility = 'visible';
      this.style.animation = 'slideInUp 0.5s, slideOutDown 0.5s 2.5s';
      setTimeout(function(_) {
        _this.style.visibility = 'hidden';
        _this.style.animation = 'none';
      }, 3000);
    }
  }]);

  return HCESnackbar;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);
    HCESnackbar.define('hce-snackbar', HCESnackbar);
    /** */}),

  /** */ './src/sticky/sticky.js':
  /* !******************************!*\
  !*** ./src/sticky/sticky.js ***!
  \******************************/
  /* ! exports provided: HCESticky */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'HCESticky', function() {
      return HCESticky;
    });
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    function computedStyle(el, prop) {
      return window.getComputedStyle(el).getPropertyValue(prop);
    }

    const css = '\n  :root {position: absolute; box-sizing: border-box;}\n';

    function __setParentPositioned(el) {
      const parentElPosition = computedStyle(el.parentElement, 'position');

      if (!['absolute', 'fixed', 'relative'].includes(parentElPosition)) {
        el.parentElement.style.position = 'relative';
      }
    }

    var HCESticky =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCESticky, _HTMLCustomElement);

  function HCESticky() {
    _classCallCheck(this, HCESticky);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCESticky).apply(this, arguments));
  }

  _createClass(HCESticky, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      const _this = this;

      __setParentPositioned(this);

      this.renderWith(null, css).then(function(_) {
        _this.bcr = _this.getBoundingClientRect();
        window.addEventListener('scroll', _this.windowScrollHandler.bind(_this));
        window.addEventListener('resize', _this.windowScrollHandler.bind(_this));
      });
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      window.removeEventListener('scroll', this.windowScrollHandler.bind(this));
      window.removeEventListener('resize', this.windowScrollHandler.bind(this));
    } // this is the one

  }, {
    key: 'windowScrollHandler',
    value: function windowScrollHandler(event) {
      const parentBCR = this.parentElement.getBoundingClientRect();
      const top = parentBCR.top >= 0; // const left = parentBCR.left >= 0;
      // const bottom = parentBCR.bottom <=  window.innerHeight;
      // const right =  parentBCR.right <= window.innerWidth;
      // const visible = (top && bottom && left && right);

      if (!top) {
        const max = parentBCR.height - this.bcr.height;
        this.style.top = Math.min(parentBCR.top * -1, max) + 'px';
      } else {
        this.style.top = 0;
      }
    }
  }]);

  return HCESticky;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);
    HCESticky.define('hce-sticky', HCESticky);
    /** */}),

  /** */ './src/tabs/tabs.css':
  /* !***************************!*\
  !*** ./src/tabs/tabs.css ***!
  \***************************/
  /* ! no static exports found */
  /** */ (function(module, exports) {
    module.exports = '  :root {\n    display: block\n  }\n  .tabs {\n    border-bottom: 1px solid #999;\n    display: flex;\n  }\n  .tabs [tab-for] {\n    border: 1px solid #999;\n    background: #EEE;\n    padding: 4px 12px;\n    border-radius: 4px 4px 0 0;\n    position: relative;\n    top: 1px;\n  }\n  .tabs [tab-for].selected {\n    background: #FFF;\n    border-bottom: 1px solid transparent;\n  }\n  .tabs [tab-for][disabled] {\n    opacity: 0.5;\n  }\n\n  .contents [contents-for] {\n    display: none;\n  }\n  .contents [contents-for].selected {\n    display: block;\n  }';
    /** */}),

  /** */ './src/tabs/tabs.js':
  /* !**************************!*\
  !*** ./src/tabs/tabs.js ***!
  \**************************/
  /* ! no exports provided */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_0___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ const _tabs_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! ./tabs.css */ './src/tabs/tabs.css');
    /* harmony import */ const _tabs_css__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__*/__webpack_require__.n(_tabs_css__WEBPACK_IMPORTED_MODULE_1__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    function __select(listEls, indexEl) {
      Array.from(listEls).filter(function(el) {
        return !el.isEqualNode(indexEl);
      }).forEach(function(el) {
        el.classList.remove('selected');
        el.removeAttribute('tabindex');
      });
      indexEl.classList.add('selected');
      indexEl.setAttribute('tabindex', '0');
    }

    function __keydownHandler(e) {
      const propName = e.key === 'ArrowRight' ? 'nextElementSibling' : e.key === 'ArrowLeft' ? 'previousElementSibling' : 'N/A'; // let nextEl = e.target[propName];
      // while (nextEl) {
      //   if (nextEl.getAttribute('disabled')) {
      //     nextEl = nextEl[propName];
      //   } else {
      //     break;
      //   }
      // }

      let nextEl = e.target[propName];

      while (nextEl) {
        if (nextEl.getAttribute('disabled') === null) break;
        nextEl = nextEl[propName];
      }

      if (nextEl) {
        const tabId = nextEl.getAttribute('tab-for');
        this.select(tabId); // select tab and contents
      }
    }

    function __clickHandler(e) {
      const tabId = e.target.getAttribute('tab-for');
      this.select(tabId); // select tab and contents
    }

    const HCETabs =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCETabs, _HTMLCustomElement);

  function HCETabs() {
    _classCallCheck(this, HCETabs);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCETabs).apply(this, arguments));
  }

  _createClass(HCETabs, [{
    key: 'connectedCallback',
    // tabEls: tab index elements with attribute 'tab-for'
    // contentEls: tab contents elements with attribute 'contents-for'
    value: function connectedCallback() {
      const _this = this;

      this.tabEls = this.querySelectorAll('[tab-for]');
      this.contentEls = this.querySelectorAll('[contents-for]');
      this.renderWith(null, _tabs_css__WEBPACK_IMPORTED_MODULE_1__).then(function() {
        _this.select();

        Array.from(_this.tabEls).forEach(function(el) {
          el.addEventListener('click', __clickHandler.bind(_this));
          el.addEventListener('keydown', __keydownHandler.bind(_this));
        });
      });
    }
  }, {
    key: 'select',
    value: function select(tabId) {
      if (!tabId) {
        const _tabEl = this.querySelector('[tab-for].selected') || this.tabEls[0];

        tabId = _tabEl.getAttribute('tab-for');
      }

      const tabEl = this.querySelector('[tab-for='.concat(tabId, ']'));

      if (tabEl.getAttribute('disabled') === null) {
        const contentEl = this.querySelector('[contents-for='.concat(tabId, ']'));

        __select(this.tabEls, tabEl);

        tabEl.focus();

        __select(this.contentEls, contentEl);
      }
    }
  }]);

  return HCETabs;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement']);

    html_custom_element__WEBPACK_IMPORTED_MODULE_0__['HTMLCustomElement'].define('hce-tabs', HCETabs);
    /** */}),

  /** */ './src/tooltip/tooltip.js':
  /* !********************************!*\
  !*** ./src/tooltip/tooltip.js ***!
  \********************************/
  /* ! no exports provided */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const _utils_show_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/* ! ../utils/show-overlay */ './src/utils/show-overlay.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/* ! html-custom-element */ './node_modules/html-custom-element/dist/html-custom-element.umd.js');
    /* harmony import */ const html_custom_element__WEBPACK_IMPORTED_MODULE_1___default = /* #__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_1__);
    function _typeof(obj) {
      if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
        };
      } return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function _defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
      } return _assertThisInitialized(self);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      } return self;
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }; return _getPrototypeOf(o);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      } subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, writable: true, configurable: true}}); if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p; return o;
      }; return _setPrototypeOf(o, p);
    }


    const css = '\n  :root {\n    display: none;\n    background: #1b1f23;\n    border-radius: 4px;\n    min-width: 120px;\n    padding: 6px 12px;\n    z-index: 1;\n    color: #fff;\n  }\n';

    const HCETooltip =
/* #__PURE__*/
function(_HTMLCustomElement) {
  _inherits(HCETooltip, _HTMLCustomElement);

  function HCETooltip() {
    _classCallCheck(this, HCETooltip);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCETooltip).apply(this, arguments));
  }

  _createClass(HCETooltip, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      const _this = this;

      this.renderWith(null, css).then(function() {
        _this.position = _this.position || 'top';

        _this.parentElement.addEventListener('mouseover', _this.show.bind(_this));

        _this.parentElement.addEventListener('mouseout', _this.hide.bind(_this));

        _this.parentElement.addEventListener('focus', _this.show.bind(_this));

        _this.parentElement.addEventListener('blur', _this.hide.bind(_this));

        (_this.visible === '' || _this.visible) && _this.show();
      });
    }
  }, {
    key: 'show',
    value: function show() {
      Object(_utils_show_overlay__WEBPACK_IMPORTED_MODULE_0__['showOverlay'])(this, this.position, {
        distance: this.distance,
        arrow: true
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.style.display = 'none';
    }
  }]);

  return HCETooltip;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_1__['HTMLCustomElement']);

    html_custom_element__WEBPACK_IMPORTED_MODULE_1__['HTMLCustomElement'].define('hce-tooltip', HCETooltip);
    /** */}),

  /** */ './src/utils/show-overlay.js':
  /* !***********************************!*\
  !*** ./src/utils/show-overlay.js ***!
  \***********************************/
  /* ! exports provided: showOverlay */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'showOverlay', function() {
      return showOverlay;
    });
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }

    function _nonIterableRest() {
      throw new TypeError('Invalid attempt to destructure non-iterable instance');
    }

    function _iterableToArrayLimit(arr, i) {
      const _arr = []; let _n = true; let _d = false; let _e = undefined; try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value); if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true; _e = err;
      } finally {
        try {
          if (!_n && _i['return'] != null) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      } return _arr;
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function addArrow(parentEl) {
      const pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top-center, vertical, outside';
      let arrowEl = parentEl.querySelector('.hce-arrow');

      if (!arrowEl) {
        arrowEl = document.createElement('div');
        arrowEl.className = 'hce-arrow';
        arrowEl.innerHTML = ' ';
        arrowEl.style.cssText = '\n      background: inherit;\n      color: inherit;\n      border: inherit;\n      border-width: 0 0 1px 1px;\n      width: 8px;\n      height: 8px;\n      position: absolute;';
        parentEl.appendChild(arrowEl);
      }

      const _pos$split$map = pos.split(',').map(function(el) {
        return (el || '').trim();
      });
      const _pos$split$map2 = _slicedToArray(_pos$split$map, 3);
      const posYX = _pos$split$map2[0];
      const hv = _pos$split$map2[1];
      const inOut = _pos$split$map2[2];

      const _posYX$split = posYX.split('-');
      const _posYX$split2 = _slicedToArray(_posYX$split, 2);
      const posY = _posYX$split2[0];
      const posX = _posYX$split2[1];

      const deg = hv === 'vertical' && posY === 'top' ? '-45' : hv === 'vertical' && posY === 'bottom' ? '135' : hv === 'horizontal' && posX === 'left' ? '-135' : hv === 'horizontal' && posX === 'right' ? '45' : '';
      arrowEl.style.transform = '';
      arrowEl.style.top = '';
      arrowEl.style.left = '';
      arrowEl.style[posY] = '';
      arrowEl.style[posX] = '';
      arrowEl.style.transform = 'rotate(' + deg + 'deg)';

      if (hv === 'vertical') {
        arrowEl.style[posY] = 'calc(100% - 4px)';

        if (posX === 'center') {
          arrowEl.style.left = 'calc(50% - 4px)';
        } else {
          arrowEl.style[posX] = '8px';
        }
      } else if (hv === 'horizontal') {
        arrowEl.style[posX] = 'calc(100% - 4px)';

        if (posY === 'center') {
          arrowEl.style.top = 'calc(50% - 4px)';
        } else {
          arrowEl.style[posY] = '8px';
        }
      }
    }

    function showOverlay(el) {
      let pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top-center, vertical, outside';
      const options = arguments.length > 2 ? arguments[2] : undefined;
      console.log('xxxxxxxxxxxxxxx', el);
      pos = pos === 'top' || pos == 'bottom' ? ''.concat(pos, '-center, vertical, outside') : pos === 'left' || pos == 'right' ? 'center-'.concat(pos, ', horizontal, outside') : pos;

      const _pos$split$map3 = pos.split(',').map(function(el) {
        return (el || '').trim();
      });
      const _pos$split$map4 = _slicedToArray(_pos$split$map3, 3);
      const posYX = _pos$split$map4[0];
      const hv = _pos$split$map4[1];
      const inOut = _pos$split$map4[2];

      const _posYX$split3 = posYX.split('-');
      const _posYX$split4 = _slicedToArray(_posYX$split3, 2);
      const posY = _posYX$split4[0];
      const posX = _posYX$split4[1];

      const olcss = el.style;
      const distance = options && options.distance || '12';
      const showArrow = options && options.arrow;
      const calc = 'calc(100% + '.concat(distance, 'px)');
      olcss.position = 'absolute';
      olcss.display = 'inherit';
      olcss.transform = '';

      if (hv === 'horizontal' && inOut === 'outside') {
        olcss.top = posY === 'top' ? '0' : 'inherit';
        olcss.bottom = posY === 'bottom' ? '0' : 'inherit';
        olcss.left = posX === 'right' ? calc : 'inherit';
        olcss.right = posX === 'left' ? calc : 'inherit';

        if (posY === 'center') {
          olcss.top = '50%';
          olcss.transform = 'translate(0, -50%)';
        }
      } else if (hv === 'vertical' && inOut === 'outside') {
        olcss.top = posY === 'bottom' ? calc : 'inherit';
        olcss.bottom = posY === 'top' ? calc : 'inherit';
        olcss.left = posX === 'left' ? '0' : 'inherit';
        olcss.right = posX === 'right' ? '0' : 'inherit';

        if (posX === 'center') {
          olcss.left = '50%';
          olcss.transform = 'translate(-50%, 0)';
        }
      } else {
        // inside overlay
        olcss.top = posY === 'top' ? '0' : 'inherit';
        olcss.bottom = posY === 'bottom' ? '0' : 'inherit';
        olcss.left = posX === 'left' ? '0' : 'inherit';
        olcss.right = posX === 'right' ? '0' : 'inherit';
        console.log(olcss.top, olcss.bottom, olcss.left, olcss.right);

        if (posY === 'center') {
          olcss.top = '50%';
          olcss.transform = posX === 'center' ? 'translate(-50%, -50%)' : 'translate(0, -50%)';
        }

        if (posX === 'center') {
          olcss.left = '50%';
          olcss.transform = posY === 'center' ? 'translate(-50%, -50%)' : 'translate(-50%, 0)';
        }
      }

      if (showArrow) {
        addArrow(el, pos);
      } else {
        el.querySelector('.hce-arrow') && el.querySelector('.hce-arrow').remove();
      }

      return el;
    }
    /** */}),

  /** */ './src/utils/time.js':
  /* !***************************!*\
  !*** ./src/utils/time.js ***!
  \***************************/
  /* ! exports provided: time */
  /** */ (function(module, __webpack_exports__, __webpack_require__) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'time', function() {
      return time;
    });
    const i18n = {
      en: {
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      fr: {
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc']
      }
    };
    const masks = {
      default: 'ddd mmm dS yyyy HH:MM:ss TT',
      short: 'm/d/yy',
      shortTime: 'h:MM TT',
      medium: 'mmm d, yyyy',
      mediumTime: 'h:MM:ss TT',
      long: 'mmmm d, yyyy',
      longTime: 'h:MM:ss TT Z',
      full: 'dddd, mmmm d, yyyy',
      isoDate: 'yyyy-mm-dd',
      isoTime: 'HH:MM:ss',
      isoDateTime: 'yyyy-mm-dd\'T\'HH:MM:ss'
    };

    const pad = function pad(val, len) {
      val = String(val);
      len = len || 2;

      while (val.length < len) {
        val = '0' + val;
      }

      return val;
    };

    function time(argDate) {
      const help = '\n    Available formats\n    ---------------------------------------------------\n    yy:   last two number of year. 17\n    yyyy: full year. 2017,\n    m:    month in number. 1, 12\n    mm:   month in number with 0 padded. 01, 12\n    mmm:  3 letter month. Jan, Dec\n    mmmm: Month in language. January, December\n    d:    day in number. 1, 31\n    dd:   day in number with 0 padded.  01, 31\n    ddd:  week day in 3 letters. Mon, Sun\n    dddd: week day in word.  Monday, Sunday\n    h:    hour in 12 hours format. 1, 12\n    hh:   hour in 12 hours format with 0 padded. 01, 12\n    H:    hour in 24 hours format. 13, 23\n    HH:   hour in 24 hours format with 0 padded. 01, 24\n    s:    seconds in number. 1, 60 \n    ss:   seconds in number with 0 padded. 01, 60\n    t:    am as \'a\', pm as \'p\'\n    tt:   am or pm\n    T:    am as \'A\', pm as \'P\'\n    TT:   AM or PM\n    Z:    Timezone. UTC, Pacific,\n    o:    Timezone offset. +5,\n    S:    Ordinary of date, e.g. 1st, 2nd, 3rd, 4th';
      const date = typeof argDate === 'string' ? new Date(argDate) : argDate && argDate.getMonth ? argDate : new Date();
      if (isNaN(date.getMonth())) throw 'Invalid date '.concat(argDate);
      return {
        language: 'en',
        i18n: i18n,
        utc: false,
        help: help,
        format: function format(argMask) {
          let mask = masks[argMask] || argMask || masks.default;

          if (argMask && argMask.slice(0, 4) == 'UTC:') {
            // Allow setting the utc argument via the mask
            mask = mask.slice(4);
            this.utc = true;
          }

          const timezoneRE = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
          const timezoneClipRE = /[^-+\dA-Z]/g;
          const get = this.utc ? 'getUTC' : 'get';
          const d = date[get + 'Date']();
          const D = date[get + 'Day']();
          const m = date[get + 'Month']();
          const y = date[get + 'FullYear']();
          const H = date[get + 'Hours']();
          const M = date[get + 'Minutes']();
          const s = date[get + 'Seconds']();
          const L = date[get + 'Milliseconds']();
          const o = this.utc ? 0 : date.getTimezoneOffset();
          const i18n = this.i18n[this.language];
          const flags = {
            d: d,
            dd: pad(d),
            ddd: i18n.dayNamesShort[D],
            dddd: i18n.dayNames[D],
            m: m + 1,
            mm: pad(m + 1),
            mmm: i18n.monthNamesShort[m],
            mmmm: i18n.monthNames[m],
            yy: String(y).slice(2),
            yyyy: y,
            h: H % 12 || 12,
            hh: pad(H % 12 || 12),
            H: H,
            HH: pad(H),
            M: M,
            MM: pad(M),
            s: s,
            ss: pad(s),
            l: pad(L, 3),
            L: pad(L > 99 ? Math.round(L / 10) : L),
            t: H < 12 ? 'a' : 'p',
            tt: H < 12 ? 'am' : 'pm',
            T: H < 12 ? 'A' : 'P',
            TT: H < 12 ? 'AM' : 'PM',
            Z: this.utc ? 'UTC' : (String(date).match(timezoneRE) || ['']).pop().replace(timezoneClipRE, ''),
            o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
          };
          return mask.replace(/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, function($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
          });
        }
      };
    }
    /** */})

/** ****/ });
// # sourceMappingURL=app.js.map
