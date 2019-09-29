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
/******/ 	var hotCurrentHash = "56860c3da0492a159068";
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
/******/ 			var chunkId = 0;
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
/******/ 			var queue = outdatedModules.map(function(id) {
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
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
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
/******/ 		// Now in "apply" phase
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

/***/ "./demo/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/index.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/prismjs/prism.js");
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
  el.insertAdjacentHTML('beforeend', "\n    <hce-tabs class=\"code\">\n      <div class=\"hce-tabs\">\n        <i tab=\"html\">html</i>\n        <i tab=\"js\">js</i>\n        <i tab=\"css\">css</i>\n      </div>\n      <div class=\"hce-contents\" style=\"background:#f8f8f8\"> \n        <div tab=\"html\"><pre></pre></div>\n        <div tab=\"js\"><pre></pre></div>\n        <div tab=\"css\"><pre></pre></div>\n      </div>\n    </hce-tabs>");
  document.currentScript.insertAdjacentElement('afterend', el);

  function fillCode(id, type) {
    var srcEl;
    var dstEl;
    var html;

    if (id) {
      srcEl = document.getElementById(id);
      dstEl = el.querySelector(".hce-contents [tab=".concat(type, "] pre"));
      var lang = type === 'js' ? 'javascript' : type;
      html = prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.highlight(srcEl.innerHTML.replace(/^\n(\s+)/, '$1'), prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.languages[lang], lang);
      html = html.replace(/hce-[\w-]+/g, function ($0) {
        return "<b>".concat($0, "</b>");
      });
      highlight && (html = html.replace(highlight, function ($0) {
        return "<b>".concat($0, "</b>");
      }));
      dstEl.innerHTML = html;
    } else {
      el.querySelector(".hce-tabs [tab=".concat(type, "]")).remove();
      el.querySelector(".hce-contents [tab=".concat(type, "]")).remove();
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

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/get.js":
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var superPropBase = __webpack_require__("./node_modules/@babel/runtime/helpers/superPropBase.js");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__("./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("./node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__("./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__("./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__("./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var nonIterableRest = __webpack_require__("./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/superPropBase.js":
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/html-custom-element/dist/html-custom-element.umd.js":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(window,function(){return function(n){var r={};function o(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}return o.m=n,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=41)}([function(t,e,n){var v=n(3),m=n(8),y=n(10),b=n(29),g=n(25),E="prototype",T=function(t,e,n){var r,o,i,u,a=t&T.F,c=t&T.G,l=t&T.S,s=t&T.P,f=t&T.B,p=c?v:l?v[e]||(v[e]={}):(v[e]||{})[E],h=c?m:m[e]||(m[e]={}),d=h[E]||(h[E]={});for(r in c&&(n=e),n)i=((o=!a&&p&&void 0!==p[r])?p:n)[r],u=f&&o?g(i,v):s&&"function"==typeof i?g(Function.call,i):i,p&&b(p,r,i,t&T.U),h[r]!=i&&y(h,r,u),s&&d[r]!=i&&(d[r]=i)};v.core=m,T.F=1,T.G=2,T.S=4,T.P=8,T.B=16,T.W=32,T.U=64,T.R=128,t.exports=T},function(t,e,n){"use strict";var r=n(5);t.exports=function(t,e){return!!t&&r(function(){e?t.call(null,function(){},1):t.call(null)})}},function(t,e,n){var r=n(32)("wks"),o=n(24),i=n(3).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var r=n(20),o=Math.min;t.exports=function(t){return 0<t?o(r(t),9007199254740991):0}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(26);t.exports=function(t){return Object(r(t))}},function(t,e,n){var g=n(25),E=n(18),T=n(6),M=n(4),r=n(68);t.exports=function(f,t){var p=1==f,h=2==f,d=3==f,v=4==f,m=6==f,y=5==f||m,b=t||r;return function(t,e,n){for(var r,o,i=T(t),u=E(i),a=g(e,n,3),c=M(u.length),l=0,s=p?b(t,c):h?b(t,0):void 0;l<c;l++)if((y||l in u)&&(o=a(r=u[l],l,i),f))if(p)s[l]=o;else if(o)switch(f){case 3:return!0;case 5:return r;case 6:return l;case 2:s.push(r)}else if(v)return!1;return m?-1:d||v?v:s}}},function(t,e){var n=t.exports={version:"2.6.3"};"number"==typeof __e&&(__e=n)},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(11),o=n(23);t.exports=n(13)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(12),o=n(44),i=n(45),u=Object.defineProperty;e.f=n(13)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(9);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){t.exports=!n(5)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(18),o=n(26);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(2)("unscopables"),o=Array.prototype;null==o[r]&&n(10)(o,r,{}),t.exports=function(t){o[r][t]=!0}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(19);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(0<t?r:n)(t)}},function(t,e,n){var r=n(20),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e){t.exports={}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var i=n(14);t.exports=function(r,o,t){if(i(r),void 0===o)return r;switch(t){case 1:return function(t){return r.call(o,t)};case 2:return function(t,e){return r.call(o,t,e)};case 3:return function(t,e,n){return r.call(o,t,e,n)}}return function(){return r.apply(o,arguments)}}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(32)("keys"),o=n(24);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(9),o=n(3).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var i=n(3),u=n(10),a=n(17),c=n(24)("src"),r="toString",o=Function[r],l=(""+o).split(r);n(8).inspectSource=function(t){return o.call(t)},(t.exports=function(t,e,n,r){var o="function"==typeof n;o&&(a(n,"name")||u(n,"name",e)),t[e]!==n&&(o&&(a(n,c)||u(n,c,t[e]?""+t[e]:l.join(String(e)))),t===i?t[e]=n:r?t[e]?t[e]=n:u(t,e,n):(delete t[e],u(t,e,n)))})(Function.prototype,r,function(){return"function"==typeof this&&this[c]||o.call(this)})},function(t,e,r){var o=r(12),i=r(46),u=r(34),a=r(27)("IE_PROTO"),c=function(){},l="prototype",s=function(){var t,e=r(28)("iframe"),n=u.length;for(e.style.display="none",r(35).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),s=t.F;n--;)delete s[l][u[n]];return s()};t.exports=Object.create||function(t,e){var n;return null!==t?(c[l]=o(t),n=new c,c[l]=null,n[a]=t):n=s(),void 0===e?n:i(n,e)}},function(t,e,n){var c=n(15),l=n(4),s=n(21);t.exports=function(a){return function(t,e,n){var r,o=c(t),i=l(o.length),u=s(n,i);if(a&&e!=e){for(;u<i;)if((r=o[u++])!=r)return!0}else for(;u<i;u++)if((a||u in o)&&o[u]===e)return a||u||0;return!a&&-1}}},function(t,e,n){var r=n(8),o=n(3),i="__core-js_shared__",u=o[i]||(o[i]={});(t.exports=function(t,e){return u[t]||(u[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(33)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports=!1},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(3).document;t.exports=r&&r.documentElement},function(t,e,n){"use strict";var g=n(33),E=n(0),T=n(29),M=n(10),L=n(22),H=n(54),w=n(37),_=n(55),x=n(2)("iterator"),A=!([].keys&&"next"in[].keys()),O="values",C=function(){return this};t.exports=function(t,e,n,r,o,i,u){H(n,e,r);var a,c,l,s=function(t){if(!A&&t in d)return d[t];switch(t){case"keys":case O:return function(){return new n(this,t)}}return function(){return new n(this,t)}},f=e+" Iterator",p=o==O,h=!1,d=t.prototype,v=d[x]||d["@@iterator"]||o&&d[o],m=v||s(o),y=o?p?s("entries"):m:void 0,b="Array"==e&&d.entries||v;if(b&&(l=_(b.call(new t)))!==Object.prototype&&l.next&&(w(l,f,!0),g||"function"==typeof l[x]||M(l,x,C)),p&&v&&v.name!==O&&(h=!0,m=function(){return v.call(this)}),g&&!u||!A&&!h&&d[x]||M(d,x,m),L[e]=m,L[f]=C,o)if(a={values:p?m:s(O),keys:i?m:s("keys"),entries:y},u)for(c in a)c in d||T(d,c,a[c]);else E(E.P+E.F*(A||h),e,a);return a}},function(t,e,n){var r=n(11).f,o=n(17),i=n(2)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(19);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){"use strict";var r=n(11),o=n(23);t.exports=function(t,e,n){e in t?r.f(t,e,o(0,n)):t[e]=n}},function(t,e,n){var s=n(14),f=n(6),p=n(18),h=n(4);t.exports=function(t,e,n,r,o){s(e);var i=f(t),u=p(i),a=h(i.length),c=o?a-1:0,l=o?-1:1;if(n<2)for(;;){if(c in u){r=u[c],c+=l;break}if(c+=l,o?c<0:a<=c)throw TypeError("Reduce of empty array with no initial value")}for(;o?0<=c:c<a;c+=l)c in u&&(r=e(r,u[c],c,i));return r}},function(t,e,n){n(42),n(51),t.exports=n(88)},function(t,e,n){n(43),t.exports=n(8).Reflect.construct},function(t,e,n){var r=n(0),a=n(30),c=n(14),l=n(12),s=n(9),o=n(5),f=n(49),p=(n(3).Reflect||{}).construct,h=o(function(){function t(){}return!(p(function(){},[],t)instanceof t)}),d=!o(function(){p(function(){})});r(r.S+r.F*(h||d),"Reflect",{construct:function(t,e){c(t),l(e);var n=arguments.length<3?t:c(arguments[2]);if(d&&!h)return p(t,e,n);if(t==n){switch(e.length){case 0:return new t;case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3])}var r=[null];return r.push.apply(r,e),new(f.apply(t,r))}var o=n.prototype,i=a(s(o)?o:Object.prototype),u=Function.apply.call(t,i,e);return s(u)?u:i}})},function(t,e,n){t.exports=!n(13)&&!n(5)(function(){return 7!=Object.defineProperty(n(28)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var o=n(9);t.exports=function(t,e){if(!o(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!o(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var u=n(11),a=n(12),c=n(47);t.exports=n(13)?Object.defineProperties:function(t,e){a(t);for(var n,r=c(e),o=r.length,i=0;i<o;)u.f(t,n=r[i++],e[n]);return t}},function(t,e,n){var r=n(48),o=n(34);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var u=n(17),a=n(15),c=n(31)(!1),l=n(27)("IE_PROTO");t.exports=function(t,e){var n,r=a(t),o=0,i=[];for(n in r)n!=l&&u(r,n)&&i.push(n);for(;e.length>o;)u(r,n=e[o++])&&(~c(i,n)||i.push(n));return i}},function(t,e,n){"use strict";var i=n(14),u=n(9),a=n(50),c=[].slice,l={};t.exports=Function.bind||function(e){var n=i(this),r=c.call(arguments,1),o=function(){var t=r.concat(c.call(arguments));return this instanceof o?function(t,e,n){if(!(e in l)){for(var r=[],o=0;o<e;o++)r[o]="a["+o+"]";l[e]=Function("F,a","return new F("+r.join(",")+")")}return l[e](t,n)}(n,t.length,t):a(n,t,e)};return u(n.prototype)&&(o.prototype=n.prototype),o}},function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){n(52),n(56),n(57),n(63),n(64),n(65),n(66),n(67),n(70),n(71),n(72),n(73),n(74),n(75),n(76),n(77),n(78),n(80),n(82),n(83),n(84),n(86),t.exports=n(8).Array},function(t,e,n){"use strict";var r=n(53)(!0);n(36)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var c=n(20),l=n(26);t.exports=function(a){return function(t,e){var n,r,o=String(l(t)),i=c(e),u=o.length;return i<0||u<=i?a?"":void 0:(n=o.charCodeAt(i))<55296||56319<n||i+1===u||(r=o.charCodeAt(i+1))<56320||57343<r?a?o.charAt(i):n:a?o.slice(i,i+2):r-56320+(n-55296<<10)+65536}}},function(t,e,n){"use strict";var r=n(30),o=n(23),i=n(37),u={};n(10)(u,n(2)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(17),o=n(6),i=n(27)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(0);r(r.S,"Array",{isArray:n(38)})},function(t,e,n){"use strict";var p=n(25),r=n(0),h=n(6),d=n(58),v=n(59),m=n(4),y=n(39),b=n(60);r(r.S+r.F*!n(62)(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,r,o,i=h(t),u="function"==typeof this?this:Array,a=arguments.length,c=1<a?arguments[1]:void 0,l=void 0!==c,s=0,f=b(i);if(l&&(c=p(c,2<a?arguments[2]:void 0,2)),null==f||u==Array&&v(f))for(n=new u(e=m(i.length));s<e;s++)y(n,s,l?c(i[s],s):i[s]);else for(o=f.call(i),n=new u;!(r=o.next()).done;s++)y(n,s,l?d(o,c,[r.value,s],!0):r.value);return n.length=s,n}})},function(t,e,n){var i=n(12);t.exports=function(e,t,n,r){try{return r?t(i(n)[0],n[1]):t(n)}catch(t){var o=e.return;throw void 0!==o&&i(o.call(e)),t}}},function(t,e,n){var r=n(22),o=n(2)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,e,n){var r=n(61),o=n(2)("iterator"),i=n(22);t.exports=n(8).getIteratorMethod=function(t){if(null!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,e,n){var o=n(19),i=n(2)("toStringTag"),u="Arguments"==o(function(){return arguments}());t.exports=function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),i))?n:u?o(e):"Object"==(r=o(e))&&"function"==typeof e.callee?"Arguments":r}},function(t,e,n){var i=n(2)("iterator"),u=!1;try{var r=[7][i]();r.return=function(){u=!0},Array.from(r,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!u)return!1;var n=!1;try{var r=[7],o=r[i]();o.next=function(){return{done:n=!0}},r[i]=function(){return o},t(r)}catch(t){}return n}},function(t,e,n){"use strict";var r=n(0),o=n(39);r(r.S+r.F*n(5)(function(){function t(){}return!(Array.of.call(t)instanceof t)}),"Array",{of:function(){for(var t=0,e=arguments.length,n=new("function"==typeof this?this:Array)(e);t<e;)o(n,t,arguments[t++]);return n.length=e,n}})},function(t,e,n){"use strict";var r=n(0),o=n(15),i=[].join;r(r.P+r.F*(n(18)!=Object||!n(1)(i)),"Array",{join:function(t){return i.call(o(this),void 0===t?",":t)}})},function(t,e,n){"use strict";var r=n(0),o=n(35),l=n(19),s=n(21),f=n(4),p=[].slice;r(r.P+r.F*n(5)(function(){o&&p.call(o)}),"Array",{slice:function(t,e){var n=f(this.length),r=l(this);if(e=void 0===e?n:e,"Array"==r)return p.call(this,t,e);for(var o=s(t,n),i=s(e,n),u=f(i-o),a=new Array(u),c=0;c<u;c++)a[c]="String"==r?this.charAt(o+c):this[o+c];return a}})},function(t,e,n){"use strict";var r=n(0),o=n(14),i=n(6),u=n(5),a=[].sort,c=[1,2,3];r(r.P+r.F*(u(function(){c.sort(void 0)})||!u(function(){c.sort(null)})||!n(1)(a)),"Array",{sort:function(t){return void 0===t?a.call(i(this)):a.call(i(this),o(t))}})},function(t,e,n){"use strict";var r=n(0),o=n(7)(0),i=n(1)([].forEach,!0);r(r.P+r.F*!i,"Array",{forEach:function(t){return o(this,t,arguments[1])}})},function(t,e,n){var r=n(69);t.exports=function(t,e){return new(r(t))(e)}},function(t,e,n){var r=n(9),o=n(38),i=n(2)("species");t.exports=function(t){var e;return o(t)&&("function"!=typeof(e=t.constructor)||e!==Array&&!o(e.prototype)||(e=void 0),r(e)&&null===(e=e[i])&&(e=void 0)),void 0===e?Array:e}},function(t,e,n){"use strict";var r=n(0),o=n(7)(1);r(r.P+r.F*!n(1)([].map,!0),"Array",{map:function(t){return o(this,t,arguments[1])}})},function(t,e,n){"use strict";var r=n(0),o=n(7)(2);r(r.P+r.F*!n(1)([].filter,!0),"Array",{filter:function(t){return o(this,t,arguments[1])}})},function(t,e,n){"use strict";var r=n(0),o=n(7)(3);r(r.P+r.F*!n(1)([].some,!0),"Array",{some:function(t){return o(this,t,arguments[1])}})},function(t,e,n){"use strict";var r=n(0),o=n(7)(4);r(r.P+r.F*!n(1)([].every,!0),"Array",{every:function(t){return o(this,t,arguments[1])}})},function(t,e,n){"use strict";var r=n(0),o=n(40);r(r.P+r.F*!n(1)([].reduce,!0),"Array",{reduce:function(t){return o(this,t,arguments.length,arguments[1],!1)}})},function(t,e,n){"use strict";var r=n(0),o=n(40);r(r.P+r.F*!n(1)([].reduceRight,!0),"Array",{reduceRight:function(t){return o(this,t,arguments.length,arguments[1],!0)}})},function(t,e,n){"use strict";var r=n(0),o=n(31)(!1),i=[].indexOf,u=!!i&&1/[1].indexOf(1,-0)<0;r(r.P+r.F*(u||!n(1)(i)),"Array",{indexOf:function(t){return u?i.apply(this,arguments)||0:o(this,t,arguments[1])}})},function(t,e,n){"use strict";var r=n(0),o=n(15),i=n(20),u=n(4),a=[].lastIndexOf,c=!!a&&1/[1].lastIndexOf(1,-0)<0;r(r.P+r.F*(c||!n(1)(a)),"Array",{lastIndexOf:function(t){if(c)return a.apply(this,arguments)||0;var e=o(this),n=u(e.length),r=n-1;for(1<arguments.length&&(r=Math.min(r,i(arguments[1]))),r<0&&(r=n+r);0<=r;r--)if(r in e&&e[r]===t)return r||0;return-1}})},function(t,e,n){var r=n(0);r(r.P,"Array",{copyWithin:n(79)}),n(16)("copyWithin")},function(t,e,n){"use strict";var l=n(6),s=n(21),f=n(4);t.exports=[].copyWithin||function(t,e){var n=l(this),r=f(n.length),o=s(t,r),i=s(e,r),u=2<arguments.length?arguments[2]:void 0,a=Math.min((void 0===u?r:s(u,r))-i,r-o),c=1;for(i<o&&o<i+a&&(c=-1,i+=a-1,o+=a-1);0<a--;)i in n?n[o]=n[i]:delete n[o],o+=c,i+=c;return n}},function(t,e,n){var r=n(0);r(r.P,"Array",{fill:n(81)}),n(16)("fill")},function(t,e,n){"use strict";var a=n(6),c=n(21),l=n(4);t.exports=function(t){for(var e=a(this),n=l(e.length),r=arguments.length,o=c(1<r?arguments[1]:void 0,n),i=2<r?arguments[2]:void 0,u=void 0===i?n:c(i,n);o<u;)e[o++]=t;return e}},function(t,e,n){"use strict";var r=n(0),o=n(7)(5),i="find",u=!0;i in[]&&Array(1)[i](function(){u=!1}),r(r.P+r.F*u,"Array",{find:function(t){return o(this,t,1<arguments.length?arguments[1]:void 0)}}),n(16)(i)},function(t,e,n){"use strict";var r=n(0),o=n(7)(6),i="findIndex",u=!0;i in[]&&Array(1)[i](function(){u=!1}),r(r.P+r.F*u,"Array",{findIndex:function(t){return o(this,t,1<arguments.length?arguments[1]:void 0)}}),n(16)(i)},function(t,e,n){n(85)("Array")},function(t,e,n){"use strict";var r=n(3),o=n(11),i=n(13),u=n(2)("species");t.exports=function(t){var e=r[t];i&&e&&!e[u]&&o.f(e,u,{configurable:!0,get:function(){return this}})}},function(t,e,n){"use strict";var r=n(16),o=n(87),i=n(22),u=n(15);t.exports=n(36)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(89);Object.defineProperty(e,"HTMLCustomElement",{enumerable:!0,get:function(){return r.HTMLCustomElement}});var o=n(92);Object.defineProperty(e,"createCustomEvent",{enumerable:!0,get:function(){return o.createCustomEvent}}),Element.prototype.closest||(Element.prototype.closest=function(t){var e=this;do{if(e.matches(t))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType);return null})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.HTMLCustomElement=void 0;var r=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}}(),c=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(o)throw i}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")};e.setStyleEl=s,e.getPropsFromAttributes=f,e.bindEvent=p,e.bindExpression=h,n(90);var l=n(91);function o(){return Reflect.construct(HTMLElement,[],this.__proto__.constructor)}function s(t){var e=function(t){for(var e=0,n=0,r=t.length;n<r;n++)e=(e<<5)-e+t.charCodeAt(n),e&=e;return"hce"+Math.abs(e).toString(16)}(t=t.replace(/,\s*?[\r\n]\s*?/gm,", ")),n=t.replace(/\s?([^@][\:\>\*\~\[\]\-\(\)a-z\.\, ])+\{/gm,function(t){return"\n"+t.split(/,\s*/).map(function(t){return("."+e+" "+t).replace(/\s*:root/g,"")}).join(", ")}),r=document.querySelector("style#"+e);return r?r.numEl++:((r=document.createElement("style")).appendChild(document.createTextNode(n)),r.setAttribute("id",e),r.numEl=1,document.head.appendChild(r)),r}function f(t){var r=/^(on.*|aria-.*|data-.*|class|dir|hidden|id|is|lang|style|tabindex|title)$/,o={},e=t.closest(".hce");return e&&e.hcePropKeys.forEach(function(t){return o[t]=e[t]}),Array.from(t.attributes).forEach(function(e){if(!e.name.match(r)){var n=e.name.match(/^\(.*\)$/)?e.name:e.name.replace(/-([a-z])/gi,function(t){return t[1].toUpperCase()});if(!t[n])try{o[n]=JSON.parse(e.value)}catch(t){o[n]=e.value}}}),o}function p(t,e,n){e=e.replace(/[\(\)]/g,"");var r=n.match(/^(\w+)(\(*.*?\))?$/),o=c(r,3),i=(o[0],o[1]),u=[];u=((o[2]||"").replace(/[()]/g,"")||"event").split(",").map(function(t){var e=t.trim();return"event"===e?"event":e.match(/^[\-\.0-9]/)?e:e.match(/^(true|false)$/)?e:e.match(/^['"].*['"]$/)?e:"this."+e});var a=new Function("event","return "+i+"("+u.join(",")+")");t.addEventListener(e,a.bind(t))}function h(t,e,n){e=e.replace(/[\[\]]/g,"");var r=new Function("return "+n+";");try{t[e]=r()}catch(t){console.log('Invalid expression, "'+n+'" '+t.message)}}Object.setPrototypeOf(o.prototype,HTMLElement.prototype),Object.setPrototypeOf(o,HTMLElement);e.HTMLCustomElement=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,o),r(e,[{key:"disconnectedCallback",value:function(){this.styleEl&&(this.styleEl.numEl--,!this.styleEl.numEl&&this.styleEl.remove())}},{key:"renderWith",value:function(o,i,u){var a=this;return new Promise(function(r){setTimeout(function(t){var e=f(a);for(var n in a.hcePropKeys=Object.keys(e),e)n.match(/^\[.*\]$/)?h(a,n,e[n]):n.match(/^\(.*\)$/)&&e[n]?p(a,n,e[n]):a[n]=e[n];o&&(o.indexOf("<hce-content></hce-content>")&&(o=o.replace(/<hce-content><\/hce-content>/,a.innerHTML)),a.binding=new l.OneWayBinding(o),a.innerHTML=a.binding.newHtml,a.binding.setBindingDOMElements(a),a.detectChanges(),(0,l.bindEvents)(a,a.binding.events)),i&&(a.styleEl=s(i),a.classList.add(a.styleEl.id),u&&a.styleEl.appendChild(document.createTextNode(u))),a.classList.add("hce"),r(a)})})}},{key:"detectChanges",value:function(){(0,l.bindExpressions)(this,this.binding.expressions)}},{key:"disappear",value:function(){var e=this,t=window.getComputedStyle(this);"0s"===t.transitionDuration&&(this.style.transition="all .3s linear"),this.displayStyle=t.display,this.style.opacity=0,setTimeout(function(t){return e.style.display="none"},330)}},{key:"appear",value:function(t){var e=this;"0s"===window.getComputedStyle(this).transitionDuration&&(this.style.transition="all .3s linear"),this.style.display=t||this.displayStyle||"block",this.style.opacity=0,setTimeout(function(t){return e.style.opacity=1},20)}}],[{key:"define",value:function(t,e){!customElements.get(t)&&customElements.define(t,e)}}]),e}()},function(t,e){
/*! (C) Andrea Giammarchi - @WebReflection - ISC Style License */
!function(o,t){"use strict";function n(){var t=w.splice(0,w.length);for(Yt=0;t.length;)t.shift().call(null,t.shift())}function c(t,e){for(var n=0,r=t.length;n<r;n++)v(t[n],e)}function l(e){return function(t){Rt(t)&&(v(t,e),ct.length&&c(t.querySelectorAll(ct),e))}}function i(t){var e=qt.call(t,"is"),n=t.nodeName.toUpperCase(),r=st.call(ut,e?rt+e.toUpperCase():nt+n);return e&&-1<r&&!a(n,e)?-1:r}function a(t,e){return-1<ct.indexOf(t+'[is="'+e+'"]')}function s(t){var e=t.currentTarget,n=t.attrChange,r=t.attrName,o=t.target,i=t[Q]||2,u=t[Y]||3;!ie||o&&o!==e||!e[z]||"style"===r||t.prevValue===t.newValue&&(""!==t.newValue||n!==i&&n!==u)||e[z](r,n===i?null:t.prevValue,n===u?null:t.newValue)}function f(t){var e=l(t);return function(t){w.push(e,t.target),Yt&&clearTimeout(Yt),Yt=setTimeout(n,1)}}function p(t){oe&&(oe=!1,t.currentTarget.removeEventListener(et,p)),ct.length&&c((t.target||M).querySelectorAll(ct),t.detail===q?q:U),It&&function(){for(var t,e=0,n=Vt.length;e<n;e++)t=Vt[e],lt.contains(t)||(n--,Vt.splice(e--,1),v(t,q))}()}function r(t,e){Gt.call(this,t,e),_.call(this,{target:this})}function h(t,e,n){var r=e.apply(t,n),o=i(r);return-1<o&&S(r,at[o]),n.pop()&&ct.length&&function(t){for(var e,n=0,r=t.length;n<r;n++)e=t[n],S(e,at[i(e)])}(r.querySelectorAll(ct)),r}function u(t,e){Nt(t,e),O?O.observe(t,Jt):(re&&(t.setAttribute=r,t[V]=A(t),t[B]("DOMSubtreeModified",_)),t[B](tt,s)),t[X]&&ie&&(t.created=!0,t[X](),t.created=!1)}function d(t){throw new Error("A "+t+" type is already registered")}function v(t,e){var n,r,o=i(t);-1<o&&(P(t,at[o]),o=0,e!==U||t[U]?e!==q||t[q]||(t[U]=!1,t[q]=!0,r="disconnected",o=1):(t[q]=!1,t[U]=!0,r="connected",o=1,It&&st.call(Vt,t)<0&&Vt.push(t)),o&&(n=t[e+$]||t[r+$])&&n.call(t))}function m(){}function y(t,e,n){var r=n&&n[W]||"",o=e.prototype,i=St(o),u=e.observedAttributes||vt,a={prototype:i};Dt(i,X,{value:function(){if(xt)xt=!1;else if(!this[Tt]){this[Tt]=!0,new e(this),o[X]&&o[X].call(this);var t=At[Ct.get(e)];(!Lt||1<t.create.length)&&g(this)}}}),Dt(i,z,{value:function(t){-1<st.call(u,t)&&o[z]&&o[z].apply(this,arguments)}}),o[Z]&&Dt(i,G,{value:o[Z]}),o[K]&&Dt(i,J,{value:o[K]}),r&&(a[W]=r),t=t.toUpperCase(),At[t]={constructor:e,create:r?[r,Pt(t)]:[t]},Ct.set(e,t),M[R](t.toLowerCase(),a),E(t),Ot[t].r()}function e(t){var e=At[t.toUpperCase()];return e&&e.constructor}function b(t){return"string"==typeof t?t:t&&t.is||""}function g(t){for(var e,n=t[z],r=n?t.attributes:vt,o=r.length;o--;)e=r[o],n.call(t,e.name||e.nodeName,null,e.value||e.nodeValue)}function E(e){return(e=e.toUpperCase())in Ot||(Ot[e]={},Ot[e].p=new _t(function(t){Ot[e].r=t})),Ot[e].p}function T(){Mt&&delete o.customElements,dt(o,"customElements",{configurable:!0,value:new m}),dt(o,"CustomElementRegistry",{configurable:!0,value:m});for(var t=H.get(/^HTML[A-Z]*[a-z]/),e=t.length;e--;function(e){var r=o[e];if(r){o[e]=function(t){var e,n;return t||(t=this),t[Tt]||(xt=!0,e=At[Ct.get(t.constructor)],(t=(n=Lt&&1===e.create.length)?Reflect.construct(r,vt,e.constructor):M.createElement.apply(M,e.create))[Tt]=!0,xt=!1,n||g(t)),t},o[e].prototype=r.prototype;try{r.prototype.constructor=o[e]}catch(t){!0,dt(r,Tt,{value:o[e]})}}}(t[e]));M.createElement=function(t,e){var n=b(e);return n?Xt.call(this,t,Pt(n)):Xt.call(this,t)},te||(ne=!0,M[R](""))}var M=o.document,L=o.Object,H=function(t){var e,n,r,o,i=/^[A-Z]+[a-z]/,u=function(t,e){(e=e.toLowerCase())in a||(a[t]=(a[t]||[]).concat(e),a[e]=a[e.toUpperCase()]=t)},a=(L.create||L)(null),c={};for(n in t)for(o in t[n])for(r=t[n][o],a[o]=r,e=0;e<r.length;e++)a[r[e].toLowerCase()]=a[r[e].toUpperCase()]=o;return c.get=function(t){return"string"==typeof t?a[t]||(i.test(t)?[]:""):function(t){var e,n=[];for(e in a)t.test(e)&&n.push(e);return n}(t)},c.set=function(t,e){return i.test(t)?u(t,e):u(e,t),c},c}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});"object"!=typeof t&&(t={type:t||"auto"});var w,_,x,A,O,C,P,S,N,j,F,k,I,D,R="registerElement",V="__"+R+(1e5*o.Math.random()>>0),B="addEventListener",U="attached",$="Callback",q="detached",W="extends",z="attributeChanged"+$,G=U+$,Z="connected"+$,K="disconnected"+$,X="created"+$,J=q+$,Q="ADDITION",Y="REMOVAL",tt="DOMAttrModified",et="DOMContentLoaded",nt="<",rt="=",ot=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,it=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],ut=[],at=[],ct="",lt=M.documentElement,st=ut.indexOf||function(t){for(var e=this.length;e--&&this[e]!==t;);return e},ft=L.prototype,pt=ft.hasOwnProperty,ht=ft.isPrototypeOf,dt=L.defineProperty,vt=[],mt=L.getOwnPropertyDescriptor,yt=L.getOwnPropertyNames,bt=L.getPrototypeOf,gt=L.setPrototypeOf,Et=!!L.__proto__,Tt="__dreCEv1",Mt=o.customElements,Lt=!/^force/.test(t.type)&&!!(Mt&&Mt.define&&Mt.get&&Mt.whenDefined),Ht=L.create||L,wt=o.Map||function(){var n,r=[],o=[];return{get:function(t){return o[st.call(r,t)]},set:function(t,e){(n=st.call(r,t))<0?o[r.push(t)-1]=e:o[n]=e}}},_t=o.Promise||function(t){function e(t){for(r=!0;n.length;)n.shift()(t)}var n=[],r=!1,o={catch:function(){return o},then:function(t){return n.push(t),r&&setTimeout(e,1),o}};return t(e),o},xt=!1,At=Ht(null),Ot=Ht(null),Ct=new wt,Pt=function(t){return t.toLowerCase()},St=L.create||function t(e){return e?(t.prototype=e,new t):this},Nt=gt||(Et?function(t,e){return t.__proto__=e,t}:yt&&mt?function(){function n(t,e){for(var n,r=yt(e),o=0,i=r.length;o<i;o++)n=r[o],pt.call(t,n)||dt(t,n,mt(e,n))}return function(t,e){for(;n(t,e),(e=bt(e))&&!ht.call(e,t););return t}}():function(t,e){for(var n in e)t[n]=e[n];return t}),jt=o.MutationObserver||o.WebKitMutationObserver,Ft=o.HTMLAnchorElement,kt=(o.HTMLElement||o.Element||o.Node).prototype,It=!ht.call(kt,lt),Dt=It?function(t,e,n){return t[e]=n.value,t}:dt,Rt=It?function(t){return 1===t.nodeType}:function(t){return ht.call(kt,t)},Vt=It&&[],Bt=kt.attachShadow,Ut=kt.cloneNode,$t=kt.dispatchEvent,qt=kt.getAttribute,Wt=kt.hasAttribute,zt=kt.removeAttribute,Gt=kt.setAttribute,Zt=M.createElement,Kt=M.importNode,Xt=Zt,Jt=jt&&{attributes:!0,characterData:!0,attributeOldValue:!0},Qt=jt||function(t){re=!1,lt.removeEventListener(tt,Qt)},Yt=0,te=R in M&&!/^force-all/.test(t.type),ee=!0,ne=!1,re=!0,oe=!0,ie=!0;if(jt&&((N=M.createElement("div")).innerHTML="<div><div></div></div>",new jt(function(t,e){if(t[0]&&"childList"==t[0].type&&!t[0].removedNodes[0].childNodes.length){var n=(N=mt(kt,"innerHTML"))&&N.set;n&&dt(kt,"innerHTML",{set:function(t){for(;this.lastChild;)this.removeChild(this.lastChild);n.call(this,t)}})}e.disconnect(),N=null}).observe(N,{childList:!0,subtree:!0}),N.innerHTML=""),te||(S=gt||Et?(P=function(t,e){ht.call(e,t)||u(t,e)},u):P=function(t,e){t[V]||(t[V]=L(!0),u(t,e))},It?(re=!1,j=mt(kt,B),F=j.value,k=function(t){var e=new CustomEvent(tt,{bubbles:!0});e.attrName=t,e.prevValue=qt.call(this,t),e.newValue=null,e[Y]=e.attrChange=2,zt.call(this,t),$t.call(this,e)},I=function(t,e){var n=Wt.call(this,t),r=n&&qt.call(this,t),o=new CustomEvent(tt,{bubbles:!0});Gt.call(this,t,e),o.attrName=t,o.prevValue=n?r:null,o.newValue=e,n?o.MODIFICATION=o.attrChange=1:o[Q]=o.attrChange=0,$t.call(this,o)},D=function(t){var e,n=t.currentTarget,r=n[V],o=t.propertyName;r.hasOwnProperty(o)&&(r=r[o],(e=new CustomEvent(tt,{bubbles:!0})).attrName=r.name,e.prevValue=r.value||null,e.newValue=r.value=n[o]||null,null==e.prevValue?e[Q]=e.attrChange=0:e.MODIFICATION=e.attrChange=1,$t.call(n,e))},j.value=function(t,e,n){t===tt&&this[z]&&this.setAttribute!==I&&(this[V]={className:{name:"class",value:this.className}},this.setAttribute=I,this.removeAttribute=k,F.call(this,"propertychange",D)),F.call(this,t,e,n)},dt(kt,B,j)):jt||(lt[B](tt,Qt),lt.setAttribute(V,1),lt.removeAttribute(V),re&&(_=function(t){var e,n,r,o=this;if(o===t.target){for(r in e=o[V],o[V]=n=A(o),n){if(!(r in e))return x(0,o,r,e[r],n[r],Q);if(n[r]!==e[r])return x(1,o,r,e[r],n[r],"MODIFICATION")}for(r in e)if(!(r in n))return x(2,o,r,e[r],n[r],Y)}},x=function(t,e,n,r,o,i){var u={attrChange:t,currentTarget:e,attrName:n,prevValue:r,newValue:o};u[i]=t,s(u)},A=function(t){for(var e,n,r={},o=t.attributes,i=0,u=o.length;i<u;i++)"setAttribute"!==(n=(e=o[i]).name)&&(r[n]=e.value);return r})),M[R]=function(t,e){if(n=t.toUpperCase(),ee&&(ee=!1,jt?(O=function(u,a){function c(t,e){for(var n=0,r=t.length;n<r;e(t[n++]));}return new jt(function(t){for(var e,n,r,o=0,i=t.length;o<i;o++)"childList"===(e=t[o]).type?(c(e.addedNodes,u),c(e.removedNodes,a)):(n=e.target,ie&&n[z]&&"style"!==e.attributeName&&(r=qt.call(n,e.attributeName))!==e.oldValue&&n[z](e.attributeName,e.oldValue,r))})}(l(U),l(q)),(C=function(t){return O.observe(t,{childList:!0,subtree:!0}),t})(M),Bt&&(kt.attachShadow=function(){return C(Bt.apply(this,arguments))})):(w=[],M[B]("DOMNodeInserted",f(U)),M[B]("DOMNodeRemoved",f(q))),M[B](et,p),M[B]("readystatechange",p),M.importNode=function(t,e){switch(t.nodeType){case 1:return h(M,Kt,[t,!!e]);case 11:for(var n=M.createDocumentFragment(),r=t.childNodes,o=r.length,i=0;i<o;i++)n.appendChild(M.importNode(r[i],!!e));return n;default:return Ut.call(t,!!e)}},kt.cloneNode=function(t){return h(this,Ut,[!!t])}),ne)return ne=!1;if(-2<st.call(ut,rt+n)+st.call(ut,nt+n)&&d(t),!ot.test(n)||-1<st.call(it,n))throw new Error("The type "+t+" is invalid");var n,r,o=function(){return u?M.createElement(a,n):M.createElement(a)},i=e||ft,u=pt.call(i,W),a=u?e[W].toUpperCase():n;return u&&-1<st.call(ut,nt+a)&&d(a),r=ut.push((u?rt:nt)+n)-1,ct=ct.concat(ct.length?",":"",u?a+'[is="'+t.toLowerCase()+'"]':a),o.prototype=at[r]=pt.call(i,"prototype")?i.prototype:St(kt),ct.length&&c(M.querySelectorAll(ct),U),o},M.createElement=Xt=function(t,e){var n=b(e),r=n?Zt.call(M,t,Pt(n)):Zt.call(M,t),o=""+t,i=st.call(ut,(n?rt:nt)+(n||o).toUpperCase()),u=-1<i;return n&&(r.setAttribute("is",n=n.toLowerCase()),u&&(u=a(o.toUpperCase(),n))),ie=!M.createElement.innerHTMLHelper,u&&S(r,at[i]),r}),m.prototype={constructor:m,define:Lt?function(t,e,n){if(n)y(t,e,n);else{var r=t.toUpperCase();At[r]={constructor:e,create:[r]},Ct.set(e,r),Mt.define(t,e)}}:y,get:Lt?function(t){return Mt.get(t)||e(t)}:e,whenDefined:Lt?function(t){return _t.race([Mt.whenDefined(t),E(t)])}:E},!Mt||/^force/.test(t.type))T();else if(!t.noBuiltIn)try{!function(t,e,n){var r=new RegExp("^<a\\s+is=('|\")"+n+"\\1></a>$");if(e[W]="a",(t.prototype=St(Ft.prototype)).constructor=t,o.customElements.define(n,t,e),!r.test(M.createElement("a",{is:n}).outerHTML)||!r.test((new t).outerHTML))throw e}(function t(){return Reflect.construct(Ft,[],t)},{},"document-register-element-a")}catch(t){T()}if(!t.noBuiltIn)try{if(Zt.call(M,"a","a").outerHTML.indexOf("is")<0)throw{}}catch(t){Pt=function(t){return{is:t.toLowerCase()}}}}(window)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var c=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&a.return&&a.return()}finally{if(o)throw i}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},r=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}}();e.bindExpressions=function(r,t){t.forEach(function(t){var e=new Function("return this."+t.expression+";"),n=e.bind(r)();t.value!==n&&(t.value=n||"",t.bindings.forEach(function(t){switch(t.type){case"innerHTML":var e=void 0===n?"":n;t.el.innerHTML=""+e;break;case"attribute":t.el.setAttribute(t.attrName,n);break;case"property":t.el[t.propName]=n}}))})},e.bindEvents=function(r,t){t.forEach(function(t){var n=t.el;t.bindings.forEach(function(t){var e=new Function("event","return "+t.funcName+"("+t.args.join(",")+")");n.addEventListener(t.eventName,e.bind(r))})})};e.OneWayBinding=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.expressions=[],this.events=[],this.html=t,this.newHtml=this.__getNewHtml()}return r(e,[{key:"setBindingDOMElements",value:function(n){var e=[];this.expressions.forEach(function(t){t.bindings.forEach(function(t){e.push(t.el),t.el=n.querySelector("["+t.el+"]")})}),this.events.forEach(function(t){e.push(t.el),t.el=n.querySelector("["+t.el+"]")}),e.forEach(function(t){var e=n.querySelector("["+t+"]");e&&e.removeAttribute(t)})}},{key:"__setExprBindings",value:function(e,t){var n=this.expressions.find(function(t){return t.expression===e});n?n.bindings.push(t):this.expressions.push({expression:e,value:null,bindings:[t]})}},{key:"__getNewHtml",value:function(){var t=(new DOMParser).parseFromString(this.html,"text/html");return this.__runChildren(t.body),this.__replaceBINDToSPAN(t),t.body.innerHTML}},{key:"__eventParsed",value:function(t){var e=t.match(/^(\w+)(\(*.*?\))?$/),n=c(e,3),r=n[0],o=n[1],i=n[2];if(r)return["this."+o,((i||"").replace(/[()]/g,"")||"event").split(",").map(function(t){var e=t.trim();return"event"===e?"event":e.match(/^[\-\.0-9]/)?e:e.match(/^(true|false)$/)?e:e.match(/^['"].*['"]$/)?e:"this."+e})]}},{key:"__runChildren",value:function(t){t.nodeType===Node.ELEMENT_NODE?this.__bindElement(t):t.nodeType===Node.TEXT_NODE&&t.nodeValue.match(/{{(.*?)}}/)&&this.__bindInnerHTML(t);for(var e=t.childNodes,n=0;n<e.length;n++){var r=e[n];r.hasAttribute&&r.hasAttribute("ce-no-bind")?console.log("found ce-no-bind. skipping binding"):r.childNodes&&this.__runChildren(r)}}},{key:"__bindElement",value:function(t){for(var e=0;e<t.attributes.length;e++){var n=t.attributes[e];n.name.match(/^\[(.*?)\]$/)&&this.__bindElementProperty(t,n),n.value.match(/{{(.*?)}}/)&&this.__bindAttribute(t,n),(n.name.match(/^\(.*?\)$/)||n.name.match(/^on-(.*?)/))&&this.__bindElementEvent(t,n)}}},{key:"__replaceBINDToSPAN",value:function(t){t.body.innerHTML=t.body.innerHTML.replace(/BIND-(x[\w]+)/g,"<span $1></span>")}},{key:"__getHash",value:function(){var t=61440*Math.random()+4095;return"x"+Math.floor(t).toString(16)}},{key:"__bindInnerHTML",value:function(t){var r=this;t.nodeValue=t.nodeValue.replace(/{{(.*?)}}/g,function(t,e){var n=r.__getHash();return r.__setExprBindings(e,{el:n,type:"innerHTML",orgHtml:t}),"BIND-"+n})}},{key:"__bindElementProperty",value:function(t,e){t.bindingHash=t.bindingHash||this.__getHash(),t.setAttribute(t.bindingHash,"");var n=e.name.match(/^\[(.*?)\]$/);this.__setExprBindings(e.value,{el:t.bindingHash,type:"property",propName:n[1],orgHtml:e.name+'="'+e.value+'"'})}},{key:"__bindAttribute",value:function(t,e){t.bindingHash=t.bindingHash||this.__getHash(),t.setAttribute(t.bindingHash,"");var n=e.value.match(/{{(.*?)}}/);this.__setExprBindings(n[1],{el:t.bindingHash,type:"attribute",attrName:e.name,orgHtml:e.name+'="'+e.value+'"'})}},{key:"__bindElementEvent",value:function(e,t){e.bindingHash=e.bindingHash||this.__getHash(),e.setAttribute(e.bindingHash,""),this.events.find(function(t){return t.el===e.bindingHash})||this.events.push({el:e.bindingHash,bindings:[]});var n=this.events.find(function(t){return t.el===e.bindingHash});if(this.__eventParsed(t.value)){var r=this.__eventParsed(t.value),o=c(r,2),i=o[0],u=o[1],a=void 0;t.name.match(/^\((.*?)\)$/)?a=t.name.match(/^\((.*?)\)$/)[1]:t.name.match(/^on-(.*?)/)&&(a=t.name.replace("on-","")),n.bindings.push({eventName:a,funcName:i,args:u})}}}]),e}()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createCustomEvent=function(t,e){var n=void 0;"function"==typeof CustomEvent?n=new CustomEvent(t,e):(n=document.createEvent("CustomEvent")).initCustomEvent(t,e.bubbles,e.cancelable,e.detail);return n}}])});
//# sourceMappingURL=html-custom-element.umd.js.map

/***/ }),

/***/ "./node_modules/prismjs/prism.js":
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
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

/***/ "./src/calendar/calendar.css":
/***/ (function(module, exports) {

module.exports = ":root.overlay:before {            /* Needed to check click outside of overlay */\n  content: ' ';\n  position: fixed;\n  top: 0; left: 0; right: 0; bottom: 0;\n  background: transparent;\n}\n.calendar {           /* overlay contents on thetop of blocker */\n  position: relative;\n  background: #fff;\n  min-width: 200px;\n}\n.calendar.shadow {\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.14),\n    0px 1px 1px 0px rgba(0, 0, 0, 0.12), \n    0px 2px 1px -1px rgba(0, 0, 0, .4) ;\n}\n\n.title {              /* e.g. '< Mar 2019 >' */\n  display: flex;\n  justify-content: space-between;\n  position: relative;\n  background: #fff;\n}\n.title .month-year {\n  flex: 1;\n  font-weight: bold;\n} \n.title .prev, .title .next {\n  border: none;\n  background: #fff;\n}\n.title select {        /* Jan, Feb .. */ /* 2017, 2018, ... */\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  padding: 0;\n  border: none;\n}\n.days {\n  border-bottom: 1px solid #ccc;\n}\n.days > span {          /* Mon, Tue, Wed ... */\n  display: inline-block;\n  text-align: center;\n  width: calc(100% / 7);\n}\n.dates button {          /* 1, 2, ... 31 */\n  padding: 4px 0;\n  width: calc(100% / 7);\n  border: none;\n  border-radius: 50%;\n  outline: none;\n}\n.dates button.day:hover {\n  background-color: rgba(160, 205, 248, .5);\n}\n.dates button:focus {\n  box-shadow: inset 0 0 2px 1px rgb(160, 205, 248);\n}\n.dates button.leading { \n  color: #eee; border: none;\n}\n.dates button.trailing {\n  color: #eee; border: none;\n}"

/***/ }),

/***/ "./src/calendar/calendar.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCECalendar", function() { return HCECalendar; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_time__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/utils/time.js");
/* harmony import */ var _calendar_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/calendar/calendar.css");
/* harmony import */ var _calendar_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_calendar_css__WEBPACK_IMPORTED_MODULE_7__);









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
  var year = curDate.getFullYear();
  var month = curDate.getMonth();
  var firstWeekday = new Date(year, month, 1).getDay();
  var days = firstWeekday + 7 - (staDay + 7) - 1; // 2 days become 1 for [1, 0]

  for (var i = days * -1; i <= 0; i++) {
    ret.push(new Date(year, month, i).getDate());
  }

  return ret;
}

function __getMonthDays(curDate) {
  var ret = [];
  var year = curDate.getFullYear();
  var month = curDate.getMonth();
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
  // type:week, wk, month, mon
  indexes = indexes instanceof Array ? indexes : [indexes];
  var t = Object(_utils_time__WEBPACK_IMPORTED_MODULE_6__["time"])();
  var ret = indexes.map(function (ndx) {
    return t.i18n[lang][key][ndx];
  });
  return ret.length === 1 ? ret[0] : ret;
}

function __getMonthEls(lang, monthNum) {
  var t = Object(_utils_time__WEBPACK_IMPORTED_MODULE_6__["time"])();
  var months = t.i18n[lang].monthNames;
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

var html = "\n  <div class=\"calendar\">\n    <div class=\"title\">\n      <div class=\"month-year\">\n        <select class=\"month\" (change)=\"setMonth(event)\"></select>\n        <select class=\"year\" (change)=\"setYear(event)\"></select>\n      </div>\n      <button class=\"prev\" (click)=\"setMonth(-1)\">&lt;</button>\n      <button class=\"next\" (click)=\"setMonth(1)\">&gt;</button>\n    </div>\n    <div class=\"days\"></div>\n    <div class=\"dates\" (click)=\"fireDateSelected(event)\"></div>\n  </div>\n  <div class=\"blocker\"></div>\n";
var HCECalendar =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCECalendar, _HTMLCustomElement);

  function HCECalendar() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCECalendar);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCECalendar).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCECalendar, [{
    key: "connectedCallback",
    // curDate, minDate, maxDate
    // language, firstDayOfWeek
    // weekdayFormat e.g. 2-letter, full, default 3-letter
    value: function connectedCallback() {
      var _this = this;

      this.renderWith(html, _calendar_css__WEBPACK_IMPORTED_MODULE_7__).then(function (_) {
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
          _this2.isEqualNode(event.target) && _this2.disappear();
        });
        inputEl.addEventListener('focus', function (_) {
          return _this2.appear();
        });
        this.addEventListener('date-selected', function (e) {
          inputEl.value = e.detail;

          _this2.disappear();
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
      var formatted = Object(_utils_time__WEBPACK_IMPORTED_MODULE_6__["time"])(selectedDate).format(this.format || 'long');
      var custEvent = Object(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["createCustomEvent"])('date-selected', {
        detail: formatted
      });
      this.dispatchEvent(custEvent);
    }
  }]);

  return HCECalendar;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"]);
HCECalendar.define('hce-calendar', HCECalendar);

/***/ }),

/***/ "./src/carousel/carousel.css":
/***/ (function(module, exports) {

module.exports = ":root {\n  display: block;\n  position: relative;\n  width: 100%;\n  min-width: 320px;\n  min-height: 200px;\n}\n\n.button-container {\n  display: flex;\n  position: absolute;\n  align-items: center;\n  height: 100%;\n  z-index: 1;\n}\n\n.prev.button-container { \n  left: 0; \n}\n\n.next.button-container {\n right: 0; \n}\n\n.button-container > button {\n  display: block;\n  border: 0;\n  padding: 0;\n  font-size: 32px;\n  color: #FFF;\n  background-color: #CCC;\n  border-radius: 50%;\n  width: 44px;\n  height: 44px;\n  line-height: 44px;\n  opacity: .5;\n  text-align: center;\n  text-decoration: none;\n}\n\n.button-container > button:hover {\n  opacity: .9;\n}\n\n.button-container > button:focus {\n  opacity: .9;\n}\n\n.carousel-list {\n  display: flex;\n  margin: 0;\n  position: absolute;\n  padding: 0;\n  overflow: hidden;\n  /*overflow-x: auto;*/\n  width: 100%;\n}\n\n.carousel-list > * {\n  display: block;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  opacity: 0.6;\n}\n\n.carousel-list > li[tabindex] {\n  opacity: 1;\n  outline: none;\n  border-color: #9ecaed;\n  box-shadow: 0 0 10px #9ecaed;\n}\n\n.shortcuts {\n  display: block;\n  margin: 0;\n  position: absolute;\n  bottom: 12px;\n  padding: 0;\n  width: 100%;\n  text-align: center;\n}\n\n.shortcuts > * {\n  display: inline-block;\n  margin: 0 1px;\n  list-style: none;\n  color: #FFF;\n  border-radius: 50%;\n  background: #FFF;\n  width: 12px;\n  height: 12px;\n  opacity: .5;\n}\n\n.shortcuts > *.active {\n  opacity: .9;\n}"

/***/ }),

/***/ "./src/carousel/carousel.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCECarousel", function() { return HCECarousel; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _carousel_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/carousel/carousel.css");
/* harmony import */ var _carousel_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_carousel_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_animate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/utils/animate.js");








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
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCECarousel, _HTMLCustomElement);

  function HCECarousel() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCECarousel);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCECarousel).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCECarousel, [{
    key: "connectedCallback",
    // selected                  // default selected index
    // listEl: HTMLElement       // list to scroll
    // shortcutsEl: HTMLElement  // list of shortcuts
    // inviewEl: Element         // currently visible element
    // index: number             // currently selected index
    value: function connectedCallback() {
      var _this2 = this;

      this.renderWith(html, _carousel_css__WEBPACK_IMPORTED_MODULE_6___default.a).then(function (_) {
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
      var _this3 = this;

      // index, or element
      var prevTabIndexedEl = this.listEl.querySelector('[tabindex]');
      var scrollToEl = what;

      if (typeof what === 'number') {
        this.index = (this.listEl.children.length + what) % this.listEl.children.length;
        scrollToEl = this.listEl.children[this.index];
      }

      this.index = __getIndex(this.listEl.children, scrollToEl);
      var startPosition = this.listEl.scrollLeft;
      var increaseAmount = Math.max(0, scrollToEl.offsetLeft - (this.listEl.offsetWidth - scrollToEl.offsetWidth) / 2) - startPosition;
      Object(_utils_animate__WEBPACK_IMPORTED_MODULE_7__["animate"])({
        draw: function draw(pct) {
          return _this3.listEl.scrollLeft = startPosition + pct * increaseAmount;
        }
      }); // set shortcuts

      if (this.shortcutsEl.offsetParent) {
        // if visible
        var prevActiveShortcut = this.shortcutsEl.querySelector('.active');
        var shortcutEl = this.shortcutsEl.children[this.index];
        prevActiveShortcut && prevActiveShortcut.classList.remove('active');
        shortcutEl.classList.add('active'); // shortcutEl.focus();
      } // set tabindex for accessibility


      prevTabIndexedEl && prevTabIndexedEl.removeAttribute('tabindex');
      scrollToEl.setAttribute('tabindex', 0);
      this.inviewEl = scrollToEl;
    }
  }]);

  return HCECarousel;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"]);
HCECarousel.define('hce-carousel', HCECarousel);

/***/ }),

/***/ "./src/collapsible/collapsible.css":
/***/ (function(module, exports) {

module.exports = ":root {\n  display: block;\n}\n:root * {\n  box-sizing: border-box;\n}\n\n/* header/body up-down accordion collapsibles */\n.hce-header {\n  cursor: pointer;\n  color: #FFF;\n  background: #CCC;\n}\n.hce-body {\n  overflow: hidden;\n  /*transition: all .5s ease;*/\n}\n:not(.expanded) .hce-body {\n  height: 0;\n  transform: translateY(-100%)\n}\n.expanded .hce-body {\n  min-height: 120px;\n  transform: translateY(0)\n}\n\n/* header/body left-right accordion collapsibles */\n:root.horizontal {\n  display: flex;\n  align-items: stretch;\n}\n:root.horizontal > * {\n  display: flex;\n  align-items: stretch;\n}\n:root.horizontal .hce-header {\n  word-wrap: break-word;\n  writing-mode: vertical-rl;\n  text-orientation: upright;\n}\n:root.horizontal .hce-header:empty {\n  padding: 4px;\n}\n\n:root.horizontal :not(.expanded) .hce-body {\n  width: 0;\n  transform: translateX(-100%)\n}\n:root.horizontal .expanded .hce-body {\n  min-width: 240px;\n  transform: translateX(0)\n}\n"

/***/ }),

/***/ "./src/collapsible/collapsible.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCECollapsible", function() { return HCECollapsible; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _collapsible_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/collapsible/collapsible.css");
/* harmony import */ var _collapsible_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_collapsible_css__WEBPACK_IMPORTED_MODULE_6__);







var HCECollapsible =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCECollapsible, _HTMLCustomElement);

  function HCECollapsible() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCECollapsible);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCECollapsible).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCECollapsible, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.renderWith(null, _collapsible_css__WEBPACK_IMPORTED_MODULE_6___default.a).then(function (_) {
        _this.init();
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      Array.from(this.querySelectorAll('.hce-header')).forEach(function (header) {
        header.setAttribute('tabindex', 0);
        header.addEventListener('click', _this2.toggleBody);
        header.addEventListener('keydown', _this2.toggleBody);
      });
    }
  }, {
    key: "toggleBody",
    value: function toggleBody(event) {
      if (this.keyCode && this.keyCode !== 32) {
        return;
      }

      var headerEl = event.target.closest('.hce-header');
      var thisParent = headerEl.parentElement;
      var AllExpandedParents = headerEl.closest('.hce').querySelectorAll('.expanded'); // collapse all other tabs except this one, then toggle expanded

      Array.from(AllExpandedParents).filter(function (el) {
        return !el.isEqualNode(thisParent);
      }).forEach(function (el) {
        return el.classList.remove('expanded');
      });
      thisParent.classList.toggle('expanded');
    }
  }]);

  return HCECollapsible;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"]);
