/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "1fe07ac87625e086bd99";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./demo/index.js")(__webpack_require__.s = "./demo/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../html-custom-element/node_modules/document-register-element/build/document-register-element.js":
/*!********************************************************************************************************!*\
  !*** ../html-custom-element/node_modules/document-register-element/build/document-register-element.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! (C) Andrea Giammarchi - @WebReflection - ISC Style License */
!function(e,t){"use strict";function n(){var e=A.splice(0,A.length);for(Ye=0;e.length;)e.shift().call(null,e.shift())}function r(e,t){for(var n=0,r=e.length;n<r;n++)T(e[n],t)}function o(e){for(var t,n=0,r=e.length;n<r;n++)t=e[n],V(t,le[a(t)])}function l(e){return function(t){ke(t)&&(T(t,e),ae.length&&r(t.querySelectorAll(ae),e))}}function a(e){var t=Ze.call(e,"is"),n=e.nodeName.toUpperCase(),r=ue.call(oe,t?te+t.toUpperCase():ee+n);return t&&-1<r&&!i(n,t)?-1:r}function i(e,t){return-1<ae.indexOf(e+'[is="'+t+'"]')}function u(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,o=e.target,l=e[$]||2,a=e[Q]||3;!ot||o&&o!==t||!t[Z]||"style"===r||e.prevValue===e.newValue&&(""!==e.newValue||n!==l&&n!==a)||t[Z](r,n===l?null:e.prevValue,n===a?null:e.newValue)}function c(e){var t=l(e);return function(e){A.push(t,e.target),Ye&&clearTimeout(Ye),Ye=setTimeout(n,1)}}function s(e){rt&&(rt=!1,e.currentTarget.removeEventListener(Y,s)),ae.length&&r((e.target||y).querySelectorAll(ae),e.detail===q?q:_),Re&&d()}function m(e,t){var n=this;ze.call(n,e,t),O.call(n,{target:n})}function f(e,t,n){var r=t.apply(e,n),l=a(r);return-1<l&&V(r,le[l]),n.pop()&&ae.length&&o(r.querySelectorAll(ae)),r}function p(e,t){Fe(e,t),I?I.observe(e,Qe):(nt&&(e.setAttribute=m,e[U]=D(e),e[k](J,O)),e[k](W,u)),e[K]&&ot&&(e.created=!0,e[K](),e.created=!1)}function d(){for(var e,t=0,n=_e.length;t<n;t++)e=_e[t],ie.contains(e)||(n--,_e.splice(t--,1),T(e,q))}function h(e){throw new Error("A "+e+" type is already registered")}function T(e,t){var n,r,o=a(e);-1<o&&(S(e,le[o]),o=0,t!==_||e[_]?t!==q||e[q]||(e[_]=!1,e[q]=!0,r="disconnected",o=1):(e[q]=!1,e[_]=!0,r="connected",o=1,Re&&ue.call(_e,e)<0&&_e.push(e)),o&&(n=e[t+x]||e[r+x])&&n.call(e))}function L(){}function M(e,t,n){var r=n&&n[B]||"",o=t.prototype,l=Ie(o),a=t.observedAttributes||pe,i={prototype:l};Ue(l,K,{value:function(){if(we)we=!1;else if(!this[ve]){this[ve]=!0,new t(this),o[K]&&o[K].call(this);var e=Ae[Ne.get(t)];(!ge||e.create.length>1)&&H(this)}}}),Ue(l,Z,{value:function(e){-1<ue.call(a,e)&&o[Z]&&o[Z].apply(this,arguments)}}),o[G]&&Ue(l,j,{value:o[G]}),o[z]&&Ue(l,X,{value:o[z]}),r&&(i[B]=r),e=e.toUpperCase(),Ae[e]={constructor:t,create:r?[r,De(e)]:[e]},Ne.set(t,e),y[R](e.toLowerCase(),i),g(e),Oe[e].r()}function E(e){var t=Ae[e.toUpperCase()];return t&&t.constructor}function v(e){return"string"==typeof e?e:e&&e.is||""}function H(e){for(var t,n=e[Z],r=n?e.attributes:pe,o=r.length;o--;)t=r[o],n.call(e,t.name||t.nodeName,null,t.value||t.nodeValue)}function g(e){return e=e.toUpperCase(),e in Oe||(Oe[e]={},Oe[e].p=new Ce(function(t){Oe[e].r=t})),Oe[e].p}function b(){He&&delete e.customElements,fe(e,"customElements",{configurable:!0,value:new L}),fe(e,"CustomElementRegistry",{configurable:!0,value:L});for(var t=w.get(/^HTML[A-Z]*[a-z]/),n=t.length;n--;function(t){var n=e[t];if(n){e[t]=function(e){var t,r;return e||(e=this),e[ve]||(we=!0,t=Ae[Ne.get(e.constructor)],r=ge&&1===t.create.length,e=r?Reflect.construct(n,pe,t.constructor):y.createElement.apply(y,t.create),e[ve]=!0,we=!1,r||H(e)),e},e[t].prototype=n.prototype;try{n.prototype.constructor=e[t]}catch(r){Ee=!0,fe(n,ve,{value:e[t]})}}}(t[n]));y.createElement=function(e,t){var n=v(t);return n?$e.call(this,e,De(n)):$e.call(this,e)},Je||(tt=!0,y[R](""))}var y=e.document,C=e.Object,w=function(e){var t,n,r,o,l=/^[A-Z]+[a-z]/,a=function(e){var t,n=[];for(t in u)e.test(t)&&n.push(t);return n},i=function(e,t){(t=t.toLowerCase())in u||(u[e]=(u[e]||[]).concat(t),u[t]=u[t.toUpperCase()]=e)},u=(C.create||C)(null),c={};for(n in e)for(o in e[n])for(r=e[n][o],u[o]=r,t=0;t<r.length;t++)u[r[t].toLowerCase()]=u[r[t].toUpperCase()]=o;return c.get=function(e){return"string"==typeof e?u[e]||(l.test(e)?[]:""):a(e)},c.set=function(e,t){return l.test(e)?i(e,t):i(t,e),c},c}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});"object"!=typeof t&&(t={type:t||"auto"});var A,O,N,D,I,F,S,V,P,R="registerElement",U="__"+R+(1e5*e.Math.random()>>0),k="addEventListener",_="attached",x="Callback",q="detached",B="extends",Z="attributeChanged"+x,j=_+x,G="connected"+x,z="disconnected"+x,K="created"+x,X=q+x,$="ADDITION",Q="REMOVAL",W="DOMAttrModified",Y="DOMContentLoaded",J="DOMSubtreeModified",ee="<",te="=",ne=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,re=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],oe=[],le=[],ae="",ie=y.documentElement,ue=oe.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},ce=C.prototype,se=ce.hasOwnProperty,me=ce.isPrototypeOf,fe=C.defineProperty,pe=[],de=C.getOwnPropertyDescriptor,he=C.getOwnPropertyNames,Te=C.getPrototypeOf,Le=C.setPrototypeOf,Me=!!C.__proto__,Ee=!1,ve="__dreCEv1",He=e.customElements,ge=!/^force/.test(t.type)&&!!(He&&He.define&&He.get&&He.whenDefined),be=C.create||C,ye=e.Map||function(){var e,t=[],n=[];return{get:function(e){return n[ue.call(t,e)]},set:function(r,o){e=ue.call(t,r),e<0?n[t.push(r)-1]=o:n[e]=o}}},Ce=e.Promise||function(e){function t(e){for(r=!0;n.length;)n.shift()(e)}var n=[],r=!1,o={"catch":function(){return o},then:function(e){return n.push(e),r&&setTimeout(t,1),o}};return e(t),o},we=!1,Ae=be(null),Oe=be(null),Ne=new ye,De=function(e){return e.toLowerCase()},Ie=C.create||function it(e){return e?(it.prototype=e,new it):this},Fe=Le||(Me?function(e,t){return e.__proto__=t,e}:he&&de?function(){function e(e,t){for(var n,r=he(t),o=0,l=r.length;o<l;o++)n=r[o],se.call(e,n)||fe(e,n,de(t,n))}return function(t,n){do{e(t,n)}while((n=Te(n))&&!me.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),Se=e.MutationObserver||e.WebKitMutationObserver,Ve=e.HTMLAnchorElement,Pe=(e.HTMLElement||e.Element||e.Node).prototype,Re=!me.call(Pe,ie),Ue=Re?function(e,t,n){return e[t]=n.value,e}:fe,ke=Re?function(e){return 1===e.nodeType}:function(e){return me.call(Pe,e)},_e=Re&&[],xe=Pe.attachShadow,qe=Pe.cloneNode,Be=Pe.dispatchEvent,Ze=Pe.getAttribute,je=Pe.hasAttribute,Ge=Pe.removeAttribute,ze=Pe.setAttribute,Ke=y.createElement,Xe=y.importNode,$e=Ke,Qe=Se&&{attributes:!0,characterData:!0,attributeOldValue:!0},We=Se||function(e){nt=!1,ie.removeEventListener(W,We)},Ye=0,Je=R in y&&!/^force-all/.test(t.type),et=!0,tt=!1,nt=!0,rt=!0,ot=!0;if(Se&&(P=y.createElement("div"),P.innerHTML="<div><div></div></div>",new Se(function(e,t){if(e[0]&&"childList"==e[0].type&&!e[0].removedNodes[0].childNodes.length){P=de(Pe,"innerHTML");var n=P&&P.set;n&&fe(Pe,"innerHTML",{set:function(e){for(;this.lastChild;)this.removeChild(this.lastChild);n.call(this,e)}})}t.disconnect(),P=null}).observe(P,{childList:!0,subtree:!0}),P.innerHTML=""),Je||(Le||Me?(S=function(e,t){me.call(t,e)||p(e,t)},V=p):(S=function(e,t){e[U]||(e[U]=C(!0),p(e,t))},V=S),Re?(nt=!1,function(){var e=de(Pe,k),t=e.value,n=function(e){var t=new CustomEvent(W,{bubbles:!0});t.attrName=e,t.prevValue=Ze.call(this,e),t.newValue=null,t[Q]=t.attrChange=2,Ge.call(this,e),Be.call(this,t)},r=function(e,t){var n=je.call(this,e),r=n&&Ze.call(this,e),o=new CustomEvent(W,{bubbles:!0});ze.call(this,e,t),o.attrName=e,o.prevValue=n?r:null,o.newValue=t,n?o.MODIFICATION=o.attrChange=1:o[$]=o.attrChange=0,Be.call(this,o)},o=function(e){var t,n=e.currentTarget,r=n[U],o=e.propertyName;r.hasOwnProperty(o)&&(r=r[o],t=new CustomEvent(W,{bubbles:!0}),t.attrName=r.name,t.prevValue=r.value||null,t.newValue=r.value=n[o]||null,null==t.prevValue?t[$]=t.attrChange=0:t.MODIFICATION=t.attrChange=1,Be.call(n,t))};e.value=function(e,l,a){e===W&&this[Z]&&this.setAttribute!==r&&(this[U]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",o)),t.call(this,e,l,a)},fe(Pe,k,e)}()):Se||(ie[k](W,We),ie.setAttribute(U,1),ie.removeAttribute(U),nt&&(O=function(e){var t,n,r,o=this;if(o===e.target){t=o[U],o[U]=n=D(o);for(r in n){if(!(r in t))return N(0,o,r,t[r],n[r],$);if(n[r]!==t[r])return N(1,o,r,t[r],n[r],"MODIFICATION")}for(r in t)if(!(r in n))return N(2,o,r,t[r],n[r],Q)}},N=function(e,t,n,r,o,l){var a={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:o};a[l]=e,u(a)},D=function(e){for(var t,n,r={},o=e.attributes,l=0,a=o.length;l<a;l++)t=o[l],"setAttribute"!==(n=t.name)&&(r[n]=t.value);return r})),y[R]=function(e,t){if(n=e.toUpperCase(),et&&(et=!1,Se?(I=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new Se(function(r){for(var o,l,a,i=0,u=r.length;i<u;i++)o=r[i],"childList"===o.type?(n(o.addedNodes,e),n(o.removedNodes,t)):(l=o.target,ot&&l[Z]&&"style"!==o.attributeName&&(a=Ze.call(l,o.attributeName))!==o.oldValue&&l[Z](o.attributeName,o.oldValue,a))})}(l(_),l(q)),F=function(e){return I.observe(e,{childList:!0,subtree:!0}),e},F(y),xe&&(Pe.attachShadow=function(){return F(xe.apply(this,arguments))})):(A=[],y[k]("DOMNodeInserted",c(_)),y[k]("DOMNodeRemoved",c(q))),y[k](Y,s),y[k]("readystatechange",s),y.importNode=function(e,t){switch(e.nodeType){case 1:return f(y,Xe,[e,!!t]);case 11:for(var n=y.createDocumentFragment(),r=e.childNodes,o=r.length,l=0;l<o;l++)n.appendChild(y.importNode(r[l],!!t));return n;default:return qe.call(e,!!t)}},Pe.cloneNode=function(e){return f(this,qe,[!!e])}),tt)return tt=!1;if(-2<ue.call(oe,te+n)+ue.call(oe,ee+n)&&h(e),!ne.test(n)||-1<ue.call(re,n))throw new Error("The type "+e+" is invalid");var n,o,a=function(){return u?y.createElement(m,n):y.createElement(m)},i=t||ce,u=se.call(i,B),m=u?t[B].toUpperCase():n;return u&&-1<ue.call(oe,ee+m)&&h(m),o=oe.push((u?te:ee)+n)-1,ae=ae.concat(ae.length?",":"",u?m+'[is="'+e.toLowerCase()+'"]':m),a.prototype=le[o]=se.call(i,"prototype")?i.prototype:Ie(Pe),ae.length&&r(y.querySelectorAll(ae),_),a},y.createElement=$e=function(e,t){var n=v(t),r=n?Ke.call(y,e,De(n)):Ke.call(y,e),o=""+e,l=ue.call(oe,(n?te:ee)+(n||o).toUpperCase()),a=-1<l;return n&&(r.setAttribute("is",n=n.toLowerCase()),a&&(a=i(o.toUpperCase(),n))),ot=!y.createElement.innerHTMLHelper,a&&V(r,le[l]),r}),L.prototype={constructor:L,define:ge?function(e,t,n){if(n)M(e,t,n);else{var r=e.toUpperCase();Ae[r]={constructor:t,create:[r]},Ne.set(t,r),He.define(e,t)}}:M,get:ge?function(e){return He.get(e)||E(e)}:E,whenDefined:ge?function(e){return Ce.race([He.whenDefined(e),g(e)])}:g},!He||/^force/.test(t.type))b();else if(!t.noBuiltIn)try{!function(t,n,r){var o=new RegExp("^<a\\s+is=('|\")"+r+"\\1></a>$");if(n[B]="a",t.prototype=Ie(Ve.prototype),t.prototype.constructor=t,e.customElements.define(r,t,n),!o.test(y.createElement("a",{is:r}).outerHTML)||!o.test((new t).outerHTML))throw n}(function ut(){return Reflect.construct(Ve,[],ut)},{},"document-register-element-a")}catch(lt){b()}if(!t.noBuiltIn)try{if(Ke.call(y,"a","a").outerHTML.indexOf("is")<0)throw{}}catch(at){De=function(e){return{is:e.toLowerCase()}}}}(window);


/***/ }),

/***/ "../html-custom-element/src/create-custom-event.js":
/*!*********************************************************!*\
  !*** ../html-custom-element/src/create-custom-event.js ***!
  \*********************************************************/
/*! exports provided: createCustomEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCustomEvent", function() { return createCustomEvent; });
/**
 * IE11 Compatible CustomEvent
 * @example:
 *   const myEvent = createCustomEvent('agent-live-chat', {bubbles: true});
 *   element.dispatchEvent(myEvent);
 */
function createCustomEvent(eventName, options) {
  var event;

  if (typeof CustomEvent === 'function') {
    event = new CustomEvent(eventName, options);
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, options.bubbles, options.cancelable, options.detail);
  }

  return event;
}

/***/ }),

/***/ "../html-custom-element/src/html-custom-element.js":
/*!*********************************************************!*\
  !*** ../html-custom-element/src/html-custom-element.js ***!
  \*********************************************************/
/*! exports provided: setStyleEl, getPropsFromAttributes, bindEvent, bindExpression, HTMLCustomElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStyleEl", function() { return setStyleEl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPropsFromAttributes", function() { return getPropsFromAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindEvent", function() { return bindEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindExpression", function() { return bindExpression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTMLCustomElement", function() { return HTMLCustomElement; });
/* harmony import */ var document_register_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! document-register-element */ "../html-custom-element/node_modules/document-register-element/build/document-register-element.js");
/* harmony import */ var document_register_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(document_register_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _one_way_binding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./one-way-binding */ "../html-custom-element/src/one-way-binding.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

 // IE11/FF CustomElement polyfill


function setStyleEl(css) {
  function hashCode(str) {
    var hash = 0;

    for (var i = 0, len = str.length; i < len; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash;
    }

    return 'hce' + Math.abs(hash).toString(16);
  }

  css = css.replace(/,\s*?[\r\n]\s*?/gm, ', ');
  var hash = hashCode(css);
  var scopedCss = css.replace(/\s?([^@][\:\>\*\~\[\]\-\(\)a-z\.\, ])+\{/gm, function (m) {
    var selectors = m.split(/,\s*/).map(function (str) {
      return ".".concat(hash, " ").concat(str).replace(/\s*:root/g, '');
    });
    return "\n".concat(selectors.join(', '));
  });
  var styleEl = document.querySelector("style#".concat(hash));

  if (styleEl) {
    styleEl.numEl++;
  } else {
    styleEl = document.createElement('style');
    styleEl.appendChild(document.createTextNode(scopedCss));
    styleEl.setAttribute('id', hash);
    styleEl.numEl = 1;
    document.head.appendChild(styleEl);
  }

  return styleEl;
}
function getPropsFromAttributes(el) {
  function toCamelCase(str) {
    return str.replace(/-([a-z])/gi, function (g) {
      return g[1].toUpperCase();
    });
  } // following is the list of default attributes for all html tags, which shouldn't be treated as custom. 


  var htmlAttrs = /^(on.*|aria-.*|data-.*|class|dir|hidden|id|is|lang|style|tabindex|title)$/;
  var props = {}; // TODO: get properties from the close hce element by searching '.hce'
  // so that properties can be inherited to the child attributes

  var parentHCE = el.closest('.hce');

  if (parentHCE) {
    parentHCE.hcePropKeys.forEach(function (propKey) {
      return props[propKey] = parentHCE[propKey];
    });
  }

  Array.from(el.attributes).forEach(function (attr) {
    if (!attr.name.match(htmlAttrs)) {
      // ignore html common attributes
      var propName = attr.name.match(/^\(.*\)$/) ? attr.name : toCamelCase(attr.name);

      if (!el[propName]) {
        // ignore if property already assigned
        try {
          props[propName] = JSON.parse(attr.value);
        } catch (e) {
          props[propName] = attr.value;
        }
      } else {// do nothing 
      }
    }
  });
  return props;
}
function bindEvent(el, eventName, expression) {
  eventName = eventName.replace(/[\(\)]/g, '');

  var _expression$match = expression.match(/^(\w+)(\(*.*?\))?$/),
      _expression$match2 = _slicedToArray(_expression$match, 3),
      matches = _expression$match2[0],
      $1 = _expression$match2[1],
      $2 = _expression$match2[2];

  var funcName = $1,
      args = [];
  var argStr = ($2 || '').replace(/[()]/g, '') || 'event';
  args = argStr.split(',').map(function (el) {
    var arg = el.trim();
    if (arg === 'event') return 'event';else if (arg.match(/^[\-\.0-9]/)) return arg; // number
    else if (arg.match(/^(true|false)$/)) return arg; // boolean
      else if (arg.match(/^['"].*['"]$/)) return arg; // string
        else return "this.".concat(arg);
  });
  var func = new Function('event', "return ".concat(funcName, "(").concat(args.join(','), ")"));
  el.addEventListener(eventName, func.bind(el));
}
function bindExpression(el, propName, expression) {
  propName = propName.replace(/[\[\]]/g, '');
  var func = new Function("return ".concat(expression, ";"));

  try {
    el[propName] = func();
  } catch (e) {
    console.error(e);
    console.log("Invalid expression, \"".concat(expression, "\" ").concat(e.message));
  }
} // base class for all custom element

var HTMLCustomElement =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(HTMLCustomElement, _HTMLElement);

  function HTMLCustomElement() {
    _classCallCheck(this, HTMLCustomElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(HTMLCustomElement).apply(this, arguments));
  }

  _createClass(HTMLCustomElement, [{
    key: "disconnectedCallback",

    /* istanbul ignore next */
    value: function disconnectedCallback() {
      if (this.styleEl) {
        this.styleEl.numEl--;
        !this.styleEl.numEl && this.styleEl.remove();
      }
    }
    /* istanbul ignore next */

  }, {
    key: "renderWith",
    value: function renderWith(template, css, customCss) {
      var _this = this;

      return new Promise(function (resolve) {
        // some framework bind properties after DOM rendered
        // so set propertes after rendering cycle
        setTimeout(function (_) {
          var props = getPropsFromAttributes(_this); // user-defined attributes

          _this.hcePropKeys = Object.keys(props);

          for (var prop in props) {
            if (prop.match(/^\[.*\]$/)) {
              // e.g. [prop]="expression"
              bindExpression(_this, prop, props[prop]);
            } else if (prop.match(/^\(.*\)$/) && props[prop]) {
              bindEvent(_this, prop, props[prop]);
            } else {
              // e.g. set properties using setters https://gist.github.com/patrickgalbraith/9538b85546b4e3841864
              _this[prop] = props[prop];
            }
          }

          if (template) {
            if (template.indexOf('<hce-content></hce-content>')) {
              template = template.replace(/<hce-content><\/hce-content>/, _this.innerHTML);
            }

            _this.binding = new _one_way_binding__WEBPACK_IMPORTED_MODULE_1__["OneWayBinding"](template);
            _this.innerHTML = _this.binding.newHtml;
            ;

            _this.binding.setBindingDOMElements(_this); //  from hash x7c5a, to DOM element


            _this.detectChanges();

            Object(_one_way_binding__WEBPACK_IMPORTED_MODULE_1__["bindEvents"])(_this, _this.binding.events);
          }

          if (css) {
            _this.styleEl = setStyleEl(css); // insert <style> tag into header

            _this.classList.add(_this.styleEl.id); // set attribute, e.g., g9k02js84, for stying


            if (customCss) {
              _this.styleEl.appendChild(document.createTextNode(customCss));
            }
          } // adding this at the end so that this.closest('.hce') does not include itself


          _this.classList.add('hce');

          resolve(_this);
        });
      });
    }
    /* istanbul ignore next */

  }, {
    key: "detectChanges",
    value: function detectChanges() {
      Object(_one_way_binding__WEBPACK_IMPORTED_MODULE_1__["bindExpressions"])(this, this.binding.expressions);
    }
  }], [{
    key: "define",
    value: function define(tagName, klass) {
      !customElements.get(tagName) && customElements.define(tagName, klass);
    }
  }]);

  return HTMLCustomElement;
}(_wrapNativeSuper(HTMLElement));

/***/ }),

/***/ "../html-custom-element/src/index.js":
/*!*******************************************!*\
  !*** ../html-custom-element/src/index.js ***!
  \*******************************************/
/*! exports provided: HTMLCustomElement, createCustomEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html-custom-element */ "../html-custom-element/src/html-custom-element.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTMLCustomElement", function() { return _html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]; });

/* harmony import */ var _create_custom_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-custom-event */ "../html-custom-element/src/create-custom-event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createCustomEvent", function() { return _create_custom_event__WEBPACK_IMPORTED_MODULE_1__["createCustomEvent"]; });

// polyfill for element.closest()
if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}




/***/ }),

