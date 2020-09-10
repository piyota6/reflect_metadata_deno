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
// 4.1.8 Reflect.getMetadataKeys ( target [, propertyKey] )
// https://rbuckton.github.io/reflect-metadata/#reflect.getmetadatakeys

import "../Reflect.ts";
import { assertEquals, assertThrows } from "../deps_dev.ts";

Deno.test({
  name: "[Reflect.getMetadataKeys] KeysInvalidTarget",
  fn(): void {
    // 1. If Type(target) is not Object, throw a TypeError exception.
    assertThrows(
      () => Reflect.getMetadataKeys(undefined),
      TypeError,
    );
  },
});

Deno.test({
  name: "[Reflect.getMetadataKeys] KeysWithoutTargetKeyWhenNotDefined",
  fn(): void {
    let obj = {};
    let result = Reflect.getMetadataKeys(obj);
    assertEquals(result, []);
  },
});

Deno.test({
  name: "[Reflect.getMetadataKeys] KeysWithoutTargetKeyWhenDefined",
  fn(): void {
    let obj = {};
    Reflect.defineMetadata("key", "value", obj);
    let result = Reflect.getMetadataKeys(obj);
    assertEquals(result, ["key"]);
  },
});

Deno.test({
  name: "[Reflect.getMetadataKeys] KeysWithoutTargetKeyWhenDefinedOnPrototype",
  fn(): void {
    let prototype = {};
    let obj = Object.create(prototype);
    Reflect.defineMetadata("key", "value", prototype);
    let result = Reflect.getMetadataKeys(obj);
    assertEquals(result, ["key"]);
  },
});

Deno.test({
  name: "[Reflect.getMetadataKeys] KeysOrderWithoutTargetKey",
  fn(): void {
    let obj = {};
    Reflect.defineMetadata("key1", "value", obj);
    Reflect.defineMetadata("key0", "value", obj);
    let result = Reflect.getMetadataKeys(obj);
    assertEquals(result, ["key1", "key0"]);
  },
});

Deno.test({
  name: "[Reflect.getMetadataKeys] KeysOrderAfterRedefineWithoutTargetKey",
  fn(): void {
    let obj = {};
    Reflect.defineMetadata("key1", "value", obj);
    Reflect.defineMetadata("key0", "value", obj);
    Reflect.defineMetadata("key1", "value", obj);
    let result = Reflect.getMetadataKeys(obj);
    assertEquals(result, ["key1", "key0"]);
  },
});

Deno.test({
  name:
    "[Reflect.getMetadataKeys] KeysOrderWithoutTargetKeyWhenDefinedOnPrototype",
  fn(): void {
    let prototype = {};
    Reflect.defineMetadata("key2", "value", prototype);
    let obj = Object.create(prototype);
    Reflect.defineMetadata("key1", "value", obj);
    Reflect.defineMetadata("key0", "value", obj);
    let result = Reflect.getMetadataKeys(obj);
    assertEquals(result, ["key1", "key0", "key2"]);
  },
});

Deno.test({
  name: "[Reflect.getMetadataKeys] KeysWithTargetKeyWhenNotDefined",
  fn(): void {
    let obj = {};
    let result = Reflect.getMetadataKeys(obj, "name");
    assertEquals(result, []);
  },
});

Deno.test({
  name: "[Reflect.getMetadataKeys] KeysWithTargetKeyWhenDefined",
  fn(): void {
    let obj = {};
    Reflect.defineMetadata("key", "value", obj, "name");
    let result = Reflect.getMetadataKeys(obj, "name");
    assertEquals(result, ["key"]);
  },
});

Deno.test({
  name: "[Reflect.getMetadataKeys] KeysWithTargetKeyWhenDefinedOnPrototype",
  fn(): void {
    let prototype = {};
    let obj = Object.create(prototype);
    Reflect.defineMetadata("key", "value", prototype, "name");
    let result = Reflect.getMetadataKeys(obj, "name");
    assertEquals(result, ["key"]);
  },
});

Deno.test({
  name: "[Reflect.getMetadataKeys] KeysOrderAfterRedefineWithTargetKey",
  fn(): void {
    let obj = {};
    Reflect.defineMetadata("key1", "value", obj, "name");
    Reflect.defineMetadata("key0", "value", obj, "name");
    Reflect.defineMetadata("key1", "value", obj, "name");
    let result = Reflect.getMetadataKeys(obj, "name");
    assertEquals(result, ["key1", "key0"]);
  },
});

Deno.test({
  name:
    "[Reflect.getMetadataKeys] KeysOrderWithTargetKeyWhenDefinedOnPrototype",
  fn(): void {
    let prototype = {};
    Reflect.defineMetadata("key2", "value", prototype, "name");
    let obj = Object.create(prototype);
    Reflect.defineMetadata("key1", "value", obj, "name");
    Reflect.defineMetadata("key0", "value", obj, "name");
    let result = Reflect.getMetadataKeys(obj, "name");
    assertEquals(result, ["key1", "key0", "key2"]);
  },
});
