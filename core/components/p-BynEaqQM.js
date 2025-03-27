var cjs = {};

var Observable = {};

var Subscriber = {};

var isFunction = {};

var hasRequiredIsFunction;

function requireIsFunction () {
	if (hasRequiredIsFunction) return isFunction;
	hasRequiredIsFunction = 1;
	Object.defineProperty(isFunction, "__esModule", { value: true });
	isFunction.isFunction = void 0;
	function isFunction$1(value) {
	    return typeof value === 'function';
	}
	isFunction.isFunction = isFunction$1;
	
	return isFunction;
}

var Subscription = {};

var UnsubscriptionError = {};

var createErrorClass = {};

var hasRequiredCreateErrorClass;

function requireCreateErrorClass () {
	if (hasRequiredCreateErrorClass) return createErrorClass;
	hasRequiredCreateErrorClass = 1;
	Object.defineProperty(createErrorClass, "__esModule", { value: true });
	createErrorClass.createErrorClass = void 0;
	function createErrorClass$1(createImpl) {
	    var _super = function (instance) {
	        Error.call(instance);
	        instance.stack = new Error().stack;
	    };
	    var ctorFunc = createImpl(_super);
	    ctorFunc.prototype = Object.create(Error.prototype);
	    ctorFunc.prototype.constructor = ctorFunc;
	    return ctorFunc;
	}
	createErrorClass.createErrorClass = createErrorClass$1;
	
	return createErrorClass;
}

var hasRequiredUnsubscriptionError;

function requireUnsubscriptionError () {
	if (hasRequiredUnsubscriptionError) return UnsubscriptionError;
	hasRequiredUnsubscriptionError = 1;
	Object.defineProperty(UnsubscriptionError, "__esModule", { value: true });
	UnsubscriptionError.UnsubscriptionError = void 0;
	var createErrorClass_1 = requireCreateErrorClass();
	UnsubscriptionError.UnsubscriptionError = createErrorClass_1.createErrorClass(function (_super) {
	    return function UnsubscriptionErrorImpl(errors) {
	        _super(this);
	        this.message = errors
	            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
	            : '';
	        this.name = 'UnsubscriptionError';
	        this.errors = errors;
	    };
	});
	
	return UnsubscriptionError;
}

var arrRemove = {};

var hasRequiredArrRemove;

function requireArrRemove () {
	if (hasRequiredArrRemove) return arrRemove;
	hasRequiredArrRemove = 1;
	Object.defineProperty(arrRemove, "__esModule", { value: true });
	arrRemove.arrRemove = void 0;
	function arrRemove$1(arr, item) {
	    if (arr) {
	        var index = arr.indexOf(item);
	        0 <= index && arr.splice(index, 1);
	    }
	}
	arrRemove.arrRemove = arrRemove$1;
	
	return arrRemove;
}

var hasRequiredSubscription;

function requireSubscription () {
	if (hasRequiredSubscription) return Subscription;
	hasRequiredSubscription = 1;
	var __values = (Subscription && Subscription.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	var __read = (Subscription && Subscription.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (Subscription && Subscription.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(Subscription, "__esModule", { value: true });
	Subscription.isSubscription = Subscription.EMPTY_SUBSCRIPTION = Subscription.Subscription = void 0;
	var isFunction_1 = requireIsFunction();
	var UnsubscriptionError_1 = requireUnsubscriptionError();
	var arrRemove_1 = requireArrRemove();
	var Subscription$1 = (function () {
	    function Subscription(initialTeardown) {
	        this.initialTeardown = initialTeardown;
	        this.closed = false;
	        this._parentage = null;
	        this._finalizers = null;
	    }
	    Subscription.prototype.unsubscribe = function () {
	        var e_1, _a, e_2, _b;
	        var errors;
	        if (!this.closed) {
	            this.closed = true;
	            var _parentage = this._parentage;
	            if (_parentage) {
	                this._parentage = null;
	                if (Array.isArray(_parentage)) {
	                    try {
	                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
	                            var parent_1 = _parentage_1_1.value;
	                            parent_1.remove(this);
	                        }
	                    }
	                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                    finally {
	                        try {
	                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
	                        }
	                        finally { if (e_1) throw e_1.error; }
	                    }
	                }
	                else {
	                    _parentage.remove(this);
	                }
	            }
	            var initialFinalizer = this.initialTeardown;
	            if (isFunction_1.isFunction(initialFinalizer)) {
	                try {
	                    initialFinalizer();
	                }
	                catch (e) {
	                    errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? e.errors : [e];
	                }
	            }
	            var _finalizers = this._finalizers;
	            if (_finalizers) {
	                this._finalizers = null;
	                try {
	                    for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
	                        var finalizer = _finalizers_1_1.value;
	                        try {
	                            execFinalizer(finalizer);
	                        }
	                        catch (err) {
	                            errors = errors !== null && errors !== void 0 ? errors : [];
	                            if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
	                            }
	                            else {
	                                errors.push(err);
	                            }
	                        }
	                    }
	                }
	                catch (e_2_1) { e_2 = { error: e_2_1 }; }
	                finally {
	                    try {
	                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
	                    }
	                    finally { if (e_2) throw e_2.error; }
	                }
	            }
	            if (errors) {
	                throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	            }
	        }
	    };
	    Subscription.prototype.add = function (teardown) {
	        var _a;
	        if (teardown && teardown !== this) {
	            if (this.closed) {
	                execFinalizer(teardown);
	            }
	            else {
	                if (teardown instanceof Subscription) {
	                    if (teardown.closed || teardown._hasParent(this)) {
	                        return;
	                    }
	                    teardown._addParent(this);
	                }
	                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
	            }
	        }
	    };
	    Subscription.prototype._hasParent = function (parent) {
	        var _parentage = this._parentage;
	        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
	    };
	    Subscription.prototype._addParent = function (parent) {
	        var _parentage = this._parentage;
	        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
	    };
	    Subscription.prototype._removeParent = function (parent) {
	        var _parentage = this._parentage;
	        if (_parentage === parent) {
	            this._parentage = null;
	        }
	        else if (Array.isArray(_parentage)) {
	            arrRemove_1.arrRemove(_parentage, parent);
	        }
	    };
	    Subscription.prototype.remove = function (teardown) {
	        var _finalizers = this._finalizers;
	        _finalizers && arrRemove_1.arrRemove(_finalizers, teardown);
	        if (teardown instanceof Subscription) {
	            teardown._removeParent(this);
	        }
	    };
	    Subscription.EMPTY = (function () {
	        var empty = new Subscription();
	        empty.closed = true;
	        return empty;
	    })();
	    return Subscription;
	}());
	Subscription.Subscription = Subscription$1;
	Subscription.EMPTY_SUBSCRIPTION = Subscription$1.EMPTY;
	function isSubscription(value) {
	    return (value instanceof Subscription$1 ||
	        (value && 'closed' in value && isFunction_1.isFunction(value.remove) && isFunction_1.isFunction(value.add) && isFunction_1.isFunction(value.unsubscribe)));
	}
	Subscription.isSubscription = isSubscription;
	function execFinalizer(finalizer) {
	    if (isFunction_1.isFunction(finalizer)) {
	        finalizer();
	    }
	    else {
	        finalizer.unsubscribe();
	    }
	}
	
	return Subscription;
}

var config = {};

var hasRequiredConfig;

function requireConfig () {
	if (hasRequiredConfig) return config;
	hasRequiredConfig = 1;
	Object.defineProperty(config, "__esModule", { value: true });
	config.config = void 0;
	config.config = {
	    onUnhandledError: null,
	    onStoppedNotification: null,
	    Promise: undefined,
	    useDeprecatedSynchronousErrorHandling: false,
	    useDeprecatedNextContext: false,
	};
	
	return config;
}

var reportUnhandledError = {};

var timeoutProvider = {};

var hasRequiredTimeoutProvider;

function requireTimeoutProvider () {
	if (hasRequiredTimeoutProvider) return timeoutProvider;
	hasRequiredTimeoutProvider = 1;
	(function (exports) {
		var __read = (timeoutProvider && timeoutProvider.__read) || function (o, n) {
		    var m = typeof Symbol === "function" && o[Symbol.iterator];
		    if (!m) return o;
		    var i = m.call(o), r, ar = [], e;
		    try {
		        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
		    }
		    catch (error) { e = { error: error }; }
		    finally {
		        try {
		            if (r && !r.done && (m = i["return"])) m.call(i);
		        }
		        finally { if (e) throw e.error; }
		    }
		    return ar;
		};
		var __spreadArray = (timeoutProvider && timeoutProvider.__spreadArray) || function (to, from) {
		    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
		        to[j] = from[i];
		    return to;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.timeoutProvider = void 0;
		exports.timeoutProvider = {
		    setTimeout: function (handler, timeout) {
		        var args = [];
		        for (var _i = 2; _i < arguments.length; _i++) {
		            args[_i - 2] = arguments[_i];
		        }
		        var delegate = exports.timeoutProvider.delegate;
		        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
		            return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
		        }
		        return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
		    },
		    clearTimeout: function (handle) {
		        var delegate = exports.timeoutProvider.delegate;
		        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
		    },
		    delegate: undefined,
		};
		
	} (timeoutProvider));
	return timeoutProvider;
}

var hasRequiredReportUnhandledError;

function requireReportUnhandledError () {
	if (hasRequiredReportUnhandledError) return reportUnhandledError;
	hasRequiredReportUnhandledError = 1;
	Object.defineProperty(reportUnhandledError, "__esModule", { value: true });
	reportUnhandledError.reportUnhandledError = void 0;
	var config_1 = requireConfig();
	var timeoutProvider_1 = requireTimeoutProvider();
	function reportUnhandledError$1(err) {
	    timeoutProvider_1.timeoutProvider.setTimeout(function () {
	        var onUnhandledError = config_1.config.onUnhandledError;
	        if (onUnhandledError) {
	            onUnhandledError(err);
	        }
	        else {
	            throw err;
	        }
	    });
	}
	reportUnhandledError.reportUnhandledError = reportUnhandledError$1;
	
	return reportUnhandledError;
}

var noop = {};

var hasRequiredNoop;

function requireNoop () {
	if (hasRequiredNoop) return noop;
	hasRequiredNoop = 1;
	Object.defineProperty(noop, "__esModule", { value: true });
	noop.noop = void 0;
	function noop$1() { }
	noop.noop = noop$1;
	
	return noop;
}

var NotificationFactories = {};

var hasRequiredNotificationFactories;

function requireNotificationFactories () {
	if (hasRequiredNotificationFactories) return NotificationFactories;
	hasRequiredNotificationFactories = 1;
	Object.defineProperty(NotificationFactories, "__esModule", { value: true });
	NotificationFactories.createNotification = NotificationFactories.nextNotification = NotificationFactories.errorNotification = NotificationFactories.COMPLETE_NOTIFICATION = void 0;
	NotificationFactories.COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
	function errorNotification(error) {
	    return createNotification('E', undefined, error);
	}
	NotificationFactories.errorNotification = errorNotification;
	function nextNotification(value) {
	    return createNotification('N', value, undefined);
	}
	NotificationFactories.nextNotification = nextNotification;
	function createNotification(kind, value, error) {
	    return {
	        kind: kind,
	        value: value,
	        error: error,
	    };
	}
	NotificationFactories.createNotification = createNotification;
	
	return NotificationFactories;
}

var errorContext = {};

var hasRequiredErrorContext;

function requireErrorContext () {
	if (hasRequiredErrorContext) return errorContext;
	hasRequiredErrorContext = 1;
	Object.defineProperty(errorContext, "__esModule", { value: true });
	errorContext.captureError = errorContext.errorContext = void 0;
	var config_1 = requireConfig();
	var context = null;
	function errorContext$1(cb) {
	    if (config_1.config.useDeprecatedSynchronousErrorHandling) {
	        var isRoot = !context;
	        if (isRoot) {
	            context = { errorThrown: false, error: null };
	        }
	        cb();
	        if (isRoot) {
	            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
	            context = null;
	            if (errorThrown) {
	                throw error;
	            }
	        }
	    }
	    else {
	        cb();
	    }
	}
	errorContext.errorContext = errorContext$1;
	function captureError(err) {
	    if (config_1.config.useDeprecatedSynchronousErrorHandling && context) {
	        context.errorThrown = true;
	        context.error = err;
	    }
	}
	errorContext.captureError = captureError;
	
	return errorContext;
}

var hasRequiredSubscriber;

function requireSubscriber () {
	if (hasRequiredSubscriber) return Subscriber;
	hasRequiredSubscriber = 1;
	(function (exports) {
		var __extends = (Subscriber && Subscriber.__extends) || (function () {
		    var extendStatics = function (d, b) {
		        extendStatics = Object.setPrototypeOf ||
		            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
		            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
		        return extendStatics(d, b);
		    };
		    return function (d, b) {
		        if (typeof b !== "function" && b !== null)
		            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		        extendStatics(d, b);
		        function __() { this.constructor = d; }
		        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		    };
		})();
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.EMPTY_OBSERVER = exports.SafeSubscriber = exports.Subscriber = void 0;
		var isFunction_1 = requireIsFunction();
		var Subscription_1 = requireSubscription();
		var config_1 = requireConfig();
		var reportUnhandledError_1 = requireReportUnhandledError();
		var noop_1 = requireNoop();
		var NotificationFactories_1 = requireNotificationFactories();
		var timeoutProvider_1 = requireTimeoutProvider();
		var errorContext_1 = requireErrorContext();
		var Subscriber$1 = (function (_super) {
		    __extends(Subscriber, _super);
		    function Subscriber(destination) {
		        var _this = _super.call(this) || this;
		        _this.isStopped = false;
		        if (destination) {
		            _this.destination = destination;
		            if (Subscription_1.isSubscription(destination)) {
		                destination.add(_this);
		            }
		        }
		        else {
		            _this.destination = exports.EMPTY_OBSERVER;
		        }
		        return _this;
		    }
		    Subscriber.create = function (next, error, complete) {
		        return new SafeSubscriber(next, error, complete);
		    };
		    Subscriber.prototype.next = function (value) {
		        if (this.isStopped) {
		            handleStoppedNotification(NotificationFactories_1.nextNotification(value), this);
		        }
		        else {
		            this._next(value);
		        }
		    };
		    Subscriber.prototype.error = function (err) {
		        if (this.isStopped) {
		            handleStoppedNotification(NotificationFactories_1.errorNotification(err), this);
		        }
		        else {
		            this.isStopped = true;
		            this._error(err);
		        }
		    };
		    Subscriber.prototype.complete = function () {
		        if (this.isStopped) {
		            handleStoppedNotification(NotificationFactories_1.COMPLETE_NOTIFICATION, this);
		        }
		        else {
		            this.isStopped = true;
		            this._complete();
		        }
		    };
		    Subscriber.prototype.unsubscribe = function () {
		        if (!this.closed) {
		            this.isStopped = true;
		            _super.prototype.unsubscribe.call(this);
		            this.destination = null;
		        }
		    };
		    Subscriber.prototype._next = function (value) {
		        this.destination.next(value);
		    };
		    Subscriber.prototype._error = function (err) {
		        try {
		            this.destination.error(err);
		        }
		        finally {
		            this.unsubscribe();
		        }
		    };
		    Subscriber.prototype._complete = function () {
		        try {
		            this.destination.complete();
		        }
		        finally {
		            this.unsubscribe();
		        }
		    };
		    return Subscriber;
		}(Subscription_1.Subscription));
		exports.Subscriber = Subscriber$1;
		var _bind = Function.prototype.bind;
		function bind(fn, thisArg) {
		    return _bind.call(fn, thisArg);
		}
		var ConsumerObserver = (function () {
		    function ConsumerObserver(partialObserver) {
		        this.partialObserver = partialObserver;
		    }
		    ConsumerObserver.prototype.next = function (value) {
		        var partialObserver = this.partialObserver;
		        if (partialObserver.next) {
		            try {
		                partialObserver.next(value);
		            }
		            catch (error) {
		                handleUnhandledError(error);
		            }
		        }
		    };
		    ConsumerObserver.prototype.error = function (err) {
		        var partialObserver = this.partialObserver;
		        if (partialObserver.error) {
		            try {
		                partialObserver.error(err);
		            }
		            catch (error) {
		                handleUnhandledError(error);
		            }
		        }
		        else {
		            handleUnhandledError(err);
		        }
		    };
		    ConsumerObserver.prototype.complete = function () {
		        var partialObserver = this.partialObserver;
		        if (partialObserver.complete) {
		            try {
		                partialObserver.complete();
		            }
		            catch (error) {
		                handleUnhandledError(error);
		            }
		        }
		    };
		    return ConsumerObserver;
		}());
		var SafeSubscriber = (function (_super) {
		    __extends(SafeSubscriber, _super);
		    function SafeSubscriber(observerOrNext, error, complete) {
		        var _this = _super.call(this) || this;
		        var partialObserver;
		        if (isFunction_1.isFunction(observerOrNext) || !observerOrNext) {
		            partialObserver = {
		                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
		                error: error !== null && error !== void 0 ? error : undefined,
		                complete: complete !== null && complete !== void 0 ? complete : undefined,
		            };
		        }
		        else {
		            var context_1;
		            if (_this && config_1.config.useDeprecatedNextContext) {
		                context_1 = Object.create(observerOrNext);
		                context_1.unsubscribe = function () { return _this.unsubscribe(); };
		                partialObserver = {
		                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
		                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
		                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
		                };
		            }
		            else {
		                partialObserver = observerOrNext;
		            }
		        }
		        _this.destination = new ConsumerObserver(partialObserver);
		        return _this;
		    }
		    return SafeSubscriber;
		}(Subscriber$1));
		exports.SafeSubscriber = SafeSubscriber;
		function handleUnhandledError(error) {
		    if (config_1.config.useDeprecatedSynchronousErrorHandling) {
		        errorContext_1.captureError(error);
		    }
		    else {
		        reportUnhandledError_1.reportUnhandledError(error);
		    }
		}
		function defaultErrorHandler(err) {
		    throw err;
		}
		function handleStoppedNotification(notification, subscriber) {
		    var onStoppedNotification = config_1.config.onStoppedNotification;
		    onStoppedNotification && timeoutProvider_1.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
		}
		exports.EMPTY_OBSERVER = {
		    closed: true,
		    next: noop_1.noop,
		    error: defaultErrorHandler,
		    complete: noop_1.noop,
		};
		
	} (Subscriber));
	return Subscriber;
}

var observable = {};

var hasRequiredObservable$1;

function requireObservable$1 () {
	if (hasRequiredObservable$1) return observable;
	hasRequiredObservable$1 = 1;
	Object.defineProperty(observable, "__esModule", { value: true });
	observable.observable = void 0;
	observable.observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();
	
	return observable;
}

var pipe = {};

var identity = {};

var hasRequiredIdentity;

function requireIdentity () {
	if (hasRequiredIdentity) return identity;
	hasRequiredIdentity = 1;
	Object.defineProperty(identity, "__esModule", { value: true });
	identity.identity = void 0;
	function identity$1(x) {
	    return x;
	}
	identity.identity = identity$1;
	
	return identity;
}

var hasRequiredPipe;

function requirePipe () {
	if (hasRequiredPipe) return pipe;
	hasRequiredPipe = 1;
	Object.defineProperty(pipe, "__esModule", { value: true });
	pipe.pipeFromArray = pipe.pipe = void 0;
	var identity_1 = requireIdentity();
	function pipe$1() {
	    var fns = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        fns[_i] = arguments[_i];
	    }
	    return pipeFromArray(fns);
	}
	pipe.pipe = pipe$1;
	function pipeFromArray(fns) {
	    if (fns.length === 0) {
	        return identity_1.identity;
	    }
	    if (fns.length === 1) {
	        return fns[0];
	    }
	    return function piped(input) {
	        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
	    };
	}
	pipe.pipeFromArray = pipeFromArray;
	
	return pipe;
}

var hasRequiredObservable;

function requireObservable () {
	if (hasRequiredObservable) return Observable;
	hasRequiredObservable = 1;
	Object.defineProperty(Observable, "__esModule", { value: true });
	Observable.Observable = void 0;
	var Subscriber_1 = requireSubscriber();
	var Subscription_1 = requireSubscription();
	var observable_1 = requireObservable$1();
	var pipe_1 = requirePipe();
	var config_1 = requireConfig();
	var isFunction_1 = requireIsFunction();
	var errorContext_1 = requireErrorContext();
	var Observable$1 = (function () {
	    function Observable(subscribe) {
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var _this = this;
	        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new Subscriber_1.SafeSubscriber(observerOrNext, error, complete);
	        errorContext_1.errorContext(function () {
	            var _a = _this, operator = _a.operator, source = _a.source;
	            subscriber.add(operator
	                ?
	                    operator.call(subscriber, source)
	                : source
	                    ?
	                        _this._subscribe(subscriber)
	                    :
	                        _this._trySubscribe(subscriber));
	        });
	        return subscriber;
	    };
	    Observable.prototype._trySubscribe = function (sink) {
	        try {
	            return this._subscribe(sink);
	        }
	        catch (err) {
	            sink.error(err);
	        }
	    };
	    Observable.prototype.forEach = function (next, promiseCtor) {
	        var _this = this;
	        promiseCtor = getPromiseCtor(promiseCtor);
	        return new promiseCtor(function (resolve, reject) {
	            var subscriber = new Subscriber_1.SafeSubscriber({
	                next: function (value) {
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscriber.unsubscribe();
	                    }
	                },
	                error: reject,
	                complete: resolve,
	            });
	            _this.subscribe(subscriber);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        var _a;
	        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
	    };
	    Observable.prototype[observable_1.observable] = function () {
	        return this;
	    };
	    Observable.prototype.pipe = function () {
	        var operations = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            operations[_i] = arguments[_i];
	        }
	        return pipe_1.pipeFromArray(operations)(this);
	    };
	    Observable.prototype.toPromise = function (promiseCtor) {
	        var _this = this;
	        promiseCtor = getPromiseCtor(promiseCtor);
	        return new promiseCtor(function (resolve, reject) {
	            var value;
	            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
	        });
	    };
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	Observable.Observable = Observable$1;
	function getPromiseCtor(promiseCtor) {
	    var _a;
	    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config_1.config.Promise) !== null && _a !== void 0 ? _a : Promise;
	}
	function isObserver(value) {
	    return value && isFunction_1.isFunction(value.next) && isFunction_1.isFunction(value.error) && isFunction_1.isFunction(value.complete);
	}
	function isSubscriber(value) {
	    return (value && value instanceof Subscriber_1.Subscriber) || (isObserver(value) && Subscription_1.isSubscription(value));
	}
	
	return Observable;
}

var ConnectableObservable = {};

var refCount = {};

var lift = {};

var hasRequiredLift;

function requireLift () {
	if (hasRequiredLift) return lift;
	hasRequiredLift = 1;
	Object.defineProperty(lift, "__esModule", { value: true });
	lift.operate = lift.hasLift = void 0;
	var isFunction_1 = requireIsFunction();
	function hasLift(source) {
	    return isFunction_1.isFunction(source === null || source === void 0 ? void 0 : source.lift);
	}
	lift.hasLift = hasLift;
	function operate(init) {
	    return function (source) {
	        if (hasLift(source)) {
	            return source.lift(function (liftedSource) {
	                try {
	                    return init(liftedSource, this);
	                }
	                catch (err) {
	                    this.error(err);
	                }
	            });
	        }
	        throw new TypeError('Unable to lift unknown Observable type');
	    };
	}
	lift.operate = operate;
	
	return lift;
}

var OperatorSubscriber = {};

var hasRequiredOperatorSubscriber;

function requireOperatorSubscriber () {
	if (hasRequiredOperatorSubscriber) return OperatorSubscriber;
	hasRequiredOperatorSubscriber = 1;
	var __extends = (OperatorSubscriber && OperatorSubscriber.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(OperatorSubscriber, "__esModule", { value: true });
	OperatorSubscriber.OperatorSubscriber = OperatorSubscriber.createOperatorSubscriber = void 0;
	var Subscriber_1 = requireSubscriber();
	function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
	    return new OperatorSubscriber$1(destination, onNext, onComplete, onError, onFinalize);
	}
	OperatorSubscriber.createOperatorSubscriber = createOperatorSubscriber;
	var OperatorSubscriber$1 = (function (_super) {
	    __extends(OperatorSubscriber, _super);
	    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
	        var _this = _super.call(this, destination) || this;
	        _this.onFinalize = onFinalize;
	        _this.shouldUnsubscribe = shouldUnsubscribe;
	        _this._next = onNext
	            ? function (value) {
	                try {
	                    onNext(value);
	                }
	                catch (err) {
	                    destination.error(err);
	                }
	            }
	            : _super.prototype._next;
	        _this._error = onError
	            ? function (err) {
	                try {
	                    onError(err);
	                }
	                catch (err) {
	                    destination.error(err);
	                }
	                finally {
	                    this.unsubscribe();
	                }
	            }
	            : _super.prototype._error;
	        _this._complete = onComplete
	            ? function () {
	                try {
	                    onComplete();
	                }
	                catch (err) {
	                    destination.error(err);
	                }
	                finally {
	                    this.unsubscribe();
	                }
	            }
	            : _super.prototype._complete;
	        return _this;
	    }
	    OperatorSubscriber.prototype.unsubscribe = function () {
	        var _a;
	        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
	            var closed_1 = this.closed;
	            _super.prototype.unsubscribe.call(this);
	            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
	        }
	    };
	    return OperatorSubscriber;
	}(Subscriber_1.Subscriber));
	OperatorSubscriber.OperatorSubscriber = OperatorSubscriber$1;
	
	return OperatorSubscriber;
}

var hasRequiredRefCount;

function requireRefCount () {
	if (hasRequiredRefCount) return refCount;
	hasRequiredRefCount = 1;
	Object.defineProperty(refCount, "__esModule", { value: true });
	refCount.refCount = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function refCount$1() {
	    return lift_1.operate(function (source, subscriber) {
	        var connection = null;
	        source._refCount++;
	        var refCounter = OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, undefined, undefined, function () {
	            if (!source || source._refCount <= 0 || 0 < --source._refCount) {
	                connection = null;
	                return;
	            }
	            var sharedConnection = source._connection;
	            var conn = connection;
	            connection = null;
	            if (sharedConnection && (!conn || sharedConnection === conn)) {
	                sharedConnection.unsubscribe();
	            }
	            subscriber.unsubscribe();
	        });
	        source.subscribe(refCounter);
	        if (!refCounter.closed) {
	            connection = source.connect();
	        }
	    });
	}
	refCount.refCount = refCount$1;
	
	return refCount;
}

var hasRequiredConnectableObservable;

function requireConnectableObservable () {
	if (hasRequiredConnectableObservable) return ConnectableObservable;
	hasRequiredConnectableObservable = 1;
	var __extends = (ConnectableObservable && ConnectableObservable.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(ConnectableObservable, "__esModule", { value: true });
	ConnectableObservable.ConnectableObservable = void 0;
	var Observable_1 = requireObservable();
	var Subscription_1 = requireSubscription();
	var refCount_1 = requireRefCount();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var lift_1 = requireLift();
	var ConnectableObservable$1 = (function (_super) {
	    __extends(ConnectableObservable, _super);
	    function ConnectableObservable(source, subjectFactory) {
	        var _this = _super.call(this) || this;
	        _this.source = source;
	        _this.subjectFactory = subjectFactory;
	        _this._subject = null;
	        _this._refCount = 0;
	        _this._connection = null;
	        if (lift_1.hasLift(source)) {
	            _this.lift = source.lift;
	        }
	        return _this;
	    }
	    ConnectableObservable.prototype._subscribe = function (subscriber) {
	        return this.getSubject().subscribe(subscriber);
	    };
	    ConnectableObservable.prototype.getSubject = function () {
	        var subject = this._subject;
	        if (!subject || subject.isStopped) {
	            this._subject = this.subjectFactory();
	        }
	        return this._subject;
	    };
	    ConnectableObservable.prototype._teardown = function () {
	        this._refCount = 0;
	        var _connection = this._connection;
	        this._subject = this._connection = null;
	        _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
	    };
	    ConnectableObservable.prototype.connect = function () {
	        var _this = this;
	        var connection = this._connection;
	        if (!connection) {
	            connection = this._connection = new Subscription_1.Subscription();
	            var subject_1 = this.getSubject();
	            connection.add(this.source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subject_1, undefined, function () {
	                _this._teardown();
	                subject_1.complete();
	            }, function (err) {
	                _this._teardown();
	                subject_1.error(err);
	            }, function () { return _this._teardown(); })));
	            if (connection.closed) {
	                this._connection = null;
	                connection = Subscription_1.Subscription.EMPTY;
	            }
	        }
	        return connection;
	    };
	    ConnectableObservable.prototype.refCount = function () {
	        return refCount_1.refCount()(this);
	    };
	    return ConnectableObservable;
	}(Observable_1.Observable));
	ConnectableObservable.ConnectableObservable = ConnectableObservable$1;
	
	return ConnectableObservable;
}

var animationFrames = {};

var performanceTimestampProvider = {};

var hasRequiredPerformanceTimestampProvider;

function requirePerformanceTimestampProvider () {
	if (hasRequiredPerformanceTimestampProvider) return performanceTimestampProvider;
	hasRequiredPerformanceTimestampProvider = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.performanceTimestampProvider = void 0;
		exports.performanceTimestampProvider = {
		    now: function () {
		        return (exports.performanceTimestampProvider.delegate || performance).now();
		    },
		    delegate: undefined,
		};
		
	} (performanceTimestampProvider));
	return performanceTimestampProvider;
}

var animationFrameProvider = {};

var hasRequiredAnimationFrameProvider;

function requireAnimationFrameProvider () {
	if (hasRequiredAnimationFrameProvider) return animationFrameProvider;
	hasRequiredAnimationFrameProvider = 1;
	(function (exports) {
		var __read = (animationFrameProvider && animationFrameProvider.__read) || function (o, n) {
		    var m = typeof Symbol === "function" && o[Symbol.iterator];
		    if (!m) return o;
		    var i = m.call(o), r, ar = [], e;
		    try {
		        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
		    }
		    catch (error) { e = { error: error }; }
		    finally {
		        try {
		            if (r && !r.done && (m = i["return"])) m.call(i);
		        }
		        finally { if (e) throw e.error; }
		    }
		    return ar;
		};
		var __spreadArray = (animationFrameProvider && animationFrameProvider.__spreadArray) || function (to, from) {
		    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
		        to[j] = from[i];
		    return to;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.animationFrameProvider = void 0;
		var Subscription_1 = requireSubscription();
		exports.animationFrameProvider = {
		    schedule: function (callback) {
		        var request = requestAnimationFrame;
		        var cancel = cancelAnimationFrame;
		        var delegate = exports.animationFrameProvider.delegate;
		        if (delegate) {
		            request = delegate.requestAnimationFrame;
		            cancel = delegate.cancelAnimationFrame;
		        }
		        var handle = request(function (timestamp) {
		            cancel = undefined;
		            callback(timestamp);
		        });
		        return new Subscription_1.Subscription(function () { return cancel === null || cancel === void 0 ? void 0 : cancel(handle); });
		    },
		    requestAnimationFrame: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        var delegate = exports.animationFrameProvider.delegate;
		        return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
		    },
		    cancelAnimationFrame: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        var delegate = exports.animationFrameProvider.delegate;
		        return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
		    },
		    delegate: undefined,
		};
		
	} (animationFrameProvider));
	return animationFrameProvider;
}

var hasRequiredAnimationFrames;

function requireAnimationFrames () {
	if (hasRequiredAnimationFrames) return animationFrames;
	hasRequiredAnimationFrames = 1;
	Object.defineProperty(animationFrames, "__esModule", { value: true });
	animationFrames.animationFrames = void 0;
	var Observable_1 = requireObservable();
	var performanceTimestampProvider_1 = requirePerformanceTimestampProvider();
	var animationFrameProvider_1 = requireAnimationFrameProvider();
	function animationFrames$1(timestampProvider) {
	    return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
	}
	animationFrames.animationFrames = animationFrames$1;
	function animationFramesFactory(timestampProvider) {
	    return new Observable_1.Observable(function (subscriber) {
	        var provider = timestampProvider || performanceTimestampProvider_1.performanceTimestampProvider;
	        var start = provider.now();
	        var id = 0;
	        var run = function () {
	            if (!subscriber.closed) {
	                id = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function (timestamp) {
	                    id = 0;
	                    var now = provider.now();
	                    subscriber.next({
	                        timestamp: timestampProvider ? now : timestamp,
	                        elapsed: now - start,
	                    });
	                    run();
	                });
	            }
	        };
	        run();
	        return function () {
	            if (id) {
	                animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
	            }
	        };
	    });
	}
	var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();
	
	return animationFrames;
}

var Subject = {};

var ObjectUnsubscribedError = {};

var hasRequiredObjectUnsubscribedError;

function requireObjectUnsubscribedError () {
	if (hasRequiredObjectUnsubscribedError) return ObjectUnsubscribedError;
	hasRequiredObjectUnsubscribedError = 1;
	Object.defineProperty(ObjectUnsubscribedError, "__esModule", { value: true });
	ObjectUnsubscribedError.ObjectUnsubscribedError = void 0;
	var createErrorClass_1 = requireCreateErrorClass();
	ObjectUnsubscribedError.ObjectUnsubscribedError = createErrorClass_1.createErrorClass(function (_super) {
	    return function ObjectUnsubscribedErrorImpl() {
	        _super(this);
	        this.name = 'ObjectUnsubscribedError';
	        this.message = 'object unsubscribed';
	    };
	});
	
	return ObjectUnsubscribedError;
}

var hasRequiredSubject;