HCECollapsible.define('hce-collapsible', HCECollapsible);

/***/ }),

/***/ "./src/dialog/dialog.css":
/***/ (function(module, exports) {

module.exports = ":root {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 24;\n  display: none;\n}\n\n> .page-blocker {\n  position: absolute; /* fixed */\n  background-color: #000;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: .5;\n  top: 0;\n}\n\n> .dialog {\n  padding: 24px;\n  position: absolute; /* fixed */\n  left: 50%;\n  top: 50%;\n  -ms-transform: translate(-50%,-50%);\n  -moz-transform:translate(-50%,-50%);\n  -webkit-transform: translate(-50%,-50%);\n  transform: translate(-50%,-50%);\n  min-width: 280px; /* 56 x 5 */\n  max-width: calc(100% - 80px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0  6px  6px rgba(0,0,0,0.23);\n  border: 1px solid #eeeeee;\n  border-radius: 2px;\n  background-color: #ffffff;\n}\n\n> .dialog > .close {\n  border: none;\n  font-size: 1.5em;\n  position: absolute;\n  top: 0;\n  right: 0;\n  color: #999;\n}\n\n> .dialog > .divider {\n  display: block;\n  margin: 0px -24px;\n  height: 1px;\n  border: 1px solid #ccc;\n  border-width: 0 0 1px 0;\n}\n\n> .dialog > .title {\n  color: #212121;\n  padding-bottom: 20px;\n  font-size: 20px;\n  font-weight: 500;\n  margin: 0;\n}\n\n> .dialog > .content {\n  padding-bottom: 24px;\n  color: #9e9e9e;\n}\n\n> .dialog > .actions {\n  padding: 8px;\n  margin-right: -16px;\n  margin-bottom: -16px;\n  text-align: center;\n}\n\n> .dialog > .actions:empty {\n  display: none;\n}\n\n> .dialog > .actions > * {\n  height: 32px;\n}\n  "

/***/ }),