/***/ "../html-custom-element/src/one-way-binding.js":
/*!*****************************************************!*\
  !*** ../html-custom-element/src/one-way-binding.js ***!
  \*****************************************************/
/*! exports provided: bindExpressions, bindEvents, OneWayBinding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindExpressions", function() { return bindExpressions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindEvents", function() { return bindEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OneWayBinding", function() { return OneWayBinding; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 * Find new value of expressions in custom element, and set html, attribute, or property
 * 
 * example of expression 
 * { 
 *   expression: 'hero.name',
 *   value: 'new value',
 *   bindings: [
 *     {el: <span>, type: 'innerHTML', attrName: 'foo', propName: 'hidden'}
 *   ]
 * },
 */
function bindExpressions(custEl, expressions) {
  // loop through expressions and compare the value of expression
  expressions.forEach(function (expr) {
    var func = new Function("return this.".concat(expr.expression, ";"));
    var newValue = func.bind(custEl)(); // if value of expression is different from previous value

    if (expr.value !== newValue) {
      // console.log(
      //   `expression "${expr.expression}" value is changed to "${newValue}"`,
      //   `binding it to`, 
      //   expr.bindings.map(_ => _.el)
      // );
      expr.value = newValue || ''; // replace value html, attribute, or property with new value

      expr.bindings.forEach(function (binding) {
        switch (binding.type) {
          case 'innerHTML':
            var innerHTML = typeof newValue === 'undefined' ? '' : newValue;
            binding.el.innerHTML = "".concat(innerHTML);
            break;

          case 'attribute':
            binding.el.setAttribute(binding.attrName, newValue);
            break;

          case 'property':
            binding.el[binding.propName] = newValue;
            break;
        }
      });
    }
  });
}
/**
 * 
 *  Add event listener to each element
 * 
 * example of event 
 * { 
 *   el: <span>,
 *   bindings: [
 *     {eventName: 'click', funcName: 'foo', args: ['event', 'this.x'..] }
 *   ]
 * },
 */