function requireSubject () {
	if (hasRequiredSubject) return Subject;
	hasRequiredSubject = 1;
	var __extends = (Subject && Subject.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __values = (Subject && Subject.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(Subject, "__esModule", { value: true });
	Subject.AnonymousSubject = Subject.Subject = void 0;
	var Observable_1 = requireObservable();
	var Subscription_1 = requireSubscription();
	var ObjectUnsubscribedError_1 = requireObjectUnsubscribedError();
	var arrRemove_1 = requireArrRemove();
	var errorContext_1 = requireErrorContext();
	var Subject$1 = (function (_super) {
	    __extends(Subject, _super);
	    function Subject() {
	        var _this = _super.call(this) || this;
	        _this.closed = false;
	        _this.currentObservers = null;
	        _this.observers = [];
	        _this.isStopped = false;
	        _this.hasError = false;
	        _this.thrownError = null;
	        return _this;
	    }
	    Subject.prototype.lift = function (operator) {
	        var subject = new AnonymousSubject(this, this);
	        subject.operator = operator;
	        return subject;
	    };
	    Subject.prototype._throwIfClosed = function () {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	    };
	    Subject.prototype.next = function (value) {
	        var _this = this;
	        errorContext_1.errorContext(function () {
	            var e_1, _a;
	            _this._throwIfClosed();
	            if (!_this.isStopped) {
	                if (!_this.currentObservers) {
	                    _this.currentObservers = Array.from(_this.observers);
	                }
	                try {
	                    for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
	                        var observer = _c.value;
	                        observer.next(value);
	                    }
	                }
	                catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                finally {
	                    try {
	                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                    }
	                    finally { if (e_1) throw e_1.error; }
	                }
	            }
	        });
	    };
	    Subject.prototype.error = function (err) {
	        var _this = this;
	        errorContext_1.errorContext(function () {
	            _this._throwIfClosed();
	            if (!_this.isStopped) {
	                _this.hasError = _this.isStopped = true;
	                _this.thrownError = err;
	                var observers = _this.observers;
	                while (observers.length) {
	                    observers.shift().error(err);
	                }
	            }
	        });
	    };
	    Subject.prototype.complete = function () {
	        var _this = this;
	        errorContext_1.errorContext(function () {
	            _this._throwIfClosed();
	            if (!_this.isStopped) {
	                _this.isStopped = true;
	                var observers = _this.observers;
	                while (observers.length) {
	                    observers.shift().complete();
	                }
	            }
	        });
	    };
	    Subject.prototype.unsubscribe = function () {
	        this.isStopped = this.closed = true;
	        this.observers = this.currentObservers = null;
	    };
	    Object.defineProperty(Subject.prototype, "observed", {
	        get: function () {
	            var _a;
	            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Subject.prototype._trySubscribe = function (subscriber) {
	        this._throwIfClosed();
	        return _super.prototype._trySubscribe.call(this, subscriber);
	    };
	    Subject.prototype._subscribe = function (subscriber) {
	        this._throwIfClosed();
	        this._checkFinalizedStatuses(subscriber);
	        return this._innerSubscribe(subscriber);
	    };
	    Subject.prototype._innerSubscribe = function (subscriber) {
	        var _this = this;
	        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
	        if (hasError || isStopped) {
	            return Subscription_1.EMPTY_SUBSCRIPTION;
	        }
	        this.currentObservers = null;
	        observers.push(subscriber);
	        return new Subscription_1.Subscription(function () {
	            _this.currentObservers = null;
	            arrRemove_1.arrRemove(observers, subscriber);
	        });
	    };
	    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
	        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
	        if (hasError) {
	            subscriber.error(thrownError);
	        }
	        else if (isStopped) {
	            subscriber.complete();
	        }
	    };
	    Subject.prototype.asObservable = function () {
	        var observable = new Observable_1.Observable();
	        observable.source = this;
	        return observable;
	    };
	    Subject.create = function (destination, source) {
	        return new AnonymousSubject(destination, source);
	    };
	    return Subject;
	}(Observable_1.Observable));
	Subject.Subject = Subject$1;
	var AnonymousSubject = (function (_super) {
	    __extends(AnonymousSubject, _super);
	    function AnonymousSubject(destination, source) {
	        var _this = _super.call(this) || this;
	        _this.destination = destination;
	        _this.source = source;
	        return _this;
	    }
	    AnonymousSubject.prototype.next = function (value) {
	        var _a, _b;
	        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
	    };
	    AnonymousSubject.prototype.error = function (err) {
	        var _a, _b;
	        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
	    };
	    AnonymousSubject.prototype.complete = function () {
	        var _a, _b;
	        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
	    };
	    AnonymousSubject.prototype._subscribe = function (subscriber) {
	        var _a, _b;
	        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : Subscription_1.EMPTY_SUBSCRIPTION;
	    };
	    return AnonymousSubject;
	}(Subject$1));
	Subject.AnonymousSubject = AnonymousSubject;
	
	return Subject;
}

var BehaviorSubject = {};

var hasRequiredBehaviorSubject;

function requireBehaviorSubject () {
	if (hasRequiredBehaviorSubject) return BehaviorSubject;
	hasRequiredBehaviorSubject = 1;
	var __extends = (BehaviorSubject && BehaviorSubject.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(BehaviorSubject, "__esModule", { value: true });
	BehaviorSubject.BehaviorSubject = void 0;
	var Subject_1 = requireSubject();
	var BehaviorSubject$1 = (function (_super) {
	    __extends(BehaviorSubject, _super);
	    function BehaviorSubject(_value) {
	        var _this = _super.call(this) || this;
	        _this._value = _value;
	        return _this;
	    }
	    Object.defineProperty(BehaviorSubject.prototype, "value", {
	        get: function () {
	            return this.getValue();
	        },
	        enumerable: false,
	        configurable: true
	    });
	    BehaviorSubject.prototype._subscribe = function (subscriber) {
	        var subscription = _super.prototype._subscribe.call(this, subscriber);
	        !subscription.closed && subscriber.next(this._value);
	        return subscription;
	    };
	    BehaviorSubject.prototype.getValue = function () {
	        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
	        if (hasError) {
	            throw thrownError;
	        }
	        this._throwIfClosed();
	        return _value;
	    };
	    BehaviorSubject.prototype.next = function (value) {
	        _super.prototype.next.call(this, (this._value = value));
	    };
	    return BehaviorSubject;
	}(Subject_1.Subject));
	BehaviorSubject.BehaviorSubject = BehaviorSubject$1;
	
	return BehaviorSubject;
}

var ReplaySubject = {};

var dateTimestampProvider = {};

var hasRequiredDateTimestampProvider;

function requireDateTimestampProvider () {
	if (hasRequiredDateTimestampProvider) return dateTimestampProvider;
	hasRequiredDateTimestampProvider = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.dateTimestampProvider = void 0;
		exports.dateTimestampProvider = {
		    now: function () {
		        return (exports.dateTimestampProvider.delegate || Date).now();
		    },
		    delegate: undefined,
		};
		
	} (dateTimestampProvider));
	return dateTimestampProvider;
}

var hasRequiredReplaySubject;

function requireReplaySubject () {
	if (hasRequiredReplaySubject) return ReplaySubject;
	hasRequiredReplaySubject = 1;
	var __extends = (ReplaySubject && ReplaySubject.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(ReplaySubject, "__esModule", { value: true });
	ReplaySubject.ReplaySubject = void 0;
	var Subject_1 = requireSubject();
	var dateTimestampProvider_1 = requireDateTimestampProvider();
	var ReplaySubject$1 = (function (_super) {
	    __extends(ReplaySubject, _super);
	    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
	        if (_bufferSize === void 0) { _bufferSize = Infinity; }
	        if (_windowTime === void 0) { _windowTime = Infinity; }
	        if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider_1.dateTimestampProvider; }
	        var _this = _super.call(this) || this;
	        _this._bufferSize = _bufferSize;
	        _this._windowTime = _windowTime;
	        _this._timestampProvider = _timestampProvider;
	        _this._buffer = [];
	        _this._infiniteTimeWindow = true;
	        _this._infiniteTimeWindow = _windowTime === Infinity;
	        _this._bufferSize = Math.max(1, _bufferSize);
	        _this._windowTime = Math.max(1, _windowTime);
	        return _this;
	    }
	    ReplaySubject.prototype.next = function (value) {
	        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
	        if (!isStopped) {
	            _buffer.push(value);
	            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
	        }
	        this._trimBuffer();
	        _super.prototype.next.call(this, value);
	    };
	    ReplaySubject.prototype._subscribe = function (subscriber) {
	        this._throwIfClosed();
	        this._trimBuffer();
	        var subscription = this._innerSubscribe(subscriber);
	        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
	        var copy = _buffer.slice();
	        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
	            subscriber.next(copy[i]);
	        }
	        this._checkFinalizedStatuses(subscriber);
	        return subscription;
	    };
	    ReplaySubject.prototype._trimBuffer = function () {
	        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
	        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
	        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
	        if (!_infiniteTimeWindow) {
	            var now = _timestampProvider.now();
	            var last = 0;
	            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
	                last = i;
	            }
	            last && _buffer.splice(0, last + 1);
	        }
	    };
	    return ReplaySubject;
	}(Subject_1.Subject));
	ReplaySubject.ReplaySubject = ReplaySubject$1;
	
	return ReplaySubject;
}

var AsyncSubject = {};

var hasRequiredAsyncSubject;

function requireAsyncSubject () {
	if (hasRequiredAsyncSubject) return AsyncSubject;
	hasRequiredAsyncSubject = 1;
	var __extends = (AsyncSubject && AsyncSubject.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AsyncSubject, "__esModule", { value: true });
	AsyncSubject.AsyncSubject = void 0;
	var Subject_1 = requireSubject();
	var AsyncSubject$1 = (function (_super) {
	    __extends(AsyncSubject, _super);
	    function AsyncSubject() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this._value = null;
	        _this._hasValue = false;
	        _this._isComplete = false;
	        return _this;
	    }
	    AsyncSubject.prototype._checkFinalizedStatuses = function (subscriber) {
	        var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
	        if (hasError) {
	            subscriber.error(thrownError);
	        }
	        else if (isStopped || _isComplete) {
	            _hasValue && subscriber.next(_value);
	            subscriber.complete();
	        }
	    };
	    AsyncSubject.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._value = value;
	            this._hasValue = true;
	        }
	    };
	    AsyncSubject.prototype.complete = function () {
	        var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
	        if (!_isComplete) {
	            this._isComplete = true;
	            _hasValue && _super.prototype.next.call(this, _value);
	            _super.prototype.complete.call(this);
	        }
	    };
	    return AsyncSubject;
	}(Subject_1.Subject));
	AsyncSubject.AsyncSubject = AsyncSubject$1;
	
	return AsyncSubject;
}

var asap = {};

var AsapAction = {};

var AsyncAction = {};

var Action = {};

var hasRequiredAction;

function requireAction () {
	if (hasRequiredAction) return Action;
	hasRequiredAction = 1;
	var __extends = (Action && Action.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(Action, "__esModule", { value: true });
	Action.Action = void 0;
	var Subscription_1 = requireSubscription();
	var Action$1 = (function (_super) {
	    __extends(Action, _super);
	    function Action(scheduler, work) {
	        return _super.call(this) || this;
	    }
	    Action.prototype.schedule = function (state, delay) {
	        return this;
	    };
	    return Action;
	}(Subscription_1.Subscription));
	Action.Action = Action$1;
	
	return Action;
}

var intervalProvider = {};

var hasRequiredIntervalProvider;

function requireIntervalProvider () {
	if (hasRequiredIntervalProvider) return intervalProvider;
	hasRequiredIntervalProvider = 1;
	(function (exports) {
		var __read = (intervalProvider && intervalProvider.__read) || function (o, n) {
		    var m = typeof Symbol === "function" && o[Symbol.iterator];
		    if (!m) return o;
		    var i = m.call(o), r, ar = [], e;
		    try {
		        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
		    }
		    catch (error) { e = { error: error }; }
		    finally {
		        try {
		            if (r && !r.done && (m = i["return"])) m.call(i);
		        }
		        finally { if (e) throw e.error; }
		    }
		    return ar;
		};
		var __spreadArray = (intervalProvider && intervalProvider.__spreadArray) || function (to, from) {
		    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
		        to[j] = from[i];
		    return to;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.intervalProvider = void 0;
		exports.intervalProvider = {
		    setInterval: function (handler, timeout) {
		        var args = [];
		        for (var _i = 2; _i < arguments.length; _i++) {
		            args[_i - 2] = arguments[_i];
		        }
		        var delegate = exports.intervalProvider.delegate;
		        if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
		            return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
		        }
		        return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
		    },
		    clearInterval: function (handle) {
		        var delegate = exports.intervalProvider.delegate;
		        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
		    },
		    delegate: undefined,
		};
		
	} (intervalProvider));
	return intervalProvider;
}

var hasRequiredAsyncAction;

function requireAsyncAction () {
	if (hasRequiredAsyncAction) return AsyncAction;
	hasRequiredAsyncAction = 1;
	var __extends = (AsyncAction && AsyncAction.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AsyncAction, "__esModule", { value: true });
	AsyncAction.AsyncAction = void 0;
	var Action_1 = requireAction();
	var intervalProvider_1 = requireIntervalProvider();
	var arrRemove_1 = requireArrRemove();
	var AsyncAction$1 = (function (_super) {
	    __extends(AsyncAction, _super);
	    function AsyncAction(scheduler, work) {
	        var _this = _super.call(this, scheduler, work) || this;
	        _this.scheduler = scheduler;
	        _this.work = work;
	        _this.pending = false;
	        return _this;
	    }
	    AsyncAction.prototype.schedule = function (state, delay) {
	        var _a;
	        if (delay === void 0) { delay = 0; }
	        if (this.closed) {
	            return this;
	        }
	        this.state = state;
	        var id = this.id;
	        var scheduler = this.scheduler;
	        if (id != null) {
	            this.id = this.recycleAsyncId(scheduler, id, delay);
	        }
	        this.pending = true;
	        this.delay = delay;
	        this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
	        return this;
	    };
	    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
	        if (delay === void 0) { delay = 0; }
	        return intervalProvider_1.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
	    };
	    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (delay != null && this.delay === delay && this.pending === false) {
	            return id;
	        }
	        if (id != null) {
	            intervalProvider_1.intervalProvider.clearInterval(id);
	        }
	        return undefined;
	    };
	    AsyncAction.prototype.execute = function (state, delay) {
	        if (this.closed) {
	            return new Error('executing a cancelled action');
	        }
	        this.pending = false;
	        var error = this._execute(state, delay);
	        if (error) {
	            return error;
	        }
	        else if (this.pending === false && this.id != null) {
	            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
	        }
	    };
	    AsyncAction.prototype._execute = function (state, _delay) {
	        var errored = false;
	        var errorValue;
	        try {
	            this.work(state);
	        }
	        catch (e) {
	            errored = true;
	            errorValue = e ? e : new Error('Scheduled action threw falsy error');
	        }
	        if (errored) {
	            this.unsubscribe();
	            return errorValue;
	        }
	    };
	    AsyncAction.prototype.unsubscribe = function () {
	        if (!this.closed) {
	            var _a = this, id = _a.id, scheduler = _a.scheduler;
	            var actions = scheduler.actions;
	            this.work = this.state = this.scheduler = null;
	            this.pending = false;
	            arrRemove_1.arrRemove(actions, this);
	            if (id != null) {
	                this.id = this.recycleAsyncId(scheduler, id, null);
	            }
	            this.delay = null;
	            _super.prototype.unsubscribe.call(this);
	        }
	    };
	    return AsyncAction;
	}(Action_1.Action));
	AsyncAction.AsyncAction = AsyncAction$1;
	
	return AsyncAction;
}

var immediateProvider = {};

var Immediate = {};

var hasRequiredImmediate;

function requireImmediate () {
	if (hasRequiredImmediate) return Immediate;
	hasRequiredImmediate = 1;
	Object.defineProperty(Immediate, "__esModule", { value: true });
	Immediate.TestTools = Immediate.Immediate = void 0;
	var nextHandle = 1;
	var resolved;
	var activeHandles = {};
	function findAndClearHandle(handle) {
	    if (handle in activeHandles) {
	        delete activeHandles[handle];
	        return true;
	    }
	    return false;
	}
	Immediate.Immediate = {
	    setImmediate: function (cb) {
	        var handle = nextHandle++;
	        activeHandles[handle] = true;
	        if (!resolved) {
	            resolved = Promise.resolve();
	        }
	        resolved.then(function () { return findAndClearHandle(handle) && cb(); });
	        return handle;
	    },
	    clearImmediate: function (handle) {
	        findAndClearHandle(handle);
	    },
	};
	Immediate.TestTools = {
	    pending: function () {
	        return Object.keys(activeHandles).length;
	    }
	};
	
	return Immediate;
}

var hasRequiredImmediateProvider;

function requireImmediateProvider () {
	if (hasRequiredImmediateProvider) return immediateProvider;
	hasRequiredImmediateProvider = 1;
	(function (exports) {
		var __read = (immediateProvider && immediateProvider.__read) || function (o, n) {
		    var m = typeof Symbol === "function" && o[Symbol.iterator];
		    if (!m) return o;
		    var i = m.call(o), r, ar = [], e;
		    try {
		        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
		    }
		    catch (error) { e = { error: error }; }
		    finally {
		        try {
		            if (r && !r.done && (m = i["return"])) m.call(i);
		        }
		        finally { if (e) throw e.error; }
		    }
		    return ar;
		};
		var __spreadArray = (immediateProvider && immediateProvider.__spreadArray) || function (to, from) {
		    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
		        to[j] = from[i];
		    return to;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.immediateProvider = void 0;
		var Immediate_1 = requireImmediate();
		var setImmediate = Immediate_1.Immediate.setImmediate, clearImmediate = Immediate_1.Immediate.clearImmediate;
		exports.immediateProvider = {
		    setImmediate: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        var delegate = exports.immediateProvider.delegate;
		        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
		    },
		    clearImmediate: function (handle) {
		        var delegate = exports.immediateProvider.delegate;
		        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
		    },
		    delegate: undefined,
		};
		
	} (immediateProvider));
	return immediateProvider;
}

var hasRequiredAsapAction;

function requireAsapAction () {
	if (hasRequiredAsapAction) return AsapAction;
	hasRequiredAsapAction = 1;
	var __extends = (AsapAction && AsapAction.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AsapAction, "__esModule", { value: true });
	AsapAction.AsapAction = void 0;
	var AsyncAction_1 = requireAsyncAction();
	var immediateProvider_1 = requireImmediateProvider();
	var AsapAction$1 = (function (_super) {
	    __extends(AsapAction, _super);
	    function AsapAction(scheduler, work) {
	        var _this = _super.call(this, scheduler, work) || this;
	        _this.scheduler = scheduler;
	        _this.work = work;
	        return _this;
	    }
	    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (delay !== null && delay > 0) {
	            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	        }
	        scheduler.actions.push(this);
	        return scheduler._scheduled || (scheduler._scheduled = immediateProvider_1.immediateProvider.setImmediate(scheduler.flush.bind(scheduler, undefined)));
	    };
	    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        var _a;
	        if (delay === void 0) { delay = 0; }
	        if (delay != null ? delay > 0 : this.delay > 0) {
	            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
	        }
	        var actions = scheduler.actions;
	        if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
	            immediateProvider_1.immediateProvider.clearImmediate(id);
	            if (scheduler._scheduled === id) {
	                scheduler._scheduled = undefined;
	            }
	        }
	        return undefined;
	    };
	    return AsapAction;
	}(AsyncAction_1.AsyncAction));
	AsapAction.AsapAction = AsapAction$1;
	
	return AsapAction;
}

var AsapScheduler = {};

var AsyncScheduler = {};

var Scheduler = {};

var hasRequiredScheduler;

function requireScheduler () {
	if (hasRequiredScheduler) return Scheduler;
	hasRequiredScheduler = 1;
	Object.defineProperty(Scheduler, "__esModule", { value: true });
	Scheduler.Scheduler = void 0;
	var dateTimestampProvider_1 = requireDateTimestampProvider();
	var Scheduler$1 = (function () {
	    function Scheduler(schedulerActionCtor, now) {
	        if (now === void 0) { now = Scheduler.now; }
	        this.schedulerActionCtor = schedulerActionCtor;
	        this.now = now;
	    }
	    Scheduler.prototype.schedule = function (work, delay, state) {
	        if (delay === void 0) { delay = 0; }
	        return new this.schedulerActionCtor(this, work).schedule(state, delay);
	    };
	    Scheduler.now = dateTimestampProvider_1.dateTimestampProvider.now;
	    return Scheduler;
	}());
	Scheduler.Scheduler = Scheduler$1;
	
	return Scheduler;
}

var hasRequiredAsyncScheduler;

function requireAsyncScheduler () {
	if (hasRequiredAsyncScheduler) return AsyncScheduler;
	hasRequiredAsyncScheduler = 1;
	var __extends = (AsyncScheduler && AsyncScheduler.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AsyncScheduler, "__esModule", { value: true });
	AsyncScheduler.AsyncScheduler = void 0;
	var Scheduler_1 = requireScheduler();
	var AsyncScheduler$1 = (function (_super) {
	    __extends(AsyncScheduler, _super);
	    function AsyncScheduler(SchedulerAction, now) {
	        if (now === void 0) { now = Scheduler_1.Scheduler.now; }
	        var _this = _super.call(this, SchedulerAction, now) || this;
	        _this.actions = [];
	        _this._active = false;
	        return _this;
	    }
	    AsyncScheduler.prototype.flush = function (action) {
	        var actions = this.actions;
	        if (this._active) {
	            actions.push(action);
	            return;
	        }
	        var error;
	        this._active = true;
	        do {
	            if ((error = action.execute(action.state, action.delay))) {
	                break;
	            }
	        } while ((action = actions.shift()));
	        this._active = false;
	        if (error) {
	            while ((action = actions.shift())) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    return AsyncScheduler;
	}(Scheduler_1.Scheduler));
	AsyncScheduler.AsyncScheduler = AsyncScheduler$1;
	
	return AsyncScheduler;
}

var hasRequiredAsapScheduler;

function requireAsapScheduler () {
	if (hasRequiredAsapScheduler) return AsapScheduler;
	hasRequiredAsapScheduler = 1;
	var __extends = (AsapScheduler && AsapScheduler.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AsapScheduler, "__esModule", { value: true });
	AsapScheduler.AsapScheduler = void 0;
	var AsyncScheduler_1 = requireAsyncScheduler();
	var AsapScheduler$1 = (function (_super) {
	    __extends(AsapScheduler, _super);
	    function AsapScheduler() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    AsapScheduler.prototype.flush = function (action) {
	        this._active = true;
	        var flushId = this._scheduled;
	        this._scheduled = undefined;
	        var actions = this.actions;
	        var error;
	        action = action || actions.shift();
	        do {
	            if ((error = action.execute(action.state, action.delay))) {
	                break;
	            }
	        } while ((action = actions[0]) && action.id === flushId && actions.shift());
	        this._active = false;
	        if (error) {
	            while ((action = actions[0]) && action.id === flushId && actions.shift()) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    return AsapScheduler;
	}(AsyncScheduler_1.AsyncScheduler));
	AsapScheduler.AsapScheduler = AsapScheduler$1;
	
	return AsapScheduler;
}

var hasRequiredAsap;

function requireAsap () {
	if (hasRequiredAsap) return asap;
	hasRequiredAsap = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.asap = exports.asapScheduler = void 0;
		var AsapAction_1 = requireAsapAction();
		var AsapScheduler_1 = requireAsapScheduler();
		exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
		exports.asap = exports.asapScheduler;
		
	} (asap));
	return asap;
}

var async = {};

var hasRequiredAsync;

function requireAsync () {
	if (hasRequiredAsync) return async;
	hasRequiredAsync = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.async = exports.asyncScheduler = void 0;
		var AsyncAction_1 = requireAsyncAction();
		var AsyncScheduler_1 = requireAsyncScheduler();
		exports.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
		exports.async = exports.asyncScheduler;
		
	} (async));
	return async;
}

var queue = {};

var QueueAction = {};

var hasRequiredQueueAction;

function requireQueueAction () {
	if (hasRequiredQueueAction) return QueueAction;
	hasRequiredQueueAction = 1;
	var __extends = (QueueAction && QueueAction.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(QueueAction, "__esModule", { value: true });
	QueueAction.QueueAction = void 0;
	var AsyncAction_1 = requireAsyncAction();
	var QueueAction$1 = (function (_super) {
	    __extends(QueueAction, _super);
	    function QueueAction(scheduler, work) {
	        var _this = _super.call(this, scheduler, work) || this;
	        _this.scheduler = scheduler;
	        _this.work = work;
	        return _this;
	    }
	    QueueAction.prototype.schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (delay > 0) {
	            return _super.prototype.schedule.call(this, state, delay);
	        }
	        this.delay = delay;
	        this.state = state;
	        this.scheduler.flush(this);
	        return this;
	    };
	    QueueAction.prototype.execute = function (state, delay) {
	        return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
	    };
	    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
	            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	        }
	        scheduler.flush(this);
	        return 0;
	    };
	    return QueueAction;
	}(AsyncAction_1.AsyncAction));
	QueueAction.QueueAction = QueueAction$1;
	
	return QueueAction;
}

var QueueScheduler = {};

var hasRequiredQueueScheduler;

function requireQueueScheduler () {
	if (hasRequiredQueueScheduler) return QueueScheduler;
	hasRequiredQueueScheduler = 1;
	var __extends = (QueueScheduler && QueueScheduler.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(QueueScheduler, "__esModule", { value: true });
	QueueScheduler.QueueScheduler = void 0;
	var AsyncScheduler_1 = requireAsyncScheduler();
	var QueueScheduler$1 = (function (_super) {
	    __extends(QueueScheduler, _super);
	    function QueueScheduler() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return QueueScheduler;
	}(AsyncScheduler_1.AsyncScheduler));
	QueueScheduler.QueueScheduler = QueueScheduler$1;
	
	return QueueScheduler;
}

var hasRequiredQueue;

function requireQueue () {
	if (hasRequiredQueue) return queue;
	hasRequiredQueue = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.queue = exports.queueScheduler = void 0;
		var QueueAction_1 = requireQueueAction();
		var QueueScheduler_1 = requireQueueScheduler();
		exports.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
		exports.queue = exports.queueScheduler;
		
	} (queue));
	return queue;
}

var animationFrame = {};

var AnimationFrameAction = {};

var hasRequiredAnimationFrameAction;

function requireAnimationFrameAction () {
	if (hasRequiredAnimationFrameAction) return AnimationFrameAction;
	hasRequiredAnimationFrameAction = 1;
	var __extends = (AnimationFrameAction && AnimationFrameAction.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AnimationFrameAction, "__esModule", { value: true });
	AnimationFrameAction.AnimationFrameAction = void 0;
	var AsyncAction_1 = requireAsyncAction();
	var animationFrameProvider_1 = requireAnimationFrameProvider();
	var AnimationFrameAction$1 = (function (_super) {
	    __extends(AnimationFrameAction, _super);
	    function AnimationFrameAction(scheduler, work) {
	        var _this = _super.call(this, scheduler, work) || this;
	        _this.scheduler = scheduler;
	        _this.work = work;
	        return _this;
	    }
	    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (delay !== null && delay > 0) {
	            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	        }
	        scheduler.actions.push(this);
	        return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function () { return scheduler.flush(undefined); }));
	    };
	    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        var _a;
	        if (delay === void 0) { delay = 0; }
	        if (delay != null ? delay > 0 : this.delay > 0) {
	            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
	        }
	        var actions = scheduler.actions;
	        if (id != null && id === scheduler._scheduled && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
	            animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
	            scheduler._scheduled = undefined;
	        }
	        return undefined;
	    };
	    return AnimationFrameAction;
	}(AsyncAction_1.AsyncAction));
	AnimationFrameAction.AnimationFrameAction = AnimationFrameAction$1;
	
	return AnimationFrameAction;
}

var AnimationFrameScheduler = {};

var hasRequiredAnimationFrameScheduler;

function requireAnimationFrameScheduler () {
	if (hasRequiredAnimationFrameScheduler) return AnimationFrameScheduler;
	hasRequiredAnimationFrameScheduler = 1;
	var __extends = (AnimationFrameScheduler && AnimationFrameScheduler.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(AnimationFrameScheduler, "__esModule", { value: true });
	AnimationFrameScheduler.AnimationFrameScheduler = void 0;
	var AsyncScheduler_1 = requireAsyncScheduler();
	var AnimationFrameScheduler$1 = (function (_super) {
	    __extends(AnimationFrameScheduler, _super);
	    function AnimationFrameScheduler() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    AnimationFrameScheduler.prototype.flush = function (action) {
	        this._active = true;
	        var flushId;
	        if (action) {
	            flushId = action.id;
	        }
	        else {
	            flushId = this._scheduled;
	            this._scheduled = undefined;
	        }
	        var actions = this.actions;
	        var error;
	        action = action || actions.shift();
	        do {
	            if ((error = action.execute(action.state, action.delay))) {
	                break;
	            }
	        } while ((action = actions[0]) && action.id === flushId && actions.shift());
	        this._active = false;
	        if (error) {
	            while ((action = actions[0]) && action.id === flushId && actions.shift()) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    return AnimationFrameScheduler;
	}(AsyncScheduler_1.AsyncScheduler));
	AnimationFrameScheduler.AnimationFrameScheduler = AnimationFrameScheduler$1;
	
	return AnimationFrameScheduler;
}

var hasRequiredAnimationFrame;

function requireAnimationFrame () {
	if (hasRequiredAnimationFrame) return animationFrame;
	hasRequiredAnimationFrame = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.animationFrame = exports.animationFrameScheduler = void 0;
		var AnimationFrameAction_1 = requireAnimationFrameAction();
		var AnimationFrameScheduler_1 = requireAnimationFrameScheduler();
		exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
		exports.animationFrame = exports.animationFrameScheduler;
		
	} (animationFrame));
	return animationFrame;
}

var VirtualTimeScheduler = {};

var hasRequiredVirtualTimeScheduler;

function requireVirtualTimeScheduler () {
	if (hasRequiredVirtualTimeScheduler) return VirtualTimeScheduler;
	hasRequiredVirtualTimeScheduler = 1;
	var __extends = (VirtualTimeScheduler && VirtualTimeScheduler.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(VirtualTimeScheduler, "__esModule", { value: true });
	VirtualTimeScheduler.VirtualAction = VirtualTimeScheduler.VirtualTimeScheduler = void 0;
	var AsyncAction_1 = requireAsyncAction();
	var Subscription_1 = requireSubscription();
	var AsyncScheduler_1 = requireAsyncScheduler();
	var VirtualTimeScheduler$1 = (function (_super) {
	    __extends(VirtualTimeScheduler, _super);
	    function VirtualTimeScheduler(schedulerActionCtor, maxFrames) {
	        if (schedulerActionCtor === void 0) { schedulerActionCtor = VirtualAction; }
	        if (maxFrames === void 0) { maxFrames = Infinity; }
	        var _this = _super.call(this, schedulerActionCtor, function () { return _this.frame; }) || this;
	        _this.maxFrames = maxFrames;
	        _this.frame = 0;
	        _this.index = -1;
	        return _this;
	    }
	    VirtualTimeScheduler.prototype.flush = function () {
	        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
	        var error;
	        var action;
	        while ((action = actions[0]) && action.delay <= maxFrames) {
	            actions.shift();
	            this.frame = action.delay;
	            if ((error = action.execute(action.state, action.delay))) {
	                break;
	            }
	        }
	        if (error) {
	            while ((action = actions.shift())) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    VirtualTimeScheduler.frameTimeFactor = 10;
	    return VirtualTimeScheduler;
	}(AsyncScheduler_1.AsyncScheduler));
	VirtualTimeScheduler.VirtualTimeScheduler = VirtualTimeScheduler$1;
	var VirtualAction = (function (_super) {
	    __extends(VirtualAction, _super);
	    function VirtualAction(scheduler, work, index) {
	        if (index === void 0) { index = (scheduler.index += 1); }
	        var _this = _super.call(this, scheduler, work) || this;
	        _this.scheduler = scheduler;
	        _this.work = work;
	        _this.index = index;
	        _this.active = true;
	        _this.index = scheduler.index = index;
	        return _this;
	    }
	    VirtualAction.prototype.schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (Number.isFinite(delay)) {
	            if (!this.id) {
	                return _super.prototype.schedule.call(this, state, delay);
	            }
	            this.active = false;
	            var action = new VirtualAction(this.scheduler, this.work);
	            this.add(action);
	            return action.schedule(state, delay);
	        }
	        else {
	            return Subscription_1.Subscription.EMPTY;
	        }
	    };
	    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        this.delay = scheduler.frame + delay;
	        var actions = scheduler.actions;
	        actions.push(this);
	        actions.sort(VirtualAction.sortActions);
	        return 1;
	    };
	    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        return undefined;
	    };
	    VirtualAction.prototype._execute = function (state, delay) {
	        if (this.active === true) {
	            return _super.prototype._execute.call(this, state, delay);
	        }
	    };
	    VirtualAction.sortActions = function (a, b) {
	        if (a.delay === b.delay) {
	            if (a.index === b.index) {
	                return 0;
	            }
	            else if (a.index > b.index) {
	                return 1;
	            }
	            else {
	                return -1;
	            }
	        }
	        else if (a.delay > b.delay) {
	            return 1;
	        }
	        else {
	            return -1;
	        }
	    };
	    return VirtualAction;
	}(AsyncAction_1.AsyncAction));
	VirtualTimeScheduler.VirtualAction = VirtualAction;
	
	return VirtualTimeScheduler;
}

var Notification = {};

var empty = {};

var hasRequiredEmpty;

function requireEmpty () {
	if (hasRequiredEmpty) return empty;
	hasRequiredEmpty = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.empty = exports.EMPTY = void 0;
		var Observable_1 = requireObservable();
		exports.EMPTY = new Observable_1.Observable(function (subscriber) { return subscriber.complete(); });
		function empty(scheduler) {
		    return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
		}
		exports.empty = empty;
		function emptyScheduled(scheduler) {
		    return new Observable_1.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
		}
		
	} (empty));
	return empty;
}

var of = {};

var args = {};

var isScheduler = {};

var hasRequiredIsScheduler;

function requireIsScheduler () {
	if (hasRequiredIsScheduler) return isScheduler;
	hasRequiredIsScheduler = 1;
	Object.defineProperty(isScheduler, "__esModule", { value: true });
	isScheduler.isScheduler = void 0;
	var isFunction_1 = requireIsFunction();
	function isScheduler$1(value) {
	    return value && isFunction_1.isFunction(value.schedule);
	}
	isScheduler.isScheduler = isScheduler$1;
	
	return isScheduler;
}