/***/ "./src/dialog/dialog.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCEDialog", function() { return HCEDialog; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _dialog_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/dialog/dialog.css");
/* harmony import */ var _dialog_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_dialog_css__WEBPACK_IMPORTED_MODULE_6__);







var html = "\n  <div class=\"page-blocker\" (click)=\"close()\"></div>\n\n  <div class=\"dialog\">\n    <button class=\"close\" (click)=\"close()\">&times;</button>\n    <div class=\"title\">{{title}}</div>\n    <hce-content></hce-content>\n    <div class=\"actions\"></div>\n  </div>\n";
var HCEDialog =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCEDialog, _HTMLCustomElement);

  function HCEDialog() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCEDialog);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCEDialog).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCEDialog, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.renderWith(html, _dialog_css__WEBPACK_IMPORTED_MODULE_6___default.a).then(function (_) {// console.log(this.title, this.options);
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

      this.appear();
    }
  }, {
    key: "close",
    value: function close() {
      this.disappear();
    }
  }]);

  return HCEDialog;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"]);
HCEDialog.define('hce-dialog', HCEDialog);

/***/ }),

/***/ "./src/draggable/draggable.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCEDraggable", function() { return HCEDraggable; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_6__);







var HCEDraggable =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(HCEDraggable, _HTMLCustomElement);

  function HCEDraggable() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCEDraggable);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCEDraggable).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCEDraggable, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.dragStart; // properties when drag started e.g. {el, el, x: 120, y: 80} in pixel

      this.dropTo; // dropaable element selector. e.g. #drop-to

      this.dropEl; // drop enabled element. default document.body

      this.setAttribute('draggable', 'true'); // this allows to drag

      this._dragoverHandler = this.onDragover.bind(this);
      this._dragleaveHandler = this.onDragleave.bind(this);
      this._dropHandler = this.onDrop.bind(this);
      this.renderWith().then(function (_) {
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
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCEDraggable.prototype), "disconnectedCallback", this).call(this);

      this.dropEl.removeEventListener('drop', this._dropHandler);
      this.dropEl.removeEventListener('dragover', this._dragoverHandler);
      this.dropEl.removeEventListener('dragleave', this._dragleaveHandler);
    }
  }, {
    key: "onDragstart",
    value: function onDragstart(event) {
      event.dataTransfer.setData('Text', event.target.id); // id of dropping element

      this.dragStart = {
        el: this,
        x: event.clientX,
        y: event.clientY
      };
      var bcr = this.getBoundingClientRect();
      this.dispatchEvent(Object(html_custom_element__WEBPACK_IMPORTED_MODULE_6__["createCustomEvent"])('drag-start'));
    }
  }, {
    key: "onDragover",
    value: function onDragover(event) {
      event.preventDefault ? event.preventDefault() : event.returnValue = false; // MUST! allows it to drop

      this.dropTo && this.dropEl.classList.add('on-dragover');
    }
  }, {
    key: "onDragleave",
    value: function onDragleave(event) {
      this.dropTo && this.dropEl.classList.remove('on-dragover');
    }
  }, {
    key: "onDrop",
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
    key: "move",
    value: function move(event) {
      var move = {
        x: event.clientX - this.dragStart.x,
        y: event.clientY - this.dragStart.y
      };
      var bcr = this.getBoundingClientRect();
      this.style.position = 'absolute';
      this.style.top = window.scrollY + parseInt(bcr.top) + move.y + 'px';
      this.style.left = window.scrollX + parseInt(bcr.left) + move.x + 'px';
    }
  }]);

  return HCEDraggable;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_6__["HTMLCustomElement"]);
