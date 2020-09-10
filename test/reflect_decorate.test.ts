// deno-lint-ignore-file
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
// Reflect.decorate ( decorators, target [, propertyKey [, descriptor] ] )

import "../Reflect.ts";
import { assertEquals, assertStrictEquals } from "../deps_dev.ts";

Deno.test({
  name:
    "[Reflect.decorate] ExecutesDecoratorsInReverseOrderForFunctionOverload",
  fn(): void {
    let order: number[] = [];
    let decorators = [
      (target: Function): void => {
        order.push(0);
      },
      (target: Function): void => {
        order.push(1);
      },
    ];
    let target = function () {};
    Reflect.decorate(decorators, target);
    assertEquals(order, [1, 0]);
  },
});

Deno.test({
  name:
    "[Reflect.decorate] ExecutesDecoratorsInReverseOrderForPropertyOverload",
  fn(): void {
    let order: number[] = [];
    let decorators = [
      (target: Object, name: string | symbol): void => {
        order.push(0);
      },
      (target: Object, name: string | symbol): void => {
        order.push(1);
      },
    ];
    let target = {};
    let name = "name";
    Reflect.decorate(decorators, target, name, undefined);
    assertEquals(order, [1, 0]);
  },
});

Deno.test({
  name:
    "[Reflect.decorate] ExecutesDecoratorsInReverseOrderForPropertyDescriptorOverload",
  fn(): void {
    let order: number[] = [];
    let decorators = [
      (target: Object, name: string | symbol): void => {
        order.push(0);
      },
      (target: Object, name: string | symbol): void => {
        order.push(1);
      },
    ];
    let target = {};
    let name = "name";
    let descriptor = {};
    Reflect.decorate(decorators, target, name, descriptor);
    assertEquals(order, [1, 0]);
  },
});

Deno.test({
  name: "[Reflect.decorate] DecoratorPipelineForFunctionOverload",
  fn(): void {
    let A = function A(): void {};
    let B = function B(): void {};
    let decorators = [
      (target: Function): any => {
        return undefined;
      },
      (target: Function): any => {
        return A;
      },
      (target: Function): any => {
        return B;
      },
    ];
    let target = function (): void {};
    let result = Reflect.decorate(decorators, target);
    assertStrictEquals(result, A);
  },
});

Deno.test({
  name: "[Reflect.decorate] DecoratorPipelineForPropertyOverload",
  fn(): void {
    let A = {};
    let B = {};
    let decorators = [
      (target: Object, name: string | symbol): any => {
        return undefined;
      },
      (target: Object, name: string | symbol): any => {
        return A;
      },
      (target: Object, name: string | symbol): any => {
        return B;
      },
    ];
    let target = {};
    let result = Reflect.decorate(decorators, target, "name", undefined);
    assertStrictEquals(result, A);
  },
});

Deno.test({
  name: "[Reflect.decorate] DecoratorPipelineForPropertyDescriptorOverload",
  fn(): void {
    let A = {};
    let B = {};
    let C = {};
    let decorators = [
      (target: Object, name: string | symbol): any => {
        return undefined;
      },
      (target: Object, name: string | symbol): any => {
        return A;
      },
      (target: Object, name: string | symbol): any => {
        return B;
      },
    ];
    let target = {};
    let result = Reflect.decorate(decorators, target, "name", C);
    assertStrictEquals(result, A);
  },
});

Deno.test({
  name:
    "[Reflect.decorate] DecoratorCorrectTargetInPipelineForFunctionOverload",
  fn(): void {
    let sent: Function[] = [];
    let A = function A(): void {};
    let B = function B(): void {};
    let decorators = [
      (target: Function): any => {
        sent.push(target);
        return undefined;
      },
      (target: Function): any => {
        sent.push(target);
        return undefined;
      },
      (target: Function): any => {
        sent.push(target);
        return A;
      },
      (target: Function): any => {
        sent.push(target);
        return B;
      },
    ];
    let target = function (): void {};
    Reflect.decorate(decorators, target);
    assertEquals(sent, [target, B, A, A]);
  },
});