var hasRequiredArgs;

function requireArgs () {
	if (hasRequiredArgs) return args;
	hasRequiredArgs = 1;
	Object.defineProperty(args, "__esModule", { value: true });
	args.popNumber = args.popScheduler = args.popResultSelector = void 0;
	var isFunction_1 = requireIsFunction();
	var isScheduler_1 = requireIsScheduler();
	function last(arr) {
	    return arr[arr.length - 1];
	}
	function popResultSelector(args) {
	    return isFunction_1.isFunction(last(args)) ? args.pop() : undefined;
	}
	args.popResultSelector = popResultSelector;
	function popScheduler(args) {
	    return isScheduler_1.isScheduler(last(args)) ? args.pop() : undefined;
	}
	args.popScheduler = popScheduler;
	function popNumber(args, defaultValue) {
	    return typeof last(args) === 'number' ? args.pop() : defaultValue;
	}
	args.popNumber = popNumber;
	
	return args;
}

var from = {};

var scheduled = {};

var scheduleObservable = {};

var innerFrom = {};

var isArrayLike = {};

var hasRequiredIsArrayLike;

function requireIsArrayLike () {
	if (hasRequiredIsArrayLike) return isArrayLike;
	hasRequiredIsArrayLike = 1;
	Object.defineProperty(isArrayLike, "__esModule", { value: true });
	isArrayLike.isArrayLike = void 0;
	isArrayLike.isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
	
	return isArrayLike;
}

var isPromise = {};

var hasRequiredIsPromise;

function requireIsPromise () {
	if (hasRequiredIsPromise) return isPromise;
	hasRequiredIsPromise = 1;
	Object.defineProperty(isPromise, "__esModule", { value: true });
	isPromise.isPromise = void 0;
	var isFunction_1 = requireIsFunction();
	function isPromise$1(value) {
	    return isFunction_1.isFunction(value === null || value === void 0 ? void 0 : value.then);
	}
	isPromise.isPromise = isPromise$1;
	
	return isPromise;
}

var isInteropObservable = {};

var hasRequiredIsInteropObservable;

function requireIsInteropObservable () {
	if (hasRequiredIsInteropObservable) return isInteropObservable;
	hasRequiredIsInteropObservable = 1;
	Object.defineProperty(isInteropObservable, "__esModule", { value: true });
	isInteropObservable.isInteropObservable = void 0;
	var observable_1 = requireObservable$1();
	var isFunction_1 = requireIsFunction();
	function isInteropObservable$1(input) {
	    return isFunction_1.isFunction(input[observable_1.observable]);
	}
	isInteropObservable.isInteropObservable = isInteropObservable$1;
	
	return isInteropObservable;
}

var isAsyncIterable = {};

var hasRequiredIsAsyncIterable;

function requireIsAsyncIterable () {
	if (hasRequiredIsAsyncIterable) return isAsyncIterable;
	hasRequiredIsAsyncIterable = 1;
	Object.defineProperty(isAsyncIterable, "__esModule", { value: true });
	isAsyncIterable.isAsyncIterable = void 0;
	var isFunction_1 = requireIsFunction();
	function isAsyncIterable$1(obj) {
	    return Symbol.asyncIterator && isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
	}
	isAsyncIterable.isAsyncIterable = isAsyncIterable$1;
	
	return isAsyncIterable;
}

var throwUnobservableError = {};

var hasRequiredThrowUnobservableError;

function requireThrowUnobservableError () {
	if (hasRequiredThrowUnobservableError) return throwUnobservableError;
	hasRequiredThrowUnobservableError = 1;
	Object.defineProperty(throwUnobservableError, "__esModule", { value: true });
	throwUnobservableError.createInvalidObservableTypeError = void 0;
	function createInvalidObservableTypeError(input) {
	    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
	}
	throwUnobservableError.createInvalidObservableTypeError = createInvalidObservableTypeError;
	
	return throwUnobservableError;
}

var isIterable = {};

var iterator = {};

var hasRequiredIterator;

function requireIterator () {
	if (hasRequiredIterator) return iterator;
	hasRequiredIterator = 1;
	Object.defineProperty(iterator, "__esModule", { value: true });
	iterator.iterator = iterator.getSymbolIterator = void 0;
	function getSymbolIterator() {
	    if (typeof Symbol !== 'function' || !Symbol.iterator) {
	        return '@@iterator';
	    }
	    return Symbol.iterator;
	}
	iterator.getSymbolIterator = getSymbolIterator;
	iterator.iterator = getSymbolIterator();
	
	return iterator;
}

var hasRequiredIsIterable;

function requireIsIterable () {
	if (hasRequiredIsIterable) return isIterable;
	hasRequiredIsIterable = 1;
	Object.defineProperty(isIterable, "__esModule", { value: true });
	isIterable.isIterable = void 0;
	var iterator_1 = requireIterator();
	var isFunction_1 = requireIsFunction();
	function isIterable$1(input) {
	    return isFunction_1.isFunction(input === null || input === void 0 ? void 0 : input[iterator_1.iterator]);
	}
	isIterable.isIterable = isIterable$1;
	
	return isIterable;
}

var isReadableStreamLike = {};

var hasRequiredIsReadableStreamLike;

function requireIsReadableStreamLike () {
	if (hasRequiredIsReadableStreamLike) return isReadableStreamLike;
	hasRequiredIsReadableStreamLike = 1;
	var __generator = (isReadableStreamLike && isReadableStreamLike.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var __await = (isReadableStreamLike && isReadableStreamLike.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); };
	var __asyncGenerator = (isReadableStreamLike && isReadableStreamLike.__asyncGenerator) || function (thisArg, _arguments, generator) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var g = generator.apply(thisArg, _arguments || []), i, q = [];
	    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
	    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
	    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
	    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
	    function fulfill(value) { resume("next", value); }
	    function reject(value) { resume("throw", value); }
	    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
	};
	Object.defineProperty(isReadableStreamLike, "__esModule", { value: true });
	isReadableStreamLike.isReadableStreamLike = isReadableStreamLike.readableStreamLikeToAsyncGenerator = void 0;
	var isFunction_1 = requireIsFunction();
	function readableStreamLikeToAsyncGenerator(readableStream) {
	    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
	        var reader, _a, value, done;
	        return __generator(this, function (_b) {
	            switch (_b.label) {
	                case 0:
	                    reader = readableStream.getReader();
	                    _b.label = 1;
	                case 1:
	                    _b.trys.push([1, , 9, 10]);
	                    _b.label = 2;
	                case 2:
	                    return [4, __await(reader.read())];
	                case 3:
	                    _a = _b.sent(), value = _a.value, done = _a.done;
	                    if (!done) return [3, 5];
	                    return [4, __await(void 0)];
	                case 4: return [2, _b.sent()];
	                case 5: return [4, __await(value)];
	                case 6: return [4, _b.sent()];
	                case 7:
	                    _b.sent();
	                    return [3, 2];
	                case 8: return [3, 10];
	                case 9:
	                    reader.releaseLock();
	                    return [7];
	                case 10: return [2];
	            }
	        });
	    });
	}
	isReadableStreamLike.readableStreamLikeToAsyncGenerator = readableStreamLikeToAsyncGenerator;
	function isReadableStreamLike$1(obj) {
	    return isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
	}
	isReadableStreamLike.isReadableStreamLike = isReadableStreamLike$1;
	
	return isReadableStreamLike;
}

var hasRequiredInnerFrom;

function requireInnerFrom () {
	if (hasRequiredInnerFrom) return innerFrom;
	hasRequiredInnerFrom = 1;
	var __awaiter = (innerFrom && innerFrom.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (innerFrom && innerFrom.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var __asyncValues = (innerFrom && innerFrom.__asyncValues) || function (o) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var m = o[Symbol.asyncIterator], i;
	    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
	    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
	    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
	};
	var __values = (innerFrom && innerFrom.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(innerFrom, "__esModule", { value: true });
	innerFrom.fromReadableStreamLike = innerFrom.fromAsyncIterable = innerFrom.fromIterable = innerFrom.fromPromise = innerFrom.fromArrayLike = innerFrom.fromInteropObservable = innerFrom.innerFrom = void 0;
	var isArrayLike_1 = requireIsArrayLike();
	var isPromise_1 = requireIsPromise();
	var Observable_1 = requireObservable();
	var isInteropObservable_1 = requireIsInteropObservable();
	var isAsyncIterable_1 = requireIsAsyncIterable();
	var throwUnobservableError_1 = requireThrowUnobservableError();
	var isIterable_1 = requireIsIterable();
	var isReadableStreamLike_1 = requireIsReadableStreamLike();
	var isFunction_1 = requireIsFunction();
	var reportUnhandledError_1 = requireReportUnhandledError();
	var observable_1 = requireObservable$1();
	function innerFrom$1(input) {
	    if (input instanceof Observable_1.Observable) {
	        return input;
	    }
	    if (input != null) {
	        if (isInteropObservable_1.isInteropObservable(input)) {
	            return fromInteropObservable(input);
	        }
	        if (isArrayLike_1.isArrayLike(input)) {
	            return fromArrayLike(input);
	        }
	        if (isPromise_1.isPromise(input)) {
	            return fromPromise(input);
	        }
	        if (isAsyncIterable_1.isAsyncIterable(input)) {
	            return fromAsyncIterable(input);
	        }
	        if (isIterable_1.isIterable(input)) {
	            return fromIterable(input);
	        }
	        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
	            return fromReadableStreamLike(input);
	        }
	    }
	    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
	}
	innerFrom.innerFrom = innerFrom$1;
	function fromInteropObservable(obj) {
	    return new Observable_1.Observable(function (subscriber) {
	        var obs = obj[observable_1.observable]();
	        if (isFunction_1.isFunction(obs.subscribe)) {
	            return obs.subscribe(subscriber);
	        }
	        throw new TypeError('Provided object does not correctly implement Symbol.observable');
	    });
	}
	innerFrom.fromInteropObservable = fromInteropObservable;
	function fromArrayLike(array) {
	    return new Observable_1.Observable(function (subscriber) {
	        for (var i = 0; i < array.length && !subscriber.closed; i++) {
	            subscriber.next(array[i]);
	        }
	        subscriber.complete();
	    });
	}
	innerFrom.fromArrayLike = fromArrayLike;
	function fromPromise(promise) {
	    return new Observable_1.Observable(function (subscriber) {
	        promise
	            .then(function (value) {
	            if (!subscriber.closed) {
	                subscriber.next(value);
	                subscriber.complete();
	            }
	        }, function (err) { return subscriber.error(err); })
	            .then(null, reportUnhandledError_1.reportUnhandledError);
	    });
	}
	innerFrom.fromPromise = fromPromise;
	function fromIterable(iterable) {
	    return new Observable_1.Observable(function (subscriber) {
	        var e_1, _a;
	        try {
	            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
	                var value = iterable_1_1.value;
	                subscriber.next(value);
	                if (subscriber.closed) {
	                    return;
	                }
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	        subscriber.complete();
	    });
	}
	innerFrom.fromIterable = fromIterable;
	function fromAsyncIterable(asyncIterable) {
	    return new Observable_1.Observable(function (subscriber) {
	        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
	    });
	}
	innerFrom.fromAsyncIterable = fromAsyncIterable;
	function fromReadableStreamLike(readableStream) {
	    return fromAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(readableStream));
	}
	innerFrom.fromReadableStreamLike = fromReadableStreamLike;
	function process(asyncIterable, subscriber) {
	    var asyncIterable_1, asyncIterable_1_1;
	    var e_2, _a;
	    return __awaiter(this, void 0, void 0, function () {
	        var value, e_2_1;
	        return __generator(this, function (_b) {
	            switch (_b.label) {
	                case 0:
	                    _b.trys.push([0, 5, 6, 11]);
	                    asyncIterable_1 = __asyncValues(asyncIterable);
	                    _b.label = 1;
	                case 1: return [4, asyncIterable_1.next()];
	                case 2:
	                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
	                    value = asyncIterable_1_1.value;
	                    subscriber.next(value);
	                    if (subscriber.closed) {
	                        return [2];
	                    }
	                    _b.label = 3;
	                case 3: return [3, 1];
	                case 4: return [3, 11];
	                case 5:
	                    e_2_1 = _b.sent();
	                    e_2 = { error: e_2_1 };
	                    return [3, 11];
	                case 6:
	                    _b.trys.push([6, , 9, 10]);
	                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
	                    return [4, _a.call(asyncIterable_1)];
	                case 7:
	                    _b.sent();
	                    _b.label = 8;
	                case 8: return [3, 10];
	                case 9:
	                    if (e_2) throw e_2.error;
	                    return [7];
	                case 10: return [7];
	                case 11:
	                    subscriber.complete();
	                    return [2];
	            }
	        });
	    });
	}
	
	return innerFrom;
}

var observeOn = {};

var executeSchedule = {};

var hasRequiredExecuteSchedule;

function requireExecuteSchedule () {
	if (hasRequiredExecuteSchedule) return executeSchedule;
	hasRequiredExecuteSchedule = 1;
	Object.defineProperty(executeSchedule, "__esModule", { value: true });
	executeSchedule.executeSchedule = void 0;
	function executeSchedule$1(parentSubscription, scheduler, work, delay, repeat) {
	    if (delay === void 0) { delay = 0; }
	    if (repeat === void 0) { repeat = false; }
	    var scheduleSubscription = scheduler.schedule(function () {
	        work();
	        if (repeat) {
	            parentSubscription.add(this.schedule(null, delay));
	        }
	        else {
	            this.unsubscribe();
	        }
	    }, delay);
	    parentSubscription.add(scheduleSubscription);
	    if (!repeat) {
	        return scheduleSubscription;
	    }
	}
	executeSchedule.executeSchedule = executeSchedule$1;
	
	return executeSchedule;
}

var hasRequiredObserveOn;

function requireObserveOn () {
	if (hasRequiredObserveOn) return observeOn;
	hasRequiredObserveOn = 1;
	Object.defineProperty(observeOn, "__esModule", { value: true });
	observeOn.observeOn = void 0;
	var executeSchedule_1 = requireExecuteSchedule();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function observeOn$1(scheduler, delay) {
	    if (delay === void 0) { delay = 0; }
	    return lift_1.operate(function (source, subscriber) {
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return executeSchedule_1.executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule_1.executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule_1.executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
	    });
	}
	observeOn.observeOn = observeOn$1;
	
	return observeOn;
}

var subscribeOn = {};

var hasRequiredSubscribeOn;

function requireSubscribeOn () {
	if (hasRequiredSubscribeOn) return subscribeOn;
	hasRequiredSubscribeOn = 1;
	Object.defineProperty(subscribeOn, "__esModule", { value: true });
	subscribeOn.subscribeOn = void 0;
	var lift_1 = requireLift();
	function subscribeOn$1(scheduler, delay) {
	    if (delay === void 0) { delay = 0; }
	    return lift_1.operate(function (source, subscriber) {
	        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
	    });
	}
	subscribeOn.subscribeOn = subscribeOn$1;
	
	return subscribeOn;
}

var hasRequiredScheduleObservable;

function requireScheduleObservable () {
	if (hasRequiredScheduleObservable) return scheduleObservable;
	hasRequiredScheduleObservable = 1;
	Object.defineProperty(scheduleObservable, "__esModule", { value: true });
	scheduleObservable.scheduleObservable = void 0;
	var innerFrom_1 = requireInnerFrom();
	var observeOn_1 = requireObserveOn();
	var subscribeOn_1 = requireSubscribeOn();
	function scheduleObservable$1(input, scheduler) {
	    return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
	}
	scheduleObservable.scheduleObservable = scheduleObservable$1;
	
	return scheduleObservable;
}

var schedulePromise = {};

var hasRequiredSchedulePromise;

function requireSchedulePromise () {
	if (hasRequiredSchedulePromise) return schedulePromise;
	hasRequiredSchedulePromise = 1;
	Object.defineProperty(schedulePromise, "__esModule", { value: true });
	schedulePromise.schedulePromise = void 0;
	var innerFrom_1 = requireInnerFrom();
	var observeOn_1 = requireObserveOn();
	var subscribeOn_1 = requireSubscribeOn();
	function schedulePromise$1(input, scheduler) {
	    return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
	}
	schedulePromise.schedulePromise = schedulePromise$1;
	
	return schedulePromise;
}

var scheduleArray = {};

var hasRequiredScheduleArray;

function requireScheduleArray () {
	if (hasRequiredScheduleArray) return scheduleArray;
	hasRequiredScheduleArray = 1;
	Object.defineProperty(scheduleArray, "__esModule", { value: true });
	scheduleArray.scheduleArray = void 0;
	var Observable_1 = requireObservable();
	function scheduleArray$1(input, scheduler) {
	    return new Observable_1.Observable(function (subscriber) {
	        var i = 0;
	        return scheduler.schedule(function () {
	            if (i === input.length) {
	                subscriber.complete();
	            }
	            else {
	                subscriber.next(input[i++]);
	                if (!subscriber.closed) {
	                    this.schedule();
	                }
	            }
	        });
	    });
	}
	scheduleArray.scheduleArray = scheduleArray$1;
	
	return scheduleArray;
}

var scheduleIterable = {};

var hasRequiredScheduleIterable;

function requireScheduleIterable () {
	if (hasRequiredScheduleIterable) return scheduleIterable;
	hasRequiredScheduleIterable = 1;
	Object.defineProperty(scheduleIterable, "__esModule", { value: true });
	scheduleIterable.scheduleIterable = void 0;
	var Observable_1 = requireObservable();
	var iterator_1 = requireIterator();
	var isFunction_1 = requireIsFunction();
	var executeSchedule_1 = requireExecuteSchedule();
	function scheduleIterable$1(input, scheduler) {
	    return new Observable_1.Observable(function (subscriber) {
	        var iterator;
	        executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
	            iterator = input[iterator_1.iterator]();
	            executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
	                var _a;
	                var value;
	                var done;
	                try {
	                    (_a = iterator.next(), value = _a.value, done = _a.done);
	                }
	                catch (err) {
	                    subscriber.error(err);
	                    return;
	                }
	                if (done) {
	                    subscriber.complete();
	                }
	                else {
	                    subscriber.next(value);
	                }
	            }, 0, true);
	        });
	        return function () { return isFunction_1.isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
	    });
	}
	scheduleIterable.scheduleIterable = scheduleIterable$1;
	
	return scheduleIterable;
}

var scheduleAsyncIterable = {};

var hasRequiredScheduleAsyncIterable;

function requireScheduleAsyncIterable () {
	if (hasRequiredScheduleAsyncIterable) return scheduleAsyncIterable;
	hasRequiredScheduleAsyncIterable = 1;
	Object.defineProperty(scheduleAsyncIterable, "__esModule", { value: true });
	scheduleAsyncIterable.scheduleAsyncIterable = void 0;
	var Observable_1 = requireObservable();
	var executeSchedule_1 = requireExecuteSchedule();
	function scheduleAsyncIterable$1(input, scheduler) {
	    if (!input) {
	        throw new Error('Iterable cannot be null');
	    }
	    return new Observable_1.Observable(function (subscriber) {
	        executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
	            var iterator = input[Symbol.asyncIterator]();
	            executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
	                iterator.next().then(function (result) {
	                    if (result.done) {
	                        subscriber.complete();
	                    }
	                    else {
	                        subscriber.next(result.value);
	                    }
	                });
	            }, 0, true);
	        });
	    });
	}
	scheduleAsyncIterable.scheduleAsyncIterable = scheduleAsyncIterable$1;
	
	return scheduleAsyncIterable;
}

var scheduleReadableStreamLike = {};

var hasRequiredScheduleReadableStreamLike;

function requireScheduleReadableStreamLike () {
	if (hasRequiredScheduleReadableStreamLike) return scheduleReadableStreamLike;
	hasRequiredScheduleReadableStreamLike = 1;
	Object.defineProperty(scheduleReadableStreamLike, "__esModule", { value: true });
	scheduleReadableStreamLike.scheduleReadableStreamLike = void 0;
	var scheduleAsyncIterable_1 = requireScheduleAsyncIterable();
	var isReadableStreamLike_1 = requireIsReadableStreamLike();
	function scheduleReadableStreamLike$1(input, scheduler) {
	    return scheduleAsyncIterable_1.scheduleAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(input), scheduler);
	}
	scheduleReadableStreamLike.scheduleReadableStreamLike = scheduleReadableStreamLike$1;
	
	return scheduleReadableStreamLike;
}

var hasRequiredScheduled;

function requireScheduled () {
	if (hasRequiredScheduled) return scheduled;
	hasRequiredScheduled = 1;
	Object.defineProperty(scheduled, "__esModule", { value: true });
	scheduled.scheduled = void 0;
	var scheduleObservable_1 = requireScheduleObservable();
	var schedulePromise_1 = requireSchedulePromise();
	var scheduleArray_1 = requireScheduleArray();
	var scheduleIterable_1 = requireScheduleIterable();
	var scheduleAsyncIterable_1 = requireScheduleAsyncIterable();
	var isInteropObservable_1 = requireIsInteropObservable();
	var isPromise_1 = requireIsPromise();
	var isArrayLike_1 = requireIsArrayLike();
	var isIterable_1 = requireIsIterable();
	var isAsyncIterable_1 = requireIsAsyncIterable();
	var throwUnobservableError_1 = requireThrowUnobservableError();
	var isReadableStreamLike_1 = requireIsReadableStreamLike();
	var scheduleReadableStreamLike_1 = requireScheduleReadableStreamLike();
	function scheduled$1(input, scheduler) {
	    if (input != null) {
	        if (isInteropObservable_1.isInteropObservable(input)) {
	            return scheduleObservable_1.scheduleObservable(input, scheduler);
	        }
	        if (isArrayLike_1.isArrayLike(input)) {
	            return scheduleArray_1.scheduleArray(input, scheduler);
	        }
	        if (isPromise_1.isPromise(input)) {
	            return schedulePromise_1.schedulePromise(input, scheduler);
	        }
	        if (isAsyncIterable_1.isAsyncIterable(input)) {
	            return scheduleAsyncIterable_1.scheduleAsyncIterable(input, scheduler);
	        }
	        if (isIterable_1.isIterable(input)) {
	            return scheduleIterable_1.scheduleIterable(input, scheduler);
	        }
	        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
	            return scheduleReadableStreamLike_1.scheduleReadableStreamLike(input, scheduler);
	        }
	    }
	    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
	}
	scheduled.scheduled = scheduled$1;
	
	return scheduled;
}

var hasRequiredFrom;

function requireFrom () {
	if (hasRequiredFrom) return from;
	hasRequiredFrom = 1;
	Object.defineProperty(from, "__esModule", { value: true });
	from.from = void 0;
	var scheduled_1 = requireScheduled();
	var innerFrom_1 = requireInnerFrom();
	function from$1(input, scheduler) {
	    return scheduler ? scheduled_1.scheduled(input, scheduler) : innerFrom_1.innerFrom(input);
	}
	from.from = from$1;
	
	return from;
}

var hasRequiredOf;

function requireOf () {
	if (hasRequiredOf) return of;
	hasRequiredOf = 1;
	Object.defineProperty(of, "__esModule", { value: true });
	of.of = void 0;
	var args_1 = requireArgs();
	var from_1 = requireFrom();
	function of$1() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var scheduler = args_1.popScheduler(args);
	    return from_1.from(args, scheduler);
	}
	of.of = of$1;
	
	return of;
}

var throwError = {};

var hasRequiredThrowError;

function requireThrowError () {
	if (hasRequiredThrowError) return throwError;
	hasRequiredThrowError = 1;
	Object.defineProperty(throwError, "__esModule", { value: true });
	throwError.throwError = void 0;
	var Observable_1 = requireObservable();
	var isFunction_1 = requireIsFunction();
	function throwError$1(errorOrErrorFactory, scheduler) {
	    var errorFactory = isFunction_1.isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function () { return errorOrErrorFactory; };
	    var init = function (subscriber) { return subscriber.error(errorFactory()); };
	    return new Observable_1.Observable(scheduler ? function (subscriber) { return scheduler.schedule(init, 0, subscriber); } : init);
	}
	throwError.throwError = throwError$1;
	
	return throwError;
}

var hasRequiredNotification;

function requireNotification () {
	if (hasRequiredNotification) return Notification;
	hasRequiredNotification = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.observeNotification = exports.Notification = exports.NotificationKind = void 0;
		var empty_1 = requireEmpty();
		var of_1 = requireOf();
		var throwError_1 = requireThrowError();
		var isFunction_1 = requireIsFunction();
		(function (NotificationKind) {
		    NotificationKind["NEXT"] = "N";
		    NotificationKind["ERROR"] = "E";
		    NotificationKind["COMPLETE"] = "C";
		})(exports.NotificationKind || (exports.NotificationKind = {}));
		var Notification = (function () {
		    function Notification(kind, value, error) {
		        this.kind = kind;
		        this.value = value;
		        this.error = error;
		        this.hasValue = kind === 'N';
		    }
		    Notification.prototype.observe = function (observer) {
		        return observeNotification(this, observer);
		    };
		    Notification.prototype.do = function (nextHandler, errorHandler, completeHandler) {
		        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
		        return kind === 'N' ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === 'E' ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
		    };
		    Notification.prototype.accept = function (nextOrObserver, error, complete) {
		        var _a;
		        return isFunction_1.isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next)
		            ? this.observe(nextOrObserver)
		            : this.do(nextOrObserver, error, complete);
		    };
		    Notification.prototype.toObservable = function () {
		        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
		        var result = kind === 'N'
		            ?
		                of_1.of(value)
		            :
		                kind === 'E'
		                    ?
		                        throwError_1.throwError(function () { return error; })
		                    :
		                        kind === 'C'
		                            ?
		                                empty_1.EMPTY
		                            :
		                                0;
		        if (!result) {
		            throw new TypeError("Unexpected notification kind " + kind);
		        }
		        return result;
		    };
		    Notification.createNext = function (value) {
		        return new Notification('N', value);
		    };
		    Notification.createError = function (err) {
		        return new Notification('E', undefined, err);
		    };
		    Notification.createComplete = function () {
		        return Notification.completeNotification;
		    };
		    Notification.completeNotification = new Notification('C');
		    return Notification;
		}());
		exports.Notification = Notification;
		function observeNotification(notification, observer) {
		    var _a, _b, _c;
		    var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
		    if (typeof kind !== 'string') {
		        throw new TypeError('Invalid notification, missing "kind"');
		    }
		    kind === 'N' ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === 'E' ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
		}
		exports.observeNotification = observeNotification;
		
	} (Notification));
	return Notification;
}

var isObservable = {};

var hasRequiredIsObservable;

function requireIsObservable () {
	if (hasRequiredIsObservable) return isObservable;
	hasRequiredIsObservable = 1;
	Object.defineProperty(isObservable, "__esModule", { value: true });
	isObservable.isObservable = void 0;
	var Observable_1 = requireObservable();
	var isFunction_1 = requireIsFunction();
	function isObservable$1(obj) {
	    return !!obj && (obj instanceof Observable_1.Observable || (isFunction_1.isFunction(obj.lift) && isFunction_1.isFunction(obj.subscribe)));
	}
	isObservable.isObservable = isObservable$1;
	
	return isObservable;
}

var lastValueFrom = {};

var EmptyError = {};

var hasRequiredEmptyError;

function requireEmptyError () {
	if (hasRequiredEmptyError) return EmptyError;
	hasRequiredEmptyError = 1;
	Object.defineProperty(EmptyError, "__esModule", { value: true });
	EmptyError.EmptyError = void 0;
	var createErrorClass_1 = requireCreateErrorClass();
	EmptyError.EmptyError = createErrorClass_1.createErrorClass(function (_super) {
	    return function EmptyErrorImpl() {
	        _super(this);
	        this.name = 'EmptyError';
	        this.message = 'no elements in sequence';
	    };
	});
	
	return EmptyError;
}

var hasRequiredLastValueFrom;

function requireLastValueFrom () {
	if (hasRequiredLastValueFrom) return lastValueFrom;
	hasRequiredLastValueFrom = 1;
	Object.defineProperty(lastValueFrom, "__esModule", { value: true });
	lastValueFrom.lastValueFrom = void 0;
	var EmptyError_1 = requireEmptyError();
	function lastValueFrom$1(source, config) {
	    var hasConfig = typeof config === 'object';
	    return new Promise(function (resolve, reject) {
	        var _hasValue = false;
	        var _value;
	        source.subscribe({
	            next: function (value) {
	                _value = value;
	                _hasValue = true;
	            },
	            error: reject,
	            complete: function () {
	                if (_hasValue) {
	                    resolve(_value);
	                }
	                else if (hasConfig) {
	                    resolve(config.defaultValue);
	                }
	                else {
	                    reject(new EmptyError_1.EmptyError());
	                }
	            },
	        });
	    });
	}
	lastValueFrom.lastValueFrom = lastValueFrom$1;
	
	return lastValueFrom;
}

var firstValueFrom = {};

var hasRequiredFirstValueFrom;

function requireFirstValueFrom () {
	if (hasRequiredFirstValueFrom) return firstValueFrom;
	hasRequiredFirstValueFrom = 1;
	Object.defineProperty(firstValueFrom, "__esModule", { value: true });
	firstValueFrom.firstValueFrom = void 0;
	var EmptyError_1 = requireEmptyError();
	var Subscriber_1 = requireSubscriber();
	function firstValueFrom$1(source, config) {
	    var hasConfig = typeof config === 'object';
	    return new Promise(function (resolve, reject) {
	        var subscriber = new Subscriber_1.SafeSubscriber({
	            next: function (value) {
	                resolve(value);
	                subscriber.unsubscribe();
	            },
	            error: reject,
	            complete: function () {
	                if (hasConfig) {
	                    resolve(config.defaultValue);
	                }
	                else {
	                    reject(new EmptyError_1.EmptyError());
	                }
	            },
	        });
	        source.subscribe(subscriber);
	    });
	}
	firstValueFrom.firstValueFrom = firstValueFrom$1;
	
	return firstValueFrom;
}

var ArgumentOutOfRangeError = {};

var hasRequiredArgumentOutOfRangeError;

function requireArgumentOutOfRangeError () {
	if (hasRequiredArgumentOutOfRangeError) return ArgumentOutOfRangeError;
	hasRequiredArgumentOutOfRangeError = 1;
	Object.defineProperty(ArgumentOutOfRangeError, "__esModule", { value: true });
	ArgumentOutOfRangeError.ArgumentOutOfRangeError = void 0;
	var createErrorClass_1 = requireCreateErrorClass();
	ArgumentOutOfRangeError.ArgumentOutOfRangeError = createErrorClass_1.createErrorClass(function (_super) {
	    return function ArgumentOutOfRangeErrorImpl() {
	        _super(this);
	        this.name = 'ArgumentOutOfRangeError';
	        this.message = 'argument out of range';
	    };
	});
	
	return ArgumentOutOfRangeError;
}

var NotFoundError = {};

var hasRequiredNotFoundError;

function requireNotFoundError () {
	if (hasRequiredNotFoundError) return NotFoundError;
	hasRequiredNotFoundError = 1;
	Object.defineProperty(NotFoundError, "__esModule", { value: true });
	NotFoundError.NotFoundError = void 0;
	var createErrorClass_1 = requireCreateErrorClass();
	NotFoundError.NotFoundError = createErrorClass_1.createErrorClass(function (_super) {
	    return function NotFoundErrorImpl(message) {
	        _super(this);
	        this.name = 'NotFoundError';
	        this.message = message;
	    };
	});
	
	return NotFoundError;
}

var SequenceError = {};

var hasRequiredSequenceError;

function requireSequenceError () {
	if (hasRequiredSequenceError) return SequenceError;
	hasRequiredSequenceError = 1;
	Object.defineProperty(SequenceError, "__esModule", { value: true });
	SequenceError.SequenceError = void 0;
	var createErrorClass_1 = requireCreateErrorClass();
	SequenceError.SequenceError = createErrorClass_1.createErrorClass(function (_super) {
	    return function SequenceErrorImpl(message) {
	        _super(this);
	        this.name = 'SequenceError';
	        this.message = message;
	    };
	});
	
	return SequenceError;
}

var timeout = {};

var isDate = {};

var hasRequiredIsDate;

function requireIsDate () {
	if (hasRequiredIsDate) return isDate;
	hasRequiredIsDate = 1;
	Object.defineProperty(isDate, "__esModule", { value: true });
	isDate.isValidDate = void 0;
	function isValidDate(value) {
	    return value instanceof Date && !isNaN(value);
	}
	isDate.isValidDate = isValidDate;
	
	return isDate;
}

var hasRequiredTimeout;

function requireTimeout () {
	if (hasRequiredTimeout) return timeout;
	hasRequiredTimeout = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.timeout = exports.TimeoutError = void 0;
		var async_1 = requireAsync();
		var isDate_1 = requireIsDate();
		var lift_1 = requireLift();
		var innerFrom_1 = requireInnerFrom();
		var createErrorClass_1 = requireCreateErrorClass();
		var OperatorSubscriber_1 = requireOperatorSubscriber();
		var executeSchedule_1 = requireExecuteSchedule();
		exports.TimeoutError = createErrorClass_1.createErrorClass(function (_super) {
		    return function TimeoutErrorImpl(info) {
		        if (info === void 0) { info = null; }
		        _super(this);
		        this.message = 'Timeout has occurred';
		        this.name = 'TimeoutError';
		        this.info = info;
		    };
		});
		function timeout(config, schedulerArg) {
		    var _a = (isDate_1.isValidDate(config) ? { first: config } : typeof config === 'number' ? { each: config } : config), first = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : async_1.asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
		    if (first == null && each == null) {
		        throw new TypeError('No timeout provided.');
		    }
		    return lift_1.operate(function (source, subscriber) {
		        var originalSourceSubscription;
		        var timerSubscription;
		        var lastValue = null;
		        var seen = 0;
		        var startTimer = function (delay) {
		            timerSubscription = executeSchedule_1.executeSchedule(subscriber, scheduler, function () {
		                try {
		                    originalSourceSubscription.unsubscribe();
		                    innerFrom_1.innerFrom(_with({
		                        meta: meta,
		                        lastValue: lastValue,
		                        seen: seen,
		                    })).subscribe(subscriber);
		                }
		                catch (err) {
		                    subscriber.error(err);
		                }
		            }, delay);
		        };
		        originalSourceSubscription = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
		            timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
		            seen++;
		            subscriber.next((lastValue = value));
		            each > 0 && startTimer(each);
		        }, undefined, undefined, function () {
		            if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
		                timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
		            }
		            lastValue = null;
		        }));
		        !seen && startTimer(first != null ? (typeof first === 'number' ? first : +first - scheduler.now()) : each);
		    });
		}
		exports.timeout = timeout;
		function timeoutErrorFactory(info) {
		    throw new exports.TimeoutError(info);
		}
		
	} (timeout));
	return timeout;
}