HCEDraggable.define('hce-draggable', HCEDraggable);

/***/ }),

/***/ "./src/drawer/drawer.css":
/***/ (function(module, exports) {

module.exports = ":root {\n  display: block;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 13;\n}\n\n:root.visible {\n  visibility: visible;\n}\n\n:root:not(.visible) {\n  visibility: hidden;\n}\n\n:root.visible .contents {\n  left: 0;\n  transform: translateX(0);\n  transition: all .3s ease-in;\n}\n\n:root:not(.visible) .contents {\n  left: -241px;\n  transform: translateX(0);\n  transition: all .2s ease-out;\n}\n\n.page-blocker {\n  position: fixed;\n  background-color: #000;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: .5;\n  top: 0;\n  z-index: 13;\n}\n\n.contents {\n  background-color: #ffffff;\n  box-shadow: 0   3px  6px rgba(0,0,0,0.18), 0  3px  6px rgba(0,0,0,0.23);\n  color: #212121;\n  display: block;\n  height: 100%; \n  left: 0;\n  max-width: 280px;\n  overflow: auto;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: calc(100vw - 56px);\n  z-index: 16;\n}"

/***/ }),

/***/ "./src/drawer/drawer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCEDrawer", function() { return HCEDrawer; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _drawer_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/drawer/drawer.css");
/* harmony import */ var _drawer_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_drawer_css__WEBPACK_IMPORTED_MODULE_6__);







