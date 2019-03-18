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
/******/ 	var hotCurrentHash = "2590fe9b0c62406f67de";
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
/******/ 			var chunkId = "main";
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/scss/style.scss":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-1!./node_modules/postcss-loader/src??ref--6-2!./node_modules/sass-loader/lib/loader.js??ref--6-3!./src/scss/style.scss ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Imports
var urlEscape = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! material-icons/iconfont/MaterialIcons-Regular.eot */ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.eot"));
var ___CSS_LOADER_URL___1___ = urlEscape(__webpack_require__(/*! material-icons/iconfont/MaterialIcons-Regular.woff2 */ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff2"));
var ___CSS_LOADER_URL___2___ = urlEscape(__webpack_require__(/*! material-icons/iconfont/MaterialIcons-Regular.woff */ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff"));
var ___CSS_LOADER_URL___3___ = urlEscape(__webpack_require__(/*! material-icons/iconfont/MaterialIcons-Regular.ttf */ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.ttf"));

// Module
exports.push([module.i, "@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  /* For IE6-8 */\n  src: local(\"Material Icons\"), local(\"MaterialIcons-Regular\"), url(" + ___CSS_LOADER_URL___1___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"truetype\"); }\n\n.material-icons {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n  /* Support for IE. */\n  -webkit-font-feature-settings: 'liga';\n          font-feature-settings: 'liga'; }\n\n@media (min-width: 1400px) {\n  .container {\n    max-width: 1280px; } }\n\n.navbar {\n  background-image: linear-gradient(180deg, #27505D 0%, #003040 100%);\n  padding: .0rem 1rem;\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); }\n  .navbar .navbar-brand {\n    color: #ffffff;\n    font-size: 18px;\n    letter-spacing: 0.05em;\n    font-weight: 900;\n    padding-right: 70px; }\n  .navbar .nav-item {\n    padding: 0px; }\n    .navbar .nav-item.active {\n      background-color: rgba(0, 35, 46, 0.6); }\n    .navbar .nav-item.active .nav-link {\n      opacity: 1; }\n    .navbar .nav-item .nav-link {\n      color: #FFFFFF;\n      opacity: 0.6;\n      font-weight: 700;\n      line-height: normal;\n      font-size: 12px;\n      text-align: center;\n      letter-spacing: 0.05em;\n      text-transform: uppercase;\n      padding: 37px 22px; }\n      .navbar .nav-item .nav-link:hover {\n        background-color: rgba(0, 35, 46, 0.2); }\n\n.dropdown-toggle:hover {\n  cursor: pointer; }\n\n.dropdown-toggle::after {\n  margin-left: 10px; }\n\n.dropdown-menu .dropdown-item {\n  font-size: 14px;\n  padding: 11px 62px 11px 17px;\n  font-weight: 700;\n  color: #7FA3A8; }\n  .dropdown-menu .dropdown-item.tab {\n    padding-left: 45px; }\n  .dropdown-menu .dropdown-item.active {\n    color: #003040;\n    background-color: transparent; }\n    .dropdown-menu .dropdown-item.active:hover {\n      background-color: transparent; }\n  .dropdown-menu .dropdown-item:hover {\n    background-color: #F2F9FA; }\n\n.table td, .table th {\n  vertical-align: middle;\n  border-top: none; }\n\n.table thead th {\n  line-height: 10px;\n  vertical-align: middle;\n  color: #7FA3A8;\n  font-size: 12px;\n  text-transform: uppercase;\n  font-weight: 700;\n  border-bottom: 1px solid #7FA3A8;\n  letter-spacing: 0.05em;\n  padding: .55rem;\n  padding-left: 18px; }\n  .table thead th .btn {\n    background-color: #F2F2F2;\n    color: #003040;\n    margin-left: 12px; }\n\n.table td {\n  border-bottom: 1px solid #F2F2F2;\n  padding: 24px 22px 20px 18px;\n  color: #003040; }\n  .table td a {\n    color: #003040; }\n  .table td.icons a {\n    display: inline-block;\n    padding: 1px 6px 1px 6px;\n    margin-right: 4px; }\n  .table td.icons a:last-child {\n    margin-right: 0px; }\n  .table td.danger-cell {\n    color: #B50F24; }\n\n.table-hover tbody tr:hover td {\n  background-color: #F2F9FA; }\n\n.btn {\n  background: #CEE0E3;\n  border-radius: 3px;\n  text-transform: uppercase;\n  font-weight: 700;\n  font-size: 14px;\n  letter-spacing: 0.05em;\n  padding: 14px 40px 11px 40px;\n  outline: none;\n  margin-right: 0px;\n  position: relative;\n  white-space: nowrap; }\n  .btn:hover {\n    background: #deeaec; }\n  .btn.btn-icon {\n    padding-left: 40px;\n    padding-right: 14px; }\n    .btn.btn-icon img {\n      margin-right: 8px;\n      position: absolute;\n      left: 12px;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%); }\n    .btn.btn-icon.btn-icon-right {\n      padding-left: 14px;\n      padding-right: 40px; }\n      .btn.btn-icon.btn-icon-right img {\n        margin-left: 8px;\n        right: 12px;\n        left: auto;\n        left: initial;\n        margin-right: 0; }\n  .btn.btn-sm {\n    font-size: 12px; }\n  .btn.btn-xs {\n    font-size: 10px;\n    padding: 3px 5px; }\n    .btn.btn-xs.btn-icon {\n      padding-left: 23px;\n      padding-right: 10px; }\n      .btn.btn-xs.btn-icon img {\n        margin-right: 4px;\n        left: 8px; }\n      .btn.btn-xs.btn-icon.btn-icon-right {\n        padding-left: 10px;\n        padding-right: 23px; }\n        .btn.btn-xs.btn-icon.btn-icon-right img {\n          margin-left: 4px;\n          right: 8px;\n          left: auto;\n          left: initial;\n          margin-right: 0; }\n  .btn.icon-rotate-90 img, .btn.icon-rotate-180 img {\n    transition: -webkit-transform .5s ease-in-out;\n    transition: transform .5s ease-in-out;\n    transition: transform .5s ease-in-out, -webkit-transform .5s ease-in-out; }\n  .btn.icon-rotate-90:hover img {\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg); }\n  .btn.icon-rotate-180:hover img {\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg); }\n  .btn.btn-transparent {\n    background-color: transparent; }\n    .btn.btn-transparent:hover {\n      text-decoration: underline; }\n  .btn.btn-turquoise {\n    background: #57DCEE; }\n    .btn.btn-turquoise:hover {\n      background: #7ce4f2; }\n  .btn.btn-green {\n    background: #62D792; }\n    .btn.btn-green:hover {\n      background: #83dfa9; }\n\n.status {\n  display: inline-block;\n  background-color: #AFC6C9;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-align: center;\n  text-transform: capitalize;\n  color: #ffffff;\n  min-width: 90px;\n  height: 24px;\n  padding-top: 5px;\n  padding-bottom: 5px;\n  position: relative; }\n  .status.status-circle {\n    color: #003040;\n    font-style: italic;\n    background-color: transparent !important;\n    text-align: left;\n    padding-left: 25px; }\n    .status.status-circle:before {\n      content: \"\";\n      height: 18px;\n      width: 18px;\n      border-radius: 9px;\n      position: absolute;\n      left: 0px;\n      top: 2px;\n      background-color: #AFC6C9; }\n    .status.status-circle .pulse-ring {\n      content: '';\n      width: 18px;\n      height: 18px;\n      border: 1px solid #AFC6C9;\n      border-radius: 50%;\n      position: absolute;\n      top: 2px;\n      left: 0px;\n      -webkit-animation: pulsate infinite 1.8s;\n              animation: pulsate infinite 1.8s; }\n  .status.status-green .pulse-ring {\n    border: 1px solid #3F9D66; }\n  .status.status-green, .status.status-circle.status-green:before {\n    background: #3F9D66; }\n  .status.status-orange .pulse-ring {\n    border: 1px solid #EB5B25; }\n  .status.status-orange, .status.status-circle.status-orange:before {\n    background: #EB5B25; }\n  .status.status-blue .pulse-ring {\n    border: 1px solid #1A4B61; }\n  .status.status-blue, .status.status-circle.status-blue:before {\n    background: #1A4B61; }\n\n@-webkit-keyframes pulsate {\n  0% {\n    -webkit-transform: scale(1, 1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(1.6, 1.6);\n    opacity: 0; } }\n\n/* Webfont: Lato-Black */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Black.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Black.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Black.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Black.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Black.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 900;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Bold */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Bold.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Bold.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Bold.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Bold.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Bold.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 700;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-BoldItalic */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-BoldItalic.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-BoldItalic.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-BoldItalic.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-BoldItalic.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-BoldItalic.ttf\") format(\"truetype\");\n  font-style: italic;\n  font-weight: 700;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Heavy */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Heavy.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Heavy.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Heavy.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Heavy.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Heavy.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 800;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-HeavyItalic */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-HeavyItalic.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-HeavyItalic.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-HeavyItalic.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-HeavyItalic.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-HeavyItalic.ttf\") format(\"truetype\");\n  font-style: italic;\n  font-weight: 800;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Italic */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Italic.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Italic.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Italic.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Italic.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Italic.ttf\") format(\"truetype\");\n  font-style: italic;\n  font-weight: 400;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Light */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Light.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Light.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Light.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Light.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Light.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 300;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-LightItalic */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-LightItalic.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-LightItalic.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-LightItalic.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-LightItalic.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-LightItalic.ttf\") format(\"truetype\");\n  font-style: italic;\n  font-weight: 300;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Medium */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Medium.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Medium.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Medium.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Medium.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Medium.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 500;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-MediumItalic */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-MediumItalic.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-MediumItalic.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-MediumItalic.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-MediumItalic.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-MediumItalic.ttf\") format(\"truetype\");\n  font-style: italic;\n  font-weight: 500;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Regular */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Regular.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Regular.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Regular.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Regular.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 400;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Semibold */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Semibold.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Semibold.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Semibold.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Semibold.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Semibold.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 600;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-SemiboldItalic */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-SemiboldItalic.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-SemiboldItalic.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-SemiboldItalic.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-SemiboldItalic.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-SemiboldItalic.ttf\") format(\"truetype\");\n  font-style: italic;\n  font-weight: 600;\n  text-rendering: optimizeLegibility; }\n\nhtml {\n  height: 100%; }\n\nbody {\n  height: 100%;\n  font-family: 'LatoWeb';\n  font-style: normal;\n  font-size: 14px;\n  line-height: normal;\n  font-weight: 400;\n  color: #003040;\n  padding-top: 90px; }\n\nbody.without-menu {\n  padding-top: 0px; }\n\ntextarea:focus, input:focus, select:focus {\n  outline: none; }\n\nh1 {\n  font-size: 18px;\n  font-weight: 900;\n  text-transform: uppercase;\n  color: #003040;\n  letter-spacing: 0.05em; }\n\na, a:hover {\n  color: #003040; }\n\nlabel {\n  font-size: 15px;\n  margin-bottom: 7px; }\n\n::-webkit-input-placeholder {\n  /* Chrome/Opera/Safari */\n  color: #CEE0E3 !important; }\n\n::-moz-placeholder {\n  /* Firefox 19+ */\n  color: #CEE0E3 !important; }\n\n:-ms-input-placeholder {\n  /* IE 10+ */\n  color: #CEE0E3 !important; }\n\n:-moz-placeholder {\n  /* Firefox 18- */\n  color: #CEE0E3 !important; }\n\n.custom-control {\n  padding-left: 1.9rem; }\n\n.custom-control-label {\n  font-size: 12px;\n  line-height: 20px; }\n\n.custom-control-label::before {\n  border: #CEE0E3 solid 1px;\n  margin-top: 0px; }\n\n.custom-control-label::before,\n.custom-control-label::after {\n  top: 0rem;\n  width: 22px;\n  height: 20px;\n  left: -1.9rem; }\n\n.custom-control-input:checked ~ .custom-control-label::before {\n  border-color: #CEE0E3;\n  background-color: #003040 !important; }\n\n.form-group {\n  margin-bottom: 22px; }\n\nselect.form-control {\n  border-radius: 6px;\n  position: relative; }\n\nselect.custom-select {\n  background-image: url(\"/assets/images/select_bg.png\");\n  background-repeat: no-repeat;\n  background-position: right center; }\n\n.form-control {\n  background: #FFFFFF;\n  border: 1px solid #CEE0E3;\n  box-sizing: border-box;\n  border-radius: 3px;\n  padding-left: 15px;\n  font-size: 15px;\n  height: 48px; }\n  .form-control:focus {\n    border: 1px solid #27505D; }\n\n.inner-addon {\n  position: relative; }\n\n.inner-addon input {\n  padding-left: 46px; }\n\n.inner-addon img {\n  position: absolute;\n  left: -10px;\n  padding: 10px 12px;\n  pointer-events: none;\n  top: 3px;\n  left: 0px; }\n\n.tooltip-inner {\n  background-color: #CEE0E3;\n  color: #003040;\n  font-size: 12px;\n  font-weight: 700; }\n\n.tooltip.bs-tooltip-right .arrow:before {\n  border-right-color: #CEE0E3 !important; }\n\n.tooltip.bs-tooltip-left .arrow:before {\n  border-left-color: #CEE0E3 !important; }\n\n.tooltip.bs-tooltip-bottom .arrow:before {\n  border-bottom-color: #CEE0E3 !important; }\n\n.tooltip.bs-tooltip-top .arrow:before {\n  border-top-color: #CEE0E3 !important; }\n\n.modal-content {\n  border-radius: 0;\n  border: none; }\n  .modal-content .modal-header {\n    background-color: #F2F9FA;\n    border-bottom: none;\n    position: relative; }\n    .modal-content .modal-header .close {\n      position: absolute;\n      right: 25px;\n      font-size: 0;\n      top: 21px; }\n    .modal-content .modal-header .modal-title {\n      width: 100%;\n      text-align: center;\n      font-size: 18px;\n      line-height: normal; }\n  .modal-content .modal-body {\n    padding: 2rem; }\n    .modal-content .modal-body .col {\n      margin-bottom: 60px; }\n    .modal-content .modal-body .modal-label {\n      line-height: 20px;\n      font-size: 15px;\n      color: #1A4B61;\n      margin-bottom: 20px; }\n    .modal-content .modal-body .modal-files-names ul {\n      list-style: none;\n      padding: 0; }\n      .modal-content .modal-body .modal-files-names ul li {\n        margin-bottom: 15px; }\n        .modal-content .modal-body .modal-files-names ul li img {\n          margin: 0 10px;\n          position: relative;\n          top: -1px; }\n  .modal-content .modal-footer {\n    padding: 20px; }\n\n.drag-field {\n  font-weight: 700;\n  line-height: normal;\n  font-size: 12px;\n  text-align: center;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  background-color: #F2F9FA;\n  color: #7FA3A8;\n  border: 1px dashed #CEE0E3;\n  border-radius: 3px;\n  padding: 17px 2px 0px 2px;\n  height: 48px; }\n  .drag-field a {\n    color: #57DCEE;\n    font-size: 12px; }\n\n.header {\n  padding-top: 30px;\n  padding-bottom: 30px; }\n  .header.header-bg {\n    background-color: #F2F9FA; }\n  .header h1 {\n    margin-top: 15px;\n    margin-right: 17px; }\n  .header .drag-field {\n    width: 100%; }\n  .header .form-control {\n    min-width: 220px; }\n  .header .status, .header .info-block {\n    margin-right: 37px; }\n  .header .status {\n    margin-top: 13px; }\n  .header .info-block {\n    margin-top: 10px;\n    font-size: 12px; }\n    .header .info-block .title {\n      text-transform: uppercase;\n      color: #7FA3A8;\n      letter-spacing: 0.05em; }\n\n.page {\n  padding-bottom: 100px;\n  padding-top: 0px; }\n\n.tabs-menu {\n  border-bottom: 1px solid #7FA3A8; }\n\n.tabs-menu a {\n  font-size: 14px;\n  text-align: center;\n  letter-spacing: 0.05em;\n  font-weight: 700;\n  text-transform: uppercase;\n  padding: 17px 17px 13px 17px;\n  margin-right: 15px;\n  margin-left: 15px;\n  margin-bottom: -1px; }\n\n.tabs-menu a:hover, .tabs-menu a.active {\n  border-bottom: 3px solid #20DEF4;\n  text-decoration: none; }\n\n.tabs-menu a.further {\n  color: rgba(26, 75, 97, 0.3); }\n\n.walktrough {\n  background: #FDC318;\n  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);\n  border-radius: 3px;\n  padding: 30px 17px 10px;\n  font-weight: bold;\n  font-size: 15px;\n  height: 154px;\n  margin-bottom: 30px; }\n  .walktrough .walktrough-close {\n    cursor: pointer;\n    position: absolute;\n    top: 5px;\n    right: 5px; }\n  .walktrough p {\n    margin-bottom: 20px; }\n\n.fixed-footer {\n  position: fixed;\n  background-color: #ffffff;\n  height: 81px;\n  width: 100%;\n  bottom: 0px;\n  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25); }\n  .fixed-footer .pagination {\n    margin-top: 0px; }\n    .fixed-footer .pagination .page-item.active .page-link, .fixed-footer .pagination .page-item.active .page-link:hover {\n      background-color: #F2F9FA;\n      border-color: #F2F9FA;\n      text-decoration: none;\n      cursor: auto;\n      font-weight: 700; }\n    .fixed-footer .pagination .page-item .page-link {\n      font-size: 15px;\n      border: none;\n      color: #3F3356;\n      height: 80px;\n      padding-top: 32px;\n      padding-left: 17px;\n      padding-right: 17px; }\n      .fixed-footer .pagination .page-item .page-link:hover {\n        text-decoration: underline;\n        background-color: transparent; }\n  .fixed-footer .btn, .fixed-footer .entries {\n    margin-top: 17px; }\n  .fixed-footer .entries {\n    max-width: 210px;\n    color: #7FA3A8;\n    text-transform: uppercase;\n    font-size: 12px;\n    letter-spacing: 0.05em;\n    font-weight: 700; }\n    .fixed-footer .entries span {\n      display: inline-block; }\n    .fixed-footer .entries select {\n      display: inline-block;\n      width: 80px;\n      margin-left: 10px;\n      margin-right: 10px; }\n\n.grey {\n  color: #CEE0E3; }\n\n#login-page {\n  background-image: url(\"/assets/images/login_bg.jpg\");\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center center;\n  height: 100%;\n  display: flex;\n  align-items: center; }\n  #login-page h1 {\n    margin-bottom: 34px; }\n  #login-page .container {\n    margin-top: -80px; }\n  #login-page .login-block {\n    background: #FFFFFF;\n    max-width: 450px;\n    padding: 42px 48px 55px 48px;\n    margin-top: 80px; }\n    #login-page .login-block .login-footer {\n      margin-top: 35px;\n      min-height: 45px; }\n      #login-page .login-block .login-footer .custom-checkbox {\n        margin-bottom: 10px; }\n      #login-page .login-block .login-footer a {\n        text-decoration: underline;\n        font-size: 12px; }\n  #login-page .login-info {\n    max-width: 380px; }\n    #login-page .login-info .login-text {\n      color: #ffffff;\n      font-size: 16px;\n      margin-top: 40px;\n      text-align: left;\n      margin-bottom: 40px;\n      letter-spacing: 0.05em; }\n\n.file-extention {\n  font-weight: 900;\n  line-height: 20px;\n  font-size: 9px;\n  background: #7FA3A8;\n  border-radius: 3px;\n  padding: 2px 4px;\n  margin-right: 5px;\n  color: #FFF; }\n\n.file-lang {\n  background: #CEE0E3;\n  border-radius: 14px;\n  line-height: 20px;\n  font-size: 15px;\n  font-style: italic;\n  font-weight: 500;\n  padding: 5px 20px 5px 18px;\n  color: #003040; }\n\n.connectors-container {\n  margin: 0 15px 40px; }\n  .connectors-container > .row {\n    overflow-x: auto; }\n  .connectors-container .connector-box {\n    padding: 15px 10px 10px;\n    text-align: center;\n    border-radius: 5px;\n    cursor: pointer; }\n    .connectors-container .connector-box.active, .connectors-container .connector-box:hover {\n      background: #F2F9FA; }\n    .connectors-container .connector-box .connector-icon {\n      margin-bottom: 6px;\n      height: 70px;\n      position: relative; }\n      .connectors-container .connector-box .connector-icon img {\n        position: absolute;\n        top: 50%;\n        -webkit-transform: translateY(-50%);\n                transform: translateY(-50%);\n        left: 0;\n        right: 0;\n        margin: auto; }\n    .connectors-container .connector-box .connector-name {\n      font-size: 11px;\n      text-transform: uppercase;\n      font-weight: bold; }\n\n.files-container {\n  max-width: 700px; }\n  .files-container .files-col-first {\n    border-right: 1px solid #F2F2F2; }\n\n.col-box {\n  margin-left: 15px;\n  margin-top: 20px; }\n  .col-box .col-head {\n    font-size: 12px;\n    line-height: normal;\n    letter-spacing: 0.05em;\n    text-transform: uppercase;\n    color: #7FA3A8;\n    margin-bottom: 25px; }\n  .col-box .selected-files ul {\n    padding: 2px 0  0;\n    list-style: none; }\n    .col-box .selected-files ul li {\n      width: 235px;\n      position: relative;\n      padding: 0 35px;\n      margin-bottom: 18px; }\n      .col-box .selected-files ul li .file-icon {\n        max-width: 18px;\n        position: absolute;\n        top: -1px;\n        left: 0; }\n      .col-box .selected-files ul li .remove-icon {\n        width: 18px;\n        position: absolute;\n        top: 0px;\n        right: 0;\n        cursor: pointer; }\n  .col-box .drag-field {\n    padding-top: 130px;\n    padding-bottom: 140px; }\n\n.jstree .jstree-wholerow-hovered, .jstree .jstree-wholerow-clicked {\n  background: none; }\n\n.jstree .jstree-open > .jstree-children {\n  margin-top: 10px; }\n  .jstree .jstree-open > .jstree-children .jstree-node {\n    margin-top: 10px; }\n", "",{"version":3,"sources":["style.scss"],"names":[],"mappings":"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","file":"style.scss","sourcesContent":["@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"~material-icons/iconfont/MaterialIcons-Regular.eot\");\n  /* For IE6-8 */\n  src: local(\"Material Icons\"), local(\"MaterialIcons-Regular\"), url(\"~material-icons/iconfont/MaterialIcons-Regular.woff2\") format(\"woff2\"), url(\"~material-icons/iconfont/MaterialIcons-Regular.woff\") format(\"woff\"), url(\"~material-icons/iconfont/MaterialIcons-Regular.ttf\") format(\"truetype\"); }\n\n.material-icons {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n  /* Support for IE. */\n  font-feature-settings: 'liga'; }\n\n@media (min-width: 1400px) {\n  .container {\n    max-width: 1280px; } }\n\n.navbar {\n  background-image: linear-gradient(180deg, #27505D 0%, #003040 100%);\n  padding: .0rem 1rem;\n  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); }\n  .navbar .navbar-brand {\n    color: #ffffff;\n    font-size: 18px;\n    letter-spacing: 0.05em;\n    font-weight: 900;\n    padding-right: 70px; }\n  .navbar .nav-item {\n    padding: 0px; }\n    .navbar .nav-item.active {\n      background-color: rgba(0, 35, 46, 0.6); }\n    .navbar .nav-item.active .nav-link {\n      opacity: 1; }\n    .navbar .nav-item .nav-link {\n      color: #FFFFFF;\n      opacity: 0.6;\n      font-weight: 700;\n      line-height: normal;\n      font-size: 12px;\n      text-align: center;\n      letter-spacing: 0.05em;\n      text-transform: uppercase;\n      padding: 37px 22px; }\n      .navbar .nav-item .nav-link:hover {\n        background-color: rgba(0, 35, 46, 0.2); }\n\n.dropdown-toggle:hover {\n  cursor: pointer; }\n\n.dropdown-toggle::after {\n  margin-left: 10px; }\n\n.dropdown-menu .dropdown-item {\n  font-size: 14px;\n  padding: 11px 62px 11px 17px;\n  font-weight: 700;\n  color: #7FA3A8; }\n  .dropdown-menu .dropdown-item.tab {\n    padding-left: 45px; }\n  .dropdown-menu .dropdown-item.active {\n    color: #003040;\n    background-color: transparent; }\n    .dropdown-menu .dropdown-item.active:hover {\n      background-color: transparent; }\n  .dropdown-menu .dropdown-item:hover {\n    background-color: #F2F9FA; }\n\n.table td, .table th {\n  vertical-align: middle;\n  border-top: none; }\n\n.table thead th {\n  line-height: 10px;\n  vertical-align: middle;\n  color: #7FA3A8;\n  font-size: 12px;\n  text-transform: uppercase;\n  font-weight: 700;\n  border-bottom: 1px solid #7FA3A8;\n  letter-spacing: 0.05em;\n  padding: .55rem;\n  padding-left: 18px; }\n  .table thead th .btn {\n    background-color: #F2F2F2;\n    color: #003040;\n    margin-left: 12px; }\n\n.table td {\n  border-bottom: 1px solid #F2F2F2;\n  padding: 24px 22px 20px 18px;\n  color: #003040; }\n  .table td a {\n    color: #003040; }\n  .table td.icons a {\n    display: inline-block;\n    padding: 1px 6px 1px 6px;\n    margin-right: 4px; }\n  .table td.icons a:last-child {\n    margin-right: 0px; }\n  .table td.danger-cell {\n    color: #B50F24; }\n\n.table-hover tbody tr:hover td {\n  background-color: #F2F9FA; }\n\n.btn {\n  background: #CEE0E3;\n  border-radius: 3px;\n  text-transform: uppercase;\n  font-weight: 700;\n  font-size: 14px;\n  letter-spacing: 0.05em;\n  padding: 14px 40px 11px 40px;\n  outline: none;\n  margin-right: 0px;\n  position: relative;\n  white-space: nowrap; }\n  .btn:hover {\n    background: #deeaec; }\n  .btn.btn-icon {\n    padding-left: 40px;\n    padding-right: 14px; }\n    .btn.btn-icon img {\n      margin-right: 8px;\n      position: absolute;\n      left: 12px;\n      top: 50%;\n      transform: translateY(-50%); }\n    .btn.btn-icon.btn-icon-right {\n      padding-left: 14px;\n      padding-right: 40px; }\n      .btn.btn-icon.btn-icon-right img {\n        margin-left: 8px;\n        right: 12px;\n        left: initial;\n        margin-right: 0; }\n  .btn.btn-sm {\n    font-size: 12px; }\n  .btn.btn-xs {\n    font-size: 10px;\n    padding: 3px 5px; }\n    .btn.btn-xs.btn-icon {\n      padding-left: 23px;\n      padding-right: 10px; }\n      .btn.btn-xs.btn-icon img {\n        margin-right: 4px;\n        left: 8px; }\n      .btn.btn-xs.btn-icon.btn-icon-right {\n        padding-left: 10px;\n        padding-right: 23px; }\n        .btn.btn-xs.btn-icon.btn-icon-right img {\n          margin-left: 4px;\n          right: 8px;\n          left: initial;\n          margin-right: 0; }\n  .btn.icon-rotate-90 img, .btn.icon-rotate-180 img {\n    -webkit-transition: -webkit-transform .5s ease-in-out;\n    transition: transform .5s ease-in-out; }\n  .btn.icon-rotate-90:hover img {\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg); }\n  .btn.icon-rotate-180:hover img {\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg); }\n  .btn.btn-transparent {\n    background-color: transparent; }\n    .btn.btn-transparent:hover {\n      text-decoration: underline; }\n  .btn.btn-turquoise {\n    background: #57DCEE; }\n    .btn.btn-turquoise:hover {\n      background: #7ce4f2; }\n  .btn.btn-green {\n    background: #62D792; }\n    .btn.btn-green:hover {\n      background: #83dfa9; }\n\n.status {\n  display: inline-block;\n  background-color: #AFC6C9;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  text-align: center;\n  text-transform: capitalize;\n  color: #ffffff;\n  min-width: 90px;\n  height: 24px;\n  padding-top: 5px;\n  padding-bottom: 5px;\n  position: relative; }\n  .status.status-circle {\n    color: #003040;\n    font-style: italic;\n    background-color: transparent !important;\n    text-align: left;\n    padding-left: 25px; }\n    .status.status-circle:before {\n      content: \"\";\n      height: 18px;\n      width: 18px;\n      border-radius: 9px;\n      position: absolute;\n      left: 0px;\n      top: 2px;\n      background-color: #AFC6C9; }\n    .status.status-circle .pulse-ring {\n      content: '';\n      width: 18px;\n      height: 18px;\n      border: 1px solid #AFC6C9;\n      border-radius: 50%;\n      position: absolute;\n      top: 2px;\n      left: 0px;\n      animation: pulsate infinite 1.8s; }\n  .status.status-green .pulse-ring {\n    border: 1px solid #3F9D66; }\n  .status.status-green, .status.status-circle.status-green:before {\n    background: #3F9D66; }\n  .status.status-orange .pulse-ring {\n    border: 1px solid #EB5B25; }\n  .status.status-orange, .status.status-circle.status-orange:before {\n    background: #EB5B25; }\n  .status.status-blue .pulse-ring {\n    border: 1px solid #1A4B61; }\n  .status.status-blue, .status.status-circle.status-blue:before {\n    background: #1A4B61; }\n\n@-webkit-keyframes pulsate {\n  0% {\n    -webkit-transform: scale(1, 1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(1.6, 1.6);\n    opacity: 0; } }\n\n/* Webfont: Lato-Black */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Black.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Black.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Black.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Black.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Black.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 900;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Bold */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Bold.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Bold.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Bold.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Bold.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Bold.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 700;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-BoldItalic */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-BoldItalic.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-BoldItalic.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-BoldItalic.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-BoldItalic.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-BoldItalic.ttf\") format(\"truetype\");\n  font-style: italic;\n  font-weight: 700;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Heavy */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Heavy.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Heavy.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Heavy.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Heavy.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Heavy.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 800;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-HeavyItalic */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-HeavyItalic.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-HeavyItalic.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-HeavyItalic.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-HeavyItalic.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-HeavyItalic.ttf\") format(\"truetype\");\n  font-style: italic;\n  font-weight: 800;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Italic */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Italic.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Italic.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Italic.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Italic.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Italic.ttf\") format(\"truetype\");\n  font-style: italic;\n  font-weight: 400;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Light */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Light.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Light.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Light.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Light.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Light.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 300;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-LightItalic */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-LightItalic.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-LightItalic.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-LightItalic.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-LightItalic.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-LightItalic.ttf\") format(\"truetype\");\n  font-style: italic;\n  font-weight: 300;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Medium */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Medium.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Medium.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Medium.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Medium.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Medium.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 500;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-MediumItalic */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-MediumItalic.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-MediumItalic.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-MediumItalic.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-MediumItalic.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-MediumItalic.ttf\") format(\"truetype\");\n  font-style: italic;\n  font-weight: 500;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Regular */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Regular.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Regular.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Regular.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Regular.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 400;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-Semibold */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-Semibold.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-Semibold.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-Semibold.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-Semibold.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-Semibold.ttf\") format(\"truetype\");\n  font-style: normal;\n  font-weight: 600;\n  text-rendering: optimizeLegibility; }\n\n/* Webfont: Lato-SemiboldItalic */\n@font-face {\n  font-family: 'LatoWeb';\n  src: url(\"/assets/fonts/Lato-SemiboldItalic.eot\");\n  /* IE9 Compat Modes */\n  src: url(\"/assets/fonts/Lato-SemiboldItalic.eot?#iefix\") format(\"embedded-opentype\"), url(\"/assets/fonts/Lato-SemiboldItalic.woff2\") format(\"woff2\"), url(\"/assets/fonts/Lato-SemiboldItalic.woff\") format(\"woff\"), url(\"/assets/fonts/Lato-SemiboldItalic.ttf\") format(\"truetype\");\n  font-style: italic;\n  font-weight: 600;\n  text-rendering: optimizeLegibility; }\n\nhtml {\n  height: 100%; }\n\nbody {\n  height: 100%;\n  font-family: 'LatoWeb';\n  font-style: normal;\n  font-size: 14px;\n  line-height: normal;\n  font-weight: 400;\n  color: #003040;\n  padding-top: 90px; }\n\nbody.without-menu {\n  padding-top: 0px; }\n\ntextarea:focus, input:focus, select:focus {\n  outline: none; }\n\nh1 {\n  font-size: 18px;\n  font-weight: 900;\n  text-transform: uppercase;\n  color: #003040;\n  letter-spacing: 0.05em; }\n\na, a:hover {\n  color: #003040; }\n\nlabel {\n  font-size: 15px;\n  margin-bottom: 7px; }\n\n::-webkit-input-placeholder {\n  /* Chrome/Opera/Safari */\n  color: #CEE0E3 !important; }\n\n::-moz-placeholder {\n  /* Firefox 19+ */\n  color: #CEE0E3 !important; }\n\n:-ms-input-placeholder {\n  /* IE 10+ */\n  color: #CEE0E3 !important; }\n\n:-moz-placeholder {\n  /* Firefox 18- */\n  color: #CEE0E3 !important; }\n\n.custom-control {\n  padding-left: 1.9rem; }\n\n.custom-control-label {\n  font-size: 12px;\n  line-height: 20px; }\n\n.custom-control-label::before {\n  border: #CEE0E3 solid 1px;\n  margin-top: 0px; }\n\n.custom-control-label::before,\n.custom-control-label::after {\n  top: 0rem;\n  width: 22px;\n  height: 20px;\n  left: -1.9rem; }\n\n.custom-control-input:checked ~ .custom-control-label::before {\n  border-color: #CEE0E3;\n  background-color: #003040 !important; }\n\n.form-group {\n  margin-bottom: 22px; }\n\nselect.form-control {\n  border-radius: 6px;\n  position: relative; }\n\nselect.custom-select {\n  background-image: url(\"/assets/images/select_bg.png\");\n  background-repeat: no-repeat;\n  background-position: right center; }\n\n.form-control {\n  background: #FFFFFF;\n  border: 1px solid #CEE0E3;\n  box-sizing: border-box;\n  border-radius: 3px;\n  padding-left: 15px;\n  font-size: 15px;\n  height: 48px; }\n  .form-control:focus {\n    border: 1px solid #27505D; }\n\n.inner-addon {\n  position: relative; }\n\n.inner-addon input {\n  padding-left: 46px; }\n\n.inner-addon img {\n  position: absolute;\n  left: -10px;\n  padding: 10px 12px;\n  pointer-events: none;\n  top: 3px;\n  left: 0px; }\n\n.tooltip-inner {\n  background-color: #CEE0E3;\n  color: #003040;\n  font-size: 12px;\n  font-weight: 700; }\n\n.tooltip.bs-tooltip-right .arrow:before {\n  border-right-color: #CEE0E3 !important; }\n\n.tooltip.bs-tooltip-left .arrow:before {\n  border-left-color: #CEE0E3 !important; }\n\n.tooltip.bs-tooltip-bottom .arrow:before {\n  border-bottom-color: #CEE0E3 !important; }\n\n.tooltip.bs-tooltip-top .arrow:before {\n  border-top-color: #CEE0E3 !important; }\n\n.modal-content {\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0;\n  border: none; }\n  .modal-content .modal-header {\n    background-color: #F2F9FA;\n    border-bottom: none;\n    position: relative; }\n    .modal-content .modal-header .close {\n      position: absolute;\n      right: 25px;\n      font-size: 0;\n      top: 21px; }\n    .modal-content .modal-header .modal-title {\n      width: 100%;\n      text-align: center;\n      font-size: 18px;\n      line-height: normal; }\n  .modal-content .modal-body {\n    padding: 2rem; }\n    .modal-content .modal-body .col {\n      margin-bottom: 60px; }\n    .modal-content .modal-body .modal-label {\n      line-height: 20px;\n      font-size: 15px;\n      color: #1A4B61;\n      margin-bottom: 20px; }\n    .modal-content .modal-body .modal-files-names ul {\n      list-style: none;\n      padding: 0; }\n      .modal-content .modal-body .modal-files-names ul li {\n        margin-bottom: 15px; }\n        .modal-content .modal-body .modal-files-names ul li img {\n          margin: 0 10px;\n          position: relative;\n          top: -1px; }\n  .modal-content .modal-footer {\n    padding: 20px; }\n\n.drag-field {\n  font-weight: 700;\n  line-height: normal;\n  font-size: 12px;\n  text-align: center;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  background-color: #F2F9FA;\n  color: #7FA3A8;\n  border: 1px dashed #CEE0E3;\n  border-radius: 3px;\n  padding: 17px 2px 0px 2px;\n  height: 48px; }\n  .drag-field a {\n    color: #57DCEE;\n    font-size: 12px; }\n\n.header {\n  padding-top: 30px;\n  padding-bottom: 30px; }\n  .header.header-bg {\n    background-color: #F2F9FA; }\n  .header h1 {\n    margin-top: 15px;\n    margin-right: 17px; }\n  .header .drag-field {\n    width: 100%; }\n  .header .form-control {\n    min-width: 220px; }\n  .header .status, .header .info-block {\n    margin-right: 37px; }\n  .header .status {\n    margin-top: 13px; }\n  .header .info-block {\n    margin-top: 10px;\n    font-size: 12px; }\n    .header .info-block .title {\n      text-transform: uppercase;\n      color: #7FA3A8;\n      letter-spacing: 0.05em; }\n\n.page {\n  padding-bottom: 100px;\n  padding-top: 0px; }\n\n.tabs-menu {\n  border-bottom: 1px solid #7FA3A8; }\n\n.tabs-menu a {\n  font-size: 14px;\n  text-align: center;\n  letter-spacing: 0.05em;\n  font-weight: 700;\n  text-transform: uppercase;\n  padding: 17px 17px 13px 17px;\n  margin-right: 15px;\n  margin-left: 15px;\n  margin-bottom: -1px; }\n\n.tabs-menu a:hover, .tabs-menu a.active {\n  border-bottom: 3px solid #20DEF4;\n  text-decoration: none; }\n\n.tabs-menu a.further {\n  color: rgba(26, 75, 97, 0.3); }\n\n.walktrough {\n  background: #FDC318;\n  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);\n  border-radius: 3px;\n  padding: 30px 17px 10px;\n  font-weight: bold;\n  font-size: 15px;\n  height: 154px;\n  margin-bottom: 30px; }\n  .walktrough .walktrough-close {\n    cursor: pointer;\n    position: absolute;\n    top: 5px;\n    right: 5px; }\n  .walktrough p {\n    margin-bottom: 20px; }\n\n.fixed-footer {\n  position: fixed;\n  background-color: #ffffff;\n  height: 81px;\n  width: 100%;\n  bottom: 0px;\n  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25); }\n  .fixed-footer .pagination {\n    margin-top: 0px; }\n    .fixed-footer .pagination .page-item.active .page-link, .fixed-footer .pagination .page-item.active .page-link:hover {\n      background-color: #F2F9FA;\n      border-color: #F2F9FA;\n      text-decoration: none;\n      cursor: auto;\n      font-weight: 700; }\n    .fixed-footer .pagination .page-item .page-link {\n      font-size: 15px;\n      border: none;\n      color: #3F3356;\n      height: 80px;\n      padding-top: 32px;\n      padding-left: 17px;\n      padding-right: 17px; }\n      .fixed-footer .pagination .page-item .page-link:hover {\n        text-decoration: underline;\n        background-color: transparent; }\n  .fixed-footer .btn, .fixed-footer .entries {\n    margin-top: 17px; }\n  .fixed-footer .entries {\n    max-width: 210px;\n    color: #7FA3A8;\n    text-transform: uppercase;\n    font-size: 12px;\n    letter-spacing: 0.05em;\n    font-weight: 700; }\n    .fixed-footer .entries span {\n      display: inline-block; }\n    .fixed-footer .entries select {\n      display: inline-block;\n      width: 80px;\n      margin-left: 10px;\n      margin-right: 10px; }\n\n.grey {\n  color: #CEE0E3; }\n\n#login-page {\n  background-image: url(\"/assets/images/login_bg.jpg\");\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center center;\n  height: 100%;\n  display: flex;\n  align-items: center; }\n  #login-page h1 {\n    margin-bottom: 34px; }\n  #login-page .container {\n    margin-top: -80px; }\n  #login-page .login-block {\n    background: #FFFFFF;\n    max-width: 450px;\n    padding: 42px 48px 55px 48px;\n    margin-top: 80px; }\n    #login-page .login-block .login-footer {\n      margin-top: 35px;\n      min-height: 45px; }\n      #login-page .login-block .login-footer .custom-checkbox {\n        margin-bottom: 10px; }\n      #login-page .login-block .login-footer a {\n        text-decoration: underline;\n        font-size: 12px; }\n  #login-page .login-info {\n    max-width: 380px; }\n    #login-page .login-info .login-text {\n      color: #ffffff;\n      font-size: 16px;\n      margin-top: 40px;\n      text-align: left;\n      margin-bottom: 40px;\n      letter-spacing: 0.05em; }\n\n.file-extention {\n  font-weight: 900;\n  line-height: 20px;\n  font-size: 9px;\n  background: #7FA3A8;\n  border-radius: 3px;\n  padding: 2px 4px;\n  margin-right: 5px;\n  color: #FFF; }\n\n.file-lang {\n  background: #CEE0E3;\n  border-radius: 14px;\n  line-height: 20px;\n  font-size: 15px;\n  font-style: italic;\n  font-weight: 500;\n  padding: 5px 20px 5px 18px;\n  color: #003040; }\n\n.connectors-container {\n  margin: 0 15px 40px; }\n  .connectors-container > .row {\n    overflow-x: auto; }\n  .connectors-container .connector-box {\n    padding: 15px 10px 10px;\n    text-align: center;\n    border-radius: 5px;\n    cursor: pointer; }\n    .connectors-container .connector-box.active, .connectors-container .connector-box:hover {\n      background: #F2F9FA; }\n    .connectors-container .connector-box .connector-icon {\n      margin-bottom: 6px;\n      height: 70px;\n      position: relative; }\n      .connectors-container .connector-box .connector-icon img {\n        position: absolute;\n        top: 50%;\n        transform: translateY(-50%);\n        left: 0;\n        right: 0;\n        margin: auto; }\n    .connectors-container .connector-box .connector-name {\n      font-size: 11px;\n      text-transform: uppercase;\n      font-weight: bold; }\n\n.files-container {\n  max-width: 700px; }\n  .files-container .files-col-first {\n    border-right: 1px solid #F2F2F2; }\n\n.col-box {\n  margin-left: 15px;\n  margin-top: 20px; }\n  .col-box .col-head {\n    font-size: 12px;\n    line-height: normal;\n    letter-spacing: 0.05em;\n    text-transform: uppercase;\n    color: #7FA3A8;\n    margin-bottom: 25px; }\n  .col-box .selected-files ul {\n    padding: 2px 0  0;\n    list-style: none; }\n    .col-box .selected-files ul li {\n      width: 235px;\n      position: relative;\n      padding: 0 35px;\n      margin-bottom: 18px; }\n      .col-box .selected-files ul li .file-icon {\n        max-width: 18px;\n        position: absolute;\n        top: -1px;\n        left: 0; }\n      .col-box .selected-files ul li .remove-icon {\n        width: 18px;\n        position: absolute;\n        top: 0px;\n        right: 0;\n        cursor: pointer; }\n  .col-box .drag-field {\n    padding-top: 130px;\n    padding-bottom: 140px; }\n\n.jstree .jstree-wholerow-hovered, .jstree .jstree-wholerow-clicked {\n  background: none; }\n\n.jstree .jstree-open > .jstree-children {\n  margin-top: 10px; }\n  .jstree .jstree-open > .jstree-children .jstree-node {\n    margin-top: 10px; }\n"]}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/url-escape.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/url-escape.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url, needQuotes) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || needQuotes) {
    return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }

  return url;
};

/***/ }),

/***/ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.eot":
/*!************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/MaterialIcons-Regular.eot ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "MaterialIcons-Regular.eot";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.ttf":
/*!************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/MaterialIcons-Regular.ttf ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "MaterialIcons-Regular.ttf";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff":
/*!*************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "MaterialIcons-Regular.woff";

/***/ }),

/***/ "./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff2":
/*!**************************************************************************!*\
  !*** ./node_modules/material-icons/iconfont/MaterialIcons-Regular.woff2 ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "MaterialIcons-Regular.woff2";

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/js/files.js":
/*!*************************!*\
  !*** ./src/js/files.js ***!
  \*************************/
/*! exports provided: initFiles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initFiles", function() { return initFiles; });
var initFiles = function initFiles() {
  var instance;
  $(document).on('click', '.connector-box', function () {
    //var root = $(this).data('root');
    $('.connector-box').removeClass('active');
    $(this).addClass('active');
    $('.drag-field').hide();

    if ($(this).hasClass('device')) {
      $('#jstree_div').hide();
      $('.drag-field').show();
    } else {
      $('#jstree_div').show();
      $('.addToTable').show();
      $('#jstree_div').jstree("refresh");

      if (instance !== undefined) {
        instance.jstree("destroy");
      } else {
        localStorage.removeItem('jstree');
      }

      instance = $('#jstree_div').jstree({
        "plugins": ["contextmenu", "search", "types", "state", "wholerow", "checkbox"],
        'core': {
          'check_callback': true,
          'data': {
            'url': function url(node) {
              //var user_id = $('#client-select').val();
              return node.id === '#' ? '/root.json' : ''; //'/structure?user_id='+user_id+'&id='+root :
              //  '/structure?user_id='+user_id+'&id='+node.id;
            },
            "data": function data(node) {},
            "dataType": "json" // needed only if you do not supply JSON headers

          }
        },
        "types": {
          "#": {
            "max_children": 1,
            "valid_children": ["root"]
          },
          "root": {
            "icon": "assets/images/tree_folder.svg",
            "valid_children": ["default"]
          },
          "default": {
            "icon": "assets/images/tree_folder.svg",
            "valid_children": ["default", "file"]
          },
          "file": {
            "icon": "assets/images/file_icon.svg",
            "valid_children": []
          }
        },
        "checkbox": {
          "whole_node": true,
          'deselect_all': true,
          'three_state': true
        }
      });
    }
  });
};

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals */ "./src/js/modals.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./files */ "./src/js/files.js");



(function () {
  'use strict';

  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    _modals__WEBPACK_IMPORTED_MODULE_0__["initModalConfirm"]();
    _modals__WEBPACK_IMPORTED_MODULE_0__["initModalZip"]();
    _files__WEBPACK_IMPORTED_MODULE_1__["initFiles"]();
  });
})($);

