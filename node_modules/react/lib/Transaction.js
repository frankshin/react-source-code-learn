/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Transaction
 */




'use strict';
var _prodInvariant = require('./reactProdInvariant');
var invariant = require('fbjs/lib/invariant');
/**
 * 
 Transaction 创建一个可以包裹任意方法的黑盒环境，以实现在调用这些方法的前后，保留一些不变量特性（即使在调用包装方法时抛出了错误或者异常）。任何使用 transaction 实例的人，都可以在创建时，提供不变量特性的执行方法。Transaction 类本身会提供一个额外的自动不变量 —— 不会运行已经在运行中的事务实例。你通常需要创建一个可以复用多次的单独的transaction实例，该实例只需实现两个方法（initialize和close）
 * <pre>
 *                       wrappers (在创建时注入)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 *
 * (react中的)使用场景:
 * - 在 reconciliation 的之前和之后，保持input输入选择的范围（即使过程中发生错误，也保持选择）
 * - 在重新排列dom时，停止事件，以防止失焦/聚焦。（然后保证事件系统重新激活）
 * - 在工作线程中进行协调后，将收集的DOM突变队列刷新到主UI线程。
 * - 在渲染了新的内容后，调用所有收集到的 componentDidUpdate 回调函数
 * - (未来特性): 包装ReactWorker队列的特定刷新。保留“ scrollTop”（自动滚动识别DOM）。
 * - (未来特性): DOM更新前后的布局计算。
 *
 * 事务性插件api：
 * - 一个具有“ initialize”方法的模块，该方法返回任何预计算。以及一个接收预计算的close方法。close方法在包装进程完成或者执行失败后调用。
 *
 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
 * that implement `initialize` and `close`.
 * @return {Transaction} Single transaction for reuse in thread.
 *
 * @class Transaction
 */
var Mixin = {
  /**
   * 设置此实例，以便为收集指标做好准备。这样做是为了可以在已经初始化的实例上使用此设置方法, 这样就不会在重用时消耗额外的内存。
   * 如果您决定将此混合的子类设为“ PooledClass”，则可能会很有用。
   */
  reinitializeTransaction: function () {
    this.transactionWrappers = this.getTransactionWrappers();
    if (this.wrapperInitData) {
      this.wrapperInitData.length = 0;
    } else {
      this.wrapperInitData = [];
    }
    this._isInTransaction = false;
  },

  _isInTransaction: false,

  /**
   * @abstract
   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
   */
  getTransactionWrappers: null,

  isInTransaction: function () {
    return !!this._isInTransaction;
  },

  /**
   * 在安全窗口内执行功能。 将其用于顶层方法，这些方法会导致大量计算/更改，因此需要进行安全检查。 在许多情况下，可选参数有助于避免需要绑定。
   * @param {function} method Member of scope to call.
   * @param {Object} scope Scope to invoke from.
   * @param {Object?=} a Argument to pass to the method.
   * @param {Object?=} b Argument to pass to the method.
   * @param {Object?=} c Argument to pass to the method.
   * @param {Object?=} d Argument to pass to the method.
   * @param {Object?=} e Argument to pass to the method.
   * @param {Object?=} f Argument to pass to the method.
   *
   * @return {*} Return value from `method`.
   */
  perform: function (method, scope, a, b, c, d, e, f) {
    !!this.isInTransaction()
      ? process.env.NODE_ENV !== 'production'
        ? invariant(false, 'Transaction.perform(...): Cannot initialize a transaction when there is already an outstanding transaction.') : _prodInvariant('27') : void 0;
    var errorThrown;
    var ret;
    try {
      this._isInTransaction = true;
      // 如果捕获错误会让调试比较困难，所以我们设置了一个变量errorThrown，开始将其设置为true，
      // 在调用完method.call后再设置为false ——— 如果最后其值在finally中依然是true，就说明
      // 在method.call过程中发生了错误或异常
      errorThrown = true;
      this.initializeAll(0);
      // ret 用于记录目标函数执行之后的返回值
      ret = method.call(scope, a, b, c, d, e, f);
      errorThrown = false;
    } finally {
      try {
        if (errorThrown) {
          // 如果methd抛出错误，则更偏向于通过调用`closeAll`来显示堆栈跟踪。
          try {
            this.closeAll(0);
          } catch (err) {}
        } else {
          // Since `method` didn't throw, we don't want to silence the exception here.
          this.closeAll(0);
        }
      } finally {
        this._isInTransaction = false;
      }
    }
    return ret;
  },

  // 用于调用所有绑定的wrapper的initialize方法的（按照wrapper数组的顺序）
  initializeAll: function (startIndex) {
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      try {
        // ps：此处错误处理逻辑同上
        // Catching errors makes debugging more difficult, so we start with the
        // OBSERVED_ERROR state before overwriting it with the real return value
        // of initialize -- if it's still set to OBSERVED_ERROR in the finally
        // block, it means wrapper.initialize threw.
        // wrapperInitData：记录各个 initialize 调用的返回值
        this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
        this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
      } finally {
        if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
          // 包装器的初始化程序我抛出了一个错误； 初始化其余包装器，但使它们中的任何异常保持沉默，以确保第一个错误是冒泡的错误。
          try {
            this.initializeAll(i + 1);
          } catch (err) {}
        }
      }
    }
  },

  /**
   调用每个`this.transactionWrappers.close [i]`函数，并向其传递`this.transactionWrappers.init [i]`的各自返回值（与失败的初始化程序对应的`close`rs不会被调用）。
   */
  closeAll: function (startIndex) {
    !this.isInTransaction()
      ? process.env.NODE_ENV !== 'production'
        ? invariant(false, 'Transaction.closeAll(): Cannot close transaction when none are open.') : _prodInvariant('28') : void 0;
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      var initData = this.wrapperInitData[i];
      var errorThrown;
      try {
        // ps：此处错误处理逻辑同上
        // Catching errors makes debugging more difficult, so we start with
        // errorThrown set to true before setting it to false after calling
        // close -- if it's still set to true in the finally block, it means
        // wrapper.close threw.
        errorThrown = true;

        if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
          wrapper.close.call(this, initData);
        }
        errorThrown = false;
      } finally {
        if (errorThrown) {
          // The closer for wrapper i threw an error; close the remaining
          // wrappers but silence any exceptions from them to ensure that the
          // first error is the one to bubble up.
          try {
            this.closeAll(i + 1);
          } catch (e) {}
        }
      }
    }
    this.wrapperInitData.length = 0;
  }
};

var Transaction = {
  Mixin: Mixin,
  // Token to look for to determine if an error occurred.
  OBSERVED_ERROR: {}
};

module.exports = Transaction;