var html = "\n  <div class=\"page-blocker\"></div>\n  <div class=\"contents\"><hce-content></hce-content></div>\n";
var HCEDrawer =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCEDrawer, _HTMLCustomElement);

  function HCEDrawer() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCEDrawer);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCEDrawer).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCEDrawer, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.renderWith(html, _drawer_css__WEBPACK_IMPORTED_MODULE_6___default.a).then(function (_) {
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
}(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"]);
HCEDrawer.define('hce-drawer', HCEDrawer);

/***/ }),

/***/ "./src/file/file.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCEFile", function() { return HCEFile; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_5__);






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
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCEFile, _HTMLCustomElement);

  function HCEFile() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCEFile);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCEFile).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCEFile, [{
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
        var li = document.createElement('li');
        var img = document.createElement('img');

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
        var info = document.createElement('span');
        info.innerHTML = file.name + ': ' + file.size + ' bytes';
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
        var custEvent = Object(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["createCustomEvent"])('files-change', {
          detail: files
        });
        this.dispatchEvent(custEvent);
        this.preview !== false && this.showPreview();
      }
    }
  }]);

  return HCEFile;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"]);
HCEFile.define('hce-file', HCEFile);

/***/ }),

/***/ "./src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _routes_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/routes/routes.js");
/* harmony import */ var _tooltip_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/tooltip/tooltip.js");
/* harmony import */ var _tabs_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/tabs/tabs.js");
/* harmony import */ var _loading_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/loading/loading.js");
/* harmony import */ var _carousel_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/carousel/carousel.js");
/* harmony import */ var _snackbar_snackbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/snackbar/snackbar.js");
/* harmony import */ var _drawer_drawer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/drawer/drawer.js");
/* harmony import */ var _dialog_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/dialog/dialog.js");
/* harmony import */ var _calendar_calendar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/calendar/calendar.js");
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./src/list/list.js");
/* harmony import */ var _overlay_overlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./src/overlay/overlay.js");
/* harmony import */ var _menu_menu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./src/menu/menu.js");
/* harmony import */ var _file_file__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./src/file/file.js");
/* harmony import */ var _sticky_sticky__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./src/sticky/sticky.js");
/* harmony import */ var _draggable_draggable__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./src/draggable/draggable.js");
/* harmony import */ var _collapsible_collapsible__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./src/collapsible/collapsible.js");
/* harmony import */ var _utils_show_overlay__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./src/utils/show-overlay.js");
/* harmony import */ var _utils_time__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./src/utils/time.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "time", function() { return _utils_time__WEBPACK_IMPORTED_MODULE_17__["time"]; });


















 // time formatter e.g. time().format('yyyy-mm-dd')