function bindEvents(el, events) {
  // el - custom element
  events.forEach(function (eventBinding) {
    var bindingEl = eventBinding.el;
    eventBinding.bindings.forEach(function (binding) {
      var func = new Function('event', "return ".concat(binding.funcName, "(").concat(binding.args.join(','), ")"));
      bindingEl.addEventListener(binding.eventName, func.bind(el));
    });
  });
}
/**
 * 
 * One way binding helper for an element
 * Parse the given html and prepare expressions, events, and converted html
 * 
 *  expressions: 
 *    1. interpolation e.g. <span>{{hello.name}}</span>
 *    2. attribute name with bracket e.g. <foo [propName]="foo.bar">
 *    3. attribute value with interpolation e.g. <foo title="{{hello.name}}"}">
 * 
 *  events: 
 *    1. attribute name with round bracketg e.g. <foo (click)="doSomething(e)">
 * 
 * @param html        html string
 *
 * @props newHtml     newly replaced html for bindings ready
 * @props expressions expressions binding table
 * @props events      event bindigs table
 * 
 * @usage
 *   import {OnewayBinding, bindExpressions, bindEvents} from 'one-way-binding';
 *   const binding = new OneWayBinding(html);
 *   console.log(
 *     binding.newHtml,     // array
 *     binding.expressions, // array
 *     binding.events       // array
 *   );
 * 
 *   // Within in custom element
 *   bindExpressions(el, binding.expressions);
 *   bindEvents(el, binding.events)
 */

var OneWayBinding =
/*#__PURE__*/
function () {
  function OneWayBinding(html) {
    _classCallCheck(this, OneWayBinding);

    this.expressions = [];
    this.events = [];
    this.html = html;
    this.newHtml = this.__getNewHtml();
  }

  _createClass(OneWayBinding, [{
    key: "setBindingDOMElements",
    value: function setBindingDOMElements(el) {
      var selectors = [];
      this.expressions.forEach(function (expr) {
        expr.bindings.forEach(function (binding) {
          selectors.push(binding.el);
          binding.el = el.querySelector("[".concat(binding.el, "]"));
        });
      });
      this.events.forEach(function (evt) {
        selectors.push(evt.el);
        evt.el = el.querySelector("[".concat(evt.el, "]"));
      });
      selectors.forEach(function (hash) {
        var elWithHash = el.querySelector("[".concat(hash, "]"));
        elWithHash && elWithHash.removeAttribute(hash);
      });
    }
  }, {
    key: "__setExprBindings",
    value: function __setExprBindings(expression, value) {
      var expr = this.expressions.find(function (el) {
        return el.expression === expression;
      });

      if (expr) {
        expr.bindings.push(value);
      } else {
        this.expressions.push({
          expression: expression,
          value: null,
          bindings: [value]
        });
      }
    }
  }, {
    key: "__getNewHtml",
    value: function __getNewHtml() {
      var parser = new DOMParser();
      var htmlDoc = parser.parseFromString(this.html, 'text/html');

      this.__runChildren(htmlDoc.body);

      this.__replaceBINDToSPAN(htmlDoc);

      return htmlDoc.body.innerHTML;
    }
  }, {
    key: "__eventParsed",
    value: function __eventParsed(str) {
      var _str$match = str.match(/^(\w+)(\(*.*?\))?$/),
          _str$match2 = _slicedToArray(_str$match, 3),
          match = _str$match2[0],
          _1 = _str$match2[1],
          _2 = _str$match2[2];

      if (match) {
        var funcName = "this.".concat(_1);
        var argStr = (_2 || '').replace(/[()]/g, '') || 'event';
        var args = argStr.split(',').map(function (el) {
          var arg = el.trim();
          if (arg === 'event') return 'event';else if (arg.match(/^[\-\.0-9]/)) return arg; // number
          else if (arg.match(/^(true|false)$/)) return arg; // boolean
            else if (arg.match(/^['"].*['"]$/)) return arg; // string
              else return "this.".concat(arg);
        });
        return [funcName, args];
      }
    }
  }, {
    key: "__runChildren",
    value: function __runChildren(node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        this.__bindElement(node);
      } else if (node.nodeType === Node.TEXT_NODE) {
        if (node.nodeValue.match(/{{(.*?)}}/)) {
          this.__bindInnerHTML(node);
        }
      }

      var childNodes = node.childNodes;

      for (var i = 0; i < childNodes.length; i++) {
        var childNode = childNodes[i];

        if (childNode.hasAttribute && childNode.hasAttribute('ce-no-bind')) {
          console.log('found ce-no-bind. skipping binding');
        } else if (childNode.childNodes) {
          this.__runChildren(childNode);
        }
      }
    }
  }, {
    key: "__bindElement",
    value: function __bindElement(el) {
      for (var i = 0; i < el.attributes.length; i++) {
        var attr = el.attributes[i];
        attr.name.match(/^\[(.*?)\]$/) && this.__bindElementProperty(el, attr);
        attr.value.match(/{{(.*?)}}/) && this.__bindAttribute(el, attr);

        if (attr.name.match(/^\(.*?\)$/) || attr.name.match(/^on-(.*?)/)) {
          this.__bindElementEvent(el, attr);
        }
      }
    }
  }, {
    key: "__replaceBINDToSPAN",
    value: function __replaceBINDToSPAN(htmlDoc) {
      htmlDoc.body.innerHTML = htmlDoc.body.innerHTML.replace(/BIND-(x[\w]+)/g, "<span $1></span>");
    }
  }, {
    key: "__getHash",
    value: function __getHash() {
      var randNum = Math.random() * (0xffff - 0xfff) + 0xfff;
      return 'x' + Math.floor(randNum).toString(16);
    }
  }, {
    key: "__bindInnerHTML",
    value: function __bindInnerHTML(node) {
      var _this = this;

      node.nodeValue = node.nodeValue.replace(/{{(.*?)}}/g, function (match, expression) {
        var hash = _this.__getHash();

        _this.__setExprBindings(expression, {
          el: hash,
          type: 'innerHTML',
          orgHtml: match
        }); // cannot set element SPAN into text node
        // will be changed to SPAN tag later


        return "BIND-".concat(hash);
      });
    }
  }, {
    key: "__bindElementProperty",
    value: function __bindElementProperty(el, attr) {
      el.bindingHash = el.bindingHash || this.__getHash();
      el.setAttribute(el.bindingHash, '');
      var matches = attr.name.match(/^\[(.*?)\]$/);

      this.__setExprBindings(attr.value, {
        el: el.bindingHash,
        type: 'property',
        propName: matches[1],
        orgHtml: "".concat(attr.name, "=\"").concat(attr.value, "\"")
      });
    }
  }, {
    key: "__bindAttribute",
    value: function __bindAttribute(el, attr) {
      el.bindingHash = el.bindingHash || this.__getHash();
      el.setAttribute(el.bindingHash, '');
      var matches = attr.value.match(/{{(.*?)}}/);

      this.__setExprBindings(matches[1], {
        el: el.bindingHash,
        type: 'attribute',
        attrName: attr.name,
        orgHtml: "".concat(attr.name, "=\"").concat(attr.value, "\"")
      });
    }
  }, {
    key: "__bindElementEvent",
    value: function __bindElementEvent(el, attr) {
      el.bindingHash = el.bindingHash || this.__getHash();
      el.setAttribute(el.bindingHash, '');
      var found = this.events.find(function (event) {
        return event.el === el.bindingHash;
      });

      if (!found) {
        this.events.push({
          el: el.bindingHash,
          bindings: []
        });
      }

      var event = this.events.find(function (event) {
        return event.el === el.bindingHash;
      });

      var eventParsed = this.__eventParsed(attr.value);

      if (eventParsed) {
        var _this$__eventParsed = this.__eventParsed(attr.value),
            _this$__eventParsed2 = _slicedToArray(_this$__eventParsed, 2),
            funcName = _this$__eventParsed2[0],
            args = _this$__eventParsed2[1];

        var eventName;

        if (attr.name.match(/^\((.*?)\)$/)) {
          eventName = attr.name.match(/^\((.*?)\)$/)[1];
        } else if (attr.name.match(/^on-(.*?)/)) {
          eventName = attr.name.replace('on-', '');
        }

        event.bindings.push({
          eventName: eventName,
          funcName: funcName,
          args: args
        });
      }
    }
  }]);

  return OneWayBinding;
}();

/***/ }),

/***/ "./demo/index.js":
/*!***********************!*\
  !*** ./demo/index.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src */ "./src/index.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);



window.prettify = function (selector, type, highlight) {
  var el = document.querySelector(selector);
  var html = type === 'html' ? el.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>') : el.innerHTML;
  var prettyOne = prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.highlight(html, prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.languages[type], type);
  el.innerHTML = prettyOne.replace(highlight, function (_) {
    return "<b>".concat(_, "</b>");
  });
};

window.showCode = function (htmlId, jsId, cssId, highlight) {
  var el = document.createElement('div');
  el.insertAdjacentHTML('beforeend', "\n    <hce-tabs class=\"code\">\n      <div class=\"tabs\">\n        <i tab-for=\"html\">html</i>\n        <i tab-for=\"js\">js</i>\n        <i tab-for=\"css\">css</i>\n      </div>\n      <div class=\"contents\" style=\"background:#f8f8f8\"> \n        <div contents-for=\"html\"><pre></pre></div>\n        <div contents-for=\"js\"><pre></pre></div>\n        <div contents-for=\"css\"><pre></pre></div>\n      </div>\n    </hce-tabs>");
  document.currentScript.insertAdjacentElement('afterend', el);

  function fillCode(id, type) {
    var srcEl, dstEl, html;

    if (id) {
      srcEl = document.getElementById(id);
      dstEl = el.querySelector("[contents-for=".concat(type, "] pre"));
      var lang = type === 'js' ? 'javascript' : type;
      html = prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.highlight(srcEl.outerHTML, prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.languages[lang], lang);
      html = html.replace(/hce-[\w-]+/g, function ($0) {
        return "<b>".concat($0, "</b>");
      });
      highlight && (html = html.replace(highlight, function ($0) {
        return "<b>".concat($0, "</b>");
      }));
      dstEl.innerHTML = html;
    } else {
      el.querySelector("[tab-for=".concat(type, "]")).remove();
      el.querySelector("[contents-for=".concat(type, "]")).remove();
    }
  }

  fillCode(htmlId, 'html');
  fillCode(jsId, 'js');
  fillCode(cssId, 'css');
};

window.highlight = function () {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'javascript';
  var codeEl = document.currentScript.previousElementSibling;
  var html = prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.highlight(codeEl.innerHTML, prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.languages[lang], lang);
  codeEl.innerHTML = html;
};

/***/ }),

