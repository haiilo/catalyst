import { p as proxyCustomElement, H, d as createEvent, h } from './p-DJz_AlH8.js';
import { r as requireNot, a as requireFilter, b as requireArgsOrArgArray, d as requireRaceWith, e as requireAudit, f as requireAuditTime, g as requireBuffer, h as requireBufferCount, i as requireBufferTime, j as requireBufferToggle, k as requireBufferWhen, l as requireCatchError, m as requireCombineAll, n as requireCombineLatestAll, o as requireCombineLatest, p as requireCombineLatestWith, q as requireConcat, s as requireConcatAll, t as requireConcatMap, u as requireConcatMapTo, v as requireConcatWith, w as requireConnect, x as requireCount, y as requireDebounce, z as requireDebounceTime, A as requireDefaultIfEmpty, B as requireDelay, C as requireDelayWhen, D as requireDematerialize, E as requireDistinct, F as requireDistinctUntilChanged, G as requireDistinctUntilKeyChanged, H as requireElementAt, I as requireEndWith, J as requireEvery, K as requireExhaust, L as requireExhaustAll, M as requireExhaustMap, N as requireExpand, O as requireFinalize, P as requireFind, Q as requireFindIndex, R as requireFirst, S as requireGroupBy, T as requireIgnoreElements, U as requireIsEmpty, V as requireLast, W as requireMap, X as requireMapTo, Y as requireMaterialize, Z as requireMax, _ as requireMerge, $ as requireMergeAll, a0 as requireFlatMap, a1 as requireMergeMap, a2 as requireMergeMapTo, a3 as requireMergeScan, a4 as requireMergeWith, a5 as requireMin, a6 as requireMulticast, a7 as requireObserveOn, a8 as requireOnErrorResumeNextWith, a9 as requirePairwise, aa as requirePluck, ab as requirePublish, ac as requirePublishBehavior, ad as requirePublishLast, ae as requirePublishReplay, af as requireReduce, ag as requireRepeat, ah as requireRepeatWhen, ai as requireRetry, aj as requireRetryWhen, ak as requireRefCount, al as requireSample, am as requireSampleTime, an as requireScan, ao as requireSequenceEqual, ap as requireShare, aq as requireShareReplay, ar as requireSingle, as as requireSkip, at as requireSkipLast, au as requireSkipUntil, av as requireSkipWhile, aw as requireStartWith, ax as requireSubscribeOn, ay as requireSwitchAll, az as requireSwitchMap, aA as requireSwitchMapTo, aB as requireSwitchScan, aC as requireTake, aD as requireTakeLast, aE as requireTakeUntil, aF as requireTakeWhile, aG as requireTap, aH as requireThrottle, aI as requireThrottleTime, aJ as requireThrowIfEmpty, aK as requireTimeInterval, aL as requireTimeout, aM as requireTimeoutWith, aN as requireTimestamp, aO as requireToArray, aP as requireWindow, aQ as requireWindowCount, aR as requireWindowTime, aS as requireWindowToggle, aT as requireWindowWhen, aU as requireWithLatestFrom, aV as requireZip, aW as requireZipAll, aX as requireZipWith, c as cjsExports } from './p-BynEaqQM.js';

var operators = {};

var partition = {};

var hasRequiredPartition;

function requirePartition () {
	if (hasRequiredPartition) return partition;
	hasRequiredPartition = 1;
	Object.defineProperty(partition, "__esModule", { value: true });
	partition.partition = void 0;
	var not_1 = requireNot();
	var filter_1 = requireFilter();
	function partition$1(predicate, thisArg) {
	    return function (source) {
	        return [filter_1.filter(predicate, thisArg)(source), filter_1.filter(not_1.not(predicate, thisArg))(source)];
	    };
	}
	partition.partition = partition$1;
	
	return partition;
}

var race = {};

var hasRequiredRace;

function requireRace () {
	if (hasRequiredRace) return race;
	hasRequiredRace = 1;
	var __read = (race && race.__read) || function (o, n) {
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
	var __spreadArray = (race && race.__spreadArray) || function (to, from) {
	    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
	        to[j] = from[i];
	    return to;
	};
	Object.defineProperty(race, "__esModule", { value: true });
	race.race = void 0;
	var argsOrArgArray_1 = requireArgsOrArgArray();
	var raceWith_1 = requireRaceWith();
	function race$1() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    return raceWith_1.raceWith.apply(void 0, __spreadArray([], __read(argsOrArgArray_1.argsOrArgArray(args))));
	}
	race.race = race$1;
	
	return race;
}

var hasRequiredOperators;