/***/ }),

/***/ "./src/list/list.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCEList", function() { return HCEList; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_6__);








function __objectToArray(obj) {
  var ret = [];

  for (var key in obj) {
    var item = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_5___default()(obj[key]) === 'object' ? Object.assign(obj[key], {
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
var HCEList =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCEList, _HTMLCustomElement);

  function HCEList() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCEList);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCEList).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCEList, [{
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
        console.error('[hce-list] element not found by selector', visibleBy);
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
            var custEvent = Object(html_custom_element__WEBPACK_IMPORTED_MODULE_6__["createCustomEvent"])('selected', {
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

  return HCEList;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_6__["HTMLCustomElement"]);
HCEList.define('hce-list', HCEList);

/***/ }),

/***/ "./src/loading/loading.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_5__);





 // from https://icons8.com/preloaders/

var svg = "\n  <svg width=\"64px\" height=\"64px\" viewBox=\"0 0 128 128\"  xml:space=\"preserve\"><g>\n    <circle cx=\"16\" cy=\"64\" r=\"16\" fill=\"%23000000\" fill-opacity=\"1\"/>\n    <circle cx=\"16\" cy=\"64\" r=\"16\" fill=\"%23555555\" fill-opacity=\"0.67\" transform=\"rotate(45,64,64)\"/>\n    <circle cx=\"16\" cy=\"64\" r=\"16\" fill=\"%23949494\" fill-opacity=\"0.42\" transform=\"rotate(90,64,64)\"/>\n    <circle cx=\"16\" cy=\"64\" r=\"16\" fill=\"%23cccccc\" fill-opacity=\"0.2\" transform=\"rotate(135,64,64)\"/>\n    <animateTransform attributeName=\"transform\" type=\"rotate\" \n      calcMode=\"discrete\" dur=\"720ms\" repeatCount=\"indefinite\"\n      values=\"0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64\">\n    </animateTransform>\n  </g></svg>";
var css = "\n  :root {\n    display: flex; \n    position: absolute;\n    align-items: center; \n    justify-content: center;\n    background: #fff;\n    opacity: 0.5;\n    width: 100%; height: 100%;\n    top:0; left: 0;\n  }\n  :root > *:first-child {\n    width: 100%;\n    height: 100%;\n    max-width: 64px;\n  }\n";

var HCELoading =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCELoading, _HTMLCustomElement);

  function HCELoading() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCELoading);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCELoading).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCELoading, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.timer;
      this.renderWith(null, css).then(function (_) {
        !_this.innerHTML.trim() && (_this.innerHTML = svg);
        typeof _this.loading === 'string' ? _this.show() : _this.hide();
      });
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      name === 'loading' && typeof newValue === 'string' ? this.show() : this.hide();
    }
  }, {
    key: "show",
    value: function show() {
      var _this2 = this;

      this.style.display = 'flex';
      this.timer = this.timeout && setTimeout(function (_) {
        _this2.dispatchEvent(Object(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["createCustomEvent"])('timedout'));

        _this2.hide();
      }, this.timeout * 1000);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.removeAttribute('loading');
      clearTimeout(this.timer);
      this.style.display = 'none';
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['loading'];
    }
  }]);

  return HCELoading;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"]);

HCELoading.define('hce-loading', HCELoading);

/***/ }),

/***/ "./src/menu/menu.css":
/***/ (function(module, exports) {

module.exports = "  a { text-decoration: none; white-space: nowrap; text-transform: uppercase }\n  li[disabled] {opacity: 0.5;}\n\n  /* submenu */\n  li > ul { \n    width: 0;\n    height: 0;\n    display: none;\n    border: 1px solid transparent;\n  } /* hide all submenus in default */\n  :root:not(.selected) li:not([disabled]).has-submenu:hover > ul,\n  :root:not(.selected) li:not([disabled]).has-submenu:focus > ul,\n  :root:not(.selected) li:not([disabled]).has-submenu.submenu-open > ul {\n    width: auto;\n    height: auto;\n    display: block;\n    transition: opacity .25s;\n  }\n\n  /* basic styles */\n  :root.basic a { transition: all .25s; color: inherit }\n  :root.basic a:hover { color: #fff }\n  :root.basic ul { margin: 0; padding: 0; list-style: none; background: #333; color: #fff }\n  :root.basic li { padding: 8px; position: relative; color: #aaa; }\n\n  :root.basic > ul > li { padding: 15px; }   \n  :root.basic > ul > li:after, :root.basic > ul > li:after { \n    content: ' '; display: block; position: absolute; bottom: 4px; left: 0;\n    width: 100%; height: 2px; opacity: 0; background: #0FF; \n  }\n  :root.basic > ul > li:not([disabled]):hover:after, \n  :root.basic > ul > li:focus:after { \n    opacity: 1; transition:all .25s;\n  }\n\n  :root.basic > ul > li.selected  { color: #fff; }\n  :root.basic li ul{ position: absolute; }  /* submenu items */\n\n  :root.top > ul { display: flex; justify-content: space-around }\n  :root.top li > ul ul { top: 1px; left: 100%; } /* submenu items */\n  :root.top li > ul { top: 100%; left: 0;}\n\n  :root.bottom > ul { display: flex; justify-content: space-around }\n  :root.bottom li > ul ul { bottom: 0; left: 100% } /* submenu items */\n  :root.bottom li > ul { bottom: 100%; left: 0;}     /* submenu items */\n\n  :root.left > ul { display: inline-block; }       \n  :root.left li > ul {top: 0; left: 100%;}   /* submenu items */\n\n  :root.right > ul { display: inline-block; }\n  :root.right li > ul {top: 0; right: 100%;} /* submenu items */"

/***/ }),

