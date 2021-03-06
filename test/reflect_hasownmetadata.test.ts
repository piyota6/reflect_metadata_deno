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
// 4.1.5 Reflect.hasOwnMetadata ( metadataKey, target [, propertyKey] )
// https://rbuckton.github.io/reflect-metadata/#reflect.hasownmetadata

import "../Reflect.ts";
import { assertEquals, assertThrows } from "../deps_dev.ts";

Deno.test({
  name: "[Reflect.hasOwnMetadata] InvalidTarget",
  fn(): void {
    assertThrows(
      () => Reflect.hasOwnMetadata("key", undefined),
      TypeError,
    );
  },
});

Deno.test({
  name: "[Reflect.hasOwnMetadata] WithoutTargetKeyWhenNotDefined",
  fn(): void {
    let obj = {};
    let result = Reflect.hasOwnMetadata("key", obj);
    assertEquals(result, false);
  },
});

Deno.test({
  name: "[Reflect.hasOwnMetadata] WithoutTargetKeyWhenDefined",
  fn(): void {
    let obj = {};
    Reflect.defineMetadata("key", "value", obj);
    let result = Reflect.hasOwnMetadata("key", obj);
    assertEquals(result, true);
  },
});

Deno.test({
  name: "[Reflect.hasOwnMetadata] WithoutTargetKeyWhenDefinedOnPrototype",
  fn(): void {
    let prototype = {};
    let obj = Object.create(prototype);
    Reflect.defineMetadata("key", "value", prototype);
    let result = Reflect.hasOwnMetadata("key", obj);
    assertEquals(result, false);
  },
});

Deno.test({
  name: "[Reflect.hasOwnMetadata] WithTargetKeyWhenNotDefined",
  fn(): void {
    let obj = {};
    let result = Reflect.hasOwnMetadata("key", obj, "name");
    assertEquals(result, false);
  },
});

Deno.test({
  name: "[Reflect.hasOwnMetadata] WithTargetKeyWhenDefined",
  fn(): void {
    let obj = {};
    Reflect.defineMetadata("key", "value", obj, "name");
    let result = Reflect.hasOwnMetadata("key", obj, "name");
    assertEquals(result, true);
  },
});

Deno.test({
  name: "[Reflect.hasOwnMetadata] WithTargetKeyWhenDefinedOnPrototype",
  fn(): void {
    let prototype = {};
    let obj = Object.create(prototype);
    Reflect.defineMetadata("key", "value", prototype, "name");
    let result = Reflect.hasOwnMetadata("key", obj, "name");
    assertEquals(result, false);
  },
});