var bindCallback = {};

var bindCallbackInternals = {};

var mapOneOrManyArgs = {};

var map = {};

var hasRequiredMap;

function requireMap () {
	if (hasRequiredMap) return map;
	hasRequiredMap = 1;
	Object.defineProperty(map, "__esModule", { value: true });
	map.map = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function map$1(project, thisArg) {
	    return lift_1.operate(function (source, subscriber) {
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            subscriber.next(project.call(thisArg, value, index++));
	        }));
	    });
	}
	map.map = map$1;
	
	return map;
}

var hasRequiredMapOneOrManyArgs;

function requireMapOneOrManyArgs () {
	if (hasRequiredMapOneOrManyArgs) return mapOneOrManyArgs;
	hasRequiredMapOneOrManyArgs = 1;
	var __read = (mapOneOrManyArgs && mapOneOrManyArgs.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (mapOneOrManyArgs && mapOneOrManyArgs.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(mapOneOrManyArgs, "__esModule", { value: true });
	mapOneOrManyArgs.mapOneOrManyArgs = void 0;
	var map_1 = requireMap();
	var isArray = Array.isArray;
	function callOrApply(fn, args) {
	    return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
	}
	function mapOneOrManyArgs$1(fn) {
	    return map_1.map(function (args) { return callOrApply(fn, args); });
	}
	mapOneOrManyArgs.mapOneOrManyArgs = mapOneOrManyArgs$1;
	
	return mapOneOrManyArgs;
}

var hasRequiredBindCallbackInternals;

function requireBindCallbackInternals () {
	if (hasRequiredBindCallbackInternals) return bindCallbackInternals;
	hasRequiredBindCallbackInternals = 1;
	var __read = (bindCallbackInternals && bindCallbackInternals.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (bindCallbackInternals && bindCallbackInternals.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(bindCallbackInternals, "__esModule", { value: true });
	bindCallbackInternals.bindCallbackInternals = void 0;
	var isScheduler_1 = requireIsScheduler();
	var Observable_1 = requireObservable();
	var subscribeOn_1 = requireSubscribeOn();
	var mapOneOrManyArgs_1 = requireMapOneOrManyArgs();
	var observeOn_1 = requireObserveOn();
	var AsyncSubject_1 = requireAsyncSubject();
	function bindCallbackInternals$1(isNodeStyle, callbackFunc, resultSelector, scheduler) {
	    if (resultSelector) {
	        if (isScheduler_1.isScheduler(resultSelector)) {
	            scheduler = resultSelector;
	        }
	        else {
	            return function () {
	                var args = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    args[_i] = arguments[_i];
	                }
	                return bindCallbackInternals$1(isNodeStyle, callbackFunc, scheduler)
	                    .apply(this, args)
	                    .pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
	            };
	        }
	    }
	    if (scheduler) {
	        return function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            return bindCallbackInternals$1(isNodeStyle, callbackFunc)
	                .apply(this, args)
	                .pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
	        };
	    }
	    return function () {
	        var _this = this;
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var subject = new AsyncSubject_1.AsyncSubject();
	        var uninitialized = true;
	        return new Observable_1.Observable(function (subscriber) {
	            var subs = subject.subscribe(subscriber);
	            if (uninitialized) {
	                uninitialized = false;
	                var isAsync_1 = false;
	                var isComplete_1 = false;
	                callbackFunc.apply(_this, __spreadArray(__spreadArray([], __read(args)), [
	                    function () {
	                        var results = [];
	                        for (var _i = 0; _i < arguments.length; _i++) {
	                            results[_i] = arguments[_i];
	                        }
	                        if (isNodeStyle) {
	                            var err = results.shift();
	                            if (err != null) {
	                                subject.error(err);
	                                return;
	                            }
	                        }
	                        subject.next(1 < results.length ? results : results[0]);
	                        isComplete_1 = true;
	                        if (isAsync_1) {
	                            subject.complete();
	                        }
	                    },
	                ]));
	                if (isComplete_1) {
	                    subject.complete();
	                }
	                isAsync_1 = true;
	            }
	            return subs;
	        });
	    };
	}
	bindCallbackInternals.bindCallbackInternals = bindCallbackInternals$1;
	
	return bindCallbackInternals;
}

var hasRequiredBindCallback;

function requireBindCallback () {
	if (hasRequiredBindCallback) return bindCallback;
	hasRequiredBindCallback = 1;
	Object.defineProperty(bindCallback, "__esModule", { value: true });
	bindCallback.bindCallback = void 0;
	var bindCallbackInternals_1 = requireBindCallbackInternals();
	function bindCallback$1(callbackFunc, resultSelector, scheduler) {
	    return bindCallbackInternals_1.bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
	}
	bindCallback.bindCallback = bindCallback$1;
	
	return bindCallback;
}

var bindNodeCallback = {};

var hasRequiredBindNodeCallback;

function requireBindNodeCallback () {
	if (hasRequiredBindNodeCallback) return bindNodeCallback;
	hasRequiredBindNodeCallback = 1;
	Object.defineProperty(bindNodeCallback, "__esModule", { value: true });
	bindNodeCallback.bindNodeCallback = void 0;
	var bindCallbackInternals_1 = requireBindCallbackInternals();
	function bindNodeCallback$1(callbackFunc, resultSelector, scheduler) {
	    return bindCallbackInternals_1.bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
	}
	bindNodeCallback.bindNodeCallback = bindNodeCallback$1;
	
	return bindNodeCallback;
}

var combineLatest$1 = {};

var argsArgArrayOrObject = {};

var hasRequiredArgsArgArrayOrObject;

function requireArgsArgArrayOrObject () {
	if (hasRequiredArgsArgArrayOrObject) return argsArgArrayOrObject;
	hasRequiredArgsArgArrayOrObject = 1;
	Object.defineProperty(argsArgArrayOrObject, "__esModule", { value: true });
	argsArgArrayOrObject.argsArgArrayOrObject = void 0;
	var isArray = Array.isArray;
	var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
	function argsArgArrayOrObject$1(args) {
	    if (args.length === 1) {
	        var first_1 = args[0];
	        if (isArray(first_1)) {
	            return { args: first_1, keys: null };
	        }
	        if (isPOJO(first_1)) {
	            var keys = getKeys(first_1);
	            return {
	                args: keys.map(function (key) { return first_1[key]; }),
	                keys: keys,
	            };
	        }
	    }
	    return { args: args, keys: null };
	}
	argsArgArrayOrObject.argsArgArrayOrObject = argsArgArrayOrObject$1;
	function isPOJO(obj) {
	    return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
	}
	
	return argsArgArrayOrObject;
}

var createObject = {};

var hasRequiredCreateObject;

function requireCreateObject () {
	if (hasRequiredCreateObject) return createObject;
	hasRequiredCreateObject = 1;
	Object.defineProperty(createObject, "__esModule", { value: true });
	createObject.createObject = void 0;
	function createObject$1(keys, values) {
	    return keys.reduce(function (result, key, i) { return ((result[key] = values[i]), result); }, {});
	}
	createObject.createObject = createObject$1;
	
	return createObject;
}

var hasRequiredCombineLatest$1;

function requireCombineLatest$1 () {
	if (hasRequiredCombineLatest$1) return combineLatest$1;
	hasRequiredCombineLatest$1 = 1;
	Object.defineProperty(combineLatest$1, "__esModule", { value: true });
	combineLatest$1.combineLatestInit = combineLatest$1.combineLatest = void 0;
	var Observable_1 = requireObservable();
	var argsArgArrayOrObject_1 = requireArgsArgArrayOrObject();
	var from_1 = requireFrom();
	var identity_1 = requireIdentity();
	var mapOneOrManyArgs_1 = requireMapOneOrManyArgs();
	var args_1 = requireArgs();
	var createObject_1 = requireCreateObject();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var executeSchedule_1 = requireExecuteSchedule();
	function combineLatest() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var scheduler = args_1.popScheduler(args);
	    var resultSelector = args_1.popResultSelector(args);
	    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
	    if (observables.length === 0) {
	        return from_1.from([], scheduler);
	    }
	    var result = new Observable_1.Observable(combineLatestInit(observables, scheduler, keys
	        ?
	            function (values) { return createObject_1.createObject(keys, values); }
	        :
	            identity_1.identity));
	    return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
	}
	combineLatest$1.combineLatest = combineLatest;
	function combineLatestInit(observables, scheduler, valueTransform) {
	    if (valueTransform === void 0) { valueTransform = identity_1.identity; }
	    return function (subscriber) {
	        maybeSchedule(scheduler, function () {
	            var length = observables.length;
	            var values = new Array(length);
	            var active = length;
	            var remainingFirstValues = length;
	            var _loop_1 = function (i) {
	                maybeSchedule(scheduler, function () {
	                    var source = from_1.from(observables[i], scheduler);
	                    var hasFirstValue = false;
	                    source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                        values[i] = value;
	                        if (!hasFirstValue) {
	                            hasFirstValue = true;
	                            remainingFirstValues--;
	                        }
	                        if (!remainingFirstValues) {
	                            subscriber.next(valueTransform(values.slice()));
	                        }
	                    }, function () {
	                        if (!--active) {
	                            subscriber.complete();
	                        }
	                    }));
	                }, subscriber);
	            };
	            for (var i = 0; i < length; i++) {
	                _loop_1(i);
	            }
	        }, subscriber);
	    };
	}
	combineLatest$1.combineLatestInit = combineLatestInit;
	function maybeSchedule(scheduler, execute, subscription) {
	    if (scheduler) {
	        executeSchedule_1.executeSchedule(subscription, scheduler, execute);
	    }
	    else {
	        execute();
	    }
	}
	
	return combineLatest$1;
}

var concat$1 = {};

var concatAll = {};

var mergeAll = {};

var mergeMap = {};

var mergeInternals = {};

var hasRequiredMergeInternals;

function requireMergeInternals () {
	if (hasRequiredMergeInternals) return mergeInternals;
	hasRequiredMergeInternals = 1;
	Object.defineProperty(mergeInternals, "__esModule", { value: true });
	mergeInternals.mergeInternals = void 0;
	var innerFrom_1 = requireInnerFrom();
	var executeSchedule_1 = requireExecuteSchedule();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function mergeInternals$1(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
	    var buffer = [];
	    var active = 0;
	    var index = 0;
	    var isComplete = false;
	    var checkComplete = function () {
	        if (isComplete && !buffer.length && !active) {
	            subscriber.complete();
	        }
	    };
	    var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
	    var doInnerSub = function (value) {
	        expand && subscriber.next(value);
	        active++;
	        var innerComplete = false;
	        innerFrom_1.innerFrom(project(value, index++)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (innerValue) {
	            onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
	            if (expand) {
	                outerNext(innerValue);
	            }
	            else {
	                subscriber.next(innerValue);
	            }
	        }, function () {
	            innerComplete = true;
	        }, undefined, function () {
	            if (innerComplete) {
	                try {
	                    active--;
	                    var _loop_1 = function () {
	                        var bufferedValue = buffer.shift();
	                        if (innerSubScheduler) {
	                            executeSchedule_1.executeSchedule(subscriber, innerSubScheduler, function () { return doInnerSub(bufferedValue); });
	                        }
	                        else {
	                            doInnerSub(bufferedValue);
	                        }
	                    };
	                    while (buffer.length && active < concurrent) {
	                        _loop_1();
	                    }
	                    checkComplete();
	                }
	                catch (err) {
	                    subscriber.error(err);
	                }
	            }
	        }));
	    };
	    source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, outerNext, function () {
	        isComplete = true;
	        checkComplete();
	    }));
	    return function () {
	        additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
	    };
	}
	mergeInternals.mergeInternals = mergeInternals$1;
	
	return mergeInternals;
}

var hasRequiredMergeMap;

function requireMergeMap () {
	if (hasRequiredMergeMap) return mergeMap;
	hasRequiredMergeMap = 1;
	Object.defineProperty(mergeMap, "__esModule", { value: true });
	mergeMap.mergeMap = void 0;
	var map_1 = requireMap();
	var innerFrom_1 = requireInnerFrom();
	var lift_1 = requireLift();
	var mergeInternals_1 = requireMergeInternals();
	var isFunction_1 = requireIsFunction();
	function mergeMap$1(project, resultSelector, concurrent) {
	    if (concurrent === void 0) { concurrent = Infinity; }
	    if (isFunction_1.isFunction(resultSelector)) {
	        return mergeMap$1(function (a, i) { return map_1.map(function (b, ii) { return resultSelector(a, b, i, ii); })(innerFrom_1.innerFrom(project(a, i))); }, concurrent);
	    }
	    else if (typeof resultSelector === 'number') {
	        concurrent = resultSelector;
	    }
	    return lift_1.operate(function (source, subscriber) { return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent); });
	}
	mergeMap.mergeMap = mergeMap$1;
	
	return mergeMap;
}

var hasRequiredMergeAll;

function requireMergeAll () {
	if (hasRequiredMergeAll) return mergeAll;
	hasRequiredMergeAll = 1;
	Object.defineProperty(mergeAll, "__esModule", { value: true });
	mergeAll.mergeAll = void 0;
	var mergeMap_1 = requireMergeMap();
	var identity_1 = requireIdentity();
	function mergeAll$1(concurrent) {
	    if (concurrent === void 0) { concurrent = Infinity; }
	    return mergeMap_1.mergeMap(identity_1.identity, concurrent);
	}
	mergeAll.mergeAll = mergeAll$1;
	
	return mergeAll;
}

var hasRequiredConcatAll;

function requireConcatAll () {
	if (hasRequiredConcatAll) return concatAll;
	hasRequiredConcatAll = 1;
	Object.defineProperty(concatAll, "__esModule", { value: true });
	concatAll.concatAll = void 0;
	var mergeAll_1 = requireMergeAll();
	function concatAll$1() {
	    return mergeAll_1.mergeAll(1);
	}
	concatAll.concatAll = concatAll$1;
	
	return concatAll;
}

var hasRequiredConcat$1;

function requireConcat$1 () {
	if (hasRequiredConcat$1) return concat$1;
	hasRequiredConcat$1 = 1;
	Object.defineProperty(concat$1, "__esModule", { value: true });
	concat$1.concat = void 0;
	var concatAll_1 = requireConcatAll();
	var args_1 = requireArgs();
	var from_1 = requireFrom();
	function concat() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    return concatAll_1.concatAll()(from_1.from(args, args_1.popScheduler(args)));
	}
	concat$1.concat = concat;
	
	return concat$1;
}

var connectable = {};

var defer = {};

var hasRequiredDefer;

function requireDefer () {
	if (hasRequiredDefer) return defer;
	hasRequiredDefer = 1;
	Object.defineProperty(defer, "__esModule", { value: true });
	defer.defer = void 0;
	var Observable_1 = requireObservable();
	var innerFrom_1 = requireInnerFrom();
	function defer$1(observableFactory) {
	    return new Observable_1.Observable(function (subscriber) {
	        innerFrom_1.innerFrom(observableFactory()).subscribe(subscriber);
	    });
	}
	defer.defer = defer$1;
	
	return defer;
}

var hasRequiredConnectable;

function requireConnectable () {
	if (hasRequiredConnectable) return connectable;
	hasRequiredConnectable = 1;
	Object.defineProperty(connectable, "__esModule", { value: true });
	connectable.connectable = void 0;
	var Subject_1 = requireSubject();
	var Observable_1 = requireObservable();
	var defer_1 = requireDefer();
	var DEFAULT_CONFIG = {
	    connector: function () { return new Subject_1.Subject(); },
	    resetOnDisconnect: true,
	};
	function connectable$1(source, config) {
	    if (config === void 0) { config = DEFAULT_CONFIG; }
	    var connection = null;
	    var connector = config.connector, _a = config.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
	    var subject = connector();
	    var result = new Observable_1.Observable(function (subscriber) {
	        return subject.subscribe(subscriber);
	    });
	    result.connect = function () {
	        if (!connection || connection.closed) {
	            connection = defer_1.defer(function () { return source; }).subscribe(subject);
	            if (resetOnDisconnect) {
	                connection.add(function () { return (subject = connector()); });
	            }
	        }
	        return connection;
	    };
	    return result;
	}
	connectable.connectable = connectable$1;
	
	return connectable;
}

var forkJoin = {};

var hasRequiredForkJoin;

function requireForkJoin () {
	if (hasRequiredForkJoin) return forkJoin;
	hasRequiredForkJoin = 1;
	Object.defineProperty(forkJoin, "__esModule", { value: true });
	forkJoin.forkJoin = void 0;
	var Observable_1 = requireObservable();
	var argsArgArrayOrObject_1 = requireArgsArgArrayOrObject();
	var innerFrom_1 = requireInnerFrom();
	var args_1 = requireArgs();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var mapOneOrManyArgs_1 = requireMapOneOrManyArgs();
	var createObject_1 = requireCreateObject();
	function forkJoin$1() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var resultSelector = args_1.popResultSelector(args);
	    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), sources = _a.args, keys = _a.keys;
	    var result = new Observable_1.Observable(function (subscriber) {
	        var length = sources.length;
	        if (!length) {
	            subscriber.complete();
	            return;
	        }
	        var values = new Array(length);
	        var remainingCompletions = length;
	        var remainingEmissions = length;
	        var _loop_1 = function (sourceIndex) {
	            var hasValue = false;
	            innerFrom_1.innerFrom(sources[sourceIndex]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                if (!hasValue) {
	                    hasValue = true;
	                    remainingEmissions--;
	                }
	                values[sourceIndex] = value;
	            }, function () { return remainingCompletions--; }, undefined, function () {
	                if (!remainingCompletions || !hasValue) {
	                    if (!remainingEmissions) {
	                        subscriber.next(keys ? createObject_1.createObject(keys, values) : values);
	                    }
	                    subscriber.complete();
	                }
	            }));
	        };
	        for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
	            _loop_1(sourceIndex);
	        }
	    });
	    return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
	}
	forkJoin.forkJoin = forkJoin$1;
	
	return forkJoin;
}

var fromEvent = {};

var hasRequiredFromEvent;

function requireFromEvent () {
	if (hasRequiredFromEvent) return fromEvent;
	hasRequiredFromEvent = 1;
	var __read = (fromEvent && fromEvent.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	Object.defineProperty(fromEvent, "__esModule", { value: true });
	fromEvent.fromEvent = void 0;
	var innerFrom_1 = requireInnerFrom();
	var Observable_1 = requireObservable();
	var mergeMap_1 = requireMergeMap();
	var isArrayLike_1 = requireIsArrayLike();
	var isFunction_1 = requireIsFunction();
	var mapOneOrManyArgs_1 = requireMapOneOrManyArgs();
	var nodeEventEmitterMethods = ['addListener', 'removeListener'];
	var eventTargetMethods = ['addEventListener', 'removeEventListener'];
	var jqueryMethods = ['on', 'off'];
	function fromEvent$1(target, eventName, options, resultSelector) {
	    if (isFunction_1.isFunction(options)) {
	        resultSelector = options;
	        options = undefined;
	    }
	    if (resultSelector) {
	        return fromEvent$1(target, eventName, options).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
	    }
	    var _a = __read(isEventTarget(target)
	        ? eventTargetMethods.map(function (methodName) { return function (handler) { return target[methodName](eventName, handler, options); }; })
	        :
	            isNodeStyleEventEmitter(target)
	                ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName))
	                : isJQueryStyleEventEmitter(target)
	                    ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
	                    : [], 2), add = _a[0], remove = _a[1];
	    if (!add) {
	        if (isArrayLike_1.isArrayLike(target)) {
	            return mergeMap_1.mergeMap(function (subTarget) { return fromEvent$1(subTarget, eventName, options); })(innerFrom_1.innerFrom(target));
	        }
	    }
	    if (!add) {
	        throw new TypeError('Invalid event target');
	    }
	    return new Observable_1.Observable(function (subscriber) {
	        var handler = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            return subscriber.next(1 < args.length ? args : args[0]);
	        };
	        add(handler);
	        return function () { return remove(handler); };
	    });
	}
	fromEvent.fromEvent = fromEvent$1;
	function toCommonHandlerRegistry(target, eventName) {
	    return function (methodName) { return function (handler) { return target[methodName](eventName, handler); }; };
	}
	function isNodeStyleEventEmitter(target) {
	    return isFunction_1.isFunction(target.addListener) && isFunction_1.isFunction(target.removeListener);
	}
	function isJQueryStyleEventEmitter(target) {
	    return isFunction_1.isFunction(target.on) && isFunction_1.isFunction(target.off);
	}
	function isEventTarget(target) {
	    return isFunction_1.isFunction(target.addEventListener) && isFunction_1.isFunction(target.removeEventListener);
	}
	
	return fromEvent;
}

var fromEventPattern = {};

var hasRequiredFromEventPattern;

function requireFromEventPattern () {
	if (hasRequiredFromEventPattern) return fromEventPattern;
	hasRequiredFromEventPattern = 1;
	Object.defineProperty(fromEventPattern, "__esModule", { value: true });
	fromEventPattern.fromEventPattern = void 0;
	var Observable_1 = requireObservable();
	var isFunction_1 = requireIsFunction();
	var mapOneOrManyArgs_1 = requireMapOneOrManyArgs();
	function fromEventPattern$1(addHandler, removeHandler, resultSelector) {
	    if (resultSelector) {
	        return fromEventPattern$1(addHandler, removeHandler).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
	    }
	    return new Observable_1.Observable(function (subscriber) {
	        var handler = function () {
	            var e = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                e[_i] = arguments[_i];
	            }
	            return subscriber.next(e.length === 1 ? e[0] : e);
	        };
	        var retValue = addHandler(handler);
	        return isFunction_1.isFunction(removeHandler) ? function () { return removeHandler(handler, retValue); } : undefined;
	    });
	}
	fromEventPattern.fromEventPattern = fromEventPattern$1;
	
	return fromEventPattern;
}

var generate = {};

var hasRequiredGenerate;

function requireGenerate () {
	if (hasRequiredGenerate) return generate;
	hasRequiredGenerate = 1;
	var __generator = (generate && generate.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(generate, "__esModule", { value: true });
	generate.generate = void 0;
	var identity_1 = requireIdentity();
	var isScheduler_1 = requireIsScheduler();
	var defer_1 = requireDefer();
	var scheduleIterable_1 = requireScheduleIterable();
	function generate$1(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
	    var _a, _b;
	    var resultSelector;
	    var initialState;
	    if (arguments.length === 1) {
	        (_a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity_1.identity : _b, scheduler = _a.scheduler);
	    }
	    else {
	        initialState = initialStateOrOptions;
	        if (!resultSelectorOrScheduler || isScheduler_1.isScheduler(resultSelectorOrScheduler)) {
	            resultSelector = identity_1.identity;
	            scheduler = resultSelectorOrScheduler;
	        }
	        else {
	            resultSelector = resultSelectorOrScheduler;
	        }
	    }
	    function gen() {
	        var state;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    state = initialState;
	                    _a.label = 1;
	                case 1:
	                    if (!(!condition || condition(state))) return [3, 4];
	                    return [4, resultSelector(state)];
	                case 2:
	                    _a.sent();
	                    _a.label = 3;
	                case 3:
	                    state = iterate(state);
	                    return [3, 1];
	                case 4: return [2];
	            }
	        });
	    }
	    return defer_1.defer((scheduler
	        ?
	            function () { return scheduleIterable_1.scheduleIterable(gen(), scheduler); }
	        :
	            gen));
	}
	generate.generate = generate$1;
	
	return generate;
}

var iif = {};

var hasRequiredIif;

function requireIif () {
	if (hasRequiredIif) return iif;
	hasRequiredIif = 1;
	Object.defineProperty(iif, "__esModule", { value: true });
	iif.iif = void 0;
	var defer_1 = requireDefer();
	function iif$1(condition, trueResult, falseResult) {
	    return defer_1.defer(function () { return (condition() ? trueResult : falseResult); });
	}
	iif.iif = iif$1;
	
	return iif;
}

var interval = {};

var timer = {};

var hasRequiredTimer;

function requireTimer () {
	if (hasRequiredTimer) return timer;
	hasRequiredTimer = 1;
	Object.defineProperty(timer, "__esModule", { value: true });
	timer.timer = void 0;
	var Observable_1 = requireObservable();
	var async_1 = requireAsync();
	var isScheduler_1 = requireIsScheduler();
	var isDate_1 = requireIsDate();
	function timer$1(dueTime, intervalOrScheduler, scheduler) {
	    if (dueTime === void 0) { dueTime = 0; }
	    if (scheduler === void 0) { scheduler = async_1.async; }
	    var intervalDuration = -1;
	    if (intervalOrScheduler != null) {
	        if (isScheduler_1.isScheduler(intervalOrScheduler)) {
	            scheduler = intervalOrScheduler;
	        }
	        else {
	            intervalDuration = intervalOrScheduler;
	        }
	    }
	    return new Observable_1.Observable(function (subscriber) {
	        var due = isDate_1.isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
	        if (due < 0) {
	            due = 0;
	        }
	        var n = 0;
	        return scheduler.schedule(function () {
	            if (!subscriber.closed) {
	                subscriber.next(n++);
	                if (0 <= intervalDuration) {
	                    this.schedule(undefined, intervalDuration);
	                }
	                else {
	                    subscriber.complete();
	                }
	            }
	        }, due);
	    });
	}
	timer.timer = timer$1;
	
	return timer;
}

var hasRequiredInterval;

function requireInterval () {
	if (hasRequiredInterval) return interval;
	hasRequiredInterval = 1;
	Object.defineProperty(interval, "__esModule", { value: true });
	interval.interval = void 0;
	var async_1 = requireAsync();
	var timer_1 = requireTimer();
	function interval$1(period, scheduler) {
	    if (period === void 0) { period = 0; }
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    if (period < 0) {
	        period = 0;
	    }
	    return timer_1.timer(period, period, scheduler);
	}
	interval.interval = interval$1;
	
	return interval;
}

var merge$1 = {};

var hasRequiredMerge$1;

function requireMerge$1 () {
	if (hasRequiredMerge$1) return merge$1;
	hasRequiredMerge$1 = 1;
	Object.defineProperty(merge$1, "__esModule", { value: true });
	merge$1.merge = void 0;
	var mergeAll_1 = requireMergeAll();
	var innerFrom_1 = requireInnerFrom();
	var empty_1 = requireEmpty();
	var args_1 = requireArgs();
	var from_1 = requireFrom();
	function merge() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var scheduler = args_1.popScheduler(args);
	    var concurrent = args_1.popNumber(args, Infinity);
	    var sources = args;
	    return !sources.length
	        ?
	            empty_1.EMPTY
	        : sources.length === 1
	            ?
	                innerFrom_1.innerFrom(sources[0])
	            :
	                mergeAll_1.mergeAll(concurrent)(from_1.from(sources, scheduler));
	}
	merge$1.merge = merge;
	
	return merge$1;
}

var never = {};

var hasRequiredNever;

function requireNever () {
	if (hasRequiredNever) return never;
	hasRequiredNever = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.never = exports.NEVER = void 0;
		var Observable_1 = requireObservable();
		var noop_1 = requireNoop();
		exports.NEVER = new Observable_1.Observable(noop_1.noop);
		function never() {
		    return exports.NEVER;
		}
		exports.never = never;
		
	} (never));
	return never;
}

var onErrorResumeNext = {};

var argsOrArgArray = {};

var hasRequiredArgsOrArgArray;

function requireArgsOrArgArray () {
	if (hasRequiredArgsOrArgArray) return argsOrArgArray;
	hasRequiredArgsOrArgArray = 1;
	Object.defineProperty(argsOrArgArray, "__esModule", { value: true });
	argsOrArgArray.argsOrArgArray = void 0;
	var isArray = Array.isArray;
	function argsOrArgArray$1(args) {
	    return args.length === 1 && isArray(args[0]) ? args[0] : args;
	}
	argsOrArgArray.argsOrArgArray = argsOrArgArray$1;
	
	return argsOrArgArray;
}

var hasRequiredOnErrorResumeNext;

function requireOnErrorResumeNext () {
	if (hasRequiredOnErrorResumeNext) return onErrorResumeNext;
	hasRequiredOnErrorResumeNext = 1;
	Object.defineProperty(onErrorResumeNext, "__esModule", { value: true });
	onErrorResumeNext.onErrorResumeNext = void 0;
	var Observable_1 = requireObservable();
	var argsOrArgArray_1 = requireArgsOrArgArray();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var noop_1 = requireNoop();
	var innerFrom_1 = requireInnerFrom();
	function onErrorResumeNext$1() {
	    var sources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        sources[_i] = arguments[_i];
	    }
	    var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
	    return new Observable_1.Observable(function (subscriber) {
	        var sourceIndex = 0;
	        var subscribeNext = function () {
	            if (sourceIndex < nextSources.length) {
	                var nextSource = void 0;
	                try {
	                    nextSource = innerFrom_1.innerFrom(nextSources[sourceIndex++]);
	                }
	                catch (err) {
	                    subscribeNext();
	                    return;
	                }
	                var innerSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, undefined, noop_1.noop, noop_1.noop);
	                nextSource.subscribe(innerSubscriber);
	                innerSubscriber.add(subscribeNext);
	            }
	            else {
	                subscriber.complete();
	            }
	        };
	        subscribeNext();
	    });
	}
	onErrorResumeNext.onErrorResumeNext = onErrorResumeNext$1;
	
	return onErrorResumeNext;
}

var pairs = {};

var hasRequiredPairs;

function requirePairs () {
	if (hasRequiredPairs) return pairs;
	hasRequiredPairs = 1;
	Object.defineProperty(pairs, "__esModule", { value: true });
	pairs.pairs = void 0;
	var from_1 = requireFrom();
	function pairs$1(obj, scheduler) {
	    return from_1.from(Object.entries(obj), scheduler);
	}
	pairs.pairs = pairs$1;
	
	return pairs;
}

var partition = {};

var not = {};

var hasRequiredNot;

function requireNot () {
	if (hasRequiredNot) return not;
	hasRequiredNot = 1;
	Object.defineProperty(not, "__esModule", { value: true });
	not.not = void 0;
	function not$1(pred, thisArg) {
	    return function (value, index) { return !pred.call(thisArg, value, index); };
	}
	not.not = not$1;
	
	return not;
}

var filter = {};

var hasRequiredFilter;

function requireFilter () {
	if (hasRequiredFilter) return filter;
	hasRequiredFilter = 1;
	Object.defineProperty(filter, "__esModule", { value: true });
	filter.filter = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function filter$1(predicate, thisArg) {
	    return lift_1.operate(function (source, subscriber) {
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
	    });
	}
	filter.filter = filter$1;
	
	return filter;
}

var hasRequiredPartition;

function requirePartition () {
	if (hasRequiredPartition) return partition;
	hasRequiredPartition = 1;
	Object.defineProperty(partition, "__esModule", { value: true });
	partition.partition = void 0;
	var not_1 = requireNot();
	var filter_1 = requireFilter();
	var innerFrom_1 = requireInnerFrom();
	function partition$1(source, predicate, thisArg) {
	    return [filter_1.filter(predicate, thisArg)(innerFrom_1.innerFrom(source)), filter_1.filter(not_1.not(predicate, thisArg))(innerFrom_1.innerFrom(source))];
	}
	partition.partition = partition$1;
	
	return partition;
}

var race = {};

var hasRequiredRace;

function requireRace () {
	if (hasRequiredRace) return race;
	hasRequiredRace = 1;
	Object.defineProperty(race, "__esModule", { value: true });
	race.raceInit = race.race = void 0;
	var Observable_1 = requireObservable();
	var innerFrom_1 = requireInnerFrom();
	var argsOrArgArray_1 = requireArgsOrArgArray();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function race$1() {
	    var sources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        sources[_i] = arguments[_i];
	    }
	    sources = argsOrArgArray_1.argsOrArgArray(sources);
	    return sources.length === 1 ? innerFrom_1.innerFrom(sources[0]) : new Observable_1.Observable(raceInit(sources));
	}
	race.race = race$1;
	function raceInit(sources) {
	    return function (subscriber) {
	        var subscriptions = [];
	        var _loop_1 = function (i) {
	            subscriptions.push(innerFrom_1.innerFrom(sources[i]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                if (subscriptions) {
	                    for (var s = 0; s < subscriptions.length; s++) {
	                        s !== i && subscriptions[s].unsubscribe();
	                    }
	                    subscriptions = null;
	                }
	                subscriber.next(value);
	            })));
	        };
	        for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
	            _loop_1(i);
	        }
	    };
	}
	race.raceInit = raceInit;
	
	return race;
}

var range = {};

var hasRequiredRange;

function requireRange () {
	if (hasRequiredRange) return range;
	hasRequiredRange = 1;
	Object.defineProperty(range, "__esModule", { value: true });
	range.range = void 0;
	var Observable_1 = requireObservable();
	var empty_1 = requireEmpty();
	function range$1(start, count, scheduler) {
	    if (count == null) {
	        count = start;
	        start = 0;
	    }
	    if (count <= 0) {
	        return empty_1.EMPTY;
	    }
	    var end = count + start;
	    return new Observable_1.Observable(scheduler
	        ?
	            function (subscriber) {
	                var n = start;
	                return scheduler.schedule(function () {
	                    if (n < end) {
	                        subscriber.next(n++);
	                        this.schedule();
	                    }
	                    else {
	                        subscriber.complete();
	                    }
	                });
	            }
	        :
	            function (subscriber) {
	                var n = start;
	                while (n < end && !subscriber.closed) {
	                    subscriber.next(n++);
	                }
	                subscriber.complete();
	            });
	}
	range.range = range$1;
	
	return range;
}