/***/ "./node_modules/prismjs/prism.js":
/*!***************************************!*\
  !*** ./node_modules/prismjs/prism.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/* **********************************************
     Begin prism-core.js
********************************************** */

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function(){

// Private helper vars
var lang = /\blang(?:uage)?-([\w-]+)\b/i;
var uniqueId = 0;

var _ = _self.Prism = {
	manual: _self.Prism && _self.Prism.manual,
	disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
			} else if (_.util.type(tokens) === 'Array') {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
		},

		objId: function (obj) {
			if (!obj['__id']) {
				Object.defineProperty(obj, '__id', { value: ++uniqueId });
			}
			return obj['__id'];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function (o, visited) {
			var type = _.util.type(o);
			visited = visited || {};

			switch (type) {
				case 'Object':
					if (visited[_.util.objId(o)]) {
						return visited[_.util.objId(o)];
					}
					var clone = {};
					visited[_.util.objId(o)] = clone;

					for (var key in o) {
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

					o.forEach(function (v, i) {
						clone[i] = _.util.clone(v, visited);
					});

					return clone;
			}

			return o;
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
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
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];

			if (arguments.length == 2) {
				insert = arguments[1];

				for (var newToken in insert) {
					if (insert.hasOwnProperty(newToken)) {
						grammar[newToken] = insert[newToken];
					}
				}

				return grammar;
			}

			var ret = {};

			for (var token in grammar) {

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
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, null, visited);
					}
					else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
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
		var env = {
			callback: callback,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run("before-highlightall", env);

		var elements = env.elements || container.querySelectorAll(env.selector);

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, env.callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1].toLowerCase();
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

		var code = element.textContent;

		var env = {
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
			var worker = new Worker(_.filename);

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
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
		}
	},

	highlight: function (text, grammar, language) {
		var env = {
			code: text,
			grammar: grammar,
			language: language
		};
		_.hooks.run('before-tokenize', env);
		env.tokens = _.tokenize(env.code, env.grammar);
		_.hooks.run('after-tokenize', env);
		return Token.stringify(_.util.encode(env.tokens), env.language);
	},

	matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
		var Token = _.Token;

		for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			if (token == target) {
				return;
			}

			var patterns = grammar[token];
			patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j],
					inside = pattern.inside,
					lookbehind = !!pattern.lookbehind,
					greedy = !!pattern.greedy,
					lookbehindLength = 0,
					alias = pattern.alias;

				if (greedy && !pattern.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
					pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
				}

				pattern = pattern.pattern || pattern;

				// Don’t cache length as it changes during the loop
				for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

					var str = strarr[i];

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

						var from = match.index + (lookbehind ? match[1].length : 0),
						    to = match.index + match[0].length,
						    k = i,
						    p = pos;

						for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
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

						var match = pattern.exec(str),
							delNum = 1;
					}

					if (!match) {
						if (oneshot) {
							break;
						}

						continue;
					}

					if(lookbehind) {
						lookbehindLength = match[1] ? match[1].length : 0;
					}

					var from = match.index + lookbehindLength,
					    match = match[0].slice(lookbehindLength),
					    to = from + match.length,
					    before = str.slice(0, from),
					    after = str.slice(to);

					var args = [i, delNum];

					if (before) {
						++i;
						pos += before.length;
						args.push(before);
					}

					var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

					args.push(wrapped);

					if (after) {
						args.push(after);
					}

					Array.prototype.splice.apply(strarr, args);

					if (delNum != 1)
						_.matchGrammar(text, strarr, grammar, i, pos, true, token);

					if (oneshot)
						break;
				}
			}
		}
	},

	tokenize: function(text, grammar, language) {
		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		_.matchGrammar(text, strarr, grammar, 0, 0, false);

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

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
	this.length = (matchedStr || "").length|0;
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

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (o.alias) {
		var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
		Array.prototype.push.apply(env.classes, aliases);
	}

	_.hooks.run('wrap', env);

	var attributes = Object.keys(env.attributes).map(function(name) {
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
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
				lang = message.language,
				code = message.code,
				immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);
	}

	return _self.Prism;
}

//Get current script and highlight
var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

if (script) {
	_.filename = script.src;

	if (!_.manual && !script.hasAttribute('data-manual')) {
		if(document.readyState !== "loading") {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(_.highlightAll);
			} else {
				window.setTimeout(_.highlightAll, 16);
			}
		}
		else {
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
					rest: null // See below
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

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
		return;
	}

	self.Prism.fileHighlight = function() {

		var Extensions = {
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

		Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
			var src = pre.getAttribute('data-src');

			var language, parent = pre;
			var lang = /\blang(?:uage)?-([\w-]+)\b/i;
			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (pre.className.match(lang) || [, ''])[1];
			}

			if (!language) {
				var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
				language = Extensions[extension] || extension;
			}

			var code = document.createElement('code');
			code.className = 'language-' + language;

			pre.textContent = '';

			code.textContent = 'Loading…';

			pre.appendChild(code);

			var xhr = new XMLHttpRequest();

			xhr.open('GET', src, true);

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {

					if (xhr.status < 400 && xhr.responseText) {
						code.textContent = xhr.responseText;

						Prism.highlightElement(code);
					}
					else if (xhr.status >= 400) {
						code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
					}
					else {
						code.textContent = '✖ Error: File does not exist or is empty';
					}
				}
			};

			xhr.send(null);
		});

		if (Prism.plugins.toolbar) {
			Prism.plugins.toolbar.registerButton('download-file', function (env) {
				var pre = env.element.parentNode;
				if (!pre || !/pre/i.test(pre.nodeName) || !pre.hasAttribute('data-src') || !pre.hasAttribute('data-download-link')) {
					return;
				}
				var src = pre.getAttribute('data-src');
				var a = document.createElement('a');
				a.textContent = pre.getAttribute('data-download-link-label') || 'Download';
				a.setAttribute('download', '');
				a.href = src;
				return a;
			});
		}

	};

	document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);

})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/calendar/calendar.js":
/*!**********************************!*\
  !*** ./src/calendar/calendar.js ***!
  \**********************************/
/*! exports provided: HCECalendar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCECalendar", function() { return HCECalendar; });
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
/* harmony import */ var _utils_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/time */ "./src/utils/time.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




function __getWeekdays() {
  var firstDayOfWeek = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var ret = [];

  for (var i = firstDayOfWeek; i < firstDayOfWeek + 7; i++) {
    ret.push(i % 7);
  }

  return ret;
}

function __getLeadingDays(curDate) {
  var staDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var ret = [];
  var year = curDate.getFullYear(),
      month = curDate.getMonth();
  var firstWeekday = new Date(year, month, 1).getDay();
  var days = firstWeekday + 7 - (staDay + 7) - 1; // 2 days become 1 for [1, 0]

  for (var i = days * -1; i <= 0; i++) {
    ret.push(new Date(year, month, i).getDate());
  }

  return ret;
}

function __getMonthDays(curDate) {
  var ret = [];
  var year = curDate.getFullYear(),
      month = curDate.getMonth();
  var lastDay = new Date(year, month + 1, 0).getDate();

  for (var i = 1; i <= lastDay; i++) {
    ret.push(i);
  }

  return ret;
}

function __getTrailingDays(leadingDays, monthDays) {
  var ret = [];
  var days = 42 - (leadingDays.length + monthDays.length);

  for (var i = 1; i <= days; i++) {
    ret.push(i);
  }

  return ret;
}

function __addDate(parent, date, klass) {
  var el = document.createElement('button');
  var elDate = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), date);
  el.innerHTML = date;
  el.className = klass;

  if (elDate > this.maxDate || elDate < this.minDate) {
    el.disabled = true;
  }

  parent.appendChild(el);
}

function __getI18n(lang, key, indexes) {
  //type:week, wk, month, mon
  indexes = indexes instanceof Array ? indexes : [indexes];
  var t = Object(_utils_time__WEBPACK_IMPORTED_MODULE_1__["time"])();
  var ret = indexes.map(function (ndx) {
    return t.i18n[lang][key][ndx];
  });
  return ret.length === 1 ? ret[0] : ret;
}

function __getMonthEls(lang, monthNum) {
  var t = Object(_utils_time__WEBPACK_IMPORTED_MODULE_1__["time"])();
  var months = t.i18n[lang].monthNamesShort;
  return months.map(function (month, ndx) {
    var optEl = document.createElement('option');
    optEl.value = ndx;
    optEl.innerHTML = month;
    monthNum === ndx && (optEl.selected = true);
    return optEl;
  });
}

function __getYearEls(lang, year, minYear, maxYear) {
  minYear = Math.max(minYear, year - 10);
  maxYear = Math.min(maxYear, year + 10);
  var years = [];

  for (var i = minYear; i <= maxYear; i++) {
    var optEl = document.createElement('option');
    optEl.value = i;
    optEl.innerHTML = i;
    year === i && (optEl.selected = true);
    years.push(optEl);
  }

  return years;
}

var html = "\n  <div class=\"calendar\">\n    <div class=\"title\">\n      <button class=\"prev\" (click)=\"setMonth(-1)\">&lt;</button>\n      <div>\n        <select class=\"month\" (change)=\"setMonth(event)\"></select>\n        <select class=\"year\" (change)=\"setYear(event)\"></select>\n      </div>\n      <button class=\"next\" (click)=\"setMonth(1)\">&gt;</button>\n    </div>\n    <div class=\"days\"></div>\n    <div class=\"dates\" (click)=\"fireDateSelected(event)\"></div>\n  </div>\n  <div class=\"blocker\"></div>\n";
var css = "\n  :root.overlay:before {            /* Needed to check click outside of overlay */\n    content: ' ';\n    position: fixed;\n    top: 0; left: 0; right: 0; bottom: 0;\n    background: transparent;\n  }\n  .calendar {           /* overlay contents on thetop of blocker */\n    position: relative;\n    background: #fff;\n  }\n  .calendar.shadow {\n    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.14),\n      0px 1px 1px 0px rgba(0, 0, 0, 0.12), \n      0px 2px 1px -1px rgba(0, 0, 0, .4) ;\n  }\n\n  .title {              /* e.g. '< Mar 2019 >' */\n    display: flex;\n    justify-content: space-between;\n    position: relative;\n    background: #fff;\n  }\n  .title select {        /* Jan, Feb .. */ /* 2017, 2018, ... */\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    padding: 0;\n    border: none;\n  }\n  .days > span {          /* Mon, Tue, Wed ... */\n    display: inline-block;\n    text-align: center;\n    width: calc(100% / 7);\n  }\n  .dates button {          /* 1, 2, ... 31 */\n    padding: 0;\n    width: calc(100% / 7);\n  }\n  .dates button.leading { \n    color: #eee; border: none;\n  }\n  .dates button.trailing {\n    color: #eee; border: none;\n  }\n";
var HCECalendar =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCECalendar, _HTMLCustomElement);

  function HCECalendar() {
    _classCallCheck(this, HCECalendar);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCECalendar).apply(this, arguments));
  }

  _createClass(HCECalendar, [{
    key: "connectedCallback",
    // curDate, minDate, maxDate
    // language, firstDayOfWeek
    // weekdayFormat e.g. 2-letter, full, default 3-letter
    value: function connectedCallback() {
      var _this = this;

      this.renderWith(html, css).then(function (_) {
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
    key: "setBehaviourOfVisibleBy",
    value: function setBehaviourOfVisibleBy() {
      var _this2 = this;

      var inputEl = document.querySelector(this.visibleBy);

      if (inputEl) {
        inputEl.parentElement.style.position = 'relative';
        this.classList.add('overlay');
        this.querySelector('.calendar').classList.add('shadow');
        this.style.position = 'absolute';
        this.style.display = 'none';
        this.addEventListener('click', function (event) {
          _this2.isEqualNode(event.target) && (_this2.style.display = 'none');
        });
        inputEl.addEventListener('focus', function (_) {
          return _this2.style.display = 'block';
        });
        this.addEventListener('date-selected', function (e) {
          inputEl.value = e.detail;
          _this2.style.display = 'none';
        });
      }
    }
  }, {
    key: "setWeekdays",
    value: function setWeekdays() {
      var _this3 = this;

      var weekdays = __getWeekdays(this.firstDayOfWeek);

      var format = this.weekdayFormat === 'full' ? 'dayNames' : 'dayNamesShort';

      __getI18n(this.language, format, weekdays).forEach(function (str) {
        str = _this3.weekdayFormat === '2-letter' ? str.substr(0, 2) : str;
        var spanEl = document.createElement('span');
        spanEl.innerHTML = str;
        spanEl.className = 'wk';

        _this3.querySelector('.days').appendChild(spanEl);
      });
    }
  }, {
    key: "setYear",
    value: function setYear(year) {
      if (year instanceof Event) {
        year = year.target.value;
      }

      this.curDate.setYear(year);
      this.setCalendar();
    }
  }, {
    key: "setMonth",
    value: function setMonth(mon) {
      if (mon instanceof Event) {
        this.curDate.setMonth(parseInt(mon.target.value));
      } else {
        this.curDate.setMonth(this.curDate.getMonth() + mon);
      }

      this.setCalendar();
    }
  }, {
    key: "setCalendar",
    value: function setCalendar() {
      var _this4 = this;

      var leadingDays = __getLeadingDays(this.curDate, this.firstDayOfWeek);

      var monthDays = __getMonthDays(this.curDate);

      var trailingDays = __getTrailingDays(leadingDays, monthDays);

      var monthEls = __getMonthEls(this.language, this.curDate.getMonth());

      var yearEls = __getYearEls(this.language, this.curDate.getFullYear(), this.minDate.getFullYear(), this.maxDate && this.maxDate.getFullYear());

      this.querySelector('.title .month').innerHTML = '';
      this.querySelector('.title .year').innerHTML = '';
      monthEls.forEach(function (el) {
        return _this4.querySelector('.title .month').appendChild(el);
      });
      yearEls.forEach(function (el) {
        return _this4.querySelector('.title .year').appendChild(el);
      });
      var prevMonLastDay = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), 0);
      var nextMon1stDay = new Date(this.curDate.getFullYear(), this.curDate.getMonth() + 1, 1);
      this.querySelector('.title .prev').disabled = prevMonLastDay < this.minDate;
      this.querySelector('.title .next').disabled = nextMon1stDay > this.maxDate;
      var datesEl = this.querySelector('.dates');
      datesEl.innerHTML = '';
      leadingDays.forEach(function (num) {
        return __addDate.bind(_this4)(datesEl, num, 'leading');
      });
      monthDays.forEach(function (num) {
        return __addDate.bind(_this4)(datesEl, num, 'day');
      });
      trailingDays.forEach(function (num) {
        return __addDate.bind(_this4)(datesEl, num, 'trailing');
      });
      Array.from(this.querySelector('.dates').children).forEach(function (el, ndx) {
        ndx % 7 === 0 && ndx !== 0 && datesEl.insertBefore(document.createElement('br'), el);
      });
    }
  }, {
    key: "fireDateSelected",
    value: function fireDateSelected(event) {
      var map = {
        leading: -1,
        day: 0,
        trailing: 1
      };
      var month = this.curDate.getMonth() + map[event.target.className];
      var day = parseInt(event.target.innerHTML, 0);
      var selectedDate = new Date(this.curDate.getFullYear(), month, day);
      var formatted = Object(_utils_time__WEBPACK_IMPORTED_MODULE_1__["time"])(selectedDate).format(this.format || 'long');
      var custEvent = Object(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["createCustomEvent"])('date-selected', {
        detail: formatted
      });
      this.dispatchEvent(custEvent);
    }
  }]);

  return HCECalendar;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);