/***/ "./src/menu/menu.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _menu_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/menu/menu.css");
/* harmony import */ var _menu_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_menu_css__WEBPACK_IMPORTED_MODULE_6__);







var html = "\n<nav role=\"navigation\">\n  <hce-content></hce-content>\n</nav>\n";

var HCEMenu =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCEMenu, _HTMLCustomElement);

  function HCEMenu() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCEMenu);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCEMenu).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCEMenu, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.renderWith(null, _menu_css__WEBPACK_IMPORTED_MODULE_6__).then(function (_) {
        _this.setAccessibility();

        _this.addEventListener('selected', function (_) {
          return (// disappear(disable) dropdown menus
            _this.classList.add('selected')
          );
        });

        _this.addEventListener('mouseover', function (_) {
          return (//  dropdown menu enabled
            _this.classList.remove('selected')
          );
        });
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
        if (typeof liEl.getAttribute('disabled') === 'string') {
          // disabled
          var aEl = liEl.querySelector('a');
          aEl.setAttribute('href-disabled', aEl.getAttribute('href'));
          aEl.removeAttribute('href');
        } else if (liEl.querySelector('ul')) {
          // if submenu exists
          liEl.classList.add('has-submenu');
          liEl.setAttribute('tabindex', 0); // make it as an action item

          var aEls = liEl.querySelectorAll('a'); // control show/hide by class 'submenu-open'

          liEl.addEventListener('blur', function (_) {
            return liEl.classList.remove('submenu-open');
          });
          Array.from(aEls).forEach(function (aEl) {
            aEl.addEventListener('click', function (_) {
              return aEl.dispatchEvent(Object(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["createCustomEvent"])('selected', {
                bubbles: true
              }));
            });
            aEl.addEventListener('focus', function (_) {
              return liEl.classList.add('submenu-open');
            });
            aEl.addEventListener('blur', function (_) {
              setTimeout(function (_) {
                // next focus needs time
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
}(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"]);

HCEMenu.define('hce-menu', HCEMenu);

/***/ }),

/***/ "./src/overlay/overlay.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_show_overlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/utils/show-overlay.js");







var css = "\n  :root:before {\n    content: ' ';\n    position: fixed;\n    top: 0; left: 0; right: 0; bottom: 0;\n    background: transparent;\n  }\n  .overlay {\n    background: #fff;\n    padding: 4px;\n    border: 1px solid #ccc;\n    z-index: 1;\n    box-sizing: border-box;\n  }\n";
var html = "\n  <div class=\"overlay\">\n    <hce-content></hce-content>\n  </div>\n";

var HCEOverlay =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCEOverlay, _HTMLCustomElement);

  function HCEOverlay() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCEOverlay);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCEOverlay).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCEOverlay, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.style.display = 'none';
      this.renderWith(html, css).then(function (_) {
        _this.visibleBy && _this.setBehaviourOfVisibleBy();

        _this.addEventListener('click', function (event) {
          _this.isEqualNode(event.target) && _this.disappear();
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
        actorEl.addEventListener('blur', this.hide.bind(this));
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
      this.position = this.getAttribute('position') || 'top';
      this.distance = parseInt(this.getAttribute('distance') || 12);
      this.arrow = this.getAttribute('arrow') !== 'false';
      this.appear(); // console.log('......', this.position, this.distance, this.arrow)

      setTimeout(function (_) {
        Object(_utils_show_overlay__WEBPACK_IMPORTED_MODULE_6__["showOverlay"])(_this2.querySelector('.overlay'), _this2.position, {
          distance: _this2.distance,
          arrow: _this2.arrow
        });
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.disappear();
    }
  }]);

  return HCEOverlay;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"]);

HCEOverlay.define('hce-overlay', HCEOverlay);

/***/ }),

/***/ "./src/routes/routes.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCERoutes", function() { return HCERoutes; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/utils/index.js");









function getRoutesFromEl(el) {
  var routes = [];
  Array.from(el.children).forEach(function (child) {
    var match = child.getAttribute('route-match');
    var url = child.getAttribute('import');
    var isDefault = child.getAttribute('default') !== null;
    match && url && routes.push({
      match: new RegExp(match),
      "import": url
    });
  });
  return routes;
}

var HCERoutes =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(HCERoutes, _HTMLCustomElement);

  function HCERoutes() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, HCERoutes);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(HCERoutes).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(HCERoutes, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var supportsPopState = window.navigator.userAgent.indexOf('Trident') === -1;
      var popstate = supportsPopState ? 'popstate' : 'hashchange';
      this.routes = getRoutesFromEl(this);
      this.popStateListener = this.popStateHandler.bind(this);
      window.addEventListener(popstate, this.popStateListener);
      var matchingRoute = this.getMatchingRoute();
      var src = this.getAttribute('src');
      this.setContentsFromUrl(matchingRoute || src);
    } // delete window popstate listener

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var supportsPopState = window.navigator.userAgent.indexOf('Trident') === -1;
      var popstate = supportsPopState ? 'popstate' : 'hashchange';
      window.removeEventListener(popstate, this.popStateListener);
    }
  }, {
    key: "getMatchingRoute",
    value: function getMatchingRoute() {
      var locationHref = window.location.href.replace(window.location.origin, '');
      var route = this.routes.filter(function (route) {
        return locationHref.match(route.match);
      })[0];

      if (route) {
        var _locationHref$match = locationHref.match(route.match),
            _locationHref$match2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_locationHref$match, 3),
            m0 = _locationHref$match2[0],
            m1 = _locationHref$match2[1],
            m2 = _locationHref$match2[2];

        return route["import"].replace(/\{\{1\}\}/g, m1).replace(/\{\{2\}\}/g, m2);
      }
    } // window popstate listener

  }, {
    key: "popStateHandler",
    value: function popStateHandler(event) {
      var src = this.getMatchingRoute();
      src && this.setContentsFromUrl(src);
    }
  }, {
    key: "setContentsFromUrl",
    value: function setContentsFromUrl(url) {
      var _this = this;

      if (new Date().getTime() - (this.lastCall || 0) < 500) {
        return;
      } else {
        this.lastCall = new Date().getTime();
      }

      return window.fetch(url).then(function (response) {
        if (!response.ok) {
          var err = new Error("[hce-routes] import url: ".concat(url, ", status: ").concat(response.statusText));
          Object(_utils__WEBPACK_IMPORTED_MODULE_7__["setInnerHTML"])(_this, err);
          throw err;
        }

        return response.text();
      }).then(function (html) {
        _this.setAttribute('src', url);

        Object(_utils__WEBPACK_IMPORTED_MODULE_7__["setInnerHTML"])(_this, html);
        setTimeout(function (_) {
          return _this.getAttribute('move-to-top') && window.scrollTo(0, 0);
        });
      });
    }
  }]);

  return HCERoutes;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_6__["HTMLCustomElement"]);
html_custom_element__WEBPACK_IMPORTED_MODULE_6__["HTMLCustomElement"].define('hce-routes', HCERoutes);

/***/ }),

/***/ "./src/snackbar/snackbar.css":
/***/ (function(module, exports) {

module.exports = ":root {\n  visibility: hidden;\n  display: block;\n  position: fixed;\n  padding: 14px 24px;\n  min-width: 288px;\n  max-width: 568px;\n  background-color: #323232;\n  font-size: 14px;\n  border-radius: 2px; /* Rounded borders */\n  color: #fff; /* White text color */\n  z-index: 6;\n  text-align: center;\n  transform: translate(-50%);\n  left: 50%;\n  bottom: 0;\n}"

/***/ }),

/***/ "./src/snackbar/snackbar.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCESnackbar", function() { return HCESnackbar; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _snackbar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/snackbar/snackbar.css");
/* harmony import */ var _snackbar_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_snackbar_css__WEBPACK_IMPORTED_MODULE_6__);







var customCss = "\n  @keyframes slideInUp {\n    from { transform: translate3d(0,100%,0)  translate(-50%); opacity: 0; }\n    to { opacity: 1; transform: translateZ(0) translate(-50%); }\n  }\n  @keyframes slideOutDown {\n    from { opacity: 1; transform: translateZ(0) translate(-50%); }\n    to { opacity: 0; transform: translate3d(0,100%,0) translate(-50%); }\n  }";
var HCESnackbar =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCESnackbar, _HTMLCustomElement);

  function HCESnackbar() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCESnackbar);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCESnackbar).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCESnackbar, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.renderWith(null, _snackbar_css__WEBPACK_IMPORTED_MODULE_6___default.a, customCss);
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
}(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"]);
HCESnackbar.define('hce-snackbar', HCESnackbar);

/***/ }),

/***/ "./src/sticky/sticky.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HCESticky", function() { return HCESticky; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_5__);







function __setParentPositioned(el) {
  var parentElPosition = window.getComputedStyle(el.parentElement).getPropertyValue('position');

  if (!['absolute', 'fixed', 'relative'].includes(parentElPosition)) {
    el.parentElement.style.position = 'relative';
  }
}

function __isInView(el) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var bcr = el.getBoundingClientRect();
  var top = bcr.top - offset >= 0;
  var bottom = bcr.bottom <= window.innerHeight;
  var left = bcr.left >= 0;
  var right = bcr.right <= window.innerWidth; // console.log(offset, top, right, bottom, left);

  return top && bottom && left && right;
}

function __createSpacer(stickyEl) {
  var elStyle = window.getComputedStyle(stickyEl);

  var elProp = function elProp(prop) {
    return elStyle.getPropertyValue(prop);
  };

  var spacerEl = document.createElement('div');
  spacerEl.setAttribute('style', "display: ".concat(elProp('display'), "; background: #CCC;") + "width: ".concat(elProp('width'), "; height:").concat(elProp('height'), ";") + "float: ".concat(elProp('float'), ";") + "margin: ".concat(elProp('margin-top'), " ").concat(elProp('margin-right')) + "  ".concat(elProp('margin-bottom'), " ").concat(elProp('margin-left'), ";"));
  stickyEl.insertAdjacentElement('beforebegin', spacerEl);
  return spacerEl;
}

var HCESticky =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCESticky, _HTMLCustomElement);

  function HCESticky() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCESticky);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCESticky).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCESticky, [{
    key: "connectedCallback",
    // offset;
    value: function connectedCallback() {
      var _this = this;

      __setParentPositioned(this);

      this.style.boxSizing = 'border-box';
      this.style.margin = '0'; // ignore margin, which makes it complicated

      this.spacer = __createSpacer(this);
      this.style.display = this.spacer.style.display; // ignore margin, which makes it complicated

      this.style.top = this.spacer.offsetTop + 'px';
      this.style.left = this.spacer.offsetLeft + 'px';
      this.style.position = 'absolute';
      this.renderWith().then(function (_) {
        window.addEventListener('scroll', _this.windowScrollHandler.bind(_this));
        window.addEventListener('resize', _this.windowScrollHandler.bind(_this));
      });
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      window.removeEventListener('scroll', this.windowScrollHandler.bind(this));
      window.removeEventListener('resize', this.windowScrollHandler.bind(this));
    }
  }, {
    key: "windowScrollHandler",
    value: function windowScrollHandler(event) {
      if (__isInView(this.spacer, this.offset)) {
        this.style.top = this.spacer.offsetTop + 'px';
        this.style.left = this.spacer.offsetLeft + 'px';
        this.style.width = this.spacer.offsetWidth + 'px';
        this.classList.remove('detached');
      } else {
        var marginTop = this.offset || 0;
        var pBcr = this.parentElement.getBoundingClientRect();
        var maxTop = pBcr.height - this.spacer.offsetHeight; // console.log('pBcr.top', pBcr.top, 'this.apacer.offsetTop', 'marginTop', this.spacer.offsetTop, marginTop);
        // console.log('pBcr.top + this.spacer.offsetTop', pBcr.top + this.spacer.offsetTop );

        if (pBcr.top + this.spacer.offsetTop - marginTop < 0) {
          this.style.top = Math.min(pBcr.top * -1 + marginTop, maxTop) + 'px';
        }

        this.classList.add('detached');
      }
    }
  }]);

  return HCESticky;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"]);