/***/ }),

/***/ "./src/js/modals.js":
/*!**************************!*\
  !*** ./src/js/modals.js ***!
  \**************************/
/*! exports provided: initModalConfirm, initModalZip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initModalConfirm", function() { return initModalConfirm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initModalZip", function() { return initModalZip; });
//modal confirm
var initModalConfirm = function initModalConfirm() {
  $("*[data-confirm]").on("click", function (e) {
    e.preventDefault();
    var href = $(this).attr("href");
    var title = $(this).attr("data-confirm");
    var btnText = $(this).attr("data-confirm-btn");
    var functionName = $(this).attr("data-confirm-call");
    var modalConfirm = $("#modal-confirm");
    modalConfirm.find(".btn-confirm").html(btnText);
    modalConfirm.find(".modal-body p").html(title);

    if (functionName != undefined) {
      modalConfirm.find(".btn-confirm").on("click", function () {
        window[functionName]();
        modalConfirm.modal("hide");
      });
    } else {
      modalConfirm.find(".btn-confirm").attr("href", href);
    }

    modalConfirm.modal("show");
  });
};
var initModalZip = function initModalZip() {
  $(".header .drag-field").on("click", function (e) {
    var modalZip = $("#modal-zip");
    modalZip.modal("show");
  });
};

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../node_modules/postcss-loader/src??ref--6-2!../../node_modules/sass-loader/lib/loader.js??ref--6-3!./style.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/scss/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../node_modules/postcss-loader/src??ref--6-2!../../node_modules/sass-loader/lib/loader.js??ref--6-3!./style.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/scss/style.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-1!../../node_modules/postcss-loader/src??ref--6-2!../../node_modules/sass-loader/lib/loader.js??ref--6-3!./style.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/scss/style.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 0:
/*!****************************************************!*\
  !*** multi ./src/js/main.js ./src/scss/style.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\projects\_DEO\LH\lh\src\js\main.js */"./src/js/main.js");