var using = {};

var hasRequiredUsing;

function requireUsing () {
	if (hasRequiredUsing) return using;
	hasRequiredUsing = 1;
	Object.defineProperty(using, "__esModule", { value: true });
	using.using = void 0;
	var Observable_1 = requireObservable();
	var innerFrom_1 = requireInnerFrom();
	var empty_1 = requireEmpty();
	function using$1(resourceFactory, observableFactory) {
	    return new Observable_1.Observable(function (subscriber) {
	        var resource = resourceFactory();
	        var result = observableFactory(resource);
	        var source = result ? innerFrom_1.innerFrom(result) : empty_1.EMPTY;
	        source.subscribe(subscriber);
	        return function () {
	            if (resource) {
	                resource.unsubscribe();
	            }
	        };
	    });
	}
	using.using = using$1;
	
	return using;
}

var zip$1 = {};

var hasRequiredZip$1;

function requireZip$1 () {
	if (hasRequiredZip$1) return zip$1;
	hasRequiredZip$1 = 1;
	var __read = (zip$1 && zip$1.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (zip$1 && zip$1.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(zip$1, "__esModule", { value: true });
	zip$1.zip = void 0;
	var Observable_1 = requireObservable();
	var innerFrom_1 = requireInnerFrom();
	var argsOrArgArray_1 = requireArgsOrArgArray();
	var empty_1 = requireEmpty();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var args_1 = requireArgs();
	function zip() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var resultSelector = args_1.popResultSelector(args);
	    var sources = argsOrArgArray_1.argsOrArgArray(args);
	    return sources.length
	        ? new Observable_1.Observable(function (subscriber) {
	            var buffers = sources.map(function () { return []; });
	            var completed = sources.map(function () { return false; });
	            subscriber.add(function () {
	                buffers = completed = null;
	            });
	            var _loop_1 = function (sourceIndex) {
	                innerFrom_1.innerFrom(sources[sourceIndex]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                    buffers[sourceIndex].push(value);
	                    if (buffers.every(function (buffer) { return buffer.length; })) {
	                        var result = buffers.map(function (buffer) { return buffer.shift(); });
	                        subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
	                        if (buffers.some(function (buffer, i) { return !buffer.length && completed[i]; })) {
	                            subscriber.complete();
	                        }
	                    }
	                }, function () {
	                    completed[sourceIndex] = true;
	                    !buffers[sourceIndex].length && subscriber.complete();
	                }));
	            };
	            for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
	                _loop_1(sourceIndex);
	            }
	            return function () {
	                buffers = completed = null;
	            };
	        })
	        : empty_1.EMPTY;
	}
	zip$1.zip = zip;
	
	return zip$1;
}

var types = {};

var hasRequiredTypes;

function requireTypes () {
	if (hasRequiredTypes) return types;
	hasRequiredTypes = 1;
	Object.defineProperty(types, "__esModule", { value: true });
	
	return types;
}

var audit = {};

var hasRequiredAudit;

function requireAudit () {
	if (hasRequiredAudit) return audit;
	hasRequiredAudit = 1;
	Object.defineProperty(audit, "__esModule", { value: true });
	audit.audit = void 0;
	var lift_1 = requireLift();
	var innerFrom_1 = requireInnerFrom();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function audit$1(durationSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var hasValue = false;
	        var lastValue = null;
	        var durationSubscriber = null;
	        var isComplete = false;
	        var endDuration = function () {
	            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
	            durationSubscriber = null;
	            if (hasValue) {
	                hasValue = false;
	                var value = lastValue;
	                lastValue = null;
	                subscriber.next(value);
	            }
	            isComplete && subscriber.complete();
	        };
	        var cleanupDuration = function () {
	            durationSubscriber = null;
	            isComplete && subscriber.complete();
	        };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            hasValue = true;
	            lastValue = value;
	            if (!durationSubscriber) {
	                innerFrom_1.innerFrom(durationSelector(value)).subscribe((durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, endDuration, cleanupDuration)));
	            }
	        }, function () {
	            isComplete = true;
	            (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
	        }));
	    });
	}
	audit.audit = audit$1;
	
	return audit;
}

var auditTime = {};

var hasRequiredAuditTime;

function requireAuditTime () {
	if (hasRequiredAuditTime) return auditTime;
	hasRequiredAuditTime = 1;
	Object.defineProperty(auditTime, "__esModule", { value: true });
	auditTime.auditTime = void 0;
	var async_1 = requireAsync();
	var audit_1 = requireAudit();
	var timer_1 = requireTimer();
	function auditTime$1(duration, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    return audit_1.audit(function () { return timer_1.timer(duration, scheduler); });
	}
	auditTime.auditTime = auditTime$1;
	
	return auditTime;
}

var buffer = {};

var hasRequiredBuffer;

function requireBuffer () {
	if (hasRequiredBuffer) return buffer;
	hasRequiredBuffer = 1;
	Object.defineProperty(buffer, "__esModule", { value: true });
	buffer.buffer = void 0;
	var lift_1 = requireLift();
	var noop_1 = requireNoop();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var innerFrom_1 = requireInnerFrom();
	function buffer$1(closingNotifier) {
	    return lift_1.operate(function (source, subscriber) {
	        var currentBuffer = [];
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return currentBuffer.push(value); }, function () {
	            subscriber.next(currentBuffer);
	            subscriber.complete();
	        }));
	        innerFrom_1.innerFrom(closingNotifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	            var b = currentBuffer;
	            currentBuffer = [];
	            subscriber.next(b);
	        }, noop_1.noop));
	        return function () {
	            currentBuffer = null;
	        };
	    });
	}
	buffer.buffer = buffer$1;
	
	return buffer;
}

var bufferCount = {};

var hasRequiredBufferCount;

function requireBufferCount () {
	if (hasRequiredBufferCount) return bufferCount;
	hasRequiredBufferCount = 1;
	var __values = (bufferCount && bufferCount.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(bufferCount, "__esModule", { value: true });
	bufferCount.bufferCount = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var arrRemove_1 = requireArrRemove();
	function bufferCount$1(bufferSize, startBufferEvery) {
	    if (startBufferEvery === void 0) { startBufferEvery = null; }
	    startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
	    return lift_1.operate(function (source, subscriber) {
	        var buffers = [];
	        var count = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var e_1, _a, e_2, _b;
	            var toEmit = null;
	            if (count++ % startBufferEvery === 0) {
	                buffers.push([]);
	            }
	            try {
	                for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
	                    var buffer = buffers_1_1.value;
	                    buffer.push(value);
	                    if (bufferSize <= buffer.length) {
	                        toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
	                        toEmit.push(buffer);
	                    }
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	            if (toEmit) {
	                try {
	                    for (var toEmit_1 = __values(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
	                        var buffer = toEmit_1_1.value;
	                        arrRemove_1.arrRemove(buffers, buffer);
	                        subscriber.next(buffer);
	                    }
	                }
	                catch (e_2_1) { e_2 = { error: e_2_1 }; }
	                finally {
	                    try {
	                        if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
	                    }
	                    finally { if (e_2) throw e_2.error; }
	                }
	            }
	        }, function () {
	            var e_3, _a;
	            try {
	                for (var buffers_2 = __values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
	                    var buffer = buffers_2_1.value;
	                    subscriber.next(buffer);
	                }
	            }
	            catch (e_3_1) { e_3 = { error: e_3_1 }; }
	            finally {
	                try {
	                    if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
	                }
	                finally { if (e_3) throw e_3.error; }
	            }
	            subscriber.complete();
	        }, undefined, function () {
	            buffers = null;
	        }));
	    });
	}
	bufferCount.bufferCount = bufferCount$1;
	
	return bufferCount;
}

var bufferTime = {};

var hasRequiredBufferTime;

function requireBufferTime () {
	if (hasRequiredBufferTime) return bufferTime;
	hasRequiredBufferTime = 1;
	var __values = (bufferTime && bufferTime.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(bufferTime, "__esModule", { value: true });
	bufferTime.bufferTime = void 0;
	var Subscription_1 = requireSubscription();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var arrRemove_1 = requireArrRemove();
	var async_1 = requireAsync();
	var args_1 = requireArgs();
	var executeSchedule_1 = requireExecuteSchedule();
	function bufferTime$1(bufferTimeSpan) {
	    var _a, _b;
	    var otherArgs = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        otherArgs[_i - 1] = arguments[_i];
	    }
	    var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
	    var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
	    var maxBufferSize = otherArgs[1] || Infinity;
	    return lift_1.operate(function (source, subscriber) {
	        var bufferRecords = [];
	        var restartOnEmit = false;
	        var emit = function (record) {
	            var buffer = record.buffer, subs = record.subs;
	            subs.unsubscribe();
	            arrRemove_1.arrRemove(bufferRecords, record);
	            subscriber.next(buffer);
	            restartOnEmit && startBuffer();
	        };
	        var startBuffer = function () {
	            if (bufferRecords) {
	                var subs = new Subscription_1.Subscription();
	                subscriber.add(subs);
	                var buffer = [];
	                var record_1 = {
	                    buffer: buffer,
	                    subs: subs,
	                };
	                bufferRecords.push(record_1);
	                executeSchedule_1.executeSchedule(subs, scheduler, function () { return emit(record_1); }, bufferTimeSpan);
	            }
	        };
	        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
	            executeSchedule_1.executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
	        }
	        else {
	            restartOnEmit = true;
	        }
	        startBuffer();
	        var bufferTimeSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var e_1, _a;
	            var recordsCopy = bufferRecords.slice();
	            try {
	                for (var recordsCopy_1 = __values(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
	                    var record = recordsCopy_1_1.value;
	                    var buffer = record.buffer;
	                    buffer.push(value);
	                    maxBufferSize <= buffer.length && emit(record);
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a = recordsCopy_1.return)) _a.call(recordsCopy_1);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	        }, function () {
	            while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
	                subscriber.next(bufferRecords.shift().buffer);
	            }
	            bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
	            subscriber.complete();
	            subscriber.unsubscribe();
	        }, undefined, function () { return (bufferRecords = null); });
	        source.subscribe(bufferTimeSubscriber);
	    });
	}
	bufferTime.bufferTime = bufferTime$1;
	
	return bufferTime;
}

var bufferToggle = {};

var hasRequiredBufferToggle;

function requireBufferToggle () {
	if (hasRequiredBufferToggle) return bufferToggle;
	hasRequiredBufferToggle = 1;
	var __values = (bufferToggle && bufferToggle.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(bufferToggle, "__esModule", { value: true });
	bufferToggle.bufferToggle = void 0;
	var Subscription_1 = requireSubscription();
	var lift_1 = requireLift();
	var innerFrom_1 = requireInnerFrom();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var noop_1 = requireNoop();
	var arrRemove_1 = requireArrRemove();
	function bufferToggle$1(openings, closingSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var buffers = [];
	        innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (openValue) {
	            var buffer = [];
	            buffers.push(buffer);
	            var closingSubscription = new Subscription_1.Subscription();
	            var emitBuffer = function () {
	                arrRemove_1.arrRemove(buffers, buffer);
	                subscriber.next(buffer);
	                closingSubscription.unsubscribe();
	            };
	            closingSubscription.add(innerFrom_1.innerFrom(closingSelector(openValue)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, emitBuffer, noop_1.noop)));
	        }, noop_1.noop));
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var e_1, _a;
	            try {
	                for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
	                    var buffer = buffers_1_1.value;
	                    buffer.push(value);
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	        }, function () {
	            while (buffers.length > 0) {
	                subscriber.next(buffers.shift());
	            }
	            subscriber.complete();
	        }));
	    });
	}
	bufferToggle.bufferToggle = bufferToggle$1;
	
	return bufferToggle;
}

var bufferWhen = {};

var hasRequiredBufferWhen;

function requireBufferWhen () {
	if (hasRequiredBufferWhen) return bufferWhen;
	hasRequiredBufferWhen = 1;
	Object.defineProperty(bufferWhen, "__esModule", { value: true });
	bufferWhen.bufferWhen = void 0;
	var lift_1 = requireLift();
	var noop_1 = requireNoop();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var innerFrom_1 = requireInnerFrom();
	function bufferWhen$1(closingSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var buffer = null;
	        var closingSubscriber = null;
	        var openBuffer = function () {
	            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
	            var b = buffer;
	            buffer = [];
	            b && subscriber.next(b);
	            innerFrom_1.innerFrom(closingSelector()).subscribe((closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openBuffer, noop_1.noop)));
	        };
	        openBuffer();
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return buffer === null || buffer === void 0 ? void 0 : buffer.push(value); }, function () {
	            buffer && subscriber.next(buffer);
	            subscriber.complete();
	        }, undefined, function () { return (buffer = closingSubscriber = null); }));
	    });
	}
	bufferWhen.bufferWhen = bufferWhen$1;
	
	return bufferWhen;
}

var catchError = {};

var hasRequiredCatchError;

function requireCatchError () {
	if (hasRequiredCatchError) return catchError;
	hasRequiredCatchError = 1;
	Object.defineProperty(catchError, "__esModule", { value: true });
	catchError.catchError = void 0;
	var innerFrom_1 = requireInnerFrom();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var lift_1 = requireLift();
	function catchError$1(selector) {
	    return lift_1.operate(function (source, subscriber) {
	        var innerSub = null;
	        var syncUnsub = false;
	        var handledResult;
	        innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, undefined, function (err) {
	            handledResult = innerFrom_1.innerFrom(selector(err, catchError$1(selector)(source)));
	            if (innerSub) {
	                innerSub.unsubscribe();
	                innerSub = null;
	                handledResult.subscribe(subscriber);
	            }
	            else {
	                syncUnsub = true;
	            }
	        }));
	        if (syncUnsub) {
	            innerSub.unsubscribe();
	            innerSub = null;
	            handledResult.subscribe(subscriber);
	        }
	    });
	}
	catchError.catchError = catchError$1;
	
	return catchError;
}

var combineAll = {};

var combineLatestAll = {};

var joinAllInternals = {};

var toArray = {};

var reduce = {};

var scanInternals = {};

var hasRequiredScanInternals;

function requireScanInternals () {
	if (hasRequiredScanInternals) return scanInternals;
	hasRequiredScanInternals = 1;
	Object.defineProperty(scanInternals, "__esModule", { value: true });
	scanInternals.scanInternals = void 0;
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function scanInternals$1(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
	    return function (source, subscriber) {
	        var hasState = hasSeed;
	        var state = seed;
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var i = index++;
	            state = hasState
	                ?
	                    accumulator(state, value, i)
	                :
	                    ((hasState = true), value);
	            emitOnNext && subscriber.next(state);
	        }, emitBeforeComplete &&
	            (function () {
	                hasState && subscriber.next(state);
	                subscriber.complete();
	            })));
	    };
	}
	scanInternals.scanInternals = scanInternals$1;
	
	return scanInternals;
}

var hasRequiredReduce;

function requireReduce () {
	if (hasRequiredReduce) return reduce;
	hasRequiredReduce = 1;
	Object.defineProperty(reduce, "__esModule", { value: true });
	reduce.reduce = void 0;
	var scanInternals_1 = requireScanInternals();
	var lift_1 = requireLift();
	function reduce$1(accumulator, seed) {
	    return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, false, true));
	}
	reduce.reduce = reduce$1;
	
	return reduce;
}

var hasRequiredToArray;

function requireToArray () {
	if (hasRequiredToArray) return toArray;
	hasRequiredToArray = 1;
	Object.defineProperty(toArray, "__esModule", { value: true });
	toArray.toArray = void 0;
	var reduce_1 = requireReduce();
	var lift_1 = requireLift();
	var arrReducer = function (arr, value) { return (arr.push(value), arr); };
	function toArray$1() {
	    return lift_1.operate(function (source, subscriber) {
	        reduce_1.reduce(arrReducer, [])(source).subscribe(subscriber);
	    });
	}
	toArray.toArray = toArray$1;
	
	return toArray;
}

var hasRequiredJoinAllInternals;

function requireJoinAllInternals () {
	if (hasRequiredJoinAllInternals) return joinAllInternals;
	hasRequiredJoinAllInternals = 1;
	Object.defineProperty(joinAllInternals, "__esModule", { value: true });
	joinAllInternals.joinAllInternals = void 0;
	var identity_1 = requireIdentity();
	var mapOneOrManyArgs_1 = requireMapOneOrManyArgs();
	var pipe_1 = requirePipe();
	var mergeMap_1 = requireMergeMap();
	var toArray_1 = requireToArray();
	function joinAllInternals$1(joinFn, project) {
	    return pipe_1.pipe(toArray_1.toArray(), mergeMap_1.mergeMap(function (sources) { return joinFn(sources); }), project ? mapOneOrManyArgs_1.mapOneOrManyArgs(project) : identity_1.identity);
	}
	joinAllInternals.joinAllInternals = joinAllInternals$1;
	
	return joinAllInternals;
}

var hasRequiredCombineLatestAll;

function requireCombineLatestAll () {
	if (hasRequiredCombineLatestAll) return combineLatestAll;
	hasRequiredCombineLatestAll = 1;
	Object.defineProperty(combineLatestAll, "__esModule", { value: true });
	combineLatestAll.combineLatestAll = void 0;
	var combineLatest_1 = requireCombineLatest$1();
	var joinAllInternals_1 = requireJoinAllInternals();
	function combineLatestAll$1(project) {
	    return joinAllInternals_1.joinAllInternals(combineLatest_1.combineLatest, project);
	}
	combineLatestAll.combineLatestAll = combineLatestAll$1;
	
	return combineLatestAll;
}

var hasRequiredCombineAll;

function requireCombineAll () {
	if (hasRequiredCombineAll) return combineAll;
	hasRequiredCombineAll = 1;
	Object.defineProperty(combineAll, "__esModule", { value: true });
	combineAll.combineAll = void 0;
	var combineLatestAll_1 = requireCombineLatestAll();
	combineAll.combineAll = combineLatestAll_1.combineLatestAll;
	
	return combineAll;
}

var combineLatestWith = {};

var combineLatest = {};

var hasRequiredCombineLatest;

function requireCombineLatest () {
	if (hasRequiredCombineLatest) return combineLatest;
	hasRequiredCombineLatest = 1;
	var __read = (combineLatest && combineLatest.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (combineLatest && combineLatest.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(combineLatest, "__esModule", { value: true });
	combineLatest.combineLatest = void 0;
	var combineLatest_1 = requireCombineLatest$1();
	var lift_1 = requireLift();
	var argsOrArgArray_1 = requireArgsOrArgArray();
	var mapOneOrManyArgs_1 = requireMapOneOrManyArgs();
	var pipe_1 = requirePipe();
	var args_1 = requireArgs();
	function combineLatest$1() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var resultSelector = args_1.popResultSelector(args);
	    return resultSelector
	        ? pipe_1.pipe(combineLatest$1.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector))
	        : lift_1.operate(function (source, subscriber) {
	            combineLatest_1.combineLatestInit(__spreadArray([source], __read(argsOrArgArray_1.argsOrArgArray(args))))(subscriber);
	        });
	}
	combineLatest.combineLatest = combineLatest$1;
	
	return combineLatest;
}

var hasRequiredCombineLatestWith;

function requireCombineLatestWith () {
	if (hasRequiredCombineLatestWith) return combineLatestWith;
	hasRequiredCombineLatestWith = 1;
	var __read = (combineLatestWith && combineLatestWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (combineLatestWith && combineLatestWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(combineLatestWith, "__esModule", { value: true });
	combineLatestWith.combineLatestWith = void 0;
	var combineLatest_1 = requireCombineLatest();
	function combineLatestWith$1() {
	    var otherSources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        otherSources[_i] = arguments[_i];
	    }
	    return combineLatest_1.combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
	}
	combineLatestWith.combineLatestWith = combineLatestWith$1;
	
	return combineLatestWith;
}

var concatMap = {};

var hasRequiredConcatMap;

function requireConcatMap () {
	if (hasRequiredConcatMap) return concatMap;
	hasRequiredConcatMap = 1;
	Object.defineProperty(concatMap, "__esModule", { value: true });
	concatMap.concatMap = void 0;
	var mergeMap_1 = requireMergeMap();
	var isFunction_1 = requireIsFunction();
	function concatMap$1(project, resultSelector) {
	    return isFunction_1.isFunction(resultSelector) ? mergeMap_1.mergeMap(project, resultSelector, 1) : mergeMap_1.mergeMap(project, 1);
	}
	concatMap.concatMap = concatMap$1;
	
	return concatMap;
}

var concatMapTo = {};

var hasRequiredConcatMapTo;

function requireConcatMapTo () {
	if (hasRequiredConcatMapTo) return concatMapTo;
	hasRequiredConcatMapTo = 1;
	Object.defineProperty(concatMapTo, "__esModule", { value: true });
	concatMapTo.concatMapTo = void 0;
	var concatMap_1 = requireConcatMap();
	var isFunction_1 = requireIsFunction();
	function concatMapTo$1(innerObservable, resultSelector) {
	    return isFunction_1.isFunction(resultSelector) ? concatMap_1.concatMap(function () { return innerObservable; }, resultSelector) : concatMap_1.concatMap(function () { return innerObservable; });
	}
	concatMapTo.concatMapTo = concatMapTo$1;
	
	return concatMapTo;
}

var concatWith = {};

var concat = {};

var hasRequiredConcat;

function requireConcat () {
	if (hasRequiredConcat) return concat;
	hasRequiredConcat = 1;
	var __read = (concat && concat.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (concat && concat.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(concat, "__esModule", { value: true });
	concat.concat = void 0;
	var lift_1 = requireLift();
	var concatAll_1 = requireConcatAll();
	var args_1 = requireArgs();
	var from_1 = requireFrom();
	function concat$1() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var scheduler = args_1.popScheduler(args);
	    return lift_1.operate(function (source, subscriber) {
	        concatAll_1.concatAll()(from_1.from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
	    });
	}
	concat.concat = concat$1;
	
	return concat;
}

var hasRequiredConcatWith;

function requireConcatWith () {
	if (hasRequiredConcatWith) return concatWith;
	hasRequiredConcatWith = 1;
	var __read = (concatWith && concatWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (concatWith && concatWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(concatWith, "__esModule", { value: true });
	concatWith.concatWith = void 0;
	var concat_1 = requireConcat();
	function concatWith$1() {
	    var otherSources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        otherSources[_i] = arguments[_i];
	    }
	    return concat_1.concat.apply(void 0, __spreadArray([], __read(otherSources)));
	}
	concatWith.concatWith = concatWith$1;
	
	return concatWith;
}

var connect = {};

var fromSubscribable = {};

var hasRequiredFromSubscribable;

function requireFromSubscribable () {
	if (hasRequiredFromSubscribable) return fromSubscribable;
	hasRequiredFromSubscribable = 1;
	Object.defineProperty(fromSubscribable, "__esModule", { value: true });
	fromSubscribable.fromSubscribable = void 0;
	var Observable_1 = requireObservable();
	function fromSubscribable$1(subscribable) {
	    return new Observable_1.Observable(function (subscriber) { return subscribable.subscribe(subscriber); });
	}
	fromSubscribable.fromSubscribable = fromSubscribable$1;
	
	return fromSubscribable;
}

var hasRequiredConnect;

function requireConnect () {
	if (hasRequiredConnect) return connect;
	hasRequiredConnect = 1;
	Object.defineProperty(connect, "__esModule", { value: true });
	connect.connect = void 0;
	var Subject_1 = requireSubject();
	var innerFrom_1 = requireInnerFrom();
	var lift_1 = requireLift();
	var fromSubscribable_1 = requireFromSubscribable();
	var DEFAULT_CONFIG = {
	    connector: function () { return new Subject_1.Subject(); },
	};
	function connect$1(selector, config) {
	    if (config === void 0) { config = DEFAULT_CONFIG; }
	    var connector = config.connector;
	    return lift_1.operate(function (source, subscriber) {
	        var subject = connector();
	        innerFrom_1.innerFrom(selector(fromSubscribable_1.fromSubscribable(subject))).subscribe(subscriber);
	        subscriber.add(source.subscribe(subject));
	    });
	}
	connect.connect = connect$1;
	
	return connect;
}

var count = {};

var hasRequiredCount;

function requireCount () {
	if (hasRequiredCount) return count;
	hasRequiredCount = 1;
	Object.defineProperty(count, "__esModule", { value: true });
	count.count = void 0;
	var reduce_1 = requireReduce();
	function count$1(predicate) {
	    return reduce_1.reduce(function (total, value, i) { return (!predicate || predicate(value, i) ? total + 1 : total); }, 0);
	}
	count.count = count$1;
	
	return count;
}

var debounce = {};

var hasRequiredDebounce;

function requireDebounce () {
	if (hasRequiredDebounce) return debounce;
	hasRequiredDebounce = 1;
	Object.defineProperty(debounce, "__esModule", { value: true });
	debounce.debounce = void 0;
	var lift_1 = requireLift();
	var noop_1 = requireNoop();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var innerFrom_1 = requireInnerFrom();
	function debounce$1(durationSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var hasValue = false;
	        var lastValue = null;
	        var durationSubscriber = null;
	        var emit = function () {
	            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
	            durationSubscriber = null;
	            if (hasValue) {
	                hasValue = false;
	                var value = lastValue;
	                lastValue = null;
	                subscriber.next(value);
	            }
	        };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
	            hasValue = true;
	            lastValue = value;
	            durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, emit, noop_1.noop);
	            innerFrom_1.innerFrom(durationSelector(value)).subscribe(durationSubscriber);
	        }, function () {
	            emit();
	            subscriber.complete();
	        }, undefined, function () {
	            lastValue = durationSubscriber = null;
	        }));
	    });
	}
	debounce.debounce = debounce$1;
	
	return debounce;
}

var debounceTime = {};

var hasRequiredDebounceTime;

function requireDebounceTime () {
	if (hasRequiredDebounceTime) return debounceTime;
	hasRequiredDebounceTime = 1;
	Object.defineProperty(debounceTime, "__esModule", { value: true });
	debounceTime.debounceTime = void 0;
	var async_1 = requireAsync();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function debounceTime$1(dueTime, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    return lift_1.operate(function (source, subscriber) {
	        var activeTask = null;
	        var lastValue = null;
	        var lastTime = null;
	        var emit = function () {
	            if (activeTask) {
	                activeTask.unsubscribe();
	                activeTask = null;
	                var value = lastValue;
	                lastValue = null;
	                subscriber.next(value);
	            }
	        };
	        function emitWhenIdle() {
	            var targetTime = lastTime + dueTime;
	            var now = scheduler.now();
	            if (now < targetTime) {
	                activeTask = this.schedule(undefined, targetTime - now);
	                subscriber.add(activeTask);
	                return;
	            }
	            emit();
	        }
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            lastValue = value;
	            lastTime = scheduler.now();
	            if (!activeTask) {
	                activeTask = scheduler.schedule(emitWhenIdle, dueTime);
	                subscriber.add(activeTask);
	            }
	        }, function () {
	            emit();
	            subscriber.complete();
	        }, undefined, function () {
	            lastValue = activeTask = null;
	        }));
	    });
	}
	debounceTime.debounceTime = debounceTime$1;
	
	return debounceTime;
}

var defaultIfEmpty = {};

var hasRequiredDefaultIfEmpty;

function requireDefaultIfEmpty () {
	if (hasRequiredDefaultIfEmpty) return defaultIfEmpty;
	hasRequiredDefaultIfEmpty = 1;
	Object.defineProperty(defaultIfEmpty, "__esModule", { value: true });
	defaultIfEmpty.defaultIfEmpty = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function defaultIfEmpty$1(defaultValue) {
	    return lift_1.operate(function (source, subscriber) {
	        var hasValue = false;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            hasValue = true;
	            subscriber.next(value);
	        }, function () {
	            if (!hasValue) {
	                subscriber.next(defaultValue);
	            }
	            subscriber.complete();
	        }));
	    });
	}
	defaultIfEmpty.defaultIfEmpty = defaultIfEmpty$1;
	
	return defaultIfEmpty;
}

var delay = {};

var delayWhen = {};

var take = {};

var hasRequiredTake;

function requireTake () {
	if (hasRequiredTake) return take;
	hasRequiredTake = 1;
	Object.defineProperty(take, "__esModule", { value: true });
	take.take = void 0;
	var empty_1 = requireEmpty();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function take$1(count) {
	    return count <= 0
	        ?
	            function () { return empty_1.EMPTY; }
	        : lift_1.operate(function (source, subscriber) {
	            var seen = 0;
	            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                if (++seen <= count) {
	                    subscriber.next(value);
	                    if (count <= seen) {
	                        subscriber.complete();
	                    }
	                }
	            }));
	        });
	}
	take.take = take$1;
	
	return take;
}

var ignoreElements = {};

var hasRequiredIgnoreElements;

function requireIgnoreElements () {
	if (hasRequiredIgnoreElements) return ignoreElements;
	hasRequiredIgnoreElements = 1;
	Object.defineProperty(ignoreElements, "__esModule", { value: true });
	ignoreElements.ignoreElements = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var noop_1 = requireNoop();
	function ignoreElements$1() {
	    return lift_1.operate(function (source, subscriber) {
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, noop_1.noop));
	    });
	}
	ignoreElements.ignoreElements = ignoreElements$1;
	
	return ignoreElements;
}

var mapTo = {};

var hasRequiredMapTo;

function requireMapTo () {
	if (hasRequiredMapTo) return mapTo;
	hasRequiredMapTo = 1;
	Object.defineProperty(mapTo, "__esModule", { value: true });
	mapTo.mapTo = void 0;
	var map_1 = requireMap();
	function mapTo$1(value) {
	    return map_1.map(function () { return value; });
	}
	mapTo.mapTo = mapTo$1;
	
	return mapTo;
}

var hasRequiredDelayWhen;

function requireDelayWhen () {
	if (hasRequiredDelayWhen) return delayWhen;
	hasRequiredDelayWhen = 1;
	Object.defineProperty(delayWhen, "__esModule", { value: true });
	delayWhen.delayWhen = void 0;
	var concat_1 = requireConcat$1();
	var take_1 = requireTake();
	var ignoreElements_1 = requireIgnoreElements();
	var mapTo_1 = requireMapTo();
	var mergeMap_1 = requireMergeMap();
	var innerFrom_1 = requireInnerFrom();
	function delayWhen$1(delayDurationSelector, subscriptionDelay) {
	    if (subscriptionDelay) {
	        return function (source) {
	            return concat_1.concat(subscriptionDelay.pipe(take_1.take(1), ignoreElements_1.ignoreElements()), source.pipe(delayWhen$1(delayDurationSelector)));
	        };
	    }
	    return mergeMap_1.mergeMap(function (value, index) { return innerFrom_1.innerFrom(delayDurationSelector(value, index)).pipe(take_1.take(1), mapTo_1.mapTo(value)); });
	}
	delayWhen.delayWhen = delayWhen$1;
	
	return delayWhen;
}

var hasRequiredDelay;

function requireDelay () {
	if (hasRequiredDelay) return delay;
	hasRequiredDelay = 1;
	Object.defineProperty(delay, "__esModule", { value: true });
	delay.delay = void 0;
	var async_1 = requireAsync();
	var delayWhen_1 = requireDelayWhen();
	var timer_1 = requireTimer();
	function delay$1(due, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    var duration = timer_1.timer(due, scheduler);
	    return delayWhen_1.delayWhen(function () { return duration; });
	}
	delay.delay = delay$1;
	
	return delay;
}

var dematerialize = {};

var hasRequiredDematerialize;

function requireDematerialize () {
	if (hasRequiredDematerialize) return dematerialize;
	hasRequiredDematerialize = 1;
	Object.defineProperty(dematerialize, "__esModule", { value: true });
	dematerialize.dematerialize = void 0;
	var Notification_1 = requireNotification();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function dematerialize$1() {
	    return lift_1.operate(function (source, subscriber) {
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (notification) { return Notification_1.observeNotification(notification, subscriber); }));
	    });
	}
	dematerialize.dematerialize = dematerialize$1;
	
	return dematerialize;
}

var distinct = {};

var hasRequiredDistinct;

function requireDistinct () {
	if (hasRequiredDistinct) return distinct;
	hasRequiredDistinct = 1;
	Object.defineProperty(distinct, "__esModule", { value: true });
	distinct.distinct = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var noop_1 = requireNoop();
	var innerFrom_1 = requireInnerFrom();
	function distinct$1(keySelector, flushes) {
	    return lift_1.operate(function (source, subscriber) {
	        var distinctKeys = new Set();
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var key = keySelector ? keySelector(value) : value;
	            if (!distinctKeys.has(key)) {
	                distinctKeys.add(key);
	                subscriber.next(value);
	            }
	        }));
	        flushes && innerFrom_1.innerFrom(flushes).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () { return distinctKeys.clear(); }, noop_1.noop));
	    });
	}
	distinct.distinct = distinct$1;
	
	return distinct;
}

var distinctUntilChanged = {};

var hasRequiredDistinctUntilChanged;

function requireDistinctUntilChanged () {
	if (hasRequiredDistinctUntilChanged) return distinctUntilChanged;
	hasRequiredDistinctUntilChanged = 1;
	Object.defineProperty(distinctUntilChanged, "__esModule", { value: true });
	distinctUntilChanged.distinctUntilChanged = void 0;
	var identity_1 = requireIdentity();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function distinctUntilChanged$1(comparator, keySelector) {
	    if (keySelector === void 0) { keySelector = identity_1.identity; }
	    comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
	    return lift_1.operate(function (source, subscriber) {
	        var previousKey;
	        var first = true;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var currentKey = keySelector(value);
	            if (first || !comparator(previousKey, currentKey)) {
	                first = false;
	                previousKey = currentKey;
	                subscriber.next(value);
	            }
	        }));
	    });
	}
	distinctUntilChanged.distinctUntilChanged = distinctUntilChanged$1;
	function defaultCompare(a, b) {
	    return a === b;
	}
	
	return distinctUntilChanged;
}