function requireOperators () {
	if (hasRequiredOperators) return operators;
	hasRequiredOperators = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.mergeAll = exports.merge = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.concat = exports.combineLatestWith = exports.combineLatest = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = void 0;
		exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.race = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.partition = exports.pairwise = exports.onErrorResumeNext = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = void 0;
		exports.zipWith = exports.zipAll = exports.zip = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = void 0;
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
		var combineLatest_1 = requireCombineLatest();
		Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function () { return combineLatest_1.combineLatest; } });
		var combineLatestWith_1 = requireCombineLatestWith();
		Object.defineProperty(exports, "combineLatestWith", { enumerable: true, get: function () { return combineLatestWith_1.combineLatestWith; } });
		var concat_1 = requireConcat();
		Object.defineProperty(exports, "concat", { enumerable: true, get: function () { return concat_1.concat; } });
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
		var merge_1 = requireMerge();
		Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return merge_1.merge; } });
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
		Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function () { return onErrorResumeNextWith_1.onErrorResumeNext; } });
		var pairwise_1 = requirePairwise();
		Object.defineProperty(exports, "pairwise", { enumerable: true, get: function () { return pairwise_1.pairwise; } });
		var partition_1 = requirePartition();
		Object.defineProperty(exports, "partition", { enumerable: true, get: function () { return partition_1.partition; } });
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
		var race_1 = requireRace();
		Object.defineProperty(exports, "race", { enumerable: true, get: function () { return race_1.race; } });
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
		var timeout_1 = requireTimeout();
		Object.defineProperty(exports, "timeout", { enumerable: true, get: function () { return timeout_1.timeout; } });
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
		var zip_1 = requireZip();
		Object.defineProperty(exports, "zip", { enumerable: true, get: function () { return zip_1.zip; } });
		var zipAll_1 = requireZipAll();
		Object.defineProperty(exports, "zipAll", { enumerable: true, get: function () { return zipAll_1.zipAll; } });
		var zipWith_1 = requireZipWith();
		Object.defineProperty(exports, "zipWith", { enumerable: true, get: function () { return zipWith_1.zipWith; } });
		
	} (operators));
	return operators;
}

var operatorsExports = /*@__PURE__*/ requireOperators();

const catScrollableCss = ":host{overflow:hidden;position:relative;display:flex}:host([hidden]){display:none}.shadow-bottom,.shadow-right,.shadow-left,.shadow-top{position:absolute;transition:box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)}.shadow-top{z-index:2;width:100%;top:0}.shadow-left{z-index:4;height:100%;left:0}.shadow-right{z-index:4;height:100%;right:0}.shadow-bottom{z-index:2;width:100%;bottom:0}.scrollable-wrapper{position:absolute;inset:0;pointer-events:none}.scrollable-wrapper.cat-scrollable-top .shadow-top,.scrollable-wrapper.cat-scrollable-bottom .shadow-bottom,.scrollable-wrapper.cat-scrollable-left .shadow-left,.scrollable-wrapper.cat-scrollable-right .shadow-right{box-shadow:0 0 4px 1px rgba(16, 29, 48, 0.2)}.scrollable-content{width:100%;overflow:hidden}.scrollable-content.scroll-x{overflow-x:auto}.scrollable-content.scroll-y{overflow-y:auto}.scrollable-content.no-overscroll{overscroll-behavior:contain}";