HCECalendar.define('hce-calendar', HCECalendar);

/***/ }),

/***/ "./src/carousel/carousel.css":
/*!***********************************!*\
  !*** ./src/carousel/carousel.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":root {\n  display: block;\n  position: relative;\n  width: 100%;\n  min-width: 320px;\n  min-height: 200px;\n}\n\n.button-container {\n  display: flex;\n  position: absolute;\n  align-items: center;\n  height: 100%;\n  z-index: 1;\n}\n\n.prev.button-container { \n  left: 0; \n}\n\n.next.button-container {\n right: 0; \n}\n\n.button-container > button {\n  display: block;\n  border: 0;\n  padding: 0;\n  font-size: 32px;\n  color: #FFF;\n  background-color: #CCC;\n  border-radius: 50%;\n  width: 44px;\n  height: 44px;\n  line-height: 44px;\n  opacity: .5;\n  text-align: center;\n  text-decoration: none;\n}\n\n.button-container > button:hover {\n  opacity: .9;\n}\n\n.button-container > button:focus {\n  opacity: .9;\n}\n\n.carousel-list {\n  display: flex;\n  margin: 0;\n  position: absolute;\n  padding: 0;\n  overflow: hidden;\n  /*overflow-x: auto;*/\n  width: 100%;\n}\n\n.carousel-list > * {\n  display: block;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  opacity: 0.6;\n}\n\n.carousel-list > li[tabindex] {\n  opacity: 1;\n  outline: none;\n  border-color: #9ecaed;\n  box-shadow: 0 0 10px #9ecaed;\n}\n\n.shortcuts {\n  display: block;\n  margin: 0;\n  position: absolute;\n  bottom: 12px;\n  padding: 0;\n  width: 100%;\n  text-align: center;\n}\n\n.shortcuts > * {\n  display: inline-block;\n  margin: 0 1px;\n  list-style: none;\n  color: #FFF;\n  border-radius: 50%;\n  background: #FFF;\n  width: 12px;\n  height: 12px;\n  opacity: .5;\n}\n\n.shortcuts > *.active {\n  opacity: .9;\n}"

/***/ }),

/***/ "./src/carousel/carousel.js":
/*!**********************************!*\
  !*** ./src/carousel/carousel.js ***!
  \**********************************/
/*! exports provided: HCECarousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCECarousel", function() { return HCECarousel; });
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
/* harmony import */ var _carousel_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel.css */ "./src/carousel/carousel.css");
/* harmony import */ var _carousel_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_carousel_css__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var html = "\n  <div class=\"prev button-container\">\n    <button (click)=\"show(index-1)\">&lt;</button>\n  </div>\n  <hce-content></hce-content>\n  <div class=\"next button-container\">\n    <button (click)=\"show(index+1)\">&gt;</button>\n  </div>\n\n  <!-- shortcuts for each item -->\n  <ul class=\"shortcuts\"></ul>";

function __addShortcuts(shortcutsEl, listEl) {
  var _this = this;

  var _loop = function _loop(i) {
    var liEl = listEl.children[i];
    liEl.addEventListener('click', function (_) {
      return _this.show(liEl);
    });
    var shortcut = document.createElement('li');
    shortcut.innerHTML = '&nbsp;';
    shortcut.setAttribute('tabindex', 0);
    shortcutsEl.appendChild(shortcut);
    shortcut.addEventListener('click', function (_) {
      return _this.show(i);
    });
    shortcut.addEventListener('keydown', function (event) {
      event.key === 'Enter' && _this.show(i);
      event.key === 'ArrowRight' && _this.show(_this.index + 1);
      event.key === 'ArrowLeft' && _this.show(_this.index - 1);
    });
  };

  for (var i = 0; i < listEl.children.length; i++) {
    _loop(i);
  }
}

function __getIndex(all, item) {
  var index;

  for (var i = 0; i < all.length; i++) {
    if (all[i].isEqualNode(item)) {
      index = i;
      break;
    }
  }

  return index;
}

var HCECarousel =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCECarousel, _HTMLCustomElement);

  function HCECarousel() {
    _classCallCheck(this, HCECarousel);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCECarousel).apply(this, arguments));
  }

  _createClass(HCECarousel, [{
    key: "connectedCallback",
    // selected                  // default selected index
    // listEl: HTMLElement       // list to scroll
    // shortcutsEl: HTMLElement  // list of shortcuts
    // inviewEl: Element         // currently visible element
    // index: number             // currently selected index
    value: function connectedCallback() {
      var _this2 = this;

      this.renderWith(html, _carousel_css__WEBPACK_IMPORTED_MODULE_1___default.a).then(function (_) {
        _this2.listEl = _this2.querySelector('ul:not(.shortcuts), ol, .list');

        _this2.listEl.classList.add('carousel-list');

        _this2.shortcutsEl = _this2.querySelector('ul.shortcuts');

        __addShortcuts.bind(_this2)(_this2.shortcutsEl, _this2.listEl);

        _this2.listEl && setTimeout(function (_) {
          return _this2.show(_this2.selected || 0);
        }, 1000);
      });
    }
  }, {
    key: "show",
    value: function show(what) {
      // index, or element
      var prevTabIndexedEl = this.listEl.querySelector('[tabindex]');
      var scrollToEl = what;

      if (typeof what === 'number') {
        this.index = (this.listEl.children.length + what) % this.listEl.children.length;
        scrollToEl = this.listEl.children[this.index];
      }

      this.index = __getIndex(this.listEl.children, scrollToEl);
      setTimeout(function (_) {
        return scrollToEl.scrollIntoView({
          behavior: 'smooth'
        });
      }); // set shortcuts

      if (this.shortcutsEl.offsetParent) {
        // if visible
        var prevActiveShortcut = this.shortcutsEl.querySelector('.active');
        var shortcutEl = this.shortcutsEl.children[this.index];
        prevActiveShortcut && prevActiveShortcut.classList.remove('active');
        shortcutEl.classList.add('active');
        shortcutEl.focus();
      } // set tabindex for accessibility


      prevTabIndexedEl && prevTabIndexedEl.removeAttribute('tabindex');
      scrollToEl.setAttribute('tabindex', 0);
      this.inviewEl = scrollToEl;
    }
  }]);

  return HCECarousel;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);
HCECarousel.define('hce-carousel', HCECarousel);

/***/ }),

/***/ "./src/dialog/dialog.css":
/*!*******************************!*\
  !*** ./src/dialog/dialog.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":root {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n:root.visible {\n  display: block;\n  z-index: 24;\n}\n\n:root:not(.visible) {\n  display: none;\n}\n\n> .page-blocker {\n  position: absolute; /* fixed */\n  background-color: #000;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: .5;\n  top: 0;\n}\n\n> .dialog {\n  padding: 24px;\n  position: absolute; /* fixed */\n  left: 50%;\n  top: 50%;\n  -ms-transform: translate(-50%,-50%);\n  -moz-transform:translate(-50%,-50%);\n  -webkit-transform: translate(-50%,-50%);\n  transform: translate(-50%,-50%);\n  min-width: 280px; /* 56 x 5 */\n  max-width: calc(100% - 80px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0  6px  6px rgba(0,0,0,0.23);\n  border: 1px solid #eeeeee;\n  border-radius: 2px;\n  background-color: #ffffff;\n}\n\n> .dialog > .close {\n  border: none;\n  font-size: 1.5em;\n  position: absolute;\n  top: 0;\n  right: 0;\n  color: #999;\n}\n\n> .dialog > .divider {\n  display: block;\n  margin: 0px -24px;\n  height: 1px;\n  border: 1px solid #ccc;\n  border-width: 0 0 1px 0;\n}\n\n> .dialog > .title {\n  color: #212121;\n  padding-bottom: 20px;\n  font-size: 20px;\n  font-weight: 500;\n  margin: 0;\n}\n\n> .dialog > .content {\n  padding-bottom: 24px;\n  color: #9e9e9e;\n}\n\n> .dialog > .actions {\n  padding: 8px;\n  margin-right: -16px;\n  margin-bottom: -16px;\n  text-align: center;\n}\n\n> .dialog > .actions:empty {\n  display: none;\n}\n\n> .dialog > .actions > * {\n  height: 32px;\n}\n  "

/***/ }),

/***/ "./src/dialog/dialog.js":
/*!******************************!*\
  !*** ./src/dialog/dialog.js ***!
  \******************************/
/*! exports provided: HCEDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCEDialog", function() { return HCEDialog; });
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
/* harmony import */ var _dialog_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dialog.css */ "./src/dialog/dialog.css");
/* harmony import */ var _dialog_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dialog_css__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var html = "\n  <div class=\"page-blocker\" (click)=\"close()\"></div>\n\n  <div class=\"dialog\">\n    <button class=\"close\" (click)=\"close()\">&times;</button>\n    <div class=\"title\">{{title}}</div>\n    <hce-content></hce-content>\n    <div class=\"actions\"></div>\n  </div>\n";
var HCEDialog =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCEDialog, _HTMLCustomElement);

  function HCEDialog() {
    _classCallCheck(this, HCEDialog);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEDialog).apply(this, arguments));
  }

  _createClass(HCEDialog, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.renderWith(html, _dialog_css__WEBPACK_IMPORTED_MODULE_1___default.a).then(function (_) {// console.log(this.title, this.options);
      });
    }
  }, {
    key: "open",
    value: function open() {
      var _this = this;

      this.querySelector('.title').innerHTML = this.dialogTitle || '';

      if (this.actions !== undefined) {
        var actionsEl = this.querySelector('.actions');
        actionsEl.innerHTML = '';
        this.actions.forEach(function (action) {
          var buttonEl = document.createElement('button');
          buttonEl.innerHTML = action.text;
          buttonEl.addEventListener('click', action.handler.bind(_this));
          actionsEl.appendChild(buttonEl);
        });
      }

      this.classList.add('visible');
    }
  }, {
    key: "close",
    value: function close() {
      this.classList.remove('visible');
    }
  }]);

  return HCEDialog;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);
HCEDialog.define('hce-dialog', HCEDialog);

/***/ }),

/***/ "./src/drawer/drawer.css":
/*!*******************************!*\
  !*** ./src/drawer/drawer.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":root {\n  display: block;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 13;\n}\n\n:root.visible {\n  visibility: visible;\n}\n\n:root:not(.visible) {\n  visibility: hidden;\n}\n\n:root.visible .contents {\n  left: 0;\n  transform: translateX(0);\n  transition: all .3s ease-in;\n}\n\n:root:not(.visible) .contents {\n  left: -241px;\n  transform: translateX(0);\n  transition: all .2s ease-out;\n}\n\n.page-blocker {\n  position: fixed;\n  background-color: #000;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: .5;\n  top: 0;\n  z-index: 13;\n}\n\n.contents {\n  background-color: #ffffff;\n  box-shadow: 0   3px  6px rgba(0,0,0,0.18), 0  3px  6px rgba(0,0,0,0.23);\n  color: #212121;\n  display: block;\n  height: 100%; \n  left: 0;\n  max-width: 280px;\n  overflow: auto;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: calc(100vw - 56px);\n  z-index: 16;\n}"

/***/ }),

/***/ "./src/drawer/drawer.js":
/*!******************************!*\
  !*** ./src/drawer/drawer.js ***!
  \******************************/