var distinctUntilKeyChanged = {};

var hasRequiredDistinctUntilKeyChanged;

function requireDistinctUntilKeyChanged () {
	if (hasRequiredDistinctUntilKeyChanged) return distinctUntilKeyChanged;
	hasRequiredDistinctUntilKeyChanged = 1;
	Object.defineProperty(distinctUntilKeyChanged, "__esModule", { value: true });
	distinctUntilKeyChanged.distinctUntilKeyChanged = void 0;
	var distinctUntilChanged_1 = requireDistinctUntilChanged();
	function distinctUntilKeyChanged$1(key, compare) {
	    return distinctUntilChanged_1.distinctUntilChanged(function (x, y) { return (compare ? compare(x[key], y[key]) : x[key] === y[key]); });
	}
	distinctUntilKeyChanged.distinctUntilKeyChanged = distinctUntilKeyChanged$1;
	
	return distinctUntilKeyChanged;
}

var elementAt = {};

var throwIfEmpty = {};

var hasRequiredThrowIfEmpty;

function requireThrowIfEmpty () {
	if (hasRequiredThrowIfEmpty) return throwIfEmpty;
	hasRequiredThrowIfEmpty = 1;
	Object.defineProperty(throwIfEmpty, "__esModule", { value: true });
	throwIfEmpty.throwIfEmpty = void 0;
	var EmptyError_1 = requireEmptyError();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function throwIfEmpty$1(errorFactory) {
	    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
	    return lift_1.operate(function (source, subscriber) {
	        var hasValue = false;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            hasValue = true;
	            subscriber.next(value);
	        }, function () { return (hasValue ? subscriber.complete() : subscriber.error(errorFactory())); }));
	    });
	}
	throwIfEmpty.throwIfEmpty = throwIfEmpty$1;
	function defaultErrorFactory() {
	    return new EmptyError_1.EmptyError();
	}
	
	return throwIfEmpty;
}

var hasRequiredElementAt;

function requireElementAt () {
	if (hasRequiredElementAt) return elementAt;
	hasRequiredElementAt = 1;
	Object.defineProperty(elementAt, "__esModule", { value: true });
	elementAt.elementAt = void 0;
	var ArgumentOutOfRangeError_1 = requireArgumentOutOfRangeError();
	var filter_1 = requireFilter();
	var throwIfEmpty_1 = requireThrowIfEmpty();
	var defaultIfEmpty_1 = requireDefaultIfEmpty();
	var take_1 = requireTake();
	function elementAt$1(index, defaultValue) {
	    if (index < 0) {
	        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
	    }
	    var hasDefaultValue = arguments.length >= 2;
	    return function (source) {
	        return source.pipe(filter_1.filter(function (v, i) { return i === index; }), take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError(); }));
	    };
	}
	elementAt.elementAt = elementAt$1;
	
	return elementAt;
}

var endWith = {};

var hasRequiredEndWith;

function requireEndWith () {
	if (hasRequiredEndWith) return endWith;
	hasRequiredEndWith = 1;
	var __read = (endWith && endWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (endWith && endWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(endWith, "__esModule", { value: true });
	endWith.endWith = void 0;
	var concat_1 = requireConcat$1();
	var of_1 = requireOf();
	function endWith$1() {
	    var values = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        values[_i] = arguments[_i];
	    }
	    return function (source) { return concat_1.concat(source, of_1.of.apply(void 0, __spreadArray([], __read(values)))); };
	}
	endWith.endWith = endWith$1;
	
	return endWith;
}

var every = {};

var hasRequiredEvery;

function requireEvery () {
	if (hasRequiredEvery) return every;
	hasRequiredEvery = 1;
	Object.defineProperty(every, "__esModule", { value: true });
	every.every = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function every$1(predicate, thisArg) {
	    return lift_1.operate(function (source, subscriber) {
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            if (!predicate.call(thisArg, value, index++, source)) {
	                subscriber.next(false);
	                subscriber.complete();
	            }
	        }, function () {
	            subscriber.next(true);
	            subscriber.complete();
	        }));
	    });
	}
	every.every = every$1;
	
	return every;
}

var exhaust = {};

var exhaustAll = {};

var exhaustMap = {};

var hasRequiredExhaustMap;

function requireExhaustMap () {
	if (hasRequiredExhaustMap) return exhaustMap;
	hasRequiredExhaustMap = 1;
	Object.defineProperty(exhaustMap, "__esModule", { value: true });
	exhaustMap.exhaustMap = void 0;
	var map_1 = requireMap();
	var innerFrom_1 = requireInnerFrom();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function exhaustMap$1(project, resultSelector) {
	    if (resultSelector) {
	        return function (source) {
	            return source.pipe(exhaustMap$1(function (a, i) { return innerFrom_1.innerFrom(project(a, i)).pipe(map_1.map(function (b, ii) { return resultSelector(a, b, i, ii); })); }));
	        };
	    }
	    return lift_1.operate(function (source, subscriber) {
	        var index = 0;
	        var innerSub = null;
	        var isComplete = false;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (outerValue) {
	            if (!innerSub) {
	                innerSub = OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, function () {
	                    innerSub = null;
	                    isComplete && subscriber.complete();
	                });
	                innerFrom_1.innerFrom(project(outerValue, index++)).subscribe(innerSub);
	            }
	        }, function () {
	            isComplete = true;
	            !innerSub && subscriber.complete();
	        }));
	    });
	}
	exhaustMap.exhaustMap = exhaustMap$1;
	
	return exhaustMap;
}

var hasRequiredExhaustAll;

function requireExhaustAll () {
	if (hasRequiredExhaustAll) return exhaustAll;
	hasRequiredExhaustAll = 1;
	Object.defineProperty(exhaustAll, "__esModule", { value: true });
	exhaustAll.exhaustAll = void 0;
	var exhaustMap_1 = requireExhaustMap();
	var identity_1 = requireIdentity();
	function exhaustAll$1() {
	    return exhaustMap_1.exhaustMap(identity_1.identity);
	}
	exhaustAll.exhaustAll = exhaustAll$1;
	
	return exhaustAll;
}

var hasRequiredExhaust;

function requireExhaust () {
	if (hasRequiredExhaust) return exhaust;
	hasRequiredExhaust = 1;
	Object.defineProperty(exhaust, "__esModule", { value: true });
	exhaust.exhaust = void 0;
	var exhaustAll_1 = requireExhaustAll();
	exhaust.exhaust = exhaustAll_1.exhaustAll;
	
	return exhaust;
}

var expand = {};

var hasRequiredExpand;

function requireExpand () {
	if (hasRequiredExpand) return expand;
	hasRequiredExpand = 1;
	Object.defineProperty(expand, "__esModule", { value: true });
	expand.expand = void 0;
	var lift_1 = requireLift();
	var mergeInternals_1 = requireMergeInternals();
	function expand$1(project, concurrent, scheduler) {
	    if (concurrent === void 0) { concurrent = Infinity; }
	    concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
	    return lift_1.operate(function (source, subscriber) {
	        return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent, undefined, true, scheduler);
	    });
	}
	expand.expand = expand$1;
	
	return expand;
}

var finalize = {};

var hasRequiredFinalize;

function requireFinalize () {
	if (hasRequiredFinalize) return finalize;
	hasRequiredFinalize = 1;
	Object.defineProperty(finalize, "__esModule", { value: true });
	finalize.finalize = void 0;
	var lift_1 = requireLift();
	function finalize$1(callback) {
	    return lift_1.operate(function (source, subscriber) {
	        try {
	            source.subscribe(subscriber);
	        }
	        finally {
	            subscriber.add(callback);
	        }
	    });
	}
	finalize.finalize = finalize$1;
	
	return finalize;
}

var find = {};

var hasRequiredFind;

function requireFind () {
	if (hasRequiredFind) return find;
	hasRequiredFind = 1;
	Object.defineProperty(find, "__esModule", { value: true });
	find.createFind = find.find = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function find$1(predicate, thisArg) {
	    return lift_1.operate(createFind(predicate, thisArg, 'value'));
	}
	find.find = find$1;
	function createFind(predicate, thisArg, emit) {
	    var findIndex = emit === 'index';
	    return function (source, subscriber) {
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var i = index++;
	            if (predicate.call(thisArg, value, i, source)) {
	                subscriber.next(findIndex ? i : value);
	                subscriber.complete();
	            }
	        }, function () {
	            subscriber.next(findIndex ? -1 : undefined);
	            subscriber.complete();
	        }));
	    };
	}
	find.createFind = createFind;
	
	return find;
}

var findIndex = {};

var hasRequiredFindIndex;

function requireFindIndex () {
	if (hasRequiredFindIndex) return findIndex;
	hasRequiredFindIndex = 1;
	Object.defineProperty(findIndex, "__esModule", { value: true });
	findIndex.findIndex = void 0;
	var lift_1 = requireLift();
	var find_1 = requireFind();
	function findIndex$1(predicate, thisArg) {
	    return lift_1.operate(find_1.createFind(predicate, thisArg, 'index'));
	}
	findIndex.findIndex = findIndex$1;
	
	return findIndex;
}

var first = {};

var hasRequiredFirst;

function requireFirst () {
	if (hasRequiredFirst) return first;
	hasRequiredFirst = 1;
	Object.defineProperty(first, "__esModule", { value: true });
	first.first = void 0;
	var EmptyError_1 = requireEmptyError();
	var filter_1 = requireFilter();
	var take_1 = requireTake();
	var defaultIfEmpty_1 = requireDefaultIfEmpty();
	var throwIfEmpty_1 = requireThrowIfEmpty();
	var identity_1 = requireIdentity();
	function first$1(predicate, defaultValue) {
	    var hasDefaultValue = arguments.length >= 2;
	    return function (source) {
	        return source.pipe(predicate ? filter_1.filter(function (v, i) { return predicate(v, i, source); }) : identity_1.identity, take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new EmptyError_1.EmptyError(); }));
	    };
	}
	first.first = first$1;
	
	return first;
}

var groupBy = {};

var hasRequiredGroupBy;

function requireGroupBy () {
	if (hasRequiredGroupBy) return groupBy;
	hasRequiredGroupBy = 1;
	Object.defineProperty(groupBy, "__esModule", { value: true });
	groupBy.groupBy = void 0;
	var Observable_1 = requireObservable();
	var innerFrom_1 = requireInnerFrom();
	var Subject_1 = requireSubject();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function groupBy$1(keySelector, elementOrOptions, duration, connector) {
	    return lift_1.operate(function (source, subscriber) {
	        var element;
	        if (!elementOrOptions || typeof elementOrOptions === 'function') {
	            element = elementOrOptions;
	        }
	        else {
	            (duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector);
	        }
	        var groups = new Map();
	        var notify = function (cb) {
	            groups.forEach(cb);
	            cb(subscriber);
	        };
	        var handleError = function (err) { return notify(function (consumer) { return consumer.error(err); }); };
	        var activeGroups = 0;
	        var teardownAttempted = false;
	        var groupBySourceSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, function (value) {
	            try {
	                var key_1 = keySelector(value);
	                var group_1 = groups.get(key_1);
	                if (!group_1) {
	                    groups.set(key_1, (group_1 = connector ? connector() : new Subject_1.Subject()));
	                    var grouped = createGroupedObservable(key_1, group_1);
	                    subscriber.next(grouped);
	                    if (duration) {
	                        var durationSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(group_1, function () {
	                            group_1.complete();
	                            durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
	                        }, undefined, undefined, function () { return groups.delete(key_1); });
	                        groupBySourceSubscriber.add(innerFrom_1.innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
	                    }
	                }
	                group_1.next(element ? element(value) : value);
	            }
	            catch (err) {
	                handleError(err);
	            }
	        }, function () { return notify(function (consumer) { return consumer.complete(); }); }, handleError, function () { return groups.clear(); }, function () {
	            teardownAttempted = true;
	            return activeGroups === 0;
	        });
	        source.subscribe(groupBySourceSubscriber);
	        function createGroupedObservable(key, groupSubject) {
	            var result = new Observable_1.Observable(function (groupSubscriber) {
	                activeGroups++;
	                var innerSub = groupSubject.subscribe(groupSubscriber);
	                return function () {
	                    innerSub.unsubscribe();
	                    --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
	                };
	            });
	            result.key = key;
	            return result;
	        }
	    });
	}
	groupBy.groupBy = groupBy$1;
	
	return groupBy;
}

var isEmpty = {};

var hasRequiredIsEmpty;

function requireIsEmpty () {
	if (hasRequiredIsEmpty) return isEmpty;
	hasRequiredIsEmpty = 1;
	Object.defineProperty(isEmpty, "__esModule", { value: true });
	isEmpty.isEmpty = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function isEmpty$1() {
	    return lift_1.operate(function (source, subscriber) {
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	            subscriber.next(false);
	            subscriber.complete();
	        }, function () {
	            subscriber.next(true);
	            subscriber.complete();
	        }));
	    });
	}
	isEmpty.isEmpty = isEmpty$1;
	
	return isEmpty;
}

var last = {};

var takeLast = {};

var hasRequiredTakeLast;

function requireTakeLast () {
	if (hasRequiredTakeLast) return takeLast;
	hasRequiredTakeLast = 1;
	var __values = (takeLast && takeLast.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(takeLast, "__esModule", { value: true });
	takeLast.takeLast = void 0;
	var empty_1 = requireEmpty();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function takeLast$1(count) {
	    return count <= 0
	        ? function () { return empty_1.EMPTY; }
	        : lift_1.operate(function (source, subscriber) {
	            var buffer = [];
	            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                buffer.push(value);
	                count < buffer.length && buffer.shift();
	            }, function () {
	                var e_1, _a;
	                try {
	                    for (var buffer_1 = __values(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
	                        var value = buffer_1_1.value;
	                        subscriber.next(value);
	                    }
	                }
	                catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                finally {
	                    try {
	                        if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
	                    }
	                    finally { if (e_1) throw e_1.error; }
	                }
	                subscriber.complete();
	            }, undefined, function () {
	                buffer = null;
	            }));
	        });
	}
	takeLast.takeLast = takeLast$1;
	
	return takeLast;
}

var hasRequiredLast;

function requireLast () {
	if (hasRequiredLast) return last;
	hasRequiredLast = 1;
	Object.defineProperty(last, "__esModule", { value: true });
	last.last = void 0;
	var EmptyError_1 = requireEmptyError();
	var filter_1 = requireFilter();
	var takeLast_1 = requireTakeLast();
	var throwIfEmpty_1 = requireThrowIfEmpty();
	var defaultIfEmpty_1 = requireDefaultIfEmpty();
	var identity_1 = requireIdentity();
	function last$1(predicate, defaultValue) {
	    var hasDefaultValue = arguments.length >= 2;
	    return function (source) {
	        return source.pipe(predicate ? filter_1.filter(function (v, i) { return predicate(v, i, source); }) : identity_1.identity, takeLast_1.takeLast(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function () { return new EmptyError_1.EmptyError(); }));
	    };
	}
	last.last = last$1;
	
	return last;
}

var materialize = {};

var hasRequiredMaterialize;

function requireMaterialize () {
	if (hasRequiredMaterialize) return materialize;
	hasRequiredMaterialize = 1;
	Object.defineProperty(materialize, "__esModule", { value: true });
	materialize.materialize = void 0;
	var Notification_1 = requireNotification();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function materialize$1() {
	    return lift_1.operate(function (source, subscriber) {
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            subscriber.next(Notification_1.Notification.createNext(value));
	        }, function () {
	            subscriber.next(Notification_1.Notification.createComplete());
	            subscriber.complete();
	        }, function (err) {
	            subscriber.next(Notification_1.Notification.createError(err));
	            subscriber.complete();
	        }));
	    });
	}
	materialize.materialize = materialize$1;
	
	return materialize;
}

var max = {};

var hasRequiredMax;

function requireMax () {
	if (hasRequiredMax) return max;
	hasRequiredMax = 1;
	Object.defineProperty(max, "__esModule", { value: true });
	max.max = void 0;
	var reduce_1 = requireReduce();
	var isFunction_1 = requireIsFunction();
	function max$1(comparer) {
	    return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function (x, y) { return (comparer(x, y) > 0 ? x : y); } : function (x, y) { return (x > y ? x : y); });
	}
	max.max = max$1;
	
	return max;
}

var flatMap = {};

var hasRequiredFlatMap;

function requireFlatMap () {
	if (hasRequiredFlatMap) return flatMap;
	hasRequiredFlatMap = 1;
	Object.defineProperty(flatMap, "__esModule", { value: true });
	flatMap.flatMap = void 0;
	var mergeMap_1 = requireMergeMap();
	flatMap.flatMap = mergeMap_1.mergeMap;
	
	return flatMap;
}

var mergeMapTo = {};

var hasRequiredMergeMapTo;

function requireMergeMapTo () {
	if (hasRequiredMergeMapTo) return mergeMapTo;
	hasRequiredMergeMapTo = 1;
	Object.defineProperty(mergeMapTo, "__esModule", { value: true });
	mergeMapTo.mergeMapTo = void 0;
	var mergeMap_1 = requireMergeMap();
	var isFunction_1 = requireIsFunction();
	function mergeMapTo$1(innerObservable, resultSelector, concurrent) {
	    if (concurrent === void 0) { concurrent = Infinity; }
	    if (isFunction_1.isFunction(resultSelector)) {
	        return mergeMap_1.mergeMap(function () { return innerObservable; }, resultSelector, concurrent);
	    }
	    if (typeof resultSelector === 'number') {
	        concurrent = resultSelector;
	    }
	    return mergeMap_1.mergeMap(function () { return innerObservable; }, concurrent);
	}
	mergeMapTo.mergeMapTo = mergeMapTo$1;
	
	return mergeMapTo;
}

var mergeScan = {};

var hasRequiredMergeScan;

function requireMergeScan () {
	if (hasRequiredMergeScan) return mergeScan;
	hasRequiredMergeScan = 1;
	Object.defineProperty(mergeScan, "__esModule", { value: true });
	mergeScan.mergeScan = void 0;
	var lift_1 = requireLift();
	var mergeInternals_1 = requireMergeInternals();
	function mergeScan$1(accumulator, seed, concurrent) {
	    if (concurrent === void 0) { concurrent = Infinity; }
	    return lift_1.operate(function (source, subscriber) {
	        var state = seed;
	        return mergeInternals_1.mergeInternals(source, subscriber, function (value, index) { return accumulator(state, value, index); }, concurrent, function (value) {
	            state = value;
	        }, false, undefined, function () { return (state = null); });
	    });
	}
	mergeScan.mergeScan = mergeScan$1;
	
	return mergeScan;
}

var mergeWith = {};

var merge = {};

var hasRequiredMerge;

function requireMerge () {
	if (hasRequiredMerge) return merge;
	hasRequiredMerge = 1;
	var __read = (merge && merge.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (merge && merge.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(merge, "__esModule", { value: true });
	merge.merge = void 0;
	var lift_1 = requireLift();
	var mergeAll_1 = requireMergeAll();
	var args_1 = requireArgs();
	var from_1 = requireFrom();
	function merge$1() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var scheduler = args_1.popScheduler(args);
	    var concurrent = args_1.popNumber(args, Infinity);
	    return lift_1.operate(function (source, subscriber) {
	        mergeAll_1.mergeAll(concurrent)(from_1.from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
	    });
	}
	merge.merge = merge$1;
	
	return merge;
}

var hasRequiredMergeWith;

function requireMergeWith () {
	if (hasRequiredMergeWith) return mergeWith;
	hasRequiredMergeWith = 1;
	var __read = (mergeWith && mergeWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (mergeWith && mergeWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(mergeWith, "__esModule", { value: true });
	mergeWith.mergeWith = void 0;
	var merge_1 = requireMerge();
	function mergeWith$1() {
	    var otherSources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        otherSources[_i] = arguments[_i];
	    }
	    return merge_1.merge.apply(void 0, __spreadArray([], __read(otherSources)));
	}
	mergeWith.mergeWith = mergeWith$1;
	
	return mergeWith;
}

var min = {};

var hasRequiredMin;

function requireMin () {
	if (hasRequiredMin) return min;
	hasRequiredMin = 1;
	Object.defineProperty(min, "__esModule", { value: true });
	min.min = void 0;
	var reduce_1 = requireReduce();
	var isFunction_1 = requireIsFunction();
	function min$1(comparer) {
	    return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function (x, y) { return (comparer(x, y) < 0 ? x : y); } : function (x, y) { return (x < y ? x : y); });
	}
	min.min = min$1;
	
	return min;
}

var multicast = {};

var hasRequiredMulticast;

function requireMulticast () {
	if (hasRequiredMulticast) return multicast;
	hasRequiredMulticast = 1;
	Object.defineProperty(multicast, "__esModule", { value: true });
	multicast.multicast = void 0;
	var ConnectableObservable_1 = requireConnectableObservable();
	var isFunction_1 = requireIsFunction();
	var connect_1 = requireConnect();
	function multicast$1(subjectOrSubjectFactory, selector) {
	    var subjectFactory = isFunction_1.isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function () { return subjectOrSubjectFactory; };
	    if (isFunction_1.isFunction(selector)) {
	        return connect_1.connect(selector, {
	            connector: subjectFactory,
	        });
	    }
	    return function (source) { return new ConnectableObservable_1.ConnectableObservable(source, subjectFactory); };
	}
	multicast.multicast = multicast$1;
	
	return multicast;
}

var onErrorResumeNextWith = {};

var hasRequiredOnErrorResumeNextWith;

function requireOnErrorResumeNextWith () {
	if (hasRequiredOnErrorResumeNextWith) return onErrorResumeNextWith;
	hasRequiredOnErrorResumeNextWith = 1;
	var __read = (onErrorResumeNextWith && onErrorResumeNextWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (onErrorResumeNextWith && onErrorResumeNextWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(onErrorResumeNextWith, "__esModule", { value: true });
	onErrorResumeNextWith.onErrorResumeNext = onErrorResumeNextWith.onErrorResumeNextWith = void 0;
	var argsOrArgArray_1 = requireArgsOrArgArray();
	var onErrorResumeNext_1 = requireOnErrorResumeNext();
	function onErrorResumeNextWith$1() {
	    var sources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        sources[_i] = arguments[_i];
	    }
	    var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
	    return function (source) { return onErrorResumeNext_1.onErrorResumeNext.apply(void 0, __spreadArray([source], __read(nextSources))); };
	}
	onErrorResumeNextWith.onErrorResumeNextWith = onErrorResumeNextWith$1;
	onErrorResumeNextWith.onErrorResumeNext = onErrorResumeNextWith$1;
	
	return onErrorResumeNextWith;
}

var pairwise = {};

var hasRequiredPairwise;

function requirePairwise () {
	if (hasRequiredPairwise) return pairwise;
	hasRequiredPairwise = 1;
	Object.defineProperty(pairwise, "__esModule", { value: true });
	pairwise.pairwise = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function pairwise$1() {
	    return lift_1.operate(function (source, subscriber) {
	        var prev;
	        var hasPrev = false;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var p = prev;
	            prev = value;
	            hasPrev && subscriber.next([p, value]);
	            hasPrev = true;
	        }));
	    });
	}
	pairwise.pairwise = pairwise$1;
	
	return pairwise;
}

var pluck = {};

var hasRequiredPluck;

function requirePluck () {
	if (hasRequiredPluck) return pluck;
	hasRequiredPluck = 1;
	Object.defineProperty(pluck, "__esModule", { value: true });
	pluck.pluck = void 0;
	var map_1 = requireMap();
	function pluck$1() {
	    var properties = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        properties[_i] = arguments[_i];
	    }
	    var length = properties.length;
	    if (length === 0) {
	        throw new Error('list of properties cannot be empty.');
	    }
	    return map_1.map(function (x) {
	        var currentProp = x;
	        for (var i = 0; i < length; i++) {
	            var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
	            if (typeof p !== 'undefined') {
	                currentProp = p;
	            }
	            else {
	                return undefined;
	            }
	        }
	        return currentProp;
	    });
	}
	pluck.pluck = pluck$1;
	
	return pluck;
}

var publish = {};

var hasRequiredPublish;

function requirePublish () {
	if (hasRequiredPublish) return publish;
	hasRequiredPublish = 1;
	Object.defineProperty(publish, "__esModule", { value: true });
	publish.publish = void 0;
	var Subject_1 = requireSubject();
	var multicast_1 = requireMulticast();
	var connect_1 = requireConnect();
	function publish$1(selector) {
	    return selector ? function (source) { return connect_1.connect(selector)(source); } : function (source) { return multicast_1.multicast(new Subject_1.Subject())(source); };
	}
	publish.publish = publish$1;
	
	return publish;
}

var publishBehavior = {};

var hasRequiredPublishBehavior;

function requirePublishBehavior () {
	if (hasRequiredPublishBehavior) return publishBehavior;
	hasRequiredPublishBehavior = 1;
	Object.defineProperty(publishBehavior, "__esModule", { value: true });
	publishBehavior.publishBehavior = void 0;
	var BehaviorSubject_1 = requireBehaviorSubject();
	var ConnectableObservable_1 = requireConnectableObservable();
	function publishBehavior$1(initialValue) {
	    return function (source) {
	        var subject = new BehaviorSubject_1.BehaviorSubject(initialValue);
	        return new ConnectableObservable_1.ConnectableObservable(source, function () { return subject; });
	    };
	}
	publishBehavior.publishBehavior = publishBehavior$1;
	
	return publishBehavior;
}

var publishLast = {};

var hasRequiredPublishLast;

function requirePublishLast () {
	if (hasRequiredPublishLast) return publishLast;
	hasRequiredPublishLast = 1;
	Object.defineProperty(publishLast, "__esModule", { value: true });
	publishLast.publishLast = void 0;
	var AsyncSubject_1 = requireAsyncSubject();
	var ConnectableObservable_1 = requireConnectableObservable();
	function publishLast$1() {
	    return function (source) {
	        var subject = new AsyncSubject_1.AsyncSubject();
	        return new ConnectableObservable_1.ConnectableObservable(source, function () { return subject; });
	    };
	}
	publishLast.publishLast = publishLast$1;
	
	return publishLast;
}

var publishReplay = {};

var hasRequiredPublishReplay;

function requirePublishReplay () {
	if (hasRequiredPublishReplay) return publishReplay;
	hasRequiredPublishReplay = 1;
	Object.defineProperty(publishReplay, "__esModule", { value: true });
	publishReplay.publishReplay = void 0;
	var ReplaySubject_1 = requireReplaySubject();
	var multicast_1 = requireMulticast();
	var isFunction_1 = requireIsFunction();
	function publishReplay$1(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
	    if (selectorOrScheduler && !isFunction_1.isFunction(selectorOrScheduler)) {
	        timestampProvider = selectorOrScheduler;
	    }
	    var selector = isFunction_1.isFunction(selectorOrScheduler) ? selectorOrScheduler : undefined;
	    return function (source) { return multicast_1.multicast(new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source); };
	}
	publishReplay.publishReplay = publishReplay$1;
	
	return publishReplay;
}

var raceWith = {};

var hasRequiredRaceWith;

function requireRaceWith () {
	if (hasRequiredRaceWith) return raceWith;
	hasRequiredRaceWith = 1;
	var __read = (raceWith && raceWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (raceWith && raceWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(raceWith, "__esModule", { value: true });
	raceWith.raceWith = void 0;
	var race_1 = requireRace();
	var lift_1 = requireLift();
	var identity_1 = requireIdentity();
	function raceWith$1() {
	    var otherSources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        otherSources[_i] = arguments[_i];
	    }
	    return !otherSources.length
	        ? identity_1.identity
	        : lift_1.operate(function (source, subscriber) {
	            race_1.raceInit(__spreadArray([source], __read(otherSources)))(subscriber);
	        });
	}
	raceWith.raceWith = raceWith$1;
	
	return raceWith;
}

var repeat = {};

var hasRequiredRepeat;

function requireRepeat () {
	if (hasRequiredRepeat) return repeat;
	hasRequiredRepeat = 1;
	Object.defineProperty(repeat, "__esModule", { value: true });
	repeat.repeat = void 0;
	var empty_1 = requireEmpty();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var innerFrom_1 = requireInnerFrom();
	var timer_1 = requireTimer();
	function repeat$1(countOrConfig) {
	    var _a;
	    var count = Infinity;
	    var delay;
	    if (countOrConfig != null) {
	        if (typeof countOrConfig === 'object') {
	            (_a = countOrConfig.count, count = _a === void 0 ? Infinity : _a, delay = countOrConfig.delay);
	        }
	        else {
	            count = countOrConfig;
	        }
	    }
	    return count <= 0
	        ? function () { return empty_1.EMPTY; }
	        : lift_1.operate(function (source, subscriber) {
	            var soFar = 0;
	            var sourceSub;
	            var resubscribe = function () {
	                sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
	                sourceSub = null;
	                if (delay != null) {
	                    var notifier = typeof delay === 'number' ? timer_1.timer(delay) : innerFrom_1.innerFrom(delay(soFar));
	                    var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	                        notifierSubscriber_1.unsubscribe();
	                        subscribeToSource();
	                    });
	                    notifier.subscribe(notifierSubscriber_1);
	                }
	                else {
	                    subscribeToSource();
	                }
	            };
	            var subscribeToSource = function () {
	                var syncUnsub = false;
	                sourceSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, function () {
	                    if (++soFar < count) {
	                        if (sourceSub) {
	                            resubscribe();
	                        }
	                        else {
	                            syncUnsub = true;
	                        }
	                    }
	                    else {
	                        subscriber.complete();
	                    }
	                }));
	                if (syncUnsub) {
	                    resubscribe();
	                }
	            };
	            subscribeToSource();
	        });
	}
	repeat.repeat = repeat$1;
	
	return repeat;
}

var repeatWhen = {};

var hasRequiredRepeatWhen;

function requireRepeatWhen () {
	if (hasRequiredRepeatWhen) return repeatWhen;
	hasRequiredRepeatWhen = 1;
	Object.defineProperty(repeatWhen, "__esModule", { value: true });
	repeatWhen.repeatWhen = void 0;
	var innerFrom_1 = requireInnerFrom();
	var Subject_1 = requireSubject();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function repeatWhen$1(notifier) {
	    return lift_1.operate(function (source, subscriber) {
	        var innerSub;
	        var syncResub = false;
	        var completions$;
	        var isNotifierComplete = false;
	        var isMainComplete = false;
	        var checkComplete = function () { return isMainComplete && isNotifierComplete && (subscriber.complete(), true); };
	        var getCompletionSubject = function () {
	            if (!completions$) {
	                completions$ = new Subject_1.Subject();
	                innerFrom_1.innerFrom(notifier(completions$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	                    if (innerSub) {
	                        subscribeForRepeatWhen();
	                    }
	                    else {
	                        syncResub = true;
	                    }
	                }, function () {
	                    isNotifierComplete = true;
	                    checkComplete();
	                }));
	            }
	            return completions$;
	        };
	        var subscribeForRepeatWhen = function () {
	            isMainComplete = false;
	            innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, function () {
	                isMainComplete = true;
	                !checkComplete() && getCompletionSubject().next();
	            }));
	            if (syncResub) {
	                innerSub.unsubscribe();
	                innerSub = null;
	                syncResub = false;
	                subscribeForRepeatWhen();
	            }
	        };
	        subscribeForRepeatWhen();
	    });
	}
	repeatWhen.repeatWhen = repeatWhen$1;
	
	return repeatWhen;
}

var retry = {};

var hasRequiredRetry;

function requireRetry () {
	if (hasRequiredRetry) return retry;
	hasRequiredRetry = 1;
	Object.defineProperty(retry, "__esModule", { value: true });
	retry.retry = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var identity_1 = requireIdentity();
	var timer_1 = requireTimer();
	var innerFrom_1 = requireInnerFrom();
	function retry$1(configOrCount) {
	    if (configOrCount === void 0) { configOrCount = Infinity; }
	    var config;
	    if (configOrCount && typeof configOrCount === 'object') {
	        config = configOrCount;
	    }
	    else {
	        config = {
	            count: configOrCount,
	        };
	    }
	    var _a = config.count, count = _a === void 0 ? Infinity : _a, delay = config.delay, _b = config.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
	    return count <= 0
	        ? identity_1.identity
	        : lift_1.operate(function (source, subscriber) {
	            var soFar = 0;
	            var innerSub;
	            var subscribeForRetry = function () {
	                var syncUnsub = false;
	                innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                    if (resetOnSuccess) {
	                        soFar = 0;
	                    }
	                    subscriber.next(value);
	                }, undefined, function (err) {
	                    if (soFar++ < count) {
	                        var resub_1 = function () {
	                            if (innerSub) {
	                                innerSub.unsubscribe();
	                                innerSub = null;
	                                subscribeForRetry();
	                            }
	                            else {
	                                syncUnsub = true;
	                            }
	                        };
	                        if (delay != null) {
	                            var notifier = typeof delay === 'number' ? timer_1.timer(delay) : innerFrom_1.innerFrom(delay(err, soFar));
	                            var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	                                notifierSubscriber_1.unsubscribe();
	                                resub_1();
	                            }, function () {
	                                subscriber.complete();
	                            });
	                            notifier.subscribe(notifierSubscriber_1);
	                        }
	                        else {
	                            resub_1();
	                        }
	                    }
	                    else {
	                        subscriber.error(err);
	                    }
	                }));
	                if (syncUnsub) {
	                    innerSub.unsubscribe();
	                    innerSub = null;
	                    subscribeForRetry();
	                }
	            };
	            subscribeForRetry();
	        });
	}
	retry.retry = retry$1;
	
	return retry;
}

var retryWhen = {};

var hasRequiredRetryWhen;

