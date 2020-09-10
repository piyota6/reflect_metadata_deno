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
// 4.1.2 Reflect.metadata ( metadataKey, metadataValue )
// https://rbuckton.github.io/reflect-metadata/#reflect.metadata

import "../Reflect.ts";
import { assertEquals, assertThrows } from "../deps_dev.ts";

Deno.test({
  name: "[Reflect.metadata] ReturnsDecoratorFunction",
  fn(): void {
    let result = Reflect.metadata("key", "value");
    assertEquals(typeof result, "function");
  },
});

Deno.test({
  name: "[Reflect.metadata] DecoratorThrowsWithInvalidTargetWithTargetKey",
  fn(): void {
    let decorator = Reflect.metadata("key", "value");
    assertThrows(() => decorator(undefined, "name"), TypeError);
  },
});

Deno.test({
  name: "[Reflect.metadata] DecoratorThrowsWithInvalidTargetKey",
  fn(): void {
    let decorator = Reflect.metadata("key", "value");
    assertThrows(() => decorator({}, <any> {}), TypeError);
  },
});

Deno.test({
  name: "[Reflect.metadata] OnTargetWithoutTargetKey",
  fn(): void {
    let decorator = Reflect.metadata("key", "value");
    let target = function () {};
    decorator(target);

    let result = Reflect.hasOwnMetadata("key", target);
    assertEquals(result, true);
  },
});

Deno.test({
  name: "[Reflect.metadata] OnTargetWithTargetKey",
  fn(): void {
    let decorator = Reflect.metadata("key", "value");
    let target = {};
    decorator(target, "name");

    let result = Reflect.hasOwnMetadata("key", target, "name");
    assertEquals(result, true);
  },
});
