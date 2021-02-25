/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactUpdates
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant'),
    _assign = require('object-assign');

var CallbackQueue = require('./CallbackQueue');
var PooledClass = require('./PooledClass');
var ReactFeatureFlags = require('./ReactFeatureFlags');
var ReactReconciler = require('./ReactReconciler');
var Transaction = require('./Transaction');

var invariant = require('fbjs/lib/invariant');

var dirtyComponents = [];
var updateBatchNumber = 0;
var asapCallbackQueue = CallbackQueue.getPooled();
var asapEnqueued = false;

var batchingStrategy = null;

function ensureInjected() {
  !(ReactUpdates.ReactReconcileTransaction && batchingStrategy) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must inject a reconcile transaction class and batching strategy') : _prodInvariant('123') : void 0;
}

// 标记事务开始时候的 dirtyComponents 并在结束时候对其进行更新，并从中删除更新的 dirtyComponents 元素
// 嵌套更新
var NESTED_UPDATES = {
  initialize: function () {
    this.dirtyComponentsLength = dirtyComponents.length;
  },
  close: function () {
    if (this.dirtyComponentsLength !== dirtyComponents.length) {
      // 额外的更新由 componentDidUpdate 处理程序或类似程序排队；
      // 在我们自己的 UPDATE_QUEUEING 包装器关闭之前，我们要运行这些新更新，
      // 以便如果A的 componentDidUpdate 在B上调用setState，则B将在调用setState时提供的回调A的更新程序之前更新。
      // 清空 dirtyComponents
      console.log(444)
      dirtyComponents.splice(0, this.dirtyComponentsLength);
      // 取出所有的脏组件队列进行 diff，最后更新到 DOM, but为啥注释掉后依然可以更新dom？
      // 因为是在 ReactDefaultBatchingStrategy 中进行了调用
      flushBatchedUpdates();
    } else {
      console.log(555, 'dirtyComponents.length = 0')
      // 在这里进行了dom的更新。。。。why？？？？
      dirtyComponents.length = 0;
    }
  }
};
// 更新队列
var UPDATE_QUEUEING = {
  initialize: function () {
    this.callbackQueue.reset();
  },
  // 修改更新状态，表示更新已经结束
  close: function () {
    this.callbackQueue.notifyAll();
  }
};

var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];

function ReactUpdatesFlushTransaction() {
  this.reinitializeTransaction();
  this.dirtyComponentsLength = null;
  this.callbackQueue = CallbackQueue.getPooled();
  this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled(
  /* useCreateElement */true);
}

_assign(ReactUpdatesFlushTransaction.prototype, Transaction.Mixin, {
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS;
  },

  destructor: function () {
    this.dirtyComponentsLength = null;
    CallbackQueue.release(this.callbackQueue);
    this.callbackQueue = null;
    ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
    this.reconcileTransaction = null;
  },

  perform: function (method, scope, a) {
    // 本质上使用带有该事务的包装器调用“ this.reconcileTransaction.perform（method，scope，a）”。
    return Transaction.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
  }
});

PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);

function batchedUpdates(callback, a, b, c, d, e) {
  ensureInjected();
  batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
}

/**
 * Array comparator for ReactComponents by mount ordering.
 *
 * @param {ReactComponent} c1 first component you're comparing
 * @param {ReactComponent} c2 second component you're comparing
 * @return {number} Return value usable by Array.prototype.sort().
 */
function mountOrderComparator(c1, c2) {
  return c1._mountOrder - c2._mountOrder;
}

function runBatchedUpdates(transaction) {
  var len = transaction.dirtyComponentsLength;
  !(len === dirtyComponents.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected flush transaction\'s stored dirty-components length (%s) to match dirty-components array length (%s).', len, dirtyComponents.length) : _prodInvariant('124', len, dirtyComponents.length) : void 0;

  // 对组件调用的优先级进行排序，让父组件在前面，确保在子组件（children）之前调用他们
  dirtyComponents.sort(mountOrderComparator);

  // 在 reconciling 期间排队的所有更新都必须在整个批次之后执行。目前唯一可知的方法就是通过检查批处理计数器
  
  // 否则，如果脏组件数组（dirtyComponents）是[A, B]，A的children有B和C,
  // B组件将会在一个更新批次中更新两次。
  // 如果C的渲染使B进入更新队列（既然B已经更新了，我们应该跳过它）
  updateBatchNumber++;

  for (var i = 0; i < len; i++) {
    // 如果在挂起更改之前卸载了组件，则该组件仍将保留在此处，
    // 但是我们假定它已清除其_pendingCallbacks且performUpdateIfNecessary是noop
    var component = dirtyComponents[i];

    // 如果performUpdateIfNecessary碰巧加入了任何新更新，则在下一次渲染发生之前我们不应该执行回调，因此请先隐藏回调
    var callbacks = component._pendingCallbacks;
    component._pendingCallbacks = null;

    var markerName;
    if (ReactFeatureFlags.logTopLevelRenders) {
      var namedComponent = component;
      // Duck type TopLevelWrapper. This is probably always true.
      if (component._currentElement.props === component._renderedComponent._currentElement) {
        namedComponent = component._renderedComponent;
      }
      markerName = 'React update: ' + namedComponent.getName();
      console.time(markerName);
    }
    // 判断组件是否需要更新，然后进行 diff 操作，最后更新 DOM
    // Virtual DOM 层
    // Reconciler 层
    // Renderer 层
    ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction, updateBatchNumber);

    if (markerName) {
      console.timeEnd(markerName);
    }

    if (callbacks) {
      for (var j = 0; j < callbacks.length; j++) {
        transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
      }
    }
  }
}