/*! exports provided: HCEDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCEDrawer", function() { return HCEDrawer; });
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
/* harmony import */ var _drawer_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawer.css */ "./src/drawer/drawer.css");
/* harmony import */ var _drawer_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_drawer_css__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var html = "\n  <div class=\"page-blocker\"></div>\n  <div class=\"contents\"><hce-content></hce-content></div>\n";
var HCEDrawer =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCEDrawer, _HTMLCustomElement);

  function HCEDrawer() {
    _classCallCheck(this, HCEDrawer);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEDrawer).apply(this, arguments));
  }

  _createClass(HCEDrawer, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.renderWith(html, _drawer_css__WEBPACK_IMPORTED_MODULE_1___default.a).then(function (_) {
        window.hce.drawer = _this;

        _this.querySelector('.page-blocker').addEventListener('click', function (_) {
          return _this.hide();
        });
      });
    }
  }, {
    key: "show",
    value: function show() {
      this.classList.add('visible');
    }
  }, {
    key: "hide",
    value: function hide() {
      this.classList.remove('visible');
    }
  }]);

  return HCEDrawer;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);
HCEDrawer.define('hce-drawer', HCEDrawer);

/***/ }),

/***/ "./src/dyn-contents/dyn-contents.js":
/*!******************************************!*\
  !*** ./src/dyn-contents/dyn-contents.js ***!
  \******************************************/
/*! exports provided: HCEDynamicContents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCEDynamicContents", function() { return HCEDynamicContents; });
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



function getRoutesFromChildren(el) {
  var routes = [];
  Array.from(el.children).forEach(function (child) {
    var match = child.getAttribute('url-match');
    var url = child.getAttribute('import');
    var isDefault = child.getAttribute('default') !== null;

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
  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];

    if (url.match(route.match)) {
      return route;
    }
  }

  var defaultRoute = routes.filter(function (el) {
    return el.default;
  })[0] || routes[0];
  return defaultRoute;
}

function setInnerHTML(elm, html) {
  elm.innerHTML = html;
  Array.from(elm.querySelectorAll("script")).forEach(function (el) {
    var newEl = document.createElement("script");
    Array.from(el.attributes).forEach(function (el) {
      newEl.setAttribute(el.name, el.value);
    });
    newEl.appendChild(document.createTextNode(el.innerHTML));
    el.parentNode.replaceChild(newEl, el);
  });
}

var HCEDynamicContents =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCEDynamicContents, _HTMLCustomElement);

  function HCEDynamicContents() {
    _classCallCheck(this, HCEDynamicContents);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEDynamicContents).apply(this, arguments));
  }

  _createClass(HCEDynamicContents, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.routes = getRoutesFromChildren(this);
      var supportsPopState = window.navigator.userAgent.indexOf('Trident') === -1;
      var popstate = supportsPopState ? 'popstate' : 'hashchange';
      this.popStateHandler(); // load the contents

      window.addEventListener(popstate, this.popStateHandler.bind(this));
    }
  }, {
    key: "popStateHandler",
    value: function popStateHandler(event) {
      var _this = this;

      var route = getRoute(this.routes, window.location.href);

      if (route) {
        window.fetch(route.import).then(function (response) {
          if (!response.ok) {
            throw Error("[hce-dyn-contents] import url: ".concat(route.import, ", status: ").concat(response.statusText));
          }

          return response.text();
        }).then(function (html) {
          setInnerHTML(_this, html);
          setTimeout(function (_) {
            return window.scrollTo(0, 0);
          });
        });
      }
    }
  }]);

  return HCEDynamicContents;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);
html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"].define('hce-dyn-contents', HCEDynamicContents);

/***/ }),

/***/ "./src/dyn-list/dyn-list.js":
/*!**********************************!*\
  !*** ./src/dyn-list/dyn-list.js ***!
  \**********************************/
/*! exports provided: HCEDynList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCEDynList", function() { return HCEDynList; });
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function __objectToArray(obj) {
  var ret = [];

  for (var key in obj) {
    var item = _typeof(obj[key]) === 'object' ? Object.assign(obj[key], {
      key: key
    }) : {
      key: key,
      value: obj[key]
    };
    ret.push(item);
  }

  return ret;
}

var html = "\n  <div class=\"list\"></div>\n";
var css = "\n  :root.overlay:before {            /* Needed to check click outside of overlay */\n    content: ' ';\n    position: fixed;\n    top: 0; left: 0; right: 0; bottom: 0;\n    background: transparent;\n  }\n  :root.overlay .list {\n    background: #fff;\n    position: absolute;\n    padding: 4px;\n    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, .14),\n      0px 1px 1px 0px rgba(0, 0, 0, .12), \n      0px 2px 1px -1px rgba(0, 0, 0, .4);\n    z-index: 1;\n  }\n";
var HCEDynList =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCEDynList, _HTMLCustomElement);

  function HCEDynList() {
    _classCallCheck(this, HCEDynList);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEDynList).apply(this, arguments));
  }

  _createClass(HCEDynList, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      var templateEl = this.children[0];
      this.template = templateEl && templateEl.outerHTML;
      templateEl.style.display = 'none';
      this.renderWith(html, css).then(function (_) {
        if (_this.visibleBy) {
          var source = _this.getAttribute('[source]') || _this.getAttribute('source');

          var expression = source.match(/[^\(]+/)[0];
          _this.sourceFunc = new Function("return ".concat(expression, ";"));
        }

        _this.visibleBy && _this.setBehaviourOfVisibleBy(_this.visibleBy, _this);
      });
    }
  }, {
    key: "setBehaviourOfVisibleBy",
    value: function setBehaviourOfVisibleBy(visibleBy) {
      var _this2 = this;

      if (visibleBy && !document.querySelector(visibleBy)) {
        console.error('[hce-dyn-list] element not found by selector', visibleBy);
        return false;
      }

      var inputEl = document.querySelector(visibleBy);
      inputEl.setAttribute('autocomplete', 'off');
      inputEl.parentElement.style.position = 'relative';
      var timeout = null;
      inputEl.addEventListener('keyup', function (_) {
        var result = _this2.sourceFunc()();

        if (result) {
          clearTimeout(timeout);
          timeout = setTimeout(function (_) {
            _this2.classList.add('overlay');

            result.then(function (src) {
              _this2.source = src;
              _this2.style.display = 'block';
            });
          }, 100); // keyboard delay for .5 second
        } else {
          _this2.source = [];
        }
      });
      this.style.display = 'none';
      this.addEventListener('click', function (_) {
        if (_this2.isEqualNode(event.target)) {
          _this2.style.display = 'none';
        }
      });
    }
  }, {
    key: "__setList",
    value: function __setList() {
      var _this3 = this;

      var promise = this.source.then ? this.source : Promise.resolve(this.source);
      promise.then(function (src) {
        src = src instanceof Array ? src : __objectToArray(src);
        src.forEach(function (item) {
          var html = _this3.template.replace(/{{(.*?)}}/g, function ($0, expr) {
            var func = new Function("return this.".concat(expr)).bind(item);
            return func();
          });

          var frag = document.createRange().createContextualFragment(html);
          var itemEl = frag.querySelector('*');

          var listSelected = function listSelected(event) {
            var custEvent = Object(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["createCustomEvent"])('selected', {
              detail: item
            });

            _this3.dispatchEvent(custEvent);

            _this3.visibleBy && (_this3.style.display = 'none');
          };

          itemEl.addEventListener('click', listSelected);
          itemEl.addEventListener('keydown', function (event) {
            return event.key === 'Enter' && listSelected(event);
          });
          itemEl.setAttribute('tabindex', 0);

          _this3.querySelector('.list').appendChild(itemEl);
        });
      });
    }
  }, {
    key: "source",
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
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);
HCEDynList.define('hce-dyn-list', HCEDynList);

/***/ }),

/***/ "./src/file/file.js":
/*!**************************!*\
  !*** ./src/file/file.js ***!
  \**************************/
/*! exports provided: HCEFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCEFile", function() { return HCEFile; });
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var fileSVG = "data:image/svg+xml;utf8,\n  <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"52\" height=\"52\" viewBox=\"0 0 52 52\">\n    <path d=\"M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625\n      2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z \">\n    </path>\n    <text x=\"10\" y=\"35\" class=\"small\">SVG</text>\n  </svg>";
var html = "\n  <label class=\"file-zone\" tabindex=\"0\">\n    {{placeholder}}\n    <input type=\"file\" multiple=\"{{multiple}}\"/>\n  </label>\n  <hce-content></hce-content>\n  <ul class=\"preview\"></ul>\n";
var css = "\n  :root {\n    text-align: center;\n    display: inline-block;\n    margin: 24px;\n    padding: 24px;\n    background: #ccc;\n  }\n  :root:hover { background: #eee; }\n  :root.ready {background: rgba(255, 255, 0, 0.5)}\n  .file-zone {cursor: pointer; padding: 4px}\n  .file-zone input {display: none;}\n  .preview { display: flex; align-items: center; justify-content: center; }\n  .preview:empty { display: none;}\n";

function __setReady(ready) {
  return function (event) {
    event.preventDefault();
    this.classList[ready ? 'add' : 'remove']('ready');
  };
}

;
var HCEFile =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCEFile, _HTMLCustomElement);

  function HCEFile() {
    _classCallCheck(this, HCEFile);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEFile).apply(this, arguments));
  }

  _createClass(HCEFile, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.placeholder = 'Drag, Paste, or Select a File Here';
      this.fileTypes;
      this.renderWith(html, css).then(function (_) {
        _this.setEventListener();
      });
    }
  }, {
    key: "setEventListener",
    value: function setEventListener() {
      this.addEventListener('dragover', __setReady(1).bind(this));
      this.addEventListener('dragleave', __setReady(0).bind(this));
      this.addEventListener('drop', this.onFilesChange);
      this.addEventListener('paste', this.onFilesChange);
      this.querySelector('.file-zone input').addEventListener('change', this.onFilesChange.bind(this));
    }
  }, {
    key: "onFilesChange",
    value: function onFilesChange(event) {
      event.preventDefault();
      this.classList.remove('ready');

      if (event.clipboardData) {
        var files = [];

        for (var i = 0; i < event.clipboardData.items.length; i++) {
          var file = event.clipboardData.items[i].getAsFile();
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
    key: "showPreview",
    value: function showPreview() {
      var _this2 = this;

      var preview = this.querySelector('.preview');
      preview.innerHTML = '';

      var _loop = function _loop(i) {
        var file = _this2.files[i];
        var li = document.createElement("li");
        var img = document.createElement("img");

        if (file.type.match(/image/)) {
          img.src = window.URL.createObjectURL(file);

          img.onload = function () {
            img.width = this.width;
            img.height = this.height;
            window.URL.revokeObjectURL(this.src);
          };
        } else {
          img.src = fileSVG.replace('SVG', file.name.match(/\.(.*)$/)[1].toUpperCase());
        }

        li.appendChild(img);
        var info = document.createElement("span");
        info.innerHTML = file.name + ": " + file.size + " bytes";
        li.appendChild(info);
        preview.appendChild(li);
      };

      for (var i = 0; i < this.files.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "files",
    get: function get() {
      return this.__files;
    },
    set: function set(files) {
      if (files.length > 0) {
        this.__files = files;
        var custEvent = Object(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["createCustomEvent"])('files-change', {
          detail: files
        });
        this.dispatchEvent(custEvent);
        this.preview !== false && this.showPreview();
      }
    }
  }]);

  return HCEFile;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);
HCEFile.define('hce-file', HCEFile);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: time */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dyn_contents_dyn_contents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dyn-contents/dyn-contents */ "./src/dyn-contents/dyn-contents.js");
/* harmony import */ var _tooltip_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tooltip/tooltip */ "./src/tooltip/tooltip.js");
/* harmony import */ var _tabs_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tabs/tabs */ "./src/tabs/tabs.js");
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loading/loading */ "./src/loading/loading.js");
/* harmony import */ var _carousel_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./carousel/carousel */ "./src/carousel/carousel.js");
/* harmony import */ var _snackbar_snackbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./snackbar/snackbar */ "./src/snackbar/snackbar.js");
/* harmony import */ var _drawer_drawer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./drawer/drawer */ "./src/drawer/drawer.js");
/* harmony import */ var _dialog_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dialog/dialog */ "./src/dialog/dialog.js");
/* harmony import */ var _calendar_calendar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./calendar/calendar */ "./src/calendar/calendar.js");
/* harmony import */ var _dyn_list_dyn_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dyn-list/dyn-list */ "./src/dyn-list/dyn-list.js");
/* harmony import */ var _overlay_overlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./overlay/overlay */ "./src/overlay/overlay.js");
/* harmony import */ var _menu_menu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./menu/menu */ "./src/menu/menu.js");
/* harmony import */ var _file_file__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./file/file */ "./src/file/file.js");
/* harmony import */ var _sticky_sticky__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./sticky/sticky */ "./src/sticky/sticky.js");
/* harmony import */ var _utils_show_overlay__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils/show-overlay */ "./src/utils/show-overlay.js");
/* harmony import */ var _utils_time__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils/time */ "./src/utils/time.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "time", function() { return _utils_time__WEBPACK_IMPORTED_MODULE_15__["time"]; });
