function requireRetryWhen () {
	if (hasRequiredRetryWhen) return retryWhen;
	hasRequiredRetryWhen = 1;
	Object.defineProperty(retryWhen, "__esModule", { value: true });
	retryWhen.retryWhen = void 0;
	var innerFrom_1 = requireInnerFrom();
	var Subject_1 = requireSubject();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function retryWhen$1(notifier) {
	    return lift_1.operate(function (source, subscriber) {
	        var innerSub;
	        var syncResub = false;
	        var errors$;
	        var subscribeForRetryWhen = function () {
	            innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, undefined, undefined, function (err) {
	                if (!errors$) {
	                    errors$ = new Subject_1.Subject();
	                    innerFrom_1.innerFrom(notifier(errors$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	                        return innerSub ? subscribeForRetryWhen() : (syncResub = true);
	                    }));
	                }
	                if (errors$) {
	                    errors$.next(err);
	                }
	            }));
	            if (syncResub) {
	                innerSub.unsubscribe();
	                innerSub = null;
	                syncResub = false;
	                subscribeForRetryWhen();
	            }
	        };
	        subscribeForRetryWhen();
	    });
	}
	retryWhen.retryWhen = retryWhen$1;
	
	return retryWhen;
}

var sample = {};

var hasRequiredSample;

function requireSample () {
	if (hasRequiredSample) return sample;
	hasRequiredSample = 1;
	Object.defineProperty(sample, "__esModule", { value: true });
	sample.sample = void 0;
	var innerFrom_1 = requireInnerFrom();
	var lift_1 = requireLift();
	var noop_1 = requireNoop();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function sample$1(notifier) {
	    return lift_1.operate(function (source, subscriber) {
	        var hasValue = false;
	        var lastValue = null;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            hasValue = true;
	            lastValue = value;
	        }));
	        innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	            if (hasValue) {
	                hasValue = false;
	                var value = lastValue;
	                lastValue = null;
	                subscriber.next(value);
	            }
	        }, noop_1.noop));
	    });
	}
	sample.sample = sample$1;
	
	return sample;
}

var sampleTime = {};

var hasRequiredSampleTime;

function requireSampleTime () {
	if (hasRequiredSampleTime) return sampleTime;
	hasRequiredSampleTime = 1;
	Object.defineProperty(sampleTime, "__esModule", { value: true });
	sampleTime.sampleTime = void 0;
	var async_1 = requireAsync();
	var sample_1 = requireSample();
	var interval_1 = requireInterval();
	function sampleTime$1(period, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    return sample_1.sample(interval_1.interval(period, scheduler));
	}
	sampleTime.sampleTime = sampleTime$1;
	
	return sampleTime;
}

var scan = {};

var hasRequiredScan;

function requireScan () {
	if (hasRequiredScan) return scan;
	hasRequiredScan = 1;
	Object.defineProperty(scan, "__esModule", { value: true });
	scan.scan = void 0;
	var lift_1 = requireLift();
	var scanInternals_1 = requireScanInternals();
	function scan$1(accumulator, seed) {
	    return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, true));
	}
	scan.scan = scan$1;
	
	return scan;
}

var sequenceEqual = {};

var hasRequiredSequenceEqual;

function requireSequenceEqual () {
	if (hasRequiredSequenceEqual) return sequenceEqual;
	hasRequiredSequenceEqual = 1;
	Object.defineProperty(sequenceEqual, "__esModule", { value: true });
	sequenceEqual.sequenceEqual = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var innerFrom_1 = requireInnerFrom();
	function sequenceEqual$1(compareTo, comparator) {
	    if (comparator === void 0) { comparator = function (a, b) { return a === b; }; }
	    return lift_1.operate(function (source, subscriber) {
	        var aState = createState();
	        var bState = createState();
	        var emit = function (isEqual) {
	            subscriber.next(isEqual);
	            subscriber.complete();
	        };
	        var createSubscriber = function (selfState, otherState) {
	            var sequenceEqualSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (a) {
	                var buffer = otherState.buffer, complete = otherState.complete;
	                if (buffer.length === 0) {
	                    complete ? emit(false) : selfState.buffer.push(a);
	                }
	                else {
	                    !comparator(a, buffer.shift()) && emit(false);
	                }
	            }, function () {
	                selfState.complete = true;
	                var complete = otherState.complete, buffer = otherState.buffer;
	                complete && emit(buffer.length === 0);
	                sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
	            });
	            return sequenceEqualSubscriber;
	        };
	        source.subscribe(createSubscriber(aState, bState));
	        innerFrom_1.innerFrom(compareTo).subscribe(createSubscriber(bState, aState));
	    });
	}
	sequenceEqual.sequenceEqual = sequenceEqual$1;
	function createState() {
	    return {
	        buffer: [],
	        complete: false,
	    };
	}
	
	return sequenceEqual;
}

var share = {};

var hasRequiredShare;

function requireShare () {
	if (hasRequiredShare) return share;
	hasRequiredShare = 1;
	var __read = (share && share.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (share && share.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(share, "__esModule", { value: true });
	share.share = void 0;
	var innerFrom_1 = requireInnerFrom();
	var Subject_1 = requireSubject();
	var Subscriber_1 = requireSubscriber();
	var lift_1 = requireLift();
	function share$1(options) {
	    if (options === void 0) { options = {}; }
	    var _a = options.connector, connector = _a === void 0 ? function () { return new Subject_1.Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
	    return function (wrapperSource) {
	        var connection;
	        var resetConnection;
	        var subject;
	        var refCount = 0;
	        var hasCompleted = false;
	        var hasErrored = false;
	        var cancelReset = function () {
	            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
	            resetConnection = undefined;
	        };
	        var reset = function () {
	            cancelReset();
	            connection = subject = undefined;
	            hasCompleted = hasErrored = false;
	        };
	        var resetAndUnsubscribe = function () {
	            var conn = connection;
	            reset();
	            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
	        };
	        return lift_1.operate(function (source, subscriber) {
	            refCount++;
	            if (!hasErrored && !hasCompleted) {
	                cancelReset();
	            }
	            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
	            subscriber.add(function () {
	                refCount--;
	                if (refCount === 0 && !hasErrored && !hasCompleted) {
	                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
	                }
	            });
	            dest.subscribe(subscriber);
	            if (!connection &&
	                refCount > 0) {
	                connection = new Subscriber_1.SafeSubscriber({
	                    next: function (value) { return dest.next(value); },
	                    error: function (err) {
	                        hasErrored = true;
	                        cancelReset();
	                        resetConnection = handleReset(reset, resetOnError, err);
	                        dest.error(err);
	                    },
	                    complete: function () {
	                        hasCompleted = true;
	                        cancelReset();
	                        resetConnection = handleReset(reset, resetOnComplete);
	                        dest.complete();
	                    },
	                });
	                innerFrom_1.innerFrom(source).subscribe(connection);
	            }
	        })(wrapperSource);
	    };
	}
	share.share = share$1;
	function handleReset(reset, on) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    if (on === true) {
	        reset();
	        return;
	    }
	    if (on === false) {
	        return;
	    }
	    var onSubscriber = new Subscriber_1.SafeSubscriber({
	        next: function () {
	            onSubscriber.unsubscribe();
	            reset();
	        },
	    });
	    return innerFrom_1.innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
	}
	
	return share;
}

var shareReplay = {};

var hasRequiredShareReplay;

function requireShareReplay () {
	if (hasRequiredShareReplay) return shareReplay;
	hasRequiredShareReplay = 1;
	Object.defineProperty(shareReplay, "__esModule", { value: true });
	shareReplay.shareReplay = void 0;
	var ReplaySubject_1 = requireReplaySubject();
	var share_1 = requireShare();
	function shareReplay$1(configOrBufferSize, windowTime, scheduler) {
	    var _a, _b, _c;
	    var bufferSize;
	    var refCount = false;
	    if (configOrBufferSize && typeof configOrBufferSize === 'object') {
	        (_a = configOrBufferSize.bufferSize, bufferSize = _a === void 0 ? Infinity : _a, _b = configOrBufferSize.windowTime, windowTime = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler);
	    }
	    else {
	        bufferSize = (configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity);
	    }
	    return share_1.share({
	        connector: function () { return new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler); },
	        resetOnError: true,
	        resetOnComplete: false,
	        resetOnRefCountZero: refCount,
	    });
	}
	shareReplay.shareReplay = shareReplay$1;
	
	return shareReplay;
}

var single = {};

var hasRequiredSingle;

function requireSingle () {
	if (hasRequiredSingle) return single;
	hasRequiredSingle = 1;
	Object.defineProperty(single, "__esModule", { value: true });
	single.single = void 0;
	var EmptyError_1 = requireEmptyError();
	var SequenceError_1 = requireSequenceError();
	var NotFoundError_1 = requireNotFoundError();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function single$1(predicate) {
	    return lift_1.operate(function (source, subscriber) {
	        var hasValue = false;
	        var singleValue;
	        var seenValue = false;
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            seenValue = true;
	            if (!predicate || predicate(value, index++, source)) {
	                hasValue && subscriber.error(new SequenceError_1.SequenceError('Too many matching values'));
	                hasValue = true;
	                singleValue = value;
	            }
	        }, function () {
	            if (hasValue) {
	                subscriber.next(singleValue);
	                subscriber.complete();
	            }
	            else {
	                subscriber.error(seenValue ? new NotFoundError_1.NotFoundError('No matching values') : new EmptyError_1.EmptyError());
	            }
	        }));
	    });
	}
	single.single = single$1;
	
	return single;
}

var skip = {};

var hasRequiredSkip;

function requireSkip () {
	if (hasRequiredSkip) return skip;
	hasRequiredSkip = 1;
	Object.defineProperty(skip, "__esModule", { value: true });
	skip.skip = void 0;
	var filter_1 = requireFilter();
	function skip$1(count) {
	    return filter_1.filter(function (_, index) { return count <= index; });
	}
	skip.skip = skip$1;
	
	return skip;
}

var skipLast = {};

var hasRequiredSkipLast;

function requireSkipLast () {
	if (hasRequiredSkipLast) return skipLast;
	hasRequiredSkipLast = 1;
	Object.defineProperty(skipLast, "__esModule", { value: true });
	skipLast.skipLast = void 0;
	var identity_1 = requireIdentity();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function skipLast$1(skipCount) {
	    return skipCount <= 0
	        ?
	            identity_1.identity
	        : lift_1.operate(function (source, subscriber) {
	            var ring = new Array(skipCount);
	            var seen = 0;
	            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                var valueIndex = seen++;
	                if (valueIndex < skipCount) {
	                    ring[valueIndex] = value;
	                }
	                else {
	                    var index = valueIndex % skipCount;
	                    var oldValue = ring[index];
	                    ring[index] = value;
	                    subscriber.next(oldValue);
	                }
	            }));
	            return function () {
	                ring = null;
	            };
	        });
	}
	skipLast.skipLast = skipLast$1;
	
	return skipLast;
}

var skipUntil = {};

var hasRequiredSkipUntil;

function requireSkipUntil () {
	if (hasRequiredSkipUntil) return skipUntil;
	hasRequiredSkipUntil = 1;
	Object.defineProperty(skipUntil, "__esModule", { value: true });
	skipUntil.skipUntil = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var innerFrom_1 = requireInnerFrom();
	var noop_1 = requireNoop();
	function skipUntil$1(notifier) {
	    return lift_1.operate(function (source, subscriber) {
	        var taking = false;
	        var skipSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	            skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
	            taking = true;
	        }, noop_1.noop);
	        innerFrom_1.innerFrom(notifier).subscribe(skipSubscriber);
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return taking && subscriber.next(value); }));
	    });
	}
	skipUntil.skipUntil = skipUntil$1;
	
	return skipUntil;
}

var skipWhile = {};

var hasRequiredSkipWhile;

function requireSkipWhile () {
	if (hasRequiredSkipWhile) return skipWhile;
	hasRequiredSkipWhile = 1;
	Object.defineProperty(skipWhile, "__esModule", { value: true });
	skipWhile.skipWhile = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function skipWhile$1(predicate) {
	    return lift_1.operate(function (source, subscriber) {
	        var taking = false;
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return (taking || (taking = !predicate(value, index++))) && subscriber.next(value); }));
	    });
	}
	skipWhile.skipWhile = skipWhile$1;
	
	return skipWhile;
}

var startWith = {};

var hasRequiredStartWith;

function requireStartWith () {
	if (hasRequiredStartWith) return startWith;
	hasRequiredStartWith = 1;
	Object.defineProperty(startWith, "__esModule", { value: true });
	startWith.startWith = void 0;
	var concat_1 = requireConcat$1();
	var args_1 = requireArgs();
	var lift_1 = requireLift();
	function startWith$1() {
	    var values = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        values[_i] = arguments[_i];
	    }
	    var scheduler = args_1.popScheduler(values);
	    return lift_1.operate(function (source, subscriber) {
	        (scheduler ? concat_1.concat(values, source, scheduler) : concat_1.concat(values, source)).subscribe(subscriber);
	    });
	}
	startWith.startWith = startWith$1;
	
	return startWith;
}

var switchAll = {};

var switchMap = {};

var hasRequiredSwitchMap;

function requireSwitchMap () {
	if (hasRequiredSwitchMap) return switchMap;
	hasRequiredSwitchMap = 1;
	Object.defineProperty(switchMap, "__esModule", { value: true });
	switchMap.switchMap = void 0;
	var innerFrom_1 = requireInnerFrom();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function switchMap$1(project, resultSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var innerSubscriber = null;
	        var index = 0;
	        var isComplete = false;
	        var checkComplete = function () { return isComplete && !innerSubscriber && subscriber.complete(); };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
	            var innerIndex = 0;
	            var outerIndex = index++;
	            innerFrom_1.innerFrom(project(value, outerIndex)).subscribe((innerSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (innerValue) { return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue); }, function () {
	                innerSubscriber = null;
	                checkComplete();
	            })));
	        }, function () {
	            isComplete = true;
	            checkComplete();
	        }));
	    });
	}
	switchMap.switchMap = switchMap$1;
	
	return switchMap;
}

var hasRequiredSwitchAll;

function requireSwitchAll () {
	if (hasRequiredSwitchAll) return switchAll;
	hasRequiredSwitchAll = 1;
	Object.defineProperty(switchAll, "__esModule", { value: true });
	switchAll.switchAll = void 0;
	var switchMap_1 = requireSwitchMap();
	var identity_1 = requireIdentity();
	function switchAll$1() {
	    return switchMap_1.switchMap(identity_1.identity);
	}
	switchAll.switchAll = switchAll$1;
	
	return switchAll;
}

var switchMapTo = {};

var hasRequiredSwitchMapTo;

function requireSwitchMapTo () {
	if (hasRequiredSwitchMapTo) return switchMapTo;
	hasRequiredSwitchMapTo = 1;
	Object.defineProperty(switchMapTo, "__esModule", { value: true });
	switchMapTo.switchMapTo = void 0;
	var switchMap_1 = requireSwitchMap();
	var isFunction_1 = requireIsFunction();
	function switchMapTo$1(innerObservable, resultSelector) {
	    return isFunction_1.isFunction(resultSelector) ? switchMap_1.switchMap(function () { return innerObservable; }, resultSelector) : switchMap_1.switchMap(function () { return innerObservable; });
	}
	switchMapTo.switchMapTo = switchMapTo$1;
	
	return switchMapTo;
}

var switchScan = {};

var hasRequiredSwitchScan;

function requireSwitchScan () {
	if (hasRequiredSwitchScan) return switchScan;
	hasRequiredSwitchScan = 1;
	Object.defineProperty(switchScan, "__esModule", { value: true });
	switchScan.switchScan = void 0;
	var switchMap_1 = requireSwitchMap();
	var lift_1 = requireLift();
	function switchScan$1(accumulator, seed) {
	    return lift_1.operate(function (source, subscriber) {
	        var state = seed;
	        switchMap_1.switchMap(function (value, index) { return accumulator(state, value, index); }, function (_, innerValue) { return ((state = innerValue), innerValue); })(source).subscribe(subscriber);
	        return function () {
	            state = null;
	        };
	    });
	}
	switchScan.switchScan = switchScan$1;
	
	return switchScan;
}

var takeUntil = {};

var hasRequiredTakeUntil;

function requireTakeUntil () {
	if (hasRequiredTakeUntil) return takeUntil;
	hasRequiredTakeUntil = 1;
	Object.defineProperty(takeUntil, "__esModule", { value: true });
	takeUntil.takeUntil = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var innerFrom_1 = requireInnerFrom();
	var noop_1 = requireNoop();
	function takeUntil$1(notifier) {
	    return lift_1.operate(function (source, subscriber) {
	        innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () { return subscriber.complete(); }, noop_1.noop));
	        !subscriber.closed && source.subscribe(subscriber);
	    });
	}
	takeUntil.takeUntil = takeUntil$1;
	
	return takeUntil;
}

var takeWhile = {};

var hasRequiredTakeWhile;

function requireTakeWhile () {
	if (hasRequiredTakeWhile) return takeWhile;
	hasRequiredTakeWhile = 1;
	Object.defineProperty(takeWhile, "__esModule", { value: true });
	takeWhile.takeWhile = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function takeWhile$1(predicate, inclusive) {
	    if (inclusive === void 0) { inclusive = false; }
	    return lift_1.operate(function (source, subscriber) {
	        var index = 0;
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var result = predicate(value, index++);
	            (result || inclusive) && subscriber.next(value);
	            !result && subscriber.complete();
	        }));
	    });
	}
	takeWhile.takeWhile = takeWhile$1;
	
	return takeWhile;
}

var tap = {};

var hasRequiredTap;

function requireTap () {
	if (hasRequiredTap) return tap;
	hasRequiredTap = 1;
	Object.defineProperty(tap, "__esModule", { value: true });
	tap.tap = void 0;
	var isFunction_1 = requireIsFunction();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var identity_1 = requireIdentity();
	function tap$1(observerOrNext, error, complete) {
	    var tapObserver = isFunction_1.isFunction(observerOrNext) || error || complete
	        ?
	            { next: observerOrNext, error: error, complete: complete }
	        : observerOrNext;
	    return tapObserver
	        ? lift_1.operate(function (source, subscriber) {
	            var _a;
	            (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
	            var isUnsub = true;
	            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                var _a;
	                (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
	                subscriber.next(value);
	            }, function () {
	                var _a;
	                isUnsub = false;
	                (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
	                subscriber.complete();
	            }, function (err) {
	                var _a;
	                isUnsub = false;
	                (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
	                subscriber.error(err);
	            }, function () {
	                var _a, _b;
	                if (isUnsub) {
	                    (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
	                }
	                (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
	            }));
	        })
	        :
	            identity_1.identity;
	}
	tap.tap = tap$1;
	
	return tap;
}

var throttle = {};

var hasRequiredThrottle;

function requireThrottle () {
	if (hasRequiredThrottle) return throttle;
	hasRequiredThrottle = 1;
	Object.defineProperty(throttle, "__esModule", { value: true });
	throttle.throttle = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var innerFrom_1 = requireInnerFrom();
	function throttle$1(durationSelector, config) {
	    return lift_1.operate(function (source, subscriber) {
	        var _a = config !== null && config !== void 0 ? config : {}, _b = _a.leading, leading = _b === void 0 ? true : _b, _c = _a.trailing, trailing = _c === void 0 ? false : _c;
	        var hasValue = false;
	        var sendValue = null;
	        var throttled = null;
	        var isComplete = false;
	        var endThrottling = function () {
	            throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
	            throttled = null;
	            if (trailing) {
	                send();
	                isComplete && subscriber.complete();
	            }
	        };
	        var cleanupThrottling = function () {
	            throttled = null;
	            isComplete && subscriber.complete();
	        };
	        var startThrottle = function (value) {
	            return (throttled = innerFrom_1.innerFrom(durationSelector(value)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling)));
	        };
	        var send = function () {
	            if (hasValue) {
	                hasValue = false;
	                var value = sendValue;
	                sendValue = null;
	                subscriber.next(value);
	                !isComplete && startThrottle(value);
	            }
	        };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            hasValue = true;
	            sendValue = value;
	            !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
	        }, function () {
	            isComplete = true;
	            !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
	        }));
	    });
	}
	throttle.throttle = throttle$1;
	
	return throttle;
}

var throttleTime = {};

var hasRequiredThrottleTime;

function requireThrottleTime () {
	if (hasRequiredThrottleTime) return throttleTime;
	hasRequiredThrottleTime = 1;
	Object.defineProperty(throttleTime, "__esModule", { value: true });
	throttleTime.throttleTime = void 0;
	var async_1 = requireAsync();
	var throttle_1 = requireThrottle();
	var timer_1 = requireTimer();
	function throttleTime$1(duration, scheduler, config) {
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    var duration$ = timer_1.timer(duration, scheduler);
	    return throttle_1.throttle(function () { return duration$; }, config);
	}
	throttleTime.throttleTime = throttleTime$1;
	
	return throttleTime;
}

var timeInterval = {};

var hasRequiredTimeInterval;

function requireTimeInterval () {
	if (hasRequiredTimeInterval) return timeInterval;
	hasRequiredTimeInterval = 1;
	Object.defineProperty(timeInterval, "__esModule", { value: true });
	timeInterval.TimeInterval = timeInterval.timeInterval = void 0;
	var async_1 = requireAsync();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function timeInterval$1(scheduler) {
	    if (scheduler === void 0) { scheduler = async_1.asyncScheduler; }
	    return lift_1.operate(function (source, subscriber) {
	        var last = scheduler.now();
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var now = scheduler.now();
	            var interval = now - last;
	            last = now;
	            subscriber.next(new TimeInterval(value, interval));
	        }));
	    });
	}
	timeInterval.timeInterval = timeInterval$1;
	var TimeInterval = (function () {
	    function TimeInterval(value, interval) {
	        this.value = value;
	        this.interval = interval;
	    }
	    return TimeInterval;
	}());
	timeInterval.TimeInterval = TimeInterval;
	
	return timeInterval;
}

var timeoutWith = {};

var hasRequiredTimeoutWith;

function requireTimeoutWith () {
	if (hasRequiredTimeoutWith) return timeoutWith;
	hasRequiredTimeoutWith = 1;
	Object.defineProperty(timeoutWith, "__esModule", { value: true });
	timeoutWith.timeoutWith = void 0;
	var async_1 = requireAsync();
	var isDate_1 = requireIsDate();
	var timeout_1 = requireTimeout();
	function timeoutWith$1(due, withObservable, scheduler) {
	    var first;
	    var each;
	    var _with;
	    scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async_1.async;
	    if (isDate_1.isValidDate(due)) {
	        first = due;
	    }
	    else if (typeof due === 'number') {
	        each = due;
	    }
	    if (withObservable) {
	        _with = function () { return withObservable; };
	    }
	    else {
	        throw new TypeError('No observable provided to switch to');
	    }
	    if (first == null && each == null) {
	        throw new TypeError('No timeout provided.');
	    }
	    return timeout_1.timeout({
	        first: first,
	        each: each,
	        scheduler: scheduler,
	        with: _with,
	    });
	}
	timeoutWith.timeoutWith = timeoutWith$1;
	
	return timeoutWith;
}

var timestamp = {};

var hasRequiredTimestamp;

function requireTimestamp () {
	if (hasRequiredTimestamp) return timestamp;
	hasRequiredTimestamp = 1;
	Object.defineProperty(timestamp, "__esModule", { value: true });
	timestamp.timestamp = void 0;
	var dateTimestampProvider_1 = requireDateTimestampProvider();
	var map_1 = requireMap();
	function timestamp$1(timestampProvider) {
	    if (timestampProvider === void 0) { timestampProvider = dateTimestampProvider_1.dateTimestampProvider; }
	    return map_1.map(function (value) { return ({ value: value, timestamp: timestampProvider.now() }); });
	}
	timestamp.timestamp = timestamp$1;
	
	return timestamp;
}

var window = {};

var hasRequiredWindow;

function requireWindow () {
	if (hasRequiredWindow) return window;
	hasRequiredWindow = 1;
	Object.defineProperty(window, "__esModule", { value: true });
	window.window = void 0;
	var Subject_1 = requireSubject();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var noop_1 = requireNoop();
	var innerFrom_1 = requireInnerFrom();
	function window$1(windowBoundaries) {
	    return lift_1.operate(function (source, subscriber) {
	        var windowSubject = new Subject_1.Subject();
	        subscriber.next(windowSubject.asObservable());
	        var errorHandler = function (err) {
	            windowSubject.error(err);
	            subscriber.error(err);
	        };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value); }, function () {
	            windowSubject.complete();
	            subscriber.complete();
	        }, errorHandler));
	        innerFrom_1.innerFrom(windowBoundaries).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function () {
	            windowSubject.complete();
	            subscriber.next((windowSubject = new Subject_1.Subject()));
	        }, noop_1.noop, errorHandler));
	        return function () {
	            windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
	            windowSubject = null;
	        };
	    });
	}
	window.window = window$1;
	
	return window;
}

var windowCount = {};

var hasRequiredWindowCount;

function requireWindowCount () {
	if (hasRequiredWindowCount) return windowCount;
	hasRequiredWindowCount = 1;
	var __values = (windowCount && windowCount.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(windowCount, "__esModule", { value: true });
	windowCount.windowCount = void 0;
	var Subject_1 = requireSubject();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	function windowCount$1(windowSize, startWindowEvery) {
	    if (startWindowEvery === void 0) { startWindowEvery = 0; }
	    var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
	    return lift_1.operate(function (source, subscriber) {
	        var windows = [new Subject_1.Subject()];
	        var count = 0;
	        subscriber.next(windows[0].asObservable());
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var e_1, _a;
	            try {
	                for (var windows_1 = __values(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
	                    var window_1 = windows_1_1.value;
	                    window_1.next(value);
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	            var c = count - windowSize + 1;
	            if (c >= 0 && c % startEvery === 0) {
	                windows.shift().complete();
	            }
	            if (++count % startEvery === 0) {
	                var window_2 = new Subject_1.Subject();
	                windows.push(window_2);
	                subscriber.next(window_2.asObservable());
	            }
	        }, function () {
	            while (windows.length > 0) {
	                windows.shift().complete();
	            }
	            subscriber.complete();
	        }, function (err) {
	            while (windows.length > 0) {
	                windows.shift().error(err);
	            }
	            subscriber.error(err);
	        }, function () {
	            windows = null;
	        }));
	    });
	}
	windowCount.windowCount = windowCount$1;
	
	return windowCount;
}

var windowTime = {};

var hasRequiredWindowTime;

function requireWindowTime () {
	if (hasRequiredWindowTime) return windowTime;
	hasRequiredWindowTime = 1;
	Object.defineProperty(windowTime, "__esModule", { value: true });
	windowTime.windowTime = void 0;
	var Subject_1 = requireSubject();
	var async_1 = requireAsync();
	var Subscription_1 = requireSubscription();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var arrRemove_1 = requireArrRemove();
	var args_1 = requireArgs();
	var executeSchedule_1 = requireExecuteSchedule();
	function windowTime$1(windowTimeSpan) {
	    var _a, _b;
	    var otherArgs = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        otherArgs[_i - 1] = arguments[_i];
	    }
	    var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
	    var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
	    var maxWindowSize = otherArgs[1] || Infinity;
	    return lift_1.operate(function (source, subscriber) {
	        var windowRecords = [];
	        var restartOnClose = false;
	        var closeWindow = function (record) {
	            var window = record.window, subs = record.subs;
	            window.complete();
	            subs.unsubscribe();
	            arrRemove_1.arrRemove(windowRecords, record);
	            restartOnClose && startWindow();
	        };
	        var startWindow = function () {
	            if (windowRecords) {
	                var subs = new Subscription_1.Subscription();
	                subscriber.add(subs);
	                var window_1 = new Subject_1.Subject();
	                var record_1 = {
	                    window: window_1,
	                    subs: subs,
	                    seen: 0,
	                };
	                windowRecords.push(record_1);
	                subscriber.next(window_1.asObservable());
	                executeSchedule_1.executeSchedule(subs, scheduler, function () { return closeWindow(record_1); }, windowTimeSpan);
	            }
	        };
	        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
	            executeSchedule_1.executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
	        }
	        else {
	            restartOnClose = true;
	        }
	        startWindow();
	        var loop = function (cb) { return windowRecords.slice().forEach(cb); };
	        var terminate = function (cb) {
	            loop(function (_a) {
	                var window = _a.window;
	                return cb(window);
	            });
	            cb(subscriber);
	            subscriber.unsubscribe();
	        };
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            loop(function (record) {
	                record.window.next(value);
	                maxWindowSize <= ++record.seen && closeWindow(record);
	            });
	        }, function () { return terminate(function (consumer) { return consumer.complete(); }); }, function (err) { return terminate(function (consumer) { return consumer.error(err); }); }));
	        return function () {
	            windowRecords = null;
	        };
	    });
	}
	windowTime.windowTime = windowTime$1;
	
	return windowTime;
}

var windowToggle = {};

var hasRequiredWindowToggle;

function requireWindowToggle () {
	if (hasRequiredWindowToggle) return windowToggle;
	hasRequiredWindowToggle = 1;
	var __values = (windowToggle && windowToggle.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	Object.defineProperty(windowToggle, "__esModule", { value: true });
	windowToggle.windowToggle = void 0;
	var Subject_1 = requireSubject();
	var Subscription_1 = requireSubscription();
	var lift_1 = requireLift();
	var innerFrom_1 = requireInnerFrom();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var noop_1 = requireNoop();
	var arrRemove_1 = requireArrRemove();
	function windowToggle$1(openings, closingSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var windows = [];
	        var handleError = function (err) {
	            while (0 < windows.length) {
	                windows.shift().error(err);
	            }
	            subscriber.error(err);
	        };
	        innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (openValue) {
	            var window = new Subject_1.Subject();
	            windows.push(window);
	            var closingSubscription = new Subscription_1.Subscription();
	            var closeWindow = function () {
	                arrRemove_1.arrRemove(windows, window);
	                window.complete();
	                closingSubscription.unsubscribe();
	            };
	            var closingNotifier;
	            try {
	                closingNotifier = innerFrom_1.innerFrom(closingSelector(openValue));
	            }
	            catch (err) {
	                handleError(err);
	                return;
	            }
	            subscriber.next(window.asObservable());
	            closingSubscription.add(closingNotifier.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, closeWindow, noop_1.noop, handleError)));
	        }, noop_1.noop));
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            var e_1, _a;
	            var windowsCopy = windows.slice();
	            try {
	                for (var windowsCopy_1 = __values(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
	                    var window_1 = windowsCopy_1_1.value;
	                    window_1.next(value);
	                }
	            }
	            catch (e_1_1) { e_1 = { error: e_1_1 }; }
	            finally {
	                try {
	                    if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
	                }
	                finally { if (e_1) throw e_1.error; }
	            }
	        }, function () {
	            while (0 < windows.length) {
	                windows.shift().complete();
	            }
	            subscriber.complete();
	        }, handleError, function () {
	            while (0 < windows.length) {
	                windows.shift().unsubscribe();
	            }
	        }));
	    });
	}
	windowToggle.windowToggle = windowToggle$1;
	
	return windowToggle;
}

var windowWhen = {};

var hasRequiredWindowWhen;

function requireWindowWhen () {
	if (hasRequiredWindowWhen) return windowWhen;
	hasRequiredWindowWhen = 1;
	Object.defineProperty(windowWhen, "__esModule", { value: true });
	windowWhen.windowWhen = void 0;
	var Subject_1 = requireSubject();
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var innerFrom_1 = requireInnerFrom();
	function windowWhen$1(closingSelector) {
	    return lift_1.operate(function (source, subscriber) {
	        var window;
	        var closingSubscriber;
	        var handleError = function (err) {
	            window.error(err);
	            subscriber.error(err);
	        };
	        var openWindow = function () {
	            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
	            window === null || window === void 0 ? void 0 : window.complete();
	            window = new Subject_1.Subject();
	            subscriber.next(window.asObservable());
	            var closingNotifier;
	            try {
	                closingNotifier = innerFrom_1.innerFrom(closingSelector());
	            }
	            catch (err) {
	                handleError(err);
	                return;
	            }
	            closingNotifier.subscribe((closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openWindow, openWindow, handleError)));
	        };
	        openWindow();
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) { return window.next(value); }, function () {
	            window.complete();
	            subscriber.complete();
	        }, handleError, function () {
	            closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
	            window = null;
	        }));
	    });
	}
	windowWhen.windowWhen = windowWhen$1;
	
	return windowWhen;
}

var withLatestFrom = {};

var hasRequiredWithLatestFrom;

function requireWithLatestFrom () {
	if (hasRequiredWithLatestFrom) return withLatestFrom;
	hasRequiredWithLatestFrom = 1;
	var __read = (withLatestFrom && withLatestFrom.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (withLatestFrom && withLatestFrom.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(withLatestFrom, "__esModule", { value: true });
	withLatestFrom.withLatestFrom = void 0;
	var lift_1 = requireLift();
	var OperatorSubscriber_1 = requireOperatorSubscriber();
	var innerFrom_1 = requireInnerFrom();
	var identity_1 = requireIdentity();
	var noop_1 = requireNoop();
	var args_1 = requireArgs();
	function withLatestFrom$1() {
	    var inputs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        inputs[_i] = arguments[_i];
	    }
	    var project = args_1.popResultSelector(inputs);
	    return lift_1.operate(function (source, subscriber) {
	        var len = inputs.length;
	        var otherValues = new Array(len);
	        var hasValue = inputs.map(function () { return false; });
	        var ready = false;
	        var _loop_1 = function (i) {
	            innerFrom_1.innerFrom(inputs[i]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	                otherValues[i] = value;
	                if (!ready && !hasValue[i]) {
	                    hasValue[i] = true;
	                    (ready = hasValue.every(identity_1.identity)) && (hasValue = null);
	                }
	            }, noop_1.noop));
	        };
	        for (var i = 0; i < len; i++) {
	            _loop_1(i);
	        }
	        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function (value) {
	            if (ready) {
	                var values = __spreadArray([value], __read(otherValues));
	                subscriber.next(project ? project.apply(void 0, __spreadArray([], __read(values))) : values);
	            }
	        }));
	    });
	}
	withLatestFrom.withLatestFrom = withLatestFrom$1;
	
	return withLatestFrom;
}

var zipAll = {};

var hasRequiredZipAll;