module.exports = __webpack_require__(/*! D:\projects\_DEO\LH\lh\src\scss\style.scss */"./src/scss/style.scss");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Njc3Mvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS91cmwtZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIuZW90Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIudHRmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbWF0ZXJpYWwtaWNvbnMvaWNvbmZvbnQvTWF0ZXJpYWxJY29ucy1SZWd1bGFyLndvZmYyIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9maWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kYWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL3N0eWxlLnNjc3M/NWIxNCJdLCJuYW1lcyI6WyJpbml0RmlsZXMiLCJpbnN0YW5jZSIsIiQiLCJkb2N1bWVudCIsIm9uIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImhpZGUiLCJoYXNDbGFzcyIsInNob3ciLCJqc3RyZWUiLCJ1bmRlZmluZWQiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwibm9kZSIsImlkIiwicmVhZHkiLCJ0b29sdGlwIiwiTU9EQUxTIiwiRklMRVMiLCJpbml0TW9kYWxDb25maXJtIiwiZSIsInByZXZlbnREZWZhdWx0IiwiaHJlZiIsImF0dHIiLCJ0aXRsZSIsImJ0blRleHQiLCJmdW5jdGlvbk5hbWUiLCJtb2RhbENvbmZpcm0iLCJmaW5kIiwiaHRtbCIsIndpbmRvdyIsIm1vZGFsIiwiaW5pdE1vZGFsWmlwIiwibW9kYWxaaXAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QixNQUFNLFVBQVUsWUFBWSxhQUFhLGdCQUFnQixNQUFNLGlCQUFpQixNQUFNLFVBQVUsaUJBQWlCLE1BQU0saUJBQWlCLE1BQU0sa0JBQWtCLE1BQU0sWUFBWSxtQkFBbUIsTUFBTSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsa0JBQWtCLE1BQU0sWUFBWSxhQUFhLGdCQUFnQixNQUFNLGVBQWUsTUFBTSxZQUFZLGFBQWEsa0JBQWtCLE1BQU0saUJBQWlCLE1BQU0sZ0JBQWdCLE1BQU0sa0JBQWtCLE1BQU0sWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxrQkFBa0IsTUFBTSxpQkFBaUIsTUFBTSxZQUFZLGtCQUFrQixNQUFNLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxrQkFBa0IsTUFBTSxZQUFZLGtCQUFrQixNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsZUFBZSxNQUFNLGVBQWUsTUFBTSxVQUFVLGlCQUFpQixNQUFNLFlBQVksa0JBQWtCLE1BQU0sWUFBWSxnQkFBZ0IsS0FBSyxZQUFZLGtCQUFrQixNQUFNLFlBQVksV0FBVyxVQUFVLFVBQVUsZUFBZSxNQUFNLFlBQVksYUFBYSxrQkFBa0IsTUFBTSxZQUFZLGtCQUFrQixNQUFNLFlBQVksa0JBQWtCLE1BQU0saUJBQWlCLE1BQU0saUJBQWlCLE1BQU0saUJBQWlCLE1BQU0saUJBQWlCLE1BQU0saUJBQWlCLE1BQU0sa0JBQWtCLE1BQU0sWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsa0JBQWtCLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxrQkFBa0IsTUFBTSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLGlCQUFpQixNQUFNLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGtCQUFrQixNQUFNLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLGlCQUFpQixNQUFNLGtCQUFrQixNQUFNLEtBQUssWUFBWSxnQkFBZ0IsS0FBSyxZQUFZLHNCQUFzQixhQUFhLE1BQU0sWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsbUJBQW1CLGFBQWEsTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxtQkFBbUIsYUFBYSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLG1CQUFtQixhQUFhLE1BQU0sWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsbUJBQW1CLGFBQWEsTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxtQkFBbUIsYUFBYSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLG1CQUFtQixhQUFhLE1BQU0sWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsbUJBQW1CLGFBQWEsTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxtQkFBbUIsYUFBYSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLG1CQUFtQixhQUFhLE1BQU0sWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsbUJBQW1CLGFBQWEsTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxtQkFBbUIsYUFBYSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLG1CQUFtQixhQUFhLE1BQU0sWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsbUJBQW1CLE1BQU0sZ0JBQWdCLE1BQU0sVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxnQkFBZ0IsTUFBTSxVQUFVLFlBQVksYUFBYSxXQUFXLGtCQUFrQixNQUFNLGdCQUFnQixNQUFNLFVBQVUsa0JBQWtCLE1BQU0sWUFBWSxtQkFBbUIsTUFBTSxZQUFZLG1CQUFtQixNQUFNLFVBQVUsa0JBQWtCLE1BQU0sWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLGtCQUFrQixNQUFNLFlBQVksaUJBQWlCLE9BQU8sVUFBVSxVQUFVLFVBQVUsZ0JBQWdCLE1BQU0sWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxZQUFZLG1CQUFtQixNQUFNLFlBQVksYUFBYSxtQkFBbUIsTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxlQUFlLEtBQUssa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLGdCQUFnQixLQUFLLFlBQVksV0FBVyxVQUFVLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFlBQVksZ0JBQWdCLEtBQUssWUFBWSxhQUFhLGtCQUFrQixNQUFNLFlBQVksV0FBVyxVQUFVLGVBQWUsS0FBSyxVQUFVLFlBQVksV0FBVyxpQkFBaUIsTUFBTSxlQUFlLEtBQUssaUJBQWlCLE1BQU0sWUFBWSxXQUFXLFVBQVUsaUJBQWlCLE1BQU0sWUFBWSxnQkFBZ0IsS0FBSyxpQkFBaUIsTUFBTSxVQUFVLFlBQVksZ0JBQWdCLE1BQU0sZ0JBQWdCLE1BQU0sWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGdCQUFnQixLQUFLLFVBQVUsZ0JBQWdCLE1BQU0sWUFBWSxrQkFBa0IsTUFBTSxpQkFBaUIsTUFBTSxZQUFZLGtCQUFrQixNQUFNLGVBQWUsS0FBSyxpQkFBaUIsTUFBTSxpQkFBaUIsTUFBTSxpQkFBaUIsTUFBTSxZQUFZLGdCQUFnQixNQUFNLFlBQVksV0FBVyxrQkFBa0IsTUFBTSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxtQkFBbUIsTUFBTSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsaUJBQWlCLE1BQU0sVUFBVSxZQUFZLFdBQVcsZUFBZSxLQUFLLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxpQkFBaUIsTUFBTSxlQUFlLE1BQU0sWUFBWSxhQUFhLGFBQWEsV0FBVyxpQkFBaUIsTUFBTSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxrQkFBa0IsTUFBTSxZQUFZLGtCQUFrQixNQUFNLGlCQUFpQixNQUFNLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxrQkFBa0IsTUFBTSxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsWUFBWSxtQkFBbUIsTUFBTSxnQkFBZ0IsTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxpQkFBaUIsTUFBTSxpQkFBaUIsTUFBTSxpQkFBaUIsTUFBTSxZQUFZLGFBQWEsYUFBYSxrQkFBa0IsTUFBTSxZQUFZLGtCQUFrQixNQUFNLGlCQUFpQixNQUFNLFlBQVksZ0JBQWdCLE1BQU0saUJBQWlCLE1BQU0sVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLG1CQUFtQixNQUFNLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsaUJBQWlCLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxpQkFBaUIsTUFBTSxpQkFBaUIsTUFBTSxpQkFBaUIsTUFBTSxZQUFZLGFBQWEsYUFBYSxnQkFBZ0IsTUFBTSxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsaUJBQWlCLE1BQU0sWUFBWSxXQUFXLFlBQVksY0FBYyxXQUFXLFVBQVUsZUFBZSxNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxpQkFBaUIsTUFBTSxrQkFBa0IsTUFBTSxZQUFZLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxpQkFBaUIsTUFBTSxZQUFZLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxXQUFXLGlCQUFpQixNQUFNLFVBQVUsWUFBWSxXQUFXLGVBQWUsS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFV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LENBQUMsQ0FBQyxZQUFELENBQWhCO0FBQ0FnQyxZQUFRLENBQUNGLEtBQVQsQ0FBZSxNQUFmO0FBQ0QsR0FIRDtBQUlELENBTE0sQzs7Ozs7Ozs7Ozs7O0FDMUJQLGNBQWMsbUJBQU8sQ0FBQyxvVUFBb0w7O0FBRTFNLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxzR0FBbUQ7O0FBRXhFOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQixvVUFBb0w7QUFDdk0sbUJBQW1CLG1CQUFPLENBQUMsb1VBQW9MOztBQUUvTSxvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMjU5MGZlOWIwYzYyNDA2ZjY3ZGVcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKHRydWUpO1xuLy8gSW1wb3J0c1xudmFyIHVybEVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvdXJsLWVzY2FwZS5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzBfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIm1hdGVyaWFsLWljb25zL2ljb25mb250L01hdGVyaWFsSWNvbnMtUmVndWxhci5lb3RcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fMV9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwibWF0ZXJpYWwtaWNvbnMvaWNvbmZvbnQvTWF0ZXJpYWxJY29ucy1SZWd1bGFyLndvZmYyXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzJfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIm1hdGVyaWFsLWljb25zL2ljb25mb250L01hdGVyaWFsSWNvbnMtUmVndWxhci53b2ZmXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzNfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIm1hdGVyaWFsLWljb25zL2ljb25mb250L01hdGVyaWFsSWNvbnMtUmVndWxhci50dGZcIikpO1xuXG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29uc1xcXCI7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzBfX18gKyBcIik7XFxuICAvKiBGb3IgSUU2LTggKi9cXG4gIHNyYzogbG9jYWwoXFxcIk1hdGVyaWFsIEljb25zXFxcIiksIGxvY2FsKFxcXCJNYXRlcmlhbEljb25zLVJlZ3VsYXJcXFwiKSwgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18xX19fICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18yX19fICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzNfX18gKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpOyB9XFxuXFxuLm1hdGVyaWFsLWljb25zIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnNcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xcbiAgd29yZC13cmFwOiBub3JtYWw7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgZGlyZWN0aW9uOiBsdHI7XFxuICAvKiBTdXBwb3J0IGZvciBhbGwgV2ViS2l0IGJyb3dzZXJzLiAqL1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAvKiBTdXBwb3J0IGZvciBTYWZhcmkgYW5kIENocm9tZS4gKi9cXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuICAvKiBTdXBwb3J0IGZvciBGaXJlZm94LiAqL1xcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gIC8qIFN1cHBvcnQgZm9yIElFLiAqL1xcbiAgLXdlYmtpdC1mb250LWZlYXR1cmUtc2V0dGluZ3M6ICdsaWdhJztcXG4gICAgICAgICAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiAnbGlnYSc7IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTQwMHB4KSB7XFxuICAuY29udGFpbmVyIHtcXG4gICAgbWF4LXdpZHRoOiAxMjgwcHg7IH0gfVxcblxcbi5uYXZiYXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzI3NTA1RCAwJSwgIzAwMzA0MCAxMDAlKTtcXG4gIHBhZGRpbmc6IC4wcmVtIDFyZW07XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMjUpOyB9XFxuICAubmF2YmFyIC5uYXZiYXItYnJhbmQge1xcbiAgICBjb2xvcjogI2ZmZmZmZjtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xcbiAgICBmb250LXdlaWdodDogOTAwO1xcbiAgICBwYWRkaW5nLXJpZ2h0OiA3MHB4OyB9XFxuICAubmF2YmFyIC5uYXYtaXRlbSB7XFxuICAgIHBhZGRpbmc6IDBweDsgfVxcbiAgICAubmF2YmFyIC5uYXYtaXRlbS5hY3RpdmUge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMzUsIDQ2LCAwLjYpOyB9XFxuICAgIC5uYXZiYXIgLm5hdi1pdGVtLmFjdGl2ZSAubmF2LWxpbmsge1xcbiAgICAgIG9wYWNpdHk6IDE7IH1cXG4gICAgLm5hdmJhciAubmF2LWl0ZW0gLm5hdi1saW5rIHtcXG4gICAgICBjb2xvcjogI0ZGRkZGRjtcXG4gICAgICBvcGFjaXR5OiAwLjY7XFxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICAgIHBhZGRpbmc6IDM3cHggMjJweDsgfVxcbiAgICAgIC5uYXZiYXIgLm5hdi1pdGVtIC5uYXYtbGluazpob3ZlciB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDM1LCA0NiwgMC4yKTsgfVxcblxcbi5kcm9wZG93bi10b2dnbGU6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyOyB9XFxuXFxuLmRyb3Bkb3duLXRvZ2dsZTo6YWZ0ZXIge1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7IH1cXG5cXG4uZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbSB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBwYWRkaW5nOiAxMXB4IDYycHggMTFweCAxN3B4O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGNvbG9yOiAjN0ZBM0E4OyB9XFxuICAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbS50YWIge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDQ1cHg7IH1cXG4gIC5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtLmFjdGl2ZSB7XFxuICAgIGNvbG9yOiAjMDAzMDQwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgfVxcbiAgICAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbS5hY3RpdmU6aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XFxuICAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGMkY5RkE7IH1cXG5cXG4udGFibGUgdGQsIC50YWJsZSB0aCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgYm9yZGVyLXRvcDogbm9uZTsgfVxcblxcbi50YWJsZSB0aGVhZCB0aCB7XFxuICBsaW5lLWhlaWdodDogMTBweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBjb2xvcjogIzdGQTNBODtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM3RkEzQTg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xcbiAgcGFkZGluZzogLjU1cmVtO1xcbiAgcGFkZGluZy1sZWZ0OiAxOHB4OyB9XFxuICAudGFibGUgdGhlYWQgdGggLmJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGMkYyRjI7XFxuICAgIGNvbG9yOiAjMDAzMDQwO1xcbiAgICBtYXJnaW4tbGVmdDogMTJweDsgfVxcblxcbi50YWJsZSB0ZCB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0YyRjJGMjtcXG4gIHBhZGRpbmc6IDI0cHggMjJweCAyMHB4IDE4cHg7XFxuICBjb2xvcjogIzAwMzA0MDsgfVxcbiAgLnRhYmxlIHRkIGEge1xcbiAgICBjb2xvcjogIzAwMzA0MDsgfVxcbiAgLnRhYmxlIHRkLmljb25zIGEge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHBhZGRpbmc6IDFweCA2cHggMXB4IDZweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiA0cHg7IH1cXG4gIC50YWJsZSB0ZC5pY29ucyBhOmxhc3QtY2hpbGQge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDBweDsgfVxcbiAgLnRhYmxlIHRkLmRhbmdlci1jZWxsIHtcXG4gICAgY29sb3I6ICNCNTBGMjQ7IH1cXG5cXG4udGFibGUtaG92ZXIgdGJvZHkgdHI6aG92ZXIgdGQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0YyRjlGQTsgfVxcblxcbi5idG4ge1xcbiAgYmFja2dyb3VuZDogI0NFRTBFMztcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcXG4gIHBhZGRpbmc6IDE0cHggNDBweCAxMXB4IDQwcHg7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAuYnRuOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogI2RlZWFlYzsgfVxcbiAgLmJ0bi5idG4taWNvbiB7XFxuICAgIHBhZGRpbmctbGVmdDogNDBweDtcXG4gICAgcGFkZGluZy1yaWdodDogMTRweDsgfVxcbiAgICAuYnRuLmJ0bi1pY29uIGltZyB7XFxuICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIGxlZnQ6IDEycHg7XFxuICAgICAgdG9wOiA1MCU7XFxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7IH1cXG4gICAgLmJ0bi5idG4taWNvbi5idG4taWNvbi1yaWdodCB7XFxuICAgICAgcGFkZGluZy1sZWZ0OiAxNHB4O1xcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDQwcHg7IH1cXG4gICAgICAuYnRuLmJ0bi1pY29uLmJ0bi1pY29uLXJpZ2h0IGltZyB7XFxuICAgICAgICBtYXJnaW4tbGVmdDogOHB4O1xcbiAgICAgICAgcmlnaHQ6IDEycHg7XFxuICAgICAgICBsZWZ0OiBhdXRvO1xcbiAgICAgICAgbGVmdDogaW5pdGlhbDtcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMDsgfVxcbiAgLmJ0bi5idG4tc20ge1xcbiAgICBmb250LXNpemU6IDEycHg7IH1cXG4gIC5idG4uYnRuLXhzIHtcXG4gICAgZm9udC1zaXplOiAxMHB4O1xcbiAgICBwYWRkaW5nOiAzcHggNXB4OyB9XFxuICAgIC5idG4uYnRuLXhzLmJ0bi1pY29uIHtcXG4gICAgICBwYWRkaW5nLWxlZnQ6IDIzcHg7XFxuICAgICAgcGFkZGluZy1yaWdodDogMTBweDsgfVxcbiAgICAgIC5idG4uYnRuLXhzLmJ0bi1pY29uIGltZyB7XFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDRweDtcXG4gICAgICAgIGxlZnQ6IDhweDsgfVxcbiAgICAgIC5idG4uYnRuLXhzLmJ0bi1pY29uLmJ0bi1pY29uLXJpZ2h0IHtcXG4gICAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDIzcHg7IH1cXG4gICAgICAgIC5idG4uYnRuLXhzLmJ0bi1pY29uLmJ0bi1pY29uLXJpZ2h0IGltZyB7XFxuICAgICAgICAgIG1hcmdpbi1sZWZ0OiA0cHg7XFxuICAgICAgICAgIHJpZ2h0OiA4cHg7XFxuICAgICAgICAgIGxlZnQ6IGF1dG87XFxuICAgICAgICAgIGxlZnQ6IGluaXRpYWw7XFxuICAgICAgICAgIG1hcmdpbi1yaWdodDogMDsgfVxcbiAgLmJ0bi5pY29uLXJvdGF0ZS05MCBpbWcsIC5idG4uaWNvbi1yb3RhdGUtMTgwIGltZyB7XFxuICAgIHRyYW5zaXRpb246IC13ZWJraXQtdHJhbnNmb3JtIC41cyBlYXNlLWluLW91dDtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC41cyBlYXNlLWluLW91dDtcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC41cyBlYXNlLWluLW91dCwgLXdlYmtpdC10cmFuc2Zvcm0gLjVzIGVhc2UtaW4tb3V0OyB9XFxuICAuYnRuLmljb24tcm90YXRlLTkwOmhvdmVyIGltZyB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7IH1cXG4gIC5idG4uaWNvbi1yb3RhdGUtMTgwOmhvdmVyIGltZyB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxcbiAgLmJ0bi5idG4tdHJhbnNwYXJlbnQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgfVxcbiAgICAuYnRuLmJ0bi10cmFuc3BhcmVudDpob3ZlciB7XFxuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH1cXG4gIC5idG4uYnRuLXR1cnF1b2lzZSB7XFxuICAgIGJhY2tncm91bmQ6ICM1N0RDRUU7IH1cXG4gICAgLmJ0bi5idG4tdHVycXVvaXNlOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjN2NlNGYyOyB9XFxuICAuYnRuLmJ0bi1ncmVlbiB7XFxuICAgIGJhY2tncm91bmQ6ICM2MkQ3OTI7IH1cXG4gICAgLmJ0bi5idG4tZ3JlZW46aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICM4M2RmYTk7IH1cXG5cXG4uc3RhdHVzIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJhY2tncm91bmQtY29sb3I6ICNBRkM2Qzk7XFxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBtaW4td2lkdGg6IDkwcHg7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICBwYWRkaW5nLXRvcDogNXB4O1xcbiAgcGFkZGluZy1ib3R0b206IDVweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLnN0YXR1cy5zdGF0dXMtY2lyY2xlIHtcXG4gICAgY29sb3I6ICMwMDMwNDA7XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgcGFkZGluZy1sZWZ0OiAyNXB4OyB9XFxuICAgIC5zdGF0dXMuc3RhdHVzLWNpcmNsZTpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgIGhlaWdodDogMThweDtcXG4gICAgICB3aWR0aDogMThweDtcXG4gICAgICBib3JkZXItcmFkaXVzOiA5cHg7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIGxlZnQ6IDBweDtcXG4gICAgICB0b3A6IDJweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQUZDNkM5OyB9XFxuICAgIC5zdGF0dXMuc3RhdHVzLWNpcmNsZSAucHVsc2UtcmluZyB7XFxuICAgICAgY29udGVudDogJyc7XFxuICAgICAgd2lkdGg6IDE4cHg7XFxuICAgICAgaGVpZ2h0OiAxOHB4O1xcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNBRkM2Qzk7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB0b3A6IDJweDtcXG4gICAgICBsZWZ0OiAwcHg7XFxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IHB1bHNhdGUgaW5maW5pdGUgMS44cztcXG4gICAgICAgICAgICAgIGFuaW1hdGlvbjogcHVsc2F0ZSBpbmZpbml0ZSAxLjhzOyB9XFxuICAuc3RhdHVzLnN0YXR1cy1ncmVlbiAucHVsc2UtcmluZyB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMzRjlENjY7IH1cXG4gIC5zdGF0dXMuc3RhdHVzLWdyZWVuLCAuc3RhdHVzLnN0YXR1cy1jaXJjbGUuc3RhdHVzLWdyZWVuOmJlZm9yZSB7XFxuICAgIGJhY2tncm91bmQ6ICMzRjlENjY7IH1cXG4gIC5zdGF0dXMuc3RhdHVzLW9yYW5nZSAucHVsc2UtcmluZyB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNFQjVCMjU7IH1cXG4gIC5zdGF0dXMuc3RhdHVzLW9yYW5nZSwgLnN0YXR1cy5zdGF0dXMtY2lyY2xlLnN0YXR1cy1vcmFuZ2U6YmVmb3JlIHtcXG4gICAgYmFja2dyb3VuZDogI0VCNUIyNTsgfVxcbiAgLnN0YXR1cy5zdGF0dXMtYmx1ZSAucHVsc2UtcmluZyB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMxQTRCNjE7IH1cXG4gIC5zdGF0dXMuc3RhdHVzLWJsdWUsIC5zdGF0dXMuc3RhdHVzLWNpcmNsZS5zdGF0dXMtYmx1ZTpiZWZvcmUge1xcbiAgICBiYWNrZ3JvdW5kOiAjMUE0QjYxOyB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHB1bHNhdGUge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSwgMSk7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS42LCAxLjYpO1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLUJsYWNrICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0xhdG9XZWInO1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1CbGFjay5lb3RcXFwiKTtcXG4gIC8qIElFOSBDb21wYXQgTW9kZXMgKi9cXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQmxhY2suZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQmxhY2sud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUJsYWNrLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQmxhY2sudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLUJvbGQgKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnTGF0b1dlYic7XFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUJvbGQuZW90XFxcIik7XFxuICAvKiBJRTkgQ29tcGF0IE1vZGVzICovXFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUJvbGQuZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQm9sZC53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQm9sZC53b2ZmXFxcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUJvbGQudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLUJvbGRJdGFsaWMgKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnTGF0b1dlYic7XFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUJvbGRJdGFsaWMuZW90XFxcIik7XFxuICAvKiBJRTkgQ29tcGF0IE1vZGVzICovXFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUJvbGRJdGFsaWMuZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQm9sZEl0YWxpYy53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQm9sZEl0YWxpYy53b2ZmXFxcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUJvbGRJdGFsaWMudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLUhlYXZ5ICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0xhdG9XZWInO1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1IZWF2eS5lb3RcXFwiKTtcXG4gIC8qIElFOSBDb21wYXQgTW9kZXMgKi9cXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tSGVhdnkuZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tSGVhdnkud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUhlYXZ5LndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tSGVhdnkudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLUhlYXZ5SXRhbGljICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0xhdG9XZWInO1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1IZWF2eUl0YWxpYy5lb3RcXFwiKTtcXG4gIC8qIElFOSBDb21wYXQgTW9kZXMgKi9cXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tSGVhdnlJdGFsaWMuZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tSGVhdnlJdGFsaWMud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUhlYXZ5SXRhbGljLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tSGVhdnlJdGFsaWMudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLUl0YWxpYyAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdMYXRvV2ViJztcXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tSXRhbGljLmVvdFxcXCIpO1xcbiAgLyogSUU5IENvbXBhdCBNb2RlcyAqL1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1JdGFsaWMuZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tSXRhbGljLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1JdGFsaWMud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1JdGFsaWMudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLUxpZ2h0ICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0xhdG9XZWInO1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1MaWdodC5lb3RcXFwiKTtcXG4gIC8qIElFOSBDb21wYXQgTW9kZXMgKi9cXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tTGlnaHQuZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tTGlnaHQud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUxpZ2h0LndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tTGlnaHQudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLUxpZ2h0SXRhbGljICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0xhdG9XZWInO1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1MaWdodEl0YWxpYy5lb3RcXFwiKTtcXG4gIC8qIElFOSBDb21wYXQgTW9kZXMgKi9cXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tTGlnaHRJdGFsaWMuZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tTGlnaHRJdGFsaWMud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUxpZ2h0SXRhbGljLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tTGlnaHRJdGFsaWMudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLU1lZGl1bSAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdMYXRvV2ViJztcXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tTWVkaXVtLmVvdFxcXCIpO1xcbiAgLyogSUU5IENvbXBhdCBNb2RlcyAqL1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1NZWRpdW0uZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tTWVkaXVtLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1NZWRpdW0ud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1NZWRpdW0udHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLU1lZGl1bUl0YWxpYyAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdMYXRvV2ViJztcXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tTWVkaXVtSXRhbGljLmVvdFxcXCIpO1xcbiAgLyogSUU5IENvbXBhdCBNb2RlcyAqL1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1NZWRpdW1JdGFsaWMuZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tTWVkaXVtSXRhbGljLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1NZWRpdW1JdGFsaWMud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1NZWRpdW1JdGFsaWMudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLVJlZ3VsYXIgKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnTGF0b1dlYic7XFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLVJlZ3VsYXIuZW90XFxcIik7XFxuICAvKiBJRTkgQ29tcGF0IE1vZGVzICovXFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLVJlZ3VsYXIuZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tUmVndWxhci53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tUmVndWxhci53b2ZmXFxcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLVJlZ3VsYXIudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLVNlbWlib2xkICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0xhdG9XZWInO1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1TZW1pYm9sZC5lb3RcXFwiKTtcXG4gIC8qIElFOSBDb21wYXQgTW9kZXMgKi9cXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tU2VtaWJvbGQuZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tU2VtaWJvbGQud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLVNlbWlib2xkLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tU2VtaWJvbGQudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG4vKiBXZWJmb250OiBMYXRvLVNlbWlib2xkSXRhbGljICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0xhdG9XZWInO1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1TZW1pYm9sZEl0YWxpYy5lb3RcXFwiKTtcXG4gIC8qIElFOSBDb21wYXQgTW9kZXMgKi9cXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tU2VtaWJvbGRJdGFsaWMuZW90PyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tU2VtaWJvbGRJdGFsaWMud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLVNlbWlib2xkSXRhbGljLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tU2VtaWJvbGRJdGFsaWMudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7IH1cXG5cXG5odG1sIHtcXG4gIGhlaWdodDogMTAwJTsgfVxcblxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZm9udC1mYW1pbHk6ICdMYXRvV2ViJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgY29sb3I6ICMwMDMwNDA7XFxuICBwYWRkaW5nLXRvcDogOTBweDsgfVxcblxcbmJvZHkud2l0aG91dC1tZW51IHtcXG4gIHBhZGRpbmctdG9wOiAwcHg7IH1cXG5cXG50ZXh0YXJlYTpmb2N1cywgaW5wdXQ6Zm9jdXMsIHNlbGVjdDpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lOyB9XFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBjb2xvcjogIzAwMzA0MDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07IH1cXG5cXG5hLCBhOmhvdmVyIHtcXG4gIGNvbG9yOiAjMDAzMDQwOyB9XFxuXFxubGFiZWwge1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogN3B4OyB9XFxuXFxuOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIC8qIENocm9tZS9PcGVyYS9TYWZhcmkgKi9cXG4gIGNvbG9yOiAjQ0VFMEUzICFpbXBvcnRhbnQ7IH1cXG5cXG46Oi1tb3otcGxhY2Vob2xkZXIge1xcbiAgLyogRmlyZWZveCAxOSsgKi9cXG4gIGNvbG9yOiAjQ0VFMEUzICFpbXBvcnRhbnQ7IH1cXG5cXG46LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcXG4gIC8qIElFIDEwKyAqL1xcbiAgY29sb3I6ICNDRUUwRTMgIWltcG9ydGFudDsgfVxcblxcbjotbW96LXBsYWNlaG9sZGVyIHtcXG4gIC8qIEZpcmVmb3ggMTgtICovXFxuICBjb2xvcjogI0NFRTBFMyAhaW1wb3J0YW50OyB9XFxuXFxuLmN1c3RvbS1jb250cm9sIHtcXG4gIHBhZGRpbmctbGVmdDogMS45cmVtOyB9XFxuXFxuLmN1c3RvbS1jb250cm9sLWxhYmVsIHtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGxpbmUtaGVpZ2h0OiAyMHB4OyB9XFxuXFxuLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUge1xcbiAgYm9yZGVyOiAjQ0VFMEUzIHNvbGlkIDFweDtcXG4gIG1hcmdpbi10b3A6IDBweDsgfVxcblxcbi5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlLFxcbi5jdXN0b20tY29udHJvbC1sYWJlbDo6YWZ0ZXIge1xcbiAgdG9wOiAwcmVtO1xcbiAgd2lkdGg6IDIycHg7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICBsZWZ0OiAtMS45cmVtOyB9XFxuXFxuLmN1c3RvbS1jb250cm9sLWlucHV0OmNoZWNrZWQgfiAuY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XFxuICBib3JkZXItY29sb3I6ICNDRUUwRTM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAzMDQwICFpbXBvcnRhbnQ7IH1cXG5cXG4uZm9ybS1ncm91cCB7XFxuICBtYXJnaW4tYm90dG9tOiAyMnB4OyB9XFxuXFxuc2VsZWN0LmZvcm0tY29udHJvbCB7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG5zZWxlY3QuY3VzdG9tLXNlbGVjdCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi9hc3NldHMvaW1hZ2VzL3NlbGVjdF9iZy5wbmdcXFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCBjZW50ZXI7IH1cXG5cXG4uZm9ybS1jb250cm9sIHtcXG4gIGJhY2tncm91bmQ6ICNGRkZGRkY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjQ0VFMEUzO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIHBhZGRpbmctbGVmdDogMTVweDtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIGhlaWdodDogNDhweDsgfVxcbiAgLmZvcm0tY29udHJvbDpmb2N1cyB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMyNzUwNUQ7IH1cXG5cXG4uaW5uZXItYWRkb24ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuXFxuLmlubmVyLWFkZG9uIGlucHV0IHtcXG4gIHBhZGRpbmctbGVmdDogNDZweDsgfVxcblxcbi5pbm5lci1hZGRvbiBpbWcge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogLTEwcHg7XFxuICBwYWRkaW5nOiAxMHB4IDEycHg7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHRvcDogM3B4O1xcbiAgbGVmdDogMHB4OyB9XFxuXFxuLnRvb2x0aXAtaW5uZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0NFRTBFMztcXG4gIGNvbG9yOiAjMDAzMDQwO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDsgfVxcblxcbi50b29sdGlwLmJzLXRvb2x0aXAtcmlnaHQgLmFycm93OmJlZm9yZSB7XFxuICBib3JkZXItcmlnaHQtY29sb3I6ICNDRUUwRTMgIWltcG9ydGFudDsgfVxcblxcbi50b29sdGlwLmJzLXRvb2x0aXAtbGVmdCAuYXJyb3c6YmVmb3JlIHtcXG4gIGJvcmRlci1sZWZ0LWNvbG9yOiAjQ0VFMEUzICFpbXBvcnRhbnQ7IH1cXG5cXG4udG9vbHRpcC5icy10b29sdGlwLWJvdHRvbSAuYXJyb3c6YmVmb3JlIHtcXG4gIGJvcmRlci1ib3R0b20tY29sb3I6ICNDRUUwRTMgIWltcG9ydGFudDsgfVxcblxcbi50b29sdGlwLmJzLXRvb2x0aXAtdG9wIC5hcnJvdzpiZWZvcmUge1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogI0NFRTBFMyAhaW1wb3J0YW50OyB9XFxuXFxuLm1vZGFsLWNvbnRlbnQge1xcbiAgYm9yZGVyLXJhZGl1czogMDtcXG4gIGJvcmRlcjogbm9uZTsgfVxcbiAgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWhlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGMkY5RkE7XFxuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgICAubW9kYWwtY29udGVudCAubW9kYWwtaGVhZGVyIC5jbG9zZSB7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHJpZ2h0OiAyNXB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMDtcXG4gICAgICB0b3A6IDIxcHg7IH1cXG4gICAgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWhlYWRlciAubW9kYWwtdGl0bGUge1xcbiAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBmb250LXNpemU6IDE4cHg7XFxuICAgICAgbGluZS1oZWlnaHQ6IG5vcm1hbDsgfVxcbiAgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWJvZHkge1xcbiAgICBwYWRkaW5nOiAycmVtOyB9XFxuICAgIC5tb2RhbC1jb250ZW50IC5tb2RhbC1ib2R5IC5jb2wge1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDYwcHg7IH1cXG4gICAgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWJvZHkgLm1vZGFsLWxhYmVsIHtcXG4gICAgICBsaW5lLWhlaWdodDogMjBweDtcXG4gICAgICBmb250LXNpemU6IDE1cHg7XFxuICAgICAgY29sb3I6ICMxQTRCNjE7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDsgfVxcbiAgICAubW9kYWwtY29udGVudCAubW9kYWwtYm9keSAubW9kYWwtZmlsZXMtbmFtZXMgdWwge1xcbiAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgICAgcGFkZGluZzogMDsgfVxcbiAgICAgIC5tb2RhbC1jb250ZW50IC5tb2RhbC1ib2R5IC5tb2RhbC1maWxlcy1uYW1lcyB1bCBsaSB7XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxNXB4OyB9XFxuICAgICAgICAubW9kYWwtY29udGVudCAubW9kYWwtYm9keSAubW9kYWwtZmlsZXMtbmFtZXMgdWwgbGkgaW1nIHtcXG4gICAgICAgICAgbWFyZ2luOiAwIDEwcHg7XFxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgICAgdG9wOiAtMXB4OyB9XFxuICAubW9kYWwtY29udGVudCAubW9kYWwtZm9vdGVyIHtcXG4gICAgcGFkZGluZzogMjBweDsgfVxcblxcbi5kcmFnLWZpZWxkIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjJGOUZBO1xcbiAgY29sb3I6ICM3RkEzQTg7XFxuICBib3JkZXI6IDFweCBkYXNoZWQgI0NFRTBFMztcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIHBhZGRpbmc6IDE3cHggMnB4IDBweCAycHg7XFxuICBoZWlnaHQ6IDQ4cHg7IH1cXG4gIC5kcmFnLWZpZWxkIGEge1xcbiAgICBjb2xvcjogIzU3RENFRTtcXG4gICAgZm9udC1zaXplOiAxMnB4OyB9XFxuXFxuLmhlYWRlciB7XFxuICBwYWRkaW5nLXRvcDogMzBweDtcXG4gIHBhZGRpbmctYm90dG9tOiAzMHB4OyB9XFxuICAuaGVhZGVyLmhlYWRlci1iZyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGMkY5RkE7IH1cXG4gIC5oZWFkZXIgaDEge1xcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDE3cHg7IH1cXG4gIC5oZWFkZXIgLmRyYWctZmllbGQge1xcbiAgICB3aWR0aDogMTAwJTsgfVxcbiAgLmhlYWRlciAuZm9ybS1jb250cm9sIHtcXG4gICAgbWluLXdpZHRoOiAyMjBweDsgfVxcbiAgLmhlYWRlciAuc3RhdHVzLCAuaGVhZGVyIC5pbmZvLWJsb2NrIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAzN3B4OyB9XFxuICAuaGVhZGVyIC5zdGF0dXMge1xcbiAgICBtYXJnaW4tdG9wOiAxM3B4OyB9XFxuICAuaGVhZGVyIC5pbmZvLWJsb2NrIHtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gICAgZm9udC1zaXplOiAxMnB4OyB9XFxuICAgIC5oZWFkZXIgLmluZm8tYmxvY2sgLnRpdGxlIHtcXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICAgIGNvbG9yOiAjN0ZBM0E4O1xcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07IH1cXG5cXG4ucGFnZSB7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAwcHg7XFxuICBwYWRkaW5nLXRvcDogMHB4OyB9XFxuXFxuLnRhYnMtbWVudSB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzdGQTNBODsgfVxcblxcbi50YWJzLW1lbnUgYSB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBwYWRkaW5nOiAxN3B4IDE3cHggMTNweCAxN3B4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxuICBtYXJnaW4tYm90dG9tOiAtMXB4OyB9XFxuXFxuLnRhYnMtbWVudSBhOmhvdmVyLCAudGFicy1tZW51IGEuYWN0aXZlIHtcXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjMjBERUY0O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuXFxuLnRhYnMtbWVudSBhLmZ1cnRoZXIge1xcbiAgY29sb3I6IHJnYmEoMjYsIDc1LCA5NywgMC4zKTsgfVxcblxcbi53YWxrdHJvdWdoIHtcXG4gIGJhY2tncm91bmQ6ICNGREMzMTg7XFxuICBib3gtc2hhZG93OiAwcHggMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgcGFkZGluZzogMzBweCAxN3B4IDEwcHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIGhlaWdodDogMTU0cHg7XFxuICBtYXJnaW4tYm90dG9tOiAzMHB4OyB9XFxuICAud2Fsa3Ryb3VnaCAud2Fsa3Ryb3VnaC1jbG9zZSB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDVweDtcXG4gICAgcmlnaHQ6IDVweDsgfVxcbiAgLndhbGt0cm91Z2ggcCB7XFxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7IH1cXG5cXG4uZml4ZWQtZm9vdGVyIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICBoZWlnaHQ6IDgxcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvdHRvbTogMHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IC00cHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7IH1cXG4gIC5maXhlZC1mb290ZXIgLnBhZ2luYXRpb24ge1xcbiAgICBtYXJnaW4tdG9wOiAwcHg7IH1cXG4gICAgLmZpeGVkLWZvb3RlciAucGFnaW5hdGlvbiAucGFnZS1pdGVtLmFjdGl2ZSAucGFnZS1saW5rLCAuZml4ZWQtZm9vdGVyIC5wYWdpbmF0aW9uIC5wYWdlLWl0ZW0uYWN0aXZlIC5wYWdlLWxpbms6aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGMkY5RkE7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjRjJGOUZBO1xcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgICBjdXJzb3I6IGF1dG87XFxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDsgfVxcbiAgICAuZml4ZWQtZm9vdGVyIC5wYWdpbmF0aW9uIC5wYWdlLWl0ZW0gLnBhZ2UtbGluayB7XFxuICAgICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICBjb2xvcjogIzNGMzM1NjtcXG4gICAgICBoZWlnaHQ6IDgwcHg7XFxuICAgICAgcGFkZGluZy10b3A6IDMycHg7XFxuICAgICAgcGFkZGluZy1sZWZ0OiAxN3B4O1xcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDE3cHg7IH1cXG4gICAgICAuZml4ZWQtZm9vdGVyIC5wYWdpbmF0aW9uIC5wYWdlLWl0ZW0gLnBhZ2UtbGluazpob3ZlciB7XFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XFxuICAuZml4ZWQtZm9vdGVyIC5idG4sIC5maXhlZC1mb290ZXIgLmVudHJpZXMge1xcbiAgICBtYXJnaW4tdG9wOiAxN3B4OyB9XFxuICAuZml4ZWQtZm9vdGVyIC5lbnRyaWVzIHtcXG4gICAgbWF4LXdpZHRoOiAyMTBweDtcXG4gICAgY29sb3I6ICM3RkEzQTg7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcXG4gICAgZm9udC13ZWlnaHQ6IDcwMDsgfVxcbiAgICAuZml4ZWQtZm9vdGVyIC5lbnRyaWVzIHNwYW4ge1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcbiAgICAuZml4ZWQtZm9vdGVyIC5lbnRyaWVzIHNlbGVjdCB7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHdpZHRoOiA4MHB4O1xcbiAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgICAgIG1hcmdpbi1yaWdodDogMTBweDsgfVxcblxcbi5ncmV5IHtcXG4gIGNvbG9yOiAjQ0VFMEUzOyB9XFxuXFxuI2xvZ2luLXBhZ2Uge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIvYXNzZXRzL2ltYWdlcy9sb2dpbl9iZy5qcGdcXFwiKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAjbG9naW4tcGFnZSBoMSB7XFxuICAgIG1hcmdpbi1ib3R0b206IDM0cHg7IH1cXG4gICNsb2dpbi1wYWdlIC5jb250YWluZXIge1xcbiAgICBtYXJnaW4tdG9wOiAtODBweDsgfVxcbiAgI2xvZ2luLXBhZ2UgLmxvZ2luLWJsb2NrIHtcXG4gICAgYmFja2dyb3VuZDogI0ZGRkZGRjtcXG4gICAgbWF4LXdpZHRoOiA0NTBweDtcXG4gICAgcGFkZGluZzogNDJweCA0OHB4IDU1cHggNDhweDtcXG4gICAgbWFyZ2luLXRvcDogODBweDsgfVxcbiAgICAjbG9naW4tcGFnZSAubG9naW4tYmxvY2sgLmxvZ2luLWZvb3RlciB7XFxuICAgICAgbWFyZ2luLXRvcDogMzVweDtcXG4gICAgICBtaW4taGVpZ2h0OiA0NXB4OyB9XFxuICAgICAgI2xvZ2luLXBhZ2UgLmxvZ2luLWJsb2NrIC5sb2dpbi1mb290ZXIgLmN1c3RvbS1jaGVja2JveCB7XFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4OyB9XFxuICAgICAgI2xvZ2luLXBhZ2UgLmxvZ2luLWJsb2NrIC5sb2dpbi1mb290ZXIgYSB7XFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDsgfVxcbiAgI2xvZ2luLXBhZ2UgLmxvZ2luLWluZm8ge1xcbiAgICBtYXgtd2lkdGg6IDM4MHB4OyB9XFxuICAgICNsb2dpbi1wYWdlIC5sb2dpbi1pbmZvIC5sb2dpbi10ZXh0IHtcXG4gICAgICBjb2xvcjogI2ZmZmZmZjtcXG4gICAgICBmb250LXNpemU6IDE2cHg7XFxuICAgICAgbWFyZ2luLXRvcDogNDBweDtcXG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDQwcHg7XFxuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTsgfVxcblxcbi5maWxlLWV4dGVudGlvbiB7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XFxuICBmb250LXNpemU6IDlweDtcXG4gIGJhY2tncm91bmQ6ICM3RkEzQTg7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBwYWRkaW5nOiAycHggNHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxuICBjb2xvcjogI0ZGRjsgfVxcblxcbi5maWxlLWxhbmcge1xcbiAgYmFja2dyb3VuZDogI0NFRTBFMztcXG4gIGJvcmRlci1yYWRpdXM6IDE0cHg7XFxuICBsaW5lLWhlaWdodDogMjBweDtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBwYWRkaW5nOiA1cHggMjBweCA1cHggMThweDtcXG4gIGNvbG9yOiAjMDAzMDQwOyB9XFxuXFxuLmNvbm5lY3RvcnMtY29udGFpbmVyIHtcXG4gIG1hcmdpbjogMCAxNXB4IDQwcHg7IH1cXG4gIC5jb25uZWN0b3JzLWNvbnRhaW5lciA+IC5yb3cge1xcbiAgICBvdmVyZmxvdy14OiBhdXRvOyB9XFxuICAuY29ubmVjdG9ycy1jb250YWluZXIgLmNvbm5lY3Rvci1ib3gge1xcbiAgICBwYWRkaW5nOiAxNXB4IDEwcHggMTBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgICAuY29ubmVjdG9ycy1jb250YWluZXIgLmNvbm5lY3Rvci1ib3guYWN0aXZlLCAuY29ubmVjdG9ycy1jb250YWluZXIgLmNvbm5lY3Rvci1ib3g6aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICNGMkY5RkE7IH1cXG4gICAgLmNvbm5lY3RvcnMtY29udGFpbmVyIC5jb25uZWN0b3ItYm94IC5jb25uZWN0b3ItaWNvbiB7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogNnB4O1xcbiAgICAgIGhlaWdodDogNzBweDtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gICAgICAuY29ubmVjdG9ycy1jb250YWluZXIgLmNvbm5lY3Rvci1ib3ggLmNvbm5lY3Rvci1pY29uIGltZyB7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IDUwJTtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICBsZWZ0OiAwO1xcbiAgICAgICAgcmlnaHQ6IDA7XFxuICAgICAgICBtYXJnaW46IGF1dG87IH1cXG4gICAgLmNvbm5lY3RvcnMtY29udGFpbmVyIC5jb25uZWN0b3ItYm94IC5jb25uZWN0b3ItbmFtZSB7XFxuICAgICAgZm9udC1zaXplOiAxMXB4O1xcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cXG5cXG4uZmlsZXMtY29udGFpbmVyIHtcXG4gIG1heC13aWR0aDogNzAwcHg7IH1cXG4gIC5maWxlcy1jb250YWluZXIgLmZpbGVzLWNvbC1maXJzdCB7XFxuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNGMkYyRjI7IH1cXG5cXG4uY29sLWJveCB7XFxuICBtYXJnaW4tbGVmdDogMTVweDtcXG4gIG1hcmdpbi10b3A6IDIwcHg7IH1cXG4gIC5jb2wtYm94IC5jb2wtaGVhZCB7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgY29sb3I6ICM3RkEzQTg7XFxuICAgIG1hcmdpbi1ib3R0b206IDI1cHg7IH1cXG4gIC5jb2wtYm94IC5zZWxlY3RlZC1maWxlcyB1bCB7XFxuICAgIHBhZGRpbmc6IDJweCAwICAwO1xcbiAgICBsaXN0LXN0eWxlOiBub25lOyB9XFxuICAgIC5jb2wtYm94IC5zZWxlY3RlZC1maWxlcyB1bCBsaSB7XFxuICAgICAgd2lkdGg6IDIzNXB4O1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICBwYWRkaW5nOiAwIDM1cHg7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMThweDsgfVxcbiAgICAgIC5jb2wtYm94IC5zZWxlY3RlZC1maWxlcyB1bCBsaSAuZmlsZS1pY29uIHtcXG4gICAgICAgIG1heC13aWR0aDogMThweDtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHRvcDogLTFweDtcXG4gICAgICAgIGxlZnQ6IDA7IH1cXG4gICAgICAuY29sLWJveCAuc2VsZWN0ZWQtZmlsZXMgdWwgbGkgLnJlbW92ZS1pY29uIHtcXG4gICAgICAgIHdpZHRoOiAxOHB4O1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgdG9wOiAwcHg7XFxuICAgICAgICByaWdodDogMDtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgLmNvbC1ib3ggLmRyYWctZmllbGQge1xcbiAgICBwYWRkaW5nLXRvcDogMTMwcHg7XFxuICAgIHBhZGRpbmctYm90dG9tOiAxNDBweDsgfVxcblxcbi5qc3RyZWUgLmpzdHJlZS13aG9sZXJvdy1ob3ZlcmVkLCAuanN0cmVlIC5qc3RyZWUtd2hvbGVyb3ctY2xpY2tlZCB7XFxuICBiYWNrZ3JvdW5kOiBub25lOyB9XFxuXFxuLmpzdHJlZSAuanN0cmVlLW9wZW4gPiAuanN0cmVlLWNoaWxkcmVuIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7IH1cXG4gIC5qc3RyZWUgLmpzdHJlZS1vcGVuID4gLmpzdHJlZS1jaGlsZHJlbiAuanN0cmVlLW5vZGUge1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4OyB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJz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RTtJQUN2QjtNQUNFLGtCQUFrQjtNQUNsQixZQUFZO01BQ1osa0JBQWtCLEVBQUU7TUFDcEI7UUFDRSxrQkFBa0I7UUFDbEIsUUFBUTtRQUNSLG1DQUEyQjtnQkFBM0IsMkJBQTJCO1FBQzNCLE9BQU87UUFDUCxRQUFRO1FBQ1IsWUFBWSxFQUFFO0lBQ2xCO01BQ0UsZUFBZTtNQUNmLHlCQUF5QjtNQUN6QixpQkFBaUIsRUFBRTs7QUFFekI7RUFDRSxnQkFBZ0IsRUFBRTtFQUNsQjtJQUNFLCtCQUErQixFQUFFOztBQUVyQztFQUNFLGlCQUFpQjtFQUNqQixnQkFBZ0IsRUFBRTtFQUNsQjtJQUNFLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLHlCQUF5QjtJQUN6QixjQUFjO0lBQ2QsbUJBQW1CLEVBQUU7RUFDdkI7SUFDRSxpQkFBaUI7SUFDakIsZ0JBQWdCLEVBQUU7SUFDbEI7TUFDRSxZQUFZO01BQ1osa0JBQWtCO01BQ2xCLGVBQWU7TUFDZixtQkFBbUIsRUFBRTtNQUNyQjtRQUNFLGVBQWU7UUFDZixrQkFBa0I7UUFDbEIsU0FBUztRQUNULE9BQU8sRUFBRTtNQUNYO1FBQ0UsV0FBVztRQUNYLGtCQUFrQjtRQUNsQixRQUFRO1FBQ1IsUUFBUTtRQUNSLGVBQWUsRUFBRTtFQUN2QjtJQUNFLGtCQUFrQjtJQUNsQixxQkFBcUIsRUFBRTs7QUFFM0I7RUFDRSxnQkFBZ0IsRUFBRTs7QUFFcEI7RUFDRSxnQkFBZ0IsRUFBRTtFQUNsQjtJQUNFLGdCQUFnQixFQUFFXCIsXCJmaWxlXCI6XCJzdHlsZS5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29uc1xcXCI7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgc3JjOiB1cmwoXFxcIn5tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIuZW90XFxcIik7XFxuICAvKiBGb3IgSUU2LTggKi9cXG4gIHNyYzogbG9jYWwoXFxcIk1hdGVyaWFsIEljb25zXFxcIiksIGxvY2FsKFxcXCJNYXRlcmlhbEljb25zLVJlZ3VsYXJcXFwiKSwgdXJsKFxcXCJ+bWF0ZXJpYWwtaWNvbnMvaWNvbmZvbnQvTWF0ZXJpYWxJY29ucy1SZWd1bGFyLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXFxcIn5tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXFxcIn5tYXRlcmlhbC1pY29ucy9pY29uZm9udC9NYXRlcmlhbEljb25zLVJlZ3VsYXIudHRmXFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpOyB9XFxuXFxuLm1hdGVyaWFsLWljb25zIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTWF0ZXJpYWwgSWNvbnNcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGxpbmUtaGVpZ2h0OiAxO1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xcbiAgd29yZC13cmFwOiBub3JtYWw7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgZGlyZWN0aW9uOiBsdHI7XFxuICAvKiBTdXBwb3J0IGZvciBhbGwgV2ViS2l0IGJyb3dzZXJzLiAqL1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAvKiBTdXBwb3J0IGZvciBTYWZhcmkgYW5kIENocm9tZS4gKi9cXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuICAvKiBTdXBwb3J0IGZvciBGaXJlZm94LiAqL1xcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gIC8qIFN1cHBvcnQgZm9yIElFLiAqL1xcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiAnbGlnYSc7IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTQwMHB4KSB7XFxuICAuY29udGFpbmVyIHtcXG4gICAgbWF4LXdpZHRoOiAxMjgwcHg7IH0gfVxcblxcbi5uYXZiYXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzI3NTA1RCAwJSwgIzAwMzA0MCAxMDAlKTtcXG4gIHBhZGRpbmc6IC4wcmVtIDFyZW07XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMjUpOyB9XFxuICAubmF2YmFyIC5uYXZiYXItYnJhbmQge1xcbiAgICBjb2xvcjogI2ZmZmZmZjtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xcbiAgICBmb250LXdlaWdodDogOTAwO1xcbiAgICBwYWRkaW5nLXJpZ2h0OiA3MHB4OyB9XFxuICAubmF2YmFyIC5uYXYtaXRlbSB7XFxuICAgIHBhZGRpbmc6IDBweDsgfVxcbiAgICAubmF2YmFyIC5uYXYtaXRlbS5hY3RpdmUge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMzUsIDQ2LCAwLjYpOyB9XFxuICAgIC5uYXZiYXIgLm5hdi1pdGVtLmFjdGl2ZSAubmF2LWxpbmsge1xcbiAgICAgIG9wYWNpdHk6IDE7IH1cXG4gICAgLm5hdmJhciAubmF2LWl0ZW0gLm5hdi1saW5rIHtcXG4gICAgICBjb2xvcjogI0ZGRkZGRjtcXG4gICAgICBvcGFjaXR5OiAwLjY7XFxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gICAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICAgIHBhZGRpbmc6IDM3cHggMjJweDsgfVxcbiAgICAgIC5uYXZiYXIgLm5hdi1pdGVtIC5uYXYtbGluazpob3ZlciB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDM1LCA0NiwgMC4yKTsgfVxcblxcbi5kcm9wZG93bi10b2dnbGU6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyOyB9XFxuXFxuLmRyb3Bkb3duLXRvZ2dsZTo6YWZ0ZXIge1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7IH1cXG5cXG4uZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbSB7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBwYWRkaW5nOiAxMXB4IDYycHggMTFweCAxN3B4O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGNvbG9yOiAjN0ZBM0E4OyB9XFxuICAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbS50YWIge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDQ1cHg7IH1cXG4gIC5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtLmFjdGl2ZSB7XFxuICAgIGNvbG9yOiAjMDAzMDQwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgfVxcbiAgICAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbS5hY3RpdmU6aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XFxuICAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGMkY5RkE7IH1cXG5cXG4udGFibGUgdGQsIC50YWJsZSB0aCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgYm9yZGVyLXRvcDogbm9uZTsgfVxcblxcbi50YWJsZSB0aGVhZCB0aCB7XFxuICBsaW5lLWhlaWdodDogMTBweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBjb2xvcjogIzdGQTNBODtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM3RkEzQTg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xcbiAgcGFkZGluZzogLjU1cmVtO1xcbiAgcGFkZGluZy1sZWZ0OiAxOHB4OyB9XFxuICAudGFibGUgdGhlYWQgdGggLmJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGMkYyRjI7XFxuICAgIGNvbG9yOiAjMDAzMDQwO1xcbiAgICBtYXJnaW4tbGVmdDogMTJweDsgfVxcblxcbi50YWJsZSB0ZCB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0YyRjJGMjtcXG4gIHBhZGRpbmc6IDI0cHggMjJweCAyMHB4IDE4cHg7XFxuICBjb2xvcjogIzAwMzA0MDsgfVxcbiAgLnRhYmxlIHRkIGEge1xcbiAgICBjb2xvcjogIzAwMzA0MDsgfVxcbiAgLnRhYmxlIHRkLmljb25zIGEge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHBhZGRpbmc6IDFweCA2cHggMXB4IDZweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiA0cHg7IH1cXG4gIC50YWJsZSB0ZC5pY29ucyBhOmxhc3QtY2hpbGQge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDBweDsgfVxcbiAgLnRhYmxlIHRkLmRhbmdlci1jZWxsIHtcXG4gICAgY29sb3I6ICNCNTBGMjQ7IH1cXG5cXG4udGFibGUtaG92ZXIgdGJvZHkgdHI6aG92ZXIgdGQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0YyRjlGQTsgfVxcblxcbi5idG4ge1xcbiAgYmFja2dyb3VuZDogI0NFRTBFMztcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcXG4gIHBhZGRpbmc6IDE0cHggNDBweCAxMXB4IDQwcHg7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwOyB9XFxuICAuYnRuOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogI2RlZWFlYzsgfVxcbiAgLmJ0bi5idG4taWNvbiB7XFxuICAgIHBhZGRpbmctbGVmdDogNDBweDtcXG4gICAgcGFkZGluZy1yaWdodDogMTRweDsgfVxcbiAgICAuYnRuLmJ0bi1pY29uIGltZyB7XFxuICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIGxlZnQ6IDEycHg7XFxuICAgICAgdG9wOiA1MCU7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpOyB9XFxuICAgIC5idG4uYnRuLWljb24uYnRuLWljb24tcmlnaHQge1xcbiAgICAgIHBhZGRpbmctbGVmdDogMTRweDtcXG4gICAgICBwYWRkaW5nLXJpZ2h0OiA0MHB4OyB9XFxuICAgICAgLmJ0bi5idG4taWNvbi5idG4taWNvbi1yaWdodCBpbWcge1xcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDhweDtcXG4gICAgICAgIHJpZ2h0OiAxMnB4O1xcbiAgICAgICAgbGVmdDogaW5pdGlhbDtcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMDsgfVxcbiAgLmJ0bi5idG4tc20ge1xcbiAgICBmb250LXNpemU6IDEycHg7IH1cXG4gIC5idG4uYnRuLXhzIHtcXG4gICAgZm9udC1zaXplOiAxMHB4O1xcbiAgICBwYWRkaW5nOiAzcHggNXB4OyB9XFxuICAgIC5idG4uYnRuLXhzLmJ0bi1pY29uIHtcXG4gICAgICBwYWRkaW5nLWxlZnQ6IDIzcHg7XFxuICAgICAgcGFkZGluZy1yaWdodDogMTBweDsgfVxcbiAgICAgIC5idG4uYnRuLXhzLmJ0bi1pY29uIGltZyB7XFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDRweDtcXG4gICAgICAgIGxlZnQ6IDhweDsgfVxcbiAgICAgIC5idG4uYnRuLXhzLmJ0bi1pY29uLmJ0bi1pY29uLXJpZ2h0IHtcXG4gICAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDIzcHg7IH1cXG4gICAgICAgIC5idG4uYnRuLXhzLmJ0bi1pY29uLmJ0bi1pY29uLXJpZ2h0IGltZyB7XFxuICAgICAgICAgIG1hcmdpbi1sZWZ0OiA0cHg7XFxuICAgICAgICAgIHJpZ2h0OiA4cHg7XFxuICAgICAgICAgIGxlZnQ6IGluaXRpYWw7XFxuICAgICAgICAgIG1hcmdpbi1yaWdodDogMDsgfVxcbiAgLmJ0bi5pY29uLXJvdGF0ZS05MCBpbWcsIC5idG4uaWNvbi1yb3RhdGUtMTgwIGltZyB7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogLXdlYmtpdC10cmFuc2Zvcm0gLjVzIGVhc2UtaW4tb3V0O1xcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjVzIGVhc2UtaW4tb3V0OyB9XFxuICAuYnRuLmljb24tcm90YXRlLTkwOmhvdmVyIGltZyB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7IH1cXG4gIC5idG4uaWNvbi1yb3RhdGUtMTgwOmhvdmVyIGltZyB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxcbiAgLmJ0bi5idG4tdHJhbnNwYXJlbnQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgfVxcbiAgICAuYnRuLmJ0bi10cmFuc3BhcmVudDpob3ZlciB7XFxuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH1cXG4gIC5idG4uYnRuLXR1cnF1b2lzZSB7XFxuICAgIGJhY2tncm91bmQ6ICM1N0RDRUU7IH1cXG4gICAgLmJ0bi5idG4tdHVycXVvaXNlOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjN2NlNGYyOyB9XFxuICAuYnRuLmJ0bi1ncmVlbiB7XFxuICAgIGJhY2tncm91bmQ6ICM2MkQ3OTI7IH1cXG4gICAgLmJ0bi5idG4tZ3JlZW46aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICM4M2RmYTk7IH1cXG5cXG4uc3RhdHVzIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJhY2tncm91bmQtY29sb3I6ICNBRkM2Qzk7XFxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBtaW4td2lkdGg6IDkwcHg7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICBwYWRkaW5nLXRvcDogNXB4O1xcbiAgcGFkZGluZy1ib3R0b206IDVweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLnN0YXR1cy5zdGF0dXMtY2lyY2xlIHtcXG4gICAgY29sb3I6ICMwMDMwNDA7XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgcGFkZGluZy1sZWZ0OiAyNXB4OyB9XFxuICAgIC5zdGF0dXMuc3RhdHVzLWNpcmNsZTpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgIGhlaWdodDogMThweDtcXG4gICAgICB3aWR0aDogMThweDtcXG4gICAgICBib3JkZXItcmFkaXVzOiA5cHg7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIGxlZnQ6IDBweDtcXG4gICAgICB0b3A6IDJweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjQUZDNkM5OyB9XFxuICAgIC5zdGF0dXMuc3RhdHVzLWNpcmNsZSAucHVsc2UtcmluZyB7XFxuICAgICAgY29udGVudDogJyc7XFxuICAgICAgd2lkdGg6IDE4cHg7XFxuICAgICAgaGVpZ2h0OiAxOHB4O1xcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNBRkM2Qzk7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB0b3A6IDJweDtcXG4gICAgICBsZWZ0OiAwcHg7XFxuICAgICAgYW5pbWF0aW9uOiBwdWxzYXRlIGluZmluaXRlIDEuOHM7IH1cXG4gIC5zdGF0dXMuc3RhdHVzLWdyZWVuIC5wdWxzZS1yaW5nIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzNGOUQ2NjsgfVxcbiAgLnN0YXR1cy5zdGF0dXMtZ3JlZW4sIC5zdGF0dXMuc3RhdHVzLWNpcmNsZS5zdGF0dXMtZ3JlZW46YmVmb3JlIHtcXG4gICAgYmFja2dyb3VuZDogIzNGOUQ2NjsgfVxcbiAgLnN0YXR1cy5zdGF0dXMtb3JhbmdlIC5wdWxzZS1yaW5nIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI0VCNUIyNTsgfVxcbiAgLnN0YXR1cy5zdGF0dXMtb3JhbmdlLCAuc3RhdHVzLnN0YXR1cy1jaXJjbGUuc3RhdHVzLW9yYW5nZTpiZWZvcmUge1xcbiAgICBiYWNrZ3JvdW5kOiAjRUI1QjI1OyB9XFxuICAuc3RhdHVzLnN0YXR1cy1ibHVlIC5wdWxzZS1yaW5nIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzFBNEI2MTsgfVxcbiAgLnN0YXR1cy5zdGF0dXMtYmx1ZSwgLnN0YXR1cy5zdGF0dXMtY2lyY2xlLnN0YXR1cy1ibHVlOmJlZm9yZSB7XFxuICAgIGJhY2tncm91bmQ6ICMxQTRCNjE7IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgcHVsc2F0ZSB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjYsIDEuNik7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tQmxhY2sgKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnTGF0b1dlYic7XFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUJsYWNrLmVvdFxcXCIpO1xcbiAgLyogSUU5IENvbXBhdCBNb2RlcyAqL1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1CbGFjay5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1CbGFjay53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQmxhY2sud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1CbGFjay50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tQm9sZCAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdMYXRvV2ViJztcXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQm9sZC5lb3RcXFwiKTtcXG4gIC8qIElFOSBDb21wYXQgTW9kZXMgKi9cXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQm9sZC5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1Cb2xkLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1Cb2xkLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQm9sZC50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tQm9sZEl0YWxpYyAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdMYXRvV2ViJztcXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQm9sZEl0YWxpYy5lb3RcXFwiKTtcXG4gIC8qIElFOSBDb21wYXQgTW9kZXMgKi9cXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQm9sZEl0YWxpYy5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1Cb2xkSXRhbGljLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1Cb2xkSXRhbGljLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tQm9sZEl0YWxpYy50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tSGVhdnkgKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnTGF0b1dlYic7XFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUhlYXZ5LmVvdFxcXCIpO1xcbiAgLyogSUU5IENvbXBhdCBNb2RlcyAqL1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1IZWF2eS5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1IZWF2eS53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tSGVhdnkud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1IZWF2eS50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogODAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tSGVhdnlJdGFsaWMgKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnTGF0b1dlYic7XFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUhlYXZ5SXRhbGljLmVvdFxcXCIpO1xcbiAgLyogSUU5IENvbXBhdCBNb2RlcyAqL1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1IZWF2eUl0YWxpYy5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1IZWF2eUl0YWxpYy53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tSGVhdnlJdGFsaWMud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1IZWF2eUl0YWxpYy50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXdlaWdodDogODAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tSXRhbGljICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0xhdG9XZWInO1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1JdGFsaWMuZW90XFxcIik7XFxuICAvKiBJRTkgQ29tcGF0IE1vZGVzICovXFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUl0YWxpYy5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1JdGFsaWMud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUl0YWxpYy53b2ZmXFxcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUl0YWxpYy50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tTGlnaHQgKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnTGF0b1dlYic7XFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUxpZ2h0LmVvdFxcXCIpO1xcbiAgLyogSUU5IENvbXBhdCBNb2RlcyAqL1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1MaWdodC5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1MaWdodC53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tTGlnaHQud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1MaWdodC50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tTGlnaHRJdGFsaWMgKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnTGF0b1dlYic7XFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLUxpZ2h0SXRhbGljLmVvdFxcXCIpO1xcbiAgLyogSUU5IENvbXBhdCBNb2RlcyAqL1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1MaWdodEl0YWxpYy5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1MaWdodEl0YWxpYy53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tTGlnaHRJdGFsaWMud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1MaWdodEl0YWxpYy50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXdlaWdodDogMzAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tTWVkaXVtICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0xhdG9XZWInO1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1NZWRpdW0uZW90XFxcIik7XFxuICAvKiBJRTkgQ29tcGF0IE1vZGVzICovXFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLU1lZGl1bS5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1NZWRpdW0ud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLU1lZGl1bS53b2ZmXFxcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLU1lZGl1bS50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tTWVkaXVtSXRhbGljICovXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0xhdG9XZWInO1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1NZWRpdW1JdGFsaWMuZW90XFxcIik7XFxuICAvKiBJRTkgQ29tcGF0IE1vZGVzICovXFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLU1lZGl1bUl0YWxpYy5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1NZWRpdW1JdGFsaWMud29mZjJcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLU1lZGl1bUl0YWxpYy53b2ZmXFxcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksIHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLU1lZGl1bUl0YWxpYy50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tUmVndWxhciAqL1xcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdMYXRvV2ViJztcXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tUmVndWxhci5lb3RcXFwiKTtcXG4gIC8qIElFOSBDb21wYXQgTW9kZXMgKi9cXG4gIHNyYzogdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tUmVndWxhci5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1SZWd1bGFyLndvZmYyXFxcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1SZWd1bGFyLndvZmZcXFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tUmVndWxhci50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tU2VtaWJvbGQgKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnTGF0b1dlYic7XFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLVNlbWlib2xkLmVvdFxcXCIpO1xcbiAgLyogSUU5IENvbXBhdCBNb2RlcyAqL1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1TZW1pYm9sZC5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1TZW1pYm9sZC53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tU2VtaWJvbGQud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1TZW1pYm9sZC50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbi8qIFdlYmZvbnQ6IExhdG8tU2VtaWJvbGRJdGFsaWMgKi9cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAnTGF0b1dlYic7XFxuICBzcmM6IHVybChcXFwiL2Fzc2V0cy9mb250cy9MYXRvLVNlbWlib2xkSXRhbGljLmVvdFxcXCIpO1xcbiAgLyogSUU5IENvbXBhdCBNb2RlcyAqL1xcbiAgc3JjOiB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1TZW1pYm9sZEl0YWxpYy5lb3Q/I2llZml4XFxcIikgZm9ybWF0KFxcXCJlbWJlZGRlZC1vcGVudHlwZVxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1TZW1pYm9sZEl0YWxpYy53b2ZmMlxcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSwgdXJsKFxcXCIvYXNzZXRzL2ZvbnRzL0xhdG8tU2VtaWJvbGRJdGFsaWMud29mZlxcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLCB1cmwoXFxcIi9hc3NldHMvZm9udHMvTGF0by1TZW1pYm9sZEl0YWxpYy50dGZcXFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTsgfVxcblxcbmh0bWwge1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBmb250LWZhbWlseTogJ0xhdG9XZWInO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBjb2xvcjogIzAwMzA0MDtcXG4gIHBhZGRpbmctdG9wOiA5MHB4OyB9XFxuXFxuYm9keS53aXRob3V0LW1lbnUge1xcbiAgcGFkZGluZy10b3A6IDBweDsgfVxcblxcbnRleHRhcmVhOmZvY3VzLCBpbnB1dDpmb2N1cywgc2VsZWN0OmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7IH1cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBmb250LXdlaWdodDogOTAwO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGNvbG9yOiAjMDAzMDQwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTsgfVxcblxcbmEsIGE6aG92ZXIge1xcbiAgY29sb3I6ICMwMDMwNDA7IH1cXG5cXG5sYWJlbCB7XFxuICBmb250LXNpemU6IDE1cHg7XFxuICBtYXJnaW4tYm90dG9tOiA3cHg7IH1cXG5cXG46Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgLyogQ2hyb21lL09wZXJhL1NhZmFyaSAqL1xcbiAgY29sb3I6ICNDRUUwRTMgIWltcG9ydGFudDsgfVxcblxcbjo6LW1vei1wbGFjZWhvbGRlciB7XFxuICAvKiBGaXJlZm94IDE5KyAqL1xcbiAgY29sb3I6ICNDRUUwRTMgIWltcG9ydGFudDsgfVxcblxcbjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgLyogSUUgMTArICovXFxuICBjb2xvcjogI0NFRTBFMyAhaW1wb3J0YW50OyB9XFxuXFxuOi1tb3otcGxhY2Vob2xkZXIge1xcbiAgLyogRmlyZWZveCAxOC0gKi9cXG4gIGNvbG9yOiAjQ0VFMEUzICFpbXBvcnRhbnQ7IH1cXG5cXG4uY3VzdG9tLWNvbnRyb2wge1xcbiAgcGFkZGluZy1sZWZ0OiAxLjlyZW07IH1cXG5cXG4uY3VzdG9tLWNvbnRyb2wtbGFiZWwge1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgbGluZS1oZWlnaHQ6IDIwcHg7IH1cXG5cXG4uY3VzdG9tLWNvbnRyb2wtbGFiZWw6OmJlZm9yZSB7XFxuICBib3JkZXI6ICNDRUUwRTMgc29saWQgMXB4O1xcbiAgbWFyZ2luLXRvcDogMHB4OyB9XFxuXFxuLmN1c3RvbS1jb250cm9sLWxhYmVsOjpiZWZvcmUsXFxuLmN1c3RvbS1jb250cm9sLWxhYmVsOjphZnRlciB7XFxuICB0b3A6IDByZW07XFxuICB3aWR0aDogMjJweDtcXG4gIGhlaWdodDogMjBweDtcXG4gIGxlZnQ6IC0xLjlyZW07IH1cXG5cXG4uY3VzdG9tLWNvbnRyb2wtaW5wdXQ6Y2hlY2tlZCB+IC5jdXN0b20tY29udHJvbC1sYWJlbDo6YmVmb3JlIHtcXG4gIGJvcmRlci1jb2xvcjogI0NFRTBFMztcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDMwNDAgIWltcG9ydGFudDsgfVxcblxcbi5mb3JtLWdyb3VwIHtcXG4gIG1hcmdpbi1ib3R0b206IDIycHg7IH1cXG5cXG5zZWxlY3QuZm9ybS1jb250cm9sIHtcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbnNlbGVjdC5jdXN0b20tc2VsZWN0IHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcXFwiL2Fzc2V0cy9pbWFnZXMvc2VsZWN0X2JnLnBuZ1xcXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IGNlbnRlcjsgfVxcblxcbi5mb3JtLWNvbnRyb2wge1xcbiAgYmFja2dyb3VuZDogI0ZGRkZGRjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNDRUUwRTM7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgaGVpZ2h0OiA0OHB4OyB9XFxuICAuZm9ybS1jb250cm9sOmZvY3VzIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzI3NTA1RDsgfVxcblxcbi5pbm5lci1hZGRvbiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4uaW5uZXItYWRkb24gaW5wdXQge1xcbiAgcGFkZGluZy1sZWZ0OiA0NnB4OyB9XFxuXFxuLmlubmVyLWFkZG9uIGltZyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAtMTBweDtcXG4gIHBhZGRpbmc6IDEwcHggMTJweDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdG9wOiAzcHg7XFxuICBsZWZ0OiAwcHg7IH1cXG5cXG4udG9vbHRpcC1pbm5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQ0VFMEUzO1xcbiAgY29sb3I6ICMwMDMwNDA7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBmb250LXdlaWdodDogNzAwOyB9XFxuXFxuLnRvb2x0aXAuYnMtdG9vbHRpcC1yaWdodCAuYXJyb3c6YmVmb3JlIHtcXG4gIGJvcmRlci1yaWdodC1jb2xvcjogI0NFRTBFMyAhaW1wb3J0YW50OyB9XFxuXFxuLnRvb2x0aXAuYnMtdG9vbHRpcC1sZWZ0IC5hcnJvdzpiZWZvcmUge1xcbiAgYm9yZGVyLWxlZnQtY29sb3I6ICNDRUUwRTMgIWltcG9ydGFudDsgfVxcblxcbi50b29sdGlwLmJzLXRvb2x0aXAtYm90dG9tIC5hcnJvdzpiZWZvcmUge1xcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogI0NFRTBFMyAhaW1wb3J0YW50OyB9XFxuXFxuLnRvb2x0aXAuYnMtdG9vbHRpcC10b3AgLmFycm93OmJlZm9yZSB7XFxuICBib3JkZXItdG9wLWNvbG9yOiAjQ0VFMEUzICFpbXBvcnRhbnQ7IH1cXG5cXG4ubW9kYWwtY29udGVudCB7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDA7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDA7XFxuICBib3JkZXItcmFkaXVzOiAwO1xcbiAgYm9yZGVyOiBub25lOyB9XFxuICAubW9kYWwtY29udGVudCAubW9kYWwtaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0YyRjlGQTtcXG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAgIC5tb2RhbC1jb250ZW50IC5tb2RhbC1oZWFkZXIgLmNsb3NlIHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgcmlnaHQ6IDI1cHg7XFxuICAgICAgZm9udC1zaXplOiAwO1xcbiAgICAgIHRvcDogMjFweDsgfVxcbiAgICAubW9kYWwtY29udGVudCAubW9kYWwtaGVhZGVyIC5tb2RhbC10aXRsZSB7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgICBsaW5lLWhlaWdodDogbm9ybWFsOyB9XFxuICAubW9kYWwtY29udGVudCAubW9kYWwtYm9keSB7XFxuICAgIHBhZGRpbmc6IDJyZW07IH1cXG4gICAgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWJvZHkgLmNvbCB7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogNjBweDsgfVxcbiAgICAubW9kYWwtY29udGVudCAubW9kYWwtYm9keSAubW9kYWwtbGFiZWwge1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgICBjb2xvcjogIzFBNEI2MTtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4OyB9XFxuICAgIC5tb2RhbC1jb250ZW50IC5tb2RhbC1ib2R5IC5tb2RhbC1maWxlcy1uYW1lcyB1bCB7XFxuICAgICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgICBwYWRkaW5nOiAwOyB9XFxuICAgICAgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWJvZHkgLm1vZGFsLWZpbGVzLW5hbWVzIHVsIGxpIHtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDE1cHg7IH1cXG4gICAgICAgIC5tb2RhbC1jb250ZW50IC5tb2RhbC1ib2R5IC5tb2RhbC1maWxlcy1uYW1lcyB1bCBsaSBpbWcge1xcbiAgICAgICAgICBtYXJnaW46IDAgMTBweDtcXG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgICB0b3A6IC0xcHg7IH1cXG4gIC5tb2RhbC1jb250ZW50IC5tb2RhbC1mb290ZXIge1xcbiAgICBwYWRkaW5nOiAyMHB4OyB9XFxuXFxuLmRyYWctZmllbGQge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XFxuICBmb250LXNpemU6IDEycHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNGMkY5RkE7XFxuICBjb2xvcjogIzdGQTNBODtcXG4gIGJvcmRlcjogMXB4IGRhc2hlZCAjQ0VFMEUzO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgcGFkZGluZzogMTdweCAycHggMHB4IDJweDtcXG4gIGhlaWdodDogNDhweDsgfVxcbiAgLmRyYWctZmllbGQgYSB7XFxuICAgIGNvbG9yOiAjNTdEQ0VFO1xcbiAgICBmb250LXNpemU6IDEycHg7IH1cXG5cXG4uaGVhZGVyIHtcXG4gIHBhZGRpbmctdG9wOiAzMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDMwcHg7IH1cXG4gIC5oZWFkZXIuaGVhZGVyLWJnIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0YyRjlGQTsgfVxcbiAgLmhlYWRlciBoMSB7XFxuICAgIG1hcmdpbi10b3A6IDE1cHg7XFxuICAgIG1hcmdpbi1yaWdodDogMTdweDsgfVxcbiAgLmhlYWRlciAuZHJhZy1maWVsZCB7XFxuICAgIHdpZHRoOiAxMDAlOyB9XFxuICAuaGVhZGVyIC5mb3JtLWNvbnRyb2wge1xcbiAgICBtaW4td2lkdGg6IDIyMHB4OyB9XFxuICAuaGVhZGVyIC5zdGF0dXMsIC5oZWFkZXIgLmluZm8tYmxvY2sge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDM3cHg7IH1cXG4gIC5oZWFkZXIgLnN0YXR1cyB7XFxuICAgIG1hcmdpbi10b3A6IDEzcHg7IH1cXG4gIC5oZWFkZXIgLmluZm8tYmxvY2sge1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgICBmb250LXNpemU6IDEycHg7IH1cXG4gICAgLmhlYWRlciAuaW5mby1ibG9jayAudGl0bGUge1xcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgICAgY29sb3I6ICM3RkEzQTg7XFxuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTsgfVxcblxcbi5wYWdlIHtcXG4gIHBhZGRpbmctYm90dG9tOiAxMDBweDtcXG4gIHBhZGRpbmctdG9wOiAwcHg7IH1cXG5cXG4udGFicy1tZW51IHtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjN0ZBM0E4OyB9XFxuXFxuLnRhYnMtbWVudSBhIHtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIHBhZGRpbmc6IDE3cHggMTdweCAxM3B4IDE3cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XFxuICBtYXJnaW4tbGVmdDogMTVweDtcXG4gIG1hcmdpbi1ib3R0b206IC0xcHg7IH1cXG5cXG4udGFicy1tZW51IGE6aG92ZXIsIC50YWJzLW1lbnUgYS5hY3RpdmUge1xcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMyMERFRjQ7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG5cXG4udGFicy1tZW51IGEuZnVydGhlciB7XFxuICBjb2xvcjogcmdiYSgyNiwgNzUsIDk3LCAwLjMpOyB9XFxuXFxuLndhbGt0cm91Z2gge1xcbiAgYmFja2dyb3VuZDogI0ZEQzMxODtcXG4gIGJveC1zaGFkb3c6IDBweCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBwYWRkaW5nOiAzMHB4IDE3cHggMTBweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNTRweDtcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7IH1cXG4gIC53YWxrdHJvdWdoIC53YWxrdHJvdWdoLWNsb3NlIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogNXB4O1xcbiAgICByaWdodDogNXB4OyB9XFxuICAud2Fsa3Ryb3VnaCBwIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDsgfVxcblxcbi5maXhlZC1mb290ZXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG4gIGhlaWdodDogODFweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm90dG9tOiAwcHg7XFxuICBib3gtc2hhZG93OiAwcHggLTRweCA0cHggcmdiYSgwLCAwLCAwLCAwLjI1KTsgfVxcbiAgLmZpeGVkLWZvb3RlciAucGFnaW5hdGlvbiB7XFxuICAgIG1hcmdpbi10b3A6IDBweDsgfVxcbiAgICAuZml4ZWQtZm9vdGVyIC5wYWdpbmF0aW9uIC5wYWdlLWl0ZW0uYWN0aXZlIC5wYWdlLWxpbmssIC5maXhlZC1mb290ZXIgLnBhZ2luYXRpb24gLnBhZ2UtaXRlbS5hY3RpdmUgLnBhZ2UtbGluazpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0YyRjlGQTtcXG4gICAgICBib3JkZXItY29sb3I6ICNGMkY5RkE7XFxuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICAgIGN1cnNvcjogYXV0bztcXG4gICAgICBmb250LXdlaWdodDogNzAwOyB9XFxuICAgIC5maXhlZC1mb290ZXIgLnBhZ2luYXRpb24gLnBhZ2UtaXRlbSAucGFnZS1saW5rIHtcXG4gICAgICBmb250LXNpemU6IDE1cHg7XFxuICAgICAgYm9yZGVyOiBub25lO1xcbiAgICAgIGNvbG9yOiAjM0YzMzU2O1xcbiAgICAgIGhlaWdodDogODBweDtcXG4gICAgICBwYWRkaW5nLXRvcDogMzJweDtcXG4gICAgICBwYWRkaW5nLWxlZnQ6IDE3cHg7XFxuICAgICAgcGFkZGluZy1yaWdodDogMTdweDsgfVxcbiAgICAgIC5maXhlZC1mb290ZXIgLnBhZ2luYXRpb24gLnBhZ2UtaXRlbSAucGFnZS1saW5rOmhvdmVyIHtcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IH1cXG4gIC5maXhlZC1mb290ZXIgLmJ0biwgLmZpeGVkLWZvb3RlciAuZW50cmllcyB7XFxuICAgIG1hcmdpbi10b3A6IDE3cHg7IH1cXG4gIC5maXhlZC1mb290ZXIgLmVudHJpZXMge1xcbiAgICBtYXgtd2lkdGg6IDIxMHB4O1xcbiAgICBjb2xvcjogIzdGQTNBODtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xcbiAgICBmb250LXdlaWdodDogNzAwOyB9XFxuICAgIC5maXhlZC1mb290ZXIgLmVudHJpZXMgc3BhbiB7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuICAgIC5maXhlZC1mb290ZXIgLmVudHJpZXMgc2VsZWN0IHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgd2lkdGg6IDgwcHg7XFxuICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxuICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4OyB9XFxuXFxuLmdyZXkge1xcbiAgY29sb3I6ICNDRUUwRTM7IH1cXG5cXG4jbG9naW4tcGFnZSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFxcIi9hc3NldHMvaW1hZ2VzL2xvZ2luX2JnLmpwZ1xcXCIpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gICNsb2dpbi1wYWdlIGgxIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMzRweDsgfVxcbiAgI2xvZ2luLXBhZ2UgLmNvbnRhaW5lciB7XFxuICAgIG1hcmdpbi10b3A6IC04MHB4OyB9XFxuICAjbG9naW4tcGFnZSAubG9naW4tYmxvY2sge1xcbiAgICBiYWNrZ3JvdW5kOiAjRkZGRkZGO1xcbiAgICBtYXgtd2lkdGg6IDQ1MHB4O1xcbiAgICBwYWRkaW5nOiA0MnB4IDQ4cHggNTVweCA0OHB4O1xcbiAgICBtYXJnaW4tdG9wOiA4MHB4OyB9XFxuICAgICNsb2dpbi1wYWdlIC5sb2dpbi1ibG9jayAubG9naW4tZm9vdGVyIHtcXG4gICAgICBtYXJnaW4tdG9wOiAzNXB4O1xcbiAgICAgIG1pbi1oZWlnaHQ6IDQ1cHg7IH1cXG4gICAgICAjbG9naW4tcGFnZSAubG9naW4tYmxvY2sgLmxvZ2luLWZvb3RlciAuY3VzdG9tLWNoZWNrYm94IHtcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7IH1cXG4gICAgICAjbG9naW4tcGFnZSAubG9naW4tYmxvY2sgLmxvZ2luLWZvb3RlciBhIHtcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgICAgICAgZm9udC1zaXplOiAxMnB4OyB9XFxuICAjbG9naW4tcGFnZSAubG9naW4taW5mbyB7XFxuICAgIG1heC13aWR0aDogMzgwcHg7IH1cXG4gICAgI2xvZ2luLXBhZ2UgLmxvZ2luLWluZm8gLmxvZ2luLXRleHQge1xcbiAgICAgIGNvbG9yOiAjZmZmZmZmO1xcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgICBtYXJnaW4tdG9wOiA0MHB4O1xcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcXG4gICAgICBsZXR0ZXItc3BhY2luZzogMC4wNWVtOyB9XFxuXFxuLmZpbGUtZXh0ZW50aW9uIHtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBsaW5lLWhlaWdodDogMjBweDtcXG4gIGZvbnQtc2l6ZTogOXB4O1xcbiAgYmFja2dyb3VuZDogIzdGQTNBODtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIHBhZGRpbmc6IDJweCA0cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDVweDtcXG4gIGNvbG9yOiAjRkZGOyB9XFxuXFxuLmZpbGUtbGFuZyB7XFxuICBiYWNrZ3JvdW5kOiAjQ0VFMEUzO1xcbiAgYm9yZGVyLXJhZGl1czogMTRweDtcXG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIHBhZGRpbmc6IDVweCAyMHB4IDVweCAxOHB4O1xcbiAgY29sb3I6ICMwMDMwNDA7IH1cXG5cXG4uY29ubmVjdG9ycy1jb250YWluZXIge1xcbiAgbWFyZ2luOiAwIDE1cHggNDBweDsgfVxcbiAgLmNvbm5lY3RvcnMtY29udGFpbmVyID4gLnJvdyB7XFxuICAgIG92ZXJmbG93LXg6IGF1dG87IH1cXG4gIC5jb25uZWN0b3JzLWNvbnRhaW5lciAuY29ubmVjdG9yLWJveCB7XFxuICAgIHBhZGRpbmc6IDE1cHggMTBweCAxMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgIC5jb25uZWN0b3JzLWNvbnRhaW5lciAuY29ubmVjdG9yLWJveC5hY3RpdmUsIC5jb25uZWN0b3JzLWNvbnRhaW5lciAuY29ubmVjdG9yLWJveDpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogI0YyRjlGQTsgfVxcbiAgICAuY29ubmVjdG9ycy1jb250YWluZXIgLmNvbm5lY3Rvci1ib3ggLmNvbm5lY3Rvci1pY29uIHtcXG4gICAgICBtYXJnaW4tYm90dG9tOiA2cHg7XFxuICAgICAgaGVpZ2h0OiA3MHB4O1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgICAgIC5jb25uZWN0b3JzLWNvbnRhaW5lciAuY29ubmVjdG9yLWJveCAuY29ubmVjdG9yLWljb24gaW1nIHtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHRvcDogNTAlO1xcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAgICAgbGVmdDogMDtcXG4gICAgICAgIHJpZ2h0OiAwO1xcbiAgICAgICAgbWFyZ2luOiBhdXRvOyB9XFxuICAgIC5jb25uZWN0b3JzLWNvbnRhaW5lciAuY29ubmVjdG9yLWJveCAuY29ubmVjdG9yLW5hbWUge1xcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOyB9XFxuXFxuLmZpbGVzLWNvbnRhaW5lciB7XFxuICBtYXgtd2lkdGg6IDcwMHB4OyB9XFxuICAuZmlsZXMtY29udGFpbmVyIC5maWxlcy1jb2wtZmlyc3Qge1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjRjJGMkYyOyB9XFxuXFxuLmNvbC1ib3gge1xcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XFxuICBtYXJnaW4tdG9wOiAyMHB4OyB9XFxuICAuY29sLWJveCAuY29sLWhlYWQge1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XFxuICAgIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGNvbG9yOiAjN0ZBM0E4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAyNXB4OyB9XFxuICAuY29sLWJveCAuc2VsZWN0ZWQtZmlsZXMgdWwge1xcbiAgICBwYWRkaW5nOiAycHggMCAgMDtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTsgfVxcbiAgICAuY29sLWJveCAuc2VsZWN0ZWQtZmlsZXMgdWwgbGkge1xcbiAgICAgIHdpZHRoOiAyMzVweDtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgcGFkZGluZzogMCAzNXB4O1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDE4cHg7IH1cXG4gICAgICAuY29sLWJveCAuc2VsZWN0ZWQtZmlsZXMgdWwgbGkgLmZpbGUtaWNvbiB7XFxuICAgICAgICBtYXgtd2lkdGg6IDE4cHg7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB0b3A6IC0xcHg7XFxuICAgICAgICBsZWZ0OiAwOyB9XFxuICAgICAgLmNvbC1ib3ggLnNlbGVjdGVkLWZpbGVzIHVsIGxpIC5yZW1vdmUtaWNvbiB7XFxuICAgICAgICB3aWR0aDogMThweDtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHRvcDogMHB4O1xcbiAgICAgICAgcmlnaHQ6IDA7XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gIC5jb2wtYm94IC5kcmFnLWZpZWxkIHtcXG4gICAgcGFkZGluZy10b3A6IDEzMHB4O1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMTQwcHg7IH1cXG5cXG4uanN0cmVlIC5qc3RyZWUtd2hvbGVyb3ctaG92ZXJlZCwgLmpzdHJlZSAuanN0cmVlLXdob2xlcm93LWNsaWNrZWQge1xcbiAgYmFja2dyb3VuZDogbm9uZTsgfVxcblxcbi5qc3RyZWUgLmpzdHJlZS1vcGVuID4gLmpzdHJlZS1jaGlsZHJlbiB7XFxuICBtYXJnaW4tdG9wOiAxMHB4OyB9XFxuICAuanN0cmVlIC5qc3RyZWUtb3BlbiA+IC5qc3RyZWUtY2hpbGRyZW4gLmpzdHJlZS1ub2RlIHtcXG4gICAgbWFyZ2luLXRvcDogMTBweDsgfVxcblwiXX1dKTtcblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuICdAbWVkaWEgJyArIGl0ZW1bMl0gKyAneycgKyBjb250ZW50ICsgJ30nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICB9XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IG1vZHVsZXNbaV07IC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcbiAgICAgIC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG4gICAgICAvLyB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG4gICAgICAvLyBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cbiAgICAgIGlmIChpdGVtWzBdID09IG51bGwgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgaWYgKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgICAgaXRlbVsyXSA9ICcoJyArIGl0ZW1bMl0gKyAnKSBhbmQgKCcgKyBtZWRpYVF1ZXJ5ICsgJyknO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuICByZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVzY2FwZSh1cmwsIG5lZWRRdW90ZXMpIHtcbiAgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfSAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXS8udGVzdCh1cmwpIHx8IG5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gJ1wiJyArIHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpICsgJ1wiJztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIk1hdGVyaWFsSWNvbnMtUmVndWxhci5lb3RcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJNYXRlcmlhbEljb25zLVJlZ3VsYXIudHRmXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiTWF0ZXJpYWxJY29ucy1SZWd1bGFyLndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJNYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZjJcIjsiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgcGFyZW50KSB7XG4gIGlmIChwYXJlbnQpe1xuICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCwgcGFyZW50KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUsIHRhcmdldCk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0aWYob3B0aW9ucy5hdHRycy5ub25jZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblx0XHRpZiAobm9uY2UpIHtcblx0XHRcdG9wdGlvbnMuYXR0cnMubm9uY2UgPSBub25jZTtcblx0XHR9XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBnZXROb25jZSgpIHtcblx0aWYgKHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSB0eXBlb2Ygb3B0aW9ucy50cmFuc2Zvcm0gPT09ICdmdW5jdGlvbidcblx0XHQgPyBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKSBcblx0XHQgOiBvcHRpb25zLnRyYW5zZm9ybS5kZWZhdWx0KG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCJleHBvcnQgY29uc3QgaW5pdEZpbGVzID0gKCkgPT4ge1xyXG4gIHZhciBpbnN0YW5jZTtcclxuICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNvbm5lY3Rvci1ib3gnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL3ZhciByb290ID0gJCh0aGlzKS5kYXRhKCdyb290Jyk7XHJcbiAgICAkKCcuY29ubmVjdG9yLWJveCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCgnLmRyYWctZmllbGQnKS5oaWRlKCk7XHJcbiAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdkZXZpY2UnKSl7XHJcbiAgICAgICQoJyNqc3RyZWVfZGl2JykuaGlkZSgpO1xyXG4gICAgICAkKCcuZHJhZy1maWVsZCcpLnNob3coKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAkKCcjanN0cmVlX2RpdicpLnNob3coKTtcclxuICAgICAgJCgnLmFkZFRvVGFibGUnKS5zaG93KCk7XHJcbiAgICAgICQoJyNqc3RyZWVfZGl2JykuanN0cmVlKFwicmVmcmVzaFwiKTtcclxuICAgICAgaWYoaW5zdGFuY2UgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgaW5zdGFuY2UuanN0cmVlKFwiZGVzdHJveVwiKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2pzdHJlZScpO1xyXG4gICAgICB9XHJcbiAgICAgIGluc3RhbmNlID0gJCgnI2pzdHJlZV9kaXYnKVxyXG4gICAgICAuanN0cmVlKHtcclxuICAgICAgICBcInBsdWdpbnNcIiA6IFtcclxuICAgICAgICAgIFwiY29udGV4dG1lbnVcIiwgXCJzZWFyY2hcIiwgXCJ0eXBlc1wiLCBcInN0YXRlXCIsIFwid2hvbGVyb3dcIiwgXCJjaGVja2JveFwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICAnY29yZScgOiB7XHJcbiAgICAgICAgICAnY2hlY2tfY2FsbGJhY2snIDogdHJ1ZSxcclxuICAgICAgICAgICdkYXRhJyA6IHtcclxuICAgICAgICAgICAgJ3VybCcgOiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICAgIC8vdmFyIHVzZXJfaWQgPSAkKCcjY2xpZW50LXNlbGVjdCcpLnZhbCgpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBub2RlLmlkID09PSAnIycgPyAnL3Jvb3QuanNvbicgOiAnJztcclxuICAgICAgICAgICAgICAvLycvc3RydWN0dXJlP3VzZXJfaWQ9Jyt1c2VyX2lkKycmaWQ9Jytyb290IDpcclxuICAgICAgICAgICAgLy8gICcvc3RydWN0dXJlP3VzZXJfaWQ9Jyt1c2VyX2lkKycmaWQ9Jytub2RlLmlkO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRhdGFcIiA6IGZ1bmN0aW9uIChub2RlKSB7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRhdGFUeXBlXCIgOiBcImpzb25cIiAvLyBuZWVkZWQgb25seSBpZiB5b3UgZG8gbm90IHN1cHBseSBKU09OIGhlYWRlcnNcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidHlwZXNcIiA6IHtcclxuICAgICAgICAgIFwiI1wiIDoge1xyXG4gICAgICAgICAgICBcIm1heF9jaGlsZHJlblwiIDogMSxcclxuICAgICAgICAgICAgXCJ2YWxpZF9jaGlsZHJlblwiIDogW1wicm9vdFwiXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwicm9vdFwiIDoge1xyXG4gICAgICAgICAgICBcImljb25cIiA6IFwiYXNzZXRzL2ltYWdlcy90cmVlX2ZvbGRlci5zdmdcIixcclxuICAgICAgICAgICAgXCJ2YWxpZF9jaGlsZHJlblwiIDogW1wiZGVmYXVsdFwiXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwiZGVmYXVsdFwiIDoge1xyXG4gICAgICAgICAgICBcImljb25cIiA6IFwiYXNzZXRzL2ltYWdlcy90cmVlX2ZvbGRlci5zdmdcIixcclxuICAgICAgICAgICAgXCJ2YWxpZF9jaGlsZHJlblwiIDogW1wiZGVmYXVsdFwiLFwiZmlsZVwiXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFwiZmlsZVwiIDoge1xyXG4gICAgICAgICAgICBcImljb25cIiA6IFwiYXNzZXRzL2ltYWdlcy9maWxlX2ljb24uc3ZnXCIsXHJcbiAgICAgICAgICAgIFwidmFsaWRfY2hpbGRyZW5cIiA6IFtdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImNoZWNrYm94XCIgOiB7XHJcbiAgICAgICAgICBcIndob2xlX25vZGVcIiA6IHRydWUsXHJcbiAgICAgICAgICAnZGVzZWxlY3RfYWxsJzogdHJ1ZSxcclxuICAgICAgICAgICd0aHJlZV9zdGF0ZScgOiB0cnVlLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9KTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBNT0RBTFMgZnJvbSAnLi9tb2RhbHMnO1xyXG5pbXBvcnQgKiBhcyBGSUxFUyBmcm9tICcuL2ZpbGVzJztcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xyXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XHJcbiAgICAgICAgTU9EQUxTLmluaXRNb2RhbENvbmZpcm0oKTtcclxuICAgICAgICBNT0RBTFMuaW5pdE1vZGFsWmlwKCk7XHJcbiAgICAgICAgRklMRVMuaW5pdEZpbGVzKCk7XHJcbiAgICB9KTtcclxuXHJcbn0pKCQpO1xyXG4iLCIvL21vZGFsIGNvbmZpcm1cclxuZXhwb3J0IGNvbnN0IGluaXRNb2RhbENvbmZpcm0gPSAoKSA9PiB7XHJcbiAgJChcIipbZGF0YS1jb25maXJtXVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHZhciBocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcclxuICAgIHZhciB0aXRsZSA9ICQodGhpcykuYXR0cihcImRhdGEtY29uZmlybVwiKTtcclxuICAgIHZhciBidG5UZXh0ID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1jb25maXJtLWJ0blwiKTtcclxuICAgIHZhciBmdW5jdGlvbk5hbWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWNvbmZpcm0tY2FsbFwiKTtcclxuXHJcbiAgICB2YXIgbW9kYWxDb25maXJtID0gJChcIiNtb2RhbC1jb25maXJtXCIpO1xyXG5cclxuICAgIG1vZGFsQ29uZmlybS5maW5kKFwiLmJ0bi1jb25maXJtXCIpLmh0bWwoYnRuVGV4dCk7XHJcbiAgICBtb2RhbENvbmZpcm0uZmluZChcIi5tb2RhbC1ib2R5IHBcIikuaHRtbCh0aXRsZSk7XHJcblxyXG4gICAgaWYoZnVuY3Rpb25OYW1lICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIG1vZGFsQ29uZmlybS5maW5kKFwiLmJ0bi1jb25maXJtXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICB3aW5kb3dbZnVuY3Rpb25OYW1lXSgpO1xyXG4gICAgICAgIG1vZGFsQ29uZmlybS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIG1vZGFsQ29uZmlybS5maW5kKFwiLmJ0bi1jb25maXJtXCIpLmF0dHIoXCJocmVmXCIsIGhyZWYpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZGFsQ29uZmlybS5tb2RhbChcInNob3dcIik7XHJcbiAgfSk7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGluaXRNb2RhbFppcCA9ICgpID0+IHtcclxuICAkKFwiLmhlYWRlciAuZHJhZy1maWVsZFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgdmFyIG1vZGFsWmlwID0gJChcIiNtb2RhbC16aXBcIik7XHJcbiAgICBtb2RhbFppcC5tb2RhbChcInNob3dcIik7XHJcbiAgfSk7XHJcbn1cclxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTYtMSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTYtMiEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS02LTMhLi9zdHlsZS5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJzb3VyY2VNYXBcIjp0cnVlLFwiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNi0xIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNi0yIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTYtMyEuL3N0eWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS02LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS02LTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNi0zIS4vc3R5bGUuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSJdLCJzb3VyY2VSb290IjoiIn0=