HCESticky.define('hce-sticky', HCESticky);

/***/ }),

/***/ "./src/tabs/tabs.css":
/***/ (function(module, exports) {

module.exports = "  :root {\n    display: block\n  }\n  .hce-tabs {\n    border-bottom: 1px solid #999;\n    display: flex;\n  }\n  .hce-tabs [tab] {\n    border: 1px solid #999;\n    background: #EEE;\n    padding: 4px 12px;\n    border-radius: 4px 4px 0 0;\n    position: relative;\n    top: 1px;\n  }\n  .hce-tabs [tab].selected {\n    background: #FFF;\n    border-bottom: 1px solid transparent;\n  }\n  .hce-tabs [tab][disabled] {\n    opacity: 0.5;\n  }\n\n  .hce-contents [tab] {\n    display: none;\n    transition: opacity .25s;\n  }\n  .hce-contents [tab].selected {\n    display: block;\n  }"

/***/ }),

/***/ "./src/tabs/tabs.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _tabs_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/tabs/tabs.css");
/* harmony import */ var _tabs_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_tabs_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_animate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/utils/animate.js");









function __keydownHandler(e) {
  var propName = e.key === 'ArrowRight' ? 'nextElementSibling' : e.key === 'ArrowLeft' ? 'previousElementSibling' : 'N/A';
  var nextEl = e.target[propName];

  while (nextEl) {
    if (nextEl.getAttribute('disabled') === null) break;
    nextEl = nextEl[propName];
  }

  if (nextEl) {
    var tabId = nextEl.getAttribute('tab');
    this.select(tabId); // select tab and contents
  }
}

function __clickHandler(e) {
  var tabId = e.target.getAttribute('tab');
  this.select(tabId); // select tab and contents
}

var HCETabs =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCETabs, _HTMLCustomElement);

  function HCETabs() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCETabs);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCETabs).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCETabs, [{
    key: "connectedCallback",
    // tabEls: tab index elements with attribute 'tab'
    // contentEls: tab contents elements with attribute 'tab'
    value: function connectedCallback() {
      var _this = this;

      this.tabEls = this.querySelectorAll('.hce-tabs [tab]');
      this.contentEls = this.querySelectorAll('.hce-contents [tab]');
      this.renderWith(null, _tabs_css__WEBPACK_IMPORTED_MODULE_6__).then(function () {
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
      var tabEl = tabId && this.querySelector(".hce-tabs [tab=".concat(tabId, "]")) || this.querySelector('.hce-tabs [tab].selected') || this.tabEls[0];

      if (tabEl.getAttribute('disabled') === null) {
        var selectedTabId = tabEl.getAttribute('tab');
        this.selectTab(selectedTabId);
        this.selectContent(selectedTabId);
      }
    }
  }, {
    key: "selectTab",
    value: function selectTab(tabId) {
      var selectedOne = this.querySelector(".hce-tabs [tab=".concat(tabId, "]")) || this.tabsEls[0];
      Array.from(this.tabEls).filter(function (el) {
        return !el.isEqualNode(selectedOne);
      }).forEach(function (el) {
        el.classList.remove('selected');
        el.removeAttribute('tabindex');
      });
      selectedOne.classList.add('selected');
      selectedOne.setAttribute('tabindex', '0');
      selectedOne.focus();
    }
  }, {
    key: "selectContent",
    value: function selectContent(tabId) {
      var selectedOne = this.querySelector(".hce-contents [tab=".concat(tabId, "]")) || this.contentsEls[0];
      Array.from(this.contentEls).filter(function (el) {
        return !el.isEqualNode(selectedOne);
      }).forEach(function (el) {
        el.classList.remove('selected');
        el.removeAttribute('tabindex');
        el.style.display = 'none';
      });
      selectedOne.classList.add('selected');
      selectedOne.setAttribute('tabindex', '0');
      Object(_utils_animate__WEBPACK_IMPORTED_MODULE_7__["appear"])(selectedOne);
    }
  }]);

  return HCETabs;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"]);

html_custom_element__WEBPACK_IMPORTED_MODULE_5__["HTMLCustomElement"].define('hce-tabs', HCETabs);

/***/ }),

/***/ "./src/tooltip/tooltip.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_show_overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/utils/show-overlay.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/html-custom-element/dist/html-custom-element.umd.js");
/* harmony import */ var html_custom_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(html_custom_element__WEBPACK_IMPORTED_MODULE_6__);







var css = "\n  :root {\n    display: none;\n    background: #1b1f23;\n    border-radius: 4px;\n    min-width: 120px;\n    padding: 6px 12px;\n    z-index: 1;\n    color: #fff;\n  }\n";

var HCETooltip =
/*#__PURE__*/
function (_HTMLCustomElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(HCETooltip, _HTMLCustomElement);

  function HCETooltip() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HCETooltip);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(HCETooltip).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HCETooltip, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.renderWith(null, css).then(function () {
        _this.position = _this.position || 'top';

        _this.parentElement.setAttribute('tabindex', 0);

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
      Object(_utils_show_overlay__WEBPACK_IMPORTED_MODULE_5__["showOverlay"])(this, this.position, {
        distance: this.distance,
        arrow: true
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      Object(_utils_show_overlay__WEBPACK_IMPORTED_MODULE_5__["hideOverlay"])(this);
    }
  }]);

  return HCETooltip;
}(html_custom_element__WEBPACK_IMPORTED_MODULE_6__["HTMLCustomElement"]);

html_custom_element__WEBPACK_IMPORTED_MODULE_6__["HTMLCustomElement"].define('hce-tooltip', HCETooltip);

/***/ }),

/***/ "./src/utils/animate.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animate", function() { return animate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disappear", function() { return disappear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appear", function() { return appear; });
function animate(_ref) {
  var _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 350 : _ref$duration,
      _ref$timing = _ref.timing,
      timing = _ref$timing === void 0 ? function (t) {
    return t;
  } : _ref$timing,
      draw = _ref.draw;
  var start = performance.now();
  requestAnimationFrame(function animate(time) {
    var timeFraction = (time - start) / duration;

    if (timeFraction > 1) {
      timeFraction = 1;
    }

    var progress = timing(timeFraction);
    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
function disappear(el) {
  var compStyle = window.getComputedStyle(el);
  compStyle.transitionDuration === '0s' && (el.style.transition = 'opacity .25s linear');
  el.style.opacity = 0;
  setTimeout(function (_) {
    return el.style.display = 'none';
  }, 300);
}
function appear(el, as) {
  var compStyle = window.getComputedStyle(el);
  compStyle.transitionDuration === '0s' && (el.style.transition = 'opacity .25s linear');
  el.style.display = as || el.displayStyle || 'block';
  el.style.opacity = 0;
  setTimeout(function (_) {
    return el.style.opacity = 1;
  }, 20);
}

/***/ }),

/***/ "./src/utils/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/utils/time.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "time", function() { return _time__WEBPACK_IMPORTED_MODULE_0__["time"]; });

/* harmony import */ var _animate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/utils/animate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animate", function() { return _animate__WEBPACK_IMPORTED_MODULE_1__["animate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "appear", function() { return _animate__WEBPACK_IMPORTED_MODULE_1__["appear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "disappear", function() { return _animate__WEBPACK_IMPORTED_MODULE_1__["disappear"]; });

/* harmony import */ var _show_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/utils/show-overlay.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "showOverlay", function() { return _show_overlay__WEBPACK_IMPORTED_MODULE_2__["showOverlay"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hideOverlay", function() { return _show_overlay__WEBPACK_IMPORTED_MODULE_2__["hideOverlay"]; });

/* harmony import */ var _set_inner_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/utils/set-inner-html.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setInnerHTML", function() { return _set_inner_html__WEBPACK_IMPORTED_MODULE_3__["setInnerHTML"]; });






/***/ }),

/***/ "./src/utils/set-inner-html.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInnerHTML", function() { return setInnerHTML; });
function setInnerHTML(elm, html) {
  elm.innerHTML = html;
  Array.from(elm.querySelectorAll('script')).forEach(function (el) {
    var newEl = document.createElement('script');
    Array.from(el.attributes).forEach(function (el) {
      newEl.setAttribute(el.name, el.value);
    });
    newEl.appendChild(document.createTextNode(el.innerHTML));

    try {
      el.parentNode.replaceChild(newEl, el);
    } catch (e) {
      console.error('Invalid Javascript error with ' + el.innerHTML, e);
    }
  });
}

/***/ }),

/***/ "./src/utils/show-overlay.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideOverlay", function() { return hideOverlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showOverlay", function() { return showOverlay; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);


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
      _pos$split$map2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_pos$split$map, 3),
      posYX = _pos$split$map2[0],
      hv = _pos$split$map2[1],
      inOut = _pos$split$map2[2];

  var _posYX$split = posYX.split('-'),
      _posYX$split2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_posYX$split, 2),
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

function hideOverlay(el) {
  var compStyle = window.getComputedStyle(el);
  el.style.opacity = 0;
  setTimeout(function (_) {
    return el.style.display = 'none';
  }, 350);
}
function showOverlay(el) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top-center, vertical, outside';
  var options = arguments.length > 2 ? arguments[2] : undefined;
  pos = pos === 'top' || pos == 'bottom' ? "".concat(pos, "-center, vertical, outside") : pos === 'left' || pos == 'right' ? "center-".concat(pos, ", horizontal, outside") : pos;

  var _pos$split$map3 = pos.split(',').map(function (el) {
    return (el || '').trim();
  }),
      _pos$split$map4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_pos$split$map3, 3),
      posYX = _pos$split$map4[0],
      hv = _pos$split$map4[1],
      inOut = _pos$split$map4[2];

  var _posYX$split3 = posYX.split('-'),
      _posYX$split4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_posYX$split3, 2),
      posY = _posYX$split4[0],
      posX = _posYX$split4[1];

  var olcss = el.style;
  var distance = options && options.distance || '12';
  var showArrow = options && options.arrow;
  var calc = "calc(100% + ".concat(distance, "px)");
  olcss.position = 'absolute';
  olcss.display = 'block';
  olcss.transition = 'opacity .25s';
  olcss.opacity = 0;
  setTimeout(function (_) {
    return olcss.opacity = 1;
  }, 20);

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
  "default": "ddd mmm dS yyyy HH:MM:ss TT",
  "short": "m/d/yy",
  shortTime: "h:MM TT",
  medium: "mmm d, yyyy",
  mediumTime: "h:MM:ss TT",
  "long": "mmmm d, yyyy",
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

  if (isNaN(date.getMonth())) {
    throw new Error("Invalid date ".concat(argDate));
  }

  return {
    language: 'en',
    i18n: i18n,
    utc: false,
    help: help,
    format: function format(argMask) {
      var mask = masks[argMask] || argMask || masks["default"];

      if (argMask && argMask.slice(0, 4) == 'UTC:') {
        // Allow setting the utc argument via the mask
        mask = mask.slice(4);
        this.utc = true;
      } // eslint-disable-next-line


      var timezoneRE = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
      var timezoneClipRE = /[^-+\dA-Z]/g;
      var get = this.utc ? 'getUTC' : 'get';
      var d = date[get + 'Date']();
      var D = date[get + 'Day']();
      var m = date[get + 'Month']();
      var y = date[get + 'FullYear']();
      var H = date[get + 'Hours']();
      var M = date[get + 'Minutes']();
      var s = date[get + 'Seconds']();
      var L = date[get + 'Milliseconds']();
      var o = this.utc ? 0 : date.getTimezoneOffset();
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