const CatScrollable = /*@__PURE__*/ proxyCustomElement(class CatScrollable extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.scrolledTop = createEvent(this, "scrolledTop");
        this.scrolledLeft = createEvent(this, "scrolledLeft");
        this.scrolledRight = createEvent(this, "scrolledRight");
        this.scrolledBottom = createEvent(this, "scrolledBottom");
        this.init = new cjsExports.Subject();
        this.destroyed = new cjsExports.Subject();
        this.resizedEntries = new cjsExports.Subject();
        this.resizedObserver = new ResizeObserver(entries => this.resizedEntries.next(entries));
        /** Flags to disable/enable scroll shadowX. */
        this.noShadowX = false;
        /** Flags to disable/enable scroll shadowY. */
        this.noShadowY = false;
        /** Flags to disable/enable overflowX. */
        this.noOverflowX = false;
        /** Flags to disable/enable overflowY. */
        this.noOverflowY = false;
        /** Flag to disable/enable overscroll behavior. */
        this.noOverscroll = false;
        /**
         * Flag to not fire an initial event after content initialization.
         */
        this.noScrolledInit = false;
        /**
         * Buffer to be used to calculate the scroll distance.
         */
        this.scrolledBuffer = 0;
    }
    componentDidRender() {
        if (this.scrollElement) {
            this.scrolled = cjsExports.fromEvent(this.scrollElement, 'scroll').pipe(operatorsExports.takeUntil(this.destroyed));
            this.resizedObserver.observe(this.scrollElement);
        }
        if (this.scrollWrapperElement) {
            this.resizedObserver.observe(this.scrollWrapperElement);
        }
        this.attachEmitter('left', this.scrolledLeft);
        this.attachEmitter('right', this.scrolledRight);
        this.attachEmitter('bottom', this.scrolledBottom);
        this.attachEmitter('top', this.scrolledTop);
        cjsExports.merge(this.init, this.scrolled, this.resizedEntries)
            .pipe(operatorsExports.auditTime(CatScrollable.THROTTLE), operatorsExports.map(() => ({
            // 5px used to avoid shadow bug on Windows
            top: this.getScrollOffset('top') > 5,
            left: this.getScrollOffset('left') > 5,
            right: this.getScrollOffset('right') > 5,
            bottom: this.getScrollOffset('bottom') > 5
        })), operatorsExports.takeUntil(this.destroyed))
            .subscribe(({ top, left, right, bottom }) => {
            this.toggleClass('cat-scrollable-top', top);
            this.toggleClass('cat-scrollable-left', left);
            this.toggleClass('cat-scrollable-right', right);
            this.toggleClass('cat-scrollable-bottom', bottom);
        });
    }
    componentDidLoad() {
        if (!this.noScrolledInit) {
            this.init.next();
        }
    }
    disconnectedCallback() {
        this.init.complete();
        this.destroyed.next();
        this.destroyed.complete();
        this.resizedObserver.disconnect();
    }
    render() {
        return [
            h("div", { key: '8153419d11ba30f6360acb82b87ac62727248599', class: "scrollable-wrapper", ref: el => (this.scrollWrapperElement = el) }, !this.noShadowY && h("div", { key: '3374f51499e735a692ccd8e0f9bea23c0132b47d', class: "shadow-top" }), !this.noShadowX && h("div", { key: 'd208685280ae658baf5672003141ab9349d0feef', class: "shadow-left" }), !this.noShadowX && h("div", { key: '0404d0cd8afbaac6ac9d89947ce9fbd91c7929f6', class: "shadow-right" }), !this.noShadowY && h("div", { key: '539c15c633403f03e4fc36c1fb1d86e498c8d9cc', class: "shadow-bottom" })),
            h("div", { key: '0ea3a47900df0689a73a5c440a8774ca04edf4ad', ref: el => (this.scrollElement = el), class: {
                    'scrollable-content': true,
                    'scroll-x': !this.noOverflowX,
                    'scroll-y': !this.noOverflowY,
                    'no-overscroll': this.noOverscroll
                } }, h("slot", { key: '9c10382fc5f4773242738be4070af6bd5ce2e2d3' }))
        ];
    }
    attachEmitter(from, emitter) {
        cjsExports.merge(this.init, this.scrolled, this.resizedEntries)
            .pipe(operatorsExports.auditTime(CatScrollable.THROTTLE), operatorsExports.map(() => this.getScrollOffset(from)), operatorsExports.map(offset => offset <= this.scrolledBuffer), operatorsExports.filter(isLower => isLower), operatorsExports.map(() => {
            switch (from) {
                case 'top':
                    return this.getScrollOffset('bottom');
                case 'left':
                    return this.getScrollOffset('right');
                case 'right':
                    return this.getScrollOffset('left');
                case 'bottom':
                    return this.getScrollOffset('top');
            }
        }), operatorsExports.distinctUntilChanged(), operatorsExports.takeUntil(this.destroyed))
            .subscribe(() => emitter.emit());
    }
    getScrollOffset(from) {
        if (this.scrollElement) {
            switch (from) {
                case 'top':
                    return this.scrollElement.scrollTop;
                case 'left':
                    return this.scrollElement.scrollLeft;
                case 'right':
                    return this.scrollElement.scrollWidth - this.scrollElement.clientWidth - this.scrollElement.scrollLeft;
                case 'bottom':
                    return this.scrollElement.scrollHeight - this.scrollElement.clientHeight - this.scrollElement.scrollTop;
                default:
                    return 0;
            }
        }
        return 0;
    }
    toggleClass(name, value) {
        if (value) {
            this.scrollWrapperElement?.classList.add(name);
        }
        else {
            this.scrollWrapperElement?.classList.remove(name);
        }
    }
    static get style() { return catScrollableCss; }
}, [1, "cat-scrollable", {
        "noShadowX": [4, "no-shadow-x"],
        "noShadowY": [4, "no-shadow-y"],
        "noOverflowX": [4, "no-overflow-x"],
        "noOverflowY": [4, "no-overflow-y"],
        "noOverscroll": [4, "no-overscroll"],
        "noScrolledInit": [4, "no-scrolled-init"],
        "scrolledBuffer": [2, "scrolled-buffer"]
    }]);
CatScrollable.THROTTLE = 50;
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-scrollable"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-scrollable":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatScrollable);
            }
            break;
    } });
}

export { CatScrollable as C, defineCustomElement as d };
//# sourceMappingURL=p-C-DR0IvP.js.map

//# sourceMappingURL=p-C-DR0IvP.js.map