Deno.test({
  name:
    "[Reflect.decorate] DecoratorCorrectTargetInPipelineForPropertyOverload",
  fn(): void {
    let sent: Object[] = [];
    let decorators = [
      (target: Object, name: string | symbol): any => {
        sent.push(target);
      },
      (target: Object, name: string | symbol): any => {
        sent.push(target);
      },
      (target: Object, name: string | symbol): any => {
        sent.push(target);
      },
      (target: Object, name: string | symbol): any => {
        sent.push(target);
      },
    ];
    let target = {};
    Reflect.decorate(decorators, target, "name");
    assertEquals(sent, [target, target, target, target]);
  },
});

Deno.test({
  name: "[Reflect.decorate] DecoratorCorrectNameInPipelineForPropertyOverload",
  fn(): void {
    let sent: (symbol | string)[] = [];
    let decorators = [
      (target: Object, name: string | symbol): any => {
        sent.push(name);
      },
      (target: Object, name: string | symbol): any => {
        sent.push(name);
      },
      (target: Object, name: string | symbol): any => {
        sent.push(name);
      },
      (target: Object, name: string | symbol): any => {
        sent.push(name);
      },
    ];
    let target = {};
    Reflect.decorate(decorators, target, "name");
    assertEquals(sent, ["name", "name", "name", "name"]);
  },
});

Deno.test({
  name:
    "[Reflect.decorate] DecoratorCorrectTargetInPipelineForPropertyDescriptorOverload",
  fn(): void {
    let sent: Object[] = [];
    let A = {};
    let B = {};
    let C = {};
    let decorators = [
      (target: Object, name: string | symbol): any => {
        sent.push(target);
        return undefined;
      },
      (target: Object, name: string | symbol): any => {
        sent.push(target);
        return undefined;
      },
      (target: Object, name: string | symbol): any => {
        sent.push(target);
        return A;
      },
      (target: Object, name: string | symbol): any => {
        sent.push(target);
        return B;
      },
    ];
    let target = {};
    Reflect.decorate(decorators, target, "name", C);
    assertEquals(sent, [target, target, target, target]);
  },
});

Deno.test({
  name:
    "[Reflect.decorate] DecoratorCorrectNameInPipelineForPropertyDescriptorOverload",
  fn(): void {
    let sent: (symbol | string)[] = [];
    let A = {};
    let B = {};
    let C = {};
    let decorators = [
      (target: Object, name: string | symbol): any => {
        sent.push(name);
        return undefined;
      },
      (target: Object, name: string | symbol): any => {
        sent.push(name);
        return undefined;
      },
      (target: Object, name: string | symbol): any => {
        sent.push(name);
        return A;
      },
      (target: Object, name: string | symbol): any => {
        sent.push(name);
        return B;
      },
    ];
    let target = {};
    Reflect.decorate(decorators, target, "name", C);
    assertEquals(sent, ["name", "name", "name", "name"]);
  },
});

Deno.test({
  name:
    "[Reflect.decorate] DecoratorCorrectDescriptorInPipelineForPropertyDescriptorOverload",
  fn(): void {
    let sent: PropertyDescriptor[] = [];
    let A = {};
    let B = {};
    let C = {};
    let decorators = [
      (
        target: Object,
        name: string | symbol,
        descriptor: PropertyDescriptor,
      ): any => {
        sent.push(descriptor);
        return undefined;
      },
      (
        target: Object,
        name: string | symbol,
        descriptor: PropertyDescriptor,
      ): any => {
        sent.push(descriptor);
        return undefined;
      },
      (
        target: Object,
        name: string | symbol,
        descriptor: PropertyDescriptor,
      ): any => {
        sent.push(descriptor);
        return A;
      },
      (
        target: Object,
        name: string | symbol,
        descriptor: PropertyDescriptor,
      ): any => {
        sent.push(descriptor);
        return B;
      },
    ];
    let target = {};
    Reflect.decorate(decorators, target, "name", C);
    assertEquals(sent, [C, B, A, A]);
  },
});