function requireZipAll () {
	if (hasRequiredZipAll) return zipAll;
	hasRequiredZipAll = 1;
	Object.defineProperty(zipAll, "__esModule", { value: true });
	zipAll.zipAll = void 0;
	var zip_1 = requireZip$1();
	var joinAllInternals_1 = requireJoinAllInternals();
	function zipAll$1(project) {
	    return joinAllInternals_1.joinAllInternals(zip_1.zip, project);
	}
	zipAll.zipAll = zipAll$1;
	
	return zipAll;
}

var zipWith = {};

var zip = {};

var hasRequiredZip;

function requireZip () {
	if (hasRequiredZip) return zip;
	hasRequiredZip = 1;
	var __read = (zip && zip.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (zip && zip.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(zip, "__esModule", { value: true });
	zip.zip = void 0;
	var zip_1 = requireZip$1();
	var lift_1 = requireLift();
	function zip$1() {
	    var sources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        sources[_i] = arguments[_i];
	    }
	    return lift_1.operate(function (source, subscriber) {
	        zip_1.zip.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
	    });
	}
	zip.zip = zip$1;
	
	return zip;
}

var hasRequiredZipWith;

function requireZipWith () {
	if (hasRequiredZipWith) return zipWith;
	hasRequiredZipWith = 1;
	var __read = (zipWith && zipWith.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (zipWith && zipWith.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(zipWith, "__esModule", { value: true });
	zipWith.zipWith = void 0;
	var zip_1 = requireZip();
	function zipWith$1() {
	    var otherInputs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        otherInputs[_i] = arguments[_i];
	    }
	    return zip_1.zip.apply(void 0, __spreadArray([], __read(otherInputs)));
	}
	zipWith.zipWith = zipWith$1;
	
	return zipWith;
}

var hasRequiredCjs;

function requireCjs () {
	if (hasRequiredCjs) return cjs;
	hasRequiredCjs = 1;
	(function (exports) {
		var __createBinding = (cjs && cjs.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (cjs && cjs.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.interval = exports.iif = exports.generate = exports.fromEventPattern = exports.fromEvent = exports.from = exports.forkJoin = exports.empty = exports.defer = exports.connectable = exports.concat = exports.combineLatest = exports.bindNodeCallback = exports.bindCallback = exports.UnsubscriptionError = exports.TimeoutError = exports.SequenceError = exports.ObjectUnsubscribedError = exports.NotFoundError = exports.EmptyError = exports.ArgumentOutOfRangeError = exports.firstValueFrom = exports.lastValueFrom = exports.isObservable = exports.identity = exports.noop = exports.pipe = exports.NotificationKind = exports.Notification = exports.Subscriber = exports.Subscription = exports.Scheduler = exports.VirtualAction = exports.VirtualTimeScheduler = exports.animationFrameScheduler = exports.animationFrame = exports.queueScheduler = exports.queue = exports.asyncScheduler = exports.async = exports.asapScheduler = exports.asap = exports.AsyncSubject = exports.ReplaySubject = exports.BehaviorSubject = exports.Subject = exports.animationFrames = exports.observable = exports.ConnectableObservable = exports.Observable = void 0;
		exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.combineLatestWith = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = exports.config = exports.NEVER = exports.EMPTY = exports.scheduled = exports.zip = exports.using = exports.timer = exports.throwError = exports.range = exports.race = exports.partition = exports.pairs = exports.onErrorResumeNext = exports.of = exports.never = exports.merge = void 0;
		exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.pairwise = exports.onErrorResumeNextWith = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = exports.mergeAll = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = void 0;
		exports.zipWith = exports.zipAll = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = void 0;
		var Observable_1 = requireObservable();
		Object.defineProperty(exports, "Observable", { enumerable: true, get: function () { return Observable_1.Observable; } });
		var ConnectableObservable_1 = requireConnectableObservable();
		Object.defineProperty(exports, "ConnectableObservable", { enumerable: true, get: function () { return ConnectableObservable_1.ConnectableObservable; } });
		var observable_1 = requireObservable$1();
		Object.defineProperty(exports, "observable", { enumerable: true, get: function () { return observable_1.observable; } });
		var animationFrames_1 = requireAnimationFrames();
		Object.defineProperty(exports, "animationFrames", { enumerable: true, get: function () { return animationFrames_1.animationFrames; } });
		var Subject_1 = requireSubject();
		Object.defineProperty(exports, "Subject", { enumerable: true, get: function () { return Subject_1.Subject; } });
		var BehaviorSubject_1 = requireBehaviorSubject();
		Object.defineProperty(exports, "BehaviorSubject", { enumerable: true, get: function () { return BehaviorSubject_1.BehaviorSubject; } });
		var ReplaySubject_1 = requireReplaySubject();
		Object.defineProperty(exports, "ReplaySubject", { enumerable: true, get: function () { return ReplaySubject_1.ReplaySubject; } });
		var AsyncSubject_1 = requireAsyncSubject();
		Object.defineProperty(exports, "AsyncSubject", { enumerable: true, get: function () { return AsyncSubject_1.AsyncSubject; } });
		var asap_1 = requireAsap();
		Object.defineProperty(exports, "asap", { enumerable: true, get: function () { return asap_1.asap; } });
		Object.defineProperty(exports, "asapScheduler", { enumerable: true, get: function () { return asap_1.asapScheduler; } });
		var async_1 = requireAsync();
		Object.defineProperty(exports, "async", { enumerable: true, get: function () { return async_1.async; } });
		Object.defineProperty(exports, "asyncScheduler", { enumerable: true, get: function () { return async_1.asyncScheduler; } });
		var queue_1 = requireQueue();
		Object.defineProperty(exports, "queue", { enumerable: true, get: function () { return queue_1.queue; } });
		Object.defineProperty(exports, "queueScheduler", { enumerable: true, get: function () { return queue_1.queueScheduler; } });
		var animationFrame_1 = requireAnimationFrame();
		Object.defineProperty(exports, "animationFrame", { enumerable: true, get: function () { return animationFrame_1.animationFrame; } });
		Object.defineProperty(exports, "animationFrameScheduler", { enumerable: true, get: function () { return animationFrame_1.animationFrameScheduler; } });
		var VirtualTimeScheduler_1 = requireVirtualTimeScheduler();
		Object.defineProperty(exports, "VirtualTimeScheduler", { enumerable: true, get: function () { return VirtualTimeScheduler_1.VirtualTimeScheduler; } });
		Object.defineProperty(exports, "VirtualAction", { enumerable: true, get: function () { return VirtualTimeScheduler_1.VirtualAction; } });
		var Scheduler_1 = requireScheduler();
		Object.defineProperty(exports, "Scheduler", { enumerable: true, get: function () { return Scheduler_1.Scheduler; } });
		var Subscription_1 = requireSubscription();
		Object.defineProperty(exports, "Subscription", { enumerable: true, get: function () { return Subscription_1.Subscription; } });
		var Subscriber_1 = requireSubscriber();
		Object.defineProperty(exports, "Subscriber", { enumerable: true, get: function () { return Subscriber_1.Subscriber; } });
		var Notification_1 = requireNotification();
		Object.defineProperty(exports, "Notification", { enumerable: true, get: function () { return Notification_1.Notification; } });
		Object.defineProperty(exports, "NotificationKind", { enumerable: true, get: function () { return Notification_1.NotificationKind; } });
		var pipe_1 = requirePipe();
		Object.defineProperty(exports, "pipe", { enumerable: true, get: function () { return pipe_1.pipe; } });
		var noop_1 = requireNoop();
		Object.defineProperty(exports, "noop", { enumerable: true, get: function () { return noop_1.noop; } });
		var identity_1 = requireIdentity();
		Object.defineProperty(exports, "identity", { enumerable: true, get: function () { return identity_1.identity; } });
		var isObservable_1 = requireIsObservable();
		Object.defineProperty(exports, "isObservable", { enumerable: true, get: function () { return isObservable_1.isObservable; } });
		var lastValueFrom_1 = requireLastValueFrom();
		Object.defineProperty(exports, "lastValueFrom", { enumerable: true, get: function () { return lastValueFrom_1.lastValueFrom; } });
		var firstValueFrom_1 = requireFirstValueFrom();
		Object.defineProperty(exports, "firstValueFrom", { enumerable: true, get: function () { return firstValueFrom_1.firstValueFrom; } });
		var ArgumentOutOfRangeError_1 = requireArgumentOutOfRangeError();
		Object.defineProperty(exports, "ArgumentOutOfRangeError", { enumerable: true, get: function () { return ArgumentOutOfRangeError_1.ArgumentOutOfRangeError; } });
		var EmptyError_1 = requireEmptyError();
		Object.defineProperty(exports, "EmptyError", { enumerable: true, get: function () { return EmptyError_1.EmptyError; } });
		var NotFoundError_1 = requireNotFoundError();
		Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return NotFoundError_1.NotFoundError; } });
		var ObjectUnsubscribedError_1 = requireObjectUnsubscribedError();
		Object.defineProperty(exports, "ObjectUnsubscribedError", { enumerable: true, get: function () { return ObjectUnsubscribedError_1.ObjectUnsubscribedError; } });
		var SequenceError_1 = requireSequenceError();
		Object.defineProperty(exports, "SequenceError", { enumerable: true, get: function () { return SequenceError_1.SequenceError; } });
		var timeout_1 = requireTimeout();
		Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function () { return timeout_1.TimeoutError; } });
		var UnsubscriptionError_1 = requireUnsubscriptionError();
		Object.defineProperty(exports, "UnsubscriptionError", { enumerable: true, get: function () { return UnsubscriptionError_1.UnsubscriptionError; } });
		var bindCallback_1 = requireBindCallback();
		Object.defineProperty(exports, "bindCallback", { enumerable: true, get: function () { return bindCallback_1.bindCallback; } });
		var bindNodeCallback_1 = requireBindNodeCallback();
		Object.defineProperty(exports, "bindNodeCallback", { enumerable: true, get: function () { return bindNodeCallback_1.bindNodeCallback; } });
		var combineLatest_1 = requireCombineLatest$1();
		Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function () { return combineLatest_1.combineLatest; } });
		var concat_1 = requireConcat$1();
		Object.defineProperty(exports, "concat", { enumerable: true, get: function () { return concat_1.concat; } });
		var connectable_1 = requireConnectable();
		Object.defineProperty(exports, "connectable", { enumerable: true, get: function () { return connectable_1.connectable; } });
		var defer_1 = requireDefer();
		Object.defineProperty(exports, "defer", { enumerable: true, get: function () { return defer_1.defer; } });
		var empty_1 = requireEmpty();
		Object.defineProperty(exports, "empty", { enumerable: true, get: function () { return empty_1.empty; } });
		var forkJoin_1 = requireForkJoin();
		Object.defineProperty(exports, "forkJoin", { enumerable: true, get: function () { return forkJoin_1.forkJoin; } });
		var from_1 = requireFrom();
		Object.defineProperty(exports, "from", { enumerable: true, get: function () { return from_1.from; } });
		var fromEvent_1 = requireFromEvent();
		Object.defineProperty(exports, "fromEvent", { enumerable: true, get: function () { return fromEvent_1.fromEvent; } });
		var fromEventPattern_1 = requireFromEventPattern();
		Object.defineProperty(exports, "fromEventPattern", { enumerable: true, get: function () { return fromEventPattern_1.fromEventPattern; } });
		var generate_1 = requireGenerate();
		Object.defineProperty(exports, "generate", { enumerable: true, get: function () { return generate_1.generate; } });
		var iif_1 = requireIif();
		Object.defineProperty(exports, "iif", { enumerable: true, get: function () { return iif_1.iif; } });
		var interval_1 = requireInterval();
		Object.defineProperty(exports, "interval", { enumerable: true, get: function () { return interval_1.interval; } });
		var merge_1 = requireMerge$1();
		Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return merge_1.merge; } });
		var never_1 = requireNever();
		Object.defineProperty(exports, "never", { enumerable: true, get: function () { return never_1.never; } });
		var of_1 = requireOf();
		Object.defineProperty(exports, "of", { enumerable: true, get: function () { return of_1.of; } });
		var onErrorResumeNext_1 = requireOnErrorResumeNext();
		Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function () { return onErrorResumeNext_1.onErrorResumeNext; } });
		var pairs_1 = requirePairs();
		Object.defineProperty(exports, "pairs", { enumerable: true, get: function () { return pairs_1.pairs; } });
		var partition_1 = requirePartition();
		Object.defineProperty(exports, "partition", { enumerable: true, get: function () { return partition_1.partition; } });
		var race_1 = requireRace();
		Object.defineProperty(exports, "race", { enumerable: true, get: function () { return race_1.race; } });
		var range_1 = requireRange();
		Object.defineProperty(exports, "range", { enumerable: true, get: function () { return range_1.range; } });
		var throwError_1 = requireThrowError();
		Object.defineProperty(exports, "throwError", { enumerable: true, get: function () { return throwError_1.throwError; } });
		var timer_1 = requireTimer();
		Object.defineProperty(exports, "timer", { enumerable: true, get: function () { return timer_1.timer; } });
		var using_1 = requireUsing();
		Object.defineProperty(exports, "using", { enumerable: true, get: function () { return using_1.using; } });
		var zip_1 = requireZip$1();
		Object.defineProperty(exports, "zip", { enumerable: true, get: function () { return zip_1.zip; } });
		var scheduled_1 = requireScheduled();
		Object.defineProperty(exports, "scheduled", { enumerable: true, get: function () { return scheduled_1.scheduled; } });
		var empty_2 = requireEmpty();
		Object.defineProperty(exports, "EMPTY", { enumerable: true, get: function () { return empty_2.EMPTY; } });
		var never_2 = requireNever();
		Object.defineProperty(exports, "NEVER", { enumerable: true, get: function () { return never_2.NEVER; } });
		__exportStar(requireTypes(), exports);
		var config_1 = requireConfig();
		Object.defineProperty(exports, "config", { enumerable: true, get: function () { return config_1.config; } });
		var audit_1 = requireAudit();
		Object.defineProperty(exports, "audit", { enumerable: true, get: function () { return audit_1.audit; } });
		var auditTime_1 = requireAuditTime();
		Object.defineProperty(exports, "auditTime", { enumerable: true, get: function () { return auditTime_1.auditTime; } });
		var buffer_1 = requireBuffer();
		Object.defineProperty(exports, "buffer", { enumerable: true, get: function () { return buffer_1.buffer; } });
		var bufferCount_1 = requireBufferCount();
		Object.defineProperty(exports, "bufferCount", { enumerable: true, get: function () { return bufferCount_1.bufferCount; } });
		var bufferTime_1 = requireBufferTime();
		Object.defineProperty(exports, "bufferTime", { enumerable: true, get: function () { return bufferTime_1.bufferTime; } });
		var bufferToggle_1 = requireBufferToggle();
		Object.defineProperty(exports, "bufferToggle", { enumerable: true, get: function () { return bufferToggle_1.bufferToggle; } });
		var bufferWhen_1 = requireBufferWhen();
		Object.defineProperty(exports, "bufferWhen", { enumerable: true, get: function () { return bufferWhen_1.bufferWhen; } });
		var catchError_1 = requireCatchError();
		Object.defineProperty(exports, "catchError", { enumerable: true, get: function () { return catchError_1.catchError; } });
		var combineAll_1 = requireCombineAll();
		Object.defineProperty(exports, "combineAll", { enumerable: true, get: function () { return combineAll_1.combineAll; } });
		var combineLatestAll_1 = requireCombineLatestAll();
		Object.defineProperty(exports, "combineLatestAll", { enumerable: true, get: function () { return combineLatestAll_1.combineLatestAll; } });
		var combineLatestWith_1 = requireCombineLatestWith();
		Object.defineProperty(exports, "combineLatestWith", { enumerable: true, get: function () { return combineLatestWith_1.combineLatestWith; } });
		var concatAll_1 = requireConcatAll();
		Object.defineProperty(exports, "concatAll", { enumerable: true, get: function () { return concatAll_1.concatAll; } });
		var concatMap_1 = requireConcatMap();
		Object.defineProperty(exports, "concatMap", { enumerable: true, get: function () { return concatMap_1.concatMap; } });
		var concatMapTo_1 = requireConcatMapTo();
		Object.defineProperty(exports, "concatMapTo", { enumerable: true, get: function () { return concatMapTo_1.concatMapTo; } });
		var concatWith_1 = requireConcatWith();
		Object.defineProperty(exports, "concatWith", { enumerable: true, get: function () { return concatWith_1.concatWith; } });
		var connect_1 = requireConnect();
		Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return connect_1.connect; } });
		var count_1 = requireCount();
		Object.defineProperty(exports, "count", { enumerable: true, get: function () { return count_1.count; } });
		var debounce_1 = requireDebounce();
		Object.defineProperty(exports, "debounce", { enumerable: true, get: function () { return debounce_1.debounce; } });
		var debounceTime_1 = requireDebounceTime();
		Object.defineProperty(exports, "debounceTime", { enumerable: true, get: function () { return debounceTime_1.debounceTime; } });
		var defaultIfEmpty_1 = requireDefaultIfEmpty();
		Object.defineProperty(exports, "defaultIfEmpty", { enumerable: true, get: function () { return defaultIfEmpty_1.defaultIfEmpty; } });
		var delay_1 = requireDelay();
		Object.defineProperty(exports, "delay", { enumerable: true, get: function () { return delay_1.delay; } });
		var delayWhen_1 = requireDelayWhen();
		Object.defineProperty(exports, "delayWhen", { enumerable: true, get: function () { return delayWhen_1.delayWhen; } });
		var dematerialize_1 = requireDematerialize();
		Object.defineProperty(exports, "dematerialize", { enumerable: true, get: function () { return dematerialize_1.dematerialize; } });
		var distinct_1 = requireDistinct();
		Object.defineProperty(exports, "distinct", { enumerable: true, get: function () { return distinct_1.distinct; } });
		var distinctUntilChanged_1 = requireDistinctUntilChanged();
		Object.defineProperty(exports, "distinctUntilChanged", { enumerable: true, get: function () { return distinctUntilChanged_1.distinctUntilChanged; } });
		var distinctUntilKeyChanged_1 = requireDistinctUntilKeyChanged();
		Object.defineProperty(exports, "distinctUntilKeyChanged", { enumerable: true, get: function () { return distinctUntilKeyChanged_1.distinctUntilKeyChanged; } });
		var elementAt_1 = requireElementAt();
		Object.defineProperty(exports, "elementAt", { enumerable: true, get: function () { return elementAt_1.elementAt; } });
		var endWith_1 = requireEndWith();
		Object.defineProperty(exports, "endWith", { enumerable: true, get: function () { return endWith_1.endWith; } });
		var every_1 = requireEvery();
		Object.defineProperty(exports, "every", { enumerable: true, get: function () { return every_1.every; } });
		var exhaust_1 = requireExhaust();
		Object.defineProperty(exports, "exhaust", { enumerable: true, get: function () { return exhaust_1.exhaust; } });
		var exhaustAll_1 = requireExhaustAll();
		Object.defineProperty(exports, "exhaustAll", { enumerable: true, get: function () { return exhaustAll_1.exhaustAll; } });
		var exhaustMap_1 = requireExhaustMap();
		Object.defineProperty(exports, "exhaustMap", { enumerable: true, get: function () { return exhaustMap_1.exhaustMap; } });
		var expand_1 = requireExpand();
		Object.defineProperty(exports, "expand", { enumerable: true, get: function () { return expand_1.expand; } });
		var filter_1 = requireFilter();
		Object.defineProperty(exports, "filter", { enumerable: true, get: function () { return filter_1.filter; } });
		var finalize_1 = requireFinalize();
		Object.defineProperty(exports, "finalize", { enumerable: true, get: function () { return finalize_1.finalize; } });
		var find_1 = requireFind();
		Object.defineProperty(exports, "find", { enumerable: true, get: function () { return find_1.find; } });
		var findIndex_1 = requireFindIndex();
		Object.defineProperty(exports, "findIndex", { enumerable: true, get: function () { return findIndex_1.findIndex; } });
		var first_1 = requireFirst();
		Object.defineProperty(exports, "first", { enumerable: true, get: function () { return first_1.first; } });
		var groupBy_1 = requireGroupBy();
		Object.defineProperty(exports, "groupBy", { enumerable: true, get: function () { return groupBy_1.groupBy; } });
		var ignoreElements_1 = requireIgnoreElements();
		Object.defineProperty(exports, "ignoreElements", { enumerable: true, get: function () { return ignoreElements_1.ignoreElements; } });
		var isEmpty_1 = requireIsEmpty();
		Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function () { return isEmpty_1.isEmpty; } });
		var last_1 = requireLast();
		Object.defineProperty(exports, "last", { enumerable: true, get: function () { return last_1.last; } });
		var map_1 = requireMap();
		Object.defineProperty(exports, "map", { enumerable: true, get: function () { return map_1.map; } });
		var mapTo_1 = requireMapTo();
		Object.defineProperty(exports, "mapTo", { enumerable: true, get: function () { return mapTo_1.mapTo; } });
		var materialize_1 = requireMaterialize();
		Object.defineProperty(exports, "materialize", { enumerable: true, get: function () { return materialize_1.materialize; } });
		var max_1 = requireMax();
		Object.defineProperty(exports, "max", { enumerable: true, get: function () { return max_1.max; } });
		var mergeAll_1 = requireMergeAll();
		Object.defineProperty(exports, "mergeAll", { enumerable: true, get: function () { return mergeAll_1.mergeAll; } });
		var flatMap_1 = requireFlatMap();
		Object.defineProperty(exports, "flatMap", { enumerable: true, get: function () { return flatMap_1.flatMap; } });
		var mergeMap_1 = requireMergeMap();
		Object.defineProperty(exports, "mergeMap", { enumerable: true, get: function () { return mergeMap_1.mergeMap; } });
		var mergeMapTo_1 = requireMergeMapTo();
		Object.defineProperty(exports, "mergeMapTo", { enumerable: true, get: function () { return mergeMapTo_1.mergeMapTo; } });
		var mergeScan_1 = requireMergeScan();
		Object.defineProperty(exports, "mergeScan", { enumerable: true, get: function () { return mergeScan_1.mergeScan; } });
		var mergeWith_1 = requireMergeWith();
		Object.defineProperty(exports, "mergeWith", { enumerable: true, get: function () { return mergeWith_1.mergeWith; } });
		var min_1 = requireMin();
		Object.defineProperty(exports, "min", { enumerable: true, get: function () { return min_1.min; } });
		var multicast_1 = requireMulticast();
		Object.defineProperty(exports, "multicast", { enumerable: true, get: function () { return multicast_1.multicast; } });
		var observeOn_1 = requireObserveOn();
		Object.defineProperty(exports, "observeOn", { enumerable: true, get: function () { return observeOn_1.observeOn; } });
		var onErrorResumeNextWith_1 = requireOnErrorResumeNextWith();
		Object.defineProperty(exports, "onErrorResumeNextWith", { enumerable: true, get: function () { return onErrorResumeNextWith_1.onErrorResumeNextWith; } });
		var pairwise_1 = requirePairwise();
		Object.defineProperty(exports, "pairwise", { enumerable: true, get: function () { return pairwise_1.pairwise; } });
		var pluck_1 = requirePluck();
		Object.defineProperty(exports, "pluck", { enumerable: true, get: function () { return pluck_1.pluck; } });
		var publish_1 = requirePublish();
		Object.defineProperty(exports, "publish", { enumerable: true, get: function () { return publish_1.publish; } });
		var publishBehavior_1 = requirePublishBehavior();
		Object.defineProperty(exports, "publishBehavior", { enumerable: true, get: function () { return publishBehavior_1.publishBehavior; } });
		var publishLast_1 = requirePublishLast();
		Object.defineProperty(exports, "publishLast", { enumerable: true, get: function () { return publishLast_1.publishLast; } });
		var publishReplay_1 = requirePublishReplay();
		Object.defineProperty(exports, "publishReplay", { enumerable: true, get: function () { return publishReplay_1.publishReplay; } });
		var raceWith_1 = requireRaceWith();
		Object.defineProperty(exports, "raceWith", { enumerable: true, get: function () { return raceWith_1.raceWith; } });
		var reduce_1 = requireReduce();
		Object.defineProperty(exports, "reduce", { enumerable: true, get: function () { return reduce_1.reduce; } });
		var repeat_1 = requireRepeat();
		Object.defineProperty(exports, "repeat", { enumerable: true, get: function () { return repeat_1.repeat; } });
		var repeatWhen_1 = requireRepeatWhen();
		Object.defineProperty(exports, "repeatWhen", { enumerable: true, get: function () { return repeatWhen_1.repeatWhen; } });
		var retry_1 = requireRetry();
		Object.defineProperty(exports, "retry", { enumerable: true, get: function () { return retry_1.retry; } });
		var retryWhen_1 = requireRetryWhen();
		Object.defineProperty(exports, "retryWhen", { enumerable: true, get: function () { return retryWhen_1.retryWhen; } });
		var refCount_1 = requireRefCount();
		Object.defineProperty(exports, "refCount", { enumerable: true, get: function () { return refCount_1.refCount; } });
		var sample_1 = requireSample();
		Object.defineProperty(exports, "sample", { enumerable: true, get: function () { return sample_1.sample; } });
		var sampleTime_1 = requireSampleTime();
		Object.defineProperty(exports, "sampleTime", { enumerable: true, get: function () { return sampleTime_1.sampleTime; } });
		var scan_1 = requireScan();
		Object.defineProperty(exports, "scan", { enumerable: true, get: function () { return scan_1.scan; } });
		var sequenceEqual_1 = requireSequenceEqual();
		Object.defineProperty(exports, "sequenceEqual", { enumerable: true, get: function () { return sequenceEqual_1.sequenceEqual; } });
		var share_1 = requireShare();
		Object.defineProperty(exports, "share", { enumerable: true, get: function () { return share_1.share; } });
		var shareReplay_1 = requireShareReplay();
		Object.defineProperty(exports, "shareReplay", { enumerable: true, get: function () { return shareReplay_1.shareReplay; } });
		var single_1 = requireSingle();
		Object.defineProperty(exports, "single", { enumerable: true, get: function () { return single_1.single; } });
		var skip_1 = requireSkip();
		Object.defineProperty(exports, "skip", { enumerable: true, get: function () { return skip_1.skip; } });
		var skipLast_1 = requireSkipLast();
		Object.defineProperty(exports, "skipLast", { enumerable: true, get: function () { return skipLast_1.skipLast; } });
		var skipUntil_1 = requireSkipUntil();
		Object.defineProperty(exports, "skipUntil", { enumerable: true, get: function () { return skipUntil_1.skipUntil; } });
		var skipWhile_1 = requireSkipWhile();
		Object.defineProperty(exports, "skipWhile", { enumerable: true, get: function () { return skipWhile_1.skipWhile; } });
		var startWith_1 = requireStartWith();
		Object.defineProperty(exports, "startWith", { enumerable: true, get: function () { return startWith_1.startWith; } });
		var subscribeOn_1 = requireSubscribeOn();
		Object.defineProperty(exports, "subscribeOn", { enumerable: true, get: function () { return subscribeOn_1.subscribeOn; } });
		var switchAll_1 = requireSwitchAll();
		Object.defineProperty(exports, "switchAll", { enumerable: true, get: function () { return switchAll_1.switchAll; } });
		var switchMap_1 = requireSwitchMap();
		Object.defineProperty(exports, "switchMap", { enumerable: true, get: function () { return switchMap_1.switchMap; } });
		var switchMapTo_1 = requireSwitchMapTo();
		Object.defineProperty(exports, "switchMapTo", { enumerable: true, get: function () { return switchMapTo_1.switchMapTo; } });
		var switchScan_1 = requireSwitchScan();
		Object.defineProperty(exports, "switchScan", { enumerable: true, get: function () { return switchScan_1.switchScan; } });
		var take_1 = requireTake();
		Object.defineProperty(exports, "take", { enumerable: true, get: function () { return take_1.take; } });
		var takeLast_1 = requireTakeLast();
		Object.defineProperty(exports, "takeLast", { enumerable: true, get: function () { return takeLast_1.takeLast; } });
		var takeUntil_1 = requireTakeUntil();
		Object.defineProperty(exports, "takeUntil", { enumerable: true, get: function () { return takeUntil_1.takeUntil; } });
		var takeWhile_1 = requireTakeWhile();
		Object.defineProperty(exports, "takeWhile", { enumerable: true, get: function () { return takeWhile_1.takeWhile; } });
		var tap_1 = requireTap();
		Object.defineProperty(exports, "tap", { enumerable: true, get: function () { return tap_1.tap; } });
		var throttle_1 = requireThrottle();
		Object.defineProperty(exports, "throttle", { enumerable: true, get: function () { return throttle_1.throttle; } });
		var throttleTime_1 = requireThrottleTime();
		Object.defineProperty(exports, "throttleTime", { enumerable: true, get: function () { return throttleTime_1.throttleTime; } });
		var throwIfEmpty_1 = requireThrowIfEmpty();
		Object.defineProperty(exports, "throwIfEmpty", { enumerable: true, get: function () { return throwIfEmpty_1.throwIfEmpty; } });
		var timeInterval_1 = requireTimeInterval();
		Object.defineProperty(exports, "timeInterval", { enumerable: true, get: function () { return timeInterval_1.timeInterval; } });
		var timeout_2 = requireTimeout();
		Object.defineProperty(exports, "timeout", { enumerable: true, get: function () { return timeout_2.timeout; } });
		var timeoutWith_1 = requireTimeoutWith();
		Object.defineProperty(exports, "timeoutWith", { enumerable: true, get: function () { return timeoutWith_1.timeoutWith; } });
		var timestamp_1 = requireTimestamp();
		Object.defineProperty(exports, "timestamp", { enumerable: true, get: function () { return timestamp_1.timestamp; } });
		var toArray_1 = requireToArray();
		Object.defineProperty(exports, "toArray", { enumerable: true, get: function () { return toArray_1.toArray; } });
		var window_1 = requireWindow();
		Object.defineProperty(exports, "window", { enumerable: true, get: function () { return window_1.window; } });
		var windowCount_1 = requireWindowCount();
		Object.defineProperty(exports, "windowCount", { enumerable: true, get: function () { return windowCount_1.windowCount; } });
		var windowTime_1 = requireWindowTime();
		Object.defineProperty(exports, "windowTime", { enumerable: true, get: function () { return windowTime_1.windowTime; } });
		var windowToggle_1 = requireWindowToggle();
		Object.defineProperty(exports, "windowToggle", { enumerable: true, get: function () { return windowToggle_1.windowToggle; } });
		var windowWhen_1 = requireWindowWhen();
		Object.defineProperty(exports, "windowWhen", { enumerable: true, get: function () { return windowWhen_1.windowWhen; } });
		var withLatestFrom_1 = requireWithLatestFrom();
		Object.defineProperty(exports, "withLatestFrom", { enumerable: true, get: function () { return withLatestFrom_1.withLatestFrom; } });
		var zipAll_1 = requireZipAll();
		Object.defineProperty(exports, "zipAll", { enumerable: true, get: function () { return zipAll_1.zipAll; } });
		var zipWith_1 = requireZipWith();
		Object.defineProperty(exports, "zipWith", { enumerable: true, get: function () { return zipWith_1.zipWith; } });
		
	} (cjs));
	return cjs;
}

var cjsExports = /*@__PURE__*/ requireCjs();

export { requireMergeAll as $, requireDefaultIfEmpty as A, requireDelay as B, requireDelayWhen as C, requireDematerialize as D, requireDistinct as E, requireDistinctUntilChanged as F, requireDistinctUntilKeyChanged as G, requireElementAt as H, requireEndWith as I, requireEvery as J, requireExhaust as K, requireExhaustAll as L, requireExhaustMap as M, requireExpand as N, requireFinalize as O, requireFind as P, requireFindIndex as Q, requireFirst as R, requireGroupBy as S, requireIgnoreElements as T, requireIsEmpty as U, requireLast as V, requireMap as W, requireMapTo as X, requireMaterialize as Y, requireMax as Z, requireMerge as _, requireFilter as a, requireFlatMap as a0, requireMergeMap as a1, requireMergeMapTo as a2, requireMergeScan as a3, requireMergeWith as a4, requireMin as a5, requireMulticast as a6, requireObserveOn as a7, requireOnErrorResumeNextWith as a8, requirePairwise as a9, requireSwitchMapTo as aA, requireSwitchScan as aB, requireTake as aC, requireTakeLast as aD, requireTakeUntil as aE, requireTakeWhile as aF, requireTap as aG, requireThrottle as aH, requireThrottleTime as aI, requireThrowIfEmpty as aJ, requireTimeInterval as aK, requireTimeout as aL, requireTimeoutWith as aM, requireTimestamp as aN, requireToArray as aO, requireWindow as aP, requireWindowCount as aQ, requireWindowTime as aR, requireWindowToggle as aS, requireWindowWhen as aT, requireWithLatestFrom as aU, requireZip as aV, requireZipAll as aW, requireZipWith as aX, requirePluck as aa, requirePublish as ab, requirePublishBehavior as ac, requirePublishLast as ad, requirePublishReplay as ae, requireReduce as af, requireRepeat as ag, requireRepeatWhen as ah, requireRetry as ai, requireRetryWhen as aj, requireRefCount as ak, requireSample as al, requireSampleTime as am, requireScan as an, requireSequenceEqual as ao, requireShare as ap, requireShareReplay as aq, requireSingle as ar, requireSkip as as, requireSkipLast as at, requireSkipUntil as au, requireSkipWhile as av, requireStartWith as aw, requireSubscribeOn as ax, requireSwitchAll as ay, requireSwitchMap as az, requireArgsOrArgArray as b, cjsExports as c, requireRaceWith as d, requireAudit as e, requireAuditTime as f, requireBuffer as g, requireBufferCount as h, requireBufferTime as i, requireBufferToggle as j, requireBufferWhen as k, requireCatchError as l, requireCombineAll as m, requireCombineLatestAll as n, requireCombineLatest as o, requireCombineLatestWith as p, requireConcat as q, requireNot as r, requireConcatAll as s, requireConcatMap as t, requireConcatMapTo as u, requireConcatWith as v, requireConnect as w, requireCount as x, requireDebounce as y, requireDebounceTime as z };
//# sourceMappingURL=p-BynEaqQM.js.map

//# sourceMappingURL=p-BynEaqQM.js.map