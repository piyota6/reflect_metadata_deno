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
// 4.1.5 Reflect.getMetadata ( metadataKey, target [, propertyKey] )
// https://rbuckton.github.io/reflect-metadata/#reflect.getmetadata

import "../Reflect.ts";
import { assertEquals, assertThrows } from "../deps_dev.ts";

Deno.test({
  name: "[Reflect.getMetadata] InvalidTarget",
  fn(): void {
    assertThrows(
      () => Reflect.getMetadata("key", undefined),
      TypeError,
    );
  },
});

Deno.test({
  name: "[Reflect.getMetadata] WithoutTargetKeyWhenNotDefined",
  fn(): void {
    let obj = {};
    let result = Reflect.getMetadata("key", obj);
    assertEquals(result, undefined);
  },
});

Deno.test({
  name: "[Reflect.getMetadata] WithoutTargetKeyWhenDefined",
  fn(): void {
    let obj = {};
    Reflect.defineMetadata("key", "value", obj);
    let result = Reflect.getMetadata("key", obj);
    assertEquals(result, "value");
  },
});

Deno.test({
  name: "[Reflect.getMetadata] WithoutTargetKeyWhenDefinedOnPrototype",
  fn(): void {
    let prototype = {};
    let obj = Object.create(prototype);
    Reflect.defineMetadata("key", "value", prototype);
    let result = Reflect.getMetadata("key", obj);
    assertEquals(result, "value");
  },
});

Deno.test({
  name: "[Reflect.getMetadata] WithTargetKeyWhenNotDefined",
  fn(): void {
    let obj = {};
    let result = Reflect.getMetadata("key", obj, "name");
    assertEquals(result, undefined);
  },
});

Deno.test({
  name: "[Reflect.getMetadata] WithTargetKeyWhenDefined",
  fn(): void {
    let obj = {};
    Reflect.defineMetadata("key", "value", obj, "name");
    let result = Reflect.getMetadata("key", obj, "name");
    assertEquals(result, "value");
  },
});

Deno.test({
  name: "[Reflect.getMetadata] WithTargetKeyWhenDefinedOnPrototype",
  fn(): void {
    let prototype = {};
    let obj = Object.create(prototype);
    Reflect.defineMetadata("key", "value", prototype, "name");
    let result = Reflect.getMetadata("key", obj, "name");
    assertEquals(result, "value");
  },
});