// flushBatchedUpdates 里面会取出所有的脏组件队列进行 diff，最后更新到 DOM
var flushBatchedUpdates = function () {
  // ReactUpdatesFlushTransaction 的包装器将清除dirtyComponents
  // 数组并执行安装就绪处理程序（即componentDidUpdate）排队的所有更新，
  // 但我们也需要在此处进行检查，以捕获由setState回调和asap调用排队的更新。
  while (dirtyComponents.length || asapEnqueued) {
    if (dirtyComponents.length) {
      console.log('flushBatchedUpdates...')
      var transaction = ReactUpdatesFlushTransaction.getPooled();
      transaction.perform(runBatchedUpdates, null, transaction);
      ReactUpdatesFlushTransaction.release(transaction);
    }

    if (asapEnqueued) {
      asapEnqueued = false;
      var queue = asapCallbackQueue;
      asapCallbackQueue = CallbackQueue.getPooled();
      queue.notifyAll();
      CallbackQueue.release(queue);
    }
  }
};

/**
 * Mark a component as needing a rerender, adding an optional callback to a
 * list of functions which will be executed once the rerender occurs.
 */
function enqueueUpdate(component) {
  console.log('执行了...')
  ensureInjected();
  // 判断当前是否在更新流程，如果不在更新流程，则调用batchingStrategy.batchedUpdates 进行更新
  if (!batchingStrategy.isBatchingUpdates) {
    
    // batchingStrategy 是 React 进行批处理的一种策略，该策略的实现基于 Transaction，虽然名字和数据库的事务一样，但是做的事情却不一样。
    // 如果是在react合成事件或者生命周期中，batchedUpdates会在ReactEventListener.js中被优先调用，以便将isBatchingUpdates设置为true
    // 但是如果不在react管理中，也是会走到这一步 batchedUpdates，为什么却能实现setstate的同步操作？？？？
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
  // 如果在更新流程中，则将待更新组件放入dirtyComponents缓存起来，表示组件待更新

  // You may ask, so when will that component be updated?
  // Recall that we are already inside a batching update now,
  // so when we finish the main job(render), it will call flushBatchedUpdates() at close time.
  // 到这同步的链就断了（article 流程图），浏览器断点 debugger ps:time too long ===> 待render后才会xxxxx,it will call ReactDefaultBatchingStrategy.flushBatchedUpdates() at close time.
  dirtyComponents.push(component);
  if (component._updateBatchNumber == null) {
    console.log(222)
    component._updateBatchNumber = updateBatchNumber + 1;
  }
}

/**
 * Enqueue a callback to be run at the end of the current batching cycle. Throws
 * if no updates are currently being performed.
 */
function asap(callback, context) {
  !batchingStrategy.isBatchingUpdates ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context whereupdates are not being batched.') : _prodInvariant('125') : void 0;
  asapCallbackQueue.enqueue(callback, context);
  asapEnqueued = true;
}

var ReactUpdatesInjection = {
  injectReconcileTransaction: function (ReconcileTransaction) {
    !ReconcileTransaction ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a reconcile transaction class') : _prodInvariant('126') : void 0;
    ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
  },

  injectBatchingStrategy: function (_batchingStrategy) {
    !_batchingStrategy ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a batching strategy') : _prodInvariant('127') : void 0;
    !(typeof _batchingStrategy.batchedUpdates === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a batchedUpdates() function') : _prodInvariant('128') : void 0;
    !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : _prodInvariant('129') : void 0;
    batchingStrategy = _batchingStrategy;
  }
};

var ReactUpdates = {
  /**
   * React references `ReactReconcileTransaction` using this property in order
   * to allow dependency injection.
   *
   * @internal
   */
  ReactReconcileTransaction: null,

  batchedUpdates: batchedUpdates,
  enqueueUpdate: enqueueUpdate,
  flushBatchedUpdates: flushBatchedUpdates,
  injection: ReactUpdatesInjection,
  asap: asap
};

module.exports = ReactUpdates;