window.hce = {};
window.hce.showOverlay = _utils_show_overlay__WEBPACK_IMPORTED_MODULE_14__["showOverlay"];
 // time formatter e.g. time().format('yyyy-mm-dd')

/***/ }),

/***/ "./src/loading/loading.js":
/*!********************************!*\
  !*** ./src/loading/loading.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // from https://icons8.com/preloaders/

var svg = "\n  <svg width=\"64px\" height=\"64px\" viewBox=\"0 0 128 128\"  xml:space=\"preserve\"><g>\n    <circle cx=\"16\" cy=\"64\" r=\"16\" fill=\"%23000000\" fill-opacity=\"1\"/>\n    <circle cx=\"16\" cy=\"64\" r=\"16\" fill=\"%23555555\" fill-opacity=\"0.67\" transform=\"rotate(45,64,64)\"/>\n    <circle cx=\"16\" cy=\"64\" r=\"16\" fill=\"%23949494\" fill-opacity=\"0.42\" transform=\"rotate(90,64,64)\"/>\n    <circle cx=\"16\" cy=\"64\" r=\"16\" fill=\"%23cccccc\" fill-opacity=\"0.2\" transform=\"rotate(135,64,64)\"/>\n    <animateTransform attributeName=\"transform\" type=\"rotate\" \n      calcMode=\"discrete\" dur=\"720ms\" repeatCount=\"indefinite\"\n      values=\"0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64\">\n    </animateTransform>\n  </g></svg>";
var css = "\n  :root {\n    display: flex; \n    position: absolute;\n    align-items: center; \n    justify-content: center;\n    background: #fff;\n    opacity: 0.5;\n    width: 100%; height: 100%;\n    top:0; left: 0;\n  }\n  :root > *:first-child {\n    width: 100%;\n    height: 100%;\n    max-width: 64px;\n  }\n";

var HCELoading =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCELoading, _HTMLCustomElement);

  function HCELoading() {
    _classCallCheck(this, HCELoading);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCELoading).apply(this, arguments));
  }

  _createClass(HCELoading, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.renderWith(null, css).then(function (_) {
        !_this.innerHTML.trim() && (_this.innerHTML = svg);
        _this.style.display = _this.loading === '' || _this.loading ? 'flex' : 'none';
      });
    }
  }, {
    key: "show",
    value: function show() {
      this.style.display = 'flex';
    }
  }, {
    key: "hide",
    value: function hide() {
      this.style.display = 'none';
    }
  }]);

  return HCELoading;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);

HCELoading.define('hce-loading', HCELoading);

/***/ }),

/***/ "./src/menu/menu.js":
/*!**************************!*\
  !*** ./src/menu/menu.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var html = "\n<nav role=\"navigation\">\n  <hce-content></hce-content>\n</nav>\n";
var css = "\n  a { text-decoration: none; white-space: nowrap; text-transform: uppercase }\n\n  /* submenu */\n  li > ul { display: none; } /* hide all submenus in default */\n  li.has-submenu:hover > ul { display: block;}\n  li.has-submenu:focus > ul { display: block;}\n  li.has-submenu.submenu-open > ul { display: block;}\n\n  /* basic styles */\n  :root.basic a { transition: all .2s; color: inherit }\n  :root.basic a:hover { color: #fff }\n  :root.basic ul { margin: 0; padding: 0; list-style: none; background: #333; color: #fff }\n  :root.basic li { padding: 8px; position: relative; color: #aaa; }\n\n  :root.basic > ul > li { padding: 15px; }   \n  :root.basic > ul > li:after, :root.basic > ul > li:after { \n    content: ' '; display: block; position: absolute; bottom: 4px; left: 0;\n    width: 100%; height: 2px; opacity: 0; background: #0FF; \n  }\n  :root.basic > ul > li:hover:after, :root.basic > ul > li:focus:after { \n    opacity: 1; transition:all .5s;\n  }\n  :root.basic > ul > li.selected  { color: #fff; }\n  :root.basic li ul{ position: absolute; }  /* submenu items */\n\n  :root.top > ul { display: flex; justify-content: space-around }\n  :root.top li > ul ul { top: 1px; left: calc(100% + 1px); } /* submenu items */\n  :root.top li > ul { top: calc(100% + 1px); left: 0;}\n\n  :root.bottom > ul { display: flex; justify-content: space-around }\n  :root.bottom li > ul ul { bottom: 0; left: calc(100% + 1px); } /* submenu items */\n  :root.bottom li > ul { bottom: calc(100% + 1px); left: 0;}     /* submenu items */\n\n  :root.left > ul { display: inline-block; }       \n  :root.left li > ul {top: 0; left: calc(100% + 1px);}   /* submenu items */\n\n  :root.right > ul { display: inline-block; }\n  :root.right li > ul {top: 0; right: calc(100% + 1px);} /* submenu items */\n";

var HCEMenu =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCEMenu, _HTMLCustomElement);

  function HCEMenu() {
    _classCallCheck(this, HCEMenu);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEMenu).apply(this, arguments));
  }

  _createClass(HCEMenu, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.renderWith(null, css).then(function (_) {
        _this.setAccessibility();
      });
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      name === 'selected-index' && (this.selectedIndex = parseInt(newValue));
    }
  }, {
    key: "setAccessibility",
    value: function setAccessibility() {
      var liEls = this.querySelectorAll('li');
      Array.from(liEls).forEach(function (liEl) {
        if (liEl.querySelector('ul')) {
          // if submenu exists
          liEl.classList.add('has-submenu');
          liEl.setAttribute('tabindex', 0); // make it as an action item

          var aEls = liEl.querySelectorAll('a'); // control show/hide by class 'submenu-open'

          liEl.addEventListener('blur', function (_) {
            return liEl.classList.remove('submenu-open');
          });
          Array.from(aEls).forEach(function (aEl) {
            aEl.addEventListener('focus', function (_) {
              return liEl.classList.add('submenu-open');
            });
            aEl.addEventListener('blur', function (_) {
              setTimeout(function (_) {
                //next focus needs time
                var focused = liEl.querySelector(':focus');
                !focused && liEl.classList.remove('submenu-open');
              }, 10);
            });
          });
        }
      });
    }
  }, {
    key: "selectedIndex",
    get: function get() {
      return this.__selectedIndex;
    },
    set: function set(selectedIndex) {
      this.__selectedIndex = selectedIndex;
      Array.from(this.querySelectorAll('ul > li')).forEach(function (liEl, ndx) {
        var func = ndx === selectedIndex ? 'add' : 'remove';
        liEl.classList[func]('selected');
      });
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['selected-index'];
    }
  }]);

  return HCEMenu;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);

HCEMenu.define('hce-menu', HCEMenu);

/***/ }),

/***/ "./src/overlay/overlay.js":
/*!********************************!*\
  !*** ./src/overlay/overlay.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
/* harmony import */ var _utils_show_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/show-overlay */ "./src/utils/show-overlay.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var css = "\n  :root:before {\n    content: ' ';\n    position: fixed;\n    top: 0; left: 0; right: 0; bottom: 0;\n    background: transparent;\n  }\n  .overlay {\n    background: #fff;\n    padding: 4px;\n    border: 1px solid #ccc;\n    z-index: 1;\n    box-sizing: border-box;\n  }\n";
var html = "\n  <div class=\"overlay\">\n    <hce-content></hce-content>\n  </div>\n";

var HCEOverlay =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCEOverlay, _HTMLCustomElement);

  function HCEOverlay() {
    _classCallCheck(this, HCEOverlay);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCEOverlay).apply(this, arguments));
  }

  _createClass(HCEOverlay, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.style.display = 'none';
      this.renderWith(html, css).then(function (_) {
        _this.visibleBy && _this.setBehaviourOfVisibleBy();

        _this.addEventListener('click', function (event) {
          return _this.isEqualNode(event.target) && (_this.style.display = 'none');
        });
      });
    }
  }, {
    key: "setBehaviourOfVisibleBy",
    value: function setBehaviourOfVisibleBy() {
      var actorEl = document.querySelector(this.visibleBy);

      if (actorEl) {
        actorEl.parentElement.style.position = 'relative';
        actorEl.addEventListener('click', this.show.bind(this));
        actorEl.addEventListener('focus', this.show.bind(this));
      }
    }
  }, {
    key: "show",
    value: function show() {
      var _this2 = this;

      // hide all overlays
      Array.from(document.querySelectorAll('hce-overlay')).forEach(function (el) {
        return el.style.display = 'none';
      });
      this.style.display = 'block';
      this.position = this.getAttribute('position') || 'top';
      this.distance = parseInt(this.getAttribute('distance') || 12);
      this.arrow = this.getAttribute('arrow') !== 'false'; // console.log('......', this.position, this.distance, this.arrow)

      setTimeout(function (_) {
        Object(_utils_show_overlay__WEBPACK_IMPORTED_MODULE_1__["showOverlay"])(_this2.querySelector('.overlay'), _this2.position, {
          distance: _this2.distance,
          arrow: _this2.arrow
        });
      });
    }
  }]);

  return HCEOverlay;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);

HCEOverlay.define('hce-overlay', HCEOverlay);

/***/ }),

/***/ "./src/snackbar/snackbar.css":
/*!***********************************!*\
  !*** ./src/snackbar/snackbar.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":root {\n  visibility: hidden;\n  display: block;\n  position: fixed;\n  padding: 14px 24px;\n  min-width: 288px;\n  max-width: 568px;\n  background-color: #323232;\n  font-size: 14px;\n  border-radius: 2px; /* Rounded borders */\n  color: #fff; /* White text color */\n  z-index: 6;\n  text-align: center;\n  transform: translate(-50%);\n  left: 50%;\n  bottom: 0;\n}"

/***/ }),

/***/ "./src/snackbar/snackbar.js":
/*!**********************************!*\
  !*** ./src/snackbar/snackbar.js ***!
  \**********************************/
/*! exports provided: HCESnackbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCESnackbar", function() { return HCESnackbar; });
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
/* harmony import */ var _snackbar_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snackbar.css */ "./src/snackbar/snackbar.css");
/* harmony import */ var _snackbar_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_snackbar_css__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var customCss = "\n  @keyframes slideInUp {\n    from { transform: translate3d(0,100%,0)  translate(-50%); opacity: 0; }\n    to { opacity: 1; transform: translateZ(0) translate(-50%); }\n  }\n  @keyframes slideOutDown {\n    from { opacity: 1; transform: translateZ(0) translate(-50%); }\n    to { opacity: 0; transform: translate3d(0,100%,0) translate(-50%); }\n  }";
var HCESnackbar =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCESnackbar, _HTMLCustomElement);

  function HCESnackbar() {
    _classCallCheck(this, HCESnackbar);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCESnackbar).apply(this, arguments));
  }

  _createClass(HCESnackbar, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.renderWith(null, _snackbar_css__WEBPACK_IMPORTED_MODULE_1___default.a, customCss);
      window.hce.snackbar = this;
    }
  }, {
    key: "message",
    set: function set(msg) {
      var _this = this;

      this.innerHTML = this.__message = msg;
      this.style.visibility = 'visible';
      this.style.animation = 'slideInUp 0.5s, slideOutDown 0.5s 2.5s';
      setTimeout(function (_) {
        _this.style.visibility = 'hidden';
        _this.style.animation = 'none';
      }, 3000);
    }
  }]);

  return HCESnackbar;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);
HCESnackbar.define('hce-snackbar', HCESnackbar);

/***/ }),

/***/ "./src/sticky/sticky.js":
/*!******************************!*\
  !*** ./src/sticky/sticky.js ***!
  \******************************/
/*! exports provided: HCESticky */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCESticky", function() { return HCESticky; });
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



function computedStyle(el, prop) {
  return window.getComputedStyle(el).getPropertyValue(prop);
}

var css = "\n  :root {position: absolute; box-sizing: border-box;}\n";

function __setParentPositioned(el) {
  var parentElPosition = computedStyle(el.parentElement, 'position');

  if (!['absolute', 'fixed', 'relative'].includes(parentElPosition)) {
    el.parentElement.style.position = 'relative';
  }
}

var HCESticky =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCESticky, _HTMLCustomElement);

  function HCESticky() {
    _classCallCheck(this, HCESticky);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCESticky).apply(this, arguments));
  }

  _createClass(HCESticky, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      __setParentPositioned(this);

      this.renderWith(null, css).then(function (_) {
        _this.bcr = _this.getBoundingClientRect();
        window.addEventListener('scroll', _this.windowScrollHandler.bind(_this));
        window.addEventListener('resize', _this.windowScrollHandler.bind(_this));
      });
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      window.removeEventListener('scroll', this.windowScrollHandler.bind(this));
      window.removeEventListener('resize', this.windowScrollHandler.bind(this));
    } // this is the one

  }, {
    key: "windowScrollHandler",
    value: function windowScrollHandler(event) {
      var parentBCR = this.parentElement.getBoundingClientRect();
      var top = parentBCR.top >= 0; // const left = parentBCR.left >= 0;
      // const bottom = parentBCR.bottom <=  window.innerHeight;
      // const right =  parentBCR.right <= window.innerWidth;
      // const visible = (top && bottom && left && right);

      if (!top) {
        var max = parentBCR.height - this.bcr.height;
        this.style.top = Math.min(parentBCR.top * -1, max) + 'px';
      } else {
        this.style.top = 0;
      }
    }
  }]);

  return HCESticky;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);
HCESticky.define('hce-sticky', HCESticky);

/***/ }),

/***/ "./src/tabs/tabs.js":
/*!**************************!*\
  !*** ./src/tabs/tabs.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var css = "\n  :root {\n    display: block\n  }\n  .tabs {\n    border-bottom: 1px solid #999;\n  }\n  .tabs [tab-for] {\n    display: inline-block;\n    margin: 0 2px;\n    border: 1px solid #999;\n    background: #EEE;\n    padding: 5px 10px;\n    border-radius: 2px 2px 0 0;\n    position: relative;\n    top: 1px;\n  }\n  .tabs [tab-for].selected {\n    background: #FFF;\n    border-bottom: 1px solid transparent;\n  }\n\n  .contents [contents-for] {\n    display: none;\n  }\n  .contents [contents-for].selected {\n    display: block;\n  }\n";

function __select(listEls, indexEl) {
  Array.from(listEls).filter(function (el) {
    return !el.isEqualNode(indexEl);
  }).forEach(function (el) {
    el.classList.remove('selected');
    el.removeAttribute('tabindex');
  });
  indexEl.classList.add('selected');
  indexEl.setAttribute('tabindex', '0');
}

function __keydownHandler(e) {
  var propName = e.key === 'ArrowRight' ? 'nextElementSibling' : e.key === 'ArrowLeft' ? 'previousElementSibling' : 'N/A';
  var nextEl = e.target[propName];

  if (nextEl) {
    var tabId = nextEl.getAttribute('tab-for');
    this.select(tabId); // select tab and contents
  }
}

function __clickHandler(e) {
  var tabId = e.target.getAttribute('tab-for');
  this.select(tabId); // select tab and contents
}

var HCETabs =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCETabs, _HTMLCustomElement);

  function HCETabs() {
    _classCallCheck(this, HCETabs);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCETabs).apply(this, arguments));
  }

  _createClass(HCETabs, [{
    key: "connectedCallback",
    // tabEls: tab index elements with attribute 'tab-for'
    // contentEls: tab contents elements with attribute 'contents-for'
    value: function connectedCallback() {
      var _this = this;

      this.tabEls = this.querySelectorAll('[tab-for]');
      this.contentEls = this.querySelectorAll('[contents-for]');
      this.renderWith(null, css).then(function () {
        _this.select();

        Array.from(_this.tabEls).forEach(function (el) {
          el.addEventListener('click', __clickHandler.bind(_this));
          el.addEventListener('keydown', __keydownHandler.bind(_this));
        });
      });
    }
  }, {
    key: "select",
    value: function select(tabId) {
      if (!tabId) {
        var _tabEl = this.querySelector('[tab-for].selected') || this.tabEls[0];

        tabId = _tabEl.getAttribute('tab-for');
      }

      var tabEl = this.querySelector("[tab-for=".concat(tabId, "]"));
      var contentEl = this.querySelector("[contents-for=".concat(tabId, "]"));

      __select(this.tabEls, tabEl);

      tabEl.focus();

      __select(this.contentEls, contentEl);
    }
  }]);

  return HCETabs;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"]);

html_custom_element__WEBPACK_IMPORTED_MODULE_0__["HTMLCustomElement"].define('hce-tabs', HCETabs);

/***/ }),

/***/ "./src/tooltip/tooltip.js":
/*!********************************!*\
  !*** ./src/tooltip/tooltip.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_show_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/show-overlay */ "./src/utils/show-overlay.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-custom-element */ "../html-custom-element/src/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var css = "\n  :root {\n    display: none;\n    background: #1b1f23;\n    border-radius: 4px;\n    min-width: 120px;\n    padding: 6px 12px;\n    z-index: 1;\n    color: #fff;\n  }\n";

var HCETooltip =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _inherits(HCETooltip, _HTMLCustomElement);

  function HCETooltip() {
    _classCallCheck(this, HCETooltip);

    return _possibleConstructorReturn(this, _getPrototypeOf(HCETooltip).apply(this, arguments));
  }

  _createClass(HCETooltip, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.renderWith(null, css).then(function () {
        _this.position = _this.position || 'top';

        _this.parentElement.addEventListener('mouseover', _this.show.bind(_this));

        _this.parentElement.addEventListener('mouseout', _this.hide.bind(_this));

        _this.parentElement.addEventListener('focus', _this.show.bind(_this));

        _this.parentElement.addEventListener('blur', _this.hide.bind(_this));

        (_this.visible === '' || _this.visible) && _this.show();
      });
    }
  }, {
    key: "show",
    value: function show() {
      Object(_utils_show_overlay__WEBPACK_IMPORTED_MODULE_0__["showOverlay"])(this, this.position, {
        distance: this.distance,
        arrow: true
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.style.display = 'none';
    }
  }]);

  return HCETooltip;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_1__["HTMLCustomElement"]);

html_custom_element__WEBPACK_IMPORTED_MODULE_1__["HTMLCustomElement"].define('hce-tooltip', HCETooltip);

/***/ }),

/***/ "./src/utils/show-overlay.js":
/*!***********************************!*\
  !*** ./src/utils/show-overlay.js ***!
  \***********************************/
/*! exports provided: showOverlay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showOverlay", function() { return showOverlay; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function addArrow(parentEl) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top-center, vertical, outside';
  var arrowEl = parentEl.querySelector('.hce-arrow');

  if (!arrowEl) {
    arrowEl = document.createElement('div');
    arrowEl.className = 'hce-arrow';
    arrowEl.innerHTML = ' ';
    arrowEl.style.cssText = "\n      background: inherit;\n      color: inherit;\n      border: inherit;\n      border-width: 0 0 1px 1px;\n      width: 8px;\n      height: 8px;\n      position: absolute;";
    parentEl.appendChild(arrowEl);
  }

  var _pos$split$map = pos.split(',').map(function (el) {
    return (el || '').trim();
  }),
      _pos$split$map2 = _slicedToArray(_pos$split$map, 3),
      posYX = _pos$split$map2[0],
      hv = _pos$split$map2[1],
      inOut = _pos$split$map2[2];

  var _posYX$split = posYX.split('-'),
      _posYX$split2 = _slicedToArray(_posYX$split, 2),
      posY = _posYX$split2[0],
      posX = _posYX$split2[1];

  var deg = hv === 'vertical' && posY === 'top' ? '-45' : hv === 'vertical' && posY === 'bottom' ? '135' : hv === 'horizontal' && posX === 'left' ? '-135' : hv === 'horizontal' && posX === 'right' ? '45' : '';
  arrowEl.style.transform = '';
  arrowEl.style.top = '';
  arrowEl.style.left = '';
  arrowEl.style[posY] = '';
  arrowEl.style[posX] = '';
  arrowEl.style.transform = 'rotate(' + deg + 'deg)';

  if (hv === 'vertical') {
    arrowEl.style[posY] = "calc(100% - 4px)";

    if (posX === 'center') {
      arrowEl.style.left = "calc(50% - 4px)";
    } else {
      arrowEl.style[posX] = "8px";
    }
  } else if (hv === 'horizontal') {
    arrowEl.style[posX] = "calc(100% - 4px)";

    if (posY === 'center') {
      arrowEl.style.top = "calc(50% - 4px)";
    } else {
      arrowEl.style[posY] = "8px";
    }
  }
}

function showOverlay(el) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top-center, vertical, outside';
  var options = arguments.length > 2 ? arguments[2] : undefined;
  console.log('xxxxxxxxxxxxxxx', el);
  pos = pos === 'top' || pos == 'bottom' ? "".concat(pos, "-center, vertical, outside") : pos === 'left' || pos == 'right' ? "center-".concat(pos, ", horizontal, outside") : pos;

  var _pos$split$map3 = pos.split(',').map(function (el) {
    return (el || '').trim();
  }),
      _pos$split$map4 = _slicedToArray(_pos$split$map3, 3),
      posYX = _pos$split$map4[0],
      hv = _pos$split$map4[1],
      inOut = _pos$split$map4[2];

  var _posYX$split3 = posYX.split('-'),
      _posYX$split4 = _slicedToArray(_posYX$split3, 2),
      posY = _posYX$split4[0],
      posX = _posYX$split4[1];

  var olcss = el.style;
  var distance = options && options.distance || '12';
  var showArrow = options && options.arrow;
  var calc = "calc(100% + ".concat(distance, "px)");
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

/***/ }),

/***/ "./src/utils/time.js":
/*!***************************!*\
  !*** ./src/utils/time.js ***!
  \***************************/
/*! exports provided: time */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "time", function() { return time; });
var i18n = {
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
var masks = {
  default: "ddd mmm dS yyyy HH:MM:ss TT",
  short: "m/d/yy",
  shortTime: "h:MM TT",
  medium: "mmm d, yyyy",
  mediumTime: "h:MM:ss TT",
  long: "mmmm d, yyyy",
  longTime: "h:MM:ss TT Z",
  full: "dddd, mmmm d, yyyy",
  isoDate: "yyyy-mm-dd",
  isoTime: "HH:MM:ss",
  isoDateTime: "yyyy-mm-dd'T'HH:MM:ss"
};

var pad = function pad(val, len) {
  val = String(val);
  len = len || 2;

  while (val.length < len) {
    val = '0' + val;
  }

  return val;
};

function time(argDate) {
  var help = "\n    Available formats\n    ---------------------------------------------------\n    yy:   last two number of year. 17\n    yyyy: full year. 2017,\n    m:    month in number. 1, 12\n    mm:   month in number with 0 padded. 01, 12\n    mmm:  3 letter month. Jan, Dec\n    mmmm: Month in language. January, December\n    d:    day in number. 1, 31\n    dd:   day in number with 0 padded.  01, 31\n    ddd:  week day in 3 letters. Mon, Sun\n    dddd: week day in word.  Monday, Sunday\n    h:    hour in 12 hours format. 1, 12\n    hh:   hour in 12 hours format with 0 padded. 01, 12\n    H:    hour in 24 hours format. 13, 23\n    HH:   hour in 24 hours format with 0 padded. 01, 24\n    s:    seconds in number. 1, 60 \n    ss:   seconds in number with 0 padded. 01, 60\n    t:    am as 'a', pm as 'p'\n    tt:   am or pm\n    T:    am as 'A', pm as 'P'\n    TT:   AM or PM\n    Z:    Timezone. UTC, Pacific,\n    o:    Timezone offset. +5,\n    S:    Ordinary of date, e.g. 1st, 2nd, 3rd, 4th";
  var date = typeof argDate === 'string' ? new Date(argDate) : argDate && argDate.getMonth ? argDate : new Date();
  if (isNaN(date.getMonth())) throw "Invalid date ".concat(argDate);
  return {
    language: 'en',
    i18n: i18n,
    utc: false,
    help: help,
    format: function format(argMask) {
      var mask = masks[argMask] || argMask || masks.default;

      if (argMask && argMask.slice(0, 4) == 'UTC:') {
        // Allow setting the utc argument via the mask
        mask = mask.slice(4);
        this.utc = true;
      }

      var timezoneRE = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
      var timezoneClipRE = /[^-+\dA-Z]/g;
      var get = this.utc ? 'getUTC' : 'get';
      var d = date[get + 'Date'](),
          D = date[get + 'Day'](),
          m = date[get + 'Month'](),
          y = date[get + 'FullYear'](),
          H = date[get + 'Hours'](),
          M = date[get + 'Minutes'](),
          s = date[get + 'Seconds'](),
          L = date[get + 'Milliseconds'](),
          o = this.utc ? 0 : date.getTimezoneOffset();
      var i18n = this.i18n[this.language];
      var flags = {
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
      return mask.replace(/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, function ($0) {
        return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
      });
    }
  };
}

/***/ })

/******/ });
//# sourceMappingURL=app.js.map